# Decap CMS Setup for GitHub Pages

## Summary

Decap CMS is compatible with this Astro project and content model.

- Content collection folder: `src/content/posts`
- Frontmatter used by site: `title`, `description`, `date`, `readTime`, `image`, `slug`
- CMS route: `/admin/`

## Why OAuth Proxy Is Required in Production

GitHub Pages is static hosting only. Decap's `github` backend needs a server-side OAuth code exchange.

So:

- Local editing can work with `local_backend: true`.
- Production editing requires an OAuth proxy endpoint.

## Files Added

- `public/admin/index.html`
- `public/admin/config.yml`

## Configure Repository

In `public/admin/config.yml`, set:

```yml
backend:
  name: github
  repo: YOUR_GITHUB_USERNAME/YOUR_REPO_NAME
  branch: main
  base_url: https://oauth.your-domain.com
  auth_endpoint: auth
```

Notes:

- `repo` must match the GitHub repo that stores this Astro site.
- `branch` should match your default deployment branch.
- `base_url` is the OAuth proxy origin.
- `auth_endpoint` is the OAuth path exposed by that proxy.

## OAuth App Settings (GitHub)

Create a GitHub OAuth App and set:

- Homepage URL: your public site URL (for example `https://ivivan.com`)
- Authorization callback URL: your OAuth proxy callback URL

Exact callback URL depends on your proxy implementation.

## Local Development

Start Astro and the local CMS proxy in separate terminals:

```bash
npm run dev
npm run cms:proxy
```

Then open:

- `http://localhost:4321/admin/`

## Common Troubleshooting

- `Error: Not Found` on login:
  - OAuth proxy URL/path is incorrect in `config.yml`.
- `No provider` / OAuth callback mismatch:
  - Callback URL in GitHub OAuth App does not match proxy callback.
- Content saves but build fails:
  - Ensure frontmatter fields are valid (`date` should be a date string).
- Images do not show:
  - Ensure image path starts with `/assets/images/posts/`.
