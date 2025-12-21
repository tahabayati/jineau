import mongoose from "mongoose"

const SiteContentSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["text", "markdown"],
      default: "text",
    },
    value: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    meta: {
      group: { type: String, default: "" },
      label: { type: String, default: "" },
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

SiteContentSchema.index({ "meta.group": 1 })

export default mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema)

