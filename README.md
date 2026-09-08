# Moka Yakoubi

The hub of the Moka Yakoubi personal brand.
Next.js 14 (App Router) · TypeScript · Tailwind CSS · deployed on Vercel.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

No environment variable is required to run or build the site.

---

## Three languages

| URL | Language | Direction |
| --- | --- | --- |
| `/` | English | LTR |
| `/fr` | Français | LTR |
| `/ar` | العربية | RTL |

English stays at `/` so the link in the Instagram bio never moves. `/en`
redirects there. Each language is a real, statically generated page with its
own `<title>`, description, canonical and `hreflang` — shareable and
indexable. The switcher (EN · FR · ع) sits in the header and the footer.

To add a language: add it to `LOCALES` in `config/content/types.ts`, write
`config/content/<code>.ts` against the `Content` type, and export it from
`config/content/index.ts`. Set `dir: 'rtl'` and the whole layout mirrors.

## Edit the content

Two files to know:

- **[`config/site.ts`](config/site.ts)** — everything that does *not* change
  with the language: URLs, images, numbers, which sections are on, analytics.
- **`config/content/en.ts` · `fr.ts` · `ar.ts`** — every word on the site,
  typed against one shared `Content` shape so a missing string is a build error.

| Block | Lives in | What it controls |
| --- | --- | --- |
| `profile` | both | Name and photo in `site.ts`; tagline, one-liner, location in `content/` |
| `site` | `site.ts` | Canonical URL, keywords |
| `socialLinks` | `site.ts` | Instagram, TikTok, Facebook… — **empty links are hidden everywhere** |
| `startHere` | both | How the CTA behaves in `site.ts`; every word in `content/` |
| `projects` | both | URL, image, year in `site.ts`; name and description per language |
| `resources` | both | The "Learn" grid — add to both, get a card |
| `affiliateTools` | `site.ts` | "Things I use" — hidden until `enabled: true` with real items |
| `stats` | both | The numbers in `site.ts`, their labels in `content/` |
| `contact` | both | Addresses in `site.ts`, the three categories in `content/` |
| `navigation` | both | Anchors in `site.ts`, labels in `content/` |
| `analytics` | `site.ts` | Which provider to load (one at a time) |

Anything marked `// TODO` in `site.ts` is intentionally empty — nothing was
invented. The UI degrades gracefully: no URL means no button, not a dead link.

### Adding a photo

Drop the file in `public/` (e.g. `public/moka.jpg`) and set
`profile.photo = '/moka.jpg'`. The hero switches to a two-column layout.
Same idea for `projects[].image`.

---

## The "Get it free" form

`startHere.mode` decides how the main CTA behaves:

- `'email'` (default) — an inline field posting to `POST /api/subscribe`.
- `'link'` — a button opening `startHere.url` (Beehiiv, ConvertKit, Brevo,
  a WhatsApp link, a Notion page…). Paste the URL, flip the mode, done.

In `'email'` mode, the destination is configured with environment variables
(see `.env.example`):

- `SUBSCRIBE_WEBHOOK_URL` — any tool accepting `POST {"email","source"}`.
- or `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — writes to the
  `newsletter_subscribers` table from [`database.sql`](database.sql).

While nothing is configured the API answers honestly ("Signups are not open
yet") instead of faking a success.

---

## Analytics

Set `analytics.provider` in `config/site.ts` to `plausible`, `ga`, `posthog`
or `meta`, plus the matching `id`. One provider at a time; nothing is loaded
while it is `'none'`.

Every CTA is already instrumented — see `EVENTS` in
[`lib/analytics.ts`](lib/analytics.ts): `cta_start_here`, `cta_playbook`,
`playbook_subscribed`, `cta_project`, `cta_resource`, `cta_contact`,
`cta_social`, `nav_click`.

---

## Structure

```
app/
  [[...lang]]/
    layout.tsx          html lang/dir, fonts, structured data, analytics
    page.tsx            section composition, per-locale metadata
  globals.css           design tokens + primitives (incl. RTL rules)
  opengraph-image.tsx   share card, generated at build
  icon.tsx              favicon, generated at build
  sitemap.ts robots.ts
  api/subscribe/        email capture endpoint
components/             one file per section, plus ui/ primitives
config/site.ts          ← structure, links, numbers
config/content/         ← every word, one file per language
lib/                    analytics, locale paths, subscriber providers, supabase
```
