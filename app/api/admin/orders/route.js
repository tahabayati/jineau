import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"

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
    const statusFilter = searchParams.get('status')
    const typeFilter = searchParams.get('type')
    
    // Build query
    const query = {}
    if (statusFilter) {
      query.status = statusFilter
    }
    if (typeFilter) {
      query.type = typeFilter
    }

    // Fetch all orders with user information
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name')
      .populate('giftDelivery')
      .populate('replacementRequest')
      .populate('giftOneCenterId', 'name')
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

