import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "Refund Policy", fr: "Politique de remboursement", fa: "سیاست بازپرداخت" }
  return { title: titles[locale] || titles.en }
}

export default async function RefundsPage() {
  const t = await getTranslations("common")
  
  return (
    <div className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p>
              At Jineau, we stand behind the quality of our fresh microgreens and hydrosols. Your satisfaction is our priority, and we are committed to making things right if you are not completely happy with your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Quality Guarantee</h2>
            <p>
              We harvest your microgreens within 24 hours of delivery to ensure maximum freshness. If you receive a product that is:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Damaged during shipping</li>
              <li>Not fresh or wilted upon arrival</li>
              <li>Incorrect or missing items</li>
              <li>Otherwise unsatisfactory</li>
            </ul>
            <p className="mt-4">
              Please contact us within 24 hours of delivery with photos of the issue. We will provide a full refund or replacement at no additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Subscription Cancellations</h2>
            <p>
              You can cancel your subscription at any time with no penalty:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancel before Wednesday 6 PM to avoid the next week's charge</li>
              <li>Already charged subscriptions cannot be refunded if the order has been harvested</li>
              <li>You can skip weeks instead of canceling if you need a temporary break</li>
              <li>No cancellation fees or minimum commitments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. One-Time Orders</h2>
            <p>
              For one-time purchases:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cancellations are accepted before Wednesday 6 PM for a full refund</li>
              <li>Orders cannot be refunded after harvesting has begun</li>
              <li>Quality issues will be addressed with a refund or replacement</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Delivery Issues</h2>
            <p>
              If you do not receive your order:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us immediately if your order does not arrive on Friday</li>
              <li>We will investigate with our delivery team</li>
              <li>We will provide a full refund or redeliver at no charge</li>
              <li>We are not responsible for orders stolen after confirmed delivery</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Processing</h2>
            <p>
              Once approved, refunds are processed as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Refunds are issued to the original payment method</li>
              <li>Processing time is typically 5-10 business days</li>
              <li>You will receive an email confirmation when the refund is processed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Replacements</h2>
            <p>
              In most cases, we prefer to send a replacement order instead of a refund to ensure you receive the fresh greens you deserve. Replacements are shipped at the next available delivery date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact for Refunds</h2>
            <p>
              To request a refund or report an issue:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email us at <a href="mailto:hello@jineau.ca" className="text-brand-primary hover:text-brand-secondary">hello@jineau.ca</a></li>
              <li>Include your order number and photos of any issues</li>
              <li>Describe the problem clearly</li>
              <li>We respond within 24 hours on business days</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Exceptions</h2>
            <p>
              Refunds may not be available for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders damaged due to improper storage by the customer</li>
              <li>Orders left outside for extended periods after delivery</li>
              <li>Requests made more than 48 hours after delivery</li>
              <li>Abuse of the refund policy</li>
            </ul>
          </section>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: December 2025
          </p>
        </div>
      </div>
    </div>
  )
}

