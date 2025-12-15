"use client"

import { Link } from "@/i18n/routing"

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  loading = false,
  type = "button",
  className = "",
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-sm hover:shadow-md active:scale-95 will-change-transform"
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-mint to-brand-primary text-white hover:from-brand-mist hover:to-brand-secondary hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105 active:scale-95",
    secondary: "bg-brand-secondary border border-brand-mint/30 text-white hover:bg-brand-mint hover:border-brand-mint/50 active:scale-95",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white hover:scale-105 active:scale-95",
    gold: "bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 hover:from-amber-300 hover:to-yellow-400 hover:shadow-[0_0_40px_rgba(233,196,106,0.4)] hover:scale-105 active:scale-95",
    ghost: "text-brand-primary hover:bg-brand-mist/30 hover:scale-105 active:scale-95 shadow-none",
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }
  
  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${loading ? "btn-loading" : ""}`
  
  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        tabIndex={disabled || loading ? -1 : undefined}
        onClick={(e) => {
          if (disabled || loading) {
            e.preventDefault()
            return
          }
          if (onClick) onClick(e)
        }}
      >
        {children}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedStyles}
      aria-busy={loading}
    >
      {children}
    </button>
  )
}
