import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Popup from "@/models/Popup"

export const runtime = 'nodejs'

// Public endpoint to get active popup
export async function GET() {
  try {
    await dbConnect()
    
    const popup = await Popup.findOne({ isActive: true }).lean()
    
    if (!popup) {
      return NextResponse.json(null)
    }

    return NextResponse.json({
      _id: popup._id.toString(),
      text: popup.text,
    })
  } catch (error) {
    console.error("Error fetching popup:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

