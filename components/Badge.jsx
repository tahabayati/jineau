export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-brand-mist/30 text-brand-primary",
    primary: "bg-brand-primary text-white",
    secondary: "bg-brand-secondary text-white",
    gold: "bg-brand-gold text-gray-900",
    mint: "bg-brand-mint/30 text-brand-primary",
  }
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

