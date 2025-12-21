import { NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import SiteContent from "@/models/SiteContent"
import { getPathsToRevalidate } from "@/lib/revalidation"

export const runtime = 'nodejs'

async function isAdmin() {
  const session = await auth()
  if (!session) return false
  
  await dbConnect()
  const user = await User.findById(session.user.id)
  return user?.isAdmin === true
}

export async function GET(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q") || ""
    const group = searchParams.get("group") || ""

    const query = {}
    
    if (group) {
      query["meta.group"] = group
    }
    
    if (q) {
      query.$or = [
        { key: { $regex: q, $options: "i" } },
        { "meta.label": { $regex: q, $options: "i" } },
      ]
    }

    const items = await SiteContent.find(query)
      .populate("updatedBy", "name email")
      .sort({ key: 1 })
      .lean()

    return NextResponse.json(items)
  } catch (error) {
    console.error("Error fetching site content:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await auth()
    const data = await request.json()
    
    if (!data.key || !data.key.trim()) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 })
    }

    await dbConnect()
    
    const existing = await SiteContent.findOne({ key: data.key.trim() }).lean()
    if (existing) {
      return NextResponse.json({ error: "A content entry with this key already exists. Please use a unique key." }, { status: 409 })
    }

    const item = await SiteContent.create({
      key: data.key.trim(),
      type: data.type || "text",
      value: {
        en: data.value?.en || "",
        fr: data.value?.fr || "",
        fa: data.value?.fa || "",
      },
      meta: {
        group: data.meta?.group || "",
        label: data.meta?.label || "",
      },
      updatedBy: session.user.id,
    })

    revalidateTag("site-content")
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error("Error creating site content:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

