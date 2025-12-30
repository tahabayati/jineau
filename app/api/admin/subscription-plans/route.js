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

export async function GET(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const plans = await SubscriptionPlan.find({})
      .sort({ packsPerWeek: 1 })
      .lean()

    return NextResponse.json(plans)
  } catch (error) {
    console.error("Error fetching subscription plans:", error)
    return NextResponse.json({ 
      error: "Failed to fetch subscription plans",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    
    if (!data.name || !data.slug || !data.packsPerWeek || data.pricePerWeek === undefined) {
      return NextResponse.json({ error: "Name, slug, packsPerWeek, and pricePerWeek are required" }, { status: 400 })
    }

    await dbConnect()
    
    // Check if slug already exists
    const existing = await SubscriptionPlan.findOne({ slug: data.slug.trim() }).lean()
    if (existing) {
      return NextResponse.json({ error: "A subscription plan with this slug already exists" }, { status: 409 })
    }

    // Create subscription plan
    const plan = await SubscriptionPlan.create({
      name: data.name.trim(),
      slug: data.slug.trim(),
      packsPerWeek: data.packsPerWeek,
      pricePerWeek: data.pricePerWeek,
      salePricePerWeek: data.salePricePerWeek || null,
      stripePriceId: data.stripePriceId || "",
      description: data.description || "",
      active: data.active !== undefined ? data.active : true,
    })

    revalidateTag("subscription-plans")
    revalidatePath("/subscribe", "page")

    return NextResponse.json(plan, { status: 201 })
  } catch (error) {
    console.error("Error creating subscription plan:", error)
    return NextResponse.json({ error: "Failed to create subscription plan" }, { status: 500 })
  }
}

