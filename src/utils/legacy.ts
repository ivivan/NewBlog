// The old Hexo blog (legacy-content/blog/), shown only in the hidden drawer at /drawer/.
// Rendered with `marked`, not the site's markdown pipeline, so old "$" signs never turn into math.
import { marked } from "marked";

/** Categories left out of the drawer. 转载收集 = articles by other people, reposted. */
const EXCLUDED_CATEGORIES = new Set(["转载收集"]);

export interface LegacyPost {
  slug: string;
  title: string;
  date: Date;
  year: number;
  categories: string[];
  excerpt: string;
  html: string;
}

const files = import.meta.glob("/legacy-content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function unquote(v: string): string {
  const t = v.trim();
  if ((t.startsWith("'") && t.endsWith("'")) || (t.startsWith('"') && t.endsWith('"'))) {
    return t.slice(1, -1).replace(/''/g, "'");
  }
  return t;
}

/** Just enough YAML for Hexo front matter: scalar keys and `- item` lists. */
function parseFrontMatter(raw: string): { data: Record<string, string | string[]>; body: string } {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string | string[]> = {};
  let listKey: string | null = null;
  for (const line of m[1].split(/\r?\n/)) {
    const item = line.match(/^\s+-\s+(.*)$/);
    if (item && listKey) {
      (data[listKey] as string[]).push(unquote(item[1]));
      continue;
    }
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (!kv) continue;
    if (kv[2] === "") {
      listKey = kv[1];
      data[listKey] = [];
    } else {
      listKey = null;
      data[kv[1]] = unquote(kv[2]);
    }
  }
  return { data, body: raw.slice(m[0].length) };
}

/** Old images: dead WordPress uploads stay dead; everything else is asked for over https. */
function fixImageSrc(src: string): string {
  return src.replace(/^http:\/\//i, "https://");
}

function cleanHtml(html: string): string {
  return (
    html
      // dead embeds and anything executable
      .replace(/<(script|style|iframe|object|embed|noscript)[\s\S]*?<\/\1>/gi, "")
      .replace(/<(script|iframe|object|embed)[^>]*\/?>/gi, "")
      .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*')/gi, "")
      // old styling: keep the text, drop <font> and inline font/size styles
      .replace(/<\/?font[^>]*>/gi, "")
      .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, "")
      .replace(/\s(width|height|align)\s*=\s*("[^"]*"|'[^']*'|\d+)/gi, "")
      // images: https, lazy, and a hook for the "gone with the wind" fallback
      .replace(/<img\b([^>]*?)\ssrc\s*=\s*(["'])(.*?)\2([^>]*)>/gi, (_m, a, q, src, b) =>
        `<img${a} src=${q}${fixImageSrc(src)}${q}${b} loading="lazy" data-legacy-img>`
      )
      // links leave the site in a new tab
      .replace(/<a\s+href=(["'])(https?:\/\/[^"']+)\1/gi, '<a target="_blank" rel="noopener noreferrer" href=$1$2$1')
  );
}

function toExcerpt(html: string, n = 90): string {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > n ? `${text.slice(0, n)}…` : text;
}

let cache: LegacyPost[] | null = null;

/** Every old post with a date, newest first, minus excluded categories and Astro template samples. */
export function getLegacyPosts(): LegacyPost[] {
  if (cache) return cache;
  const posts: LegacyPost[] = [];
  for (const [path, raw] of Object.entries(files)) {
    const { data, body } = parseFrontMatter(raw);
    if (typeof data.date !== "string" || "pubDate" in data) continue; // template samples have pubDate, no date
    const date = new Date(data.date.replace(" ", "T"));
    if (Number.isNaN(date.valueOf())) continue;
    const categories = Array.isArray(data.categories) ? data.categories : [];
    if (categories.some((c) => EXCLUDED_CATEGORIES.has(c))) continue;
    const html = cleanHtml(marked.parse(body, { async: false }) as string);
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    posts.push({
      slug,
      title: typeof data.title === "string" && data.title ? data.title : slug,
      date,
      year: date.getFullYear(),
      categories,
      excerpt: toExcerpt(html),
      html,
    });
  }
  posts.sort((a, b) => b.date.valueOf() - a.date.valueOf() || a.slug.localeCompare(b.slug));
  cache = posts;
  return posts;
}

export function legacyHref(slug: string): string {
  return `/drawer/${slug}/`;
}

export function formatLegacyDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
