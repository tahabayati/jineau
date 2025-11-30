import Hero from "@/components/Hero"
import SectionTitle from "@/components/SectionTitle"
import FeatureList from "@/components/FeatureList"
import TestimonialList from "@/components/TestimonialList"
import CTASection from "@/components/CTASection"
import Button from "@/components/Button"
import MarmotMascot from "@/components/MarmotMascot"
import {
  taglines,
  brandStory,
  differentiators,
  testimonials,
  audiences,
  subscription,
} from "@/data/siteCopy"

const elementIcons = [
  { name: "Water", symbol: "💧", description: "Pure filtered water" },
  { name: "Air", symbol: "🌬️", description: "Triple-filtered air" },
  { name: "Earth", symbol: "🌱", description: "Organic growing medium" },
  { name: "Light", symbol: "☀️", description: "Optimized spectrum" },
]

export default function Home() {
  return (
    <>
      <Hero
        title={taglines.hero}
        subtitle={brandStory.mission}
        primaryCta={{ href: "/subscribe", label: "Start Subscription" }}
        secondaryCta={{ href: "/how-it-works", label: "Learn How It Works" }}
        showMascot={true}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={brandStory.nameOrigin.title}
            subtitle={brandStory.nameOrigin.description}
          />

          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-brand-mist/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-4xl font-bold text-brand-primary">
                    {brandStory.nameOrigin.jin.word}
                  </span>
                </div>
                <p className="font-semibold text-gray-900">{brandStory.nameOrigin.jin.meaning}</p>
                <p className="text-sm text-gray-500">{brandStory.nameOrigin.jin.language}</p>
              </div>

              <div className="text-4xl text-brand-gold">+</div>

              <div className="text-center">
                <div className="w-24 h-24 bg-brand-mist/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-4xl font-bold text-brand-primary">
                    {brandStory.nameOrigin.eau.word}
                  </span>
                </div>
                <p className="font-semibold text-gray-900">{brandStory.nameOrigin.eau.meaning}</p>
                <p className="text-sm text-gray-500">{brandStory.nameOrigin.eau.language}</p>
              </div>

              <div className="text-4xl text-brand-gold">=</div>

              <div className="text-center">
                <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-lg font-bold">Jineau</span>
                </div>
                <p className="font-semibold text-gray-900">Water of Life</p>
                <p className="text-sm text-gray-500">Our Philosophy</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {elementIcons.map((element) => (
                <div
                  key={element.name}
                  className="bg-gray-50 rounded-xl p-4 text-center"
                >
                  <div className="text-3xl mb-2">{element.symbol}</div>
                  <p className="font-medium text-gray-900">{element.name}</p>
                  <p className="text-xs text-gray-500">{element.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Why Jineau?"
            subtitle="We combine ancient herbal wisdom with modern technology to grow the freshest, cleanest microgreens possible."
          />
          <FeatureList features={differentiators} columns={3} />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title={subscription.title}
            subtitle={subscription.description}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {subscription.plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl p-8 border-2 transition-all ${
                  index === 1
                    ? "border-brand-primary shadow-lg scale-105"
                    : "border-gray-200 hover:border-brand-secondary"
                }`}
              >
                {index === 1 && (
                  <div className="bg-brand-gold text-gray-900 text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="text-4xl font-bold text-brand-primary mb-1">
                  {plan.packs} packs
                </div>
                <p className="text-gray-500 mb-6">per week</p>
                <Button
                  href="/subscribe"
                  variant={index === 1 ? "primary" : "secondary"}
                  className="w-full"
                >
                  Choose {plan.name}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {subscription.benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 bg-brand-mist/20 px-4 py-2 rounded-full"
              >
                <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Who We Grow For"
            subtitle="Fresh microgreens for every lifestyle and need."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(audiences).map((audience) => (
              <div
                key={audience.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-2">{audience.title}</h3>
                <p className="text-sm text-brand-secondary mb-4">{audience.tagline}</p>
                <p className="text-gray-600 text-sm mb-4">{audience.description}</p>
                <ul className="space-y-2">
                  {audience.benefits.slice(0, 3).map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-brand-mint flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What Our Customers Say"
            subtitle="Join hundreds of happy families and health enthusiasts on the South Shore."
          />
          <TestimonialList testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionTitle
              title="From Our Journal"
              subtitle="Tips, recipes, and stories from the farm."
              className="mb-0"
            />
            <Button href="/blog" variant="outline">
              View All Posts
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "How to Use Microgreens Daily",
                excerpt: "Simple ways to add nutrient-dense microgreens to every meal.",
                slug: "how-to-use-microgreens-daily",
              },
              {
                title: "5 Fast Recipes Under 5 Minutes",
                excerpt: "Quick and delicious recipes featuring our fresh microgreens.",
                slug: "5-fast-recipes-under-5-minutes",
              },
              {
                title: "Behind the Scenes: Plasma-Clean Farming",
                excerpt: "Learn how cold-plasma technology keeps your greens safe without chemicals.",
                slug: "plasma-clean-farming",
              },
            ].map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-mint to-brand-mist flex items-center justify-center">
                  <MarmotMascot size="md" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-primary transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Transform Your Meals?"
        subtitle="Start your weekly microgreens subscription today and taste the difference of truly fresh greens."
        primaryCta={{ href: "/subscribe", label: "Start Subscription" }}
        secondaryCta={{ href: "/shop", label: "Browse Products" }}
      />
    </>
  )
}
