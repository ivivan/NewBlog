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

## Decap CMS

This project now includes Decap CMS at `/admin/`:

- Admin app: `public/admin/index.html`
- CMS config: `public/admin/config.yml`
- Post content folder: `src/content/posts`
- Uploaded image folder: `public/assets/images/posts`

### Recommended auth setup

This project is deployed on GitHub Pages, which cannot directly perform the secure GitHub OAuth exchange needed by the `github` backend. For public static hosting, the recommended setup is:

- Keep GitHub Pages for the public site
- Use a separate Netlify site for Decap authentication
- Enable Netlify Identity and Git Gateway
- Configure Decap with `backend.name: git-gateway`

### Local usage

Run:

```bash
npm run dev
```

Then open:

- Site: `http://localhost:4321`
- CMS: `http://localhost:4321/admin/`

### Production usage with Netlify Identity

1. Import the same GitHub repository into a Netlify site.
2. Enable Netlify Identity.
3. Enable Git Gateway.
4. Invite the email address you will use to sign in.
5. Ensure `public/admin/config.yml` uses:

```yml
backend:
  name: git-gateway
  branch: main
```

6. Keep the Netlify Identity widget script in `public/admin/index.html`.
7. Visit `/admin/` on the site served by your Netlify authentication site.

This is the standard, secure Decap setup for a GitHub Pages site that needs CMS login.
