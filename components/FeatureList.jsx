const iconMap = {
  water: "💧",
  leaf: "🌿",
  sparkle: "✨",
  droplet: "💧",
  clock: "⏰",
  shield: "🛡️",
  default: "🌱",
}

export default function FeatureList({ features, columns = 3 }) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {features.map((feature, index) => (
        <div
          key={feature.title || index}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-brand-mint/50 transition-all group"
        >
          <div className="w-14 h-14 bg-gradient-to-br from-brand-mist/30 to-brand-mint/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <span className="text-2xl">
              {iconMap[feature.icon] || iconMap.default}
            </span>
          </div>
          <h3 className="font-bold text-lg text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  )
}
