import { NextRequest, NextResponse } from 'next/server'
import { retryQueuedNotifications } from '@/lib/notifications'
export const runtime='nodejs'
export const dynamic='force-dynamic'
export async function GET(request:NextRequest) {
  const secret=process.env.CRON_SECRET
  if(!secret||request.headers.get('authorization')!=='Bearer '+secret)
    return NextResponse.json({error:'Unauthorized'},{status:401})
  try {
    const status=await retryQueuedNotifications(35)
    return NextResponse.json(status,{headers:{'Cache-Control':'no-store'}})
  } catch(error) {
    console.error('[notify cron]',error instanceof Error?error.message:'unknown')
    return NextResponse.json({error:'Retry failed'},{status:500})
  }
}
