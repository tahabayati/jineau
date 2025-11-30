import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getStripe } from "@/lib/stripe"
import dbConnect from "@/lib/mongodb"
import SubscriptionPlan from "@/models/SubscriptionPlan"
import Product from "@/models/Product"

export async function POST(request) {
  try {
    const session = await auth()
    const { mode, planSlug, items } = await request.json()

    await dbConnect()

    const stripe = getStripe()
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"

    let lineItems = []
    let checkoutMode = mode === "subscription" ? "subscription" : "payment"

    if (mode === "subscription" && planSlug) {
      const plan = await SubscriptionPlan.findOne({ slug: planSlug, active: true })

      if (!plan) {
        return NextResponse.json(
          { error: "Subscription plan not found" },
          { status: 404 }
        )
      }

      if (plan.stripePriceId && !plan.stripePriceId.startsWith("price_placeholder")) {
        lineItems = [
          {
            price: plan.stripePriceId,
            quantity: 1,
          },
        ]
      } else {
        lineItems = [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: plan.name,
                description: plan.description || `${plan.packsPerWeek} packs per week`,
              },
              unit_amount: Math.round(plan.pricePerWeek * 100),
              recurring: {
                interval: "week",
              },
            },
            quantity: 1,
          },
        ]
      }
    } else if (items && items.length > 0) {
      checkoutMode = "payment"

      for (const item of items) {
        const product = await Product.findById(item.productId)

        if (!product) {
          continue
        }

        lineItems.push({
          price_data: {
            currency: "cad",
            product_data: {
              name: product.name,
              description: product.shortDescription,
              images: product.image ? [`${baseUrl}${product.image}`] : [],
            },
            unit_amount: Math.round(product.price * 100),
          },
          quantity: item.quantity || 1,
        })
      }
    }

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "No valid items for checkout" },
        { status: 400 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: checkoutMode,
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${baseUrl}/account?checkout=success`,
      cancel_url: `${baseUrl}/subscribe?checkout=cancelled`,
      customer_email: session?.user?.email,
      metadata: {
        userId: session?.user?.id || "guest",
        type: mode || "one-off",
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error("Checkout session error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
