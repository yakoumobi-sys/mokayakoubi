import { NextResponse } from 'next/server'
import { subscribe } from '@/lib/subscribers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(request: Request) {
  let email = ''
  let source = 'playbook'

  try {
    const body = (await request.json()) as { email?: unknown; source?: unknown }
    email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
    if (typeof body.source === 'string' && body.source) source = body.source
  } catch {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 })
  }

  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: 'Please enter a valid email address.', reason: 'invalid_email' },
      { status: 400 }
    )
  }

  try {
    const result = await subscribe(email, source)

    if (result.ok) {
      return NextResponse.json({
        message: result.alreadySubscribed
          ? "You're already on the list."
          : "You're in. Check your inbox.",
      })
    }

    if (result.reason === 'not_configured') {
      // Honest failure: the form is real, the destination just isn't set yet.
      return NextResponse.json(
        {
          message: 'Signups are not open yet. Try again shortly.',
          reason: 'not_configured',
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { message: 'Something went wrong. Please try again.', reason: 'storage_failed' },
      { status: 502 }
    )
  } catch (error) {
    console.error('[subscribe]', error)
    return NextResponse.json(
      { message: 'Something went wrong. Please try again.', reason: 'storage_failed' },
      { status: 500 }
    )
  }
}
