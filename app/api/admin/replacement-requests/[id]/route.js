import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import ReplacementRequest from "@/models/ReplacementRequest"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function PATCH(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()
    
    await dbConnect()
    
    const updateData = {}
    
    if (data.status) {
      const validStatuses = ["pending", "approved", "applied", "rejected"]
      if (!validStatuses.includes(data.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 })
      }
      updateData.status = data.status
    }
    
    if (data.adminNotes !== undefined) {
      updateData.adminNotes = data.adminNotes
    }
    
    if (data.appliedToOrder !== undefined) {
      updateData.appliedToOrder = data.appliedToOrder || null
    }

    const request_doc = await ReplacementRequest.findByIdAndUpdate(id, updateData, { new: true })
      .populate("user", "name email")
    
    if (!request_doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(request_doc)
  } catch (error) {
    console.error("Error updating replacement request:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

