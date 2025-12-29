"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { useRouter } from "@/i18n/routing"
import { useCart } from "@/components/CartProvider"
import { Link } from "@/i18n/routing"
import Button from "@/components/Button"
import { shippingConfig } from "@/lib/config"
import MarmotMascot from "@/components/MarmotMascot"

export default function CheckoutPage() {
  const t = useTranslations("cart")
  const tCommon = useTranslations("common")
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, subtotal, shippingFee, total, isLoaded, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      const returnUrl = "/checkout"
      router.push(`/login?callbackUrl=${encodeURIComponent(returnUrl)}`)
    }
  }, [status, router])

  const handleCheckout = async () => {
    if (items.length === 0) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            slug: item.slug,
          })),
          mode: "payment",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Checkout failed")
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading while checking auth or loading cart
  if (status === "loading" || !isLoaded) {
    return (
      <div className="py-12 md:py-20 min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-500">{tCommon("loading")}</div>
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="py-12 md:py-20 min-h-[60vh]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MarmotMascot size="lg" className="mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t("empty")}</h1>
          <p className="text-gray-600 mb-8">
            Your cart is empty. Add some fresh microgreens to get started!
          </p>
          <Button href="/shop">{t("continueShopping")}</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-20 min-h-[60vh] bg-gradient-to-br from-brand-mist/10 via-white to-brand-gold/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{tCommon("checkout")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h2>
              <ul className="divide-y divide-gray-100">
                {items.map((item) => (
                  <li key={item.slug} className="py-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-brand-mint/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">
                        {item.type === "microgreen" ? "🌱" : "💧"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link
                  href="/shop"
                  className="text-brand-primary text-sm font-medium hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          {/* Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-lg text-gray-900 mb-4">Order Total</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t("subtotal")}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t("shipping")}</span>
                  <span className={shippingFee === 0 ? "text-green-600 font-medium" : ""}>
                    {shippingFee === 0 ? t("freeShipping") : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between text-lg font-bold">
                  <span>{t("total")}</span>
                  <span className="text-brand-primary">${total.toFixed(2)} CAD</span>
                </div>
              </div>

              {subtotal <= shippingConfig.freeShippingThreshold && (
                <div className="mb-4 p-3 bg-brand-mist/20 rounded-lg text-sm text-gray-600">
                  Add ${(shippingConfig.freeShippingThreshold - subtotal + 0.01).toFixed(2)} more for free shipping!
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? "Processing..." : `Pay $${total.toFixed(2)} CAD`}
              </Button>

              <p className="mt-4 text-xs text-gray-500 text-center">
                Secure checkout powered by Stripe
              </p>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <span>Free delivery on orders over ${shippingConfig.freeShippingThreshold}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Delivery every Friday evening</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

