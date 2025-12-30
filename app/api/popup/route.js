import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Popup from "@/models/Popup"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Public endpoint to get active popup
export async function GET() {
  try {
    await dbConnect()
    
    const popup = await Popup.findOne({ isActive: true })
      .select('_id text')
      .lean()
    
    if (!popup) {
      return NextResponse.json(null, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
        }
      })
    }

    return NextResponse.json({
      _id: popup._id.toString(),
      text: popup.text,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    })
  } catch (error) {
    console.error("Error fetching popup:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

