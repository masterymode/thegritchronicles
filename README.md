# The Grit Chronicles — website (Eleventy)

## 1. Add your files
Drop these into `/public` (not included — you're adding them yourself):
- `logo.webp`
- `background.mp4`
- `book.webp` (only needed once you flip `showProductCard` on in `src/_data/sections.js`)

## 2. Env vars
Copy `.env.example` to `.env.local` for local dev, and add the same keys in
Vercel → Project → Settings → Environment Variables:

- `LISTMONK_LIST_UUID` — your Listmonk list's UUID
- `UMAMI_WEBSITE_ID` — from Umami
- `SITE_URL` — your production domain (used in SEO tags, sitemap, robots.txt)

Your Umami **script URL** is not an env var — `src/_data/site.js` hardcodes
Umami Cloud's fixed URL (`https://cloud.umami.is/script.js`), same for every
project on Umami Cloud. Only the website ID is per-project, so that's the
only thing you set. If you're ever self-hosting Umami instead of using
their cloud, update that one constant to your instance's URL.

No `NEXT_PUBLIC_` prefixes needed this time — Eleventy is a static site
generator, everything gets baked directly into the HTML at build time, so
there's no client/server env var distinction to worry about. If you already
added the `NEXT_PUBLIC_...` versions in Vercel from the earlier build,
rename them to match the names above.

## 3. Toggle sections
Everything on/off lives in one file: `src/_data/sections.js`. No template
digging required.

## 4. Run locally
```
npm install
npm run dev
```
Opens at http://localhost:8080

## 5. Deploy
Push to GitHub, import into Vercel, add the env vars above, deploy.
`vercel.json` already tells Vercel the build command and output folder.

## Notes
- The subscribe form POSTs directly from the browser to your Listmonk
  instance (`mail.vendro.cc`) — no backend proxy, nothing to maintain
  server-side for it.
- Every page is plain pre-built HTML — no JS framework runtime shipped.
  The only JS on the page is `assets/js/track.js` (a few lines, for Umami
  click/submit tracking) and Umami's own script.
- Umami tracks pageviews and time-on-page automatically once the script
  loads. Custom events fired: `subscribe_submit`, `get_book_click`,
  `social_click` (with a `platform` property) — driven by `data-track` /
  `data-platform` attributes in `src/index.njk`.
- `/book` isn't built yet. The product card is off by default
  (`showProductCard: false`) so there's no dead link in the meantime.
