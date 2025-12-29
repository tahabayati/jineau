# Jineau - Fresh Microgreens & Hydrosols

A modern e-commerce platform for microgreens subscriptions and hydrosols, built with Next.js, Tailwind CSS, MongoDB, and Stripe.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (Auth.js v5)
- **Payments**: Stripe (subscriptions + one-off)
- **i18n**: next-intl (English, French, Persian)
- **Deployment**: Vercel

## Features

- 🌱 Microgreens & hydrosols e-commerce
- 📦 Weekly subscription plans
- 🛒 Cart drawer with shipping calculation
- 🌍 Multilingual (EN/FR/FA with RTL support)
- 🎁 Buy One, Gift One program
- 🔄 Fresh Swap Guarantee (replacement requests)
- 👤 User accounts and order history
- 🔐 Admin dashboard for management
- 📱 Responsive, colorful design

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Stripe account (test mode)
- Google OAuth credentials (optional)

### Environment Variables

Create a `.env.local` file:

```env
# MongoDB
MONGODB_URI=mongodb+srv://your-connection-string

# NextAuth
NEXTAUTH_SECRET=your-random-secret-key
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Admin Password
# Set a secure password for accessing the admin panel
# Session expires after 24 hours
ADMIN_PASSWORD=your-secure-admin-password

# Meta Ads Tracking (optional)
NEXT_PUBLIC_META_PIXEL_ID=your-meta-pixel-id
META_CAPI_ACCESS_TOKEN=your-meta-conversions-api-access-token
META_GRAPH_API_VERSION=v21.0

# Google Analytics 4 (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Tracking Toggle (optional)
# Set to "false" to disable all tracking (default: "true")
NEXT_PUBLIC_TRACKING_ENABLED=true
```

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Seed Database

In development, seed sample data:

```bash
curl -X POST http://localhost:3000/api/seed
```

## Project Structure

```
├── app/
│   ├── [locale]/           # Locale-based routing
│   │   ├── (shop)/         # Shop pages
│   │   ├── (content)/      # Content pages
│   │   ├── (auth)/         # Auth pages
│   │   ├── admin/          # Admin dashboard
│   │   ├── layout.js       # Locale layout
│   │   └── page.js         # Home page
│   ├── api/                # API routes
│   ├── globals.css
│   └── layout.js           # Root layout
├── components/             # React components
├── data/                   # Static data and copy
├── i18n/                   # Internationalization
├── lib/                    # Utilities
├── messages/               # Translation files
├── models/                 # Mongoose models
└── public/                 # Static assets
```

## Shipping Rules

- Orders over $20 CAD: **Free shipping**
- Orders $20 CAD or less: **$5 delivery fee**
- Delivery: **Friday evening** (Montérégie region)
- Order cutoff: **Wednesday 11:59 PM**

## Key Features

### Buy One, Gift One

Subscribers can donate a second box to senior centers in Montérégie.

### Fresh Swap Guarantee

Subscription customers can request free replacements for unopened products (max 2/month).

### Admin Dashboard

- Simple password-based authentication (set via `ADMIN_PASSWORD` env var)
- Session expires after 24 hours
- Manage senior centers
- View gift deliveries
- Process replacement requests
- Handle support tickets
- Access at `/admin` (any locale)

## Localization

- English (default): `/en/...`
- French: `/fr/...`
- Persian (RTL): `/fa/...`

Translation files are in `messages/` directory.

## Deployment

Deploy to Vercel:

```bash
vercel
```

Set environment variables in Vercel dashboard.

## Analytics & Tracking

The application includes EU-friendly consent management for Meta Ads and Google Analytics tracking.

### Consent Management

- Users are presented with a consent banner on first visit
- Consent choices are stored in cookies and localStorage
- Two consent types: Analytics (GA4) and Marketing (Meta Pixel)
- Tracking scripts only load after consent is granted

### Meta Ads Tracking

- **Browser Pixel**: Tracks PageView and custom events via Meta Pixel
- **Server-Side API**: Sends Purchase events via Meta Conversions API for better reliability
- **Event Deduplication**: Uses shared event IDs between browser and server events

### Google Analytics 4

- Tracks page views on route changes
- Only loads if analytics consent is granted

### Environment Variables

- `NEXT_PUBLIC_META_PIXEL_ID`: Your Meta Pixel ID
- `META_CAPI_ACCESS_TOKEN`: Server-side access token for Conversions API (server-only)
- `META_GRAPH_API_VERSION`: Meta Graph API version (default: v21.0, server-only)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your GA4 Measurement ID
- `NEXT_PUBLIC_TRACKING_ENABLED`: Global toggle for all tracking (default: "true")

### Testing Tracking

1. **Marketing Consent Test**:
   - Grant marketing consent via banner
   - Verify `fbq` exists in browser console
   - Check that PageView fires on route changes
   - View events in Meta Events Manager (Test Events)

2. **Analytics Consent Test**:
   - Grant analytics consent via banner
   - Verify `gtag` exists in browser console
   - Check that page_view fires on route changes
   - View events in GA4 Real-Time reports

3. **Purchase Event Test**:
   - Complete a test checkout
   - Verify Purchase event appears in Meta Events Manager
   - Check that event shows as "Server" source in Events Manager

4. **Lead Event Test**:
   - Submit a support request form
   - Verify Lead event appears in Meta Events Manager
   - Check that event is deduplicated (same event ID in browser and server)

5. **Server Endpoint Test**:
   - POST to `/api/meta/events` with valid payload
   - Verify 200 response and event appears in Meta Events Manager

## License

Private - Jineau Farm
