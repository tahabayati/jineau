import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import AdminSidebar from "@/components/AdminSidebar"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Admin Dashboard | Jineau",
}

async function checkAdmin() {
  const session = await auth()
  if (!session) return false
  
  await dbConnect()
  const user = await User.findById(session.user.id)
  return user?.isAdmin === true
}

export default async function AdminLayout({ children }) {
  const isAdmin = await checkAdmin()

  if (!isAdmin) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

