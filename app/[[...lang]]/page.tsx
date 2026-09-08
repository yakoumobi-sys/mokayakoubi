import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getContent, isLocale, LOCALES, DEFAULT_LOCALE, type Locale } from '@/config/content'
import { profile, projects, site } from '@/config/site'
import { localePath } from '@/lib/locale'
import { Hero } from '@/components/hero'
import { StartHere } from '@/components/start-here'
import { FeaturedProject } from '@/components/featured-project'
import { Learn } from '@/components/learn'
import { Building } from '@/components/building'
import { Proof } from '@/components/proof'
import { Tools } from '@/components/tools'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

type Params = { lang?: string[] }

/** '/' is English; '/fr' and '/ar' are their own pages. */
function readLocale(params: Params): Locale | null {
  const segments = params.lang ?? []
  if (segments.length === 0) return DEFAULT_LOCALE
  if (segments.length > 1) return null
  const [segment] = segments
  // '/en' would duplicate '/', so it is not a route.
  if (segment === DEFAULT_LOCALE) return null
  return isLocale(segment) ? segment : null
}

export function generateStaticParams(): Params[] {
  return [
    { lang: [] },
    ...LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
      lang: [locale],
    })),
  ]
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const locale = readLocale(params)
  if (!locale) return {}

  const t = getContent(locale)
  const path = localePath(locale)

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l)])),
        'x-default': localePath(DEFAULT_LOCALE),
      },
    },
    openGraph: {
      type: 'website',
      url: `${site.url}${path === '/' ? '' : path}`,
      siteName: profile.name,
      title: t.meta.title,
      description: t.meta.description,
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : 'ar_DZ',
      // Referenced explicitly: the image lives at the app root so it is shared
      // by all three locales instead of being generated three times.
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/opengraph-image'],
    },
  }
}

export default function Home({ params }: { params: Params }) {
  const locale = readLocale(params)
  if (!locale) notFound()

  const t = getContent(locale)
  const featured = projects.filter(
    (project) => project.featured && t.projects[project.id]
  )

  return (
    <>
      <main>
        <Hero t={t} />
        <StartHere t={t} />

        {featured.map((project, index) => (
          <FeaturedProject
            key={project.id}
            project={project}
            copy={t.projects[project.id]}
            index={index}
          />
        ))}

        <Learn t={t} />
        <Building t={t} />
        <Proof t={t} />
        <Tools t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
