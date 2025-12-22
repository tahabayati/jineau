import Image from "next/image"
import Button from "./Button"
import MarmotMascot from "./MarmotMascot"

export default function CTASection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showMascot = true,
}) {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        {showMascot && (
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <MarmotMascot size="lg" />
            </div>
          </div>
        )}

        {/* Microgreens feature visual moved from Hero */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
            {/* SVG background layer */}
            <div
              className="absolute -bottom-4 sm:-bottom-8 left-1/2 -translate-x-1/2 w-[105%] z-0"
              aria-hidden="true"
            >
              <Image
                src="/jineau-home-images/1-02.svg"
                alt=""
                width={400}
                height={200}
                className="w-full h-auto opacity-70"
                loading="lazy"
              />
            </div>

            {/* Main microgreens bowl image */}
            <div className="relative z-10">
              <Image
                src="/jineau-home-images/1 (1).png"
                alt="Fresh bowl of colorful microgreens including sunflower, radish, and pea shoots ready to eat"
                width={600}
                height={600}
                className="w-full h-auto rounded-2xl sm:rounded-3xl shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>

        {subtitle && (
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryCta && (
            <Button href={primaryCta.href} variant="gold" size="lg">
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              variant="ghost"
              size="lg"
              className="text-white border-white/30 hover:bg-white/10"
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
