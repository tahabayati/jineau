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

export async function GET(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { id } = await params

    const product = await Product.findById(id).populate("category").lean()

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Fetch translations
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

    return NextResponse.json({
      ...product,
      translations
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { id } = await params
    const data = await request.json()

    const current = await Product.findById(id).lean()
    if (!current) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if slug is being changed and if new slug already exists
    if (data.slug && data.slug.trim() !== current.slug) {
      const existing = await Product.findOne({ slug: data.slug.trim() }).lean()
      if (existing) {
        return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 })
      }
    }

    // Update product
    const updateData = {
      name: data.name || current.name,
      slug: data.slug || current.slug,
      category: data.category !== undefined && data.category !== "" ? data.category : null,
      type: data.type || current.type,
      shortDescription: data.shortDescription !== undefined ? data.shortDescription : current.shortDescription,
      description: data.description !== undefined ? data.description : current.description,
      image: data.image !== undefined ? data.image : current.image,
      gallery: data.gallery !== undefined ? data.gallery : current.gallery,
      price: data.price !== undefined ? data.price : current.price,
      volume: data.volume !== undefined ? data.volume : current.volume,
      isSubscriptionEligible: data.isSubscriptionEligible !== undefined ? data.isSubscriptionEligible : current.isSubscriptionEligible,
      tags: data.tags !== undefined ? data.tags : current.tags,
      active: data.active !== undefined ? data.active : current.active,
      inStock: data.inStock !== undefined ? data.inStock : current.inStock,
      usage: data.usage !== undefined ? data.usage : current.usage,
      storage: data.storage !== undefined ? data.storage : current.storage,
      safetyNote: data.safetyNote !== undefined ? data.safetyNote : current.safetyNote,
      allergenNote: data.allergenNote !== undefined ? data.allergenNote : current.allergenNote,
    }

    const product = await Product.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })

    // Handle slug change - update all translation keys
    const oldSlug = current.slug
    const newSlug = product.slug
    
    if (oldSlug !== newSlug) {
      // Update all translation keys to use new slug
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
        const oldTranslation = await Translation.findOne({
          namespace: 'products',
          key: `${oldSlug}.${field}`
        }).lean()
        
        if (oldTranslation) {
          // Create new translation with new slug
          await Translation.findOneAndUpdate(
            {
              namespace: 'products',
              key: `${newSlug}.${field}`
            },
            {
              namespace: 'products',
              key: `${newSlug}.${field}`,
              values: oldTranslation.values,
              description: oldTranslation.description || `Product translation for ${newSlug} - ${field}`
            },
            { upsert: true, new: true }
          )
          
          // Delete old translation
          await Translation.deleteOne({
            namespace: 'products',
            key: `${oldSlug}.${field}`
          })
        }
      }
    }

    // Update translations if provided
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

    revalidateTag("products")
    revalidatePath("/shop", "page")
    revalidatePath("/products", "page")
    revalidatePath(`/products/${product.slug}`, "page")

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    const { id } = await params

    const product = await Product.findById(id).lean()
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Delete product
    await Product.findByIdAndDelete(id)

    // Delete all translations for this product
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
      await Translation.deleteOne({
        namespace: 'products',
        key: `${product.slug}.${field}`
      })
    }

    revalidateTag("products")
    revalidatePath("/shop", "page")
    revalidatePath("/products", "page")

    return NextResponse.json({ message: "Product deleted" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

