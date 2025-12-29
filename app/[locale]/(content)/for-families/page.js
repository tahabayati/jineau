import { getTranslations } from "next-intl/server"
import MarmotMascot from "@/components/MarmotMascot"
import AuroraBackground from "@/components/AuroraBackground"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { subscription } from "@/data/siteCopy"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "Microgreens for Families", fr: "Micropousses pour les familles", fa: "میکروگرین برای خانواده‌ها" }
  return { title: titles[locale] || titles.en }
}

export default async function ForFamiliesPage() {
  const t = await getTranslations("forFamilies")
  const tCommon = await getTranslations("common")

  const features = [
    { title: t("readyToEatSafety"), desc: t("readyToEatSafetyDesc"), icon: "✅" },
    { title: t("nutrientPowerhouse"), desc: t("nutrientPowerhouseDesc"), icon: "💪" },
    { title: t("lunchboxPerfect"), desc: t("lunchboxPerfectDesc"), icon: "🎒" },
    { title: t("pickyEaterApproved"), desc: t("pickyEaterApprovedDesc"), icon: "👶" },
  ]

  const lunchboxIdeas = [
    t("lunchboxIdea1"),
    t("lunchboxIdea2"),
    t("lunchboxIdea3"),
    t("lunchboxIdea4"),
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
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <div className="flex justify-center mb-6 md:mb-8">
                <div className="p-6 md:p-8 glass-card rounded-full">
                  <span className="text-5xl md:text-6xl">👨‍👩‍👧‍👦</span>
                </div>
              </div>
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("title")}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("title")}
              </h1>
              <p className="text-xl md:text-2xl text-brand-gold font-medium mb-4 md:mb-6 drop-shadow-lg px-2">
                {t("tagline")}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("description")}
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative image */}
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
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-gold text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("whyFamiliesLove")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("whyFamiliesLove")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("whyFamiliesSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {features.map((feature) => (
                <div key={feature.title} className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 group">
                  <span className="text-4xl md:text-5xl block mb-4 md:mb-6">{feature.icon}</span>
                  <h3 className="font-bold text-lg md:text-xl text-white mb-2 md:mb-3 group-hover:text-brand-gold transition-colors duration-300 drop-shadow-md">
                    {feature.title}
                  </h3>
                  <p className="text-white/75 text-sm md:text-base">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lunchbox Ideas Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative image */}
            <div className="absolute bottom-10 left-1/4 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 animate-float z-0 pointer-events-none opacity-30" style={{ animationDelay: '-3s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.15)]">
                <Image 
                  src="/jineau-home-images/1-07.svg" 
                  alt="" 
                  width={144} 
                  height={144}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl">{t("lunchboxIdeas")}</h2>
                <p className="text-white/90 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">{t("lunchboxIdeasSubtitle")}</p>
                
                <ul className="space-y-3 md:space-y-4">
                  {lunchboxIdeas.map((idea, i) => (
                    <li key={i} className="flex items-start gap-3 md:gap-4">
                      <span className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-brand-gold/30 to-amber-400/30 rounded-full flex items-center justify-center text-white text-sm md:text-base font-bold flex-shrink-0 border border-white/20">
                        {i + 1}
                      </span>
                      <span className="text-white/90 text-sm md:text-base">{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card rounded-3xl md:rounded-[40px] p-8 md:p-10 text-center">
                <MarmotMascot size="xl" className="mx-auto mb-6 md:mb-8" />
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 drop-shadow-md">{t("meetMarmot")}</h3>
                <p className="text-white/75 text-sm md:text-base">
                  {t("marmotDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Family Plan Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-strong rounded-3xl md:rounded-[48px] p-6 sm:p-8 md:p-10 lg:p-14 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("familyPlan")}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 mb-7 md:mb-9 max-w-xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("familyPlanSubtitle")}
              </p>
              
              <div className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-10 inline-block mb-6 md:mb-8">
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2 drop-shadow-lg">5 packs</div>
                <div className="text-white/80 mb-4 md:mb-6 text-base md:text-lg">per week</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 drop-shadow-md">${subscription.plans[1].price}/week</div>
                <Link
                  href="/subscribe"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 font-semibold text-sm md:text-base rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(233,196,106,0.5)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap"
                >
                  {tCommon("startSubscription")}
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
