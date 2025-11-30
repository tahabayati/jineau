import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import SectionTitle from "@/components/SectionTitle"
import Button from "@/components/Button"
import MarmotMascot from "@/components/MarmotMascot"

export const metadata = {
  title: "My Account",
  description: "Manage your Jineau account, subscriptions, and orders.",
}

export default async function AccountPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-brand-mist/30 rounded-full flex items-center justify-center">
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
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back{session.user.name ? `, ${session.user.name.split(" ")[0]}` : ""}!
            </h1>
            <p className="text-gray-600">{session.user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Active Subscription
            </h2>
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-500 text-sm mb-2">You don't have an active subscription</p>
              <Button href="/subscribe" size="sm">
                Start Subscription
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Next Delivery
            </h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm">No upcoming deliveries</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Recent Orders
          </h2>
          <div className="text-center py-8">
            <MarmotMascot size="md" className="mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No orders yet</p>
            <Button href="/shop" variant="secondary">
              Browse Products
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Account Settings
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-500">{session.user.email}</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-500">••••••••</p>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">Delivery Address</p>
                <p className="text-sm text-gray-500">Not set</p>
              </div>
              <Button variant="ghost" size="sm">Add</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="text-gray-500 hover:text-red-600 text-sm transition-colors"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
