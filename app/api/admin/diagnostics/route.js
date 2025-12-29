import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"
import Order from "@/models/Order"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function GET() {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const productCount = await Product.countDocuments()
    const activeProductCount = await Product.countDocuments({ active: true })
    const inactiveProductCount = await Product.countDocuments({ active: false })
    const categoryCount = await Category.countDocuments()
    const orderCount = await Order.countDocuments()
    
    const sampleProducts = await Product.find().limit(3).select('name slug active type').lean()
    const sampleCategories = await Category.find().limit(3).select('name slug').lean()
    
    return NextResponse.json({
      database: {
        products: {
          total: productCount,
          active: activeProductCount,
          inactive: inactiveProductCount,
          sample: sampleProducts
        },
        categories: {
          total: categoryCount,
          sample: sampleCategories
        },
        orders: {
          total: orderCount
        }
      },
      message: productCount === 0 
        ? "No products found in database. You may need to seed the database using /api/seed"
        : `Found ${productCount} products in database`
    })
  } catch (error) {
    console.error("Diagnostics error:", error)
    return NextResponse.json({ 
      error: "Failed to run diagnostics",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    }, { status: 500 })
  }
}

