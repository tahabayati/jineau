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

export async function PUT(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = await auth()
    const { id } = await params
    const data = await request.json()
    
    await dbConnect()
    
    const current = await SiteContent.findById(id).lean()
    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    if (data.key && data.key.trim() !== current.key) {
      const existing = await SiteContent.findOne({ key: data.key.trim() }).lean()
      if (existing) {
        return NextResponse.json({ error: "A content entry with this key already exists. Cannot change to a duplicate key." }, { status: 409 })
      }
    }
    
    const updateData = {
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
    }

    const item = await SiteContent.findByIdAndUpdate(id, updateData, { new: true })

    revalidateTag("site-content")
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json(item)
  } catch (error) {
    console.error("Error updating site content:", error)
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
    
    const item = await SiteContent.findByIdAndDelete(id)
    
    if (!item) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    revalidateTag("site-content")
    
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
    console.error("Error deleting site content:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

