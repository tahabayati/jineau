'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import AuroraBackground from '@/components/AuroraBackground'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const t = useTranslations('admin')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center p-4">
      <AuroraBackground variant="home" />
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-strong rounded-3xl md:rounded-[48px] shadow-xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full mb-4 md:mb-6">
              <span className="text-3xl md:text-4xl">🔐</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4 drop-shadow-xl">
              Admin Access
            </h1>
            <p className="text-white/80 text-sm md:text-base">
              Enter the admin password to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint focus:border-brand-mint/50 transition-all text-white placeholder-white/50"
                required
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-brand-mint to-brand-primary text-white py-3 px-6 rounded-lg font-semibold hover:shadow-[0_0_40px_rgba(112,178,178,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Access Admin Panel'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/60">
            Protected area. Authorized access only.
          </div>
        </div>
      </div>
    </div>
  )
}

