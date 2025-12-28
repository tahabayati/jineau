import { cookies } from "next/headers"
import AdminSidebar from "@/components/AdminSidebar"
import AuroraBackground from "@/components/AuroraBackground"

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

export default async function AdminLayout({ children }) {
  const isAuthenticated = await checkAdminAuth()

  // If not authenticated, render children without layout (for login page)
  // The middleware handles the redirect for protected routes
  if (!isAuthenticated) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AuroraBackground variant="home" />
      <div className="relative z-10 flex">
        <AdminSidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  )
}

