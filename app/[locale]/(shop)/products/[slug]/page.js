import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"
import { Link } from "@/i18n/routing"
import Button from "@/components/Button"
import Badge from "@/components/Badge"
import ProductCard from "@/components/ProductCard"
import ProductGallery from "@/components/ProductGallery"
import AddToCartButton from "@/components/AddToCartButton"
import { generateProductSchema } from "@/lib/seo"
import { brandName } from "@/data/siteCopy"
import { getTranslatedProduct } from "@/lib/productTranslations"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getProduct(slug) {
  await dbConnect()
  const product = await Product.findOne({ slug, active: true }).populate("category").lean()
  if (!product) return null
  return {
    ...product,
    _id: product._id.toString(),
    category: product.category ? {
      ...product.category,
      _id: product.category._id.toString()
    } : null
  }
}

async function getRelatedProducts(type, excludeSlug) {
  await dbConnect()
  const products = await Product.find({ type, slug: { $ne: excludeSlug }, active: true })
    .limit(3)
    .lean()
  return products.map(p => ({
    ...p,
    _id: p._id.toString(),
    category: p.category ? p.category.toString() : null
  }))
}

export async function generateMetadata({ params }) {
  const { locale } = await params
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  const t = await getTranslations("products")
  const tProduct = await getTranslations("product")
  const translatedProduct = getTranslatedProduct(t, product)

  return {
    title: `${translatedProduct.name} - Fresh ${product.type === "microgreen" ? tProduct("microgreen") : tProduct("hydrosol")}`,
    description: translatedProduct.description,
    openGraph: {
      title: `${translatedProduct.name} | ${brandName}`,
      description: translatedProduct.shortDescription,
    },
  }
}

export default async function ProductPage({ params }) {
  const { locale } = await params
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  // Get translations
  const t = await getTranslations("products")
  const tProduct = await getTranslations("product")
  const tCommon = await getTranslations("common")
  const tShop = await getTranslations("shop")
  const tHome = await getTranslations("home")

  // Get translated product
  const translatedProduct = getTranslatedProduct(t, product)

  const relatedProducts = await getRelatedProducts(product.type, product.slug)
  const translatedRelatedProducts = relatedProducts.map((p) =>
    getTranslatedProduct(t, p)
  )

  const productSchema = generateProductSchema(product)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-brand-primary">{tCommon("brandName")}</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-primary">{tShop("shop")}</Link>
            <span>/</span>
            <span className="text-gray-900">{translatedProduct.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductGallery 
              images={translatedProduct.gallery || []} 
              productName={translatedProduct.name}
            />

            <div>
              <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Badge variant="mint">
                  {translatedProduct.type === "microgreen" ? `🌱 ${tProduct("microgreen")}` : `💧 ${tProduct("hydrosol")}`}
                </Badge>
                {translatedProduct.isSubscriptionEligible && (
                  <Badge variant="gold">✨ {tShop("subscribeAndSave")}</Badge>
                )}
                {translatedProduct.inStock ? (
                  <Badge variant="success">{tCommon("inStock") || "In Stock"}</Badge>
                ) : (
                  <Badge variant="default">{tCommon("outOfStock") || "Out of Stock"}</Badge>
                )}
                {translatedProduct.tags?.map((tag) => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {translatedProduct.name}
              </h1>

              <p className="text-lg text-brand-secondary mb-4">
                {translatedProduct.shortDescription}
              </p>

              <div className="mb-6">
                {translatedProduct.volume && (
                  <div className="text-sm text-gray-600 mb-1">{translatedProduct.volume}</div>
                )}
                <div className="flex items-baseline gap-2">
                  {translatedProduct.salePrice ? (
                    <>
                      <span className="text-4xl font-bold text-brand-gold">
                        ${translatedProduct.salePrice.toFixed(2)}
                      </span>
                      <span className="text-2xl font-semibold text-gray-400 line-through">
                        ${translatedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500">CAD</span>
                    </>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-brand-primary">
                        ${translatedProduct.price.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500">CAD</span>
                    </>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {translatedProduct.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <AddToCartButton product={translatedProduct} size="lg" showText />
                {translatedProduct.isSubscriptionEligible && (
                  <Button href="/subscribe" variant="secondary" size="lg">
                    {tCommon("subscribeWeekly") || "Subscribe Weekly"}
                  </Button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                {translatedProduct.usage && (
                  <div className="bg-brand-mist/10 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{tProduct("howToUse")}</h3>
                    <p className="text-gray-600 text-sm">{translatedProduct.usage}</p>
                  </div>
                )}

                {translatedProduct.storage && (
                  <div className="bg-brand-mint/10 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{tProduct("storage")}</h3>
                    <p className="text-gray-600 text-sm">{translatedProduct.storage}</p>
                  </div>
                )}

                {translatedProduct.safetyNote && (
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-1">{tProduct("safetyNote")}</h3>
                    <p className="text-amber-700 text-sm">{translatedProduct.safetyNote}</p>
                  </div>
                )}

                {translatedProduct.allergenNote && (
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-1">{tProduct("allergenInfo")}</h3>
                    <p className="text-red-700 text-sm">{translatedProduct.allergenNote}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 bg-gradient-to-r from-brand-primary/10 to-brand-mint/10 rounded-xl p-4 border border-brand-mist/30">
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>High-tech clean</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>No washing needed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Pesticide-free</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {translatedRelatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">{tProduct("youMightAlsoLike")}</h2>
              <p className="text-gray-600 text-center mb-8">{tHome("shopMore") || "Discover more fresh microgreens and hydrosols"}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {translatedRelatedProducts.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
