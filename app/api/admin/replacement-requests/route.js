import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import ReplacementRequest from "@/models/ReplacementRequest"

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
    const userId = searchParams.get("userId")
    const limit = parseInt(searchParams.get("limit") || "50")

    const query = {}
    if (status) query.status = status
    if (userId) query.user = userId

    const requests = await ReplacementRequest.find(query)
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(limit)

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const startOfMonth = new Date(currentYear, currentMonth, 1)

    const monthlyCounts = await ReplacementRequest.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: "$user", count: { $sum: 1 } } },
    ])

    const countsMap = {}
    monthlyCounts.forEach((item) => {
      countsMap[item._id.toString()] = item.count
    })

    const requestsWithCounts = requests.map((req) => ({
      ...req.toObject(),
      monthlyCount: countsMap[req.user._id.toString()] || 0,
    }))

    return NextResponse.json(requestsWithCounts)
  } catch (error) {
    console.error("Error fetching replacement requests:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

