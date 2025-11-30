import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
import CTASection from "@/components/CTASection"
import { audiences } from "@/data/siteCopy"

export const metadata = {
  title: "Hydrosols for Wellness Practitioners",
  description: "Pure botanical hydrosols for holistic wellness practices. 100% plant-based, no synthetic additives, distilled from fresh microgreens.",
}

const wellnessBenefits = [
  {
    title: "100% Plant-Based",
    description: "Our hydrosols are pure plant waters with no synthetic additives, preservatives, or artificial fragrances.",
    icon: "🌿",
  },
  {
    title: "Gentle & Versatile",
    description: "Suitable for facial mists, room sprays, linen fresheners, and integration into holistic wellness routines.",
    icon: "💆",
  },
  {
    title: "Zero Waste Origin",
    description: "Distilled from surplus microgreens, our hydrosols represent our commitment to zero-waste production.",
    icon: "♻️",
  },
  {
    title: "Artisanal Quality",
    description: "Small-batch production ensures consistent quality and aromatic integrity in every bottle.",
    icon: "✨",
  },
]

const hydrosolUses = [
  {
    title: "Facial Mist",
    description: "Spritz throughout the day for a refreshing, aromatic boost. Gentle enough for all skin types.",
    icon: "💧",
  },
  {
    title: "Room Atmosphere",
    description: "Create a calming environment for meditation, yoga, or relaxation practices.",
    icon: "🧘",
  },
  {
    title: "Linen Spray",
    description: "Freshen pillows, sheets, and towels with natural botanical aromas.",
    icon: "🛏️",
  },
  {
    title: "Wellness Rituals",
    description: "Incorporate into massage, energy work, or other holistic practices.",
    icon: "🌸",
  },
]

export default function ForWellnessPage() {
  const wellnessAudience = audiences.wellness

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/20 to-brand-mint/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {wellnessAudience.title}
          </h1>
          <p className="text-xl text-brand-secondary mb-4">
            {wellnessAudience.tagline}
          </p>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            {wellnessAudience.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/shop?category=hydrosols" size="lg">
              Shop Hydrosols
            </Button>
            <Button href="/shop?category=microgreens" variant="outline" size="lg">
              Browse Microgreens
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Practitioners Choose Jineau"
            subtitle="Pure, plant-based aromatics for holistic wellness."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wellnessBenefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="text-5xl mb-4">{benefit.icon}</div>
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
            title="How to Use Hydrosols"
            subtitle="Versatile applications for wellness and self-care."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hydrosolUses.map((use, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                <div className="text-4xl flex-shrink-0">{use.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">{use.title}</h3>
                  <p className="text-gray-600 text-sm">{use.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Our Hydrosol Collection"
            subtitle="Artisanal botanical waters distilled from fresh microgreens."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Basil Hydrosol",
                aroma: "Herbaceous, calming",
                best: "Relaxation, facial mist",
                price: 14.99,
              },
              {
                name: "Mint Hydrosol",
                aroma: "Fresh, invigorating",
                best: "Energy, cooling mist",
                price: 14.99,
              },
              {
                name: "Mixed Herb Hydrosol",
                aroma: "Complex, balanced",
                best: "Meditation, room spray",
                price: 16.99,
              },
            ].map((hydrosol, index) => (
              <div key={index} className="bg-gradient-to-br from-brand-mist/20 to-brand-mint/20 rounded-2xl p-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-sm">
                  💧
                </div>
                <h3 className="font-bold text-lg text-gray-900 text-center mb-4">{hydrosol.name}</h3>
                <dl className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Aroma</dt>
                    <dd className="text-gray-900 text-right">{hydrosol.aroma}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Best for</dt>
                    <dd className="text-gray-900 text-right">{hydrosol.best}</dd>
                  </div>
                </dl>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-brand-primary">${hydrosol.price}</span>
                    <Button href="/shop?category=hydrosols" size="sm" variant="secondary">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-200">
            <h3 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Important Information
            </h3>
            <div className="text-amber-700 space-y-3">
              <p>
                <strong>For external use only.</strong> Our hydrosols are not intended for internal consumption.
              </p>
              <p>
                <strong>No medical claims.</strong> While hydrosols have been used traditionally for various purposes, we make no claims about treating, curing, or preventing any medical conditions.
              </p>
              <p>
                <strong>Patch test recommended.</strong> If you have sensitive skin or allergies, we recommend testing a small area before broader application.
              </p>
              <p>
                <strong>Store properly.</strong> Keep in a cool, dark place to maintain aromatic quality. Best used within 6 months of opening.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Microgreens for Nutrition"
            subtitle="Don't forget the nutritional powerhouse of fresh microgreens."
          />

          <div className="bg-brand-mist/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Complete Your Wellness Routine
                </h3>
                <p className="text-gray-600 mb-4">
                  Pair our hydrosols with nutrient-dense microgreens for a complete plant-based wellness approach. Microgreens contain up to 40x more vitamins than mature vegetables.
                </p>
                <ul className="space-y-2 mb-6">
                  {["High in antioxidants", "Rich in vitamins A, C, K", "Excellent source of minerals", "Easy to incorporate into any diet"].map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button href="/shop?category=microgreens">
                  Browse Microgreens
                </Button>
              </div>
              <div className="flex-shrink-0">
                <div className="w-48 h-48 bg-brand-mint/30 rounded-full flex items-center justify-center text-7xl">
                  🌱
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Embrace Plant-Based Wellness"
        subtitle="Discover the gentle power of botanical hydrosols and nutrient-rich microgreens."
        primaryCta={{ href: "/shop?category=hydrosols", label: "Shop Hydrosols" }}
        secondaryCta={{ href: "/shop", label: "Browse All Products" }}
        variant="mint"
      />
    </>
  )
}

