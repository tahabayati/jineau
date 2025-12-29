const requiredEnvVars = [
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'MONGODB_URI',
]

export function validateEnv() {
  const missing = []
  
  for (const varName of requiredEnvVars) {
    const value = process.env[varName]
    if (!value || value.trim() === '') {
      missing.push(varName)
    }
  }
  
  if (missing.length > 0) {
    const errorMessage = `Missing required environment variables: ${missing.join(', ')}\n\nPlease set these in your .env.local file or Vercel environment variables.`
    throw new Error(errorMessage)
  }
  
  if (process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.startsWith('http')) {
    throw new Error(`NEXTAUTH_URL must be a full URL starting with http:// or https://. Current value: ${process.env.NEXTAUTH_URL}`)
  }
}

export function getCallbackUrl() {
  const baseUrl = process.env.NEXTAUTH_URL
  if (!baseUrl) {
    throw new Error('NEXTAUTH_URL is not set')
  }
  
  const normalizedUrl = baseUrl.replace(/\/$/, '')
  return `${normalizedUrl}/api/auth/callback/google`
}

