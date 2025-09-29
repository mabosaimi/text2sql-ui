import type { TableSchema } from "@/lib/schema";

export type SearchResponse = {
  query: string;
  results: { score: number; text: string; index: number }[];
  count: number;
  limit: number;
};

const BASE_URL = "https://mabosaimi-text2sql.hf.space";

export async function fetchSchemas(): Promise<TableSchema[]> {
  const res = await fetch(`${BASE_URL}/schemas?include_columns=true`, {
    next: { revalidate: 60 * 60 * 24 }, // 24 hours
  });
  if (!res.ok) throw new Error(`Schemas request failed: ${res.status}`);
  return (await res.json()) as TableSchema[];
}

export async function searchQuery(
  query: string,
  limit: number,
): Promise<SearchResponse> {
  const res = await fetch(`${BASE_URL}/search`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, limit }),
  });
  if (!res.ok) throw new Error(`Search request failed: ${res.status}`);
  return (await res.json()) as SearchResponse;
}
