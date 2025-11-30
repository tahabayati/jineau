import mongoose from "mongoose"

const SubscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    packsPerWeek: {
      type: Number,
      required: true,
    },
    pricePerWeek: {
      type: Number,
      required: true,
    },
    stripePriceId: {
      type: String,
    },
    description: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.SubscriptionPlan || mongoose.model("SubscriptionPlan", SubscriptionPlanSchema)

