"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function ReplacementRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const t = useTranslations("admin")

  useEffect(() => {
    fetchRequests()
  }, [statusFilter])

  const fetchRequests = async () => {
    try {
      const url = statusFilter 
        ? `/api/admin/replacement-requests?status=${statusFilter}`
        : "/api/admin/replacement-requests"
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
        <h1 className="text-2xl font-bold text-gray-900">{t("replacementRequests")}</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="applied">Applied</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("user")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("week")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("monthlyCount")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("createdAt")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No replacement requests found</td></tr>
            ) : requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900">{req.user?.name || "N/A"}</p>
                    <p className="text-sm text-gray-500">{req.user?.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(req.weekStartDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.monthlyCount >= 2 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {req.monthlyCount}/2
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(req.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.status === "approved" ? "bg-green-100 text-green-800" :
                    req.status === "applied" ? "bg-blue-100 text-blue-800" :
                    req.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
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

