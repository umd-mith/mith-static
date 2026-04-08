import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { airtableLoader } from "./lib/airtableLoader";
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.string(),
    authors: z.array(z.string()),
  }),
});
 
const attachment = z.object({
  id: z.string(),
  url: z.string(),
  filename: z.string(),
  size: z.number(),
  type: z.string(),
  thumbnails: z
    .object({
      small: z.object({ url: z.string(), width: z.number(), height: z.number() }).optional(),
      large: z.object({ url: z.string(), width: z.number(), height: z.number() }).optional(),
      full:  z.object({ url: z.string(), width: z.number(), height: z.number() }).optional(),
    })
    .optional(),
});
 
const people = defineCollection({
  loader: airtableLoader({
    table: "People",
    view: "Current",
    markdownFields: ["bio"],
    attachmentFields: ["headshot"],
  }),
 
  schema: z.object({
    id:    z.string(),
    slug: z.string(),
    status: z.string().optional(),
    name:   z.string(),
    headshot:   z.array(attachment).optional(),
    first:     z.string(),
    middle:   z.string().optional(),
    last: z.string(),
    title: z.array(z.string()),
    bio: z.string(),
    email: z.email().optional(),
    website: z.url().optional(),
  }),
});

const labs = defineCollection({
  loader: airtableLoader({
    table: "Labs",
    view: "All Labs",
    markdownFields: ["description"],
    attachmentFields: ["image"],
    linkedFields: {
      directors: "People",
    }
  }),
 
  schema: z.object({
    id:    z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    image:   z.array(attachment).optional(),
    description: z.string().optional(),
    directors:   z.array(z.object({
      name: z.string(),
      slug: z.string()
    })).optional(),
    "external link": z.string().optional()
  }),
});

const research = defineCollection({
  loader: airtableLoader({
    table: "Research",
    view: "All Research Items",
    markdownFields: ["description", "excerpt"],
    attachmentFields: ["image"],
    linkedFields: {
      "linked directors": "People",
      "linked director affiliations": "Identities",
      "linked participants": "People",
      "linked internal participant affiliations": "Identities",
      "linked external participant affiliations": "Identities",
      "linked partners": "Partners_Sponsors",
      "linked sponsors": "Partners_Sponsors",
      "linked links": "Links",
      "linked posts": "Posts",
      "topics": "Topics",
      "methods": "Taxonomy",
      "disciplines": "Taxonomy",
      "research types": "Types"
    }
  }),
 
  schema: z.object({
    id:    z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    image:   z.array(attachment).optional(),
    description: z.string().optional(),
    excerpt: z.string().optional(),
    "year start": z.number(),
    "year end": z.number().optional(),
    active: z.enum(["TRUE", "FALSE"]),
    slug: z.string(),
    "linked directors":   z.array(z.object({
      name: z.string(),
      slug: z.string(),
      "group type": z.array(z.string())
    })).optional(),
    "linked director affiliations":   z.array(z.object({
      "full affiliation": z.string(),
    })).optional(),
    "linked participants":   z.array(z.object({
      name: z.string(),
      slug: z.string(),
      "group type": z.array(z.string())
    })).optional(),
    "linked internal participant affiliations":   z.array(z.object({
      "full affiliation": z.string(),
    })).optional(),
    "linked external participant affiliations":   z.array(z.object({
      "full affiliation": z.string(),
    })).optional(),
    "linked partners":   z.array(z.object({
      name: z.string(),
      website: z.url().optional(),
    })).optional(),
    "linked sponsors":   z.array(z.object({
      name: z.string(),
      website: z.url().optional(),
    })).optional(),
    topics: z.array(z.object({
      topic: z.string(),
    })).optional(),
    methods: z.array(z.object({
      name: z.string(),
    })).optional(),
    disciplines: z.array(z.object({
      name: z.string(),
    })).optional(),
    "research types": z.array(z.object({
      "research type": z.string(),
    })).optional(),
    "image alt": z.string().optional(),
    "linked links": z.array(z.object({
      title: z.string(),
      url: z.url()
    })).optional(),
    "linked posts": z.array(z.object({
      "post title": z.string(),
      "post date": z.date(),
      slug: z.string(),
    })).optional()
  }),
});

export const collections = { pages, news, people, labs, research };