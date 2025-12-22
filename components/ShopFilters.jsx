"use client"

import { useRouter } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export default function ShopFilters({ category, sort }) {
  const router = useRouter()
  const t = useTranslations("shop")

  const handleSortChange = (e) => {
    router.push(`/shop?category=${category}&sort=${e.target.value}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <a
          href="/shop"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
            category === "all"
              ? "bg-brand-primary text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-brand-mist/30 border border-gray-200"
          }`}
        >
          {t("allProducts")}
        </a>
        <a
          href="/shop?category=microgreens"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
            category === "microgreens"
              ? "bg-brand-primary text-white shadow-md"
              : "bg-[#CBC3E3] text-gray-700 hover:bg-[#CBC3E3]/90 border border-gray-200"
          }`}
        >
          {t("microgreens")}
        </a>
        <a
          href="/shop?category=hydrosols"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
            category === "hydrosols"
              ? "bg-brand-primary text-white shadow-md"
              : "bg-[#CBC3E3] text-gray-700 hover:bg-[#CBC3E3]/90 border border-gray-200"
          }`}
        >
          {t("hydrosols")}
        </a>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-700">{t("sortBy")}:</span>
        <select
          value={sort}
          onChange={handleSortChange}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white shadow-sm"
        >
          <option value="recommended">{t("recommended")}</option>
          <option value="price-low">{t("priceLowToHigh")}</option>
          <option value="price-high">{t("priceHighToLow")}</option>
        </select>
      </div>
    </div>
  )
}
