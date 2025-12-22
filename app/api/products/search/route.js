import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export const runtime = 'nodejs'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q") || ""
    const limit = parseInt(searchParams.get("limit") || "10")

    if (!query || query.trim().length < 2) {
      return NextResponse.json([])
    }

    await dbConnect()

    // Search in name, shortDescription, description, and tags
    const products = await Product.find({
      active: true,
      $or: [
        { name: { $regex: query, $options: "i" } },
        { shortDescription: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } },
      ],
    })
      .select("name slug shortDescription price type image")
      .limit(limit)
      .lean()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    )
  }
}

