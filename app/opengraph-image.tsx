import { ImageResponse } from 'next/og'
import { profile, site } from '@/config/site'

export const alt = site.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Generated at build time — same black-and-white language as the site. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          color: '#ffffff',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)',
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 96,
            fontWeight: 600,
            letterSpacing: '-0.04em',
            lineHeight: 1.02,
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
            justifyContent: 'space-between',
            fontSize: 26,
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <div style={{ display: 'flex' }}>{profile.description}</div>
          <div style={{ display: 'flex' }}>{profile.location}</div>
        </div>
      </div>
    ),
    size
  )
}
