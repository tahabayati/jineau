import mongoose from "mongoose"

const PopupSchema = new mongoose.Schema(
  {
    text: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Popup || mongoose.model("Popup", PopupSchema)

