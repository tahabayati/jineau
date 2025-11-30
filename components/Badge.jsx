export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    mint: "bg-brand-mint/20 text-brand-primary border border-brand-mint/40",
    gold: "bg-brand-gold/20 text-amber-800 border border-brand-gold/40",
    mist: "bg-brand-mist/20 text-brand-secondary border border-brand-mist/40",
    primary: "bg-brand-primary text-white",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
