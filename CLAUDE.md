# CLAUDE.md

Personal site for Ivan (ivivan.com), being restructured from a Hexo/Decap blog into a static Astro "AI + investing research" portfolio. **Status: local development only, not yet deployed.** The currently live site on GitHub Pages is still the old one; much of the content here is mock data used to design the layout.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321 (host: true, no-cache headers)
npm run build     # static output to dist/
npm run preview
```

No test or lint setup. `npm run build` (also type-checks content schemas) is the main sanity check.

## Stack

Astro 7 (`output: 'static'`, `site: https://ivivan.com`; needs Node >= 22.23), Tailwind 4 via `@tailwindcss/vite` (CSS-first config in `src/styles/global.css`, no `tailwind.config.js`; dark mode = `.dark` class via `@custom-variant`) + `@tailwindcss/typography`, `@astrojs/rss`, `marked` for markdown strings in config, system Chinese fonts (PingFang SC / Microsoft YaHei / Noto Sans SC via `system-ui` stack) plus self-hosted JetBrains Mono (`@fontsource-variable/jetbrains-mono`) for figures. Math in markdown via `remark-math` + `rehype-katex` (Astro 7 needs `@astrojs/markdown-remark` installed for remark/rehype plugins; `katex` is pinned to the version `rehype-katex` uses, because a CSS/markup version mismatch breaks fractions; its CSS is imported in the note and project detail pages). Consequence: a plain `$` in markdown can start inline math, so write money as `\$20` (cgtflow.md is escaped); display math needs `$$` on their own lines. TypeScript 5.9 strict (kept off TS 7 on purpose), `resolveJsonModule` on. Charts are hand-drawn SVG at build time (no chart library).

## Structure

- `src/pages/` – `index`, `about`, `projects` (+ `projects/[slug]`), `research` (+ `research/[slug]`, `research/tag/[tag]`, `research/category/[category]`), `rss.xml.ts`. **Investing is hidden** (2026-11-27): the page lives at `_investing.astro` (underscore = not routed) and `siteConfig.features.investing = false` hides its nav link, home column, hero button and footer disclosure link. To restore: set the flag to `true` and rename the file back. Pages are in Chinese (`lang="zh-CN"`).
- `src/layouts/BaseLayout.astro` – the one shared layout: `<head>`, GA, theme bootstrap script (theme in `localStorage`, default light), `Navigation`, `Footer`. Every page uses it; pass `title`/`description`.
- `src/content.config.ts` – two collections, both glob-loaded from `src/content/`:
  - `projects`: `title, summary, stack[], order, date?, draft`
  - `research`: `title, description, date, category, tags[], draft`. `category` must be one of the ids in `researchCategories` (`src/config/content.ts`: `ai-systems`, `risk-fraud`, `investing`, `essays`); the research page groups notes by it (one section each, empty ones kept) and each has a page at `/research/category/<id>/`. Tags stay free-form and cross categories.
  Pages filter `!data.draft`; projects sort by `order`, research by `date` desc. Detail routes use `entry.id` as slug.
- `src/config/content.ts` – site-wide copy: `siteConfig`, `homeContent` (incl. `tagline`), `nowContent` (the old home "近况" block; no longer shown, kept in config), `aboutContent`, `projectsContent`. Edit text here rather than in the pages.
- `src/components/` – `Navigation`, `Footer`, `GoogleAnalytics` (GA ID hardcoded), `AsOf` (mono as-of stamp), `NoteList`, `TagBar`, and `charts/` (`IndexChart` with hover readout, `DrawdownChart`, `MonthlyGrid`, `AllocationBar`).
- `src/utils/` – `portfolio.ts` (pct formatting with true minus sign, drawdowns, monthly returns), `reading.ts` (CJK-aware reading time), `research.ts` (published notes + tag counts), `markdown.ts`.
- `public/data/portfolio-monthly.json`, `allocation.json` – imported by `index` and `investing`. Both carry `"illustrative": true` – **mock data, not real account data**.
- `public/CNAME` = `ivivan.com`; static assets under `public/assets/images`, `public/images`.

## Design system

Direction: "research notebook at night" (from an unslop pass, 2026-11-25). Tokens live in `src/styles/global.css` as CSS vars switched by `.dark` and exposed to Tailwind via `@theme inline`: `page`, `card`, `raised`, `ink`/`ink-2`/`ink-3` (text roles), `accent` (ink green, use sparingly; the "左脑人工" side), `coral` (#cc785c from the getdesign `claude` spec; the "右脑智能" side only), `pos`/`neg`, `bench`, `line`/`line-strong` (hairlines). Headings and body use the system Chinese sans (headings bold; the `--font-serif` token is aliased to the sans), figures use the `figure` utility (mono, tabular). Every data figure carries an `AsOf` stamp. Avoid hue gradients, glows, emoji, uppercase tracked labels, and decorative backgrounds.

## Content and privacy rules (from `newplan.md`, the design plan, written in Chinese)

- Pages: Home, Projects, Investing, Research, About. Static-first: no backend, DB or login.
- Investing page shows only privacy-filtered data: normalized index (base 100), risk metrics, coarse allocation. Never put account balances, broker names, tickers/exact weights, trade dates/prices, or raw exports in this repo. Real data should be produced by a separate private pipeline that exports de-identified JSON into `public/data/`.
- Project case studies should be de-identified (problem / approach / outcome / explainability & governance / stack). Existing projects: `cgtflow` (live as CGTDesk, www.cgtdesk.com), `fraud-risk-scoring` (FengShun AI graph anti-fraud demo, from the local `fengshun-antifraud` project), `research-assistant-agent` (draft). Research notes: none yet (the two demo notes were removed 2026-11-27; the research page and home column show an empty state). The hidden `_investing.astro` still links to the removed `why-time-weighted-return` note.
- Tone: research notes, not investment advice; avoid hype and short-term return bragging.

## Legacy content

- `legacy-content/blog/` – ~621 old Hexo posts kept as a backup (tracked in git). **Not part of the build and not shown on the site.** Don't import or edit them unless asked.
- The git working tree shows the old Astro blog layer deleted (`src/content/posts`, `src/layouts`, `BlogPost`, `posts` pages, `getPosts.ts`, Decap CMS `public/admin`, `netlify.toml`) – the restructure removes it. These deletions are intentional and uncommitted.
- `README.md` was rewritten for the new site (2026-11-27); the old Decap/Hexo docs in `docs/` were removed. Old Hexo addresses (`/YYYY/MM/DD/slug/`) now land on `src/pages/404.astro`.

## Deployment

`.github/workflows/deploy.yml`: on push to `main`, `npm ci && npm run build`, then publish `dist/` to GitHub Pages (Node 24; Astro 7 needs >= 22.23). Pushing to `main` therefore **replaces the live site** – don't push the restructure until it is ready.

## Notes

- Dev shell is Windows; paths in the repo use forward slashes.
- The nav brand is "Hear The Wind Sing" while `siteConfig.name` is "Ivan" (kept on purpose for now).
- Mock data is internally inconsistent: `portfolio-monthly.json` has `as_of` 2026-09-30 but the series ends 2025-09, and `metrics.max_drawdown` (−8.1%) does not match the drawdown computed from the series (−2.6%). Real pipeline output should replace it.
