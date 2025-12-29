"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [activeFilter, setActiveFilter] = useState("")
  const [showTranslations, setShowTranslations] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    category: "",
    type: "microgreen",
    shortDescription: "",
    description: "",
    image: "",
    gallery: [],
    price: 0,
    volume: "",
    isSubscriptionEligible: false,
    tags: [],
    active: true,
    inStock: true,
    usage: "",
    storage: "",
    safetyNote: "",
    allergenNote: "",
    translations: {
      name: { en: "", fr: "", fa: "" },
      shortDescription: { en: "", fr: "", fa: "" },
      description: { en: "", fr: "", fa: "" },
      usage: { en: "", fr: "", fa: "" },
      storage: { en: "", fr: "", fa: "" },
      safetyNote: { en: "", fr: "", fa: "" },
      allergenNote: { en: "", fr: "", fa: "" },
    }
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [searchQuery, typeFilter, activeFilter])

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      if (res.ok) {
        const data = await res.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (typeFilter) params.set("type", typeFilter)
      if (activeFilter !== "") params.set("active", activeFilter)
      
      const url = `/api/admin/products?${params.toString()}`
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
      }
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
        ? `/api/admin/products/${editingId}`
        : "/api/admin/products"
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchProducts()
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

  const handleEdit = (product) => {
    setFormData({
      name: product.name || "",
      slug: product.slug || "",
      category: product.category?._id || product.category || "",
      type: product.type || "microgreen",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      image: product.image || "",
      gallery: product.gallery || [],
      price: product.price || 0,
      volume: product.volume || "",
      isSubscriptionEligible: product.isSubscriptionEligible || false,
      tags: product.tags || [],
      active: product.active !== undefined ? product.active : true,
      inStock: product.inStock !== undefined ? product.inStock : true,
      usage: product.usage || "",
      storage: product.storage || "",
      safetyNote: product.safetyNote || "",
      allergenNote: product.allergenNote || "",
      translations: product.translations || {
        name: { en: "", fr: "", fa: "" },
        shortDescription: { en: "", fr: "", fa: "" },
        description: { en: "", fr: "", fa: "" },
        usage: { en: "", fr: "", fa: "" },
        storage: { en: "", fr: "", fa: "" },
        safetyNote: { en: "", fr: "", fa: "" },
        allergenNote: { en: "", fr: "", fa: "" },
      }
    })
    setEditingId(product._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product? This will also delete all its translations.")) return
    
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" })
      if (res.ok) fetchProducts()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      category: "",
      type: "microgreen",
      shortDescription: "",
      description: "",
      image: "",
      gallery: [],
      price: 0,
      isSubscriptionEligible: false,
      tags: [],
      active: true,
      inStock: true,
      usage: "",
      storage: "",
      safetyNote: "",
      allergenNote: "",
      translations: {
        name: { en: "", fr: "", fa: "" },
        shortDescription: { en: "", fr: "", fa: "" },
        description: { en: "", fr: "", fa: "" },
        usage: { en: "", fr: "", fa: "" },
        storage: { en: "", fr: "", fa: "" },
        safetyNote: { en: "", fr: "", fa: "" },
        allergenNote: { en: "", fr: "", fa: "" },
      }
    })
  }

  const toggleTranslations = (productId) => {
    setShowTranslations(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }))
  }

  const updateTranslation = (field, locale, value) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [field]: {
          ...prev.translations[field],
          [locale]: value
        }
      }
    }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">Products</h1>
        <Button onClick={() => { setShowForm(true); setEditingId(null); resetForm() }}>
          Create New Product
        </Button>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or slug..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
        >
          <option value="">All Types</option>
          <option value="microgreen">Microgreen</option>
          <option value="hydrosol">Hydrosol</option>
        </select>
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value)}
          className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
            {editingId ? "Edit Product" : "Create New Product"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                  placeholder="Product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                  placeholder="product-slug"
                  disabled={editingId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
                  required
                >
                  <option value="microgreen">Microgreen</option>
                  <option value="hydrosol">Hydrosol</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
                >
                  <option value="">No Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Volume/Size</label>
                <input
                  type="text"
                  value={formData.volume || ""}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="e.g., 50g, 100ml, 1 pack"
                />
                <p className="text-xs text-white/60 mt-1">Displayed before price (e.g., "50g")</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Image Path</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="/jineau-products/..."
                />
                <p className="text-xs text-white/60 mt-1">Note: Images are stored locally in the codebase</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-1">Short Description</label>
                <textarea
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-1">Usage</label>
                <textarea
                  value={formData.usage}
                  onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-1">Storage</label>
                <textarea
                  value={formData.storage}
                  onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-1">Safety Note</label>
                <textarea
                  value={formData.safetyNote}
                  onChange={(e) => setFormData({ ...formData, safetyNote: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={2}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-1">Allergen Note</label>
                <textarea
                  value={formData.allergenNote}
                  onChange={(e) => setFormData({ ...formData, allergenNote: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={2}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-1">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded"
                  />
                  Active
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-1">
                  <input
                    type="checkbox"
                    checked={formData.inStock}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="rounded"
                  />
                  In Stock
                </label>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-1">
                  <input
                    type="checkbox"
                    checked={formData.isSubscriptionEligible}
                    onChange={(e) => setFormData({ ...formData, isSubscriptionEligible: e.target.checked })}
                    className="rounded"
                  />
                  Subscription Eligible
                </label>
              </div>
            </div>

            {/* Translations Section */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Translations (EN, FR, FA)</h3>
              <div className="space-y-4">
                {['name', 'shortDescription', 'description', 'usage', 'storage', 'safetyNote', 'allergenNote'].map((field) => (
                  <div key={field} className="glass rounded-lg p-4">
                    <label className="block text-sm font-medium text-white/90 mb-2 capitalize">{field}</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-white/70 mb-1">English (EN)</label>
                        {field === 'description' || field === 'shortDescription' || field === 'usage' || field === 'storage' ? (
                          <textarea
                            value={formData.translations[field]?.en || ""}
                            onChange={(e) => updateTranslation(field, 'en', e.target.value)}
                            className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                            rows={field === 'description' ? 4 : 2}
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData.translations[field]?.en || ""}
                            onChange={(e) => updateTranslation(field, 'en', e.target.value)}
                            className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">French (FR)</label>
                        {field === 'description' || field === 'shortDescription' || field === 'usage' || field === 'storage' ? (
                          <textarea
                            value={formData.translations[field]?.fr || ""}
                            onChange={(e) => updateTranslation(field, 'fr', e.target.value)}
                            className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                            rows={field === 'description' ? 4 : 2}
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData.translations[field]?.fr || ""}
                            onChange={(e) => updateTranslation(field, 'fr', e.target.value)}
                            className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                          />
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-white/70 mb-1">Persian (FA)</label>
                        {field === 'description' || field === 'shortDescription' || field === 'usage' || field === 'storage' ? (
                          <textarea
                            value={formData.translations[field]?.fa || ""}
                            onChange={(e) => updateTranslation(field, 'fa', e.target.value)}
                            className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                            rows={field === 'description' ? 4 : 2}
                            dir="rtl"
                          />
                        ) : (
                          <input
                            type="text"
                            value={formData.translations[field]?.fa || ""}
                            onChange={(e) => updateTranslation(field, 'fa', e.target.value)}
                            className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                            dir="rtl"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Slug</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Type</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">No products found</td></tr>
            ) : products.map((product) => (
              <tr key={product._id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-white">{product.name}</td>
                <td className="px-4 py-3 font-mono text-sm text-white/80">{product.slug}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 glass text-brand-mint text-xs rounded capitalize">
                    {product.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/80">${product.price?.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {product.active ? (
                      <span className="px-2 py-0.5 bg-green-500/30 text-green-300 text-xs rounded">Active</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-gray-500/30 text-gray-300 text-xs rounded">Inactive</span>
                    )}
                    {product.inStock ? (
                      <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 text-xs rounded">In Stock</span>
                    ) : (
                      <span className="px-2 py-0.5 bg-red-500/30 text-red-300 text-xs rounded">Out of Stock</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(product)} className="text-brand-mint hover:text-brand-gold transition-colors mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)} className="text-red-400 hover:text-red-300 transition-colors">
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

