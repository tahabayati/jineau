/**
 * Reusable Page Section Components
 * 
 * These components follow the Jineau design system and can be used
 * across different pages for consistent design.
 * 
 * Usage:
 * import { StandardSection, FeaturesSection, CTASection } from '@/components/PageSections'
 */

import { Link } from "@/i18n/routing"

// Badge color mapping for Tailwind classes
const badgeColorClasses = {
  "brand-mint": "text-brand-mint",
  "brand-gold": "text-brand-gold",
  "brand-mist": "text-brand-mist",
  "brand-blue": "text-brand-blue",
  "brand-primary": "text-brand-primary",
}

/**
 * Standard Section Wrapper
 * Use this as a base for any content section
 */
export function StandardSection({ 
  children, 
  badge, 
  title, 
  subtitle,
  badgeColor = "brand-mint",
  className = "" 
}) {
  const badgeColorClass = badgeColorClasses[badgeColor] || badgeColorClasses["brand-mint"]
  
  return (
    <section className={`relative py-32 overflow-hidden ${className}`}>
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-mint/15 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-brand-gold/10 to-transparent rounded-full blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        {(badge || title || subtitle) && (
          <div className="text-center mb-16">
            {badge && (
              <span className={`inline-block glass px-5 py-2.5 rounded-full ${badgeColorClass} text-sm font-medium mb-6 tracking-wide`}>
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Section content */}
        {children}
      </div>
    </section>
  )
}

/**
 * Features Grid Section
 * Displays features in a responsive grid
 */
export function FeaturesSection({ 
  badge, 
  title, 
  subtitle,
  features = [],
  badgeColor = "brand-gold"
}) {
  const badgeColorClass = badgeColorClasses[badgeColor] || badgeColorClasses["brand-gold"]
  
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[700px] h-[700px] bg-gradient-to-r from-brand-primary/12 to-transparent rounded-full blur-[150px] -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {badge && (
            <span className={`inline-block glass px-5 py-2.5 rounded-full ${badgeColorClass} text-sm font-medium mb-6 tracking-wide`}>
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="glass-card rounded-3xl p-8 group">
              {feature.icon && (
                <div className="w-14 h-14 mb-6 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-2xl flex items-center justify-center icon-container text-brand-mint border border-white/10">
                  {feature.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-mint transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Card Grid Section
 * Displays cards in a responsive grid (2-4 columns)
 */
export function CardGridSection({ 
  badge, 
  title, 
  subtitle,
  cards = [],
  columns = 4,
  badgeColor = "brand-mist"
}) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
  }
  const badgeColorClass = badgeColorClasses[badgeColor] || badgeColorClasses["brand-mist"]

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-brand-primary/8 to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {badge && (
            <span className={`inline-block glass px-5 py-2.5 rounded-full ${badgeColorClass} text-sm font-medium mb-6 tracking-wide`}>
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid ${gridCols[columns] || gridCols[4]} gap-6`}>
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href || "#"}
              className="glass-card rounded-3xl p-8 text-center group"
            >
              {card.icon && (
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${card.gradient || "from-brand-mint to-brand-primary"} rounded-3xl flex items-center justify-center icon-container text-white shadow-xl`}>
                  {card.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-brand-mint transition-colors duration-300">
                {card.title}
              </h3>
              {card.tagline && (
                <p className="text-white/40">{card.tagline}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Testimonials Section
 */
export function TestimonialsSection({ 
  badge = "Testimonials", 
  title, 
  subtitle,
  testimonials = [],
  badgeColor = "brand-gold"
}) {
  const badgeColorClass = badgeColorClasses[badgeColor] || badgeColorClasses["brand-gold"]
  
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-brand-gold/10 to-transparent rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {badge && (
            <span className={`inline-block glass px-5 py-2.5 rounded-full ${badgeColorClass} text-sm font-medium mb-6 tracking-wide`}>
              {badge}
            </span>
          )}
          {title && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 mb-8 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-white font-semibold">{testimonial.author}</p>
                  {testimonial.location && (
                    <p className="text-white/40 text-sm">{testimonial.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Final CTA Section
 * Use at the end of pages to drive conversions
 */
export function FinalCTASection({ 
  title, 
  subtitle,
  primaryCta = { href: "/subscribe", label: "Start Subscription" },
  secondaryCta = { href: "/shop", label: "Shop Microgreens" }
}) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/15 via-brand-mint/8 to-brand-blue/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-brand-mint/10 to-transparent rounded-full blur-[200px] animate-breathe" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-strong rounded-[48px] p-12 md:p-20">
          {title && (
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105"
              >
                {primaryCta.label}
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-semibold rounded-full transition-all duration-500 hover:bg-white/10 hover:scale-105"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Two Column Content Section
 * For side-by-side content (text + image, or two text blocks)
 */
export function TwoColumnSection({ 
  badge, 
  title, 
  subtitle,
  leftContent,
  rightContent,
  reverse = false,
  badgeColor = "brand-mint"
}) {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-mint/15 to-transparent rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(badge || title || subtitle) && (
          <div className="text-center mb-16">
            {badge && (
              <span className={`inline-block glass px-5 py-2.5 rounded-full ${badgeColorClasses[badgeColor] || badgeColorClasses["brand-mint"]} text-sm font-medium mb-6 tracking-wide`}>
                {badge}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}>
          <div className={reverse ? 'lg:order-2' : ''}>
            {leftContent}
          </div>
          <div className={reverse ? 'lg:order-1' : ''}>
            {rightContent}
          </div>
        </div>
      </div>
    </section>
  )
}

