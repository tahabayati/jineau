"use client"

import { useState, useEffect } from "react"
import { getConsentClient, setConsentClient } from "@/lib/consent"
import Button from "@/components/Button"

export default function ConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const consent = getConsentClient()
    if (!consent.analytics_consent && !consent.marketing_consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = (type) => {
    if (type === "analytics") {
      setConsentClient(true, false)
    } else if (type === "marketing") {
      setConsentClient(false, true)
    } else if (type === "all") {
      setConsentClient(true, true)
    } else {
      setConsentClient(false, false)
    }
    setShowBanner(false)
    window.location.reload()
  }

  if (!isClient || !showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-700 mb-2 md:mb-0">
            We use cookies and analytics to improve your experience. Choose your preferences:
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          <Button
            onClick={() => handleAccept("analytics")}
            className="text-xs md:text-sm px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Accept Analytics
          </Button>
          <Button
            onClick={() => handleAccept("marketing")}
            className="text-xs md:text-sm px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Accept Marketing
          </Button>
          <Button
            onClick={() => handleAccept("all")}
            className="text-xs md:text-sm px-3 py-2 bg-brand-primary text-white hover:bg-brand-primary/90"
          >
            Accept All
          </Button>
          <Button
            onClick={() => handleAccept("reject")}
            className="text-xs md:text-sm px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  )
}

