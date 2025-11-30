import FAQAccordion from "@/components/FAQAccordion"
import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
import { faqItems, contactInfo } from "@/data/siteCopy"
import { generateFAQSchema } from "@/lib/seo"

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Jineau microgreens delivery, storage, subscriptions, and more.",
}

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqItems)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about our microgreens, delivery, and subscriptions.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contactInfo.email}`}
              className="inline-flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-medium hover:bg-brand-secondary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {contactInfo.email}
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, "")}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary px-6 py-3 rounded-full font-medium hover:bg-brand-primary hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {contactInfo.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try Jineau?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Start your weekly subscription and taste the difference of truly fresh microgreens.
          </p>
          <Button href="/subscribe" variant="gold" size="lg">
            Start Subscription
          </Button>
        </div>
      </section>
    </>
  )
}

