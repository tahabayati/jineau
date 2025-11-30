import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Date,
    },
    image: {
      type: String,
    },
    hashedPassword: {
      type: String,
    },
    accounts: [
      {
        provider: String,
        providerAccountId: String,
        type: String,
        access_token: String,
        refresh_token: String,
        expires_at: Number,
        token_type: String,
        scope: String,
        id_token: String,
      },
    ],
    stripeCustomerId: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    activeSubscription: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    giftOneEnabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
