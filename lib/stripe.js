import Stripe from "stripe"

let stripeInstance = null

export function getStripe() {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY
    if (!secretKey || secretKey.trim() === '') {
      throw new Error("STRIPE_SECRET_KEY environment variable is not set. Please set it in your environment variables.")
    }
    stripeInstance = new Stripe(secretKey, {
      apiVersion: "2023-10-16",
    })
  }
  return stripeInstance
}

export default { getStripe }
