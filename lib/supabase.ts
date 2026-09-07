import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Supabase is optional. It is only created when the environment variables
 * exist, and only on demand — importing this file must never crash a build
 * or a page render.
 */

export function hasSupabase(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

let admin: SupabaseClient | null = null

/** Server-only client (service role). Returns null when not configured. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!hasSupabase()) return null
  if (!admin) {
    admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.SUPABASE_SERVICE_ROLE_KEY as string,
      { auth: { persistSession: false, autoRefreshToken: false } }
    )
  }
  return admin
}
