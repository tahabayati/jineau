import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Order from "@/models/Order"

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
    
    // Fetch all users with their orders
    const users = await User.find({})
      .select('name email createdAt activeSubscription stripeCustomerId giftOneEnabled')
      .sort({ createdAt: -1 })
      .lean()

    // Fetch all orders grouped by user
    const orders = await Order.find({})
      .select('user type status total currency stripeSessionId stripeSubscriptionId createdAt deliveryDate isGift items')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
      .lean()

    // Group orders by user
    const ordersByUser = {}
    orders.forEach(order => {
      if (order.user) {
        const userId = order.user.toString()
        if (!ordersByUser[userId]) {
          ordersByUser[userId] = []
        }
        ordersByUser[userId].push(order)
      }
    })

    // Attach orders to users
    const usersWithOrders = users.map(user => {
      const userId = user._id.toString()
      const userOrders = ordersByUser[userId] || []
      
      // Find active subscription
      let activeSubscription = null
      if (user.activeSubscription) {
        const activeSubId = user.activeSubscription.toString()
        activeSubscription = userOrders.find(o => {
          const orderId = o._id?.toString ? o._id.toString() : String(o._id)
          return orderId === activeSubId
        }) || null
      }

      return {
        ...user,
        orders: userOrders,
        activeSubscription: activeSubscription,
        totalOrders: userOrders.length,
        subscriptionOrders: userOrders.filter(o => o.type === 'subscription'),
        oneOffOrders: userOrders.filter(o => o.type === 'one-off'),
      }
    })

    return NextResponse.json(usersWithOrders)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}

