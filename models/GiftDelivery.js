import mongoose from "mongoose"

const GiftDeliverySchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscriptionOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    giftType: {
      type: String,
      enum: ["default-center", "custom-center"],
      required: true,
    },
    seniorCenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SeniorCenter",
    },
    customCenterName: {
      type: String,
    },
    customCenterAddress: {
      type: String,
    },
    customCenterCity: {
      type: String,
    },
    customCenterPostalCode: {
      type: String,
    },
    deliveryDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "delivered", "cancelled"],
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.GiftDelivery || mongoose.model("GiftDelivery", GiftDeliverySchema)

