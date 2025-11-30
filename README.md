# Jineau - Fresh Microgreens & Hydrosols

A modern e-commerce platform for Jineau, a microgreens subscription brand serving Montreal's South Shore.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS 4
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **Payments**: Stripe (Subscriptions + One-time purchases)
- **Language**: JavaScript (ES6+)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or MongoDB Atlas)
- Stripe account
- Google OAuth credentials (optional, for social login)

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
MONGODB_URI=mongodb+srv://your-connection-string
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
NEXTAUTH_SECRET=your-random-secret-string
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_SITE_URL=https://jineau.ca
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Seed the Database

After setting up MongoDB, seed the initial products and categories:

```bash
curl -X POST http://localhost:3000/api/seed
```

Or visit the seed endpoint in your browser with a POST request.

## Project Structure

```
jineau/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── account/
│   ├── (content)/        # Content pages
│   │   ├── about/
│   │   ├── blog/
│   │   ├── faq/
│   │   ├── for-chefs/
│   │   ├── for-families/
│   │   ├── for-wellness/
│   │   └── how-it-works/
│   ├── (shop)/           # Shop pages
│   │   ├── products/
│   │   ├── shop/
│   │   └── subscribe/
│   ├── api/              # API routes
│   │   ├── auth/
│   │   ├── categories/
│   │   ├── checkout/
│   │   ├── orders/
│   │   ├── products/
│   │   ├── seed/
│   │   └── webhooks/
│   ├── layout.js
│   ├── page.js
│   ├── robots.js
│   └── sitemap.js
├── components/           # React components
├── data/                 # Static data and seed data
├── lib/                  # Utilities and configurations
├── models/               # Mongoose models
└── public/               # Static assets
```

## Features

- **Product Catalog**: Browse microgreens and hydrosols
- **Subscriptions**: Weekly subscription plans (3, 5, or 7 packs)
- **Authentication**: Email/password and Google OAuth login
- **Checkout**: Stripe-powered checkout for subscriptions and one-time purchases
- **SEO**: Full metadata, JSON-LD structured data, sitemap, and robots.txt
- **Responsive**: Mobile-first design with Tailwind CSS

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy

### Environment Variables for Production

Set these in your Vercel project settings:

- `MONGODB_URI` - MongoDB Atlas connection string
- `STRIPE_SECRET_KEY` - Stripe live secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `NEXTAUTH_SECRET` - Random 32+ character string
- `NEXTAUTH_URL` - Your production URL (e.g., https://jineau.ca)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `NEXT_PUBLIC_SITE_URL` - Your production URL

## Stripe Setup

### Test Mode

1. Create a Stripe account
2. Get your test API keys from the Stripe dashboard
3. Use the test keys in `.env.local`

### Webhook Setup

1. Install Stripe CLI for local testing
2. Run `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
3. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

### Production Webhooks

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-domain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`, `customer.subscription.*`, `invoice.*`
4. Copy the signing secret to your production environment variables

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Primary | #016B61 | Main brand color, buttons |
| Secondary | #5A9690 | Accents, hover states |
| Mint | #70B2B2 | Backgrounds, highlights |
| Mist | #9ECFD4 | Light backgrounds |
| Gold | #E9C46A | CTAs, highlights |
| Blue | #6E8CFB | Links, accents |

## License

Private - All rights reserved
