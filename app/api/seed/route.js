import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Category from "@/models/Category"
import Product from "@/models/Product"
import SubscriptionPlan from "@/models/SubscriptionPlan"
import { categories, products, subscriptionPlans } from "@/data/initialProducts"

export async function POST() {
  try {
    await dbConnect()

    const existingProducts = await Product.countDocuments()
    if (existingProducts > 0) {
      return NextResponse.json({
        message: "Database already seeded",
        products: existingProducts,
      })
    }

    const createdCategories = {}
    for (const cat of categories) {
      const created = await Category.create(cat)
      createdCategories[cat.slug] = created._id
    }

    const productsWithCategories = products.map((product) => ({
      ...product,
      category: createdCategories[product.category],
    }))

    await Product.insertMany(productsWithCategories)

    await SubscriptionPlan.insertMany(subscriptionPlans)

    const productCount = await Product.countDocuments()
    const categoryCount = await Category.countDocuments()
    const planCount = await SubscriptionPlan.countDocuments()

    return NextResponse.json({
      message: "Database seeded successfully",
      categories: categoryCount,
      products: productCount,
      subscriptionPlans: planCount,
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to seed the database",
    warning: "Only works when database is empty",
  })
}

