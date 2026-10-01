import { FunnelHome } from '@/components/funnel/home'
import { FunnelWizard } from '@/components/funnel/wizard'
import { FunnelPrivacy } from '@/components/funnel/privacy'
import { funnel, isTrack, tracks } from '@/config/funnel'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import {
  getContent,
  isLocale,
  LOCALES,
  DEFAULT_LOCALE,
  type Locale,
} from '@/config/content'
import { profile, site } from '@/config/site'
import { localePath } from '@/lib/locale'
import { Hero } from '@/components/hero'
import { StartHere } from '@/components/start-here'
import { Learn } from '@/components/learn'
import { Building } from '@/components/building'
import { Tools } from '@/components/tools'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

type Params = { lang?: string[] }

/** French funnel at '/', preserved editorial translations at '/en' and '/ar'. */
function readLocale(params: Params): Locale | null {
  const segments = params.lang ?? []
  if (segments.length === 0) return DEFAULT_LOCALE
  if (segments[0] === 'projet' && segments.length === 2 && isTrack(segments[1])) return 'fr'
  if (segments.length === 1 && segments[0] === 'confidentialite') return 'fr'
  if (segments.length > 1) return null
  const [segment] = segments
  // The default locale is redirected to '/' by next.config.js.
  if (segment === DEFAULT_LOCALE) return null
  return isLocale(segment) ? segment : null
}

export function generateStaticParams(): Params[] {
  return [
    { lang: [] },
    ...tracks.map(track => ({ lang: ['projet', track] })),
    { lang: ['confidentialite'] },
    ...LOCALES.filter((locale) => locale !== DEFAULT_LOCALE).map((locale) => ({
      lang: [locale],
    })),
  ]
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const locale = readLocale(params)
  if (!locale) return {}

  if (params.lang?.[0] === 'projet' && isTrack(params.lang[1])) {
    const item = funnel[params.lang[1]]
    return { metadataBase: new URL(site.url), title: `${item.label} — Moka Yakoubi`, description: item.description, alternates: { canonical: `/projet/${params.lang[1]}` } }
  }
  if (params.lang?.[0] === 'confidentialite') return {metadataBase:new URL(site.url),title:'Confidentialité — Moka Yakoubi', alternates:{canonical:'/confidentialite'}}
  const t = getContent(locale)
  const path = localePath(locale)

  return {
    metadataBase: new URL(site.url),
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
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
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

  if (params.lang?.[0] === 'projet' && isTrack(params.lang[1])) return <FunnelWizard key={params.lang[1]} track={params.lang[1]} />
  if (params.lang?.[0] === 'confidentialite') return <FunnelPrivacy />
  if (locale === 'fr') return <FunnelHome />
  const t = getContent(locale)

  return (
    <>
      <main id="main-content">
        <Hero t={t} />
        <Building t={t} />
        <StartHere t={t} />
        <Learn t={t} />
        <Tools t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
