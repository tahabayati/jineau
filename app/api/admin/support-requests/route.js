import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import SupportRequest from "@/models/SupportRequest"

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
    const type = searchParams.get("type")
    const limit = parseInt(searchParams.get("limit") || "50")

    const query = {}
    if (status) query.status = status
    if (type) query.type = type

    const requests = await SupportRequest.find(query)
      .populate("user", "name email")
      .populate("order")
      .sort({ createdAt: -1 })
      .limit(limit)

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching support requests:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

