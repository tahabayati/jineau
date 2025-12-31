import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getStripe } from "@/lib/stripe"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import GiftDelivery from "@/models/GiftDelivery"
import SeniorCenter from "@/models/SeniorCenter"
import SubscriptionPlan from "@/models/SubscriptionPlan"
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
      await dbConnect()
      
      const plan = await SubscriptionPlan.findOne({ slug: planSlug, active: true }).lean()
      if (!plan) {
        return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
      }
      
      // Use sale price if available, otherwise use regular price
      const pricePerWeek = plan.salePricePerWeek || plan.pricePerWeek
      const priceInCents = Math.round(pricePerWeek * 100)
      
      lineItems = [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: `${plan.name} - ${plan.packsPerWeek} packs/week`,
              description: "Weekly microgreens subscription - delivered Friday evening",
            },
            unit_amount: priceInCents,
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

    if (!checkoutSession.url) {
      console.error("Stripe checkout session created but no URL returned")
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
    }

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout error:", error)
    
    // Provide more specific error messages
    if (error.message?.includes("STRIPE_SECRET_KEY")) {
      return NextResponse.json({ error: "Payment system configuration error" }, { status: 500 })
    }
    
    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json({ error: error.message || "Invalid payment request" }, { status: 400 })
    }
    
    return NextResponse.json({ 
      error: error.message || "Checkout failed. Please try again." 
    }, { status: 500 })
  }
}
