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
      const validStatuses = ["open", "in-progress", "resolved", "closed"]
      if (!validStatuses.includes(data.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 })
      }
      updateData.status = data.status
      
      if (data.status === "resolved" || data.status === "closed") {
        const existingRequest = await SupportRequest.findById(id)
        if (existingRequest && !existingRequest.resolvedAt) {
          updateData.resolvedAt = new Date()
        }
      }
    }
    
    if (data.adminNotes !== undefined) {
      updateData.adminNotes = data.adminNotes
    }

    const request_doc = await SupportRequest.findByIdAndUpdate(id, updateData, { new: true })
      .populate("user", "name email")
      .populate("order")
    
    if (!request_doc) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(request_doc)
  } catch (error) {
    console.error("Error updating support request:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

