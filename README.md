# NewBlog (Astro)

Personal blog built with Astro and deployed to GitHub Pages.

## Commands

All commands are run from the project root:

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start Astro dev server (`http://localhost:4321`) |
| `npm run build` | Build production site to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run cms:proxy` | Start Decap local backend proxy (for local CMS login) |

## Decap CMS

This project now includes Decap CMS at `/admin/`:

- Admin app: `public/admin/index.html`
- CMS config: `public/admin/config.yml`
- Post content folder: `src/content/posts`
- Uploaded image folder: `public/assets/images/posts`

### Availability on GitHub Pages

Decap CMS works with Astro static sites, including GitHub Pages, with one requirement:

- Local development: works using `local_backend: true`.
- Production on GitHub Pages: requires a GitHub OAuth proxy service for login.

Why: GitHub OAuth needs a secure server-side token exchange, and GitHub Pages is static hosting only.

### Local usage

Run these in separate terminals:

```bash
npm run dev
npm run cms:proxy
```

Then open:

- Site: `http://localhost:4321`
- CMS: `http://localhost:4321/admin/`

### Production usage on GitHub Pages

1. Deploy your site normally to GitHub Pages.
2. Host an OAuth proxy endpoint (for example on Cloudflare Workers, Vercel Functions, or your own server).
3. Update `public/admin/config.yml`:
	- `backend.repo` -> `YOUR_GITHUB_USERNAME/YOUR_REPO_NAME`
	- add `backend.base_url` -> your OAuth proxy origin
	- add `backend.auth_endpoint` -> your OAuth callback path (commonly `auth`)
4. Register a GitHub OAuth App:
	- Homepage URL: your production site URL
	- Authorization callback URL: your OAuth proxy callback URL
5. Redeploy and visit `/admin/`.

Without step 2-4, production login on GitHub Pages will fail even though local CMS editing works.
