"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { useRouter } from "@/i18n/routing"
import Button from "./Button"
import Badge from "./Badge"
import GiftOneSection from "./GiftOneSection"

// Map slugs to translation keys
const planTranslationMap = {
  "weekly-3-pack": { nameKey: "planStarter", descriptionKey: "planStarterDesc", popular: false },
  "weekly-5-pack": { nameKey: "planFamily", descriptionKey: "planFamilyDesc", popular: true },
  "weekly-7-pack": { nameKey: "planChef", descriptionKey: "planChefDesc", popular: false },
}

export default function SubscriptionPicker({ onSelect }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [plans, setPlans] = useState([])
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingPlans, setLoadingPlans] = useState(true)
  const [giftOneEnabled, setGiftOneEnabled] = useState(false)
  const [giftOneType, setGiftOneType] = useState("default-center")
  const [customCenter, setCustomCenter] = useState({ name: "", address: "" })
  const [error, setError] = useState("")
  const t = useTranslations("subscribe")
  const tHome = useTranslations("home")

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoadingPlans(true)
      const res = await fetch("/api/subscription-plans")
      if (res.ok) {
        const data = await res.json()
        // Map database plans to include translation keys and calculate price per pack
        const mappedPlans = data.map((plan) => {
          const translationInfo = planTranslationMap[plan.slug] || { nameKey: plan.name, descriptionKey: "", popular: false }
          const displayPrice = plan.salePricePerWeek || plan.pricePerWeek
          const pricePerPack = displayPrice / plan.packsPerWeek
          
          return {
            ...plan,
            _id: plan._id,
            nameKey: translationInfo.nameKey,
            descriptionKey: translationInfo.descriptionKey,
            popular: translationInfo.popular,
            packs: plan.packsPerWeek,
            price: plan.pricePerWeek,
            salePrice: plan.salePricePerWeek,
            pricePerPack: pricePerPack,
          }
        })
        setPlans(mappedPlans)
        // Set default selected plan to the middle one (usually Family plan)
        if (mappedPlans.length > 0 && !selectedPlanId) {
          const defaultPlan = mappedPlans.find(p => p.popular) || mappedPlans[Math.floor(mappedPlans.length / 2)]
          setSelectedPlanId(defaultPlan._id)
        }
      }
    } catch (error) {
      console.error("Error fetching plans:", error)
    } finally {
      setLoadingPlans(false)
    }
  }

  // Redirect to login if not authenticated when trying to subscribe
  const handleSubscribe = async () => {
    // Check authentication first
    if (status === "unauthenticated") {
      const returnUrl = "/subscribe"
      router.push(`/login?callbackUrl=${encodeURIComponent(returnUrl)}`)
      return
    }

    if (status === "loading") {
      return // Wait for auth check
    }

    setIsLoading(true)
    setError("")
    const plan = plans.find((p) => p._id === selectedPlanId)
    
    if (!plan) {
      setError("Please select a subscription plan")
      setIsLoading(false)
      return
    }
    
    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "subscription",
          planSlug: plan.slug,
          giftOneEnabled,
          giftOneType,
          customCenter: giftOneType === "custom-center" ? customCenter : null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        if (response.status === 401) {
          // Not authenticated, redirect to login
          const returnUrl = "/subscribe"
          router.push(`/login?callbackUrl=${encodeURIComponent(returnUrl)}`)
          return
        }
        throw new Error(data.error || "Subscription checkout failed")
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned from Stripe")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setError(error.message || "Something went wrong starting your subscription. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingPlans) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading subscription plans...</div>
      </div>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">No subscription plans available</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {plans.map((plan) => {
          const displayPrice = plan.salePrice || plan.price
          const isSelected = selectedPlanId === plan._id
          
          return (
            <button
              key={plan._id}
              onClick={() => setSelectedPlanId(plan._id)}
              aria-label={`Select ${tHome(plan.nameKey)} plan`}
              className={`relative p-5 md:p-6 pt-7 md:pt-8 rounded-2xl border-2 text-left transition-all h-full flex flex-col ${
                isSelected
                  ? "border-brand-primary bg-brand-primary/5 shadow-lg scale-[1.02]"
                  : "border-gray-200 hover:border-brand-secondary hover:shadow-md bg-white"
              }`}
            >
              {plan.popular && (
                <Badge variant="gold" className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  {tHome("mostPopular")}
                </Badge>
              )}

              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-1.5">{tHome(plan.nameKey)}</h3>
                <p className="text-sm text-gray-600 mb-4 min-h-[2.5rem]">{tHome(plan.descriptionKey)}</p>

                <div className="flex items-baseline gap-1 mb-2">
                  {plan.salePrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-bold text-brand-gold">
                        ${displayPrice.toFixed(2)}
                      </span>
                      <span className="text-xl font-semibold text-gray-400 line-through">
                        ${plan.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm">/week</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-3xl md:text-4xl font-bold text-brand-primary">
                        ${displayPrice.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm">/week</span>
                    </>
                  )}
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  {plan.packs} {plan.packs === 1 ? tHome("pack") : tHome("packs")} · ${plan.pricePerPack.toFixed(2)} {tHome("each")}
                </p>
              </div>

              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? "border-brand-primary bg-brand-primary"
                  : "border-gray-300"
              }`}>
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <GiftOneSection
        enabled={giftOneEnabled}
        onToggle={setGiftOneEnabled}
        giftType={giftOneType}
        onTypeChange={setGiftOneType}
        customCenter={customCenter}
        onCustomCenterChange={setCustomCenter}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-gradient-to-r from-brand-mist/30 to-brand-mint/20 rounded-xl p-4 sm:p-6 border border-brand-mist/40">
        <h4 className="font-semibold text-gray-900 mb-4">{t("whatsIncluded")}</h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            t("freshEveryFriday"),
            t("freeDelivery"),
            t("skipCancel"),
            t("freshSwap"),
            t("priorityHarvest"),
            t("exclusiveRecipes"),
          ].map((benefit, index) => (
            <li key={index} className="flex items-start gap-2.5 text-gray-700 text-sm">
              <svg className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        onClick={handleSubscribe}
        size="lg"
        className="w-full text-sm sm:text-base"
        disabled={isLoading || !selectedPlanId}
        aria-label={`Start subscription for $${plans.find((p) => p._id === selectedPlanId) ? (plans.find((p) => p._id === selectedPlanId).salePrice || plans.find((p) => p._id === selectedPlanId).price).toFixed(2) : '0.00'} per week`}
      >
        {isLoading ? "Processing..." : `${t("startWeeklySubscription")} - $${plans.find((p) => p._id === selectedPlanId) ? (plans.find((p) => p._id === selectedPlanId).salePrice || plans.find((p) => p._id === selectedPlanId).price).toFixed(2) : '0.00'}/week`}
      </Button>

      <p className="text-center text-sm text-gray-500 px-4">
        {t("orderCutoffNote")}
      </p>
    </div>
  )
}
