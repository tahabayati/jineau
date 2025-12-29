"use client"

import { useCart } from "./CartProvider"
import { useTranslations } from "next-intl"

export default function AddToCartButton({ product, size = "sm", showText = false }) {
  const { addItem } = useCart()
  const t = useTranslations("common")

  const isOutOfStock = product.inStock === false

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isOutOfStock) {
      addItem(product)
    }
  }

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  }

  if (isOutOfStock) {
    return (
      <button
        type="button"
        disabled
        className={`${sizeClasses[size]} flex items-center gap-2 rounded-full font-medium transition-all duration-300 bg-gray-400 text-white cursor-not-allowed opacity-60 shadow-sm`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        {showText && t("outOfStock")}
        {!showText && <span className="sr-only">{t("outOfStock")}</span>}
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${sizeClasses[size]} flex items-center gap-2 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-brand-secondary to-brand-primary text-white hover:from-brand-mint hover:to-brand-secondary hover:shadow-[0_0_20px_rgba(112,178,178,0.4)] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent shadow-sm`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      {showText && t("addToCart")}
      {!showText && <span className="sr-only">{t("addToCart")}</span>}
    </button>
  )
}

