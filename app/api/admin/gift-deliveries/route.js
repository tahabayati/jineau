import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import GiftDelivery from "@/models/GiftDelivery"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function GET(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = parseInt(searchParams.get("limit") || "50")

    const query = {}
    if (status) query.status = status

    const deliveries = await GiftDelivery.find(query)
      .populate("subscriber", "name email")
      .populate("seniorCenter")
      .sort({ createdAt: -1 })
      .limit(limit)

    return NextResponse.json(deliveries)
  } catch (error) {
    console.error("Error fetching gift deliveries:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

