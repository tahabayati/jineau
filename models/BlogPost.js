import mongoose from "mongoose"

const BlogPostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    excerpt: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    content: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    category: {
      en: { type: String, default: "" },
      fr: { type: String, default: "" },
      fa: { type: String, default: "" },
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    readTime: {
      type: String,
      default: "5 min",
    },
    published: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "",
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

BlogPostSchema.index({ slug: 1 })
BlogPostSchema.index({ published: 1, publishedDate: -1 })

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)

