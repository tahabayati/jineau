import { getTranslations } from "next-intl/server"
import SectionTitle from "@/components/SectionTitle"
import MarmotMascot from "@/components/MarmotMascot"
import Button from "@/components/Button"
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
    "Roll microgreens in mini wraps with cream cheese",
    "Top peanut butter sandwiches with pea shoots",
    "Mix into rice or pasta salads for color",
    "Blend into smoothies for hidden nutrients",
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-brand-gold/20 via-white to-brand-mist/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <span className="text-6xl">👨‍👩‍👧‍👦</span>
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
            title={t("whyFamiliesLove")}
            subtitle={t("whyFamiliesSubtitle")}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{t("lunchboxIdeas")}</h2>
              <p className="text-gray-600 mb-6">{t("lunchboxIdeasSubtitle")}</p>
              
              <ul className="space-y-3">
                {lunchboxIdeas.map((idea, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-primary text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-gray-700">{idea}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
              <MarmotMascot size="xl" className="mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t("meetMarmot")}</h3>
              <p className="text-gray-600 text-sm">
                {t("marmotDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("familyPlan")}</h2>
          <p className="text-white/90 mb-8">{t("familyPlanSubtitle")}</p>
          
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm inline-block">
            <div className="text-5xl font-bold mb-2">5 packs</div>
            <div className="text-white/80 mb-4">per week</div>
            <div className="text-2xl font-bold mb-6">${subscription.plans[1].price}/week</div>
            <Button href="/subscribe" variant="gold" size="lg">
              {tCommon("startSubscription")}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
