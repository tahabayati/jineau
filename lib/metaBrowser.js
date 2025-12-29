"use client"

import { hasMarketingConsent } from "./consent"

export function metaTrack(eventName, params = {}) {
  if (typeof window === "undefined" || !hasMarketingConsent() || !window.fbq) {
    return
  }

  try {
    window.fbq("track", eventName, params)
  } catch (err) {
    console.error("Meta Pixel track error:", err)
  }
}

export function metaTrackCustom(eventName, params = {}) {
  if (typeof window === "undefined" || !hasMarketingConsent() || !window.fbq) {
    return
  }

  try {
    window.fbq("trackCustom", eventName, params)
  } catch (err) {
    console.error("Meta Pixel trackCustom error:", err)
  }
}

export function metaGetEventId() {
  return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function metaTrackWithId(eventName, params = {}, eventId = null) {
  if (typeof window === "undefined" || !hasMarketingConsent() || !window.fbq) {
    return
  }

  const id = eventId || metaGetEventId()

  try {
    window.fbq("track", eventName, params, { eventID: id })
  } catch (err) {
    console.error("Meta Pixel track error:", err)
  }

  return id
}

