import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const type = searchParams.get("type")
    const active = searchParams.get("active")

    const query = {}

    if (category) {
      query.category = category
    }

    if (type) {
      query.type = type
    }

    if (active !== null) {
      query.active = active === "true"
    }

    const products = await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 })

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    await dbConnect()

    const data = await request.json()

    const product = await Product.create(data)

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    )
  }
}

