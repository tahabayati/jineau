"use client"

import Link from "next/link"

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled = false,
  type = "button",
  className = "",
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full"
  
  const variants = {
    primary: "bg-brand-primary text-white hover:bg-brand-secondary focus:ring-brand-primary",
    secondary: "border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white focus:ring-brand-secondary",
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus:ring-brand-primary",
    gold: "bg-brand-gold text-gray-900 hover:bg-amber-400 focus:ring-brand-gold",
    ghost: "text-brand-primary hover:bg-brand-mist/30 focus:ring-brand-primary",
  }
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }
  
  const combinedStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    )
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
    </button>
  )
}

