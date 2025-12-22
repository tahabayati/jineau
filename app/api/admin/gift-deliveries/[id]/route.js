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
      const validStatuses = ["pending", "scheduled", "delivered", "cancelled"]
      if (!validStatuses.includes(data.status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 })
      }
      updateData.status = data.status
    }
    
    if (data.deliveryDate !== undefined) {
      updateData.deliveryDate = data.deliveryDate ? new Date(data.deliveryDate) : null
    }
    
    if (data.notes !== undefined) {
      updateData.notes = data.notes
    }

    const delivery = await GiftDelivery.findByIdAndUpdate(id, updateData, { new: true })
      .populate("subscriber", "name email")
      .populate("seniorCenter")
    
    if (!delivery) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(delivery)
  } catch (error) {
    console.error("Error updating gift delivery:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

