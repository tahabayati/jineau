"use client"

import { useRouter } from "next/navigation"

export default function ShopFilters({ category, sort }) {
  const router = useRouter()

  const handleSortChange = (e) => {
    router.push(`/shop?category=${category}&sort=${e.target.value}`)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        <a
          href="/shop"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === "all"
              ? "bg-brand-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All Products
        </a>
        <a
          href="/shop?category=microgreens"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === "microgreens"
              ? "bg-brand-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Microgreens
        </a>
        <a
          href="/shop?category=hydrosols"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === "hydrosols"
              ? "bg-brand-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Hydrosols
        </a>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <select
          value={sort}
          onChange={handleSortChange}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-brand-primary focus:border-transparent"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>
  )
}

