import { products } from "@/data/initialProducts"
import { locales } from "@/lib/config"

const baseUrl = "https://jineau.ca"

export default function sitemap() {
  const staticPages = [
    "",
    "/shop",
    "/subscribe",
    "/about",
    "/how-it-works",
    "/faq",
    "/for-families",
    "/for-chefs",
    "/for-wellness",
    "/blog",
    "/login",
    "/register",
  ]

  const entries = []

  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : page === "/shop" ? 0.9 : 0.8,
      })
    })

    products.forEach((product) => {
      entries.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })
    })
  })

  return entries
}
