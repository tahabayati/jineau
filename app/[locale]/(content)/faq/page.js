import { getTranslations } from "next-intl/server"
import FAQAccordion from "@/components/FAQAccordion"
import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
import { faqItems, contactInfo } from "@/data/siteCopy"
import { generateFAQSchema } from "@/lib/seo"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "FAQ", fr: "FAQ", fa: "سوالات متداول" }
  return { title: titles[locale] || titles.en }
}

export default async function FAQPage() {
  const t = await getTranslations("faq")
  const tCommon = await getTranslations("common")
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/20 to-brand-mint/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-mist/30 to-brand-gold/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("stillHaveQuestions")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("contactUs")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-secondary transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {contactInfo.email}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try <span className="gradient-text">Jineau</span>?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Start your weekly subscription and taste the difference.
          </p>
          <Button href="/subscribe" variant="gold" size="lg">
            {tCommon("startSubscription")}
          </Button>
        </div>
      </section>
    </>
  )
}
