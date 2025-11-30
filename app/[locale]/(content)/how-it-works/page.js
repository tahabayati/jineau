import { getTranslations } from "next-intl/server"
import SectionTitle from "@/components/SectionTitle"
import CTASection from "@/components/CTASection"
import MarmotMascot from "@/components/MarmotMascot"
import { deliveryConfig, regionConfig } from "@/lib/config"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "How It Works", fr: "Comment ça marche", fa: "نحوه کار" }
  return { title: titles[locale] || titles.en }
}

export default async function HowItWorksPage() {
  const t = await getTranslations("howItWorks")
  const tCommon = await getTranslations("common")

  const steps = [
    { num: 1, title: t("step1Title"), desc: t("step1Desc"), icon: "🛒" },
    { num: 2, title: t("step2Title"), desc: t("step2Desc"), icon: "⏰" },
    { num: 3, title: t("step3Title"), desc: t("step3Desc"), icon: "🌱" },
    { num: 4, title: t("step4Title"), desc: t("step4Desc"), icon: "🚚" },
  ]

  const storageSteps = [
    { title: t("keepSealed"), desc: t("keepSealedDesc"), icon: "📦" },
    { title: t("topShelf"), desc: t("topShelfDesc"), icon: "❄️" },
    { title: t("enjoyFresh"), desc: t("enjoyFreshDesc"), icon: "🥗" },
  ]

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/20 to-brand-mint/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-mint via-brand-primary to-brand-mist -translate-x-1/2" />
            
            {steps.map((step, i) => (
              <div key={step.num} className={`relative flex items-center gap-8 mb-16 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={`hidden md:block flex-1 ${i % 2 === 1 ? "text-left" : "text-right"}`}>
                  <div className={`inline-block bg-gradient-to-br from-brand-mist/30 to-brand-mint/20 rounded-2xl p-6 shadow-sm border border-brand-mist/30 ${i % 2 === 1 ? "" : "text-left"}`}>
                    <span className="text-4xl mb-4 block">{step.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>

                <div className="w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg flex-shrink-0 z-10">
                  {step.num}
                </div>

                <div className="md:hidden flex-1">
                  <div className="bg-gradient-to-br from-brand-mist/30 to-brand-mint/20 rounded-2xl p-6 shadow-sm border border-brand-mist/30">
                    <span className="text-4xl mb-4 block">{step.icon}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>

                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-brand-gold/10 via-white to-brand-mist/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={t("storageTitle")}
            subtitle={t("storageSubtitle")}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storageSteps.map((step, i) => (
              <div key={step.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-mist/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <span className="inline-block bg-brand-gold/20 text-brand-primary text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Step {i + 1}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-shrink-0">
              <div className="p-6 bg-white/10 rounded-full backdrop-blur-sm">
                <MarmotMascot size="xl" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{t("freshSwapTitle")}</h2>
              <p className="text-white/90 mb-6">{t("freshSwapSubtitle")}</p>
              
              <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm mb-6">
                <h3 className="font-bold mb-2">{t("freshSwapQuestion")}</h3>
                <p className="text-white/80">{t("freshSwapAnswer")}</p>
              </div>

              <ul className="space-y-2">
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t("freshSwapBenefit1")}
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t("freshSwapBenefit2")}
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t("freshSwapBenefit3")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Start Your Subscription?"
        subtitle={`Join families across ${regionConfig.deliveryRegion} getting fresh microgreens every ${deliveryConfig.deliveryDay}.`}
        primaryCta={{ href: "/subscribe", label: tCommon("startSubscription") }}
        secondaryCta={{ href: "/shop", label: tCommon("shopMicrogreens") }}
      />
    </>
  )
}
