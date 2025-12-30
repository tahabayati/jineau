import { NextResponse } from "next/server"
import { revalidateTag, revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import dbConnect from "@/lib/mongodb"
import Popup from "@/models/Popup"
import { getPathsToRevalidate } from "@/lib/revalidation"

export const runtime = 'nodejs'

async function isAdmin() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export async function PUT(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()
    
    await dbConnect()
    
    const current = await Popup.findById(id).lean()
    if (!current) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    
    // If setting a popup as active, deactivate all others
    if (data.isActive && !current.isActive) {
      await Popup.updateMany({ isActive: true, _id: { $ne: id } }, { isActive: false })
    }
    
    const updateData = {
      text: {
        en: data.text?.en !== undefined ? data.text.en : current.text?.en || "",
        fr: data.text?.fr !== undefined ? data.text.fr : current.text?.fr || "",
        fa: data.text?.fa !== undefined ? data.text.fa : current.text?.fa || "",
      },
      shopButtonText: {
        en: data.shopButtonText?.en !== undefined ? data.shopButtonText.en : current.shopButtonText?.en || "Shop",
        fr: data.shopButtonText?.fr !== undefined ? data.shopButtonText.fr : current.shopButtonText?.fr || "Boutique",
        fa: data.shopButtonText?.fa !== undefined ? data.shopButtonText.fa : current.shopButtonText?.fa || "فروشگاه",
      },
      subscribeButtonText: {
        en: data.subscribeButtonText?.en !== undefined ? data.subscribeButtonText.en : current.subscribeButtonText?.en || "Subscribe",
        fr: data.subscribeButtonText?.fr !== undefined ? data.subscribeButtonText.fr : current.subscribeButtonText?.fr || "S'abonner",
        fa: data.subscribeButtonText?.fa !== undefined ? data.subscribeButtonText.fa : current.subscribeButtonText?.fa || "اشتراک",
      },
      signUpButtonText: {
        en: data.signUpButtonText?.en !== undefined ? data.signUpButtonText.en : current.signUpButtonText?.en || "Sign Up",
        fr: data.signUpButtonText?.fr !== undefined ? data.signUpButtonText.fr : current.signUpButtonText?.fr || "S'inscrire",
        fa: data.signUpButtonText?.fa !== undefined ? data.signUpButtonText.fa : current.signUpButtonText?.fa || "ثبت نام",
      },
      isActive: data.isActive !== undefined ? data.isActive : current.isActive,
    }

    const popup = await Popup.findByIdAndUpdate(id, updateData, { new: true })

    revalidateTag("popup")
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json(popup)
  } catch (error) {
    console.error("Error updating popup:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await dbConnect()
    
    const popup = await Popup.findByIdAndDelete(id)
    
    if (!popup) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    revalidateTag("popup")
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json({ message: "Deleted" })
  } catch (error) {
    console.error("Error deleting popup:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

