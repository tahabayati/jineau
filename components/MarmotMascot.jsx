import Image from "next/image"

export default function MarmotMascot({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-28 h-28",
    xl: "w-36 h-36",
  }

  return (
    <div
      className={`${sizes[size]} ${className} flex items-center justify-center rounded-full bg-gradient-to-br from-brand-mint/40 to-brand-mist/50 shadow-lg overflow-hidden`}
    >
      <Image
        src="/jineau-home-images/account_marmot_icon.webp"
        alt="Marmot mascot"
        width={144}
        height={144}
        className="w-full h-full object-contain"
      />
    </div>
  )
}
