import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import SubscriptionPlan from "@/models/SubscriptionPlan"

export const runtime = 'nodejs'

export async function GET(request) {
  try {
    await dbConnect()
    
    const plans = await SubscriptionPlan.find({ active: true })
      .sort({ packsPerWeek: 1 })
      .lean()

    return NextResponse.json(plans)
  } catch (error) {
    console.error("Error fetching subscription plans:", error)
    return NextResponse.json({ 
      error: "Failed to fetch subscription plans"
    }, { status: 500 })
  }
}

