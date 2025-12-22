import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import SeniorCenter from "@/models/SeniorCenter"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function GET() {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const centers = await SeniorCenter.find().sort({ name: 1 })
    return NextResponse.json(centers)
  } catch (error) {
    console.error("Error fetching senior centers:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    await dbConnect()
    const center = await SeniorCenter.create(data)
    return NextResponse.json(center, { status: 201 })
  } catch (error) {
    console.error("Error creating senior center:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

