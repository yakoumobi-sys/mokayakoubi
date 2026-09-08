import type { MetadataRoute } from 'next'
import { site } from '@/config/site'
import { LOCALES, DEFAULT_LOCALE } from '@/config/content'
import { localePath } from '@/lib/locale'

const absolute = (locale: (typeof LOCALES)[number]) => {
  const path = localePath(locale)
  return `${site.url}${path === '/' ? '' : path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LOCALES.map((locale) => [locale, absolute(locale)]))

  return LOCALES.map((locale) => ({
    url: absolute(locale),
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
    alternates: { languages },
  }))
}
