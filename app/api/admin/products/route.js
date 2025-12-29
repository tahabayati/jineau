import { NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Translation from "@/models/Translation"
import { getPathsToRevalidate } from "@/lib/revalidation"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function GET(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const q = searchParams.get("q") || ""
    const type = searchParams.get("type") || ""
    const active = searchParams.get("active")

    const query = {}
    
    if (type) {
      query.type = type
    }
    
    if (active !== null && active !== "") {
      query.active = active === "true"
    }
    
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { slug: { $regex: q, $options: "i" } },
      ]
    }

    const products = await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 })
      .lean()

    // Fetch translations for each product
    const productsWithTranslations = await Promise.all(
      products.map(async (product) => {
        const translationKeys = [
          'name',
          'shortDescription',
          'description',
          'usage',
          'storage',
          'safetyNote',
          'allergenNote'
        ]
        
        const translations = {}
        for (const field of translationKeys) {
          const translation = await Translation.findOne({
            namespace: 'products',
            key: `${product.slug}.${field}`
          }).lean()
          
          if (translation) {
            translations[field] = {
              en: translation.values?.en || "",
              fr: translation.values?.fr || "",
              fa: translation.values?.fa || "",
            }
          } else {
            translations[field] = {
              en: "",
              fr: "",
              fa: "",
            }
          }
        }
        
        return {
          ...product,
          translations
        }
      })
    )

    return NextResponse.json(productsWithTranslations)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    
    if (!data.name || !data.slug || !data.type || !data.price) {
      return NextResponse.json({ error: "Name, slug, type, and price are required" }, { status: 400 })
    }

    await dbConnect()
    
    // Check if slug already exists
    const existing = await Product.findOne({ slug: data.slug.trim() }).lean()
    if (existing) {
      return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 })
    }

    // Create product
    const product = await Product.create({
      name: data.name.trim(),
      slug: data.slug.trim(),
      category: data.category && data.category !== "" ? data.category : null,
      type: data.type,
      shortDescription: data.shortDescription || "",
      description: data.description || "",
      image: data.image || "",
      gallery: data.gallery || [],
      price: data.price,
      isSubscriptionEligible: data.isSubscriptionEligible || false,
      tags: data.tags || [],
      active: data.active !== undefined ? data.active : true,
      inStock: data.inStock !== undefined ? data.inStock : true,
      usage: data.usage || "",
      storage: data.storage || "",
      safetyNote: data.safetyNote || "",
      allergenNote: data.allergenNote || "",
    })

    // Create translations if provided
    if (data.translations) {
      const translationKeys = [
        'name',
        'shortDescription',
        'description',
        'usage',
        'storage',
        'safetyNote',
        'allergenNote'
      ]
      
      for (const field of translationKeys) {
        if (data.translations[field]) {
          const translationData = data.translations[field]
          if (translationData.en || translationData.fr || translationData.fa) {
            await Translation.findOneAndUpdate(
              {
                namespace: 'products',
                key: `${product.slug}.${field}`
              },
              {
                namespace: 'products',
                key: `${product.slug}.${field}`,
                values: {
                  en: translationData.en || "",
                  fr: translationData.fr || "",
                  fa: translationData.fa || "",
                },
                description: `Product translation for ${product.slug} - ${field}`
              },
              { upsert: true, new: true }
            )
          }
        }
      }
    }

    revalidateTag("products")
    revalidatePath("/shop", "page")
    revalidatePath("/products", "page")

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

