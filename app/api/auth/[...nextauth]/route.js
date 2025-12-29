import { handlers } from "@/lib/auth"
import { headers } from "next/headers"
import { getCallbackUrl } from "@/lib/env"

export const runtime = 'nodejs'

if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  const callbackUrl = getCallbackUrl()
  console.log('[NextAuth Route] Production callback URL:', callbackUrl)
  console.log('[NextAuth Route] NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
}

export const { GET, POST } = handlers
