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
