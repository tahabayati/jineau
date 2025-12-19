import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import ReplacementRequest from "@/models/ReplacementRequest"
import { freshSwapConfig } from "@/lib/config"

export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const requests = await ReplacementRequest.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching replacements:", error)
    return NextResponse.json({ error: "Failed to fetch replacements" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { weekStartDate, type, reason } = await request.json()

    await dbConnect()

    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const startOfMonth = new Date(currentYear, currentMonth, 1)
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59)

    const monthlyCount = await ReplacementRequest.countDocuments({
      user: session.user.id,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    })

    if (monthlyCount >= freshSwapConfig.maxPerMonth) {
      return NextResponse.json(
        { error: `Monthly limit of ${freshSwapConfig.maxPerMonth} replacements reached` },
        { status: 400 }
      )
    }

    const weekStart = new Date(weekStartDate)
    const existingRequest = await ReplacementRequest.findOne({
      user: session.user.id,
      weekStartDate: {
        $gte: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate()),
        $lt: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7),
      },
    })

    if (existingRequest) {
      return NextResponse.json(
        { error: "A replacement request already exists for this week" },
        { status: 400 }
      )
    }

    const replacementRequest = await ReplacementRequest.create({
      user: session.user.id,
      weekStartDate,
      type: type || "fresh-swap",
      reason,
      status: "pending",
    })

    return NextResponse.json(replacementRequest, { status: 201 })
  } catch (error) {
    console.error("Error creating replacement:", error)
    return NextResponse.json({ error: "Failed to create replacement request" }, { status: 500 })
  }
}

