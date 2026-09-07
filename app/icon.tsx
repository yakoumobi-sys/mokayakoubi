import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/** Favicon: a single letter on black. Replace with /public assets if you get a mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          color: '#ffffff',
          fontSize: 42,
          fontWeight: 600,
          letterSpacing: '-0.04em',
          fontFamily: 'sans-serif',
        }}
      >
        M
      </div>
    ),
    size
  )
}
