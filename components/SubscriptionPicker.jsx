"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Button from "./Button"
import Badge from "./Badge"
import GiftOneSection from "./GiftOneSection"

const plans = [
  {
    id: 3,
    name: "Starter",
    packs: 3,
    price: 18.99,
    pricePerPack: 6.33,
    description: "Perfect for individuals or couples",
    popular: false,
  },
  {
    id: 5,
    name: "Family",
    packs: 5,
    price: 29.99,
    pricePerPack: 6.00,
    description: "Ideal for small families",
    popular: true,
  },
  {
    id: 7,
    name: "Chef",
    packs: 7,
    price: 39.99,
    pricePerPack: 5.71,
    description: "Best value for green enthusiasts",
    popular: false,
  },
]

export default function SubscriptionPicker({ onSelect }) {
  const [selectedPlan, setSelectedPlan] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [giftOneEnabled, setGiftOneEnabled] = useState(false)
  const [giftOneType, setGiftOneType] = useState("default-center")
  const [customCenter, setCustomCenter] = useState({ name: "", address: "" })
  const t = useTranslations("subscribe")

  const handleSubscribe = async () => {
    setIsLoading(true)
    const plan = plans.find((p) => p.id === selectedPlan)
    
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "subscription",
          planSlug: `weekly-${plan.packs}-pack`,
          giftOneEnabled,
          giftOneType,
          customCenter: giftOneType === "custom-center" ? customCenter : null,
        }),
      })
      
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error("Checkout error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
              selectedPlan === plan.id
                ? "border-brand-primary bg-brand-primary/5 shadow-lg"
                : "border-gray-200 hover:border-brand-secondary bg-white"
            }`}
          >
            {plan.popular && (
              <Badge variant="gold" className="absolute -top-3 left-4">
                Most Popular
              </Badge>
            )}

            <h3 className="font-bold text-xl text-gray-900 mb-1">{plan.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-3xl font-bold text-brand-primary">
                ${plan.price.toFixed(2)}
              </span>
              <span className="text-gray-500">/week</span>
            </div>

            <p className="text-sm text-gray-500">
              {plan.packs} packs · ${plan.pricePerPack.toFixed(2)} each
            </p>

            <div className={`mt-4 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              selectedPlan === plan.id
                ? "border-brand-primary bg-brand-primary"
                : "border-gray-300"
            }`}>
              {selectedPlan === plan.id && (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        ))}
      </div>

      <GiftOneSection
        enabled={giftOneEnabled}
        onToggle={setGiftOneEnabled}
        giftType={giftOneType}
        onTypeChange={setGiftOneType}
        customCenter={customCenter}
        onCustomCenterChange={setCustomCenter}
      />

      <div className="bg-gradient-to-r from-brand-mist/30 to-brand-mint/20 rounded-xl p-6 border border-brand-mist/40">
        <h4 className="font-semibold text-gray-900 mb-3">{t("whatsIncluded")}:</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            t("freshEveryFriday"),
            t("freeDelivery"),
            t("skipCancel"),
            t("freshSwap"),
            t("priorityHarvest"),
            t("exclusiveRecipes"),
          ].map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-700">
              <svg className="w-5 h-5 text-brand-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={handleSubscribe}
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : `${t("startWeeklySubscription")} - $${plans.find((p) => p.id === selectedPlan)?.price.toFixed(2)}/week`}
      </Button>

      <p className="text-center text-sm text-gray-500">
        {t("orderCutoffNote")}
      </p>
    </div>
  )
}
