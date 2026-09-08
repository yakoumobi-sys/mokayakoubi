import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { Nav } from '@/components/nav'
import { Analytics } from '@/components/analytics'
import { getContent, isLocale, DEFAULT_LOCALE, type Locale } from '@/config/content'
import { contact, profile, projects, site, socialLinks } from '@/config/site'
import { localePath } from '@/lib/locale'
import '../globals.css'

const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

/** Used for two things only: project numbers and the project plates. */
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
})

/** Only pulled in on the Arabic page — never preloaded on the others. */
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
  variable: '--font-arabic',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  keywords: [...site.keywords],
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

function readLocale(params: { lang?: string[] }): Locale {
  const segment = params.lang?.[0]
  return segment && isLocale(segment) ? segment : DEFAULT_LOCALE
}

/** Person (+ the companies he founded) for search engines. */
function StructuredData({ locale }: { locale: Locale }) {
  const t = getContent(locale)
  const knownProjects = projects.filter((project) => project.url && t.projects[project.id])
  const sameAs = socialLinks.map((link) => link.url).filter(Boolean)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.alternateName,
    url: `${site.url}${localePath(locale) === '/' ? '' : localePath(locale)}`,
    description: t.meta.description,
    jobTitle: 'Founder',
    address: { '@type': 'PostalAddress', addressCountry: profile.countryCode },
    ...(contact.email ? { email: `mailto:${contact.email}` } : {}),
    ...(profile.photo ? { image: `${site.url}${profile.photo}` } : {}),
    ...(knownProjects.length > 0
      ? {
          worksFor: knownProjects.map((project) => ({
            '@type': 'Organization',
            name: t.projects[project.id].name,
            url: project.url,
          })),
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  )
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang?: string[] }
}) {
  const locale = readLocale(params)
  const t = getContent(locale)

  return (
    <html
      lang={locale}
      dir={t.dir}
      className={`${sans.variable} ${serif.variable} ${arabic.variable}`}
    >
      <head>
        {/* Without JS the reveal animation must never hide content. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className={`antialiased ${t.dir === 'rtl' ? 'font-arabic' : 'font-sans'}`}>
        <Nav t={t} />
        {children}
        <StructuredData locale={locale} />
        <Analytics />
      </body>
    </html>
  )
}
