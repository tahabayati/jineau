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

export async function GET() {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    
    // Get the active popup (there should only be one active at a time)
    const popup = await Popup.findOne({ isActive: true })
      .populate("updatedBy", "name email")
      .lean()
    
    // If no active popup, get the most recent one (for admin to see/edit)
    if (!popup) {
      const recentPopup = await Popup.findOne()
        .sort({ updatedAt: -1 })
        .populate("updatedBy", "name email")
        .lean()
      return NextResponse.json(recentPopup || null)
    }

    return NextResponse.json(popup)
  } catch (error) {
    console.error("Error fetching popup:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    if (!await isAdmin()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    
    await dbConnect()
    
    // If setting a popup as active, deactivate all others
    if (data.isActive) {
      await Popup.updateMany({ isActive: true }, { isActive: false })
    }

    const popup = await Popup.create({
      text: {
        en: data.text?.en || "",
        fr: data.text?.fr || "",
        fa: data.text?.fa || "",
      },
      shopButtonText: {
        en: data.shopButtonText?.en || "Shop",
        fr: data.shopButtonText?.fr || "Boutique",
        fa: data.shopButtonText?.fa || "فروشگاه",
      },
      subscribeButtonText: {
        en: data.subscribeButtonText?.en || "Subscribe",
        fr: data.subscribeButtonText?.fr || "S'abonner",
        fa: data.subscribeButtonText?.fa || "اشتراک",
      },
      signUpButtonText: {
        en: data.signUpButtonText?.en || "Sign Up",
        fr: data.signUpButtonText?.fr || "S'inscrire",
        fa: data.signUpButtonText?.fa || "ثبت نام",
      },
      isActive: data.isActive || false,
    })

    revalidateTag("popup")
    
    const paths = getPathsToRevalidate()
    paths.forEach((path) => {
      try {
        revalidatePath(path, "page")
      } catch (error) {
        console.error(`Failed to revalidate path ${path}:`, error)
      }
    })

    return NextResponse.json(popup, { status: 201 })
  } catch (error) {
    console.error("Error creating popup:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}

