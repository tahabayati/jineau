"use client"

import { useCart } from "./CartProvider"
import { useTranslations } from "next-intl"

export default function AddToCartButton({ product, size = "sm", showText = false }) {
  const { addItem } = useCart()
  const t = useTranslations("common")

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product)
  }

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <button
      onClick={handleClick}
      className={`${sizeClasses[size]} bg-brand-secondary text-white rounded-full font-medium hover:bg-brand-primary transition-colors shadow-sm hover:shadow-md flex items-center gap-2`}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      {showText && t("addToCart")}
      {!showText && <span className="sr-only">{t("addToCart")}</span>}
    </button>
  )
}

