"use client"

import { useEffect, useState } from "react"
import { Link } from "@/i18n/routing"

// Seedling icon component
const SeedlingIcon = () => (
  <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c0-4.5 4-8 8-8-1 4.5-4 8-8 8z" fill="rgba(112, 178, 178, 0.2)" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c0-4.5-4-8-8-8 1 4.5 4 8 8 8z" fill="rgba(158, 207, 212, 0.2)" />
  </svg>
)

export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showMascot = false,
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Animated gradient background - Dark Blue Green */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#70B2B2] to-[#016B61]">
        {/* Large morphing orbs - smoother animations */}
        <div 
          className="absolute w-[900px] h-[900px] bg-gradient-to-br from-brand-primary/20 to-brand-mint/10 rounded-full blur-[150px] animate-breathe"
          style={{ 
            top: '5%', 
            left: '-15%',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
          }}
        />
        <div 
          className="absolute w-[700px] h-[700px] bg-gradient-to-br from-brand-blue/15 to-brand-mist/8 rounded-full blur-[130px] animate-breathe"
          style={{ 
            bottom: '-5%', 
            right: '-10%',
            animationDelay: '-4s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] bg-gradient-to-br from-brand-gold/10 to-brand-mint/5 rounded-full blur-[100px] animate-breathe"
          style={{ 
            top: '40%', 
            left: '40%',
            animationDelay: '-2s',
            transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        
        {/* Floating particles - smaller and subtler */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              background: i % 3 === 0 ? 'rgba(112, 178, 178, 0.4)' : i % 3 === 1 ? 'rgba(233, 196, 106, 0.3)' : 'rgba(110, 140, 251, 0.3)',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${8 + Math.random() * 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}

        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(112, 178, 178, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(112, 178, 178, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        
        {/* Aurora effect layer */}
        <div className="absolute inset-0 aurora opacity-30" />
      </div>

      {/* Floating glass cards - decorative */}
      <div className="absolute top-24 left-12 w-28 h-28 glass-card rounded-3xl rotate-12 animate-float opacity-40 hidden lg:block" />
      <div className="absolute top-48 right-24 w-20 h-20 glass-card rounded-2xl -rotate-6 animate-float opacity-30 hidden lg:block" style={{ animationDelay: '-3s' }} />
      <div className="absolute bottom-40 left-24 w-16 h-16 glass-card rounded-xl rotate-45 animate-float opacity-25 hidden lg:block" style={{ animationDelay: '-5s' }} />
      <div className="absolute bottom-24 right-40 w-24 h-24 glass-card rounded-3xl -rotate-12 animate-float opacity-35 hidden lg:block" style={{ animationDelay: '-2s' }} />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          {/* Decorative icon element */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              {/* Outer glowing ring */}
              <div className="absolute -inset-6 bg-gradient-to-r from-brand-mint/40 via-brand-gold/30 to-brand-blue/40 rounded-full blur-3xl opacity-60 animate-pulse-glow" />
              
              {/* Main icon container */}
              <div className="relative glass-strong w-32 h-32 rounded-full flex items-center justify-center">
                <div className="absolute inset-2 bg-gradient-to-br from-brand-mint/20 to-brand-primary/20 rounded-full" />
                <div className="relative text-brand-mint">
                  <SeedlingIcon />
                </div>
              </div>
              
              {/* Orbiting elements - smoother */}
              <div className="absolute -inset-10 animate-rotate-slow">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-brand-gold to-amber-400 rounded-full shadow-[0_0_20px_rgba(233,196,106,0.6)]" />
              </div>
              <div className="absolute -inset-16 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full shadow-[0_0_15px_rgba(112,178,178,0.5)]" />
              </div>
              <div className="absolute -inset-6 animate-rotate-slow" style={{ animationDuration: '50s' }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gradient-to-br from-brand-blue to-brand-mist rounded-full shadow-[0_0_12px_rgba(110,140,251,0.5)]" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full mb-10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-mint"></span>
            </span>
            <span className="text-white/70 text-sm font-medium tracking-widest uppercase">Farm Fresh • Delivered Weekly</span>
          </div>

          {/* Main heading with gradient */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-10 leading-[1.05] tracking-tight">
            <span className="text-white">Where </span>
            <span className="gradient-text">Life</span>
            <span className="text-white"> Meets </span>
            <span className="gradient-text-gold">Water</span>
            <br />
            <span className="text-white/70 text-3xl md:text-4xl lg:text-5xl font-medium mt-4 block">Fresh Microgreens, Pure Living</span>
          </h1>

          {/* Subtitle with glass background */}
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto mb-12">
            <p className="text-lg md:text-xl text-white/70 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-20">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(112,178,178,0.5)] hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-brand-gold/80 to-brand-mint opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">{primaryCta.label}</span>
                <svg className="relative w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-semibold rounded-full transition-all duration-500 hover:bg-white/10 hover:scale-105"
              >
                <span>{secondaryCta.label}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            )}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-10 md:gap-20">
            {[
              { value: "100%", label: "Organic" },
              { value: "24h", label: "Harvest to Door" },
              { value: "40x", label: "More Nutrients" },
            ].map((stat, index) => (
              <div key={index} className="text-center group cursor-default">
                <div className="text-3xl md:text-5xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#016B61] via-[#016B61]/90 to-transparent pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-white/30 text-[10px] tracking-[0.25em] uppercase font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-1.5 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
