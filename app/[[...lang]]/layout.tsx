import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import '../globals.css'
import '../club.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--oc-sans' })
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--oc-serif' })

export const metadata: Metadata = {
  metadataBase: new URL('https://mokayakoubi.vercel.app'),
  title: { default: '1% CLUB — Build Different | By MOKA', template: '%s | 1% CLUB' },
  description: 'Un cercle privé pour les fondateurs ambitieux en Algérie. Rencontres, masterclasses, accountability et connexions qui font avancer. 1% CLUB by MOKA.',
  keywords: ['1% Club', 'Moka Yakoubi', 'entrepreneurs Algérie', 'mastermind Alger', 'founders community'],
  robots: { index: true, follow: true },
  openGraph: { title: '1% CLUB — Build Different', description: 'Un cercle privé pour ceux qui construisent.', siteName: '1% CLUB by MOKA', type: 'website', locale: 'fr_DZ', url: 'https://mokayakoubi.vercel.app', images: ['/opengraph-image'] },
  twitter: { card: 'summary_large_image', title: '1% CLUB — Build Different', images: ['/opengraph-image'] },
}

export const viewport: Viewport = {
  themeColor: '#0a0b0b', colorScheme: 'dark', width: 'device-width', initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable + ' ' + instrument.variable}>
      <body className="oc-body">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Organization', name: '1% CLUB by MOKA',
          url: 'https://mokayakoubi.vercel.app',
          founder: { '@type': 'Person', name: 'Mohamed Yakoubi', alternateName: 'MOKA', sameAs: ['https://www.instagram.com/mokayakoubi'] },
          description: 'Communauté privée d’entrepreneurs en Algérie, en préparation.'
        }) }} />
      </body>
    </html>
  )
}