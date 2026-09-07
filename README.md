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

## Edit the content

**Everything lives in [`config/site.ts`](config/site.ts).** Components never
hardcode text, numbers or URLs — change the config and the whole site follows.

| Block | What it controls |
| --- | --- |
| `profile` | Name, tagline, one-liner, location, portrait photo |
| `site` | Canonical URL, SEO title, description, keywords |
| `socialLinks` | Instagram, TikTok, YouTube, LinkedIn, X — **empty links are hidden everywhere** |
| `startHere` | The Moka Playbook block: copy, topics, and how the CTA behaves |
| `projects` | Caractère, InvoiceDZ and anything you add next |
| `resources` | The "Learn" grid — add an object, get a card |
| `affiliateTools` | "Things I use" — hidden until you set `enabled: true` with real items |
| `stats` | 220K+, 8.8M… the numbers that change |
| `contact` | Email / form URL and the three "Work with me" categories |
| `navigation` | Nav items |
| `analytics` | Which analytics provider to load (one at a time) |

Anything marked `// TODO` in that file is intentionally empty — nothing was
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
  layout.tsx            metadata, fonts, Person structured data, analytics
  page.tsx              section composition
  globals.css           design tokens + primitives
  opengraph-image.tsx   OG image, generated at build
  icon.tsx              favicon, generated at build
  sitemap.ts robots.ts
  api/subscribe/        email capture endpoint
components/             one file per section, plus ui/ primitives
config/site.ts          ← all content and URLs
lib/                    analytics, subscriber providers, supabase (optional)
```
