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

export async function PUT(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()
    await dbConnect()
    
    const center = await SeniorCenter.findByIdAndUpdate(id, data, { new: true })
    if (!center) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    return NextResponse.json(center)
  } catch (error) {
    console.error("Error updating senior center:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await dbConnect()
    
    const center = await SeniorCenter.findByIdAndDelete(id)
    if (!center) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    return NextResponse.json({ message: "Deleted" })
  } catch (error) {
    console.error("Error deleting senior center:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

