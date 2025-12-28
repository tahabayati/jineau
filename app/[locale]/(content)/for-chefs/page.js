import { getTranslations } from "next-intl/server"
import AuroraBackground from "@/components/AuroraBackground"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { subscription } from "@/data/siteCopy"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "Microgreens for Chefs", fr: "Micropousses pour les chefs", fa: "میکروگرین برای سرآشپزها" }
  return { title: titles[locale] || titles.en }
}

export default async function ForChefsPage() {
  const t = await getTranslations("forChefs")
  const tCommon = await getTranslations("common")

  const features = [
    { title: t("consistentQuality"), desc: t("consistentQualityDesc"), icon: "⭐" },
    { title: t("extendedShelfLife"), desc: t("extendedShelfLifeDesc"), icon: "📅" },
    { title: t("noPrepRequired"), desc: t("noPrepRequiredDesc"), icon: "⚡" },
    { title: t("hyperLocal"), desc: t("hyperLocalDesc"), icon: "📍" },
  ]

  const applications = [
    { name: "Garnishes", desc: "Add visual impact to plated dishes" },
    { name: "Salads", desc: "Build complex flavor profiles" },
    { name: "Sandwiches", desc: "Elevate lunch offerings" },
    { name: "Cocktails", desc: "Fresh botanical accents" },
    { name: "Appetizers", desc: "Microgreen beds and accents" },
    { name: "Sushi", desc: "Modern twists on classics" },
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
                  <span className="text-5xl md:text-6xl">👨‍🍳</span>
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
                {t("whyChefsChoose")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("whyChefsChoose")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("whyChefsSubtitle")}
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

        {/* Culinary Applications Section */}
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
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("culinaryApplications")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("culinaryApplications")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("culinaryApplicationsSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {applications.map((app) => (
                <div key={app.name} className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 group hover:border-brand-mint/50 transition-colors">
                  <h3 className="font-bold text-white mb-1 md:mb-2 text-base md:text-lg group-hover:text-brand-gold transition-colors duration-300 drop-shadow-md">
                    {app.name}
                  </h3>
                  <p className="text-white/75 text-sm md:text-base">{app.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chef Plan Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-strong rounded-3xl md:rounded-[48px] p-6 sm:p-8 md:p-10 lg:p-14 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("chefPlan")}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 mb-7 md:mb-9 max-w-xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("chefPlanSubtitle")}
              </p>
              
              <div className="glass-card rounded-2xl md:rounded-3xl p-8 md:p-10 inline-block mb-6 md:mb-8">
                <div className="text-5xl md:text-6xl font-bold gradient-text mb-2 drop-shadow-lg">7 packs</div>
                <div className="text-white/80 mb-4 md:mb-6 text-base md:text-lg">per week</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 drop-shadow-md">${subscription.plans[2].price}/week</div>
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
