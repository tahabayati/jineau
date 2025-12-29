"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [publishedFilter, setPublishedFilter] = useState("")
  const [formData, setFormData] = useState({
    slug: "",
    title: { en: "", fr: "", fa: "" },
    excerpt: { en: "", fr: "", fa: "" },
    content: { en: "", fr: "", fa: "" },
    category: { en: "", fr: "", fa: "" },
    publishedDate: new Date().toISOString().split("T")[0],
    readTime: "5 min",
    published: false,
    imageUrl: "",
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchPosts()
  }, [searchQuery, publishedFilter])

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set("q", searchQuery)
      if (publishedFilter !== "") params.set("published", publishedFilter)
      
      const url = `/api/admin/blog-posts?${params.toString()}`
      const res = await fetch(url)
      if (res.ok) setPosts(await res.json())
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
        ? `/api/admin/blog-posts/${editingId}`
        : "/api/admin/blog-posts"
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchPosts()
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

  const handleEdit = (post) => {
    setFormData({
      slug: post.slug || "",
      title: {
        en: post.title?.en || "",
        fr: post.title?.fr || "",
        fa: post.title?.fa || "",
      },
      excerpt: {
        en: post.excerpt?.en || "",
        fr: post.excerpt?.fr || "",
        fa: post.excerpt?.fa || "",
      },
      content: {
        en: post.content?.en || "",
        fr: post.content?.fr || "",
        fa: post.content?.fa || "",
      },
      category: {
        en: post.category?.en || "",
        fr: post.category?.fr || "",
        fa: post.category?.fa || "",
      },
      publishedDate: post.publishedDate 
        ? new Date(post.publishedDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      readTime: post.readTime || "5 min",
      published: post.published || false,
      imageUrl: post.imageUrl || "",
    })
    setEditingId(post._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return
    
    try {
      const res = await fetch(`/api/admin/blog-posts/${id}`, { method: "DELETE" })
      if (res.ok) fetchPosts()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      slug: "",
      title: { en: "", fr: "", fa: "" },
      excerpt: { en: "", fr: "", fa: "" },
      content: { en: "", fr: "", fa: "" },
      category: { en: "", fr: "", fa: "" },
      publishedDate: new Date().toISOString().split("T")[0],
      readTime: "5 min",
      published: false,
      imageUrl: "",
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">Blog Posts</h1>
        <Button onClick={() => { setShowForm(true); setEditingId(null); resetForm() }}>
          Create New Post
        </Button>
      </div>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by slug, title, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
        />
        <select
          value={publishedFilter}
          onChange={(e) => setPublishedFilter(e.target.value)}
          className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
        >
          <option value="">All Posts</option>
          <option value="true">Published</option>
          <option value="false">Draft</option>
        </select>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
            {editingId ? "Edit Blog Post" : "Create New Blog Post"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                  placeholder="e.g., my-blog-post"
                />
                <p className="text-xs text-white/60 mt-1">URL-friendly identifier</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Published Date</label>
                <input
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData({ ...formData, publishedDate: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Read Time</label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="e.g., 5 min"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded border-white/20 text-brand-mint focus:ring-brand-mint"
                />
                <label htmlFor="published" className="text-sm font-medium text-white/90">Published</label>
              </div>
            </div>

            {/* Category - Multilingual */}
            <div>
              <h3 className="text-md font-bold text-white mb-3">Category</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">English (EN)</label>
                  <input
                    type="text"
                    value={formData.category.en}
                    onChange={(e) => setFormData({ ...formData, category: { ...formData.category, en: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    placeholder="e.g., Recipes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">French (FR)</label>
                  <input
                    type="text"
                    value={formData.category.fr}
                    onChange={(e) => setFormData({ ...formData, category: { ...formData.category, fr: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    placeholder="e.g., Recettes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">Persian (FA)</label>
                  <input
                    type="text"
                    value={formData.category.fa}
                    onChange={(e) => setFormData({ ...formData, category: { ...formData.category, fa: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    dir="rtl"
                    placeholder="مثال: دستور پخت"
                  />
                </div>
              </div>
            </div>

            {/* Title - Multilingual */}
            <div>
              <h3 className="text-md font-bold text-white mb-3">Title</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">English (EN)</label>
                  <input
                    type="text"
                    value={formData.title.en}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">French (FR)</label>
                  <input
                    type="text"
                    value={formData.title.fr}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, fr: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">Persian (FA)</label>
                  <input
                    type="text"
                    value={formData.title.fa}
                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, fa: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Excerpt - Multilingual */}
            <div>
              <h3 className="text-md font-bold text-white mb-3">Excerpt</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">English (EN)</label>
                  <textarea
                    value={formData.excerpt.en}
                    onChange={(e) => setFormData({ ...formData, excerpt: { ...formData.excerpt, en: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">French (FR)</label>
                  <textarea
                    value={formData.excerpt.fr}
                    onChange={(e) => setFormData({ ...formData, excerpt: { ...formData.excerpt, fr: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">Persian (FA)</label>
                  <textarea
                    value={formData.excerpt.fa}
                    onChange={(e) => setFormData({ ...formData, excerpt: { ...formData.excerpt, fa: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={3}
                    dir="rtl"
                  />
                </div>
              </div>
            </div>

            {/* Content - Multilingual */}
            <div>
              <h3 className="text-md font-bold text-white mb-3">Content (Markdown supported)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">English (EN)</label>
                  <textarea
                    value={formData.content.en}
                    onChange={(e) => setFormData({ ...formData, content: { ...formData.content, en: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={10}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">French (FR)</label>
                  <textarea
                    value={formData.content.fr}
                    onChange={(e) => setFormData({ ...formData, content: { ...formData.content, fr: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={10}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">Persian (FA)</label>
                  <textarea
                    value={formData.content.fa}
                    onChange={(e) => setFormData({ ...formData, content: { ...formData.content, fa: e.target.value } })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    rows={10}
                    dir="rtl"
                  />
                </div>
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
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Slug</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Title (EN)</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Category</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Published</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Languages</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-white/70">Loading...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-white/70">No blog posts found</td></tr>
            ) : posts.map((post) => (
              <tr key={post._id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-mono text-sm text-white">{post.slug}</td>
                <td className="px-4 py-3 text-white/80">{post.title?.en || "-"}</td>
                <td className="px-4 py-3 text-white/80">{post.category?.en || "-"}</td>
                <td className="px-4 py-3">
                  {post.published ? (
                    <span className="px-2 py-1 bg-green-500/30 text-green-300 text-xs rounded">Published</span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-500/30 text-gray-300 text-xs rounded">Draft</span>
                  )}
                </td>
                <td className="px-4 py-3 text-white/80 text-sm">
                  {new Date(post.publishedDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    {post.title?.en && <span className="px-2 py-0.5 bg-blue-500/30 text-blue-300 text-xs rounded">EN</span>}
                    {post.title?.fr && <span className="px-2 py-0.5 bg-green-500/30 text-green-300 text-xs rounded">FR</span>}
                    {post.title?.fa && <span className="px-2 py-0.5 bg-purple-500/30 text-purple-300 text-xs rounded">FA</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(post)} className="text-brand-mint hover:text-brand-gold transition-colors mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(post._id)} className="text-red-400 hover:text-red-300 transition-colors">
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

