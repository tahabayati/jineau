import { getTranslations } from "next-intl/server"
import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import { Link } from "@/i18n/routing"
import { differentiators, testimonials, subscription } from "@/data/siteCopy"
import Image from "next/image"
import AuroraBackground from "@/components/AuroraBackground"
import { generateWebSiteSchema } from "@/lib/seo"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

// SVG Icon Components
const WaterIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.5c-4.418 0-8-3.134-8-7 0-4.5 8-13 8-13s8 8.5 8 13c0 3.866-3.582 7-8 7z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18c-2.209 0-4-1.567-4-3.5" opacity="0.5" />
  </svg>
)

const AirIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h8a4 4 0 0 0 0-8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h12a4 4 0 1 1 0 8" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2 11h6a3 3 0 1 1 0 6" />
  </svg>
)

const SeedlingIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c0-4.5 4-8 8-8-1 4.5-4 8-8 8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c0-4.5-4-8-8-8 1 4.5 4 8 8 8z" />
  </svg>
)

const SunIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="4" />
    <path strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2" />
    <path strokeLinecap="round" d="m4.93 4.93 1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const HeartPulseIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 6c-1.5-2-4-3-6-2s-3 4-2 6c1 3 4 5 8 9 4-4 7-6 8-9 1-2-0-5-2-6s-4.5 0-6 2z" />
    <path strokeLinecap="round" d="M5 13h3l2-3 2 5 2-2h5" />
  </svg>
)

const FamilyIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="5" r="2.5" />
    <circle cx="15" cy="6" r="2" />
    <path d="M5.5 21v-6a3.5 3.5 0 0 1 7 0v6" />
    <path d="M12 21v-4.5a2.5 2.5 0 0 1 5 0V21" />
    <circle cx="18" cy="9" r="1.5" />
    <path d="M16.5 21v-3a1.5 1.5 0 0 1 3 0v3" />
  </svg>
)

const ChefHatIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 10c-1.5 0-3 1-3 3s1.5 3 3 3" />
    <path d="M18 10c1.5 0 3 1 3 3s-1.5 3-3 3" />
    <path d="M6 16h12v4a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-4z" />
    <path d="M6 10V8a6 6 0 1 1 12 0v2" />
    <path strokeLinecap="round" d="M10 16v-3M14 16v-3" opacity="0.5" />
  </svg>
)

const LotusIcon = () => (
  <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 21c-2-2-6-6-6-10 0-3 2-6 6-8 4 2 6 5 6 8 0 4-4 8-6 10z" />
    <path d="M12 21c-1-1-2-2-2-4 0-1.5 1-3 2-4 1 1 2 2.5 2 4 0 2-1 3-2 4z" opacity="0.5" />
    <path d="M4 14c2-1 4-1 6 0" opacity="0.5" />
    <path d="M14 14c2-1 4-1 6 0" opacity="0.5" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 3l8 4v5c0 5-3.5 9-8 11-4.5-2-8-6-8-11V7l8-4z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
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

const FilterIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 4h18l-7 8v7l-4 2v-9L3 4z" />
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

async function getFeaturedProducts() {
  try {
    await dbConnect()
    const products = await Product.find({ active: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean()
    
    return products.map(p => ({
      _id: p._id.toString(),
      name: p.name,
      slug: p.slug,
      type: p.type,
      price: p.price,
      shortDescription: p.shortDescription,
      isSubscriptionEligible: p.isSubscriptionEligible,
    }))
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const baseUrl = "https://jineau.ca"
  
  return {
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "en": `${baseUrl}/en`,
        "fr": `${baseUrl}/fr`,
        "fa": `${baseUrl}/fa`,
      },
    },
  }
}

export default async function HomePage({ params }) {
  const { locale } = await params
  const t = await getTranslations("home")
  const tFeatures = await getTranslations("features")
  const tCommon = await getTranslations("common")
  
  const websiteSchema = generateWebSiteSchema(locale)
  const featuredProducts = await getFeaturedProducts()

  const translatedDifferentiators = [
    { ...differentiators[0], title: tFeatures("filteredAirWater"), description: tFeatures("filteredAirWaterDesc") },
    { ...differentiators[1], title: tFeatures("zeroChemicals"), description: tFeatures("zeroChemicalsDesc") },
    { ...differentiators[2], title: tFeatures("highTechClean"), description: tFeatures("highTechCleanDesc") },
    { ...differentiators[3], title: tFeatures("hydrosolsSurplus"), description: tFeatures("hydrosolsSurplusDesc") },
    { ...differentiators[4], title: tFeatures("justInTime"), description: tFeatures("justInTimeDesc") },
    { ...differentiators[5], title: tFeatures("mapaqAligned"), description: tFeatures("mapaqAlignedDesc") },
  ]

  const elements = [
    { name: t("elementWater"), icon: <WaterIcon />, desc: t("elementWaterDesc"), gradient: "from-cyan-400/80 to-blue-500/80" },
    { name: t("elementAir"), icon: <AirIcon />, desc: t("elementAirDesc"), gradient: "from-sky-400/80 to-teal-400/80" },
    { name: t("elementEarth"), icon: <SeedlingIcon />, desc: t("elementEarthDesc"), gradient: "from-emerald-400/80 to-green-500/80" },
    { name: t("elementLight"), icon: <SunIcon />, desc: t("elementLightDesc"), gradient: "from-amber-400/80 to-yellow-400/80" },
  ]

  const audiences = [
    { title: t("healthConscious"), tagline: t("nutrientDenseGreens"), href: "/for-wellness", icon: <HeartPulseIcon />, gradient: "from-emerald-500 to-teal-500" },
    { title: t("familiesAndKids"), tagline: t("easyFamilyNutrition"), href: "/for-families", icon: <FamilyIcon />, gradient: "from-rose-500 to-pink-500" },
    { title: t("chefsAndRestaurants"), tagline: t("culinaryExcellence"), href: "/for-chefs", icon: <ChefHatIcon />, gradient: "from-amber-500 to-orange-500" },
    { title: t("wellnessPractitioners"), tagline: t("plantBasedAromatics"), href: "/for-wellness", icon: <LotusIcon />, gradient: "from-violet-500 to-purple-500" },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <div className="min-h-screen relative overflow-x-hidden">
        <AuroraBackground variant="home" />
        <div className="relative z-10">
          <Hero
          title={t("heroTitle")}
          subtitle={t("heroSubtitle")}
          primaryCta={{ href: "/subscribe", label: tCommon("startSubscription") }}
          secondaryCta={{ href: "/how-it-works", label: tCommon("learnMore") }}
          showMascot={true}
        />

        {/* Featured Products Section */}
        <FeaturedProducts products={featuredProducts} />

        {/* What is Jineau - Glassmorphism Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("ourPhilosophy")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("whatIsJineau")
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
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("jineauDescription")}
              </p>
            </div>

            {/* Name meaning cards */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-4 mb-8 md:mb-12 lg:mb-16 relative">
              {/* Jin card */}
              <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center w-full max-w-xs group">
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full opacity-30" />
                  <div className="relative w-full h-full bg-gradient-to-br from-brand-mint/20 to-brand-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300">
                    <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">Jin</span>
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t("jinMeaning")}</h3>
                <p className="text-sm md:text-base text-brand-mist/80">{t("kurdish")} - ژین</p>
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
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{t("eauMeaning")}</h3>
                <p className="text-sm md:text-base text-brand-mist/80">{t("french")}</p>
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
                <h3 className="text-xl md:text-2xl font-bold gradient-text mb-1 md:mb-2 drop-shadow-sm">{t("waterOfLife")}</h3>
                <p className="text-sm md:text-base text-white/70">{t("ourPhilosophy")}</p>
              </div>

              {/* Beaver character illustration in yellow heart */}
              <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:block" aria-hidden="true">
                <div className="relative w-48 h-48">
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
            </div>

            {/* Elements grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {elements.map((element, index) => (
                <div
                  key={element.name}
                  className="glass-card rounded-xl md:rounded-2xl p-4 md:p-6 text-center group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 bg-gradient-to-br ${element.gradient} rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <div className="scale-75 md:scale-100">
                      {element.icon}
                    </div>
                  </div>
                  <h4 className="text-sm md:text-lg font-semibold text-white mb-1 group-hover:text-brand-gold transition-colors duration-300 drop-shadow-md">{element.name}</h4>
                  <p className="text-xs md:text-sm text-white/75">{element.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Jineau - Features Section */}
        <section className="relative py-8 md:py-12 lg:py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative images - positioned behind content */}
            <div className="absolute top-10 right-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 animate-float z-0 pointer-events-none opacity-30" style={{ animationDelay: '0s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.15)]">
                <img 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-float z-0 pointer-events-none opacity-25" style={{ animationDelay: '-1.5s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.12)]">
                <img 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute bottom-10 left-1/4 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 animate-float z-0 pointer-events-none opacity-30" style={{ animationDelay: '-3s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.15)]">
                <img 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-gold text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("ourDifference")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("whyJineau")
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
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("whyJineauSubtitle")}
              </p>
              
              {/* Mortar and pestle icon with decorative shapes */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image 
                      src="/jineau-home-images/1-08.svg" 
                      alt="" 
                      width={256} 
                      height={256}
                      className="w-full h-full opacity-90"
                      loading="lazy"
                    />
                  </div>
                  {/* Decorative star shapes */}
                  <div className="absolute -top-10 -left-10 w-16 h-16 animate-float">
                    <Image 
                      src="/jineau-home-images/1-10.svg" 
                      alt="" 
                      width={64} 
                      height={64}
                      className="w-full h-full opacity-70"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 animate-float" style={{ animationDelay: '-2s' }}>
                    <Image 
                      src="/jineau-home-images/1-10.svg" 
                      alt="" 
                      width={80} 
                      height={80}
                      className="w-full h-full opacity-70"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
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

        {/* Subscription Plans */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative image */}
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
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("simplePricing")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("subscriptionsMadeSimple")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("subscriptionDescription")}
              </p>
              
              {/* Bowl with growth lines icon */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
                <div className="relative w-56 h-56">
                  <Image 
                    src="/jineau-home-images/1-15.svg" 
                    alt="" 
                    width={224} 
                    height={224}
                    className="w-full h-full opacity-90"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch relative z-10">
              {subscription.plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col ${
                    index === 1 
                      ? 'border-brand-gold/30 md:scale-105 glow-gold mt-4 md:mt-0' 
                      : ''
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
                      <span className="bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 text-xs md:text-sm font-bold px-4 py-1 md:px-5 md:py-1.5 rounded-full shadow-lg">
                        {t("mostPopular")}
                      </span>
                    </div>
                  )}

                  <h3 className={`text-xl md:text-2xl font-bold text-white mb-1 md:mb-2 drop-shadow-md ${index === 1 ? 'pt-2' : ''}`}>{plan.name}</h3>
                  <p className="text-sm md:text-base text-white/70 mb-6 md:mb-8">{plan.description}</p>
                  
                  <div className="mb-6 md:mb-8 flex-grow">
                    <span className="text-5xl md:text-6xl font-bold gradient-text drop-shadow-lg">{plan.packs}</span>
                    <span className="text-white/75 ml-2 text-base md:text-lg">{t("packsPerWeek")}</span>
                  </div>

                  <Link
                    href="/subscribe"
                    className={`block w-full py-3 md:py-4 rounded-full font-semibold text-sm md:text-base text-center transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                      index === 1
                        ? 'bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 hover:shadow-[0_0_40px_rgba(233,196,106,0.4)] hover:scale-105'
                        : 'glass text-white hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    {t("choosePlan")} {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Grow For */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative images */}
            <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 animate-float z-0 pointer-events-none opacity-25" style={{ animationDelay: '-2s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.12)]">
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
            <div className="absolute bottom-20 left-1/4 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 animate-float z-0 pointer-events-none opacity-20" style={{ animationDelay: '-0.5s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.10)]">
                <Image 
                  src="/jineau-home-images/1-07.svg" 
                  alt="" 
                  width={160} 
                  height={160}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mist text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("forEveryone")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("whoWeGrowFor")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("whoWeGrowForSubtitle")}
              </p>
              
              {/* Beaver character next to pot */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block" aria-hidden="true">
                <div className="relative w-64 h-64">
                  <Image 
                    src="/jineau-home-images/fredie_shopping_microgreens.png" 
                    alt="" 
                    width={256} 
                    height={256}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {audiences.map((audience) => (
                <Link
                  key={audience.title}
                  href={audience.href}
                  className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 text-center group"
                >
                  <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 bg-gradient-to-br ${audience.gradient} rounded-2xl md:rounded-3xl flex items-center justify-center text-white shadow-xl transition-transform duration-300 group-hover:scale-110`}>
                    <div className="scale-90 md:scale-100">
                      {audience.icon}
                    </div>
                  </div>
                  <h3 className="text-base md:text-xl font-semibold text-white mb-1 md:mb-2 group-hover:text-brand-gold transition-colors duration-300 drop-shadow-md">
                    {audience.title}
                  </h3>
                  <p className="text-sm md:text-base text-white/75">{audience.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative image */}
            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-36 h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 animate-float z-0 pointer-events-none opacity-18" style={{ animationDelay: '-2.5s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.10)]">
                <Image 
                  src="/jineau-home-images/1-07.svg" 
                  alt="" 
                  width={208} 
                  height={208}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-gold text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("testimonialsLabel")}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("testimonials")}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("testimonialsSubtitle")}
              </p>
              
              {/* Beaver character in heart saying HI */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block" aria-hidden="true">
                <div className="relative w-56 h-56">
                  <Image 
                    src="/jineau-home-images/hi_head_image.png" 
                    alt="" 
                    width={224} 
                    height={224}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div key={index} className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
                  <div className="flex items-center gap-1 mb-4 md:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 md:w-5 md:h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/85 mb-6 md:mb-8 italic leading-relaxed text-sm md:text-lg drop-shadow-sm">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-white font-bold text-sm md:text-base">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm md:text-base">{testimonial.author}</p>
                      <p className="text-white/40 text-xs md:text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Background decorative images */}
            <div className="absolute top-10 left-1/4 w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 animate-float z-0 pointer-events-none opacity-22" style={{ animationDelay: '-1.5s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.12)]">
                <Image 
                  src="/jineau-home-images/1-07.svg" 
                  alt="" 
                  width={160} 
                  height={160}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute bottom-10 right-1/4 w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 animate-float z-0 pointer-events-none opacity-20" style={{ animationDelay: '-3s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.10)]">
                <Image 
                  src="/jineau-home-images/1-07.svg" 
                  alt="" 
                  width={176} 
                  height={176}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="glass-strong rounded-3xl md:rounded-[48px] p-6 sm:p-8 md:p-10 lg:p-14 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Left: Microgreens visual */}
                <div className="flex justify-center lg:justify-start">
                  <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
                    {/* SVG background layer */}
                    <div
                      className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 w-[110%] z-0"
                      aria-hidden="true"
                    >
                      <Image
                        src="/jineau-home-images/1-02.svg"
                        alt=""
                        width={400}
                        height={200}
                        className="w-full h-auto opacity-70"
                        loading="lazy"
                      />
                    </div>

                    {/* Main microgreens bowl image */}
                    <div className="relative z-10 rounded-[32px] sm:rounded-[40px] bg-black/30 border border-white/10 px-4 pt-4 pb-5 shadow-[0_30px_80px_rgba(0,0,0,0.55)]">
                      <Image
                        src="/jineau-home-images/1 (1).png"
                        alt="Fresh bowl of colorful microgreens including sunflower, radish, and pea shoots ready to eat"
                        width={600}
                        height={600}
                        className="w-full h-auto rounded-2xl sm:rounded-3xl"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>

                {/* Right: Text + CTAs */}
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2 lg:px-0 leading-tight">
                    {t("readyToTransform")}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-white/85 mb-7 md:mb-9 max-w-xl mx-auto lg:mx-0 leading-relaxed drop-shadow-lg px-2 lg:px-0">
                    {t("ctaSubtitle")}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
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
            </div>
          </div>
        </section>
        </div>
      </div>
    </>
  )
}
