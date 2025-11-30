import { notFound } from "next/navigation"
import MarmotMascot from "@/components/MarmotMascot"
import Button from "@/components/Button"

const blogPosts = {
  "how-to-use-microgreens-daily": {
    title: "How to Use Microgreens Daily",
    excerpt: "Simple ways to add nutrient-dense microgreens to every meal.",
    category: "Tips",
    date: "November 25, 2024",
    readTime: "5 min read",
    content: `
      Microgreens are incredibly versatile and can be added to almost any meal. Here are some simple ways to incorporate them into your daily routine.

      ## Breakfast Ideas
      
      Start your day with a nutrient boost by adding microgreens to your morning meals:
      
      - **Smoothies**: Blend a handful of mild microgreens like pea shoots or kale with your favorite fruits
      - **Eggs**: Top scrambled eggs, omelettes, or avocado toast with colorful radish microgreens
      - **Yogurt bowls**: Add a sprinkle of sunflower microgreens for a nutty crunch
      
      ## Lunch Solutions
      
      Microgreens make the perfect lunchbox addition:
      
      - **Sandwiches**: Replace lettuce with a mix of microgreens for superior nutrition
      - **Wraps**: Roll microgreens into your favorite wrap with hummus
      - **Grain bowls**: Top your Buddha bowl with a generous handful of mixed greens
      
      ## Dinner Enhancements
      
      Finish your day strong with microgreen-enhanced dinners:
      
      - **Pasta**: Toss microgreens into hot pasta just before serving
      - **Soups**: Use as a fresh garnish on any soup
      - **Protein**: Top fish, chicken, or steak with peppery radish microgreens
      
      ## Pro Tips
      
      1. **Store properly**: Keep in the fridge, sealed in original container
      2. **No washing needed**: Our plasma-cleaned greens are ready to eat
      3. **Add last**: Add microgreens just before serving to preserve nutrients
      4. **Start mild**: If you're new to microgreens, start with sweeter varieties like pea shoots
    `,
  },
  "5-fast-recipes-under-5-minutes": {
    title: "5 Fast Recipes Under 5 Minutes",
    excerpt: "Quick and delicious recipes featuring our fresh microgreens.",
    category: "Recipes",
    date: "November 20, 2024",
    readTime: "4 min read",
    content: `
      Short on time but want to eat well? These five recipes take less than 5 minutes and pack a serious nutritional punch.

      ## 1. Microgreen Avocado Toast
      
      Toast bread, mash half an avocado on top, squeeze lemon, add salt and pepper, then pile on a generous handful of radish microgreens. The peppery kick perfectly complements the creamy avocado.
      
      ## 2. Quick Pea Shoot Salad
      
      Toss pea shoots with olive oil, lemon juice, shaved parmesan, and a pinch of salt. Simple, elegant, and delicious.
      
      ## 3. Microgreen Cream Cheese Bagel
      
      Spread cream cheese on a toasted bagel and top with sunflower microgreens. The nutty crunch is addictive.
      
      ## 4. Instant Ramen Upgrade
      
      Make your instant ramen, then top with a soft-boiled egg and a big handful of mixed microgreens. Restaurant-quality in minutes.
      
      ## 5. Microgreen Hummus Wrap
      
      Spread hummus on a tortilla, add sliced cucumber, and load up with basil microgreens. Roll and enjoy.
      
      ## The Key to Quick Meals
      
      The secret to fast, healthy eating is having quality ingredients ready to go. With Jineau microgreens in your fridge, you're always minutes away from a nutritious meal.
    `,
  },
  "plasma-clean-farming": {
    title: "Behind the Scenes: Plasma-Clean Farming",
    excerpt: "Learn how cold-plasma technology keeps your greens safe without chemicals.",
    category: "Farm Life",
    date: "November 15, 2024",
    readTime: "6 min read",
    content: `
      At Jineau, we use cold-plasma technology to sanitize our microgreens. Here's what that means and why it matters.

      ## What is Cold Plasma?
      
      Cold plasma is an ionized gas created at room temperature. When applied to produce, it effectively eliminates bacteria, mold, and pathogens without heat, chemicals, or water.
      
      ## Why We Use It
      
      Traditional produce washing uses water and sometimes chemical sanitizers. This creates several problems:
      
      - **Water waste**: Traditional washing uses significant amounts of water
      - **Moisture damage**: Wet greens spoil faster
      - **Chemical residue**: Some sanitizers leave traces on produce
      
      Cold plasma solves all these issues while being equally or more effective at sanitization.
      
      ## The Benefits for You
      
      When you receive Jineau microgreens:
      
      1. **No washing required**: They're ready to eat straight from the container
      2. **Longer shelf life**: Dry greens stay fresh 6-10 days
      3. **No chemical residue**: Pure, clean greens
      4. **Better taste**: No waterlogged or damaged leaves
      
      ## Our Commitment
      
      Cold-plasma technology is just one way we're combining ancient wisdom with modern science. Our ancestors knew the value of fresh, clean food—we're just using better tools to deliver it.
    `,
  },
  "benefits-of-basil-microgreens": {
    title: "The Surprising Benefits of Basil Microgreens",
    excerpt: "Discover why basil microgreens pack more punch than mature basil leaves.",
    category: "Health",
    date: "November 10, 2024",
    readTime: "4 min read",
    content: `
      Basil microgreens aren't just baby basil—they're a nutritional powerhouse that outperforms their mature counterparts.

      ## Nutrient Density
      
      Research shows that basil microgreens contain:
      
      - **Up to 40x more nutrients** than mature basil leaves
      - High concentrations of vitamins K, C, and E
      - Rich in antioxidants like beta-carotene
      - Significant amounts of essential minerals
      
      ## Flavor Profile
      
      Basil microgreens offer:
      
      - Intense, concentrated basil flavor
      - Sweet, aromatic notes
      - Tender, delicate texture
      - Perfect for finishing dishes
      
      ## Best Uses
      
      - **Caprese salad**: Replace or supplement mature basil
      - **Pasta finishing**: Add just before serving
      - **Pizza topping**: After the pizza comes out of the oven
      - **Pesto alternative**: Blend for an intense, fresh pesto
      - **Cocktails**: Muddle into summer drinks
      
      ## Growing Process
      
      Our basil microgreens are harvested at 10-12 days when nutrient content peaks. They're then plasma-cleaned and packed for Saturday delivery.
    `,
  },
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }))
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <>
      <article className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <a href="/" className="hover:text-brand-primary">Home</a>
            <span>/</span>
            <a href="/blog" className="hover:text-brand-primary">Blog</a>
            <span>/</span>
            <span className="text-gray-900">{post.title}</span>
          </nav>

          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-brand-mist/30 text-brand-primary text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-gray-400 text-sm">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>
            <p className="text-gray-400">{post.date}</p>
          </header>

          <div className="aspect-video bg-gradient-to-br from-brand-mint/20 to-brand-mist/30 rounded-2xl flex items-center justify-center mb-12">
            <MarmotMascot size="xl" />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
            {post.content.split("\n").map((paragraph, index) => {
              if (paragraph.startsWith("## ")) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace("## ", "")}
                  </h2>
                )
              }
              if (paragraph.startsWith("- **")) {
                const match = paragraph.match(/- \*\*(.+?)\*\*: (.+)/)
                if (match) {
                  return (
                    <li key={index} className="ml-4">
                      <strong>{match[1]}</strong>: {match[2]}
                    </li>
                  )
                }
              }
              if (paragraph.startsWith("- ")) {
                return (
                  <li key={index} className="ml-4">
                    {paragraph.replace("- ", "")}
                  </li>
                )
              }
              if (paragraph.match(/^\d+\. \*\*/)) {
                const match = paragraph.match(/^\d+\. \*\*(.+?)\*\*: (.+)/)
                if (match) {
                  return (
                    <li key={index} className="ml-4">
                      <strong>{match[1]}</strong>: {match[2]}
                    </li>
                  )
                }
              }
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                )
              }
              return null
            })}
          </div>

          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <MarmotMascot size="sm" />
                <div>
                  <p className="font-medium text-gray-900">The Jineau Team</p>
                  <p className="text-sm text-gray-500">Growing fresh greens on the South Shore</p>
                </div>
              </div>
              <Button href="/blog" variant="outline">
                ← Back to Blog
              </Button>
            </div>
          </footer>
        </div>
      </article>

      <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Try Fresh Microgreens?</h2>
          <p className="text-white/90 mb-6">
            Start your weekly subscription and taste the difference.
          </p>
          <Button href="/subscribe" variant="gold">
            Start Subscription
          </Button>
        </div>
      </section>
    </>
  )
}

