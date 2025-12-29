import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { getStripe } from "@/lib/stripe"
import dbConnect from "@/lib/mongodb"
import Order from "@/models/Order"
import User from "@/models/User"
import GiftDelivery from "@/models/GiftDelivery"
import { sendMetaServerEvent } from "@/lib/metaServerSide"

export const runtime = 'nodejs'

export async function POST(request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret || webhookSecret.trim() === '') {
    console.error("STRIPE_WEBHOOK_SECRET not configured, rejecting webhook")
    return NextResponse.json(
      { error: "Webhook secret not configured. Please set STRIPE_WEBHOOK_SECRET environment variable." },
      { status: 500 }
    )
  }

  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    console.error("Missing stripe-signature header")
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    )
  }

  let event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${err.message}` },
      { status: 400 }
    )
  }

  console.log("Received Stripe event:", event.type)

  try {
    await dbConnect()

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        console.log("Checkout completed:", session.id)

        const existingOrder = await Order.findOne({ stripeSessionId: session.id })
        if (existingOrder) {
          console.log("Order already exists for session:", session.id)
          return NextResponse.json({ received: true })
        }

        const {
          amount_total,
          currency,
          metadata,
          mode,
          id: stripeSessionId,
          subscription,
          customer: customerId,
        } = session

        const orderData = {
          user: metadata?.userId || undefined,
          items: [],
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

        if (mode === "subscription" && subscription && metadata?.userId) {
          await User.findByIdAndUpdate(metadata.userId, {
            activeSubscription: order._id,
            stripeCustomerId: typeof customerId === "string" ? customerId : undefined,
          })
          console.log("User subscription linked:", metadata.userId)
        }

        if (typeof customerId === "string" && metadata?.userId) {
          await User.findByIdAndUpdate(metadata.userId, {
            stripeCustomerId: customerId,
          })
        }

        const eventId = `purchase_${stripeSessionId}_${Date.now()}`
        const eventTime = Date.now()
        const eventSourceUrl = session.success_url || ""

        await sendMetaServerEvent(
          "Purchase",
          eventTime,
          eventId,
          eventSourceUrl,
          {
            value: (amount_total || 0) / 100,
            currency: (currency || "cad").toUpperCase(),
            content_type: mode === "subscription" ? "subscription" : "product",
            content_ids: [],
            num_items: 0,
          },
          {}
        )

        break
      }

      case "customer.subscription.created": {
        const subscription = event.data.object
        console.log("Subscription created:", subscription.id)

        if (subscription.customer) {
          const user = await User.findOne({ stripeCustomerId: subscription.customer })
          if (user) {
            const order = await Order.findOne({ stripeSubscriptionId: subscription.id })
            if (order) {
              await User.findByIdAndUpdate(user._id, {
                activeSubscription: order._id,
              })
              console.log("User subscription linked on creation:", user._id)
            }
          }
        }

        break
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object
        console.log("Subscription updated:", subscription.id)

        if (subscription.customer) {
          const user = await User.findOne({ stripeCustomerId: subscription.customer })
          if (user) {
            const order = await Order.findOne({ stripeSubscriptionId: subscription.id })
            if (order) {
              const isActive = subscription.status === "active" || subscription.status === "trialing"
              if (isActive) {
                await User.findByIdAndUpdate(user._id, {
                  activeSubscription: order._id,
                })
                await Order.findByIdAndUpdate(order._id, {
                  status: subscription.status === "trialing" ? "paid" : "paid",
                })
              } else {
                await Order.findByIdAndUpdate(order._id, {
                  status: subscription.status === "canceled" ? "cancelled" : "pending",
                })
              }
              console.log("User subscription updated:", user._id, "status:", subscription.status)
            }
          }
        }

        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object
        console.log("Subscription cancelled:", subscription.id)

        if (subscription.customer) {
          const user = await User.findOne({ stripeCustomerId: subscription.customer })
          if (user) {
            await User.findByIdAndUpdate(user._id, {
              activeSubscription: null,
            })
            const order = await Order.findOne({ stripeSubscriptionId: subscription.id })
            if (order) {
              await Order.findByIdAndUpdate(order._id, {
                status: "cancelled",
              })
            }
            console.log("User subscription cancelled:", user._id)
          }
        }

        break
      }

      case "invoice.paid": {
        const invoice = event.data.object
        console.log("Invoice paid:", invoice.id)

        if (invoice.subscription) {
          const order = await Order.findOne({ stripeSubscriptionId: invoice.subscription })
          if (order) {
            await Order.findByIdAndUpdate(order._id, {
              status: "paid",
            })
            console.log("Subscription order marked as paid:", order._id)
          }
        }

        break
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object
        console.error("Invoice payment failed:", invoice.id, "customer:", invoice.customer)

        if (invoice.subscription) {
          const order = await Order.findOne({ stripeSubscriptionId: invoice.subscription })
          if (order) {
            await Order.findByIdAndUpdate(order._id, {
              status: "pending",
            })
            console.log("Subscription order marked as pending due to payment failure:", order._id)
          }
        }

        break
      }

      default:
        console.log("Unhandled event type:", event.type)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error("Error processing webhook:", err)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}
