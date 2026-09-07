import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import { Nav } from '@/components/nav'
import { Analytics } from '@/components/analytics'
import { contact, profile, projects, site, socialLinks } from '@/config/site'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${profile.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
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

/** Person (+ the companies he founded) for search engines. */
function StructuredData() {
  const knownProjects = projects.filter((project) => project.url)

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.alternateName,
    url: site.url,
    description: site.description,
    jobTitle: 'Founder',
    address: {
      '@type': 'PostalAddress',
      addressCountry: profile.countryCode,
    },
    ...(contact.email ? { email: `mailto:${contact.email}` } : {}),
    ...(profile.photo ? { image: `${site.url}${profile.photo}` } : {}),
    ...(knownProjects.length > 0
      ? {
          worksFor: knownProjects.map((project) => ({
            '@type': 'Organization',
            name: project.name,
            url: project.url,
          })),
        }
      : {}),
    ...((): Record<string, string[]> => {
      const sameAs = socialLinks.map((link) => link.url).filter(Boolean)
      return sameAs.length > 0 ? { sameAs } : {}
    })(),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
    />
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${sans.variable} ${serif.variable}`}>
      <head>
        {/* Without JS the reveal animation must never hide content. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased">
        <Nav />
        {children}
        <StructuredData />
        <Analytics />
      </body>
    </html>
  )
}
