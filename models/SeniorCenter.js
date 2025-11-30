import mongoose from "mongoose"

const SeniorCenterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      default: "Montérégie",
    },
    postalCode: {
      type: String,
    },
    phone: {
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

export default mongoose.models.SeniorCenter || mongoose.model("SeniorCenter", SeniorCenterSchema)

