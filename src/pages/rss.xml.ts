import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { categoryOf, getNotes } from "../utils/research";
import { siteConfig } from "../config/content";

export async function GET(context: APIContext) {
  const notes = await getNotes();
  return rss({
    title: `${siteConfig.name} · 研究笔记`,
    description: siteConfig.description,
    site: context.site!,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.date,
      categories: [categoryOf(note.data.category).name, ...note.data.tags],
      link: `/research/${note.id}/`,
    })),
    customData: "<language>zh-CN</language>",
  });
}
