import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
import CTASection from "@/components/CTASection"
import { audiences } from "@/data/siteCopy"

export const metadata = {
  title: "Microgreens for Chefs & Restaurants",
  description: "Premium microgreens for culinary professionals. Consistent quality, extended shelf life, and hyper-local sourcing from Montreal's South Shore.",
}

const chefBenefits = [
  {
    title: "Consistent Quality",
    description: "Every delivery meets the same high standards. No surprises, no quality variations—just perfect greens week after week.",
    icon: "⭐",
  },
  {
    title: "Extended Shelf Life",
    description: "6-10 days of freshness means less waste and more flexibility in your menu planning.",
    icon: "📅",
  },
  {
    title: "No Prep Required",
    description: "Plasma-cleaned and ready to plate. Save time and labor costs with our ready-to-use microgreens.",
    icon: "⚡",
  },
  {
    title: "Hyper-Local Sourcing",
    description: "Harvested Friday, delivered Saturday. Tell your guests exactly where their greens came from.",
    icon: "📍",
  },
]

const culinaryUses = [
  {
    category: "Garnishes",
    examples: ["Elegant plate finishing", "Color contrast accents", "Height and texture"],
  },
  {
    category: "Flavor Accents",
    examples: ["Spicy radish on tacos", "Sweet pea on seafood", "Basil on Italian dishes"],
  },
  {
    category: "Salads & Bowls",
    examples: ["Base or mix-in", "Grain bowl toppings", "Side salad feature"],
  },
  {
    category: "Specialty Dishes",
    examples: ["Microgreen risotto", "Topped tartare", "Elevated sandwiches"],
  },
]

export default function ForChefsPage() {
  const chefAudience = audiences.chefs

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-brand-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {chefAudience.title}
          </h1>
          <p className="text-xl text-brand-mist mb-4">
            {chefAudience.tagline}
          </p>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {chefAudience.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/subscribe" variant="gold" size="lg">
              View Bulk Plans
            </Button>
            <Button href="mailto:chefs@jineau.ca" variant="ghost" size="lg" className="text-white border-white hover:bg-white/20">
              Contact for Custom Orders
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Chefs Choose Jineau"
            subtitle="Professional-grade microgreens for demanding kitchens."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {chefBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Culinary Applications"
            subtitle="Versatile microgreens for every style of cuisine."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culinaryUses.map((use, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg text-brand-primary mb-4">{use.category}</h3>
                <ul className="space-y-2">
                  {use.examples.map((example, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                      <svg className="w-4 h-4 text-brand-mint flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="The Chef's Plan"
            subtitle="Our 7-pack subscription delivers maximum value for busy kitchens."
          />

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-block bg-brand-gold text-gray-900 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Best Value
                </div>
                <h3 className="text-3xl font-bold mb-2">Weekly 7-Pack</h3>
                <p className="text-gray-300 mb-4">
                  Seven packs of premium microgreens delivered every Saturday. Perfect for restaurants with consistent garnish needs.
                </p>
                <div className="text-4xl font-bold text-brand-gold mb-2">
                  $39.99<span className="text-lg font-normal text-gray-400">/week</span>
                </div>
                <p className="text-sm text-gray-400 mb-6">Just $5.71 per pack—our lowest price</p>
                <Button href="/subscribe" variant="gold" size="lg">
                  Start Chef Subscription
                </Button>
              </div>
              <div className="flex-shrink-0">
                <div className="text-center">
                  <div className="text-6xl mb-2">🍽️</div>
                  <p className="text-sm text-gray-400">Perfect for<br />restaurant kitchens</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-brand-mist/20 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Need larger quantities?</h4>
            <p className="text-gray-600 mb-4">
              For restaurants needing more than 7 packs per week, we offer custom bulk arrangements with dedicated harvest slots and special pricing.
            </p>
            <a href="mailto:chefs@jineau.ca" className="text-brand-primary font-medium hover:underline">
              Contact us for custom orders →
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Featured Varieties for Chefs"
            subtitle="Our most popular microgreens for professional kitchens."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Radish", flavor: "Spicy, peppery", best: "Tacos, sushi, raw dishes", color: "Pink stems, green leaves" },
              { name: "Pea Shoots", flavor: "Sweet, fresh", best: "Seafood, spring dishes", color: "Bright green tendrils" },
              { name: "Mixed Blend", flavor: "Balanced, complex", best: "Universal garnish", color: "Multi-colored variety" },
            ].map((variety, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-16 h-16 bg-brand-mint/30 rounded-full flex items-center justify-center text-3xl mb-4">
                  🌱
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{variety.name}</h3>
                <dl className="space-y-2 text-sm">
                  <div>
                    <dt className="text-gray-500">Flavor</dt>
                    <dd className="text-gray-900">{variety.flavor}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Best for</dt>
                    <dd className="text-gray-900">{variety.best}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Appearance</dt>
                    <dd className="text-gray-900">{variety.color}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Elevate Your Plates"
        subtitle="Join South Shore restaurants serving the freshest local microgreens."
        primaryCta={{ href: "/subscribe", label: "Start Chef Subscription" }}
        secondaryCta={{ href: "/shop", label: "Browse All Varieties" }}
      />
    </>
  )
}

