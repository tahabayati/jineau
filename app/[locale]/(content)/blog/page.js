import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import MarmotMascot from "@/components/MarmotMascot"
import AuroraBackground from "@/components/AuroraBackground"
import Image from "next/image"
import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"

export const runtime = 'nodejs'

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = { en: "The Jineau Journal", fr: "Le Journal Jineau", fa: "مجله ژینو" }
  return { title: titles[locale] || titles.en }
}

async function getBlogPosts(locale) {
  try {
    await dbConnect()
    const posts = await BlogPost.find({ published: true })
      .sort({ publishedDate: -1 })
      .lean()
    
    return posts.map(post => ({
      slug: post.slug,
      title: post.title?.[locale] || post.title?.en || "",
      excerpt: post.excerpt?.[locale] || post.excerpt?.en || "",
      category: post.category?.[locale] || post.category?.en || "",
      date: post.publishedDate,
      readTime: post.readTime || "5 min",
      imageUrl: post.imageUrl || null,
    }))
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export default async function BlogPage({ params }) {
  const { locale } = await params
  const blogPosts = await getBlogPosts(locale)
  const t = await getTranslations("blog")
  const tCommon = await getTranslations("common")

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AuroraBackground variant="home" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative images */}
            <div className="absolute top-10 right-0 w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 animate-float z-0 pointer-events-none opacity-30" style={{ animationDelay: '0s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.15)]">
                <Image 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  width={128} 
                  height={128}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 animate-float z-0 pointer-events-none opacity-25" style={{ animationDelay: '-1.5s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.12)]">
                <Image 
                  src="/jineau-home-images/1-09.svg" 
                  alt="" 
                  width={112} 
                  height={112}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="text-center mb-8 md:mb-12 relative z-10">
              <span className="inline-block glass px-4 py-2 md:px-5 md:py-2.5 rounded-full text-brand-mint text-xs md:text-sm font-medium mb-4 md:mb-6 tracking-wide">
                {t("title")}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("title")}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("subtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Background decorative image */}
            <div className="absolute bottom-10 left-1/4 w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36 animate-float z-0 pointer-events-none opacity-30" style={{ animationDelay: '-3s' }} aria-hidden="true">
              <div className="w-full h-full drop-shadow-[0_0_15px_rgba(233,196,106,0.15)]">
                <Image 
                  src="/jineau-home-images/1-07.svg" 
                  alt="" 
                  width={144} 
                  height={144}
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group glass-card rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-video bg-gradient-to-br from-brand-mint/20 to-brand-primary/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-mint/10 to-brand-primary/10 opacity-50" />
                    <div className="relative z-10">
                      <MarmotMascot size="md" />
                    </div>
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 mb-3 md:mb-4">
                      <span className="px-2 py-1 md:px-3 md:py-1.5 glass text-brand-mint text-xs md:text-sm font-medium rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs md:text-sm text-white/60">{post.readTime}</span>
                    </div>
                    <h2 className="font-bold text-lg md:text-xl text-white group-hover:text-brand-gold transition-colors mb-2 md:mb-3 drop-shadow-md">
                      {post.title}
                    </h2>
                    <p className="text-white/75 text-sm md:text-base mb-4 md:mb-6">{post.excerpt}</p>
                    <time className="text-xs md:text-sm text-white/50">
                      {new Date(post.date).toLocaleDateString(locale === "fa" ? "fa-IR" : locale === "fr" ? "fr-CA" : "en-CA", {
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

        {/* Final CTA */}
        <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="glass-strong rounded-3xl md:rounded-[48px] p-6 sm:p-8 md:p-10 lg:p-14 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 drop-shadow-xl px-2">
                {t("readyToTry")}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/85 mb-7 md:mb-9 max-w-xl mx-auto leading-relaxed drop-shadow-lg px-2">
                {t("readyToTryDesc")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link
                  href="/subscribe"
                  className="group inline-flex items-center justify-center gap-2 md:gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold text-sm md:text-base rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap"
                >
                  {tCommon("startSubscription")}
                  <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
