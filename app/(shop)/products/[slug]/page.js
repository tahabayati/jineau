import { notFound } from "next/navigation"
import { products } from "@/data/initialProducts"
import Button from "@/components/Button"
import Badge from "@/components/Badge"
import ProductCard from "@/components/ProductCard"
import { generateProductSchema } from "@/lib/seo"
import { brandName } from "@/data/siteCopy"

export async function generateMetadata({ params }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    return { title: "Product Not Found" }
  }

  return {
    title: `${product.name} - Fresh ${product.type === "microgreen" ? "Microgreens" : "Hydrosol"}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${brandName}`,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.type === product.type && p.slug !== product.slug)
    .slice(0, 3)

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
            <a href="/" className="hover:text-brand-primary">Home</a>
            <span>/</span>
            <a href="/shop" className="hover:text-brand-primary">Shop</a>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gradient-to-br from-brand-mint/20 to-brand-mist/30 rounded-3xl flex items-center justify-center">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-brand-mint to-brand-mist flex items-center justify-center">
                <span className="text-8xl">
                  {product.type === "microgreen" ? "🌱" : "💧"}
                </span>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="mint">
                  {product.type === "microgreen" ? "Microgreen" : "Hydrosol"}
                </Badge>
                {product.isSubscriptionEligible && (
                  <Badge variant="gold">Subscribe & Save</Badge>
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

              <div className="text-4xl font-bold text-brand-primary mb-6">
                ${product.price.toFixed(2)} CAD
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="flex-1">
                  Add to Cart
                </Button>
                {product.isSubscriptionEligible && (
                  <Button href="/subscribe" variant="secondary" size="lg" className="flex-1">
                    Subscribe Weekly
                  </Button>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6 space-y-4">
                {product.usage && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">How to Use</h3>
                    <p className="text-gray-600 text-sm">{product.usage}</p>
                  </div>
                )}

                {product.storage && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Storage</h3>
                    <p className="text-gray-600 text-sm">{product.storage}</p>
                  </div>
                )}

                {product.safetyNote && (
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-800 mb-1">Safety Note</h3>
                    <p className="text-amber-700 text-sm">{product.safetyNote}</p>
                  </div>
                )}

                {product.allergenNote && (
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-semibold text-red-800 mb-1">Allergen Info</h3>
                    <p className="text-red-700 text-sm">{product.allergenNote}</p>
                  </div>
                )}
              </div>

              <div className="mt-8 bg-brand-mist/20 rounded-xl p-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Plasma-cleaned</span>
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
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
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

