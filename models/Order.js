import mongoose from "mongoose"

const OrderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  name: String,
  quantity: Number,
  price: Number,
})

const OrderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [OrderItemSchema],
    subtotal: {
      type: Number,
    },
    shippingFee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "CAD",
    },
    type: {
      type: String,
      enum: ["one-off", "subscription"],
      default: "one-off",
    },
    stripeSessionId: {
      type: String,
    },
    stripeSubscriptionId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"],
      default: "pending",
    },
    shippingAddress: {
      street: String,
      city: String,
      province: String,
      postalCode: String,
      country: { type: String, default: "Canada" },
    },
    deliveryDate: {
      type: Date,
    },
    isGift: {
      type: Boolean,
      default: false,
    },
    giftDelivery: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GiftDelivery",
    },
    includesReplacementBox: {
      type: Boolean,
      default: false,
    },
    replacementRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReplacementRequest",
    },
    giftOneEnabled: {
      type: Boolean,
      default: false,
    },
    giftOneType: {
      type: String,
      enum: ["default-center", "custom-center"],
    },
    giftOneCenterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SeniorCenter",
    },
    giftOneCustomAddress: {
      name: String,
      address: String,
      city: String,
      postalCode: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)
