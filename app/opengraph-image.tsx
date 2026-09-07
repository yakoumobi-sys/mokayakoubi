import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { profile, site } from '@/config/site'

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Generated at build time — same black-and-white language as the site. */
export default async function OpenGraphImage() {
  // The portrait is optional: if it isn't there, the card stays typographic.
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
            {profile.tagline.map((line) => (
              <div key={line} style={{ display: 'flex' }}>
                {line}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            {profile.description}
          </div>
        </div>

        {portrait && (
          <div style={{ display: 'flex', width: 470, height: '100%' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portrait}
              alt=""
              width={470}
              height={630}
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}
      </div>
    ),
    size
  )
}
