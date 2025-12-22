import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Translation from "@/models/Translation"
import { revalidateTag } from "next/cache"

// Import the JSON files directly
import enMessages from "@/messages/en.json"
import frMessages from "@/messages/fr.json"
import faMessages from "@/messages/fa.json"

export const runtime = "nodejs"

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")
  return adminSession?.value === "authenticated"
}

// POST - Seed translations from JSON files
export async function POST(request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const overwrite = searchParams.get("overwrite") === "true"
    
    const results = {
      created: 0,
      updated: 0,
      skipped: 0,
      errors: []
    }
    
    // Process each namespace in the English messages (source of truth for keys)
    for (const [namespace, keys] of Object.entries(enMessages)) {
      if (typeof keys === "object" && keys !== null) {
        for (const [key, enValue] of Object.entries(keys)) {
          try {
            const frValue = frMessages[namespace]?.[key] || ""
            const faValue = faMessages[namespace]?.[key] || ""
            
            const existing = await Translation.findOne({ namespace, key })
            
            if (existing) {
              if (overwrite) {
                await Translation.updateOne(
                  { _id: existing._id },
                  {
                    $set: {
                      values: {
                        en: enValue,
                        fr: frValue,
                        fa: faValue,
                      },
                    },
                  }
                )
                results.updated++
              } else {
                results.skipped++
              }
            } else {
              await Translation.create({
                namespace,
                key,
                values: {
                  en: enValue,
                  fr: frValue,
                  fa: faValue,
                },
                description: "",
              })
              results.created++
            }
          } catch (err) {
            results.errors.push({
              namespace,
              key,
              error: err.message,
            })
          }
        }
      }
    }
    
    // Revalidate translations cache
    revalidateTag("translations")
    
    return NextResponse.json({
      message: "Seed completed",
      ...results,
    })
  } catch (error) {
    console.error("Error seeding translations:", error)
    return NextResponse.json({ error: "Failed to seed translations" }, { status: 500 })
  }
}

// GET - Get status/count of translations
export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const count = await Translation.countDocuments()
    const namespaces = await Translation.distinct("namespace")
    
    // Count keys in JSON files for comparison
    let jsonKeyCount = 0
    for (const namespace of Object.keys(enMessages)) {
      if (typeof enMessages[namespace] === "object") {
        jsonKeyCount += Object.keys(enMessages[namespace]).length
      }
    }
    
    return NextResponse.json({
      dbCount: count,
      jsonCount: jsonKeyCount,
      namespaces: namespaces.sort(),
      isSynced: count === jsonKeyCount,
    })
  } catch (error) {
    console.error("Error getting translation status:", error)
    return NextResponse.json({ error: "Failed to get translation status" }, { status: 500 })
  }
}

