/**
 * inject-frontmatter.mjs
 *
 * Reads a CSV file and, for each row, finds the matching markdown file in
 * src/content/news/ by the `slug` column, then merges all CSV columns into
 * the file's YAML frontmatter (adding missing fields and updating existing ones).
 *
 * Usage:
 *   node inject-frontmatter.mjs <path-to-csv>
 *
 * Example:
 *   node inject-frontmatter.mjs data.csv
 */

import fs from "fs";
import path from "path";

// ─── Config ──────────────────────────────────────────────────────────────────

const NEWS_DIR = path.resolve("../src/content/news");

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Minimal CSV parser that handles:
 *  - Quoted fields (including commas and newlines inside quotes)
 *  - Escaped double-quotes ("")
 * Returns an array of objects keyed by the header row.
 */
function parseCSV(raw) {
  const rows = [];
  let field = "";
  let inQuotes = false;
  const currentRow = [];

  // Normalise line endings
  const text = raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        // Escaped quote
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        currentRow.push(field);
        field = "";
      } else if (ch === "\n") {
        currentRow.push(field);
        field = "";
        rows.push([...currentRow]);
        currentRow.length = 0;
      } else {
        field += ch;
      }
    }
  }

  // Flush the last field / row
  if (field !== "" || currentRow.length > 0) {
    currentRow.push(field);
    rows.push([...currentRow]);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((cols) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (cols[i] ?? "").trim();
    });
    return obj;
  });
}

/**
 * Splits a markdown file into { frontmatter, body }.
 *
 * - If the file starts with `---`, everything between the first and second
 *   `---` is treated as existing YAML frontmatter.
 * - Otherwise frontmatter is an empty string and body is the whole file.
 */
function splitFrontmatter(content) {
  const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;
  const match = content.match(FM_RE);
  if (match) {
    return { frontmatter: match[1], body: match[2] };
  }
  return { frontmatter: "", body: content };
}

/**
 * Naïve YAML line parser.  Handles simple `key: value` pairs only — enough
 * for typical static-site frontmatter.  Multi-line / nested values are kept
 * as-is (their lines won't match the key pattern and are passed through).
 */
function parseSimpleYAML(yaml) {
  const map = {};
  const lines = yaml.split("\n");
  for (const line of lines) {
    const m = line.match(/^([A-Za-z_][\w-]*):\s*(.*)/);
    if (m) map[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return map;
}

/**
 * Serialise a value to a YAML-safe string.
 *
 * - Values containing `:`  `,`  `#`  `[`  `]`  `{`  `}`  `*`  `&`  `!`
 *   `|`  `>`  `'`  `"` or that start with special chars are double-quoted.
 * - Newlines inside values are escaped.
 */
function yamlValue(value) {
  if (value === "" || value === null || value === undefined) return '""';
  const str = String(value);
  const needsQuotes =
    /[:#,{}&!|>'"]/.test(str) ||
    str.startsWith("-") ||
    str.startsWith("*") ||
    str.includes("\n");
  if (needsQuotes) {
    return `"${str.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
  }
  return str;
}

/**
 * Merge `newFields` into an existing YAML string.
 *
 * Existing keys are updated in-place (preserving order and surrounding
 * whitespace where possible).  New keys are appended at the end.
 */
function mergeFrontmatter(existingYAML, newFields) {
  const lines = existingYAML ? existingYAML.split("\n") : [];
  const handledKeys = new Set();

  // Update existing keys in-place
  const updatedLines = lines.map((line) => {
    const m = line.match(/^([A-Za-z_][\w-]*):(.*)/);
    if (m && m[1] in newFields) {
      handledKeys.add(m[1]);
      return `${m[1]}: ${yamlValue(newFields[m[1]])}`;
    }
    return line;
  });

  // Append keys that weren't already present
  for (const [key, value] of Object.entries(newFields)) {
    if (!handledKeys.has(key)) {
      updatedLines.push(`${key}: ${yamlValue(value)}`);
    }
  }

  return updatedLines.join("\n");
}

/**
 * Reassemble a markdown file from its (possibly updated) frontmatter and body.
 */
function buildMarkdown(frontmatter, body) {
  return `---\n${frontmatter}\n---\n${body}`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error("Usage: node inject-frontmatter.mjs <path-to-csv>");
    process.exit(1);
  }

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV not found: ${csvPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(NEWS_DIR)) {
    console.error(`News directory not found: ${NEWS_DIR}`);
    process.exit(1);
  }

  const csvRaw = fs.readFileSync(csvPath, "utf8");
  const rows = parseCSV(csvRaw);

  if (rows.length === 0) {
    console.log("No data rows found in CSV.");
    return;
  }

  let matched = 0;
  let missing = 0;

  for (const row of rows) {
    const { slug } = row;

    if (!slug) {
      console.warn("⚠  Skipping row with empty slug.");
      continue;
    }

    // Accept both  <slug>.md  and  <slug>/index.md
    const candidates = [
      path.join(NEWS_DIR, `${slug}.md`),
      path.join(NEWS_DIR, slug, "index.md"),
    ];

    const filePath = candidates.find((p) => fs.existsSync(p));

    if (!filePath) {
      console.warn(`✗  No file found for slug: ${slug}`);
      missing++;
      continue;
    }

    const original = fs.readFileSync(filePath, "utf8");
    const { frontmatter, body } = splitFrontmatter(original);

    // Build the map of fields to inject (all CSV columns except slug)
    const newFields = {};
    for (const [key, value] of Object.entries(row)) {
      if (key && value !== undefined) {
        if (key === "authors") {
          newFields[key] = `[${value}]`;
        } else {
          newFields[key] = value;
        }
        
      };
    }

    const updatedFrontmatter = mergeFrontmatter(frontmatter, newFields);
    const updated = buildMarkdown(updatedFrontmatter, body);

    fs.writeFileSync(filePath, updated, "utf8");
    console.log(`✓  Updated: ${path.relative(process.cwd(), filePath)}`);
    matched++;
  }

  console.log(
    `\nDone. ${matched} file(s) updated, ${missing} slug(s) had no matching file.`
  );
}

main();
