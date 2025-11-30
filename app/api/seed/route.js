import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Category from "@/models/Category"
import Product from "@/models/Product"
import SubscriptionPlan from "@/models/SubscriptionPlan"
import SeniorCenter from "@/models/SeniorCenter"
import { products, categories, subscriptionPlans, initialSeniorCenters } from "@/data/initialProducts"

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed in production" }, { status: 403 })
  }

  try {
    await dbConnect()

    await Category.deleteMany({})
    await Product.deleteMany({})
    await SubscriptionPlan.deleteMany({})

    const createdCategories = await Category.insertMany(
      categories.map((cat) => ({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      }))
    )

    const categoryMap = {}
    createdCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id
    })

    await Product.insertMany(
      products.map((p) => ({
        name: p.name,
        slug: p.slug,
        type: p.type,
        category: categoryMap[p.category],
        price: p.price,
        shortDescription: p.shortDescription,
        description: p.description,
        usage: p.usage,
        storage: p.storage,
        safetyNote: p.safetyNote,
        allergenNote: p.allergenNote,
        tags: p.tags,
        isSubscriptionEligible: p.isSubscriptionEligible,
        inStock: true,
      }))
    )

    await SubscriptionPlan.insertMany(
      subscriptionPlans.map((plan) => ({
        name: plan.name,
        slug: plan.slug,
        packs: plan.packs,
        price: plan.price,
        description: plan.description,
        stripePriceId: plan.stripePriceId,
        isActive: true,
      }))
    )

    const existingCenters = await SeniorCenter.countDocuments()
    if (existingCenters === 0) {
      await SeniorCenter.insertMany(initialSeniorCenters)
    }

    return NextResponse.json({
      message: "Database seeded successfully",
      categories: createdCategories.length,
      products: products.length,
      plans: subscriptionPlans.length,
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
