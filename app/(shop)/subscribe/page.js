import SubscriptionPicker from "@/components/SubscriptionPicker"
import SectionTitle from "@/components/SectionTitle"
import FeatureList from "@/components/FeatureList"
import { subscription, deliveryInfo } from "@/data/siteCopy"

export const metadata = {
  title: "Subscribe to Weekly Microgreens",
  description: "Get fresh, plasma-cleaned microgreens delivered every Saturday. Choose your weekly pack size and save with our subscription plans.",
}

const subscriptionFeatures = [
  {
    title: "Harvest to Door in 24 Hours",
    description: "We harvest on Friday and deliver on Saturday. Your greens are at peak freshness.",
    icon: "clock",
  },
  {
    title: "Free Replacement Guarantee",
    description: "Unused packs from your weekly delivery? We'll replace them for free.",
    icon: "shield",
  },
  {
    title: "Skip or Cancel Anytime",
    description: "Life happens. Modify, skip, or cancel your subscription before Wednesday 11:59 PM.",
    icon: "sparkle",
  },
]

export default function SubscribePage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Weekly Microgreens Subscription"
          subtitle="Fresh, plasma-cleaned microgreens delivered to your door every Saturday. Choose your plan and customize your selection."
        />

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-12">
          <SubscriptionPicker />
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Subscribe?
          </h2>
          <FeatureList features={subscriptionFeatures} columns={3} />
        </div>

        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Choose Your Plan", desc: "Select 3, 5, or 7 packs per week" },
              { step: 2, title: "Order by Wednesday", desc: "Weekly cutoff is Wednesday 11:59 PM" },
              { step: 3, title: "We Harvest Friday", desc: "Your greens are picked at peak freshness" },
              { step: 4, title: "Delivered Saturday", desc: "Enjoy within 24 hours of harvest" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-brand-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="font-semibold text-gray-900 mb-4">Delivery Information</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>South Shore Montreal (Montérégie)</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Order cutoff: {deliveryInfo.orderCutoff}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <span>Free delivery on all subscriptions</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

