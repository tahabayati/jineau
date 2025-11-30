import { getTranslations } from "next-intl/server"
import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "Hydrosols for Wellness", fr: "Hydrolats pour le bien-être", fa: "هیدروسول برای سلامتی" }
  return { title: titles[locale] || titles.en }
}

export default async function ForWellnessPage() {
  const t = await getTranslations("forWellness")
  const tCommon = await getTranslations("common")

  const features = [
    { title: t("plantBased"), desc: t("plantBasedDesc"), icon: "🌿" },
    { title: t("gentleVersatile"), desc: t("gentleVersatileDesc"), icon: "✨" },
    { title: t("zeroWaste"), desc: t("zeroWasteDesc"), icon: "♻️" },
    { title: t("artisanalQuality"), desc: t("artisanalQualityDesc"), icon: "🎨" },
  ]

  const uses = [
    { name: "Facial Mist", desc: "Refresh and hydrate throughout the day" },
    { name: "Room Spray", desc: "Create a calming atmosphere" },
    { name: "Linen Freshener", desc: "Add botanical notes to fabrics" },
    { name: "Wellness Rituals", desc: "Integrate into meditation or yoga" },
    { name: "Aromatherapy", desc: "Gentle aromatic experience" },
    { name: "Self-Care", desc: "Enhance personal care routines" },
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-brand-mist/30 via-white to-brand-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <span className="text-6xl">🧘</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-2xl text-brand-secondary font-medium mb-4">
            {t("tagline")}
          </p>
          <p className="text-lg text-gray-600">
            {t("description")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("whyPractitionersChoose")}
            subtitle={t("whyPractitionersSubtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-gradient-to-br from-brand-mist/20 to-brand-mint/10 rounded-2xl p-6 border border-brand-mist/30 hover:shadow-lg transition-shadow">
                <span className="text-4xl block mb-4">{feature.icon}</span>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-mint/20 via-white to-brand-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("hydrosolUses")}
            subtitle={t("hydrosolUsesSubtitle")}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {uses.map((use) => (
              <div key={use.name} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-brand-mint transition-colors">
                <h3 className="font-bold text-gray-900 mb-1">{use.name}</h3>
                <p className="text-gray-600 text-sm">{use.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">{t("importantInfo")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-amber-200">
              <span className="text-2xl">⚠️</span>
              <p className="text-amber-700 text-sm">{t("externalUseOnly")}</p>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-amber-200">
              <span className="text-2xl">ℹ️</span>
              <p className="text-amber-700 text-sm">{t("noMedicalClaims")}</p>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-amber-200">
              <span className="text-2xl">🧪</span>
              <p className="text-amber-700 text-sm">{t("patchTest")}</p>
            </div>
            <div className="flex items-start gap-3 bg-white rounded-lg p-4 border border-amber-200">
              <span className="text-2xl">🌡️</span>
              <p className="text-amber-700 text-sm">{t("storeProperlyNote")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Explore Our Hydrosol Collection</h2>
          <p className="text-white/90 mb-8">
            Pure plant waters, distilled with care from our surplus microgreens.
          </p>
          <Button href="/shop?category=hydrosols" variant="gold" size="lg">
            {tCommon("shopMicrogreens")}
          </Button>
        </div>
      </section>
    </>
  )
}
