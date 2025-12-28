"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedUsers, setExpandedUsers] = useState(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const t = useTranslations("admin")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users")
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleUser = (userId) => {
    const newExpanded = new Set(expandedUsers)
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId)
    } else {
      newExpanded.add(userId)
    }
    setExpandedUsers(newExpanded)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount, currency = "CAD") => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currency,
    }).format(amount || 0)
  }

  const getStatusColor = (status) => {
    const colors = {
      paid: "bg-green-500/30 text-green-300",
      delivered: "bg-green-500/30 text-green-300",
      processing: "bg-blue-500/30 text-blue-300",
      shipped: "bg-blue-500/30 text-blue-300",
      pending: "bg-yellow-500/30 text-yellow-300",
      cancelled: "bg-red-500/30 text-red-300",
      refunded: "bg-gray-500/30 text-gray-300",
    }
    return colors[status] || "bg-gray-500/30 text-gray-300"
  }

  const filteredUsers = users.filter((user) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      user.name?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query)
    )
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">
          Users & Orders
        </h1>
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
        />
      </div>

      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
        {loading ? (
          <div className="px-4 py-8 text-center text-white/70">Loading...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="px-4 py-8 text-center text-white/70">
            {searchQuery ? "No users found matching your search" : "No users found"}
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {filteredUsers.map((user) => {
              const isExpanded = expandedUsers.has(user._id)
              const hasActiveSubscription = user.activeSubscription !== null

              return (
                <div key={user._id} className="hover:bg-white/5 transition-colors">
                  <div
                    className="px-4 py-4 cursor-pointer"
                    onClick={() => toggleUser(user._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-white">
                              {user.name || "No Name"}
                            </p>
                            <p className="text-sm text-white/70">{user.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-white/60">
                                Joined: {formatDate(user.createdAt)}
                              </span>
                              <span className="text-xs text-white/60">
                                Total Orders: {user.totalOrders || 0}
                              </span>
                              {hasActiveSubscription && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/30 text-green-300">
                                  Active Subscription
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-white/80">
                            {user.subscriptionOrders?.length || 0} Subscription
                            {user.subscriptionOrders?.length !== 1 ? "s" : ""}
                          </p>
                          <p className="text-sm text-white/80">
                            {user.oneOffOrders?.length || 0} One-off
                            {user.oneOffOrders?.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                        <svg
                          className={`w-5 h-5 text-white/60 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-white/10 pt-4">
                      <div className="space-y-4">
                        {/* User Details */}
                        <div className="glass rounded-lg p-4">
                          <h3 className="text-sm font-medium text-white/90 mb-3">
                            User Details
                          </h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-white/60">Email</p>
                              <p className="text-white">{user.email}</p>
                            </div>
                            <div>
                              <p className="text-white/60">Stripe Customer ID</p>
                              <p className="text-white font-mono text-xs">
                                {user.stripeCustomerId || "N/A"}
                              </p>
                            </div>
                            <div>
                              <p className="text-white/60">Gift One Enabled</p>
                              <p className="text-white">
                                {user.giftOneEnabled ? "Yes" : "No"}
                              </p>
                            </div>
                            <div>
                              <p className="text-white/60">Member Since</p>
                              <p className="text-white">
                                {formatDate(user.createdAt)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Active Subscription */}
                        {hasActiveSubscription && user.activeSubscription && (
                          <div className="glass rounded-lg p-4 border-l-4 border-green-500">
                            <h3 className="text-sm font-medium text-white/90 mb-3">
                              Active Subscription
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-white/60">Status</p>
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                    user.activeSubscription.status
                                  )}`}
                                >
                                  {user.activeSubscription.status}
                                </span>
                              </div>
                              <div>
                                <p className="text-white/60">Total</p>
                                <p className="text-white">
                                  {formatCurrency(
                                    user.activeSubscription.total,
                                    user.activeSubscription.currency
                                  )}
                                </p>
                              </div>
                              <div>
                                <p className="text-white/60">Created</p>
                                <p className="text-white">
                                  {formatDate(user.activeSubscription.createdAt)}
                                </p>
                              </div>
                              <div>
                                <p className="text-white/60">Stripe Subscription</p>
                                <p className="text-white font-mono text-xs">
                                  {user.activeSubscription.stripeSubscriptionId
                                    ? user.activeSubscription.stripeSubscriptionId.substring(
                                        0,
                                        20
                                      ) + "..."
                                    : "N/A"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* All Orders */}
                        <div>
                          <h3 className="text-sm font-medium text-white/90 mb-3">
                            All Orders ({user.orders?.length || 0})
                          </h3>
                          {user.orders && user.orders.length > 0 ? (
                            <div className="space-y-2">
                              {user.orders.map((order) => (
                                <div
                                  key={order._id}
                                  className="glass rounded-lg p-4 hover:bg-white/5 transition-colors"
                                >
                                  <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                            order.status
                                          )}`}
                                        >
                                          {order.status}
                                        </span>
                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/30 text-blue-300">
                                          {order.type}
                                        </span>
                                        {order.isGift && (
                                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/30 text-purple-300">
                                            Gift
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-white/60 font-mono">
                                        Order ID: {order._id.toString().substring(0, 8)}...
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-medium text-white">
                                        {formatCurrency(order.total, order.currency)}
                                      </p>
                                      <p className="text-xs text-white/60">
                                        {formatDate(order.createdAt)}
                                      </p>
                                    </div>
                                  </div>

                                  {order.items && order.items.length > 0 && (
                                    <div className="mt-2 pt-2 border-t border-white/10">
                                      <p className="text-xs text-white/60 mb-1">
                                        Items:
                                      </p>
                                      <div className="space-y-1">
                                        {order.items.map((item, idx) => (
                                          <div
                                            key={idx}
                                            className="text-xs text-white/80"
                                          >
                                            {item.name || "Product"} × {item.quantity}{" "}
                                            @ {formatCurrency(item.price, order.currency)}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {order.deliveryDate && (
                                    <div className="mt-2 text-xs text-white/60">
                                      Delivery Date: {formatDate(order.deliveryDate)}
                                    </div>
                                  )}

                                  {order.shippingAddress && (
                                    <div className="mt-2 text-xs text-white/60">
                                      Shipping: {order.shippingAddress.street},{" "}
                                      {order.shippingAddress.city},{" "}
                                      {order.shippingAddress.province}{" "}
                                      {order.shippingAddress.postalCode}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-white/60">
                              No orders found for this user
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

