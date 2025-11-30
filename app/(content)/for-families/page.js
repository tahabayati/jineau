import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
import MarmotMascot from "@/components/MarmotMascot"
import CTASection from "@/components/CTASection"
import { audiences } from "@/data/siteCopy"

export const metadata = {
  title: "Microgreens for Families & Kids",
  description: "Make healthy eating fun for the whole family. Our plasma-cleaned microgreens are safe, nutritious, and perfect for lunchboxes and family meals.",
}

const familyBenefits = [
  {
    title: "Ready-to-Eat Safety",
    description: "Our cold-plasma cleaning means no washing required. Open, serve, enjoy—safe and convenient for busy parents.",
    icon: "✅",
  },
  {
    title: "Nutrient Powerhouse",
    description: "Microgreens pack up to 40x more vitamins and minerals than mature vegetables. A little goes a long way for growing kids.",
    icon: "💪",
  },
  {
    title: "Lunchbox Perfect",
    description: "Small, mess-free, and delicious. Add to sandwiches, wraps, or enjoy as a crunchy snack.",
    icon: "🎒",
  },
  {
    title: "Picky Eater Approved",
    description: "Mild, tender greens that even veggie-skeptical kids enjoy. Start with sweet pea shoots or nutty sunflower.",
    icon: "👦",
  },
]

const lunchboxIdeas = [
  "Sandwich topper with cream cheese",
  "Mixed into pasta salad",
  "Wrapped in a tortilla with hummus",
  "Topped on homemade pizza",
  "Blended into smoothies (they won't even notice!)",
  "As a colorful side with dip",
]

export default function ForFamiliesPage() {
  const familyAudience = audiences.families

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {familyAudience.title}
              </h1>
              <p className="text-xl text-brand-secondary mb-4">
                {familyAudience.tagline}
              </p>
              <p className="text-gray-600 mb-8">
                {familyAudience.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button href="/subscribe" size="lg">
                  Start Family Subscription
                </Button>
                <Button href="/shop" variant="outline" size="lg">
                  Browse Products
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-brand-mint/20 rounded-full flex items-center justify-center">
                <MarmotMascot size="xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Families Love Jineau"
            subtitle="Safe, nutritious, and convenient—everything busy parents need."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {familyBenefits.map((benefit, index) => (
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Lunchbox Ideas"
            subtitle="Creative ways to add microgreens to your child's meals."
          />

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-start gap-6">
              <MarmotMascot size="lg" className="flex-shrink-0 hidden md:block" />
              <div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lunchboxIdeas.map((idea, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-sm font-bold text-gray-900">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{idea}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-mist/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Meet Our Marmot Mascot! 🐿️
            </h2>
            <p className="text-gray-600 text-center mb-6">
              Kids love our friendly marmot who reminds them that eating greens is fun! 
              Look for our marmot on special recipe cards and fun facts included with every family subscription.
            </p>
            <div className="flex justify-center">
              <MarmotMascot size="xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="The Family Plan"
            subtitle="Our 5-pack subscription is perfect for families."
          />

          <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-brand-primary">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-block bg-brand-gold text-gray-900 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  Recommended for Families
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">Weekly 5-Pack</h3>
                <p className="text-gray-600 mb-4">
                  Five packs of fresh microgreens delivered every Saturday. Mix and match varieties to keep things interesting.
                </p>
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  $29.99<span className="text-lg font-normal text-gray-500">/week</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">Just $6.00 per pack</p>
                <Button href="/subscribe" size="lg" className="w-full md:w-auto">
                  Start Family Subscription
                </Button>
              </div>
              <div className="flex-shrink-0">
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-16 h-16 bg-brand-mint/30 rounded-lg flex items-center justify-center text-2xl">
                      🌱
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Make Healthy Eating Easy"
        subtitle="Join hundreds of families on the South Shore who've discovered the joy of fresh microgreens."
        primaryCta={{ href: "/subscribe", label: "Start Family Subscription" }}
        secondaryCta={{ href: "/how-it-works", label: "Learn How It Works" }}
      />
    </>
  )
}

