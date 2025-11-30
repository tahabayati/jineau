import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
import MarmotMascot from "@/components/MarmotMascot"
import { deliveryInfo } from "@/data/siteCopy"

export const metadata = {
  title: "How It Works",
  description: "Learn how Jineau delivers fresh microgreens from harvest to your door in 24 hours. Order by Wednesday, harvest Friday, delivered Saturday.",
}

const steps = [
  {
    number: 1,
    title: "Choose Your Greens",
    description: "Browse our selection of plasma-cleaned microgreens and hydrosols. Pick individual packs or start a weekly subscription for the best value.",
    details: [
      "10+ varieties of microgreens",
      "Aromatic hydrosols from surplus greens",
      "Subscription plans for 3, 5, or 7 packs per week",
    ],
  },
  {
    number: 2,
    title: "Order by Wednesday",
    description: "Place your order by Wednesday 11:59 PM to be included in Saturday's delivery. This gives us time to plan our harvest for peak freshness.",
    details: [
      "Weekly order cutoff: Wednesday 11:59 PM",
      "Modify or skip subscriptions anytime before cutoff",
      "One-time orders also accepted",
    ],
  },
  {
    number: 3,
    title: "We Harvest Friday",
    description: "Your microgreens are harvested on Friday at peak maturity. They go through our cold-plasma cleaning process—no water, no chemicals, just clean greens.",
    details: [
      "Just-in-time harvest for maximum freshness",
      "Cold-plasma sanitization technology",
      "No washing required—ready to eat",
    ],
  },
  {
    number: 4,
    title: "Delivered Saturday",
    description: "Your order arrives Saturday, within 24 hours of harvest. Store in your fridge and enjoy the freshest microgreens possible for 6-10 days.",
    details: [
      "Delivery within 24 hours of harvest",
      "Free delivery on orders over $25",
      "South Shore Montreal coverage",
    ],
  },
]

const storageSteps = [
  {
    icon: "📦",
    title: "Keep Sealed",
    description: "Leave microgreens in their original clamshell container until ready to use.",
  },
  {
    icon: "❄️",
    title: "Top Shelf",
    description: "Store on the top shelf of your refrigerator where it's coldest but won't freeze.",
  },
  {
    icon: "🌱",
    title: "Enjoy Fresh",
    description: "Best consumed within 6-10 days. No washing needed—they're plasma-cleaned!",
  },
]

export default function HowItWorksPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Jineau Works
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            From our farm to your table in 24 hours. Here's how we deliver the freshest microgreens on Montreal's South Shore.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/subscribe" size="lg">
              Start Subscription
            </Button>
            <Button href="/shop" variant="outline" size="lg">
              Browse Products
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`flex flex-col ${
                  index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-brand-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold">
                      {step.number}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        <svg className="w-5 h-5 text-brand-mint flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="aspect-square bg-gradient-to-br from-brand-mint/20 to-brand-mist/30 rounded-3xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {step.number === 1 && "🛒"}
                        {step.number === 2 && "📅"}
                        {step.number === 3 && "✂️"}
                        {step.number === 4 && "🚚"}
                      </div>
                      <MarmotMascot size="md" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="How to Store Your Greens"
            subtitle="Keep your microgreens fresh and delicious with these simple tips."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {storageSteps.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Free Replacement Guarantee"
            subtitle="We stand behind our freshness promise."
          />

          <div className="bg-brand-mist/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Didn't use all your greens this week?
                </h3>
                <p className="text-gray-600 mb-4">
                  Life happens. If you have unopened packs from your subscription that you didn't get to use, simply let us know before your next delivery. We'll replace them for free—no questions asked.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Available for subscription customers
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Notify us before Wednesday 11:59 PM
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Unused packs donated to local food banks
                  </li>
                </ul>
              </div>
              <div className="flex-shrink-0">
                <MarmotMascot size="xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Join hundreds of families on the South Shore enjoying the freshest microgreens every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/subscribe" variant="gold" size="lg">
              Start Subscription
            </Button>
            <Button href="/faq" variant="ghost" size="lg" className="text-white hover:bg-white/20">
              Read FAQ
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

