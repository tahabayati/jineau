"use client"

import { useState, useEffect } from "react"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import Image from "next/image"

// Decorative leaf icon for product type
const LeafIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
  </svg>
)

// Decorative droplet icon for hydrosol
const DropletIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12,2C6.5,2 2,6.5 2,12C2,17.5 6.5,22 12,22C17.5,22 22,17.5 22,12C22,6.5 17.5,2 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6Z" />
  </svg>
)

// Product card with unique home page aesthetic
function FeaturedProductCard({ product, index }) {
  const t = useTranslations("product")
  const tProducts = useTranslations("products")
  const [isHovered, setIsHovered] = useState(false)
  
  const gradients = [
    "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    "from-amber-500/20 via-yellow-500/20 to-lime-500/20", 
    "from-rose-500/20 via-pink-500/20 to-fuchsia-500/20",
    "from-violet-500/20 via-purple-500/20 to-indigo-500/20",
  ]

  const glowColors = [
    "group-hover:shadow-[0_0_50px_rgba(16,185,129,0.3)]",
    "group-hover:shadow-[0_0_50px_rgba(245,158,11,0.3)]",
    "group-hover:shadow-[0_0_50px_rgba(244,63,94,0.3)]",
    "group-hover:shadow-[0_0_50px_rgba(139,92,246,0.3)]",
  ]

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${gradients[index % 4]} backdrop-blur-xl border border-white/10 transition-all duration-500 ${glowColors[index % 4]} hover:border-white/25 hover:-translate-y-2 h-full flex flex-col`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        {/* Product visual area */}
        <div className="relative pt-6 px-6">
          {/* Type badge - floating style */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${
              product.type === "microgreen" 
                ? "bg-emerald-500/30 text-emerald-200 border border-emerald-400/30" 
                : "bg-sky-500/30 text-sky-200 border border-sky-400/30"
            }`}>
              {product.type === "microgreen" ? <LeafIcon /> : <DropletIcon />}
              {product.type === "microgreen" ? t("microgreen") : t("hydrosol")}
            </span>
          </div>

          {/* Main product circle / image */}
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Animated rings */}
            <div className={`absolute inset-4 rounded-full border border-white/10 transition-all duration-700 ${isHovered ? "scale-110 opacity-50" : "scale-100 opacity-100"}`} />
            <div className={`absolute inset-8 rounded-full border border-white/5 transition-all duration-700 delay-75 ${isHovered ? "scale-110 opacity-30" : "scale-100 opacity-100"}`} />
            
            {/* Central product image area with fallback to emoji */}
            <div
              className={`relative w-3/5 h-3/5 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm flex items-center justify-center overflow-hidden transition-all duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-mint/20 to-brand-primary/20 animate-pulse-glow" />

              {product.gallery && product.gallery.length > 0 ? (
                <>
                  <Image
                    src={product.gallery[0]}
                    alt={tProducts(`${product.slug}.name`) || product.name}
                    fill
                    className="relative object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 60vw, 20vw"
                  />
                  {/* Small badge showing number of images if more than 1 */}
                  {product.gallery.length > 1 && (
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {product.gallery.length}
                    </div>
                  )}
                </>
              ) : (
                <span className="relative text-5xl md:text-6xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
                  {product.type === "microgreen" ? "🌱" : "💧"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product info */}
        <div className="relative p-6 pt-2 flex-grow flex flex-col">
          {/* Product name with gradient underline on hover */}
          <h3 className="relative text-lg md:text-xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-brand-gold">
            {tProducts(`${product.slug}.name`) || product.name}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brand-gold to-brand-mint transition-all duration-500 ${isHovered ? "w-full" : "w-0"}`} />
          </h3>

          {/* Short description */}
          <p className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed flex-grow">
            {tProducts(`${product.slug}.shortDescription`) || product.shortDescription}
          </p>

          {/* Price and action row */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold gradient-text">
                ${product.price.toFixed(2)}
              </span>
              {product.isSubscriptionEligible && (
                <span className="text-xs text-brand-gold/80">Subscribe & Save</span>
              )}
            </div>
            
            {/* Arrow indicator */}
            <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 ${isHovered ? "bg-brand-mint/30 translate-x-1" : ""}`}>
              <svg 
                className={`w-5 h-5 text-white transition-all duration-300 ${isHovered ? "translate-x-0.5" : ""}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Shimmer effect overlay */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ${isHovered ? "translate-x-full" : "-translate-x-full"}`} />
      </div>
    </Link>
  )
}

export default function FeaturedProducts({ products = [] }) {
  const t = useTranslations("home")
  const tCommon = useTranslations("common")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Take only first 4 products
  const displayProducts = products.slice(0, 4)

  if (displayProducts.length === 0) {
    return null
  }

  return (
    <section className="relative py-12 md:py-20 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 md:w-40 md:h-40 animate-float opacity-20 pointer-events-none" style={{ animationDelay: '-1s' }} aria-hidden="true">
        <Image 
          src="/jineau-home-images/1-09.svg" 
          alt="" 
          width={160} 
          height={160}
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-20 left-10 w-28 h-28 md:w-36 md:h-36 animate-float opacity-15 pointer-events-none" style={{ animationDelay: '-2.5s' }} aria-hidden="true">
        <Image 
          src="/jineau-home-images/1-07.svg" 
          alt="" 
          width={144} 
          height={144}
          className="w-full h-full"
          loading="lazy"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-10 md:mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
            {t("shopFresh") || "Fresh Picks"}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
            {t("featuredProducts") || "Featured Products"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg px-2">
            {t("featuredProductsSubtitle") || "Hand-picked microgreens and hydrosols, harvested fresh for you."}
          </p>
        </div>

        {/* Products grid - 4 columns desktop, 1 column mobile */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-10 md:mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
          {displayProducts.map((product, index) => (
            <FeaturedProductCard 
              key={product._id || product.slug} 
              product={product} 
              index={index}
            />
          ))}
        </div>

        {/* Shop More button */}
        <div className={`text-center ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 glass text-white font-semibold text-sm md:text-base rounded-full transition-all duration-500 hover:bg-white/15 hover:scale-105 hover:shadow-[0_0_40px_rgba(112,178,178,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span>{t("shopMore") || "Shop All Products"}</span>
            <svg 
              className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

