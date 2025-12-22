import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import AccountTabs from "@/components/AccountTabs"

export async function generateMetadata({ params }) {
  const { locale } = await params
  const titles = {
    en: "My Account",
    fr: "Mon Compte",
    fa: "حساب کاربری",
  }
  return { title: titles[locale] || titles.en }
}

export default async function AccountPage({ searchParams }) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-br from-brand-mist/10 via-white to-brand-gold/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-mint to-brand-mist rounded-full flex items-center justify-center shadow-lg">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-brand-primary">
                {session.user.name?.charAt(0) || session.user.email?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-gray-600">{session.user.email}</p>
          </div>
        </div>

        <AccountTabs
          userId={session.user.id}
          userEmail={session.user.email}
          paymentSuccess={searchParams?.success === "true"}
        />
      </div>
    </div>
  )
}
