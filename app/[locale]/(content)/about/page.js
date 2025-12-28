import { getTranslations } from "next-intl/server"
import MarmotMascot from "@/components/MarmotMascot"
import AuroraBackground from "@/components/AuroraBackground"
import { Link } from "@/i18n/routing"
import Image from "next/image"
import { brandStory, differentiators } from "@/data/siteCopy"
import { regionConfig } from "@/lib/config"

// SVG Icon Components (same as home page)
const FilterIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 4h18l-7 8v7l-4 2v-9L3 4z" />
  </svg>
)

const LeafIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21c-4-2-7-5-8-9s0-8 4-10c3 0 6 2 8 5 2-3 5-5 8-5 4 2 5 6 4 10s-4 7-8 9" />
    <path strokeLinecap="round" d="M12 21V11" />
  </svg>
)

const SparklesIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
    <path d="M5 18l.75 2.25L8 21l-2.25.75L5 24l-.75-2.25L2 21l2.25-.75L5 18z" opacity="0.5" />
    <path d="M18 14l.5 1.5L20 16l-1.5.5L18 18l-.5-1.5L16 16l1.5-.5L18 14z" opacity="0.5" />
  </svg>
)

const DropletIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21.5c-4.418 0-8-3.134-8-7 0-4.5 8-13 8-13s8 8.5 8 13c0 3.866-3.582 7-8 7z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="9" />
    <path strokeLinecap="round" d="M12 6v6l4 2" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l8 4v5c0 5-3.5 9-8 11-4.5-2-8-6-8-11V7l8-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
  </svg>
)

const featureIcons = {
  water: <FilterIcon />,
  leaf: <LeafIcon />,
  sparkle: <SparklesIcon />,
  droplet: <DropletIcon />,
  clock: <ClockIcon />,
  shield: <ShieldCheckIcon />,
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "About Jineau", fr: "À propos de Jineau", fa: "درباره ژینو" }
  return { title: titles[locale] || titles.en }
}

export default async function AboutPage() {
  const t = await getTranslations("about")
  const tFeatures = await getTranslations("features")
  const tCommon = await getTranslations("common")

  const translatedDifferentiators = [
    { ...differentiators[0], title: tFeatures("filteredAirWater"), description: tFeatures("filteredAirWaterDesc") },
    { ...differentiators[1], title: tFeatures("zeroChemicals"), description: tFeatures("zeroChemicalsDesc") },
    { ...differentiators[2], title: tFeatures("highTechClean"), description: tFeatures("highTechCleanDesc") },
    { ...differentiators[3], title: tFeatures("hydrosolsSurplus"), description: tFeatures("hydrosolsSurplusDesc") },
    { ...differentiators[4], title: tFeatures("justInTime"), description: tFeatures("justInTimeDesc") },
    { ...differentiators[5], title: tFeatures("mapaqAligned"), description: tFeatures("mapaqAlignedDesc") },
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
                  <MarmotMascot size="xl" />
                </div>
              </div>
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("title")}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("title")
                  .split(/(Jineau|jineau)/i)
                  .map((part, i) =>
                    /^(Jineau|jineau)$/i.test(part) ? (
                      <span key={i} className="gradient-text">
                        {part}
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2">
                <span className="gradient-text font-bold">Jineau</span> combines "Jin" (ژین) — Kurdish for life — with "Eau" — French for water. Together, they form "Water of Life."
              </p>
            </div>
          </div>
        </section>

        {/* Name Meaning Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-4 relative">
              {/* Jin card */}
              <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center w-full max-w-xs group">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full opacity-30" />
                  <div className="relative w-full h-full bg-gradient-to-br from-brand-mint/20 to-brand-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">Jin</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t("jinMeaning") || "Life"}</h3>
                <p className="text-sm md:text-base text-white/70">{t("kurdish") || "Kurdish"} - ژین</p>
              </div>

              {/* Plus sign */}
              <div className="text-3xl md:text-5xl text-brand-gold/40 font-extralight">+</div>

              {/* Eau card */}
              <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center w-full max-w-xs group">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-mist to-brand-blue rounded-full opacity-30" />
                  <div className="relative w-full h-full bg-gradient-to-br from-brand-mist/20 to-brand-blue/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">Eau</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t("eauMeaning") || "Water"}</h3>
                <p className="text-sm md:text-base text-white/70">{t("french") || "French"}</p>
              </div>

              {/* Equals sign */}
              <div className="text-3xl md:text-5xl text-brand-gold/40 font-extralight">=</div>

              {/* Jineau card */}
              <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center w-full max-w-xs group">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold via-brand-mint to-brand-primary rounded-full opacity-40" />
                  <div className="relative w-full h-full bg-gradient-to-br from-brand-gold/20 via-brand-mint/20 to-brand-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <span className="text-xl md:text-2xl font-bold gradient-text drop-shadow-md">Jineau</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold gradient-text mb-1 md:mb-2 drop-shadow-sm">{t("waterOfLife") || "Water of Life"}</h3>
                <p className="text-sm md:text-base text-white/70">{t("ourPhilosophy") || "Our Philosophy"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-gold text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("ourMission")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("ourMission")}
              </h2>
            </div>
            <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-8 md:mb-12">
              <p className="text-white/90 leading-relaxed text-base md:text-lg mb-8 md:mb-10">
                {brandStory.mission}
              </p>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 drop-shadow-md">{t("ourValues")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {brandStory.values.map((value) => (
                  <div key={value} className="flex items-center gap-3 md:gap-4 glass rounded-xl md:rounded-2xl p-4 md:p-5">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-brand-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-white/90 text-sm md:text-base">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Different Section */}
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
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("whatMakesUsDifferent")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("whatMakesUsDifferent")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                We combine ancient wisdom with modern technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {translatedDifferentiators.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 group"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 mb-4 md:mb-6 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-mint border border-white/10 transition-transform duration-300 group-hover:scale-110">
                    <div className="scale-90 md:scale-100">
                      {featureIcons[feature.icon] || <SparklesIcon />}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-3 group-hover:text-brand-gold transition-colors duration-300 drop-shadow-md">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-gold text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("ourStory")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("ourStory")}
              </h2>
            </div>
            <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 md:p-10 relative z-10">
              <div className="text-white/90 space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed">
                <p>{t("storyP1")}</p>
                <p>{t("storyP2")}</p>
                <p>{t("storyP3")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-strong rounded-3xl md:rounded-[48px] p-6 sm:p-8 md:p-10 lg:p-14 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                Ready to Taste the Difference?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 mb-7 md:mb-9 max-w-xl mx-auto leading-relaxed drop-shadow-lg px-2">
                Join families in {regionConfig.deliveryRegion} enjoying the freshest microgreens every week.
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
