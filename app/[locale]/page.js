import { getTranslations } from "next-intl/server"
import Hero from "@/components/Hero"
import { Link } from "@/i18n/routing"
import { differentiators, testimonials, subscription } from "@/data/siteCopy"

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

export default async function HomePage() {
  const t = await getTranslations("home")
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

  const elements = [
    { name: "Water", icon: <WaterIcon />, desc: "Pure filtered water", gradient: "from-cyan-400/80 to-blue-500/80" },
    { name: "Air", icon: <AirIcon />, desc: "Triple-filtered air", gradient: "from-sky-400/80 to-teal-400/80" },
    { name: "Earth", icon: <SeedlingIcon />, desc: "Organic growing medium", gradient: "from-emerald-400/80 to-green-500/80" },
    { name: "Light", icon: <SunIcon />, desc: "Optimized spectrum", gradient: "from-amber-400/80 to-yellow-400/80" },
  ]

  const audiences = [
    { title: "Health-Conscious", tagline: "Nutrient-dense greens", href: "/for-wellness", icon: <HeartPulseIcon />, gradient: "from-emerald-500 to-teal-500" },
    { title: "Families & Kids", tagline: "Easy family nutrition", href: "/for-families", icon: <FamilyIcon />, gradient: "from-rose-500 to-pink-500" },
    { title: "Chefs & Restaurants", tagline: "Culinary excellence", href: "/for-chefs", icon: <ChefHatIcon />, gradient: "from-amber-500 to-orange-500" },
    { title: "Wellness Practitioners", tagline: "Plant-based aromatics", href: "/for-wellness", icon: <LotusIcon />, gradient: "from-violet-500 to-purple-500" },
  ]

  return (
    <div className="min-h-screen relative">
      {/* Global background overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full aurora opacity-50" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] animate-breathe" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] animate-breathe" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-3/4 left-1/3 w-[400px] h-[400px] bg-brand-mint/8 rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '-2s' }} />
      </div>

      <div className="relative">
        <Hero
          title={t("heroTitle")}
          subtitle={t("heroSubtitle")}
          primaryCta={{ href: "/subscribe", label: tCommon("startSubscription") }}
          secondaryCta={{ href: "/how-it-works", label: tCommon("learnMore") }}
          showMascot={true}
        />

        {/* What is Jineau - Glassmorphism Section */}
        <section className="relative py-32 overflow-hidden">
          {/* Section background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-mint/15 to-transparent rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-brand-gold/10 to-transparent rounded-full blur-[80px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-20">
              <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
                Our Philosophy
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("whatIsJineau")}
              </h2>
              <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
                {t("jineauDescription")}
              </p>
            </div>

            {/* Name meaning cards */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4 mb-24">
              {/* Jin card */}
              <div className="glass-card rounded-3xl p-8 text-center w-full max-w-xs group">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full animate-pulse-glow opacity-40" />
                  <div className="relative w-full h-full bg-gradient-to-br from-brand-mint/20 to-brand-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <span className="text-3xl font-bold text-white">Jin</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t("jinMeaning")}</h3>
                <p className="text-brand-mist/80">{t("kurdish")} - ژین</p>
              </div>

              {/* Plus sign */}
              <div className="text-5xl text-brand-gold/40 font-extralight">+</div>

              {/* Eau card */}
              <div className="glass-card rounded-3xl p-8 text-center w-full max-w-xs group">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-mist to-brand-blue rounded-full animate-pulse-glow opacity-40" style={{ animationDelay: '-3s' }} />
                  <div className="relative w-full h-full bg-gradient-to-br from-brand-mist/20 to-brand-blue/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500">
                    <span className="text-3xl font-bold text-white">Eau</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{t("eauMeaning")}</h3>
                <p className="text-brand-mist/80">{t("french")}</p>
              </div>

              {/* Equals sign */}
              <div className="text-5xl text-brand-gold/40 font-extralight">=</div>

              {/* Jineau card */}
              <div className="glass-card rounded-3xl p-8 text-center w-full max-w-xs glow-mint group">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-gold via-brand-mint to-brand-primary rounded-full animate-rotate-slow opacity-60" />
                  <div className="absolute inset-1 bg-[#081620] rounded-full" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text">Jineau</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold gradient-text mb-2">{t("waterOfLife")}</h3>
                <p className="text-brand-mist/80">{t("ourPhilosophy")}</p>
              </div>
            </div>

            {/* Elements grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {elements.map((element, index) => (
                <div
                  key={element.name}
                  className="glass-card rounded-2xl p-6 text-center group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${element.gradient} rounded-2xl flex items-center justify-center icon-container text-white shadow-lg`}>
                    {element.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-brand-mint transition-colors duration-300">{element.name}</h4>
                  <p className="text-sm text-white/40">{element.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Jineau - Features Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 w-[700px] h-[700px] bg-gradient-to-r from-brand-primary/12 to-transparent rounded-full blur-[150px] -translate-y-1/2" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-gold text-sm font-medium mb-6 tracking-wide">
                Our Difference
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("whyJineau")}
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                {t("whyJineauSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {translatedDifferentiators.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-3xl p-8 group"
                >
                  <div className="w-14 h-14 mb-6 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-2xl flex items-center justify-center icon-container text-brand-mint border border-white/10">
                    {featureIcons[feature.icon] || <SparklesIcon />}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-mint transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subscription Plans */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-brand-gold/12 to-transparent rounded-full blur-[120px]" />
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-brand-blue/10 to-transparent rounded-full blur-[100px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
                Simple Pricing
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("subscriptionsMadeSimple")}
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                {t("subscriptionDescription")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {subscription.plans.map((plan, index) => (
                <div
                  key={plan.name}
                  className={`relative glass-card rounded-3xl p-8 ${
                    index === 1 
                      ? 'border-brand-gold/30 md:scale-105 glow-gold' 
                      : ''
                  }`}
                >
                  {index === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 text-sm font-bold px-5 py-1.5 rounded-full shadow-lg">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/40 mb-8">{plan.description}</p>
                  
                  <div className="mb-8">
                    <span className="text-6xl font-bold gradient-text">{plan.packs}</span>
                    <span className="text-white/50 ml-2 text-lg">packs/week</span>
                  </div>

                  <Link
                    href="/subscribe"
                    className={`block w-full py-4 rounded-full font-semibold text-center transition-all duration-500 ${
                      index === 1
                        ? 'bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 hover:shadow-[0_0_40px_rgba(233,196,106,0.4)] hover:scale-105'
                        : 'glass text-white hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    Choose {plan.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Grow For */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-brand-primary/8 to-transparent rounded-full blur-[150px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mist text-sm font-medium mb-6 tracking-wide">
                For Everyone
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("whoWeGrowFor")}
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                {t("whoWeGrowForSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {audiences.map((audience) => (
                <Link
                  key={audience.title}
                  href={audience.href}
                  className="glass-card rounded-3xl p-8 text-center group"
                >
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${audience.gradient} rounded-3xl flex items-center justify-center icon-container text-white shadow-xl`}>
                    {audience.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-mint transition-colors duration-300">
                    {audience.title}
                  </h3>
                  <p className="text-white/40">{audience.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-brand-gold/10 to-transparent rounded-full blur-[120px]" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-gold text-sm font-medium mb-6 tracking-wide">
                Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("testimonials")}
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                {t("testimonialsSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <div key={index} className="glass-card rounded-3xl p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/70 mb-8 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.author}</p>
                      <p className="text-white/40 text-sm">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/15 via-brand-mint/8 to-brand-blue/15" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-brand-mint/10 to-transparent rounded-full blur-[200px] animate-breathe" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-strong rounded-[48px] p-12 md:p-20">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                {t("readyToTransform")}
              </h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
                {t("ctaSubtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/subscribe"
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105"
                >
                  {tCommon("startSubscription")}
                  <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-semibold rounded-full transition-all duration-500 hover:bg-white/10 hover:scale-105"
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
