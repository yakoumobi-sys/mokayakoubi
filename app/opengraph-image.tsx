import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { profile } from '@/config/site'
import { en } from '@/config/content/en'

export const alt = en.meta.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * One share card for every language.
 *
 * The tagline stays in English on purpose: it is the brand statement, it is
 * Latin script, and it renders identically everywhere. Localising it would
 * mean shipping an Arabic font into the image renderer for one line of text.
 */
export default async function OpenGraphImage() {
  let portrait: string | null = null
  if (profile.photo) {
    try {
      const file = await readFile(join(process.cwd(), 'public', profile.photo))
      portrait = `data:image/jpeg;base64,${file.toString('base64')}`
    } catch {
      portrait = null
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '72px',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: portrait ? 72 : 96,
              letterSpacing: '-0.04em',
              lineHeight: 1.04,
            }}
          >
            {en.profile.tagline.map((line) => (
              <div key={line} style={{ display: 'flex' }}>
                {line}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', fontSize: 24, color: 'rgba(255,255,255,0.6)' }}>
            {en.profile.description}
          </div>
        </div>

        {portrait && (
          <div style={{ display: 'flex', width: 470, height: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={portrait} alt="" width={470} height={630} style={{ objectFit: 'cover' }} />
          </div>
        )}
      </div>
    ),
    size
  )
}
