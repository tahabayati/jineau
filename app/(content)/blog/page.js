import SectionTitle from "@/components/SectionTitle"
import MarmotMascot from "@/components/MarmotMascot"
import Button from "@/components/Button"

export const metadata = {
  title: "Blog | Fresh Ideas & Recipes",
  description: "Tips, recipes, and stories from the Jineau farm. Learn how to use microgreens, discover health benefits, and get inspired.",
}

const blogPosts = [
  {
    slug: "how-to-use-microgreens-daily",
    title: "How to Use Microgreens Daily",
    excerpt: "Simple ways to add nutrient-dense microgreens to every meal, from breakfast to dinner.",
    category: "Tips",
    date: "November 25, 2024",
    readTime: "5 min read",
  },
  {
    slug: "5-fast-recipes-under-5-minutes",
    title: "5 Fast Recipes Under 5 Minutes",
    excerpt: "Quick and delicious recipes featuring our fresh microgreens—perfect for busy weeknights.",
    category: "Recipes",
    date: "November 20, 2024",
    readTime: "4 min read",
  },
  {
    slug: "plasma-clean-farming",
    title: "Behind the Scenes: Plasma-Clean Farming",
    excerpt: "Learn how cold-plasma technology keeps your greens safe without chemicals or water waste.",
    category: "Farm Life",
    date: "November 15, 2024",
    readTime: "6 min read",
  },
  {
    slug: "benefits-of-basil-microgreens",
    title: "The Surprising Benefits of Basil Microgreens",
    excerpt: "Discover why basil microgreens pack more punch than mature basil leaves.",
    category: "Health",
    date: "November 10, 2024",
    readTime: "4 min read",
  },
  {
    slug: "microgreens-for-kids",
    title: "Getting Kids to Love Microgreens",
    excerpt: "Fun tips and recipes to help even the pickiest eaters enjoy their greens.",
    category: "Tips",
    date: "November 5, 2024",
    readTime: "5 min read",
  },
  {
    slug: "sunflower-vs-pea-shoots",
    title: "Sunflower vs. Pea Shoots: A Taste Comparison",
    excerpt: "Two of our most popular varieties compared—which one is right for you?",
    category: "Guides",
    date: "November 1, 2024",
    readTime: "3 min read",
  },
]

const categories = ["All", "Tips", "Recipes", "Health", "Farm Life", "Guides"]

export default function BlogPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-brand-mist/10 to-brand-mint/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Jineau Journal
          </h1>
          <p className="text-xl text-gray-600">
            Tips, recipes, and stories from our farm to your table.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === "All"
                    ? "bg-brand-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <a href={`/blog/${post.slug}`} className="block">
                  <div className="aspect-video bg-gradient-to-br from-brand-mint/20 to-brand-mist/30 flex items-center justify-center">
                    <MarmotMascot size="md" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-brand-mist/30 text-brand-primary text-xs font-medium px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-xs">{post.readTime}</span>
                    </div>
                    <h2 className="font-bold text-lg text-gray-900 group-hover:text-brand-primary transition-colors mb-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <p className="text-gray-400 text-xs">{post.date}</p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-mist/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest recipes, tips, and farm updates delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </>
  )
}

