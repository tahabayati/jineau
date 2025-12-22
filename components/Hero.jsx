"use client"

import { useEffect, useState, memo } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import Image from "next/image"

function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showMascot = false,
}) {
  const t = useTranslations("home")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Use setTimeout to batch state update after initial render
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col">
      {/* Decorative seedling illustrations - hidden on mobile */}
      {[
        { size: 100, top: '15%', left: '8%', opacity: 0.3 },
        { size: 80, top: '25%', left: '5%', opacity: 0.25 },
        { size: 90, top: '60%', left: '10%', opacity: 0.3 },
        { size: 95, top: '20%', right: '8%', opacity: 0.3 },
        { size: 85, top: '65%', right: '12%', opacity: 0.25 },
      ].map((seedling, index) => (
        <div
          key={index}
          className="absolute pointer-events-none hidden lg:block"
          style={{
            width: `${seedling.size}px`,
            height: `${seedling.size}px`,
            top: seedling.top,
            left: seedling.left,
            right: seedling.right,
            opacity: seedling.opacity,
            zIndex: 1,
          }}
          aria-hidden="true"
        >
          <Image 
            src="/jineau-home-images/1-07.svg" 
            alt="" 
            width={seedling.size} 
            height={seedling.size}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      ))}

      {/* Main content - flex grow to push stats down */}
      <div className="relative z-20 flex-1 flex items-center w-full px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            {/* Left side - Microgreens video */}
            <div className={`relative flex flex-col items-center lg:items-start order-2 lg:order-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">
                <div className="relative w-full pt-[100%] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden bg-black/40">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/Microgreens Timelapse compressed.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/jineau-home-images/1 (1).png"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Text content */}
            <div className="relative text-center lg:text-left order-1 lg:order-2">
              {/* Badge */}
              <div className={`inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/20 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full mb-3 sm:mb-5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2" aria-hidden="true">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-brand-mint"></span>
                </span>
                <span className="text-white/85 text-[10px] sm:text-xs font-medium tracking-wider uppercase">{t("farmFresh")}</span>
              </div>

              {/* Main heading */}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-5 leading-[1.1] tracking-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
                <span className="text-white">{t("heroWhere")} </span>
                <span className="gradient-text">{t("heroLife")}</span>
                <span className="text-white"> {t("heroMeets")} </span>
                <span className="gradient-text-gold">{t("heroWater")}</span>
                <span className="text-white/70 text-base sm:text-xl md:text-2xl lg:text-3xl font-medium mt-2 block">{t("heroTagline")}</span>
              </h1>

              {/* Subtitle */}
              <div className={`bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-5 max-w-xl mx-auto lg:mx-0 mb-4 sm:mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed">
                  {subtitle}
                </p>
              </div>

              {/* CTA buttons */}
              <div className={`flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center lg:justify-start ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className="group relative inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold text-sm sm:text-base rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(112,178,178,0.5)] hover:scale-105"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-brand-gold/80 to-brand-mint opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                    <span className="relative">{primaryCta.label}</span>
                    <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className="group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-4 bg-black/30 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm sm:text-base rounded-full transition-all duration-300 hover:bg-white/10"
                  >
                    <span>{secondaryCta.label}</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row - at bottom, in normal flow */}
      <div className={`relative z-20 w-full px-4 sm:px-6 pb-16 sm:pb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
        <div className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-10 md:gap-x-14 lg:gap-x-20 gap-y-4">
          <div className="text-center min-w-[70px] sm:min-w-[90px]">
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">{t("stat100")}</div>
            <div className="text-white/50 text-[9px] sm:text-[10px] md:text-xs tracking-[0.1em] uppercase">{t("statOrganic")}</div>
          </div>
          
          <div className="hidden sm:block w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" aria-hidden="true"></div>
          
          <div className="text-center min-w-[70px] sm:min-w-[90px]">
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">{t("statNonGMO")}</div>
            <div className="text-white/50 text-[9px] sm:text-[10px] md:text-xs tracking-[0.1em] uppercase">{t("statVerified")}</div>
          </div>
          
          <div className="hidden sm:block w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" aria-hidden="true"></div>
          
          <div className="text-center min-w-[70px] sm:min-w-[90px]">
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">{t("stat24h")}</div>
            <div className="text-white/50 text-[9px] sm:text-[10px] md:text-xs tracking-[0.1em] uppercase">{t("statHarvestToDoor")}</div>
          </div>
          
          <div className="hidden sm:block w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" aria-hidden="true"></div>
          
          <div className="text-center min-w-[70px] sm:min-w-[90px]">
            <div className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">{t("stat40x")}</div>
            <div className="text-white/50 text-[9px] sm:text-[10px] md:text-xs tracking-[0.1em] uppercase">
              <Link href="/faq" className="hover:text-brand-mint transition-colors">{t("statMoreNutrients")}</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1" aria-hidden="true">
        <span className="text-white/30 text-[8px] sm:text-[9px] tracking-[0.15em] uppercase font-medium">{t("scroll")}</span>
        <div className="w-4 h-5 sm:w-5 sm:h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-0.5 h-1 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)
