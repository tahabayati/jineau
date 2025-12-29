"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { hasMarketingConsent } from "@/lib/consent"

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const TRACKING_ENABLED = process.env.NEXT_PUBLIC_TRACKING_ENABLED !== "false"

export default function MetaPixel() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasConsent(hasMarketingConsent())
    }
  }, [])

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !hasConsent ||
      !META_PIXEL_ID ||
      !TRACKING_ENABLED ||
      !window.fbq
    ) {
      return
    }

    window.fbq("track", "PageView", {}, { eventID: `pageview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` })
  }, [pathname, searchParams, hasConsent])

  if (!META_PIXEL_ID || !TRACKING_ENABLED || !hasConsent) {
    return null
  }

  return (
    <>
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  )
}

