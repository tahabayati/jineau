"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { hasAnalyticsConsent } from "@/lib/consent"

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const TRACKING_ENABLED = process.env.NEXT_PUBLIC_TRACKING_ENABLED !== "false"

export default function GA4() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasConsent(hasAnalyticsConsent())
    }
  }, [])

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !hasConsent ||
      !GA_MEASUREMENT_ID ||
      !TRACKING_ENABLED ||
      !window.gtag
    ) {
      return
    }

    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }, [pathname, searchParams, hasConsent])

  if (!GA_MEASUREMENT_ID || !TRACKING_ENABLED || !hasConsent) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

