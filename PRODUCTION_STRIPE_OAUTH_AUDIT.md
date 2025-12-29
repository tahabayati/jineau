# Production Readiness Audit: Stripe + Google OAuth

## Summary

This document outlines the production-ready configuration for Stripe webhooks and Google OAuth login on https://jineau.com.

---

## Google OAuth Configuration

### Exact Redirect URI

The app generates the following callback URL:

```
https://jineau.com/api/auth/callback/google
```

### What to Configure in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Navigate to: **APIs & Services** → **Credentials**
3. Select your OAuth 2.0 Client ID
4. Under **Authorized redirect URIs**, add:
   ```
   https://jineau.com/api/auth/callback/google
   ```

### How the Redirect URI is Computed

The redirect URI is computed as: `${NEXTAUTH_URL}/api/auth/callback/google`

- **NEXTAUTH_URL** must be set to: `https://jineau.com` (no trailing slash)
- NextAuth automatically appends `/api/auth/callback/google` to this base URL
- The app logs the computed callback URL at startup for verification

### Verification Endpoint

You can verify the callback URL by visiting:
```
https://jineau.com/api/auth/callback-url
```

This endpoint returns:
- The computed callback URL
- The NEXTAUTH_URL value from environment
- Instructions for Google Cloud Console

### Code Locations

- **NextAuth Configuration**: `lib/auth.js`
  - Uses `trustHost: true` for Vercel compatibility
  - Explicitly sets `url: process.env.NEXTAUTH_URL`
  - Logs callback URL at module load time

- **Route Handler**: `app/api/auth/[...nextauth]/route.js`
  - Logs callback URL in production
  - Uses Node.js runtime

---

## Stripe Webhook Configuration

### Webhook Endpoint

```
https://jineau.com/api/webhooks/stripe
```

### Signature Verification

The webhook handler:
- ✅ Uses raw body (`request.text()`) before signature verification
- ✅ Verifies signatures using `stripe.webhooks.constructEvent()`
- ✅ Returns **400** on signature verification failure
- ✅ Returns **200** with `{ received: true }` on success
- ✅ Uses Node.js runtime (not Edge)
- ✅ Validates `STRIPE_WEBHOOK_SECRET` is set

### Code Location

- **Webhook Handler**: `app/api/webhooks/stripe/route.js`
  - Line 10: `export const runtime = 'nodejs'`
  - Line 13: Reads raw body with `request.text()`
  - Line 31: Verifies signature with `stripe.webhooks.constructEvent()`
  - Line 36: Returns 400 on signature failure
  - Line 231: Returns 200 on success

### Stripe Dashboard Configuration

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to: **Developers** → **Webhooks**
3. Click **Add endpoint**
4. Endpoint URL: `https://jineau.com/api/webhooks/stripe`
5. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
6. Copy the **Signing secret** (starts with `whsec_`)
7. Set it as `STRIPE_WEBHOOK_SECRET` in Vercel

---

## Required Environment Variables

### Vercel Environment Variables Checklist

All of these **must** be set in Vercel Dashboard → Settings → Environment Variables:

#### 1. **NEXTAUTH_URL** ✅ REQUIRED
- **Value**: `https://jineau.com` (no trailing slash)
- **Scope**: Production, Preview, Development
- **Used in**:
  - `lib/auth.js` - NextAuth base URL
  - `app/api/checkout/session/route.js` - Success/cancel redirect URLs
  - `lib/env.js` - Callback URL computation
- **Validation**: Must start with `http://` or `https://`
- **Error if missing**: App will fail to start with clear error message

#### 2. **NEXTAUTH_SECRET** ✅ REQUIRED
- **Value**: Random secret (generate with `openssl rand -base64 32`)
- **Scope**: Production, Preview, Development
- **Used in**: `lib/auth.js` - JWT encryption
- **Error if missing**: App will fail to start with clear error message

#### 3. **GOOGLE_CLIENT_ID** ✅ REQUIRED
- **Value**: From Google Cloud Console (OAuth 2.0 Client ID)
- **Scope**: Production, Preview, Development
- **Used in**: `lib/auth.js` - Google OAuth provider
- **Error if missing**: App will fail to start with clear error message

#### 4. **GOOGLE_CLIENT_SECRET** ✅ REQUIRED
- **Value**: From Google Cloud Console (OAuth 2.0 Client Secret)
- **Scope**: Production, Preview, Development
- **Used in**: `lib/auth.js` - Google OAuth provider
- **Error if missing**: App will fail to start with clear error message

#### 5. **STRIPE_SECRET_KEY** ✅ REQUIRED
- **Value**: Stripe secret key (use `sk_live_...` for production)
- **Scope**: Production, Preview, Development
- **Used in**: `lib/stripe.js` - Stripe client initialization
- **Error if missing**: Clear error when Stripe is accessed

#### 6. **STRIPE_WEBHOOK_SECRET** ✅ REQUIRED
- **Value**: Webhook signing secret from Stripe Dashboard (starts with `whsec_`)
- **Scope**: Production, Preview, Development
- **Used in**: `app/api/webhooks/stripe/route.js` - Signature verification
- **Error if missing**: Webhook returns 500 with clear error message

#### 7. **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** ✅ REQUIRED
- **Value**: Stripe publishable key (use `pk_live_...` for production)
- **Scope**: Production, Preview, Development
- **Used in**: Client-side Stripe integration (if implemented)
- **Error if missing**: App will fail to start with clear error message

#### 8. **MONGODB_URI** ✅ REQUIRED
- **Value**: MongoDB connection string
- **Scope**: Production, Preview, Development
- **Used in**: `lib/mongodb.js` - Database connection
- **Error if missing**: Clear error when database is accessed

---

## Environment Variable Validation

### Runtime Validation

The app validates all required environment variables at startup:

- **Location**: `lib/env.js`
- **Function**: `validateEnv()`
- **When**: Called when `lib/auth.js` is first imported
- **Behavior**: Throws clear error message listing all missing variables

### Validation in Code

Each module validates its required env vars:

1. **lib/auth.js**: Validates all auth-related vars on import
2. **lib/stripe.js**: Validates `STRIPE_SECRET_KEY` when Stripe is accessed
3. **lib/mongodb.js**: Validates `MONGODB_URI` when database is accessed
4. **app/api/webhooks/stripe/route.js**: Validates `STRIPE_WEBHOOK_SECRET` on webhook request
5. **app/api/checkout/session/route.js**: Validates `NEXTAUTH_URL` on module load

### Error Messages

All error messages are clear and actionable:
- ✅ Lists the exact variable name that's missing
- ✅ Provides context about where it's used
- ✅ Suggests where to set it (Vercel environment variables)

---

## Production Deployment Checklist

### Pre-Deployment

- [ ] Set all 8 required environment variables in Vercel
- [ ] Use **LIVE** Stripe keys (`sk_live_...`, `pk_live_...`, `whsec_...`)
- [ ] Set `NEXTAUTH_URL` to `https://jineau.com` (no trailing slash)
- [ ] Generate strong `NEXTAUTH_SECRET` (32+ characters)
- [ ] Configure Google OAuth redirect URI: `https://jineau.com/api/auth/callback/google`
- [ ] Configure Stripe webhook endpoint: `https://jineau.com/api/webhooks/stripe`
- [ ] Test webhook signature verification in Stripe Dashboard

### Post-Deployment Verification

1. **Verify Callback URL**:
   ```bash
   curl https://jineau.com/api/auth/callback-url
   ```
   Should return JSON with `callbackUrl: "https://jineau.com/api/auth/callback/google"`

2. **Test Google OAuth**:
   - Visit login page
   - Click "Sign in with Google"
   - Should redirect to Google without `redirect_uri_mismatch` error

3. **Test Stripe Webhook**:
   - Create a test checkout session
   - Verify webhook receives event in Stripe Dashboard
   - Check server logs for "Received Stripe event" message

4. **Check Server Logs**:
   - Look for: `[NextAuth] Google OAuth callback URL: https://jineau.com/api/auth/callback/google`
   - Look for: `[NextAuth Route] Production callback URL: https://jineau.com/api/auth/callback/google`

---

## Troubleshooting

### Google OAuth: redirect_uri_mismatch

**Problem**: Google returns "redirect_uri_mismatch" error

**Solutions**:
1. Verify `NEXTAUTH_URL` is exactly `https://jineau.com` (no trailing slash, no www)
2. Check Google Cloud Console has: `https://jineau.com/api/auth/callback/google`
3. Visit `/api/auth/callback-url` to see what URL the app is generating
4. Ensure no www redirect is interfering (Vercel should handle this)

### Stripe Webhook: Signature Verification Failed

**Problem**: Webhook returns 400 with "Webhook signature verification failed"

**Solutions**:
1. Verify `STRIPE_WEBHOOK_SECRET` matches the signing secret in Stripe Dashboard
2. Ensure webhook endpoint URL in Stripe matches: `https://jineau.com/api/webhooks/stripe`
3. Check that webhook is using Node.js runtime (already configured)
4. Verify raw body is being read (already implemented)

### Missing Environment Variables

**Problem**: App fails to start with environment variable error

**Solutions**:
1. Check Vercel Dashboard → Settings → Environment Variables
2. Ensure all 8 required variables are set
3. Verify no typos in variable names
4. Check that variables are set for the correct environment (Production/Preview/Development)

---

## Code Changes Summary

### Files Modified

1. **lib/env.js** (NEW)
   - Environment variable validation utility
   - Callback URL computation function

2. **lib/auth.js**
   - Added `trustHost: true` for Vercel compatibility
   - Added explicit `url: process.env.NEXTAUTH_URL`
   - Added startup validation and logging

3. **app/api/auth/[...nextauth]/route.js**
   - Added production logging for callback URL

4. **app/api/auth/callback-url/route.js** (NEW)
   - Diagnostic endpoint to verify callback URL

5. **app/api/webhooks/stripe/route.js**
   - Improved error messages
   - Added signature header validation
   - Enhanced error handling

6. **lib/stripe.js**
   - Improved error message for missing `STRIPE_SECRET_KEY`

7. **lib/mongodb.js**
   - Improved error message for missing `MONGODB_URI`

8. **app/api/checkout/session/route.js**
   - Added `NEXTAUTH_URL` validation
   - Normalized URL (removes trailing slashes)

---

## Security Notes

- ✅ All secrets are server-side only (never exposed to client)
- ✅ Webhook signatures are verified before processing
- ✅ Environment variables are validated at startup
- ✅ Clear error messages help diagnose issues without exposing secrets
- ✅ NextAuth uses secure session management
- ✅ Stripe webhook uses raw body for signature verification

---

## Support

If you encounter issues:

1. Check server logs for error messages
2. Visit `/api/auth/callback-url` to verify callback URL
3. Verify all environment variables in Vercel Dashboard
4. Test webhook in Stripe Dashboard → Webhooks → Test webhook
5. Check Google Cloud Console for redirect URI configuration

