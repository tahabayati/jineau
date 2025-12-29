import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { getCallbackUrl } from "@/lib/env"

export const runtime = 'nodejs'

export async function GET() {
  try {
    const headersList = await headers()
    const host = headersList.get('host')
    const protocol = headersList.get('x-forwarded-proto') || 'https'
    const computedUrl = `${protocol}://${host}`
    
    const callbackUrl = getCallbackUrl()
    const envUrl = process.env.NEXTAUTH_URL
    
    return NextResponse.json({
      computedBaseUrl: computedUrl,
      envNEXTAUTH_URL: envUrl,
      callbackUrl: callbackUrl,
      message: 'Use this callback URL in Google Cloud Console',
      redirectUri: callbackUrl,
    })
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

