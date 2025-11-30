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
- Manage senior centers
- View gift deliveries
- Process replacement requests
- Handle support tickets

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

## License

Private - Jineau Farm
