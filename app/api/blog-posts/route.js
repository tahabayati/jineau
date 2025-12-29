import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"
import { unstable_cache } from "next/cache"

export const runtime = 'nodejs'

const getCachedPosts = unstable_cache(
  async () => {
    await dbConnect()
    const posts = await BlogPost.find({ published: true })
      .sort({ publishedDate: -1 })
      .lean()
    return posts
  },
  ['blog-posts-published'],
  { 
    revalidate: 3600, // Revalidate every hour
    tags: ['blog-posts']
  }
)

export async function GET(request) {
  try {
    const posts = await getCachedPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

