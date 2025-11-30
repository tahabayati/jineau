import Button from "./Button"

export default function CTASection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  variant = "primary",
}) {
  const variants = {
    primary: "bg-gradient-to-r from-brand-primary to-brand-secondary text-white",
    mint: "bg-gradient-to-r from-brand-mint to-brand-mist text-gray-900",
    gold: "bg-brand-gold text-gray-900",
  }

  const buttonVariant = variant === "primary" ? "gold" : "primary"

  return (
    <section className={`${variants[variant]} py-16 md:py-24`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className={`text-lg mb-8 ${variant === "primary" ? "text-white/90" : "text-gray-700"}`}>
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryCta && (
            <Button href={primaryCta.href} variant={buttonVariant} size="lg">
              {primaryCta.label}
            </Button>
          )}
          {secondaryCta && (
            <Button
              href={secondaryCta.href}
              variant={variant === "primary" ? "ghost" : "outline"}
              size="lg"
              className={variant === "primary" ? "text-white hover:bg-white/20" : ""}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

