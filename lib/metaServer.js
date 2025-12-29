"use client"

import { hasMarketingConsent } from "./consent"

export async function sendMetaServerEvent(payload) {
  if (typeof window === "undefined" || !hasMarketingConsent()) {
    return null
  }

  try {
    const response = await fetch("/api/meta/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      if (response.status === 204) {
        return null
      }
      const error = await response.json().catch(() => ({ error: "Unknown error" }))
      console.error("Meta server event error:", error)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error sending Meta server event:", error)
    return null
  }
}

