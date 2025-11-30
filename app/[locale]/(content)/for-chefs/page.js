import { getTranslations } from "next-intl/server"
import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
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
    <>
      <section className="py-20 bg-gradient-to-br from-brand-primary/10 via-white to-brand-mist/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white rounded-full shadow-lg">
              <span className="text-6xl">👨‍🍳</span>
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
            title={t("whyChefsChoose")}
            subtitle={t("whyChefsSubtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <span className="text-4xl block mb-4">{feature.icon}</span>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-mist/20 via-white to-brand-gold/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("culinaryApplications")}
            subtitle={t("culinaryApplicationsSubtitle")}
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {applications.map((app) => (
              <div key={app.name} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-brand-mint transition-colors">
                <h3 className="font-bold text-gray-900 mb-1">{app.name}</h3>
                <p className="text-gray-600 text-sm">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("chefPlan")}</h2>
          <p className="text-white/90 mb-8">{t("chefPlanSubtitle")}</p>
          
          <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm inline-block">
            <div className="text-5xl font-bold mb-2">7 packs</div>
            <div className="text-white/80 mb-4">per week</div>
            <div className="text-2xl font-bold mb-6">${subscription.plans[2].price}/week</div>
            <Button href="/subscribe" variant="gold" size="lg">
              {tCommon("startSubscription")}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
