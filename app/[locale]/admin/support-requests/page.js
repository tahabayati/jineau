"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function SupportRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const t = useTranslations("admin")

  useEffect(() => {
    fetchRequests()
  }, [statusFilter, typeFilter])

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      if (typeFilter) params.set("type", typeFilter)
      
      const url = `/api/admin/support-requests?${params.toString()}`
      const res = await fetch(url)
      if (res.ok) setRequests(await res.json())
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("supportRequests")}</h1>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
          >
            <option value="">All Types</option>
            <option value="refund">Refund</option>
            <option value="issue">Issue</option>
            <option value="general">General</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("user")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("type")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("message")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("createdAt")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No support requests found</td></tr>
            ) : requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900">{req.user?.name || "N/A"}</p>
                    <p className="text-sm text-gray-500">{req.user?.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    req.type === "refund" ? "bg-purple-100 text-purple-800" :
                    req.type === "issue" ? "bg-orange-100 text-orange-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {req.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-600 text-sm max-w-md truncate">{req.message}</p>
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">
                  {new Date(req.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.status === "resolved" ? "bg-green-100 text-green-800" :
                    req.status === "in-progress" ? "bg-blue-100 text-blue-800" :
                    req.status === "open" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

