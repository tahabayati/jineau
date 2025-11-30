import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
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

export const metadata = {
  title: {
    default: "Jineau - The Water of Life | Fresh Microgreens & Hydrosols",
    template: "%s | Jineau",
  },
  description: "Locally grown microgreens and hydrosols, delivered fresh to your door. Pesticide-free, plasma-cleaned, and harvested just 24 hours before delivery.",
  keywords: ["microgreens", "hydrosols", "Montreal", "South Shore", "Montérégie", "pesticide-free", "organic", "fresh greens", "subscription"],
  authors: [{ name: "Jineau" }],
  creator: "Jineau",
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: "https://jineau.ca",
    siteName: "Jineau",
    title: "Jineau - Fresh Microgreens & Hydrosols",
    description: "Locally grown microgreens and hydrosols, delivered fresh to your door.",
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
    title: "Jineau - Fresh Microgreens & Hydrosols",
    description: "Locally grown microgreens and hydrosols, delivered fresh to your door.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
