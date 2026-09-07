'use client'

import { useState } from 'react'
import { startHere } from '@/config/site'
import { Arrow } from '@/components/ui/arrow'
import { EVENTS, track } from '@/lib/analytics'

type State = 'idle' | 'loading' | 'done' | 'error'

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
      const data = (await response.json().catch(() => ({}))) as { message?: string }

      if (response.ok) {
        setState('done')
        setMessage(data.message || "You're in.")
        setEmail('')
        track(EVENTS.playbookSuccess)
      } else {
        setState('error')
        setMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setState('error')
      setMessage('Network error. Please try again.')
    }
  }

  if (state === 'done') {
    return (
      <p
        role="status"
        className="flex min-h-[3rem] items-center text-[0.9375rem] text-paper"
      >
        {message}
      </p>
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
