import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import SectionTitle from "@/components/SectionTitle"
import MarmotMascot from "@/components/MarmotMascot"
import Button from "@/components/Button"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "The Jineau Journal", fr: "Le Journal Jineau", fa: "مجله ژینو" }
  return { title: titles[locale] || titles.en }
}

const blogPosts = [
  {
    slug: "how-to-use-microgreens-daily",
    title: "How to Use Microgreens Daily",
    excerpt: "Simple ways to add nutrient-dense microgreens to every meal of the day.",
    date: "2024-01-15",
    category: "Recipes",
    readTime: "5 min",
  },
  {
    slug: "5-fast-recipes-under-5-minutes",
    title: "5 Fast Recipes Under 5 Minutes",
    excerpt: "Quick and delicious recipes featuring our fresh microgreens for busy people.",
    date: "2024-01-10",
    category: "Recipes",
    readTime: "4 min",
  },
  {
    slug: "high-tech-farming",
    title: "Behind the Scenes: High-Tech Farming",
    excerpt: "Learn how advanced clean technology keeps your greens safe and ready to eat.",
    date: "2024-01-05",
    category: "Farm Life",
    readTime: "6 min",
  },
  {
    slug: "microgreens-vs-sprouts",
    title: "Microgreens vs Sprouts: What's the Difference?",
    excerpt: "A comprehensive guide to understanding the difference between these two superfoods.",
    date: "2024-01-01",
    category: "Education",
    readTime: "4 min",
  },
  {
    slug: "storing-microgreens-properly",
    title: "How to Store Microgreens Properly",
    excerpt: "Keep your microgreens fresh for up to 10 days with these storage tips.",
    date: "2023-12-28",
    category: "Tips",
    readTime: "3 min",
  },
  {
    slug: "health-benefits-of-microgreens",
    title: "The Science Behind Microgreen Nutrition",
    excerpt: "Research shows microgreens contain 4-40x more nutrients than mature vegetables.",
    date: "2023-12-20",
    category: "Health",
    readTime: "7 min",
  },
]

export default async function BlogPage() {
  const t = await getTranslations("blog")
  const tCommon = await getTranslations("common")

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/20 to-brand-mint/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-mint/30 to-brand-mist/40 flex items-center justify-center">
                  <MarmotMascot size="md" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-brand-mist/30 text-brand-primary text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.readTime}</span>
                  </div>
                  <h2 className="font-bold text-lg text-gray-900 group-hover:text-brand-primary transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <time className="text-xs text-gray-400">
                    {new Date(post.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t("readyToTry")}</h2>
          <p className="text-white/90 mb-8">
            {t("readyToTryDesc")}
          </p>
          <Button href="/subscribe" variant="gold" size="lg">
            {tCommon("startSubscription")}
          </Button>
        </div>
      </section>
    </>
  )
}
