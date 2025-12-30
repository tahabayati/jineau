"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function PopupBanner({ locale = "en" }) {
  const [popup, setPopup] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const t = useTranslations("common")

  useEffect(() => {
    fetchPopup()
  }, [])

  const fetchPopup = async () => {
    try {
      const res = await fetch("/api/popup")
      if (res.ok) {
        const data = await res.json()
        if (data && data.text) {
          // Check if user has dismissed this popup
          const dismissedId = localStorage.getItem("jineau-popup-dismissed")
          if (dismissedId !== data._id) {
            setPopup(data)
            // Small delay for animation
            setTimeout(() => setIsVisible(true), 100)
          }
        }
      }
    } catch (error) {
      console.error("Error fetching popup:", error)
    }
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      if (popup?._id) {
        localStorage.setItem("jineau-popup-dismissed", popup._id)
      }
      setIsVisible(false)
      setPopup(null)
    }, 300)
  }

  if (!popup || !isVisible) return null

  // Get text for current locale, fallback to English
  const popupText = popup.text?.[locale] || popup.text?.en || ""

  // Don't show if no text available
  if (!popupText.trim()) return null

  const isRtl = locale === "fa"

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup Banner */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl transition-all duration-300 ${
          isClosing
            ? "opacity-0 translate-y-[-20px] pointer-events-none"
            : isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[-20px] pointer-events-none"
        }`}
        role="alert"
        aria-live="polite"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-card rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl border-2 border-brand-gold/30 relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-3 md:top-4 ${
              isRtl ? "left-3 md:left-4" : "right-3 md:right-4"
            } w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full glass hover:bg-white/20 transition-all duration-300 text-white hover:text-brand-gold group`}
            aria-label="Close popup"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-90"
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
          <div className={`pr-10 md:pr-12 ${isRtl ? "text-right" : "text-left"}`}>
            <p
              className={`text-base md:text-lg lg:text-xl font-semibold text-white drop-shadow-lg leading-relaxed ${
                isRtl ? "font-persian" : ""
              }`}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {popupText}
            </p>
          </div>

          {/* Decorative gradient accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-mint via-brand-gold to-brand-mint rounded-b-2xl md:rounded-b-3xl" />
        </div>
      </div>
    </>
  )
}

