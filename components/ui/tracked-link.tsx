'use client'

import type { ReactNode } from 'react'
import { track, type EventName } from '@/lib/analytics'

/**
 * A plain anchor that reports the click. Used for every CTA so the config
 * stays the single source of truth for what converts.
 */
export function TrackedLink({
  href,
  event,
  props,
  children,
  className = '',
  external,
}: {
  href: string
  event: EventName
  props?: Record<string, string | number | boolean | undefined>
  children: ReactNode
  className?: string
  external?: boolean
}) {
  const isExternal = external ?? /^https?:\/\//.test(href)

  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, props)}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}
