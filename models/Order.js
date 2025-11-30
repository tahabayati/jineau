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
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)

