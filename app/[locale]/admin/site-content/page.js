"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function SiteContentPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [groupFilter, setGroupFilter] = useState("")
  const [formData, setFormData] = useState({
    key: "",
    type: "text",
    value: { en: "", fr: "", fa: "" },
    meta: { group: "", label: "" },
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchItems()
  }, [searchQuery, groupFilter])

  const fetchItems = async () => {
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (groupFilter) params.set("group", groupFilter)
      
      const url = `/api/admin/site-content?${params.toString()}`
      const res = await fetch(url)
      if (res.ok) setItems(await res.json())
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingId 
        ? `/api/admin/site-content/${editingId}`
        : "/api/admin/site-content"
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchItems()
        setShowForm(false)
        setEditingId(null)
        resetForm()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to save")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to save")
    }
  }

  const handleEdit = (item) => {
    setFormData({
      key: item.key,
      type: item.type,
      value: {
        en: item.value?.en || "",
        fr: item.value?.fr || "",
        fa: item.value?.fa || "",
      },
      meta: {
        group: item.meta?.group || "",
        label: item.meta?.label || "",
      },
    })
    setEditingId(item._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this content?")) return
    
    try {
      const res = await fetch(`/api/admin/site-content/${id}`, { method: "DELETE" })
      if (res.ok) fetchItems()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      key: "",
      type: "text",
      value: { en: "", fr: "", fa: "" },
      meta: { group: "", label: "" },
    })
  }

  const uniqueGroups = [...new Set(items.map(i => i.meta?.group).filter(Boolean))]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">Site Content</h1>
        <Button onClick={() => { setShowForm(true); setEditingId(null); resetForm() }}>
          Create New Content
        </Button>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by key or label..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
        />
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
        >
          <option value="">All Groups</option>
          {uniqueGroups.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
            {editingId ? "Edit Content" : "Create New Content"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Key</label>
                <input
                  type="text"
                  value={formData.key}
                  onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                  disabled={editingId}
                  placeholder="e.g., home.hero.title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
                >
                  <option value="text">Text</option>
                  <option value="markdown">Markdown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Group</label>
                <input
                  type="text"
                  value={formData.meta.group}
                  onChange={(e) => setFormData({ ...formData, meta: { ...formData.meta, group: e.target.value } })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="e.g., home, footer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Label</label>
                <input
                  type="text"
                  value={formData.meta.label}
                  onChange={(e) => setFormData({ ...formData, meta: { ...formData.meta, label: e.target.value } })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="Human readable description"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">English (EN)</label>
                {formData.type === "markdown" ? (
                  <textarea
                    value={formData.value.en}
                    onChange={(e) => setFormData({ ...formData, value: { ...formData.value, en: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={6}
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.value.en}
                    onChange={(e) => setFormData({ ...formData, value: { ...formData.value, en: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">French (FR)</label>
                {formData.type === "markdown" ? (
                  <textarea
                    value={formData.value.fr}
                    onChange={(e) => setFormData({ ...formData, value: { ...formData.value, fr: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={6}
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.value.fr}
                    onChange={(e) => setFormData({ ...formData, value: { ...formData.value, fr: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Persian (FA)</label>
                {formData.type === "markdown" ? (
                  <textarea
                    value={formData.value.fa}
                    onChange={(e) => setFormData({ ...formData, value: { ...formData.value, fa: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={6}
                    dir="rtl"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData.value.fa}
                    onChange={(e) => setFormData({ ...formData, value: { ...formData.value, fa: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    dir="rtl"
                  />
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditingId(null) }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Key</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Label</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Group</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Values</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">No content found</td></tr>
            ) : items.map((item) => (
              <tr key={item._id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-sm text-white">{item.key}</td>
                <td className="px-4 py-3 text-white/80">{item.meta?.label || "-"}</td>
                <td className="px-4 py-3">
                  {item.meta?.group && (
                    <span className="px-2 py-1 glass text-brand-mint text-xs rounded">
                      {item.meta.group}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-white/80 capitalize">{item.type}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {item.value?.en && <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 text-xs rounded">EN</span>}
                    {item.value?.fr && <span className="px-2 py-0.5 bg-green-500/30 text-green-300 text-xs rounded">FR</span>}
                    {item.value?.fa && <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 text-xs rounded">FA</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(item)} className="text-brand-mint hover:text-brand-gold transition-colors mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

