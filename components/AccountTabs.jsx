"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "./Button"
import MarmotMascot from "./MarmotMascot"
import ReplacementRequestForm from "./ReplacementRequestForm"
import SupportRequestForm from "./SupportRequestForm"
import { isWithinFreshSwapWindow, freshSwapConfig } from "@/lib/config"

export default function AccountTabs({ userId, userEmail }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [orders, setOrders] = useState([])
  const [replacements, setReplacements] = useState([])
  const [supportRequests, setSupportRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const t = useTranslations("account")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [ordersRes, replacementsRes, supportRes] = await Promise.all([
        fetch("/api/orders"),
        fetch("/api/replacements"),
        fetch("/api/support-requests"),
      ])
      
      if (ordersRes.ok) setOrders(await ordersRes.json())
      if (replacementsRes.ok) setReplacements(await replacementsRes.json())
      if (supportRes.ok) setSupportRequests(await supportRes.json())
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "orders", label: t("ordersAndReplacements") },
    { id: "support", label: t("supportRequests") },
    { id: "settings", label: t("accountSettings") },
  ]

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-brand-primary text-white shadow-md"
                : "text-gray-600 hover:bg-brand-mist/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {t("activeSubscription")}
            </h2>
            <div className="bg-gradient-to-r from-brand-mist/20 to-brand-mint/10 rounded-xl p-4">
              <p className="text-gray-500 text-sm mb-2">{t("noActiveSubscription")}</p>
              <Button href="/subscribe" size="sm">
                {t("noActiveSubscription").includes("no") ? "Start Subscription" : t("activeSubscription")}
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {t("nextDelivery")}
            </h2>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-gray-500 text-sm">{t("noUpcomingDeliveries")}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:col-span-2">
            <h2 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {t("recentOrders")}
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-8">
                <MarmotMascot size="md" className="mx-auto mb-4" />
                <p className="text-gray-500 mb-4">{t("noOrders")}</p>
                <Button href="/shop" variant="secondary">
                  {t("browseProducts")}
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <li key={order._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "paid" ? "bg-green-100 text-green-800" :
                      order.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {order.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Fresh Swap Guarantee</h2>
            
            <div className={`p-4 rounded-xl mb-4 ${
              isWithinFreshSwapWindow() 
                ? "bg-green-50 border border-green-200" 
                : "bg-gray-50 border border-gray-200"
            }`}>
              <p className={`text-sm ${isWithinFreshSwapWindow() ? "text-green-700" : "text-gray-500"}`}>
                {isWithinFreshSwapWindow() 
                  ? t("replacementWindowOpen")
                  : t("replacementWindowClosed")
                }
              </p>
            </div>

            <ReplacementRequestForm 
              onSuccess={fetchData} 
              disabled={!isWithinFreshSwapWindow()}
              replacements={replacements}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Your Replacement Requests</h2>
            {replacements.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No replacement requests yet</p>
            ) : (
              <ul className="space-y-3">
                {replacements.map((req) => (
                  <li key={req._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">Week of {new Date(req.weekStartDate).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Requested {new Date(req.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      req.status === "approved" ? "bg-green-100 text-green-800" :
                      req.status === "applied" ? "bg-blue-100 text-blue-800" :
                      req.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-800"
                    }`}>
                      {req.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === "support" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">{t("requestRefund")}</h2>
            <SupportRequestForm onSuccess={fetchData} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-bold text-lg text-gray-900 mb-4">Your Support Requests</h2>
            {supportRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No support requests yet</p>
            ) : (
              <ul className="space-y-3">
                {supportRequests.map((req) => (
                  <li key={req._id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 capitalize">{req.type}</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        req.status === "resolved" ? "bg-green-100 text-green-800" :
                        req.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{req.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{new Date(req.createdAt).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-lg text-gray-900 mb-4">{t("accountSettings")}</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">{t("email")}</p>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium text-gray-900">{t("password")}</p>
                <p className="text-sm text-gray-500">••••••••</p>
              </div>
              <Button variant="ghost" size="sm">Change</Button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-900">{t("deliveryAddress")}</p>
                <p className="text-sm text-gray-500">{t("notSet")}</p>
              </div>
              <Button variant="ghost" size="sm">Add</Button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

