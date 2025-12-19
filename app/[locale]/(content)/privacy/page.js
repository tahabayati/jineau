import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "Privacy Policy", fr: "Politique de confidentialité", fa: "سیاست حفظ حریم خصوصی" }
  return { title: titles[locale] || titles.en }
}

export default async function PrivacyPage() {
  const t = await getTranslations("common")
  
  return (
    <div className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p>
              At Jineau, we collect information necessary to process your orders and provide our services. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number, and delivery address</li>
              <li>Payment information processed securely through our payment processor</li>
              <li>Order history and preferences</li>
              <li>Communications with our customer service team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your subscription or purchases</li>
              <li>Send you important service updates and notifications</li>
              <li>Improve our products and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery partners to fulfill your orders</li>
              <li>Payment processors to handle transactions securely</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. All payment information is processed using secure encryption technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your account</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <p>
              We use cookies to improve your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
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

