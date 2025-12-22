import mongoose from "mongoose"

const TranslationSchema = new mongoose.Schema(
  {
    // The namespace/section (e.g., "common", "nav", "home", "shop")
    namespace: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    // The translation key within the namespace (e.g., "brandName", "tagline")
    key: {
      type: String,
      required: true,
      trim: true,
    },
    // Translations for each locale
    values: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    // Human-readable description for admin
    description: {
      type: String,
      default: "",
    },
    // Track who last updated this translation
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

// Compound unique index on namespace + key
TranslationSchema.index({ namespace: 1, key: 1 }, { unique: true })

// Static method to get all translations for a specific locale
TranslationSchema.statics.getMessagesForLocale = async function (locale) {
  const translations = await this.find({}).lean()
  
  const messages = {}
  
  translations.forEach((t) => {
    if (!messages[t.namespace]) {
      messages[t.namespace] = {}
    }
    messages[t.namespace][t.key] = t.values[locale] || t.values.en || ""
  })
  
  return messages
}

// Static method to get all translations grouped by namespace
TranslationSchema.statics.getAllGrouped = async function () {
  const translations = await this.find({}).sort({ namespace: 1, key: 1 }).lean()
  
  const grouped = {}
  
  translations.forEach((t) => {
    if (!grouped[t.namespace]) {
      grouped[t.namespace] = []
    }
    grouped[t.namespace].push(t)
  })
  
  return grouped
}

export default mongoose.models.Translation || mongoose.model("Translation", TranslationSchema)

