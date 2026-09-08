'use client'

import { useState } from 'react'
import { startHere } from '@/config/site'
import type { Content } from '@/config/content'
import { Arrow } from '@/components/ui/arrow'
import { EVENTS, track } from '@/lib/analytics'

type State = 'idle' | 'loading' | 'done' | 'error'

/**
 * A bad address is the visitor's to fix, so it always shows the error.
 * Any other failure is ours (no provider configured, the provider rejected
 * the write, the network dropped) and must not cost them the download.
 */
function canDeliverAnyway(reason?: string): boolean {
  if (!startHere.deliverIfStorageFails || !startHere.file) return false
  return reason !== 'invalid_email'
}

/**
 * The one form on the site. It posts to /api/subscribe, which stores the
 * address wherever the project is configured to (see lib/subscribers.ts),
 * then hands over the file.
 */
export function PlaybookForm({ t }: { t: Content }) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'loading') return

    setState('loading')
    track(EVENTS.playbook, { place: 'start_here', locale: t.locale })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: `playbook_${t.locale}` }),
      })
      const data = (await response.json().catch(() => ({}))) as { reason?: string }

      if (response.ok) {
        setState('done')
        setMessage(t.startHere.done)
        setEmail('')
        track(EVENTS.playbookSuccess, { stored: true })
      } else if (canDeliverAnyway(data.reason)) {
        // The address could not be stored. The file is free and already on
        // the server, so hand it over rather than dead-ending the main CTA.
        setState('done')
        setMessage(t.startHere.delivered)
        setEmail('')
        track(EVENTS.playbookSuccess, { stored: false, reason: data.reason })
      } else {
        setState('error')
        setMessage(
          data.reason === 'invalid_email'
            ? t.startHere.errors.invalid
            : data.reason === 'not_configured'
              ? t.startHere.errors.notOpen
              : t.startHere.errors.generic
        )
      }
    } catch {
      if (canDeliverAnyway('network_error')) {
        setState('done')
        setMessage(t.startHere.delivered)
        track(EVENTS.playbookSuccess, { stored: false, reason: 'network_error' })
      } else {
        setState('error')
        setMessage(t.startHere.errors.generic)
      }
    }
  }

  if (state === 'done') {
    return (
      <div role="status">
        <p className="text-[0.9375rem] text-paper">{message}</p>
        {startHere.file && (
          <a
            href={startHere.file}
            download
            onClick={() => track(EVENTS.playbookDownload, { locale: t.locale })}
            className="btn-invert mt-5 w-full sm:w-auto"
          >
            {t.startHere.fileCta}
            <Arrow />
          </a>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="playbook-email" className="sr-only">
          {t.startHere.emailLabel}
        </label>
        <input
          id="playbook-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          dir="ltr"
          placeholder={t.startHere.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          /* `flex-1` only from sm: in the mobile column layout it sets a
             flex-basis on the *height* and collapses the field to its content.
             Filled rather than outlined, because on a black panel next to a
             solid white button an outlined pill reads as decoration.
             16px text so iOS does not zoom the page on focus. */
          className="h-14 w-full rounded-full border border-white/30 bg-white/[0.08] px-5
                     text-start text-base text-paper placeholder:text-white/65
                     transition-colors duration-200 focus:border-white/70 focus:bg-white/[0.14]
                     focus:outline-none focus-visible:outline-none
                     sm:h-12 sm:max-w-sm sm:flex-1 sm:text-[0.9375rem]"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-invert h-14 w-full disabled:opacity-60 sm:h-12 sm:w-auto"
        >
          {state === 'loading' ? t.startHere.sending : t.startHere.cta}
          {state !== 'loading' && <Arrow />}
        </button>
      </div>

      <p
        className={`mt-4 text-[0.8125rem] ${state === 'error' ? 'text-paper' : 'text-white/60'}`}
        role={state === 'error' ? 'alert' : undefined}
      >
        {state === 'error' ? message : t.startHere.note}
      </p>
    </form>
  )
}
