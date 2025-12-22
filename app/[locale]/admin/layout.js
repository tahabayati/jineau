import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import AdminSidebar from "@/components/AdminSidebar"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Admin Dashboard | Jineau",
}

async function checkAdminAuth() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'authenticated'
}

export default async function AdminLayout({ children, params }) {
  const { locale } = await params
  const isAuthenticated = await checkAdminAuth()

  if (!isAuthenticated) {
    redirect(`/${locale}/admin/login`)
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

