"use client"

import { useEffect } from "react"
import { initSmoothScrollLinks } from "@/lib/smoothScroll"

/**
 * Initialize smooth scrolling for all anchor links
 * This component doesn't render anything, it just sets up smooth scroll behavior
 */
export default function SmoothScrollInit() {
  useEffect(() => {
    // Initialize smooth scroll for anchor links
    initSmoothScrollLinks()

    // Re-initialize when content changes (e.g., after navigation)
    const observer = new MutationObserver(() => {
      initSmoothScrollLinks()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return null
}

