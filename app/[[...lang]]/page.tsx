import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MokaHome } from '@/components/moka/site'
import { ClubPage, ResourcesPage, ProjectsPage, ConferencesPage, PartnershipsPage, JournalPage } from '@/components/moka/pages'
import { MokaPrivacyPage } from '@/components/moka/privacy'

type Params = { lang?: string[] }
type Props = { params: Params }

const pages = {
  ressources: {title: 'Ressources gratuites', description: 'Conférences YouTube et guides PDF gratuits de Moka Yakoubi sur le branding, le contenu et l’entrepreneuriat.'},
  club: {title: 'DZ Founders Club', description: 'Le club privé d’entrepreneurs DZ Founders Club : fondateurs, rencontres, formations et événements en Algérie.'},
  projets: {title: 'Mes projets', description: 'Découvre les entreprises et projets construits par Mohamed Moka Yakoubi, dont Caractère et DZ Founders Club.'},
  conferences: {title: 'Conférences et speaking', description: 'Retrouve les conférences de Moka Yakoubi et invite-le à intervenir à un événement.'},
  partenariats: {title: 'Partenariats avec Moka', description: 'Collabore avec Moka Yakoubi : brand deals, contenus, conférences et projets d’entrepreneuriat.'},
  journal: {title: 'The Builder’s Journal', description: 'Notes de terrain de Moka Yakoubi sur le branding, la création de contenu et la construction d’entreprise.'},
  confidentialite: {title: 'Confidentialité', description: 'Politique de confidentialité du site Moka Yakoubi et des candidatures DZ Founders Club.'}
} as const

export function generateStaticParams(): Params[] {
  return [{ lang: [] }, ...Object.keys(pages).map(p=>({lang:[p]}))]
}

export function generateMetadata({params}:Props): Metadata {
  const key=params.lang?.length===1?params.lang[0]:''
  if (!key) return {title: 'Moka Yakoubi — Entrepreneur, Creator & Builder',description:'Entrepreneur algérien, fondateur de Caractère. Découvre les conférences gratuites, les projets, DZ Founders Club et les collaborations avec Moka.',alternates:{canonical:'/'}}
  if (!(key in pages)) return {}
  const info=pages[key as keyof typeof pages]
  return {title:info.title,description:info.description,alternates:{canonical:'/'+key},openGraph:{title:info.title,description:info.description,url:'/'+key}}
}

export default function Page({params}:Props) {
  const segments=params.lang??[]
  if(segments.length===0)return <MokaHome/>
  if(segments.length!==1)notFound()
  switch(segments[0]){
    case 'ressources':return <ResourcesPage/>
    case 'club':return <ClubPage/>
    case 'projets':return <ProjectsPage/>
    case 'conferences':return <ConferencesPage/>
    case 'partenariats':return <PartnershipsPage/>
    case 'journal':return <JournalPage/>
    case 'confidentialite':return <MokaPrivacyPage/>
    default:notFound()
  }
}
