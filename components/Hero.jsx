"use client"

import { Link } from "@/i18n/routing"
import Button from "./Button"
import MarmotMascot from "./MarmotMascot"

export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showMascot = false,
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary/5 via-brand-mist/20 to-brand-mint/30">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-mint/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-mist/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-gold/20 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand-primary/10 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {showMascot && (
            <div className="flex justify-center mb-8">
              <div className="relative">
                <MarmotMascot size="lg" className="animate-bounce" />
                <div className="absolute -inset-4 bg-brand-gold/20 rounded-full blur-xl -z-10" />
              </div>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && (
              <Button href={primaryCta.href} size="lg">
                {primaryCta.label}
              </Button>
            )}
            {secondaryCta && (
              <Button href={secondaryCta.href} variant="outline" size="lg">
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
