import { notFound } from "next/navigation"
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
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.name} - Fresh ${product.type === "microgreen" ? "Microgreens" : "Hydrosol"}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${brandName}`,
      description: product.shortDescription,
    },
  }
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.type, product.slug)

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
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-primary">Shop</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductGallery 
              images={product.gallery || []} 
              productName={product.name}
            />

            <div>
              <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Badge variant="mint">
                  {product.type === "microgreen" ? "🌱 Microgreen" : "💧 Hydrosol"}
                </Badge>
                {product.isSubscriptionEligible && (
                  <Badge variant="gold">✨ Subscribe & Save</Badge>
                )}
                {product.inStock ? (
                  <Badge variant="success">In Stock</Badge>
                ) : (
                  <Badge variant="default">Out of Stock</Badge>
                )}
                {product.tags?.map((tag) => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <p className="text-lg text-brand-secondary mb-4">
                {product.shortDescription}
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-brand-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500">CAD</span>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <AddToCartButton product={product} size="lg" showText />
                {product.isSubscriptionEligible && (
                  <Button href="/subscribe" variant="secondary" size="lg">
                    Subscribe Weekly
                  </Button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                {product.usage && (
                  <div className="bg-brand-mist/10 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">How to Use</h3>
                    <p className="text-gray-600 text-sm">{product.usage}</p>
                  </div>
                )}

                {product.storage && (
                  <div className="bg-brand-mint/10 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">Storage</h3>
                    <p className="text-gray-600 text-sm">{product.storage}</p>
                  </div>
                )}

                {product.safetyNote && (
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <h3 className="font-semibold text-amber-800 mb-1">Safety Note</h3>
                    <p className="text-amber-700 text-sm">{product.safetyNote}</p>
                  </div>
                )}

                {product.allergenNote && (
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-1">Allergen Info</h3>
                    <p className="text-red-700 text-sm">{product.allergenNote}</p>
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

          {relatedProducts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">You Might Also Like</h2>
              <p className="text-gray-600 text-center mb-8">Discover more fresh microgreens and hydrosols</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((p) => (
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
