"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import Badge from "./Badge"
import Button from "./Button"
import AddToCartButton from "./AddToCartButton"

export default function ProductCard({ product }) {
  const t = useTranslations("product")
  const tShop = useTranslations("shop")

  return (
    <div className="group relative bg-brand-primary/50 rounded-3xl overflow-hidden transition-all duration-300 border border-brand-mint/20 hover:border-brand-mint/40 hover:bg-brand-secondary/60">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/12 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(112,178,178,0.3)]">
            <span className="text-4xl">{product.type === "microgreen" ? "🌱" : "💧"}</span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant="mint" className="transition-transform duration-300 hover:scale-105">
            {product.type === "microgreen" ? t("microgreen") : t("hydrosol")}
          </Badge>
          {product.isSubscriptionEligible && (
            <Badge variant="gold" className="transition-transform duration-300 hover:scale-105">
              {tShop("subscribeAndSave")}
            </Badge>
          )}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-white mb-1 transition-colors duration-300 group-hover:text-brand-gold">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-white/60 mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">
            ${product.price.toFixed(2)}
          </span>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
