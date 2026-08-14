# Decap CMS Setup for Netlify Identity

## Summary

Decap CMS is compatible with this Astro project and content model.

- Content collection folder: `src/content/posts`
- Frontmatter used by site: `title`, `description`, `date`, `readTime`, `image`, `slug`
- CMS route: `/admin/`

## Recommended production auth flow

This site is deployed to GitHub Pages, which is static hosting only. For a public static site, the recommended setup is:

- Keep GitHub Pages as the public site host.
- Create a separate Netlify site connected to the same GitHub repo.
- Enable Netlify Identity and Git Gateway in Netlify.
- Configure Decap to use `backend: name: git-gateway`.

This avoids exposing GitHub OAuth secrets in browser code and is the standard Netlify solution for Decap.

## Files Added

- `public/admin/index.html`
- `public/admin/config.yml`

## Configure repository and Netlify Identity

In `public/admin/config.yml`, use:

```yml
backend:
  name: git-gateway
  branch: main

publish_mode: simple
```

Notes:

- Do not keep a `repo:` field under `backend` when using `git-gateway`.
- Use your actual default branch if it is not `main`.
- Keep `local_backend: true` only for local Decap development if needed.

Then load the Netlify Identity widget in `public/admin/index.html`:

```html
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```

## Netlify setup

1. Create or import the GitHub repo into a Netlify site.
2. Open your Netlify site dashboard.
3. Enable Netlify Identity.
4. In Identity settings, choose invite-only registration.
5. Enable Git Gateway.
6. Invite your GitHub/email account and accept the invitation.
7. Sign in to `https://your-netlify-site-name.netlify.app/admin/` or the custom domain used for the Netlify auth site.

## Local development

You can still run the CMS locally with the local backend:

```bash
npm run dev
```

Then open:

- `http://localhost:4321/admin/`

If you need local editing with Git Gateway, add `local_backend: true` while working in a local environment.

## Common troubleshooting

- CMS login opens but fails: Netlify Identity or Git Gateway is disabled.
- `git-gateway` still has a `repo:` field: remove it.
- Content saves but build fails: check frontmatter and the branch name.
- Images do not show: ensure image paths start with `/assets/images/posts/`.
