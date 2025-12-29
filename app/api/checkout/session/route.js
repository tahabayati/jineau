import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getStripe } from "@/lib/stripe"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import GiftDelivery from "@/models/GiftDelivery"
import SeniorCenter from "@/models/SeniorCenter"
import { getShippingFee, shippingConfig } from "@/lib/config"

export const runtime = 'nodejs'

if (typeof window === 'undefined') {
  if (!process.env.NEXTAUTH_URL) {
    throw new Error("NEXTAUTH_URL environment variable is not set. Please set it in your environment variables.")
  }
}

export async function POST(request) {
  try {
    const session = await auth()
    
    // Require authentication
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }
    
    const body = await request.json()
    const { items, mode, planSlug, giftOneEnabled, giftOneType, customCenter } = body

    const stripe = getStripe()
    
    let lineItems = []
    let checkoutMode = mode || "payment"
    
    if (mode === "subscription" && planSlug) {
      const plans = {
        "weekly-3-pack": { name: "Starter - 3 packs/week", price: 1899 },
        "weekly-5-pack": { name: "Family - 5 packs/week", price: 2999 },
        "weekly-7-pack": { name: "Chef - 7 packs/week", price: 3999 },
      }
      
      const plan = plans[planSlug]
      if (!plan) {
        return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
      }
      
      lineItems = [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: plan.name,
              description: "Weekly microgreens subscription - delivered Friday evening",
            },
            unit_amount: plan.price,
            recurring: {
              interval: "week",
            },
          },
          quantity: 1,
        },
      ]
      checkoutMode = "subscription"
    } else if (items && items.length > 0) {
      let subtotal = 0
      
      lineItems = items.map((item) => {
        subtotal += item.price * 100 * item.quantity
        return {
          price_data: {
            currency: "cad",
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }
      })
      
      const shippingFee = getShippingFee(subtotal / 100)
      if (shippingFee > 0) {
        lineItems.push({
          price_data: {
            currency: "cad",
            product_data: {
              name: "Delivery Fee",
            },
            unit_amount: shippingFee * 100,
          },
          quantity: 1,
        })
      }
    } else {
      return NextResponse.json({ error: "No items provided" }, { status: 400 })
    }
    
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: checkoutMode,
      line_items: lineItems,
      success_url: `${process.env.NEXTAUTH_URL?.replace(/\/$/, '')}/account?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL?.replace(/\/$/, '')}/shop?canceled=true`,
      customer_email: session?.user?.email,
      metadata: {
        userId: session?.user?.id || "",
        giftOneEnabled: giftOneEnabled ? "true" : "false",
        giftOneType: giftOneType || "",
        customCenterName: customCenter?.name || "",
        customCenterAddress: customCenter?.address || "",
      },
    })

    if (giftOneEnabled && session?.user?.id) {
      await dbConnect()
      
      const giftData = {
        subscriber: session.user.id,
        giftType: giftOneType,
        status: "pending",
      }

      if (giftOneType === "default-center") {
        const center = await SeniorCenter.findOne({ active: true })
        if (center) {
          giftData.seniorCenter = center._id
        }
      } else if (giftOneType === "custom-center" && customCenter) {
        giftData.customCenterName = customCenter.name
        giftData.customCenterAddress = customCenter.address
      }

      await GiftDelivery.create(giftData)
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
