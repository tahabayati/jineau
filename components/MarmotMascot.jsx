export default function MarmotMascot({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-12 h-12 text-3xl",
    md: "w-20 h-20 text-5xl",
    lg: "w-28 h-28 text-6xl",
    xl: "w-36 h-36 text-7xl",
  }

  return (
    <div
      className={`${sizes[size]} ${className} flex items-center justify-center rounded-full bg-gradient-to-br from-brand-mint/40 to-brand-mist/50 shadow-lg`}
    >
      <span role="img" aria-label="Marmot mascot">
        🦫
      </span>
    </div>
  )
}
