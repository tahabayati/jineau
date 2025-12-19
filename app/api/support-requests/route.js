import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import SupportRequest from "@/models/SupportRequest"

export const runtime = 'nodejs'

export async function GET() {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const requests = await SupportRequest.find({ user: session.user.id })
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json(requests)
  } catch (error) {
    console.error("Error fetching support requests:", error)
    return NextResponse.json({ error: "Failed to fetch support requests" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, message, orderId } = await request.json()

    if (!type || !message) {
      return NextResponse.json({ error: "Type and message are required" }, { status: 400 })
    }

    await dbConnect()

    const supportRequest = await SupportRequest.create({
      user: session.user.id,
      type,
      message,
      order: orderId || null,
      status: "open",
    })

    return NextResponse.json(supportRequest, { status: 201 })
  } catch (error) {
    console.error("Error creating support request:", error)
    return NextResponse.json({ error: "Failed to create support request" }, { status: 500 })
  }
}

