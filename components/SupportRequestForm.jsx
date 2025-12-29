"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import Button from "./Button"
import { metaTrackWithId } from "@/lib/metaBrowser"
import { sendMetaServerEvent } from "@/lib/metaServer"
import { metaGetEventId } from "@/lib/metaBrowser"

export default function SupportRequestForm({ onSuccess }) {
  const [type, setType] = useState("issue")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const t = useTranslations("account")
  const pathname = usePathname()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const res = await fetch("/api/support-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, message }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request")
      }

      const eventId = metaGetEventId()
      const eventTime = Date.now()
      const eventSourceUrl = typeof window !== "undefined" ? window.location.href : pathname

      metaTrackWithId("Lead", { content_name: "Support Request", content_category: type }, eventId)

      await sendMetaServerEvent({
        eventName: "Lead",
        eventTime,
        eventId,
        eventSourceUrl,
        customData: {
          content_name: "Support Request",
          content_category: type,
        },
      })

      setSuccess(true)
      setMessage("")
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
          Your request has been submitted. We'll get back to you soon.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("issueType")}
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="refund"
              checked={type === "refund"}
              onChange={(e) => setType(e.target.value)}
              className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-gray-700">{t("refund")}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="issue"
              checked={type === "issue"}
              onChange={(e) => setType(e.target.value)}
              className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
            />
            <span className="text-gray-700">{t("issue")}</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("describeIssue")}
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
          placeholder="Please describe your issue or reason for refund..."
          required
        />
      </div>

      <Button type="submit" disabled={loading || !message.trim()}>
        {loading ? "Submitting..." : t("submitRequest")}
      </Button>
    </form>
  )
}

