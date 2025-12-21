import { Inter, Playfair_Display } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "../globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import CartProvider from "@/components/CartProvider"
import CartDrawer from "@/components/CartDrawer"
import ScrollToTop from "@/components/ScrollToTop"
import SmoothScrollInit from "@/components/SmoothScrollInit"
import { generateOrganizationSchema } from "@/lib/seo"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const baseUrl = "https://jineau.ca"

  const titles = {
    en: "Jineau - The Water of Life | Fresh Microgreens & Hydrosols",
    fr: "Jineau - L'Eau de Vie | Micropousses & Hydrolats Frais",
    fa: "ژینو - آب زندگی | میکروگرین و هیدروسول تازه",
  }

  const descriptions = {
    en: "Locally grown microgreens and hydrosols, delivered fresh to your door. Pesticide-free, high-tech clean, and harvested just 24 hours before delivery.",
    fr: "Micropousses et hydrolats cultivés localement, livrés frais à votre porte. Sans pesticides, technologie de nettoyage avancée, récoltés 24 heures avant livraison.",
    fa: "میکروگرین و هیدروسول محلی، تازه به درب منزل شما تحویل داده می‌شود. بدون آفت‌کش، با فناوری پیشرفته پاکسازی، و ۲۴ ساعت قبل از تحویل برداشت شده.",
  }

  return {
    title: {
      default: titles[locale] || titles.en,
      template: `%s | Jineau`,
    },
    description: descriptions[locale] || descriptions.en,
    keywords: ["microgreens", "hydrosols", "Montreal", "Montérégie", "pesticide-free", "fresh greens", "subscription"],
    authors: [{ name: "Jineau" }],
    creator: "Jineau",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en": `${baseUrl}/en`,
        "fr": `${baseUrl}/fr`,
        "fa": `${baseUrl}/fa`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fa" ? "fa_IR" : locale === "fr" ? "fr_CA" : "en_CA",
      url: `${baseUrl}/${locale}`,
      siteName: "Jineau",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Jineau - Fresh Microgreens",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      images: ["/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/favicon.ico",
    },
  }
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params

  if (!routing.locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()
  const organizationSchema = generateOrganizationSchema()
  const isRtl = locale === "fa"

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body
        className={`antialiased min-h-screen flex flex-col ${
          isRtl ? "text-right" : ""
        }`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <SmoothScrollInit />
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint"
            >
              Skip to main content
            </a>
            <Header locale={locale} />
            <main id="main-content" className="flex-grow">{children}</main>
            <Footer locale={locale} />
            <CartDrawer />
            <ScrollToTop />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

