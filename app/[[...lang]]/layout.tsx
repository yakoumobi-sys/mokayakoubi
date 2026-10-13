import type { Metadata, Viewport } from 'next'
import { Manrope, Instrument_Serif } from 'next/font/google'
import '../globals.css'
import '../club.css'
import '../moka.css'

const inter = Manrope({ subsets: ['latin'], display: 'swap', variable: '--oc-sans' })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--oc-serif' })

const base='https://mokayakoubi.vercel.app'
export const metadata:Metadata={
 metadataBase:new URL(base),
 title:{default:'Moka Yakoubi — Entrepreneur & fondateur en Algérie',template:'%s | Moka Yakoubi'},
 description:'Le site officiel de Moka Yakoubi : entrepreneuriat, ressources gratuites, conférences, Caractère et DZ Founders Club.',
 keywords:['Moka Yakoubi','Mohamed Yakoubi','entrepreneur Algérie','Caractère','DZ Founders Club','conférences','création de marque'],
 robots:{index:true,follow:true},
 openGraph:{title:'Moka Yakoubi — Les idées prennent vie.',description:'Entrepreneur et fondateur de Caractère. Des projets, des conférences gratuites et un cercle de fondateurs en Algérie.',siteName:'Moka Yakoubi',type:'website',locale:'fr_DZ',url:base,images:['/opengraph-image']},
 twitter:{card:'summary_large_image',title:'Moka Yakoubi — Les idées prennent vie.',images:['/opengraph-image']}
}
export const viewport:Viewport={themeColor:'#f4f5ef',colorScheme:'light',width:'device-width',initialScale:1}
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="fr" className={inter.variable+' '+instrument.variable}><body className="oc-body">{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'Person',name:'Mohamed Yakoubi',alternateName:'Moka Yakoubi',url:base,jobTitle:'Entrepreneur',knowsAbout:['Branding','Entrepreneuriat','Textile personnalisé','Marketing'],sameAs:['https://www.instagram.com/mokayakoubi/']})}}/></body></html>
}
