# Design System Usage Examples

This document provides practical examples of how to use the design system components and patterns in your pages.

## Quick Start

### 1. Using Reusable Section Components

```jsx
import { 
  StandardSection, 
  FeaturesSection, 
  CardGridSection,
  TestimonialsSection,
  FinalCTASection 
} from '@/components/PageSections'

export default function MyPage() {
  return (
    <div className="min-h-screen relative">
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full aurora opacity-50" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] animate-breathe" />
      </div>

      <div className="relative">
        {/* Use reusable sections */}
        <StandardSection
          badge="About Us"
          title="Our Story"
          subtitle="Learn about our mission and values"
        >
          <div className="glass-card rounded-3xl p-8">
            <p className="text-white/70">Your content here...</p>
          </div>
        </StandardSection>

        <FeaturesSection
          badge="Features"
          title="Why Choose Us"
          subtitle="Discover what makes us different"
          features={[
            {
              icon: <YourIcon />,
              title: "Feature 1",
              description: "Description of feature 1"
            },
            // ... more features
          ]}
        />

        <FinalCTASection
          title="Ready to Get Started?"
          subtitle="Join hundreds of satisfied customers"
          primaryCta={{ href: "/subscribe", label: "Start Subscription" }}
          secondaryCta={{ href: "/shop", label: "Shop Now" }}
        />
      </div>
    </div>
  )
}
```

### 2. Creating Custom Sections with Design Patterns

```jsx
export default function CustomPage() {
  return (
    <div className="min-h-screen relative">
      {/* Global background pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full aurora opacity-50" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] animate-breathe" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] animate-breathe" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative">
        {/* Custom section following the pattern */}
        <section className="relative py-32 overflow-hidden">
          {/* Section background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-mint/15 to-transparent rounded-full blur-[100px]" />
          </div>

          {/* Content */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
                Section Badge
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Section Title
              </h2>
              <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
                Section subtitle or description
              </p>
            </div>

            {/* Your custom content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Content cards */}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
```

## Common Patterns

### Pattern 1: Simple Content Section

```jsx
<StandardSection
  badge="Our Mission"
  title="What We Stand For"
  subtitle="Our commitment to quality and sustainability"
>
  <div className="max-w-4xl mx-auto">
    <div className="glass-card rounded-3xl p-8">
      <p className="text-white/70 text-lg leading-relaxed">
        Your paragraph content here...
      </p>
    </div>
  </div>
</StandardSection>
```

### Pattern 2: Feature Grid

```jsx
<FeaturesSection
  badge="Our Features"
  title="Why Choose Jineau"
  subtitle="Discover what makes us different"
  features={[
    {
      icon: <FilterIcon />,
      title: "Triple Filtered",
      description: "Our water and air go through three stages of filtration"
    },
    {
      icon: <LeafIcon />,
      title: "100% Organic",
      description: "No pesticides, no chemicals, just pure nature"
    },
    // Add more features...
  ]}
/>
```

### Pattern 3: Audience Cards

```jsx
<CardGridSection
  badge="For Everyone"
  title="Who We Grow For"
  subtitle="Fresh microgreens for every lifestyle"
  columns={4}
  cards={[
    {
      icon: <HeartIcon />,
      title: "Health-Conscious",
      tagline: "Nutrient-dense greens",
      href: "/for-wellness",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: <FamilyIcon />,
      title: "Families & Kids",
      tagline: "Easy family nutrition",
      href: "/for-families",
      gradient: "from-rose-500 to-pink-500"
    },
    // Add more cards...
  ]}
/>
```

### Pattern 4: Testimonials

```jsx
<TestimonialsSection
  badge="Testimonials"
  title="What Our Customers Say"
  subtitle="Real feedback from real customers"
  testimonials={[
    {
      quote: "The freshest microgreens I've ever had!",
      author: "Sarah Johnson",
      location: "Montreal, QC"
    },
    // Add more testimonials...
  ]}
/>
```

### Pattern 5: Pricing/Plans Section

```jsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-brand-gold/12 to-transparent rounded-full blur-[120px]" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
        Pricing
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        Simple Plans
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {plans.map((plan, index) => (
        <div
          key={plan.name}
          className={`relative glass-card rounded-3xl p-8 ${
            index === 1 
              ? 'border-brand-gold/30 md:scale-105 glow-gold' 
              : ''
          }`}
        >
          {index === 1 && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 text-sm font-bold px-5 py-1.5 rounded-full shadow-lg">
                Most Popular
              </span>
            </div>
          )}
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-white/40 mb-8">{plan.description}</p>
          <div className="mb-8">
            <span className="text-6xl font-bold gradient-text">{plan.price}</span>
            <span className="text-white/50 ml-2 text-lg">/week</span>
          </div>
          <Link
            href="/subscribe"
            className={`block w-full py-4 rounded-full font-semibold text-center transition-all duration-500 ${
              index === 1
                ? 'bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 hover:shadow-[0_0_40px_rgba(233,196,106,0.4)] hover:scale-105'
                : 'glass text-white hover:bg-white/10 hover:scale-105'
            }`}
          >
            Choose {plan.name}
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>
```

## Icon Patterns

### Creating Icon Components

```jsx
// Define your icon component
const MyIcon = () => (
  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="..." />
  </svg>
)

// Use in feature card
<div className="w-14 h-14 mb-6 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-2xl flex items-center justify-center icon-container text-brand-mint border border-white/10">
  <MyIcon />
</div>
```

## Button Patterns

### Primary Button (Gradient)

```jsx
<Link
  href="/subscribe"
  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105"
>
  Start Subscription
  <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</Link>
```

### Secondary Button (Glass)

```jsx
<Link
  href="/shop"
  className="inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-semibold rounded-full transition-all duration-500 hover:bg-white/10 hover:scale-105"
>
  Shop Now
</Link>
```

## Background Orb Patterns

### Standard Background Setup

```jsx
<div className="fixed inset-0 pointer-events-none">
  {/* Aurora overlay */}
  <div className="absolute top-0 left-0 w-full h-full aurora opacity-50" />
  
  {/* Large orbs */}
  <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] animate-breathe" />
  <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] animate-breathe" style={{ animationDelay: '-4s' }} />
  <div className="absolute top-3/4 left-1/3 w-[400px] h-[400px] bg-brand-mint/8 rounded-full blur-[100px] animate-breathe" style={{ animationDelay: '-2s' }} />
</div>
```

### Section-Specific Backgrounds

```jsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    {/* Section-specific orbs */}
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-mint/15 to-transparent rounded-full blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-brand-gold/10 to-transparent rounded-full blur-[80px]" />
  </div>
  {/* Content */}
</section>
```

## Tips for Consistency

1. **Always use the same section structure**: `relative py-32 overflow-hidden`
2. **Consistent spacing**: Use `mb-16` or `mb-20` for section headers
3. **Max width**: Always use `max-w-7xl mx-auto` for content containers
4. **Padding**: Use `px-4 sm:px-6 lg:px-8` for responsive horizontal padding
5. **Glass cards**: Always use `glass-card` class for content containers
6. **Hover effects**: Use `group` class and `group-hover:` utilities
7. **Animations**: Add `animationDelay` to stagger effects
8. **Badge colors**: Match badge color to section theme (mint, gold, mist, etc.)

## Complete Page Template

```jsx
import { StandardSection, FeaturesSection, FinalCTASection } from '@/components/PageSections'

export default function ExamplePage() {
  return (
    <div className="min-h-screen relative">
      {/* Global background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full aurora opacity-50" />
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] animate-breathe" />
        <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] animate-breathe" style={{ animationDelay: '-4s' }} />
      </div>

      <div className="relative">
        {/* Hero section */}
        <Hero
          title="Page Title"
          subtitle="Page subtitle"
          primaryCta={{ href: "/subscribe", label: "Get Started" }}
        />

        {/* Content sections */}
        <StandardSection
          badge="About"
          title="Section Title"
          subtitle="Section description"
        >
          <div className="glass-card rounded-3xl p-8">
            <p className="text-white/70">Content here...</p>
          </div>
        </StandardSection>

        <FeaturesSection
          badge="Features"
          title="Our Features"
          features={[...]}
        />

        {/* Final CTA */}
        <FinalCTASection
          title="Ready to Start?"
          subtitle="Join us today"
          primaryCta={{ href: "/subscribe", label: "Subscribe" }}
          secondaryCta={{ href: "/shop", label: "Shop" }}
        />
      </div>
    </div>
  )
}
```

This template ensures consistency with the home page design while allowing flexibility for page-specific content.




