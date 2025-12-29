import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import { unstable_cache } from "next/cache"

export const runtime = 'nodejs'

async function getCachedPost(slug) {
  await dbConnect()
  const post = await BlogPost.findOne({ slug, published: true }).lean()
  return post
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params
    const post = await getCachedPost(slug)
    
    if (!post) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

