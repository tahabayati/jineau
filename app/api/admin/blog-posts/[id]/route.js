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

export async function PUT(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()
    
    await dbConnect()
    
    const current = await BlogPost.findById(id).lean()
    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    let slug = data.slug?.trim() || current.slug
    
    // If slug is being changed, check for conflicts
    if (slug !== current.slug) {
      const existing = await BlogPost.findOne({ slug }).lean()
      if (existing) {
        return NextResponse.json({ error: "A blog post with this slug already exists. Cannot change to a duplicate slug." }, { status: 409 })
      }
    }
    
    const updateData = {
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
      publishedDate: data.publishedDate ? new Date(data.publishedDate) : current.publishedDate,
      readTime: data.readTime || "5 min",
      published: data.published !== undefined ? data.published : current.published,
      imageUrl: data.imageUrl || "",
    }

    const post = await BlogPost.findByIdAndUpdate(id, updateData, { new: true })

    revalidateTag("blog-posts")
    revalidatePath("/blog", "page")
    if (post.slug) {
      revalidatePath(`/blog/${post.slug}`, "page")
    }
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await dbConnect()
    
    const post = await BlogPost.findByIdAndDelete(id)
    
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    revalidateTag("blog-posts")
    revalidatePath("/blog", "page")
    if (post.slug) {
      revalidatePath(`/blog/${post.slug}`, "page")
    }
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json({ message: "Deleted" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

