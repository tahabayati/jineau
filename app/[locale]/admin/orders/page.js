"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const t = useTranslations("admin")

  useEffect(() => {
    fetchOrders()
  }, [statusFilter, typeFilter])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      if (typeFilter) params.set("type", typeFilter)
      
      const url = `/api/admin/orders${params.toString() ? `?${params.toString()}` : ''}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">
          All Orders
        </h1>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
          >
            <option value="">All Types</option>
            <option value="one-off">One-off</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Amount</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Date</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-white/70">
                  Loading...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-white/70">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-mono text-xs text-white/80">
                      {order._id.toString().substring(0, 8)}...
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {order.user ? (
                      <div>
                        <p className="font-medium text-white">
                          {order.user.name || "No Name"}
                        </p>
                        <p className="text-sm text-white/70">{order.user.email}</p>
                      </div>
                    ) : (
                      <span className="text-white/60">Guest</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          order.type === "subscription"
                            ? "bg-blue-500/30 text-blue-300"
                            : "bg-purple-500/30 text-purple-300"
                        }`}
                      >
                        {order.type}
                      </span>
                      {order.isGift && (
                        <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-pink-500/30 text-pink-300">
                          Gift
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">
                      {formatCurrency(order.total, order.currency)}
                    </p>
                    {order.items && order.items.length > 0 && (
                      <p className="text-xs text-white/60">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white/80 text-sm">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="text-brand-mint hover:text-brand-gold transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">
                Order Details
              </h2>
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedOrder(null)
                }}
                className="text-white/60 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="glass rounded-lg p-4">
                <h3 className="text-sm font-medium text-white/90 mb-3">Order Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-white/60">Order ID</p>
                    <p className="text-white font-mono text-xs break-all">
                      {selectedOrder._id.toString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60">Status</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        selectedOrder.status
                      )}`}
                    >
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-white/60">Type</p>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        selectedOrder.type === "subscription"
                          ? "bg-blue-500/30 text-blue-300"
                          : "bg-purple-500/30 text-purple-300"
                      }`}
                    >
                      {selectedOrder.type}
                    </span>
                  </div>
                  <div>
                    <p className="text-white/60">Created</p>
                    <p className="text-white">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              {selectedOrder.user && (
                <div className="glass rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white/90 mb-3">Customer</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">Name</p>
                      <p className="text-white">
                        {selectedOrder.user.name || "No Name"}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/60">Email</p>
                      <p className="text-white">{selectedOrder.user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items */}
              {selectedOrder.items && selectedOrder.items.length > 0 && (
                <div className="glass rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white/90 mb-3">Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-white/5 rounded"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {item.name || item.product?.name || "Product"}
                          </p>
                          <p className="text-xs text-white/60">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-white font-medium">
                          {formatCurrency(item.price, selectedOrder.currency)} × {item.quantity} ={" "}
                          {formatCurrency(item.price * item.quantity, selectedOrder.currency)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="glass rounded-lg p-4">
                <h3 className="text-sm font-medium text-white/90 mb-3">Pricing</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <p className="text-white/60">Subtotal</p>
                    <p className="text-white">
                      {formatCurrency(selectedOrder.subtotal, selectedOrder.currency)}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-white/60">Shipping</p>
                    <p className="text-white">
                      {formatCurrency(selectedOrder.shippingFee, selectedOrder.currency)}
                    </p>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <p className="text-white font-medium">Total</p>
                    <p className="text-white font-bold text-lg">
                      {formatCurrency(selectedOrder.total, selectedOrder.currency)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              {selectedOrder.shippingAddress && (
                <div className="glass rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white/90 mb-3">Shipping Address</h3>
                  <div className="text-sm text-white">
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.city},{" "}
                      {selectedOrder.shippingAddress.province}{" "}
                      {selectedOrder.shippingAddress.postalCode}
                    </p>
                    <p>{selectedOrder.shippingAddress.country || "Canada"}</p>
                  </div>
                </div>
              )}

              {/* Delivery Date */}
              {selectedOrder.deliveryDate && (
                <div className="glass rounded-lg p-4">
                  <h3 className="text-sm font-medium text-white/90 mb-3">Delivery Date</h3>
                  <p className="text-white">{formatDate(selectedOrder.deliveryDate)}</p>
                </div>
              )}

              {/* Gift Information */}
              {selectedOrder.isGift && (
                <div className="glass rounded-lg p-4 border-l-4 border-pink-500">
                  <h3 className="text-sm font-medium text-white/90 mb-3">Gift Information</h3>
                  <div className="space-y-2 text-sm">
                    {selectedOrder.giftOneType === "default-center" &&
                      selectedOrder.giftOneCenterId && (
                        <div>
                          <p className="text-white/60">Gift Center</p>
                          <p className="text-white">
                            {selectedOrder.giftOneCenterId.name || "Default Center"}
                          </p>
                        </div>
                      )}
                    {selectedOrder.giftOneType === "custom-center" &&
                      selectedOrder.giftOneCustomAddress && (
                        <div>
                          <p className="text-white/60">Custom Gift Address</p>
                          <p className="text-white">
                            {selectedOrder.giftOneCustomAddress.name}
                          </p>
                          <p className="text-white text-xs">
                            {selectedOrder.giftOneCustomAddress.address}
                          </p>
                          <p className="text-white text-xs">
                            {selectedOrder.giftOneCustomAddress.city}{" "}
                            {selectedOrder.giftOneCustomAddress.postalCode}
                          </p>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Stripe Information */}
              <div className="glass rounded-lg p-4">
                <h3 className="text-sm font-medium text-white/90 mb-3">Payment Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {selectedOrder.stripeSessionId && (
                    <div>
                      <p className="text-white/60">Stripe Session ID</p>
                      <p className="text-white font-mono text-xs break-all">
                        {selectedOrder.stripeSessionId}
                      </p>
                    </div>
                  )}
                  {selectedOrder.stripeSubscriptionId && (
                    <div>
                      <p className="text-white/60">Stripe Subscription ID</p>
                      <p className="text-white font-mono text-xs break-all">
                        {selectedOrder.stripeSubscriptionId}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

