import type { Loader } from "astro/loaders";
import { AIRTABLE_BASE_URL, airtableHeaders } from "./airtable";
import type { AirtableLoaderOptions, LinkedRecord } from "./airtable";

interface AirtableResponse {
  records: { id: string; fields: Record<string, unknown> }[];
  offset?: string;
}

/** Normalised shape of a single Airtable attachment. */
export interface AirtableAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails?: {
    small?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
    full?:  { url: string; width: number; height: number };
  };
}

/**
 * Fetch every record from a table into a `Map<recordId, fields>`,
 * paging through Airtable's 100-record limit automatically.
 * Uses Bearer auth so personal access tokens work correctly.
 */
async function fetchTableAsMap(
  tableName: string
): Promise<Map<string, Record<string, unknown>>> {
  const map = new Map<string, Record<string, unknown>>();
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (offset) params.set("offset", offset);

    const url = `${AIRTABLE_BASE_URL}/${encodeURIComponent(tableName)}?${params}`;
    const res = await fetch(url, { headers: airtableHeaders() });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const hint =
        res.status === 403
          ? " — check that your AIRTABLE_TOKEN has the `data.records:read` scope and access to this Base."
          : res.status === 404
          ? ` — table name "${tableName}" not found. Check spelling and letter case in LINKED_FIELD_TABLES.`
          : "";
      throw new Error(
        `Airtable ${res.status} fetching table "${tableName}": ${body.error?.message ?? res.statusText}${hint}`
      );
    }

    const data: AirtableResponse = await res.json();
    for (const r of data.records) {
      map.set(r.id, { ...r.fields, _id: r.id });
    }
    offset = data.offset;
  } while (offset);

  return map;
}

/**
 * Fetch all records from the primary table with optional view and
 * `includeDateDependencyMetadata`, paging automatically.
 */
async function fetchPrimaryTable(
  tableName: string,
  view?: string
): Promise<{ id: string; fields: Record<string, unknown> }[]> {
  const all: { id: string; fields: Record<string, unknown> }[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    // Return linked-record cell values as objects instead of bare IDs.
    params.set("includeDateDependencyMetadata", "true");
    if (view)   params.set("view", view);
    if (offset) params.set("offset", offset);

    const url = `${AIRTABLE_BASE_URL}/${encodeURIComponent(tableName)}?${params}`;
    const res = await fetch(url, { headers: airtableHeaders() });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const hint =
        res.status === 403
          ? " — check that your AIRTABLE_TOKEN has the `data.records:read` scope and access to this Base."
          : res.status === 404
          ? ` — table "${tableName}"${view ? ` or view "${view}"` : ""} not found.`
          : "";
      throw new Error(
        `Airtable ${res.status} fetching "${tableName}": ${body.error?.message ?? res.statusText}${hint}`
      );
    }

    const data: AirtableResponse = await res.json();
    all.push(...data.records);
    offset = data.offset;
  } while (offset);

  return all;
}

/**
 * Resolve an array of record IDs (or already-expanded objects) from a linked
 * field into full `LinkedRecord` objects using a pre-fetched lookup map.
 */
function resolveIds(
  raw: unknown,
  lookup: Map<string, Record<string, unknown>>
): LinkedRecord[] {
  if (!Array.isArray(raw) || raw.length === 0) return [];

  return raw.flatMap((entry) => {
    const id = typeof entry === "string" ? entry : (entry as { id: string }).id;
    const fields = lookup.get(id);
    if (!fields) return [];
    return [fields];
  });
}

function deriveSlug(
  recordId: string,
  fields: Record<string, unknown>,
  slugField: AirtableLoaderOptions["slugField"]
): string {
  if (!slugField) return recordId;

  const raw =
    typeof slugField === "function"
      ? slugField(recordId, fields)
      : (fields[slugField] as string | undefined) ?? recordId;

  return String(raw)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Render markdown sub-fields within an array of resolved linked records.
 * Returns a new array with the specified fields replaced by their HTML.
 */
async function renderLinkedMarkdown(
  records: LinkedRecord[],
  subFields: string[],
  renderMarkdown: (md: string) => Promise<{ html: string }>
): Promise<LinkedRecord[]> {
  return Promise.all(
    records.map(async (record) => {
      const rendered = Object.fromEntries(
        await Promise.all(
          subFields.map(async (subField) => {
            const value = record[subField];
            if (typeof value !== "string" || !value.trim()) return [subField, ""];
            const { html } = await renderMarkdown(value);
            return [subField, html];
          })
        )
      );
      return { ...record, ...rendered };
    })
  );
}

/**
 * Cast a raw Airtable attachment array into clean `AirtableAttachment` objects,
 * dropping any items that are missing required fields.
 */
function normalizeAttachments(raw: unknown): AirtableAttachment[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item) => {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof (item as Record<string, unknown>).url !== "string"
    ) return [];
    const a = item as Record<string, unknown>;
    return [{
      id:       String(a.id       ?? ""),
      url:      String(a.url),
      filename: String(a.filename ?? ""),
      size:     Number(a.size     ?? 0),
      type:     String(a.type     ?? ""),
      thumbnails: (a.thumbnails as AirtableAttachment["thumbnails"]) ?? undefined,
    }];
  });
}

/**
 * Normalize attachment sub-fields within an array of resolved linked records.
 * Returns a new array with those fields replaced by `AirtableAttachment[]`.
 */
function resolveLinkedAttachments(
  records: LinkedRecord[],
  subFields: string[]
): LinkedRecord[] {
  return records.map((record) => {
    const normalized = Object.fromEntries(
      subFields.map((subField) => [subField, normalizeAttachments(record[subField])])
    );
    return { ...record, ...normalized };
  });
}

/**
 * Generic Astro content-layer loader for any Airtable table.
 * Uses Bearer token auth (required for personal access tokens).
 *
 * @param options.linkedMarkdownFields - Map of linked field name → sub-field
 *   names whose values should be rendered from Markdown to HTML.
 *   e.g. `{ "speaker affiliations": ["person bio"] }`
 */
export function airtableLoader<F extends string = string>(
  options: AirtableLoaderOptions<F> & {
    /** Sub-fields inside linked records that contain Markdown and should be rendered to HTML. */
    linkedMarkdownFields?: Partial<Record<F, string[]>>;
    /** Sub-fields inside linked records that are Airtable attachment arrays and should be normalised. */
    linkedAttachmentFields?: Partial<Record<F, string[]>>;
  }
): Loader {
  const {
    table,
    view,
    linkedFields = {} as Record<F, string>,
    slugField,
    markdownFields = [],
    linkedMarkdownFields    = {} as Partial<Record<F, string[]>>,
    linkedAttachmentFields  = {} as Partial<Record<F, string[]>>,
  } = options;

  return {
    name: `airtable-loader:${table}`,

    async load({ store, renderMarkdown, logger }) {
      // 1. Pre-fetch every unique linked table in parallel.
      const uniqueLinkedTables = [...new Set(Object.values(linkedFields) as string[])];

      if (uniqueLinkedTables.length > 0) {
        logger.info(
          `[${table}] Pre-fetching ${uniqueLinkedTables.length} linked table(s): ${uniqueLinkedTables.join(", ")}`
        );
      }

      const lookups = new Map<string, Map<string, Record<string, unknown>>>();

      await Promise.all(
        uniqueLinkedTables.map(async (t) => {
          lookups.set(t, await fetchTableAsMap(t));
        })
      );

      // 2. Fetch the primary table.
      logger.info(`[${table}] Fetching records${view ? ` from view "${view}"` : ""}…`);
      const raw = await fetchPrimaryTable(table, view);
      logger.info(`[${table}] Resolving ${raw.length} record(s)…`);

      // 3. Resolve linked fields and write into the store.
      store.clear();

      for (const record of raw) {
        const { id, fields } = record;

        // Resolve linked record IDs → full field objects.
        const resolvedLinked = Object.fromEntries(
          (Object.keys(linkedFields) as F[]).map((fieldKey) => {
            const targetTable = linkedFields[fieldKey];
            const lookup = lookups.get(targetTable)!;
            return [fieldKey, resolveIds(fields[fieldKey], lookup)];
          })
        ) as Record<F, LinkedRecord[]>;

        // Render markdown within linked records where requested.
        const linkedWithMarkdown = Object.fromEntries(
          await Promise.all(
            (Object.keys(linkedFields) as F[]).map(async (fieldKey) => {
              const subFields = linkedMarkdownFields[fieldKey];
              if (!subFields || subFields.length === 0) {
                return [fieldKey, resolvedLinked[fieldKey]];
              }
              return [
                fieldKey,
                await renderLinkedMarkdown(resolvedLinked[fieldKey], subFields, renderMarkdown),
              ];
            })
          )
        ) as Record<F, LinkedRecord[]>;

        // Normalise attachment sub-fields within linked records where requested.
        const linkedWithAttachments = Object.fromEntries(
          (Object.keys(linkedFields) as F[]).map((fieldKey) => {
            const subFields = linkedAttachmentFields[fieldKey];
            if (!subFields || subFields.length === 0) {
              return [fieldKey, linkedWithMarkdown[fieldKey]];
            }
            return [fieldKey, resolveLinkedAttachments(linkedWithMarkdown[fieldKey], subFields)];
          })
        ) as Record<F, LinkedRecord[]>;

        // Render top-level markdown fields.
        const renderedMarkdown = Object.fromEntries(
          await Promise.all(
            markdownFields.map(async (fieldKey) => {
              const value = fields[fieldKey];
              if (typeof value !== "string" || !value.trim()) return [fieldKey, ""];
              const { html } = await renderMarkdown(value);
              return [fieldKey, html];
            })
          )
        );

        store.set({
          id: deriveSlug(id, fields, slugField),
          data: { ...fields, ...linkedWithAttachments, ...renderedMarkdown },
          rendered: { html: "", metadata: { airtableId: id } },
        });
      }

      logger.info(`[${table}] Done — ${raw.length} record(s) stored.`);
    },
  };
}