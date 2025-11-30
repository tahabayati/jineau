import SectionTitle from "@/components/SectionTitle"
import MarmotMascot from "@/components/MarmotMascot"
import CTASection from "@/components/CTASection"
import { brandStory, differentiators, taglines } from "@/data/siteCopy"

export const metadata = {
  title: "About Jineau",
  description: "Learn about Jineau, the Water of Life. We combine Kurdish-Persian herbal wisdom with modern science to grow the freshest microgreens in Montreal's South Shore.",
}

export default function AboutPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MarmotMascot size="xl" className="mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {brandStory.nameOrigin.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {brandStory.nameOrigin.description}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-24 h-24 bg-brand-mist/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-brand-primary">Jin</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Life</h3>
              <p className="text-gray-600">From Kurdish, representing the vitality and life force in every green we grow.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-brand-mist/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-brand-primary">Eau</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Water</h3>
              <p className="text-gray-600">From French, the essential element that nourishes all life and our greens.</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-white">Jineau</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-2">Water of Life</h3>
              <p className="text-gray-600">Our philosophy of bringing vital, nourishing greens to your table.</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              {brandStory.mission}
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {brandStory.values.map((value) => (
                <div key={value} className="flex items-center gap-3 bg-brand-mist/20 rounded-lg p-4">
                  <svg className="w-6 h-6 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="What Makes Us Different"
            subtitle="We combine ancient wisdom with modern technology to grow the cleanest greens possible."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((diff, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-brand-mist/30 rounded-xl flex items-center justify-center text-brand-primary mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{diff.title}</h3>
                <p className="text-gray-600 text-sm">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="text-gray-600 space-y-4 text-lg leading-relaxed">
            <p>
              Jineau was born from a simple observation: the freshest, most nutritious greens should be accessible to everyone, not just those with the time and space to grow their own.
            </p>
            <p>
              We started with a passion for urban farming and a deep respect for traditional Kurdish and Persian herbal wisdom. Our ancestors understood the power of fresh herbs and greens—we're simply bringing that wisdom into the modern age with technology that ensures purity without chemicals.
            </p>
            <p>
              Today, from our facility on Montreal's South Shore, we grow microgreens in a controlled environment with triple-filtered air and water, using cold-plasma technology to ensure every pack is clean and ready to eat. No washing required, no waste produced—just pure, living nutrition delivered to your door.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Taste the Difference?"
        subtitle="Join hundreds of families on the South Shore who've made Jineau part of their weekly routine."
        primaryCta={{ href: "/subscribe", label: "Start Your Subscription" }}
        secondaryCta={{ href: "/shop", label: "Browse Products" }}
      />
    </>
  )
}

