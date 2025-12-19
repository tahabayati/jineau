export default function Section({ 
  eyebrow, 
  title, 
  subtitle, 
  children, 
  id,
  className = "" 
}) {
  return (
    <section 
      id={id}
      className={`relative py-24 md:py-32 overflow-hidden ${className}`}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <div className="text-center mb-16 relative">
            {eyebrow && (
              <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

