import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { getStripe } from "@/lib/stripe"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import GiftDelivery from "@/models/GiftDelivery"

export async function POST(request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret) {
    console.log("Webhook secret not configured, skipping verification")
    return NextResponse.json({ received: true })
  }

  let event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    )
  }

  console.log("Received Stripe event:", event.type)

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object
      console.log("Checkout completed:", session.id)

      try {
        await dbConnect()

        const {
          amount_total,
          currency,
          metadata,
          mode,
          id: stripeSessionId,
          subscription,
        } = session

        const orderData = {
          user: metadata?.userId || undefined,
          items: [], // Line items can be expanded later if needed
          subtotal: (amount_total || 0) / 100,
          shippingFee: 0,
          total: (amount_total || 0) / 100,
          currency: (currency || "cad").toUpperCase(),
          type: mode === "subscription" ? "subscription" : "one-off",
          stripeSessionId,
          stripeSubscriptionId: typeof subscription === "string" ? subscription : undefined,
          status: "paid",
          giftOneEnabled: metadata?.giftOneEnabled === "true",
          giftOneType: metadata?.giftOneType || undefined,
        }

        const order = await Order.create(orderData)
        console.log("Order created from Stripe session:", order._id)

        // If a Gift One delivery was created earlier and linked via metadata, we could
        // connect it here in the future. For now we just ensure orders exist for admin.
      } catch (err) {
        console.error("Error creating order from Stripe session:", err)
      }
      break
    }

    case "customer.subscription.created": {
      const subscription = event.data.object
      console.log("Subscription created:", subscription.id)
      break
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object
      console.log("Subscription updated:", subscription.id)
      break
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object
      console.log("Subscription cancelled:", subscription.id)
      break
    }

    case "invoice.paid": {
      const invoice = event.data.object
      console.log("Invoice paid:", invoice.id)
      break
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object
      console.log("Invoice payment failed:", invoice.id)
      break
    }

    default:
      console.log("Unhandled event type:", event.type)
  }

  return NextResponse.json({ received: true })
}
