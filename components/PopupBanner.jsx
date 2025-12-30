"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

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
    }, 300) // Match animation duration
  }

  // Don't render if no popup
  if (!popup) return null

  // Get text for current locale, fallback to English
  const popupText = popup.text?.[locale] || popup.text?.en || ""
  const shopButtonText = popup.shopButtonText?.[locale] || popup.shopButtonText?.en || "Shop"
  const subscribeButtonText = popup.subscribeButtonText?.[locale] || popup.subscribeButtonText?.en || "Subscribe"
  const signUpButtonText = popup.signUpButtonText?.[locale] || popup.signUpButtonText?.en || "Sign Up"

  // Don't show if no text available
  if (!popupText.trim()) return null

  const isRtl = locale === "fa"

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing || !isVisible
            ? "opacity-0 pointer-events-none"
            : "opacity-100"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
          isClosing
            ? "opacity-0 scale-95 pointer-events-none"
            : isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="alert"
        aria-live="polite"
      >
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl border border-brand-gold/40 relative backdrop-blur-md w-full max-w-lg md:max-w-2xl">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`absolute top-4 ${
              isRtl ? "left-4" : "right-4"
            } w-8 h-8 flex items-center justify-center rounded-full glass hover:bg-white/20 transition-all duration-300 text-white/80 hover:text-brand-gold group`}
            aria-label="Close popup"
          >
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
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
          <div className={`${isRtl ? "text-right" : "text-left"}`}>
            {/* Title with gradient animation */}
            <h3 className="text-lg md:text-xl font-semibold gradient-text mb-4 drop-shadow-sm">
              From Freddie:
            </h3>
            <p
              className={`text-base md:text-lg lg:text-xl font-medium text-white drop-shadow-md leading-relaxed mb-6 ${
                isRtl ? "font-persian" : ""
              }`}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {popupText}
            </p>

            {/* Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 ${isRtl ? "sm:flex-row-reverse" : ""}`}>
              <Link
                href="/shop"
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-brand-mint hover:bg-brand-mint/90 text-white font-semibold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {shopButtonText}
              </Link>
              <Link
                href="/subscribe"
                onClick={handleClose}
                className="flex-1 px-6 py-3 bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {subscribeButtonText}
              </Link>
              <Link
                href="/login"
                onClick={handleClose}
                className="flex-1 px-6 py-3 glass border-2 border-brand-gold/60 hover:border-brand-gold text-white font-semibold rounded-lg transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {signUpButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

