export const categories = [
  {
    name: "Microgreens",
    slug: "microgreens",
    description: "Fresh, nutrient-dense microgreens harvested at peak flavor. Ready to eat, no washing required.",
    type: "microgreen"
  },
  {
    name: "Hydrosols",
    slug: "hydrosols",
    description: "Pure plant waters distilled from our surplus greens. Aromatic, gentle, and versatile.",
    type: "hydrosol"
  }
]

export const products = [
  {
    name: "Basil Microgreens",
    slug: "basil-microgreens",
    category: "microgreens",
    type: "microgreen",
    shortDescription: "Aromatic and sweet with classic Italian flavor",
    description: "Our basil microgreens deliver intense, sweet basil flavor in a tender, nutrient-packed form. Perfect for pasta, caprese salads, or as a garnish. Contains up to 40x more nutrients than mature basil leaves.",
    image: "/products/basil-microgreens.jpg",
    price: 6.99,
    isSubscriptionEligible: true,
    tags: ["aromatic", "italian", "popular"],
    active: true,
    usage: "Add to pasta, pizza, salads, or blend into pesto. Best enjoyed fresh.",
    storage: "Top shelf of refrigerator in original container. Stays fresh 6-10 days."
  },
  {
    name: "Kale Microgreens",
    slug: "kale-microgreens",
    category: "microgreens",
    type: "microgreen",
    shortDescription: "Mild and tender with superfood nutrition",
    description: "Kale microgreens offer all the nutritional benefits of mature kale without the tough texture. Mild, slightly sweet flavor that even kale skeptics love. Rich in vitamins A, C, and K.",
    image: "/products/kale-microgreens.jpg",
    price: 6.99,
    isSubscriptionEligible: true,
    tags: ["superfood", "mild", "nutritious"],
    active: true,
    usage: "Perfect in smoothies, salads, sandwiches, or as a nutrient boost in any meal.",
    storage: "Top shelf of refrigerator in original container. Stays fresh 6-10 days."
  },
  {
    name: "Radish Microgreens",
    slug: "radish-microgreens",
    category: "microgreens",
    type: "microgreen",
    shortDescription: "Peppery kick with beautiful color",
    description: "Radish microgreens bring a spicy, peppery punch to any dish. Their vibrant pink stems and green leaves add visual appeal while delivering a flavor that elevates salads, tacos, and sandwiches.",
    image: "/products/radish-microgreens.jpg",
    price: 6.99,
    isSubscriptionEligible: true,
    tags: ["spicy", "colorful", "garnish"],
    active: true,
    usage: "Add to tacos, sandwiches, salads, or use as a striking garnish.",
    storage: "Top shelf of refrigerator in original container. Stays fresh 6-10 days."
  },
  {
    name: "Sunflower Microgreens",
    slug: "sunflower-microgreens",
    category: "microgreens",
    type: "microgreen",
    shortDescription: "Nutty and crunchy with satisfying texture",
    description: "Sunflower microgreens are a crowd favorite with their nutty flavor and satisfying crunch. High in protein and healthy fats, they make a substantial addition to salads or can be enjoyed as a snack.",
    image: "/products/sunflower-microgreens.jpg",
    price: 7.49,
    isSubscriptionEligible: true,
    tags: ["nutty", "crunchy", "protein"],
    active: true,
    usage: "Great in salads, sandwiches, wraps, or as a standalone snack.",
    storage: "Top shelf of refrigerator in original container. Stays fresh 6-10 days.",
    allergenNote: "Contains sunflower seeds."
  },
  {
    name: "Pea Shoots",
    slug: "pea-shoots",
    category: "microgreens",
    type: "microgreen",
    shortDescription: "Sweet and tender with spring-like freshness",
    description: "Pea shoots taste like fresh spring peas with delicate tendrils and leaves. Sweet, mild, and incredibly versatile. A favorite for stir-fries, salads, and as a beautiful plate garnish.",
    image: "/products/pea-shoots.jpg",
    price: 7.49,
    isSubscriptionEligible: true,
    tags: ["sweet", "tender", "versatile"],
    active: true,
    usage: "Sauté lightly, add to salads, use in stir-fries, or as an elegant garnish.",
    storage: "Top shelf of refrigerator in original container. Stays fresh 6-10 days."
  },
  {
    name: "Broccoli Microgreens",
    slug: "broccoli-microgreens",
    category: "microgreens",
    type: "microgreen",
    shortDescription: "Mild flavor packed with sulforaphane",
    description: "Broccoli microgreens contain up to 100x more sulforaphane than mature broccoli. Mild, slightly peppery flavor that blends seamlessly into smoothies, salads, and sandwiches.",
    image: "/products/broccoli-microgreens.jpg",
    price: 6.99,
    isSubscriptionEligible: true,
    tags: ["superfood", "mild", "health"],
    active: true,
    usage: "Blend into smoothies, add to salads, or top any dish for a nutrient boost.",
    storage: "Top shelf of refrigerator in original container. Stays fresh 6-10 days."
  },
  {
    name: "Mixed Microgreens",
    slug: "mixed-microgreens",
    category: "microgreens",
    type: "microgreen",
    shortDescription: "Curated blend of our best varieties",
    description: "Our signature mix combines complementary flavors and textures from our top microgreen varieties. A perfect introduction to microgreens or for those who love variety.",
    image: "/products/mixed-microgreens.jpg",
    price: 7.99,
    isSubscriptionEligible: true,
    tags: ["variety", "popular", "blend"],
    active: true,
    usage: "Perfect for salads, grain bowls, sandwiches, or any meal that needs a fresh boost.",
    storage: "Top shelf of refrigerator in original container. Stays fresh 6-10 days."
  },
  {
    name: "Basil Hydrosol",
    slug: "basil-hydrosol",
    category: "hydrosols",
    type: "hydrosol",
    shortDescription: "Calming aromatic water with herbaceous notes",
    description: "Our basil hydrosol is distilled from surplus basil microgreens, capturing their aromatic essence in a gentle, water-based form. Perfect for facial mists, room sprays, or aromatherapy.",
    image: "/products/basil-hydrosol.jpg",
    price: 14.99,
    isSubscriptionEligible: false,
    tags: ["aromatic", "calming", "facial-mist"],
    active: true,
    usage: "Use as a facial mist, room spray, or add to your bath. For external use only.",
    safetyNote: "For external use only. Avoid contact with eyes. Store in a cool, dark place."
  },
  {
    name: "Mint Hydrosol",
    slug: "mint-hydrosol",
    category: "hydrosols",
    type: "hydrosol",
    shortDescription: "Refreshing and cooling plant water",
    description: "Mint hydrosol offers a refreshing, cooling sensation. Distilled from fresh mint, it's perfect for a mid-day pick-me-up facial mist or to freshen linens and rooms.",
    image: "/products/mint-hydrosol.jpg",
    price: 14.99,
    isSubscriptionEligible: false,
    tags: ["refreshing", "cooling", "energizing"],
    active: true,
    usage: "Spritz on face for refreshment, use as room spray, or add to DIY skincare.",
    safetyNote: "For external use only. Avoid contact with eyes. Store in a cool, dark place."
  },
  {
    name: "Mixed Herb Hydrosol",
    slug: "mixed-herb-hydrosol",
    category: "hydrosols",
    type: "hydrosol",
    shortDescription: "Complex botanical blend for wellness rituals",
    description: "A unique blend of hydrosols from our microgreen surplus, creating a complex, layered aromatic experience. Perfect for those who appreciate botanical complexity in their wellness rituals.",
    image: "/products/mixed-herb-hydrosol.jpg",
    price: 16.99,
    isSubscriptionEligible: false,
    tags: ["complex", "botanical", "wellness"],
    active: true,
    usage: "Ideal for meditation, yoga practice, room ambiance, or as a linen spray.",
    safetyNote: "For external use only. Avoid contact with eyes. Store in a cool, dark place."
  }
]

export const subscriptionPlans = [
  {
    name: "Weekly 3-Pack",
    slug: "weekly-3-pack",
    packsPerWeek: 3,
    pricePerWeek: 18.99,
    stripePriceId: "price_placeholder_3pack",
    active: true,
    description: "Perfect for individuals or couples"
  },
  {
    name: "Weekly 5-Pack",
    slug: "weekly-5-pack",
    packsPerWeek: 5,
    pricePerWeek: 29.99,
    stripePriceId: "price_placeholder_5pack",
    active: true,
    description: "Ideal for small families"
  },
  {
    name: "Weekly 7-Pack",
    slug: "weekly-7-pack",
    packsPerWeek: 7,
    pricePerWeek: 39.99,
    stripePriceId: "price_placeholder_7pack",
    active: true,
    description: "Best value for green enthusiasts"
  }
]

