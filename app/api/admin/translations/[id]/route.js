import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Translation from "@/models/Translation"
import { revalidateTag } from "next/cache"

export const runtime = "nodejs"

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")
  return adminSession?.value === "authenticated"
}

// GET - Fetch single translation
export async function GET(request, { params }) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const { id } = await params
    
    const translation = await Translation.findById(id).lean()
    
    if (!translation) {
      return NextResponse.json({ error: "Translation not found" }, { status: 404 })
    }
    
    return NextResponse.json(translation)
  } catch (error) {
    console.error("Error fetching translation:", error)
    return NextResponse.json({ error: "Failed to fetch translation" }, { status: 500 })
  }
}

// PATCH - Update a translation
export async function PATCH(request, { params }) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const { id } = await params
    const data = await request.json()
    
    const translation = await Translation.findById(id)
    
    if (!translation) {
      return NextResponse.json({ error: "Translation not found" }, { status: 404 })
    }
    
    // Update fields
    if (data.values) {
      translation.values = {
        en: data.values.en ?? translation.values.en,
        fr: data.values.fr ?? translation.values.fr,
        fa: data.values.fa ?? translation.values.fa,
      }
    }
    
    if (data.description !== undefined) {
      translation.description = data.description
    }
    
    if (data.namespace) {
      translation.namespace = data.namespace
    }
    
    if (data.key) {
      translation.key = data.key
    }
    
    await translation.save()
    
    // Revalidate translations cache
    revalidateTag("translations")
    
    return NextResponse.json(translation)
  } catch (error) {
    console.error("Error updating translation:", error)
    return NextResponse.json({ error: "Failed to update translation" }, { status: 500 })
  }
}

// DELETE - Delete a translation
export async function DELETE(request, { params }) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const { id } = await params
    
    const translation = await Translation.findByIdAndDelete(id)
    
    if (!translation) {
      return NextResponse.json({ error: "Translation not found" }, { status: 404 })
    }
    
    // Revalidate translations cache
    revalidateTag("translations")
    
    return NextResponse.json({ message: "Translation deleted" })
  } catch (error) {
    console.error("Error deleting translation:", error)
    return NextResponse.json({ error: "Failed to delete translation" }, { status: 500 })
  }
}

