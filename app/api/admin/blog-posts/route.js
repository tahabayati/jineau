import { NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import { getPathsToRevalidate } from "@/lib/revalidation"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

export async function GET(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q") || ""
    const published = searchParams.get("published")

    const query = {}
    
    if (published !== null && published !== undefined) {
      query.published = published === "true"
    }
    
    if (q) {
      query.$or = [
        { slug: { $regex: q, $options: "i" } },
        { "title.en": { $regex: q, $options: "i" } },
        { "title.fr": { $regex: q, $options: "i" } },
        { "title.fa": { $regex: q, $options: "i" } },
        { "category.en": { $regex: q, $options: "i" } },
      ]
    }

    const posts = await BlogPost.find(query)
      .populate("updatedBy", "name email")
      .sort({ publishedDate: -1 })
      .lean()

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    
    let slug = data.slug?.trim() || ""
    
    // Generate slug from title if not provided
    if (!slug && data.title?.en) {
      slug = slugify(data.title.en)
    }
    
    if (!slug) {
      return NextResponse.json({ error: "Slug or title is required" }, { status: 400 })
    }

    await dbConnect()
    
    // Check if slug already exists
    const existing = await BlogPost.findOne({ slug }).lean()
    if (existing) {
      return NextResponse.json({ error: "A blog post with this slug already exists. Please use a different slug." }, { status: 409 })
    }

    const post = await BlogPost.create({
      slug,
      title: {
        en: data.title?.en || "",
        fr: data.title?.fr || "",
        fa: data.title?.fa || "",
      },
      excerpt: {
        en: data.excerpt?.en || "",
        fr: data.excerpt?.fr || "",
        fa: data.excerpt?.fa || "",
      },
      content: {
        en: data.content?.en || "",
        fr: data.content?.fr || "",
        fa: data.content?.fa || "",
      },
      category: {
        en: data.category?.en || "",
        fr: data.category?.fr || "",
        fa: data.category?.fa || "",
      },
      publishedDate: data.publishedDate ? new Date(data.publishedDate) : new Date(),
      readTime: data.readTime || "5 min",
      published: data.published || false,
      imageUrl: data.imageUrl || "",
    })

    revalidateTag("blog-posts")
    revalidatePath("/blog", "page")
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

