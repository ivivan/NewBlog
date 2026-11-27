import { getCollection } from "astro:content";
import { researchCategories } from "../config/content";

/** Published research notes, newest first. */
export async function getNotes() {
  // Newest first; notes on the same day keep file-name order (e.g. a numbered series reads 01, 02, ...).
  return (await getCollection("research", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id)
  );
}

/** Tags with counts, most used first, then alphabetical. */
export function tagCounts(notes: Awaited<ReturnType<typeof getNotes>>) {
  const counts = new Map<string, number>();
  for (const n of notes) for (const t of n.data.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export type ResearchCategory = (typeof researchCategories)[number];

/** The category record for a note's `category` id. */
export function categoryOf(id: string): ResearchCategory {
  const c = researchCategories.find((c) => c.id === id);
  if (!c) throw new Error(`Unknown research category: ${id}`);
  return c;
}

export function categoryHref(id: string): string {
  return `/research/category/${id}/`;
}

/** Every category in config order, with its notes (newest first). Empty categories are kept. */
export function groupByCategory(notes: Awaited<ReturnType<typeof getNotes>>) {
  return researchCategories.map((category) => ({
    category,
    notes: notes.filter((n) => n.data.category === category.id),
  }));
}
