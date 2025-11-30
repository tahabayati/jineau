import { products } from "@/data/initialProducts"
import ProductGrid from "@/components/ProductGrid"
import SectionTitle from "@/components/SectionTitle"
import ShopFilters from "@/components/ShopFilters"
import { deliveryInfo } from "@/data/siteCopy"

export const metadata = {
  title: "Shop Microgreens & Hydrosols",
  description: "Browse our selection of fresh, plasma-cleaned microgreens and aromatic hydrosols. Ready-to-eat, pesticide-free, and delivered fresh to Montreal's South Shore.",
}

export default async function ShopPage({ searchParams }) {
  const params = await searchParams
  const category = params?.category || "all"
  const sort = params?.sort || "recommended"

  let filteredProducts = [...products]

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category || p.type === category.replace("s", "")
    )
  }

  if (sort === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sort === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Shop Fresh Microgreens & Hydrosols"
          subtitle="Harvested Friday, delivered Saturday. All products are plasma-cleaned and ready to eat."
        />

        <div className="bg-brand-mist/20 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Harvest {deliveryInfo.harvestDay}, Deliver {deliveryInfo.deliveryDay}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-brand-secondary/30" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>Free delivery over ${deliveryInfo.freeDeliveryThreshold}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-brand-secondary/30" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${deliveryInfo.deliveryFee} under ${deliveryInfo.freeDeliveryThreshold}</span>
          </div>
        </div>

        <ShopFilters category={category} sort={sort} />

        <ProductGrid products={filteredProducts} />

        <div className="mt-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Save with a Subscription</h2>
          <p className="text-white/90 mb-6">
            Get fresh microgreens delivered every Saturday with our weekly subscription plans.
          </p>
          <a
            href="/subscribe"
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-amber-400 transition-colors"
          >
            View Subscription Plans
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
