import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Insert into newsletter_subscribers
    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert([
        {
          email,
          name: name || '',
          subscribed: true,
          verified: true, // Auto-verify for now
        },
      ])
      .select()

    if (error) {
      // If email already exists, just return success
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'Already subscribed' },
          { status: 200 }
        )
      }
      throw error
    }

    return NextResponse.json(
      { message: 'Successfully subscribed!', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}
