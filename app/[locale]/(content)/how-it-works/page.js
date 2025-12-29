import { getTranslations } from "next-intl/server"
import CTASection from "@/components/CTASection"
import MarmotMascot from "@/components/MarmotMascot"
import AuroraBackground from "@/components/AuroraBackground"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { deliveryConfig, regionConfig } from "@/lib/config"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "How It Works", fr: "Comment ça marche", fa: "نحوه کار" }
  return { title: titles[locale] || titles.en }
}

export default async function HowItWorksPage() {
  const t = await getTranslations("howItWorks")
  const tHome = await getTranslations("home")
  const tCommon = await getTranslations("common")

  const steps = [
    { num: 1, title: t("step1Title"), desc: t("step1Desc"), icon: "🛒" },
    { num: 2, title: t("step2Title"), desc: t("step2Desc"), icon: "⏰" },
    { num: 3, title: t("step3Title"), desc: t("step3Desc"), icon: "🌱" },
    { num: 4, title: t("step4Title"), desc: t("step4Desc"), icon: "🚚" },
  ]

  const storageSteps = [
    { title: t("keepSealed"), desc: t("keepSealedDesc"), icon: "📦" },
    { title: t("topShelf"), desc: t("topShelfDesc"), icon: "❄️" },
    { title: t("enjoyFresh"), desc: t("enjoyFreshDesc"), icon: "🥗" },
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AuroraBackground variant="home" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative images */}
            <div className="absolute top-10 right-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 animate-float z-0 pointer-events-none opacity-30" style={{ animationDelay: '0s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.15)]">
                <Image 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  width={128} 
                  height={128}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-float z-0 pointer-events-none opacity-25" style={{ animationDelay: '-1.5s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.12)]">
                <Image 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  width={112} 
                  height={112}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("title")}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("title")}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-mint/50 via-brand-primary/50 to-brand-mist/50 -translate-x-1/2" />
              
              {steps.map((step, i) => (
                <div key={step.num} className={`relative flex items-center gap-8 mb-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  <div className={`hidden md:block flex-1 ${i % 2 === 1 ? "text-left" : "text-right"}`}>
                    <div className={`inline-block glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 ${i % 2 === 1 ? "" : "text-left"}`}>
                      <span className="text-4xl mb-4 block">{step.icon}</span>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md">{step.title}</h3>
                      <p className="text-white/80">{step.desc}</p>
                    </div>
                  </div>

                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-brand-mint to-brand-primary text-white rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg flex-shrink-0 z-10 border-2 border-white/20">
                    {step.num}
                  </div>

                  <div className="md:hidden flex-1">
                    <div className="glass-card rounded-2xl p-6">
                      <span className="text-4xl mb-4 block">{step.icon}</span>
                      <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{step.title}</h3>
                      <p className="text-white/80">{step.desc}</p>
                    </div>
                  </div>

                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Storage Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative images */}
            <div className="absolute top-20 right-10 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 animate-float z-0 pointer-events-none opacity-20" style={{ animationDelay: '-1s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.12)]">
                <Image 
                  src="/jineau-home-images/1-07.svg" 
                  alt="" 
                  width={192} 
                  height={192}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-gold text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("storageTitle")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("storageTitle")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("storageSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {storageSteps.map((step, i) => (
                <div key={step.title} className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center group">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 border border-white/10 transition-transform duration-300 group-hover:scale-110">
                    <span className="text-3xl md:text-4xl">{step.icon}</span>
                  </div>
                  <span className="inline-block glass px-3 py-1 md:px-4 md:py-1.5 text-brand-gold text-xs md:text-sm font-bold rounded-full mb-3 md:mb-4">
                    Step {i + 1}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 drop-shadow-md">{step.title}</h3>
                  <p className="text-sm md:text-base text-white/75">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fresh Swap Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative image */}
            <div className="absolute bottom-10 left-1/4 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 animate-float z-0 pointer-events-none opacity-30" style={{ animationDelay: '-3s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.15)]">
                <Image 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  width={144} 
                  height={144}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
              <div className="flex-shrink-0">
                <div className="p-6 md:p-8 glass-card rounded-full">
                  <MarmotMascot size="xl" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl">{t("freshSwapTitle")}</h2>
                <p className="text-white/90 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">{t("freshSwapSubtitle")}</p>
                
                <div className="glass-card rounded-xl md:rounded-2xl p-6 md:p-8 mb-6 md:mb-8">
                  <h3 className="font-bold text-white mb-2 md:mb-3 text-lg md:text-xl">{t("freshSwapQuestion")}</h3>
                  <p className="text-white/80 text-sm md:text-base">{t("freshSwapAnswer")}</p>
                </div>

                <ul className="space-y-3 md:space-y-4">
                  {[
                    t("freshSwapBenefit1"),
                    t("freshSwapBenefit2"),
                    t("freshSwapBenefit3"),
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 md:gap-4">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/90 text-sm md:text-base">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-strong rounded-3xl md:rounded-[48px] p-6 sm:p-8 md:p-10 lg:p-14 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {tHome("readyToStartSubscription")}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 mb-7 md:mb-9 max-w-xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {tHome("readyToStartSubscriptionDesc")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="/subscribe"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold text-sm md:text-base rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap"
                >
                  {tCommon("startSubscription")}
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 md:gap-3 px-8 py-4 md:px-10 md:py-5 glass text-white font-semibold text-sm md:text-base rounded-full transition-all duration-500 hover:bg-white/10 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap"
                >
                  {tCommon("shopMicrogreens")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
