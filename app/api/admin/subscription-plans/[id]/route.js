import { NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import SubscriptionPlan from "@/models/SubscriptionPlan"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function GET(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { id } = await params

    const plan = await SubscriptionPlan.findById(id).lean()

    if (!plan) {
      return NextResponse.json(
        { error: "Subscription plan not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Error fetching subscription plan:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscription plan" },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { id } = await params
    const data = await request.json()

    const plan = await SubscriptionPlan.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })

    if (!plan) {
      return NextResponse.json(
        { error: "Subscription plan not found" },
        { status: 404 }
      )
    }

    revalidateTag("subscription-plans")
    revalidatePath("/subscribe", "page")

    return NextResponse.json(plan)
  } catch (error) {
    console.error("Error updating subscription plan:", error)
    return NextResponse.json(
      { error: "Failed to update subscription plan" },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { id } = await params

    const plan = await SubscriptionPlan.findByIdAndDelete(id)

    if (!plan) {
      return NextResponse.json(
        { error: "Subscription plan not found" },
        { status: 404 }
      )
    }

    revalidateTag("subscription-plans")
    revalidatePath("/subscribe", "page")

    return NextResponse.json({ message: "Subscription plan deleted successfully" })
  } catch (error) {
    console.error("Error deleting subscription plan:", error)
    return NextResponse.json(
      { error: "Failed to delete subscription plan" },
      { status: 500 }
    )
  }
}

