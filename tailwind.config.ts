import type { Config } from 'tailwindcss'

/**
 * Design system.
 * Very few variants on purpose: one scale, one radius, three greys.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './config/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // Editorial display scale — fluid, mobile first.
        display: ['clamp(2.75rem, 12vw, 6.5rem)', { lineHeight: '0.94', letterSpacing: '-0.045em' }],
        headline: ['clamp(2rem, 7vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
        title: ['clamp(1.5rem, 4.5vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        lede: ['clamp(1.0625rem, 2.4vw, 1.25rem)', { lineHeight: '1.5', letterSpacing: '-0.011em' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: {
        shell: '76rem',
        prose: '38rem',
      },
      borderRadius: {
        DEFAULT: '0.625rem',
        lg: '0.875rem',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
export default config
