'use client'

import { useState } from 'react'
import { startHere } from '@/config/site'
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
 * address wherever the project is configured to (see lib/subscribers.ts).
 * If nothing is configured yet the API says so and the visitor sees a real
 * message — no fake "thanks!".
 */
export function PlaybookForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'loading') return

    setState('loading')
    track(EVENTS.playbook, { place: 'start_here' })

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'playbook' }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        message?: string
        reason?: string
      }

      if (response.ok) {
        setState('done')
        setMessage(data.message || "You're in.")
        setEmail('')
        track(EVENTS.playbookSuccess)
      } else if (canDeliverAnyway(data.reason)) {
        // The address could not be stored (no provider, or the provider
        // rejected it). The file is free and already on the server, so hand
        // it over rather than letting the site's main CTA dead-end.
        setState('done')
        setMessage('Here it is.')
        setEmail('')
        track(EVENTS.playbookSuccess, { stored: false, reason: data.reason })
      } else {
        setState('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      if (canDeliverAnyway('network_error')) {
        setState('done')
        setMessage('Here it is.')
        track(EVENTS.playbookSuccess, { stored: false, reason: 'network_error' })
      } else {
        setState('error')
        setMessage('Network error. Please try again.')
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
            onClick={() => track(EVENTS.playbookDownload)}
            className="btn-invert mt-5 w-full sm:w-auto"
          >
            {startHere.fileCta}
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
          Email address
        </label>
        <input
          id="playbook-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@email.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 w-full flex-1 rounded-full border border-white/20 bg-transparent px-5
                     text-[0.9375rem] text-paper placeholder:text-white/55
                     transition-colors duration-200 focus:border-white/50 focus:outline-none
                     focus-visible:outline-none sm:max-w-sm"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="btn-invert w-full disabled:opacity-60 sm:w-auto"
        >
          {state === 'loading' ? 'Sending…' : startHere.cta}
          {state !== 'loading' && <Arrow />}
        </button>
      </div>

      <p
        className={`mt-4 text-[0.8125rem] ${state === 'error' ? 'text-paper' : 'text-white/60'}`}
        role={state === 'error' ? 'alert' : undefined}
      >
        {state === 'error' ? message : startHere.note}
      </p>
    </form>
  )
}
