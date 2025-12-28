"use client"

import { memo } from "react"
import { useCart } from "./CartProvider"
import { useTranslations } from "next-intl"
import Button from "./Button"
import { shippingConfig } from "@/lib/config"

function CartDrawer() {
  const t = useTranslations("cart")
  const { items, isOpen, closeCart, subtotal, shippingFee, total, updateQuantity, removeItem } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform rtl:right-auto rtl:left-0">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-brand-primary text-white">
          <h2 className="text-lg font-bold">{t("title")}</h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-brand-mist/30 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">{t("empty")}</p>
              <Button onClick={closeCart} variant="secondary">
                {t("continueShopping")}
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 p-3 bg-brand-mist/20 rounded-xl">
                  <div className="w-16 h-16 bg-brand-mint/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.type === "microgreen" ? "🌱" : "💧"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-brand-primary font-semibold">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                        className="w-7 h-7 bg-white border border-brand-mint/30 rounded-full flex items-center justify-center hover:bg-brand-mist/30 text-brand-primary font-semibold"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                        className="w-7 h-7 bg-white border border-brand-mint/30 rounded-full flex items-center justify-center hover:bg-brand-mist/30 text-brand-primary font-semibold"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.slug)}
                        className="ml-auto text-red-500 hover:text-red-700 p-1"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-brand-mint/20 p-4 bg-brand-mist/20">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("subtotal")}</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t("shipping")}</span>
                <span className={`font-medium ${shippingFee === 0 ? "text-green-600" : ""}`}>
                  {shippingFee === 0 ? t("freeShipping") : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                <span>{t("total")}</span>
                <span className="text-brand-primary">${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal <= shippingConfig.freeShippingThreshold && (
              <p className="text-xs text-center text-gray-500 mb-3">
                {t("freeShippingMessage")}
              </p>
            )}

            <div className="space-y-2">
              <Button href="/checkout" onClick={closeCart} className="w-full">
                {t("proceedToCheckout")}
              </Button>
              <Button onClick={closeCart} variant="ghost" className="w-full">
                {t("continueShopping")}
              </Button>
            </div>
          </div>
        )}
      </div>
      </>
  )
}

export default memo(CartDrawer)

