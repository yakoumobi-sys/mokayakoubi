import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ClubSite } from '@/components/club/site'
import { PrivacyPage } from '@/components/club/privacy'

type Params = { lang?: string[] }

export function generateStaticParams(): Params[] {
  return [{ lang: [] }, { lang: ['confidentialite'] }]
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  if (params.lang?.[0] === 'confidentialite') return {
    title: 'Confidentialité',
    description: 'Comment 1% CLUB utilise les données communiquées dans une candidature.',
    alternates: { canonical: '/confidentialite' }
  }
  return { alternates: { canonical: '/' } }
}

export default function Page({ params }: { params: Params }) {
  const segments = params.lang ?? []
  if (segments.length === 0) return <ClubSite />
  if (segments.length === 1 && segments[0] === 'confidentialite') return <PrivacyPage />
  notFound()
}