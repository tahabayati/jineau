import { getTranslations } from "next-intl/server"
import Hero from "@/components/Hero"
import SectionTitle from "@/components/SectionTitle"
import FeatureList from "@/components/FeatureList"
import TestimonialList from "@/components/TestimonialList"
import CTASection from "@/components/CTASection"
import Button from "@/components/Button"
import MarmotMascot from "@/components/MarmotMascot"
import { differentiators, testimonials, subscription } from "@/data/siteCopy"

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

  const elementIcons = [
    { name: "Water", symbol: "💧", description: "Pure filtered water" },
    { name: "Air", symbol: "🌬️", description: "Triple-filtered air" },
    { name: "Earth", symbol: "🌱", description: "Organic growing medium" },
    { name: "Light", symbol: "☀️", description: "Optimized spectrum" },
  ]

  return (
    <>
      <Hero
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        primaryCta={{ href: "/subscribe", label: tCommon("startSubscription") }}
        secondaryCta={{ href: "/how-it-works", label: tCommon("learnMore") }}
        showMascot={true}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("whatIsJineau")}
            subtitle={t("jineauDescription")}
          />

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-mist to-brand-mint rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-3xl font-bold text-brand-primary">Jin</span>
                </div>
                <p className="font-semibold text-gray-900">{t("jinMeaning")}</p>
                <p className="text-sm text-gray-500">{t("kurdish")} - ژین</p>
              </div>

              <div className="text-4xl text-brand-gold font-bold">+</div>

              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-mist to-brand-mint rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-3xl font-bold text-brand-primary">Eau</span>
                </div>
                <p className="font-semibold text-gray-900">{t("eauMeaning")}</p>
                <p className="text-sm text-gray-500">{t("french")}</p>
              </div>

              <div className="text-4xl text-brand-gold font-bold">=</div>

              <div className="text-center">
                <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <span className="text-white text-lg font-bold">Jineau</span>
                </div>
                <p className="font-semibold text-gray-900">{t("waterOfLife")}</p>
                <p className="text-sm text-gray-500">{t("ourPhilosophy")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {elementIcons.map((element) => (
                <div
                  key={element.name}
                  className="bg-gradient-to-br from-brand-mist/20 to-brand-mint/20 rounded-xl p-4 text-center border border-brand-mist/30 hover:shadow-md transition-shadow"
                >
                  <div className="text-3xl mb-2">{element.symbol}</div>
                  <p className="font-medium text-gray-900">{element.name}</p>
                  <p className="text-xs text-gray-500">{element.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-mist/20 via-white to-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("whyJineau")}
            subtitle={t("whyJineauSubtitle")}
          />
          <FeatureList features={translatedDifferentiators} columns={3} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("subscriptionsMadeSimple")}
            subtitle={t("subscriptionDescription")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {subscription.plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 border-2 transition-all shadow-sm hover:shadow-lg ${
                  index === 1
                    ? "border-brand-primary shadow-lg scale-105"
                    : "border-gray-200 hover:border-brand-secondary"
                }`}
              >
                {index === 1 && (
                  <div className="bg-brand-gold text-gray-900 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-brand-primary mb-1">
                  {plan.packs} packs
                </div>
                <p className="text-gray-500 mb-6">per week</p>
                <Button
                  href="/subscribe"
                  variant={index === 1 ? "primary" : "secondary"}
                  className="w-full"
                >
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-primary/5 via-brand-mint/10 to-brand-mist/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("whoWeGrowFor")}
            subtitle={t("whoWeGrowForSubtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Health-Conscious", tagline: "Nutrient-dense greens", href: "/for-wellness", icon: "💪" },
              { title: "Families & Kids", tagline: "Easy family nutrition", href: "/for-families", icon: "👨‍👩‍👧‍👦" },
              { title: "Chefs & Restaurants", tagline: "Culinary excellence", href: "/for-chefs", icon: "👨‍🍳" },
              { title: "Wellness Practitioners", tagline: "Plant-based aromatics", href: "/for-wellness", icon: "🧘" },
            ].map((audience) => (
              <a
                key={audience.title}
                href={audience.href}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-mint transition-all group"
              >
                <div className="text-4xl mb-4">{audience.icon}</div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-brand-primary transition-colors mb-2">{audience.title}</h3>
                <p className="text-sm text-gray-600">{audience.tagline}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("testimonials")}
            subtitle={t("testimonialsSubtitle")}
          />
          <TestimonialList testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-gold/10 via-white to-brand-mist/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <SectionTitle
              title={t("fromOurJournal")}
              subtitle={t("journalSubtitle")}
              className="mb-0 text-left md:text-left"
              centered={false}
            />
            <Button href="/blog" variant="outline">
              {tCommon("viewAll")}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "How to Use Microgreens Daily", excerpt: "Simple ways to add nutrient-dense microgreens to every meal.", slug: "how-to-use-microgreens-daily" },
              { title: "5 Fast Recipes Under 5 Minutes", excerpt: "Quick and delicious recipes featuring our fresh microgreens.", slug: "5-fast-recipes-under-5-minutes" },
              { title: "Behind the Scenes: High-Tech Farming", excerpt: "Learn how advanced clean technology keeps your greens safe.", slug: "high-tech-farming" },
            ].map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-mint to-brand-mist flex items-center justify-center">
                  <MarmotMascot size="md" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={t("readyToTransform")}
        subtitle={t("ctaSubtitle")}
        primaryCta={{ href: "/subscribe", label: tCommon("startSubscription") }}
        secondaryCta={{ href: "/shop", label: tCommon("shopMicrogreens") }}
      />
    </>
  )
}
