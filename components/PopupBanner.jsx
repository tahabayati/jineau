"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function PopupBanner({ locale = "en", popup: initialPopup = null }) {
  const [popup, setPopup] = useState(initialPopup)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const t = useTranslations("common")

  useEffect(() => {
    // If popup is passed as prop, show it with animation
    if (popup && popup.text) {
      // Small delay to ensure the component is mounted, then animate in
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [popup])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsVisible(false)
      setPopup(null)
    }, 700) // Match animation duration
  }

  // Don't render if no popup
  if (!popup) return null

  // Get text for current locale, fallback to English
  const popupText = popup.text?.[locale] || popup.text?.en || ""

  // Don't show if no text available
  if (!popupText.trim()) return null

  const isRtl = locale === "fa"

  return (
    <div
      className={`fixed ${
        isRtl ? "left-4 top-28" : "right-4 top-28"
      } z-50 max-w-xs sm:max-w-sm transition-all duration-700 ease-out ${
        isClosing
          ? "opacity-0 translate-x-full scale-95 pointer-events-none"
          : isVisible
          ? "opacity-100 translate-x-0 scale-100"
          : "opacity-0 translate-x-full scale-95 pointer-events-none"
      } ${isRtl ? "rtl:translate-x-full rtl:left-auto rtl:right-4" : ""}`}
      role="alert"
      aria-live="polite"
    >
      <div className="glass-card rounded-xl md:rounded-2xl p-4 shadow-2xl border border-brand-gold/40 relative backdrop-blur-md">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-2 ${
            isRtl ? "left-2" : "right-2"
          } w-6 h-6 flex items-center justify-center rounded-full glass hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-brand-gold group`}
          aria-label="Close popup"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className={`pr-8 ${isRtl ? "text-right" : "text-left"}`}>
          {/* Title with gradient animation */}
          <h3 className="text-xs md:text-sm font-semibold gradient-text mb-2 drop-shadow-sm">
            From Freddie:
          </h3>
          <p
            className={`text-sm md:text-base font-medium text-white drop-shadow-md leading-relaxed ${
              isRtl ? "font-persian" : ""
            }`}
            dir={isRtl ? "rtl" : "ltr"}
          >
            {popupText}
          </p>
        </div>
      </div>
    </div>
  )
}

