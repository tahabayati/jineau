import { getTranslations } from "next-intl/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"
import ProductGrid from "@/components/ProductGrid"
import SectionTitle from "@/components/SectionTitle"
import ShopFilters from "@/components/ShopFilters"
import { shippingConfig, deliveryConfig } from "@/lib/config"
import { Link } from "@/i18n/routing"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = {
    en: "Shop Microgreens & Hydrosols",
    fr: "Magasiner Micropousses & Hydrolats",
    fa: "خرید میکروگرین و هیدروسول",
  }
  return { title: titles[locale] || titles.en }
}

async function getProducts(category, sort) {
  try {
    await dbConnect()
    
    const query = { active: true }
    
    if (category && category !== "all") {
      query.$or = [
        { type: category.replace("s", "") },
        { "category.slug": category }
      ]
    }

    let sortOption = { createdAt: -1 }
    if (sort === "price-low") {
      sortOption = { price: 1 }
    } else if (sort === "price-high") {
      sortOption = { price: -1 }
    }

    const products = await Product.find(query)
      .populate("category")
      .sort(sortOption)
      .lean()

    return {
      success: true,
      data: products.map(p => ({
        ...p,
        _id: p._id.toString(),
        category: p.category ? {
          ...p.category,
          _id: p.category._id.toString()
        } : null
      }))
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return { success: false, data: [] }
  }
}

export default async function ShopPage({ searchParams }) {
  const t = await getTranslations("shop")
  const tDelivery = await getTranslations("delivery")
  const resolvedParams = await searchParams
  const category = resolvedParams?.category || "all"
  const sort = resolvedParams?.sort || "recommended"

  const result = await getProducts(category, sort)
  const filteredProducts = result.data
  const hasError = !result.success

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="bg-gradient-to-r from-brand-primary/20 via-brand-mist/30 to-brand-mint/20 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-center gap-4 text-sm border border-brand-mist/50 text-sky-900">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{tDelivery("harvestDay")}, {tDelivery("deliveryDay")}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-brand-secondary/30" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
            <span>{tDelivery("freeOver")} ${shippingConfig.freeShippingThreshold}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-brand-secondary/30" />
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-sky-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${shippingConfig.deliveryFee} {tDelivery("feeUnder")} ${shippingConfig.freeShippingThreshold}</span>
          </div>
        </div>

        <ShopFilters category={category} sort={sort} />

        {hasError ? (
          <div className="text-center py-12 bg-red-50 rounded-lg border-2 border-red-200">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-semibold text-red-800 mb-2">Products Temporarily Unavailable</h3>
            <p className="text-red-600">We're experiencing technical difficulties. Please try again later.</p>
          </div>
        ) : (
          <ProductGrid products={filteredProducts} />
        )}

        <div className="mt-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl p-8 text-white text-center shadow-xl">
          <h2 className="text-2xl font-bold mb-2">{t("saveWithSubscription")}</h2>
          <p className="text-white/90 mb-6">
            {t("subscriptionCta")}
          </p>
          <Link
            href="/subscribe"
            className="inline-flex items-center gap-2 bg-brand-gold text-gray-900 px-6 py-3 rounded-full font-medium hover:bg-amber-400 transition-colors shadow-md"
          >
            {t("viewSubscriptionPlans")}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
