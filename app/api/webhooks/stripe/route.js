import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { getStripe } from "@/lib/stripe"

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
