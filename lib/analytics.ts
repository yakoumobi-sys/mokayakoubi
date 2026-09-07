import { analytics } from '@/config/site'

/**
 * One tiny tracking layer for every CTA on the site.
 *
 * Pick a provider in config/site.ts (`analytics.provider`) and this starts
 * sending events. While the provider is 'none' nothing is loaded and nothing
 * is sent — no trackers, no cookie banner needed.
 *
 * Only one provider runs at a time, on purpose.
 */

/** Every conversion point on the site. Keep this list short and stable. */
export const EVENTS = {
  startHere: 'cta_start_here',
  playbook: 'cta_playbook',
  playbookSuccess: 'playbook_subscribed',
  project: 'cta_project',
  resource: 'cta_resource',
  contact: 'cta_contact',
  social: 'cta_social',
  nav: 'nav_click',
} as const

export type EventName = (typeof EVENTS)[keyof typeof EVENTS]

type Props = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void
    gtag?: (command: string, target: string, params?: Props) => void
    posthog?: { capture: (event: string, props?: Props) => void }
    fbq?: (command: string, event: string, params?: Props) => void
    dataLayer?: unknown[]
  }
}

export function track(event: EventName, props: Props = {}): void {
  if (typeof window === 'undefined') return

  const clean: Props = {}
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined && value !== '') clean[key] = value
  }

  switch (analytics.provider) {
    case 'plausible':
      window.plausible?.(event, { props: clean })
      break
    case 'ga':
      window.gtag?.('event', event, clean)
      break
    case 'posthog':
      window.posthog?.capture(event, clean)
      break
    case 'meta':
      window.fbq?.('trackCustom', event, clean)
      break
    default:
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.debug('[analytics]', event, clean)
      }
  }
}

/** Convenience for onClick handlers: `onClick={onTrack(EVENTS.project, {...})}` */
export function onTrack(event: EventName, props: Props = {}) {
  return () => track(event, props)
}
