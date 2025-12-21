export default function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-brand-mist/30 text-brand-primary",
    mint: "bg-brand-mint/20 text-brand-primary border border-brand-mint/40",
    gold: "bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-semibold shadow-md",
    mist: "bg-brand-mist/20 text-brand-secondary border border-brand-mist/40",
    primary: "bg-brand-primary text-white",
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg will-change-transform ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
