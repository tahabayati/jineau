import { getTranslations } from "next-intl/server"
import SectionTitle from "@/components/SectionTitle"
import MarmotMascot from "@/components/MarmotMascot"
import CTASection from "@/components/CTASection"
import FeatureList from "@/components/FeatureList"
import { brandStory, differentiators } from "@/data/siteCopy"
import { regionConfig } from "@/lib/config"

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
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/20 to-brand-mint/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-white rounded-full shadow-xl">
              <MarmotMascot size="xl" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Jineau combines "Jin" (ژین) — Kurdish for life — with "Eau" — French for water. Together, they form "Water of Life."
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-mist to-brand-mint rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-brand-primary">Jin</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Life</h3>
              <p className="text-gray-600">Kurdish (ژین) - representing vitality</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-brand-mist to-brand-mint rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-brand-primary">Eau</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Water</h3>
              <p className="text-gray-600">French - the essential element</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-xl font-bold text-white">Jineau</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Water of Life</h3>
              <p className="text-gray-600">Our philosophy</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("ourMission")}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {brandStory.mission}
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("ourValues")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {brandStory.values.map((value) => (
                <div key={value} className="flex items-center gap-3 bg-gradient-to-r from-brand-mist/20 to-brand-mint/10 rounded-lg p-4 border border-brand-mist/30">
                  <svg className="w-6 h-6 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-gold/10 via-white to-brand-mist/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("whatMakesUsDifferent")}
            subtitle="We combine ancient wisdom with modern technology."
          />
          <FeatureList features={translatedDifferentiators} columns={3} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("ourStory")}</h2>
          <div className="text-gray-600 space-y-4 text-lg leading-relaxed">
            <p>{t("storyP1")}</p>
            <p>{t("storyP2")}</p>
            <p>{t("storyP3")}</p>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Taste the Difference?"
        subtitle={`Join families in ${regionConfig.deliveryRegion} enjoying the freshest microgreens every week.`}
        primaryCta={{ href: "/subscribe", label: tCommon("startSubscription") }}
        secondaryCta={{ href: "/shop", label: tCommon("shopMicrogreens") }}
      />
    </>
  )
}
