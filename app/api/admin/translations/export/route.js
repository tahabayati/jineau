import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Translation from "@/models/Translation"

export const runtime = "nodejs"

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get("admin_session")
  return adminSession?.value === "authenticated"
}

// GET - Export translations as JSON for a specific locale
export async function GET(request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const locale = searchParams.get("locale") || "en"
    const format = searchParams.get("format") || "nested" // "nested" or "flat"
    
    const translations = await Translation.find({})
      .sort({ namespace: 1, key: 1 })
      .lean()
    
    let result
    
    if (format === "nested") {
      // Nested format matching the messages/*.json structure
      result = {}
      translations.forEach((t) => {
        if (!result[t.namespace]) {
          result[t.namespace] = {}
        }
        result[t.namespace][t.key] = t.values[locale] || t.values.en || ""
      })
    } else {
      // Flat format with dot notation keys
      result = {}
      translations.forEach((t) => {
        result[`${t.namespace}.${t.key}`] = t.values[locale] || t.values.en || ""
      })
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error exporting translations:", error)
    return NextResponse.json({ error: "Failed to export translations" }, { status: 500 })
  }
}

