# Client Requirements & Credentials Needed

## 🔐 Required Credentials & Configuration

### 1. **Stripe Account** (Payment Processing)
Your site uses Stripe for subscription and one-time payments. You need:

- **STRIPE_SECRET_KEY** (Server-side)
  - Get from: Stripe Dashboard → Developers → API keys
  - Format: `sk_test_...` (test mode) or `sk_live_...` (production)
  - Used for: Creating checkout sessions, managing subscriptions, processing payments

- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY** (Client-side)
  - Get from: Stripe Dashboard → Developers → API keys
  - Format: `pk_test_...` (test mode) or `pk_live_...` (production)
  - Used for: Frontend payment forms (if you add Stripe Elements later)

- **STRIPE_WEBHOOK_SECRET** (Server-side)
  - Get from: Stripe Dashboard → Developers → Webhooks
  - Create a webhook endpoint pointing to: `https://yourdomain.com/api/webhooks/stripe`
  - Format: `whsec_...`
  - Used for: Receiving subscription updates, payment confirmations, cancellations

**Action Items:**
1. Create a Stripe account at https://stripe.com
2. Get test mode keys for development
3. Get live mode keys for production
4. Set up webhook endpoint in Stripe dashboard
5. Configure webhook to listen for these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`

---

### 2. **Google OAuth** (Optional - for Google Sign-In)
Your site supports Google authentication. You need:

- **GOOGLE_CLIENT_ID**
  - Get from: Google Cloud Console → APIs & Services → Credentials
  - Create OAuth 2.0 Client ID
  - Authorized redirect URIs: `https://yourdomain.com/api/auth/callback/google`

- **GOOGLE_CLIENT_SECRET**
  - Get from: Same location as Client ID
  - Keep this secret secure

**Action Items:**
1. Go to https://console.cloud.google.com
2. Create a new project (or use existing)
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI

**Note:** If you don't want Google sign-in, the site will still work with email/password authentication only.

---

### 3. **MongoDB Database**
Your site uses MongoDB for data storage. You need:

- **MONGODB_URI**
  - Get from: MongoDB Atlas → Connect → Connect your application
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
  - Or use a local MongoDB instance: `mongodb://localhost:27017/jineau`

**Action Items:**
1. Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string

---

### 4. **NextAuth Configuration**
Required for authentication:

- **NEXTAUTH_SECRET**
  - Generate a random secret key
  - Can use: `openssl rand -base64 32`
  - Or generate online: https://generate-secret.vercel.app/32
  - Used for: Encrypting JWT tokens and sessions

- **NEXTAUTH_URL**
  - Development: `http://localhost:3000`
  - Production: `https://yourdomain.com`
  - Used for: OAuth redirects and session management

---

## 📋 Complete Environment Variables List

Create a `.env.local` file with these variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jineau?retryWrites=true&w=majority

# NextAuth
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

## 🚀 Subscription Skip Weeks Feature

### Current State
The site currently has:
- ✅ Weekly subscription plans (3, 5, or 7 packs per week)
- ✅ Stripe subscription integration
- ✅ Basic subscription management UI
- ❌ **No skip weeks functionality yet**

### Required Implementation

**Feature:** Users should be able to skip multiple weeks of their subscription when they want.

**What needs to be built:**

1. **Database Schema Updates**
   - Add `skippedWeeks` array to User or Order model to track which weeks are skipped
   - Store skipped dates/weeks with timestamps

2. **Stripe Integration**
   - Use Stripe's subscription schedule feature to pause/resume subscriptions
   - Or use subscription items with proration to skip specific billing cycles
   - Handle skipped weeks in webhook events

3. **User Interface**
   - Add "Skip Weeks" section in Account page
   - Calendar/date picker to select weeks to skip
   - Show upcoming deliveries with skip option
   - Display skipped weeks list
   - Allow un-skipping (if before cutoff)

4. **Business Logic**
   - Respect order cutoff (Wednesday 11:59 PM)
   - Prevent skipping past weeks
   - Handle multiple consecutive weeks
   - Update delivery dates accordingly
   - Notify user of skipped deliveries

5. **API Endpoints**
   - `POST /api/subscriptions/skip` - Skip specific weeks
   - `GET /api/subscriptions/skipped` - Get skipped weeks list
   - `DELETE /api/subscriptions/skip/:id` - Un-skip a week (if allowed)

### Technical Considerations

- **Stripe Subscription Schedules**: Best approach for skipping weeks
  - Create a subscription schedule
  - Use `phases` to pause/resume billing
  - Handle proration correctly

- **Cutoff Enforcement**: 
  - Users can only skip weeks before the cutoff (Wednesday 11:59 PM)
  - After cutoff, the week is locked

- **Delivery Date Calculation**:
  - Delivery is Friday evening
  - Skip weeks should not affect subsequent delivery dates
  - Need to track which Fridays are skipped

### Example User Flow

1. User goes to Account → Subscription tab
2. Sees "Upcoming Deliveries" list
3. Clicks "Skip" on a specific week
4. System checks if before cutoff
5. If yes, marks week as skipped in database
6. Updates Stripe subscription schedule
7. Confirms skip to user
8. Delivery is skipped for that week
9. Next delivery continues as normal

---

## 📝 Summary Checklist for Client

- [ ] Stripe account created (test + live)
- [ ] Stripe API keys obtained
- [ ] Stripe webhook configured
- [ ] MongoDB database set up
- [ ] MongoDB connection string obtained
- [ ] Google OAuth credentials (if using Google sign-in)
- [ ] NextAuth secret generated
- [ ] Domain name for NEXTAUTH_URL (production)
- [ ] All environment variables documented and secured

---

## 🔒 Security Notes

1. **Never commit `.env.local` to git** (already in .gitignore)
2. **Use different keys for test and production**
3. **Rotate secrets periodically**
4. **Keep webhook secrets secure** - they verify Stripe events
5. **Use environment variables in deployment** (Vercel, etc.)

---

## 📞 Next Steps

1. Client provides all credentials listed above
2. Developer implements skip weeks feature
3. Test skip functionality thoroughly
4. Deploy to production with live credentials

