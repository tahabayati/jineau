import mongoose from "mongoose"

const ReplacementRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    originalOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    weekStartDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ["fresh-swap"],
      default: "fresh-swap",
    },
    reason: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "applied", "rejected"],
      default: "pending",
    },
    appliedToOrder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.ReplacementRequest || mongoose.model("ReplacementRequest", ReplacementRequestSchema)

