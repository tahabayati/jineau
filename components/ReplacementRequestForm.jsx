"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Button from "./Button"
import { freshSwapConfig } from "@/lib/config"

export default function ReplacementRequestForm({ onSuccess, disabled, replacements }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const t = useTranslations("account")

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const thisMonthCount = replacements.filter((r) => {
    const d = new Date(r.createdAt)
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear
  }).length

  const limitReached = thisMonthCount >= freshSwapConfig.maxPerMonth

  const handleSubmit = async () => {
    if (disabled || limitReached) return
    
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const res = await fetch("/api/replacements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekStartDate: getWeekStartDate(),
          type: "fresh-swap",
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit request")
      }

      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getWeekStartDate = () => {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const diff = now.getDate() - dayOfWeek
    return new Date(now.setDate(diff)).toISOString()
  }

  if (limitReached) {
    return (
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
        <p className="text-amber-700 text-sm">{t("monthlyLimitReached")}</p>
        <p className="text-amber-600 text-xs mt-1">
          You've used {thisMonthCount}/{freshSwapConfig.maxPerMonth} Fresh Swaps this month
        </p>
      </div>
    )
  }

  return (
    <div>
      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm mb-4">
          {t("replacementSubmitted")}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Fresh Swaps used this month: <span className="font-medium">{thisMonthCount}/{freshSwapConfig.maxPerMonth}</span>
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={disabled || loading}
          variant={disabled ? "ghost" : "primary"}
        >
          {loading ? "Submitting..." : t("requestReplacement")}
        </Button>
      </div>
    </div>
  )
}

