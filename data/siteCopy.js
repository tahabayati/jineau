import { shippingConfig, deliveryConfig, regionConfig } from "@/lib/config"

export const brandName = "Jineau"

export const taglines = {
  primary: "The Water of Life, Where Roots Begin Again",
  secondary: "Locally grown microgreens and hydrosols, delivered fresh to your door.",
  hero: "Microgreens and hydrosols that bring the Water of Life to your table."
}

export const brandStory = {
  nameOrigin: {
    title: "What is Jineau?",
    description: "Jineau combines \"Jin\" (ژین) — Kurdish for life — with \"Eau\" — French for water. Together, they form \"Water of Life,\" a name that honors our roots and our mission.",
    jin: { word: "Jin", meaning: "Life", language: "Kurdish", script: "ژین" },
    eau: { word: "Eau", meaning: "Water", language: "French" }
  },
  mission: "We grow microgreens packed with nutrients using water-efficient, pesticide-free urban farming methods. Our zero-waste philosophy means surplus greens become aromatic hydrosols. We combine Kurdish–Persian herbal wisdom with modern science, using simple sustainable packaging and delivering direct from farm to your table.",
  values: [
    "Water-efficient urban farming",
    "Pesticide-free growing",
    "Zero waste philosophy",
    "Kurdish-Persian herbal wisdom",
    "Modern scientific methods",
    "Farm-direct delivery"
  ]
}

export const differentiators = [
  {
    title: "Fully Filtered Air & Water",
    description: "Our controlled environment uses triple-filtered air and purified water for the cleanest possible growing conditions.",
    icon: "water"
  },
  {
    title: "Zero Chemicals",
    description: "No pesticides, no synthetic fertilizers, no herbicides. Just pure, natural growing.",
    icon: "leaf"
  },
  {
    title: "High-Tech Clean Technology",
    description: "Advanced sanitization technology means your greens are clean and ready to eat — no washing required.",
    icon: "sparkle"
  },
  {
    title: "Hydrosols from Surplus",
    description: "Nothing goes to waste. Surplus greens become functional, aromatic hydrosols.",
    icon: "droplet"
  },
  {
    title: "Just-in-Time Harvest",
    description: `Harvested fresh, delivered ${deliveryConfig.deliveryDay}. Your greens are at peak freshness within 24 hours of harvest.`,
    icon: "clock"
  },
  {
    title: "MAPAQ-Aligned Facility",
    description: "Our facility meets Quebec food safety standards for commercial food production.",
    icon: "shield"
  }
]

export const deliveryInfo = {
  orderCutoff: deliveryConfig.orderCutoff,
  harvestDay: deliveryConfig.harvestDay,
  deliveryDay: deliveryConfig.deliveryDay,
  freeDeliveryThreshold: shippingConfig.freeShippingThreshold,
  deliveryFee: shippingConfig.deliveryFee,
  freshnessGuarantee: "Within 24 hours of harvest"
}

export const subscription = {
  title: "Subscriptions Made Simple",
  description: `Choose your weekly pack size, select your favorite microgreens, and we handle the rest. Cancel or modify anytime before ${deliveryConfig.orderCutoff}.`,
  benefits: [
    "3-7 packs per week",
    "Fresh Swap Guarantee",
    "Skip or cancel anytime",
    "Priority harvest selection"
  ],
  plans: [
    { name: "Starter", packs: 3, description: "Perfect for individuals" },
    { name: "Family", packs: 5, description: "Ideal for households" },
    { name: "Chef", packs: 7, description: "For serious green lovers" }
  ]
}

export const audiences = {
  healthConscious: {
    title: "Health-Conscious Individuals",
    tagline: "Nutrient-dense greens for your wellness journey",
    description: "Microgreens contain up to 40x more nutrients than mature vegetables. Add them to smoothies, salads, or eat them straight from the pack.",
    benefits: ["High nutrient density", "No washing needed", "Ready to eat", "Supports gut health"]
  },
  families: {
    title: "Families & Kids",
    tagline: "Easy nutrition the whole family will love",
    description: "Make healthy eating fun with colorful microgreens in lunchboxes, snacks, and family meals. Our Marmot mascot makes greens exciting for kids!",
    benefits: ["Kid-friendly flavors", "Lunchbox ready", "Fun recipes", "No prep needed"]
  },
  chefs: {
    title: "Chefs & Restaurants",
    tagline: "Consistent quality for culinary excellence",
    description: "Premium microgreens with extended shelf life, consistent supply, and hyper-local sourcing. Perfect for garnishes, flavor accents, and signature dishes.",
    benefits: ["6-10 day shelf life", "Consistent weekly supply", "Premium mixes available", "Restaurant quantities"]
  },
  wellness: {
    title: "Wellness Practitioners",
    tagline: "Plant-based aromatics for holistic practices",
    description: "Our hydrosols are pure plant waters — gentle, aromatic, and versatile. Perfect for facial mists, room sprays, or holistic wellness rituals.",
    benefits: ["100% plant-based", "No synthetic additives", "Versatile applications", "Aromatic and gentle"]
  }
}

export const testimonials = [
  {
    quote: "The freshest microgreens we've ever tasted. The advanced clean technology means they're ready to eat straight from the pack.",
    author: "S.L.",
    location: "Longueuil"
  },
  {
    quote: "The Fresh Swap Guarantee is genius. I never worry about wasting greens anymore.",
    author: "M.R.",
    location: "Brossard"
  },
  {
    quote: "My parents love the donated baskets. It feels good knowing our subscription helps the community.",
    author: "J.D.",
    location: "St-Lambert"
  },
  {
    quote: "As a chef, consistency is everything. Jineau delivers the same quality every single week.",
    author: "Chef P.T.",
    location: "Montreal"
  }
]

export const faqItems = [
  {
    question: "How should I store my microgreens?",
    answer: "Store your microgreens on the top shelf of your refrigerator in their original clamshell container. They stay fresh for 6-10 days when stored properly."
  },
  {
    question: "Do I need to wash the microgreens before eating?",
    answer: "No! Our microgreens are sanitized using advanced high-tech clean technology. They're ready to eat straight from the package."
  },
  {
    question: "What areas do you deliver to?",
    answer: `We deliver throughout ${regionConfig.deliveryRegion}, including Longueuil, Brossard, St-Lambert, La Prairie, Candiac, and surrounding areas. Check our delivery zone map for specific postal codes.`
  },
  {
    question: "What's the minimum order and delivery fee?",
    answer: `There's no minimum order. Delivery is free for orders over $${shippingConfig.freeShippingThreshold} CAD. Orders of $${shippingConfig.freeShippingThreshold} or less have a $${shippingConfig.deliveryFee} delivery fee.`
  },
  {
    question: "How do I use hydrosols?",
    answer: "Hydrosols are versatile plant waters. Use them as facial mists, room sprays, linen fresheners, or add them to your wellness rituals. They're gentle and aromatic with no synthetic additives."
  },
  {
    question: "Are there any allergens in your products?",
    answer: "Our products are free from peanuts, gluten, and dairy. However, our facility handles sunflower seeds. If you have severe allergies, please contact us before ordering."
  },
  {
    question: "How do subscriptions work?",
    answer: `Choose your weekly pack size (3, 5, or 7 packs), select your microgreens, and we deliver fresh every ${deliveryConfig.deliveryDay}. You can modify, skip, or cancel anytime before ${deliveryConfig.orderCutoff}.`
  },
  {
    question: "What's the Fresh Swap Guarantee?",
    answer: "If you didn't use a product from your subscription delivery and kept it sealed and refrigerated, you can request a free replacement in your next delivery. Requests must be made before the weekly cutoff, and you can use this up to 2 times per month."
  },
  {
    question: "What's your refund policy?",
    answer: "We handle returns on a case-by-case basis. Fresh products can be returned within 2 days. Subscription customers also benefit from our Fresh Swap Guarantee for unopened products."
  },
  {
    question: "When do orders arrive?",
    answer: `Orders are delivered ${deliveryConfig.deliveryDay}. We harvest fresh and deliver within 24 hours for maximum freshness.`
  },
  {
    question: "What is Buy One, Gift One?",
    answer: `When you start a subscription, you can choose to have a second box delivered to a senior center in ${regionConfig.deliveryRegion}. You can specify a center or let us choose one for you.`
  }
]

export const seoKeywords = [
  `microgreens delivery ${regionConfig.deliveryRegion}`,
  "ready-to-eat microgreens Montreal",
  "pesticide-free microgreens Quebec",
  "high-tech clean microgreens",
  "botanical hydrosols Montreal",
  "fresh microgreens Longueuil",
  "organic microgreens Brossard",
  "microgreen subscription Quebec"
]

export const contactInfo = {
  email: "hello@jineau.ca",
  phone: "(514) 555-0123",
  address: `${regionConfig.companyLocation}, ${regionConfig.province}`,
  socialMedia: {
    instagram: "https://instagram.com/jineaufarm",
    facebook: "https://facebook.com/jineaufarm"
  }
}

export const policies = {
  privacy: "/privacy",
  terms: "/terms",
  refunds: "/refunds"
}
