import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    type: {
      type: String,
      enum: ["microgreen", "hydrosol"],
      required: true,
    },
    shortDescription: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    isSubscriptionEligible: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    active: {
      type: Boolean,
      default: true,
    },
    usage: {
      type: String,
    },
    storage: {
      type: String,
    },
    safetyNote: {
      type: String,
    },
    allergenNote: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)

