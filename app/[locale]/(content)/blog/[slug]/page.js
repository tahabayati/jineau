import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import MarmotMascot from "@/components/MarmotMascot"
import Button from "@/components/Button"

const blogPosts = {
  "how-to-use-microgreens-daily": {
    title: "How to Use Microgreens Daily",
    content: `
      Adding microgreens to your daily diet is easier than you might think. These tiny powerhouses are incredibly versatile and can be incorporated into almost any meal.

      **Breakfast Ideas**
      Start your day with a nutrient boost by adding microgreens to your morning eggs, smoothies, or avocado toast. Pea shoots and sunflower microgreens are particularly delicious with eggs.

      **Lunch Options**
      Top your sandwiches, wraps, and salads with a generous handful of microgreens. They add crunch, flavor, and a massive nutritional boost without adding many calories.

      **Dinner Additions**
      Use microgreens as garnishes for soups, stir-fries, and pasta dishes. Add them at the last minute to preserve their delicate texture and nutrients.

      **Snack Time**
      Microgreens make excellent dippers! Use them with hummus, guacamole, or cream cheese for a healthy snack.
    `,
    date: "2024-01-15",
    category: "Recipes",
    readTime: "5 min",
  },
  "5-fast-recipes-under-5-minutes": {
    title: "5 Fast Recipes Under 5 Minutes",
    content: `
      When you're short on time but still want to eat healthy, microgreens are your secret weapon. Here are five quick recipes:

      **1. Microgreen Avocado Toast**
      Toast bread, mash avocado, top with microgreens, drizzle with olive oil and lemon. Done in 2 minutes!

      **2. Quick Smoothie Bowl**
      Blend frozen berries with banana and top with microgreens, granola, and seeds.

      **3. Mediterranean Wrap**
      Spread hummus on a tortilla, add cucumber, tomato, feta, and plenty of microgreens. Roll and enjoy!

      **4. Caprese Salad**
      Layer tomato, mozzarella, and basil microgreens. Drizzle with balsamic glaze.

      **5. Asian Rice Bowl**
      Top leftover rice with soy sauce, sesame oil, a fried egg, and microgreens.
    `,
    date: "2024-01-10",
    category: "Recipes",
    readTime: "4 min",
  },
  "high-tech-farming": {
    title: "Behind the Scenes: High-Tech Farming",
    content: `
      At Jineau, we combine traditional farming wisdom with advanced clean technology to grow the freshest, cleanest microgreens possible.

      **Controlled Environment**
      Our indoor facility maintains optimal conditions 24/7. We control temperature, humidity, and light to ensure consistent growth and quality.

      **Triple-Filtered Air**
      Every breath of air in our growing space passes through three layers of filtration, removing dust, spores, and contaminants.

      **Purified Water**
      Our water goes through reverse osmosis before reaching your greens, ensuring no impurities make their way into your food.

      **High-Tech Clean Technology**
      Our advanced sanitization system uses cutting-edge technology to ensure your microgreens are clean and safe—no washing required.

      **Just-in-Time Harvest**
      We harvest fresh every week and deliver within 24 hours, ensuring you receive microgreens at their peak freshness and nutrition.
    `,
    date: "2024-01-05",
    category: "Farm Life",
    readTime: "6 min",
  },
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) return { title: "Post Not Found" }
  return { title: post.title }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]
  const t = await getTranslations("blog")
  const tCommon = await getTranslations("common")

  if (!post) {
    notFound()
  }

  return (
    <>
      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-primary hover:underline mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t("backToBlog")}
          </Link>

          <div className="aspect-video bg-gradient-to-br from-brand-mint/30 to-brand-mist/40 rounded-2xl flex items-center justify-center mb-8">
            <MarmotMascot size="xl" />
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-brand-mist/30 text-brand-primary text-sm font-medium rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
            <time className="text-sm text-gray-400">
              {new Date(post.date).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => {
              if (paragraph.trim().startsWith("**") && paragraph.trim().endsWith("**")) {
                return (
                  <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace(/\*\*/g, "")}
                  </h2>
                )
              }
              return (
                <p key={i} className="text-gray-600 mb-4">
                  {paragraph}
                </p>
              )
            })}
          </div>
        </div>
      </article>

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
