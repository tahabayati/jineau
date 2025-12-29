import Image from "next/image"
import AuroraBackground from "@/components/AuroraBackground"
import Button from "@/components/Button"
import { Link } from "@/i18n/routing"
import { getTranslations } from "next-intl/server"

export default async function NotFound() {
  const t = await getTranslations("notFound")
  return (
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
            {t("title")}
          </h1>

          {/* Message */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-brand-mist mb-4">
            {t("heading")}
          </h2>
          
          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("description")}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/" variant="primary" size="lg">
              {t("goBackHome")}
            </Button>
            <Button href="/shop" variant="outline" size="lg">
              {t("visitShop")}
            </Button>
          </div>

          {/* Additional Help Links */}
          <div className="mt-12 pt-8 border-t border-brand-mint/20">
            <p className="text-sm text-gray-400 mb-4">
              {t("needHelp")}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link 
                href="/about" 
                className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
              >
                {t("aboutUs")}
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                href="/how-it-works" 
                className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
              >
                {t("howItWorks")}
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                href="/faq" 
                className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
              >
                {t("faq")}
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                href="/account" 
                className="text-brand-mint hover:text-brand-mist transition-colors text-sm underline underline-offset-4"
              >
                {t("myAccount")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-mint/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl animate-breathe" />
    </main>
  )
}

