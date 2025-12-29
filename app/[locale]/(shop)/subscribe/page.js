import { getTranslations } from "next-intl/server"
import SubscriptionPicker from "@/components/SubscriptionPicker"
import SectionTitle from "@/components/SectionTitle"
import FeatureList from "@/components/FeatureList"
import { deliveryConfig, regionConfig } from "@/lib/config"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = {
    en: "Subscribe to Weekly Microgreens",
    fr: "Abonnement aux Micropousses",
    fa: "اشتراک میکروگرین هفتگی",
  }
  return { title: titles[locale] || titles.en }
}

export default async function SubscribePage() {
  const t = await getTranslations("subscribe")

  const subscriptionFeatures = [
    {
      title: t("harvestToDoor"),
      description: t("harvestToDoorDesc"),
      icon: "clock",
    },
    {
      title: t("freshSwapGuarantee"),
      description: t("freshSwapDesc"),
      icon: "shield",
    },
    {
      title: t("skipAnytime"),
      description: t("skipAnytimeDesc"),
      icon: "sparkle",
    },
  ]

  return (
    <div className="py-12 md:py-20">
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10"
        >
          <img
            src="/jineau-home-images/1-09.svg"
            alt=""
            className="absolute w-24 md:w-32 -top-10 -left-12 opacity-90 drop-shadow-lg"
            style={{ animation: "float 12s ease-in-out infinite" }}
          />
          <img
            src="/jineau-home-images/1-09.svg"
            alt=""
            className="absolute w-20 md:w-28 top-6 right-4 opacity-85 drop-shadow-md"
            style={{ animation: "float 14s ease-in-out infinite", animationDelay: "1.5s" }}
          />
          <img
            src="/jineau-home-images/1-09.svg"
            alt=""
            className="absolute w-20 md:w-28 -bottom-14 left-8 opacity-85 drop-shadow-md"
            style={{ animation: "float 16s ease-in-out infinite", animationDelay: "3s" }}
          />
        </div>
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-12">
          <SubscriptionPicker />
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {t("whySubscribe")}
          </h2>
          <FeatureList features={subscriptionFeatures} columns={3} />
        </div>

        <div className="bg-linear-to-br from-brand-mist/30 via-white to-brand-gold/10 rounded-2xl p-8 border border-brand-mist/30">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            {t("howItWorks")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: t("step1"), desc: t("step1Desc") },
              { step: 2, title: t("step2"), desc: t("step2Desc") },
              { step: 3, title: t("step3"), desc: t("step3Desc") },
              { step: 4, title: t("step4"), desc: t("step4Desc") },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3 shadow-md">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="font-semibold text-gray-900 mb-4">{t("deliveryInformation")}</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{regionConfig.deliveryRegion}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t("orderCutoff")}: {deliveryConfig.orderCutoff}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>{t("freeDeliveryAllSubscriptions")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
