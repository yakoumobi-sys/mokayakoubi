import { getSupabaseAdmin, hasSupabase } from '@/lib/supabase'

/**
 * Where email signups go.
 *
 * Nothing here is faked: if no provider is configured the API answers with a
 * clear "not configured" result instead of pretending the signup worked.
 *
 * Configure with environment variables (see .env.example):
 *
 *   SUBSCRIBE_WEBHOOK_URL   → any tool that accepts a POST with JSON:
 *                             Beehiiv, ConvertKit, Brevo, Zapier, Make, n8n…
 *   NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *                           → stores rows in the `newsletter_subscribers`
 *                             table from database.sql
 *
 *   EMAIL_PROVIDER          → optional override: 'webhook' | 'supabase' | 'none'
 */

export type SubscribeResult =
  | { ok: true; alreadySubscribed?: boolean }
  | { ok: false; reason: 'not_configured' | 'failed' }

export type Provider = 'webhook' | 'supabase' | 'none'

export function resolveProvider(): Provider {
  const forced = process.env.EMAIL_PROVIDER as Provider | undefined
  if (forced === 'webhook' || forced === 'supabase' || forced === 'none') {
    return forced
  }
  if (process.env.SUBSCRIBE_WEBHOOK_URL) return 'webhook'
  if (hasSupabase()) return 'supabase'
  return 'none'
}

export async function subscribe(
  email: string,
  source: string
): Promise<SubscribeResult> {
  const provider = resolveProvider()

  if (provider === 'webhook') {
    const url = process.env.SUBSCRIBE_WEBHOOK_URL
    if (!url) return { ok: false, reason: 'not_configured' }

    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    // Optional: most APIs (Beehiiv, ConvertKit, Brevo) want an auth header.
    if (process.env.SUBSCRIBE_WEBHOOK_TOKEN) {
      headers.Authorization = `Bearer ${process.env.SUBSCRIBE_WEBHOOK_TOKEN}`
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, source }),
    })

    return response.ok ? { ok: true } : { ok: false, reason: 'failed' }
  }

  if (provider === 'supabase') {
    const client = getSupabaseAdmin()
    if (!client) return { ok: false, reason: 'not_configured' }

    const { error } = await client
      .from('newsletter_subscribers')
      .insert([{ email, subscribed: true, tags: [source] }])

    // 23505 = unique violation: the address is already on the list.
    if (error) {
      if (error.code === '23505') return { ok: true, alreadySubscribed: true }
      return { ok: false, reason: 'failed' }
    }

    return { ok: true }
  }

  return { ok: false, reason: 'not_configured' }
}
