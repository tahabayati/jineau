"use client"

const CONSENT_COOKIE_NAME = "jineau_consent"
const CONSENT_STORAGE_KEY = "jineau_consent"

export function getConsentClient() {
  if (typeof window === "undefined") {
    return { analytics_consent: null, marketing_consent: null }
  }

  try {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`))
      ?.split("=")[1]

    if (cookieValue) {
      const decoded = decodeURIComponent(cookieValue)
      return JSON.parse(decoded)
    }

    const storageValue = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (storageValue) {
      return JSON.parse(storageValue)
    }
  } catch (err) {
    console.error("Error reading consent:", err)
  }

  return { analytics_consent: null, marketing_consent: null }
}

export function setConsentClient(analytics, marketing) {
  if (typeof window === "undefined") return

  const consent = {
    analytics_consent: analytics ? "granted" : "denied",
    marketing_consent: marketing ? "granted" : "denied",
    timestamp: Date.now(),
  }

  try {
    const consentString = JSON.stringify(consent)
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)

    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(consentString)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
    localStorage.setItem(CONSENT_STORAGE_KEY, consentString)
  } catch (err) {
    console.error("Error setting consent:", err)
  }
}

export function hasAnalyticsConsent() {
  const consent = getConsentClient()
  return consent.analytics_consent === "granted"
}

export function hasMarketingConsent() {
  const consent = getConsentClient()
  return consent.marketing_consent === "granted"
}

