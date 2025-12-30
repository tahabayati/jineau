"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function PopupBanner({ locale = "en" }) {
  const [popup, setPopup] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const t = useTranslations("common")

  useEffect(() => {
    // Use requestIdleCallback for non-blocking fetch, fallback to setTimeout
    const fetchWithDelay = () => {
      fetchPopup()
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      requestIdleCallback(fetchWithDelay, { timeout: 2000 })
    } else {
      // Fallback: fetch after a short delay to not block initial render
      setTimeout(fetchWithDelay, 100)
    }
  }, [])

  const fetchPopup = async () => {
    try {
      // Create abort controller for timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
      
      const res = await fetch("/api/popup", {
        signal: controller.signal,
        cache: 'no-cache' // Don't cache to get fresh data
      })
      
      clearTimeout(timeoutId)
      
      if (res.ok) {
        const data = await res.json()
        if (data && data.text) {
          // Check if user has dismissed this popup
          const dismissedId = localStorage.getItem("jineau-popup-dismissed")
          if (dismissedId !== data._id) {
            setPopup(data)
            // Small delay for smooth animation
            requestAnimationFrame(() => {
              setIsVisible(true)
            })
          }
        }
      }
    } catch (error) {
      // Silently fail - popup is not critical
      if (error.name !== 'AbortError') {
        // Only log in development
        if (process.env.NODE_ENV === 'development') {
          console.error("Error fetching popup:", error)
        }
      }
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
    <div
      className={`fixed ${
        isRtl ? "left-4 top-28" : "right-4 top-28"
      } z-50 max-w-xs sm:max-w-sm transition-all duration-500 ${
        isClosing
          ? "opacity-0 translate-x-full pointer-events-none"
          : isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full pointer-events-none"
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

