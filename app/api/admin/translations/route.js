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

// GET - Fetch all translations
export async function GET(request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const namespace = searchParams.get("namespace")
    const search = searchParams.get("search")
    
    let query = {}
    
    if (namespace) {
      query.namespace = namespace
    }
    
    if (search) {
      query.$or = [
        { key: { $regex: search, $options: "i" } },
        { "values.en": { $regex: search, $options: "i" } },
        { "values.fr": { $regex: search, $options: "i" } },
        { "values.fa": { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }
    
    const translations = await Translation.find(query)
      .sort({ namespace: 1, key: 1 })
      .lean()
    
    // Also get list of unique namespaces for filter dropdown
    const namespaces = await Translation.distinct("namespace")
    
    return NextResponse.json({ 
      translations, 
      namespaces: namespaces.sort() 
    })
  } catch (error) {
    console.error("Error fetching translations:", error)
    return NextResponse.json({ error: "Failed to fetch translations" }, { status: 500 })
  }
}

// POST - Create a new translation
export async function POST(request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const data = await request.json()
    
    const { namespace, key, values, description } = data
    
    if (!namespace || !key) {
      return NextResponse.json(
        { error: "Namespace and key are required" },
        { status: 400 }
      )
    }
    
    // Check if translation already exists
    const existing = await Translation.findOne({ namespace, key })
    if (existing) {
      return NextResponse.json(
        { error: "Translation with this namespace and key already exists" },
        { status: 400 }
      )
    }
    
    const translation = await Translation.create({
      namespace,
      key,
      values: values || { en: "", fr: "", fa: "" },
      description: description || "",
    })
    
    // Revalidate translations cache
    revalidateTag("translations")
    
    return NextResponse.json(translation, { status: 201 })
  } catch (error) {
    console.error("Error creating translation:", error)
    return NextResponse.json({ error: "Failed to create translation" }, { status: 500 })
  }
}

// PUT - Bulk update translations (for import)
export async function PUT(request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const data = await request.json()
    
    const { translations } = data
    
    if (!Array.isArray(translations)) {
      return NextResponse.json(
        { error: "translations must be an array" },
        { status: 400 }
      )
    }
    
    const results = {
      created: 0,
      updated: 0,
      errors: []
    }
    
    for (const t of translations) {
      try {
        const existing = await Translation.findOne({ 
          namespace: t.namespace, 
          key: t.key 
        })
        
        if (existing) {
          await Translation.updateOne(
            { _id: existing._id },
            { 
              $set: { 
                values: t.values,
                description: t.description || existing.description 
              } 
            }
          )
          results.updated++
        } else {
          await Translation.create(t)
          results.created++
        }
      } catch (err) {
        results.errors.push({
          namespace: t.namespace,
          key: t.key,
          error: err.message
        })
      }
    }
    
    // Revalidate translations cache
    revalidateTag("translations")
    
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error bulk updating translations:", error)
    return NextResponse.json({ error: "Failed to bulk update translations" }, { status: 500 })
  }
}

