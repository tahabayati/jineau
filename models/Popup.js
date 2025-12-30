import mongoose from "mongoose"

const PopupSchema = new mongoose.Schema(
  {
    text: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    shopButtonText: {
      en: { type: String, default: "Shop" },
      fr: { type: String, default: "Boutique" },
      fa: { type: String, default: "فروشگاه" },
    },
    subscribeButtonText: {
      en: { type: String, default: "Subscribe" },
      fr: { type: String, default: "S'abonner" },
      fa: { type: String, default: "اشتراک" },
    },
    signUpButtonText: {
      en: { type: String, default: "Sign Up" },
      fr: { type: String, default: "S'inscrire" },
      fa: { type: String, default: "ثبت نام" },
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

