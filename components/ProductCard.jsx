"use client"

import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Badge from "./Badge"
import Button from "./Button"
import AddToCartButton from "./AddToCartButton"

export default function ProductCard({ product }) {
  const t = useTranslations("product")
  const tProducts = useTranslations("products")
  const tShop = useTranslations("shop")
  const tCommon = useTranslations("common")

  // Get translated product fields with fallback
  // Use the translation function directly with the full path
  const productName = tProducts(`${product.slug}.name`) || product.name
  const productShortDesc = tProducts(`${product.slug}.shortDescription`) || product.shortDescription

  return (
    <div className="group relative bg-brand-primary/50 rounded-3xl overflow-hidden transition-all duration-300 border border-brand-mint/20 hover:border-brand-mint/40 hover:bg-brand-secondary/60 hover:shadow-2xl hover:shadow-brand-mint/20 hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/12 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        
        {product.gallery && product.gallery.length > 0 ? (
          <div className="relative w-full h-full bg-white">
            <Image
              src={product.gallery[0]}
              alt={productName}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            {product.gallery.length > 1 && (
              <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {product.gallery.length}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-mint/10 to-brand-primary/10">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(112,178,178,0.3)]">
            <span className="text-4xl">{product.type === "microgreen" ? "🌱" : "💧"}</span>
          </div>
        </div>
        )}
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <Badge variant="category" className="transition-transform duration-300 hover:scale-105">
            {product.type === "microgreen" ? t("microgreen") : t("hydrosol")}
          </Badge>
          <div className="flex gap-1 flex-wrap justify-end">
            {product.isSubscriptionEligible && (
              <Badge variant="gold" className="transition-transform duration-300 hover:scale-105">
                {tShop("subscribeAndSave")}
              </Badge>
            )}
            {product.inStock === false && (
              <Badge variant="default" className="transition-transform duration-300 hover:scale-105 bg-red-500/30 text-red-200">
                {tCommon("outOfStock")}
              </Badge>
            )}
          </div>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-white mb-1 transition-colors duration-300 group-hover:text-brand-gold">
            {productName}
          </h3>
        </Link>

        <p className="text-sm text-white/60 mb-3 line-clamp-2">
          {productShortDesc}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {product.volume && (
              <span className="text-xs text-white/70 mb-0.5">{product.volume}</span>
            )}
            <span className="inline-flex items-center text-xl font-semibold text-white bg-brand-primary px-3 py-1 rounded-full shadow-sm">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}
