import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import SupportRequest from "@/models/SupportRequest"

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

