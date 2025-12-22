import Image from "next/image"
import Link from "next/link"
import { Inter, Playfair_Display } from "next/font/google"
import AuroraBackground from "@/components/AuroraBackground"
import "./globals.css"

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

export default function NotFound() {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-h-screen" suppressHydrationWarning>
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Aurora Background */}
          <AuroraBackground />
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 animate-fade-in-up">
              {/* Freddie Mascot Image */}
              <div className="relative mx-auto w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mb-8 animate-float">
                <Image
                  src="/404_freddie_image.webp"
                  alt="Freddie the Marmot - Page Not Found"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* 404 Heading */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 gradient-text">
                404
              </h1>

              {/* Message */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-brand-mist mb-4">
                Oops! Page Not Found
              </h2>
              
              <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Looks like Freddie the Marmot couldn&apos;t find the page you&apos;re looking for. 
                It might have been moved or doesn&apos;t exist.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/en"
                  className="inline-flex items-center justify-center font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full shadow-sm hover:shadow-md active:scale-95 will-change-transform bg-gradient-to-r from-brand-mint to-brand-primary text-white hover:from-brand-mist hover:to-brand-secondary hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105 px-8 py-4 text-lg"
                >
                  Go Back Home
                </Link>
                <Link
                  href="/en/shop"
                  className="inline-flex items-center justify-center font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full shadow-sm hover:shadow-md active:scale-95 will-change-transform border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white hover:scale-105 px-8 py-4 text-lg"
                >
                  Visit Shop
                </Link>
              </div>

              {/* Additional Help Links */}
              <div className="mt-12 pt-8 border-t border-brand-mint/20">
                <p className="text-sm text-gray-400 mb-4">
                  Need help? Try these popular pages:
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link 
                    href="/en/about" 
                    className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
                  >
                    About Us
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link 
                    href="/en/how-it-works" 
                    className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
                  >
                    How It Works
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link 
                    href="/en/faq" 
                    className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
                  >
                    FAQ
                  </Link>
                  <span className="text-gray-600">•</span>
                  <Link 
                    href="/en/account" 
                    className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
                  >
                    My Account
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-brand-mint/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-breathe" />
        </main>
      </body>
    </html>
  )
}
