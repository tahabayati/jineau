import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"
import MarmotMascot from "@/components/MarmotMascot"
import Button from "@/components/Button"
import Image from "next/image"
import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"

export const runtime = 'nodejs'

async function getBlogPost(slug) {
  try {
    await dbConnect()
    const post = await BlogPost.findOne({ slug, published: true }).lean()
    return post
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

async function getAllBlogPostSlugs() {
  try {
    await dbConnect()
    const posts = await BlogPost.find({ published: true }).select("slug").lean()
    return posts.map((post) => ({ slug: post.slug }))
  } catch (error) {
    console.error("Error fetching blog post slugs:", error)
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: "Post Not Found" }
  const title = post.title?.en || "Blog Post"
  return { title }
}

export async function generateStaticParams() {
  return await getAllBlogPostSlugs()
}

export default async function BlogPostPage({ params }) {
  const { slug, locale } = await params
  const post = await getBlogPost(slug)
  const t = await getTranslations("blog")
  const tCommon = await getTranslations("common")

  if (!post) {
    notFound()
  }

  // Get translated content based on locale
  const postTitle = post.title?.[locale] || post.title?.en || ""
  const postContent = post.content?.[locale] || post.content?.en || ""
  const postCategory = post.category?.[locale] || post.category?.en || ""
  const postDate = post.publishedDate
  const postReadTime = post.readTime || "5 min"

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

          {post.imageUrl ? (
            <div className="aspect-video relative rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.imageUrl}
                alt={postTitle}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-video bg-gradient-to-br from-brand-mint/30 to-brand-mist/40 rounded-2xl flex items-center justify-center mb-8">
              <MarmotMascot size="xl" />
            </div>
          )}

          <div className="flex items-center gap-4 mb-6">
            {postCategory && (
              <span className="px-3 py-1 bg-brand-mist/30 text-brand-primary text-sm font-medium rounded-full">
                {postCategory}
              </span>
            )}
            <span className="text-sm text-gray-500">{postReadTime}</span>
            <time className="text-sm text-gray-400">
              {new Date(postDate).toLocaleDateString(
                locale === "fa" ? "fa-IR" : locale === "fr" ? "fr-CA" : "en-CA",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </time>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {postTitle}
          </h1>

          <div className="prose prose-lg max-w-none">
            {postContent.split("\n\n").map((paragraph, i) => {
              if (paragraph.trim().startsWith("**") && paragraph.trim().endsWith("**")) {
                return (
                  <h2 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4">
                    {paragraph.replace(/\*\*/g, "")}
                  </h2>
                )
              }
              // Replace "Jineau" with gradient text
              const parts = paragraph.split(/(Jineau|jineau)/gi)
              return (
                <p key={i} className="text-gray-600 mb-4">
                  {parts.map((part, j) => 
                    /^Jineau$/i.test(part) ? (
                      <span key={j} className="gradient-text font-bold">{part}</span>
                    ) : (
                      part
                    )
                  )}
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
