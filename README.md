# The Grit Chronicles — website

## 1. Add your files
Drop these into `/public` (not included — you're adding them yourself):
- `logo.webp`
- `background.mp4`
- `book.webp` (only needed once you flip `showProductCard` on in `config/sections.js`)

## 2. Env vars
Copy `.env.example` to `.env.local` for local dev, and add the same keys in
Vercel → Project → Settings → Environment Variables:

- `LISTMONK_LIST_UUID` — your Listmonk list's UUID
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID` — from Umami
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL` — your Umami script URL
- `NEXT_PUBLIC_SITE_URL` — your production domain (used in SEO tags, sitemap, robots.txt)

## 3. Toggle sections
Everything on/off lives in one file: `config/sections.js`. No component
digging required.

## 4. Run locally
```
npm install
npm run dev
```

## 5. Deploy
Push to GitHub, import into Vercel, add the env vars above, deploy.

## Notes
- The subscribe form POSTs directly from the browser to your Listmonk
  instance (`mail.vendro.cc`) — there's no backend proxy, so there's nothing
  to keep warm or maintain server-side for it.
- Umami tracks pageviews and time-on-page automatically once the script
  loads. Custom events fired: `subscribe_submit`, `get_book_click`,
  `social_click` (with a `platform` property).
- `/book` isn't built yet. The product card is off by default
  (`showProductCard: false`) so there's no dead link in the meantime.
