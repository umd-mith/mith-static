const TOKEN   = import.meta.env.AIRTABLE_TOKEN;
const BASE_ID = import.meta.env.AIRTABLE_MITH_BASE_ID;

export const AIRTABLE_BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;

export function airtableHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
}

export type LinkedRecord = Record<string, unknown>;

export interface Attachment {
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

export interface AirtableLoaderOptions<F extends string = string> {
  table: string;

  view?: string;

  linkedFields?: Record<F, string>;

  slugField?: string | ((id: string, fields: Record<string, unknown>) => string);

  markdownFields?: string[];

  attachmentFields?: string[];
}