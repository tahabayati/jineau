import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "Terms of Service", fr: "Conditions d'utilisation", fa: "شرایط خدمات" }
  return { title: titles[locale] || titles.en }
}

export default async function TermsPage() {
  const t = await getTranslations("common")
  
  return (
    <div className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using Jineau's services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Subscription Service</h2>
            <p>
              Our subscription service provides weekly deliveries of fresh microgreens. Key terms include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions are billed weekly on the day you subscribe</li>
              <li>You can skip, pause, or cancel your subscription at any time</li>
              <li>Changes must be made before the order cutoff time (Wednesday 6 PM)</li>
              <li>Delivery occurs every Friday within our service area</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Orders and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are in Canadian dollars (CAD)</li>
              <li>Payment is processed securely through our payment provider</li>
              <li>We reserve the right to refuse any order</li>
              <li>Promotional codes cannot be combined unless stated otherwise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Delivery</h2>
            <p>
              We deliver to Montreal and Montérégie regions. Delivery terms:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deliveries are made on Fridays during business hours</li>
              <li>You must provide a safe delivery location</li>
              <li>We are not responsible for orders left unattended after delivery</li>
              <li>Delivery fees apply for orders under the minimum threshold</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Product Quality</h2>
            <p>
              We guarantee the freshness and quality of our products. If you receive damaged or unsatisfactory products, please contact us within 24 hours of delivery for a replacement or refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cancellation and Refunds</h2>
            <p>
              Please refer to our Refund Policy for detailed information about cancellations and refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Jineau and protected by copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p>
              Jineau shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at{" "}
              <a href="mailto:hello@jineau.ca" className="text-brand-primary hover:text-brand-secondary">
                hello@jineau.ca
              </a>
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: December 2025
          </p>
        </div>
      </div>
    </div>
  )
}

