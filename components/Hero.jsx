"use client"

import { useEffect, useState } from "react"
import { Link } from "@/i18n/routing"
import Image from "next/image"

export default function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  showMascot = false,
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    let rafId = null
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth) * 100
      targetY = (e.clientY / window.innerHeight) * 100
    }

    const animate = () => {
      // Smooth interpolation for parallax effect
      currentX += (targetX - currentX) * 0.05
      currentY += (targetY - currentY) * 0.05
      
      setMousePosition({ x: currentX, y: currentY })
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    rafId = requestAnimationFrame(animate)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Decorative seedling illustrations */}
      {[
        { size: 100, top: '15%', left: '8%', opacity: 0.3 },
        { size: 80, top: '25%', left: '5%', opacity: 0.25 },
        { size: 90, top: '60%', left: '10%', opacity: 0.3 },
        { size: 95, top: '20%', right: '8%', opacity: 0.3 },
        { size: 85, top: '65%', right: '12%', opacity: 0.25 },
      ].map((seedling, index) => (
        <div
          key={index}
          className="absolute pointer-events-none"
          style={{
            width: `${seedling.size}px`,
            height: `${seedling.size}px`,
            top: seedling.top,
            left: seedling.left,
            right: seedling.right,
            opacity: seedling.opacity,
            zIndex: 1,
          }}
        >
          <Image 
            src="/jineau-home-images/1-07.svg" 
            alt="" 
            width={seedling.size} 
            height={seedling.size}
            className="w-full h-full"
          />
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Microgreens image with SVG below */}
          <div className={`relative flex flex-col items-center lg:items-start ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            {/* Main microgreens bowl image */}
            <div className="relative mb-6">
              <Image 
                src="/jineau-home-images/1 (1).png" 
                alt="Fresh microgreens" 
                width={600} 
                height={600}
                className="w-full h-auto rounded-3xl shadow-2xl"
                priority
              />
            </div>
            
            {/* SVG below the image */}
            <div className="relative w-full max-w-md">
              <Image 
                src="/jineau-home-images/1-02.svg" 
                alt="" 
                width={400} 
                height={200}
                className="w-full h-auto"
              />
            </div>
          </div>

           {/* Right side - Text content */}
           <div className="relative text-center lg:text-left">
            {/* Badge */}
            <div className={`inline-flex items-center gap-3 bg-black/30 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-mint"></span>
              </span>
              <span className="text-white/85 text-sm font-medium tracking-widest uppercase">Farm Fresh • Delivered Weekly</span>
            </div>

            {/* Main heading with gradient */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <span className="text-white">Where </span>
              <span className="gradient-text">Life</span>
              <span className="text-white"> Meets </span>
              <span className="gradient-text-gold">Water</span>
              <br />
              <span className="text-white/70 text-2xl md:text-3xl lg:text-4xl font-medium mt-4 block">Fresh Microgreens, Pure Living</span>
            </h1>

            {/* Subtitle with glass surface */}
            <div className={`bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-xl mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
              <p className="text-base md:text-lg text-white/85 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* CTA buttons */}
            <div className={`flex flex-col sm:flex-row gap-5 mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
              {primaryCta && (
                <Link
                  href={primaryCta.href}
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.6)] hover:scale-105"
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
                  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-black/30 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30"
                >
                  <span>{secondaryCta.label}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              )}
            </div>

            {/* Stats row */}
            <div className={`flex flex-wrap gap-8 md:gap-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '1.2s' }}>
              {[
                { value: "100%", label: "Organic" },
                { value: "24h", label: "Harvest to Door" },
                { value: "40x", label: "More Nutrients" },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-default">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 group-hover:scale-110 transition-transform duration-500">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


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
