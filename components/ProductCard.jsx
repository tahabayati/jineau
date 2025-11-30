import Image from "next/image"
import Link from "next/link"
import Badge from "./Badge"
import Button from "./Button"

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
      <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-mint to-brand-mist flex items-center justify-center">
            <span className="text-4xl">🌱</span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="mint">
            {product.type === "microgreen" ? "Microgreen" : "Hydrosol"}
          </Badge>
          {product.isSubscriptionEligible && (
            <Badge variant="gold">Subscribe & Save</Badge>
          )}
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-brand-primary transition-colors mb-1">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-brand-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button href={`/products/${product.slug}`} size="sm" variant="secondary">
            View
          </Button>
        </div>
      </div>
    </div>
  )
}

