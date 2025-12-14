# Jineau Design System Documentation

This document analyzes the home page design patterns and provides a reusable design system for implementing consistent designs across all pages.

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Glassmorphism System](#glassmorphism-system)
4. [Section Structure Patterns](#section-structure-patterns)
5. [Component Patterns](#component-patterns)
6. [Animation System](#animation-system)
7. [Layout Patterns](#layout-patterns)
8. [Spacing System](#spacing-system)
9. [Reusable Section Templates](#reusable-section-templates)

---

## Color Palette

### Brand Colors
```css
--color-brand-primary: #016B61    /* Dark teal - primary brand color */
--color-brand-secondary: #5A9690  /* Medium teal */
--color-brand-mint: #70B2B2        /* Light mint - accent color */
--color-brand-mist: #9ECFD4        /* Very light mint */
--color-brand-gold: #E9C46A        /* Gold accent */
--color-brand-blue: #6E8CFB        /* Blue accent */
```

### Background Colors
```css
--color-background: #050d14        /* Darkest background */
/* Additional gradients: #081620, #0a1a28, #071218 */
```

### Usage Patterns
- **Primary actions**: `from-brand-mint to-brand-primary` gradient
- **Accent highlights**: `brand-gold` for special emphasis
- **Text gradients**: `gradient-text` class (mint → mist → gold → mint)
- **Background overlays**: Use brand colors with low opacity (0.05-0.15)

---

## Typography

### Font Families
- **Headings**: Playfair Display (`--font-playfair`) - Serif, elegant
- **Body**: Inter (`--font-inter`) - Sans-serif, modern

### Heading Hierarchy
```jsx
// Main hero title
<h1 className="text-5xl md:text-6xl lg:text-8xl font-bold">
  {/* Use gradient-text for key words */}
</h1>

// Section titles
<h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
  {title}
</h2>

// Card/Feature titles
<h3 className="text-xl md:text-2xl font-semibold text-white">
  {title}
</h3>
```

### Text Styles
- **Body text**: `text-white/50` or `text-white/70` for readability
- **Gradient text**: Use `.gradient-text` class for animated gradients
- **Gold text**: Use `.gradient-text-gold` for gold accents
- **Small labels**: `text-sm text-white/40 tracking-wide uppercase`

---

## Glassmorphism System

### Glass Effect Classes

#### `.glass` - Light glass effect
```css
background: rgba(255, 255, 255, 0.03);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.08);
```
**Use for**: Badges, small UI elements, subtle backgrounds

#### `.glass-strong` - Stronger glass effect
```css
background: rgba(255, 255, 255, 0.06);
backdrop-filter: blur(40px);
border: 1px solid rgba(255, 255, 255, 0.1);
```
**Use for**: Headers when scrolled, important containers

#### `.glass-card` - Card glass effect
```css
background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
backdrop-filter: blur(24px);
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
```
**Use for**: Feature cards, product cards, content containers

**Hover effect**: Automatically lifts up (`translateY(-8px)`) and increases glow

---

## Section Structure Patterns

### Standard Section Template
```jsx
<section className="relative py-32 overflow-hidden">
  {/* Background elements */}
  <div className="absolute inset-0">
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-mint/15 to-transparent rounded-full blur-[100px]" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-brand-gold/10 to-transparent rounded-full blur-[80px]" />
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section header */}
    <div className="text-center mb-16">
      <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
        Badge Label
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {title}
      </h2>
      <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>

    {/* Section content */}
    {/* Your content here */}
  </div>
</section>
```

### Key Patterns:
1. **Always use `relative` on section** for positioning context
2. **Use `py-32`** for vertical padding (128px)
3. **Add `overflow-hidden`** to contain background effects
4. **Background orbs**: Use brand colors with 0.05-0.15 opacity, large blur (80-150px)
5. **Content wrapper**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

---

## Component Patterns

### Badge/Label Pattern
```jsx
<span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
  Label Text
</span>
```

### Icon Container Pattern
```jsx
<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-2xl flex items-center justify-center icon-container text-brand-mint border border-white/10">
  {icon}
</div>
```

### Feature Card Pattern
```jsx
<div className="glass-card rounded-3xl p-8 group">
  <div className="w-14 h-14 mb-6 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-2xl flex items-center justify-center icon-container text-brand-mint border border-white/10">
    {icon}
  </div>
  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-mint transition-colors duration-300">
    {title}
  </h3>
  <p className="text-white/50 leading-relaxed">
    {description}
  </p>
</div>
```

### CTA Button Patterns

#### Primary CTA (Gradient)
```jsx
<Link
  href="/subscribe"
  className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105"
>
  {label}
  <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
</Link>
```

#### Secondary CTA (Glass)
```jsx
<Link
  href="/shop"
  className="inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-semibold rounded-full transition-all duration-500 hover:bg-white/10 hover:scale-105"
>
  {label}
</Link>
```

---

## Animation System

### Available Animations

#### `.animate-breathe`
- **Effect**: Gentle pulsing scale and opacity
- **Duration**: 8s
- **Use for**: Background orbs, floating elements

#### `.animate-pulse-glow`
- **Effect**: Pulsing glow effect
- **Duration**: 6s
- **Use for**: Icon containers, badges

#### `.animate-float`
- **Effect**: Floating movement
- **Duration**: 8s
- **Use for**: Decorative elements, particles

#### `.animate-rotate-slow`
- **Effect**: Slow rotation
- **Duration**: 40s
- **Use for**: Orbiting elements, decorative rings

#### `.animate-gradient-flow`
- **Effect**: Animated gradient background
- **Duration**: 6s
- **Use for**: Gradient text, animated backgrounds

### Animation Delays
Use `style={{ animationDelay: '-2s' }}` to stagger animations

### Hover Transitions
- **Standard**: `transition-all duration-500`
- **Fast**: `transition-colors duration-300`
- **Scale on hover**: `hover:scale-105`

---

## Layout Patterns

### Global Background Pattern
```jsx
<div className="min-h-screen relative">
  {/* Global background overlay */}
  <div className="fixed inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-full aurora opacity-50" />
    <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[150px] animate-breathe" />
    <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] animate-breathe" style={{ animationDelay: '-4s' }} />
  </div>

  <div className="relative">
    {/* Page content */}
  </div>
</div>
```

### Grid Patterns

#### Feature Grid (3 columns)
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <FeatureCard key={item.id} {...item} />
  ))}
</div>
```

#### Card Grid (4 columns)
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {items.map((item) => (
    <Card key={item.id} {...item} />
  ))}
</div>
```

---

## Spacing System

### Section Spacing
- **Section padding**: `py-32` (128px vertical)
- **Content max-width**: `max-w-7xl` (1280px)
- **Horizontal padding**: `px-4 sm:px-6 lg:px-8`
- **Section gap**: `mb-16` or `mb-20` between header and content

### Card Spacing
- **Card padding**: `p-6` (small), `p-8` (standard)
- **Card gap**: `gap-6` or `gap-8` between cards
- **Card border radius**: `rounded-2xl` or `rounded-3xl`

### Text Spacing
- **Title margin bottom**: `mb-6`
- **Subtitle margin bottom**: `mb-8` or `mb-12`
- **Paragraph spacing**: `leading-relaxed`

---

## Reusable Section Templates

### 1. Hero Section
```jsx
<Hero
  title={t("heroTitle")}
  subtitle={t("heroSubtitle")}
  primaryCta={{ href: "/subscribe", label: tCommon("startSubscription") }}
  secondaryCta={{ href: "/how-it-works", label: tCommon("learnMore") }}
  showMascot={true}
/>
```

### 2. Philosophy/About Section
```jsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-mint/15 to-transparent rounded-full blur-[100px]" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
        Our Philosophy
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {title}
      </h2>
      <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>

    {/* Content cards or grid */}
  </div>
</section>
```

### 3. Features Section
```jsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute top-1/2 left-0 w-[700px] h-[700px] bg-gradient-to-r from-brand-primary/12 to-transparent rounded-full blur-[150px] -translate-y-1/2" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-gold text-sm font-medium mb-6 tracking-wide">
        Our Difference
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {title}
      </h2>
      <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div key={index} className="glass-card rounded-3xl p-8 group">
          <div className="w-14 h-14 mb-6 bg-gradient-to-br from-brand-mint/30 to-brand-primary/30 rounded-2xl flex items-center justify-center icon-container text-brand-mint border border-white/10">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-mint transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-white/50 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 4. Pricing/Plans Section
```jsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-brand-gold/12 to-transparent rounded-full blur-[120px]" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-mint text-sm font-medium mb-6 tracking-wide">
        Simple Pricing
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {title}
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
          {/* Plan content */}
        </div>
      ))}
    </div>
  </div>
</section>
```

### 5. Testimonials Section
```jsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-brand-gold/10 to-transparent rounded-full blur-[120px]" />
  </div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <span className="inline-block glass px-5 py-2.5 rounded-full text-brand-gold text-sm font-medium mb-6 tracking-wide">
        Testimonials
      </span>
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
        {title}
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="glass-card rounded-3xl p-8">
          {/* Star ratings */}
          <div className="flex items-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-brand-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-white/70 mb-8 italic leading-relaxed text-lg">"{testimonial.quote}"</p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold">{testimonial.author.charAt(0)}</span>
            </div>
            <div>
              <p className="text-white font-semibold">{testimonial.author}</p>
              <p className="text-white/40 text-sm">{testimonial.location}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 6. Final CTA Section
```jsx
<section className="relative py-32 overflow-hidden">
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/15 via-brand-mint/8 to-brand-blue/15" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-radial from-brand-mint/10 to-transparent rounded-full blur-[200px] animate-breathe" />
  </div>

  <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <div className="glass-strong rounded-[48px] p-12 md:p-20">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
        {title}
      </h2>
      <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
        {subtitle}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/subscribe"
          className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(112,178,178,0.5)] hover:scale-105"
        >
          {primaryLabel}
          <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-3 px-10 py-5 glass text-white font-semibold rounded-full transition-all duration-500 hover:bg-white/10 hover:scale-105"
        >
          {secondaryLabel}
        </Link>
      </div>
    </div>
  </div>
</section>
```

---

## Best Practices

### 1. Background Orbs
- Use different sizes: 400px, 500px, 600px, 700px, 900px
- Position at edges: `top-0 right-0`, `bottom-0 left-0`, etc.
- Use blur: 80px to 200px
- Opacity: 0.05 to 0.15
- Add animation delays for variety

### 2. Glass Cards
- Always use `group` class for hover effects
- Use `rounded-3xl` for larger cards, `rounded-2xl` for smaller
- Add `icon-container` class to icon wrappers for hover effects
- Use gradient backgrounds for icon containers

### 3. Text Hierarchy
- Section titles: 4xl → 5xl → 6xl (responsive)
- Card titles: xl → 2xl
- Body text: Use opacity variants (white/50, white/70)

### 4. Spacing Consistency
- Section padding: Always `py-32`
- Content max-width: `max-w-7xl`
- Card gaps: `gap-6` or `gap-8`

### 5. Color Usage
- Badge colors: Match to section theme (mint, gold, mist)
- Icon colors: Use brand colors with gradients
- Text colors: White with opacity for hierarchy

---

## Quick Reference Checklist

When creating a new page, ensure:

- [ ] Use `relative py-32 overflow-hidden` for sections
- [ ] Add background orbs with brand colors (low opacity, high blur)
- [ ] Use section header pattern (badge + title + subtitle)
- [ ] Apply `glass-card` for content containers
- [ ] Use responsive grid patterns
- [ ] Add hover effects with `group` class
- [ ] Use gradient text for emphasis
- [ ] Include proper spacing (`mb-16` or `mb-20`)
- [ ] Add animation delays for staggered effects
- [ ] Use consistent max-width (`max-w-7xl`)

---

This design system ensures consistency across all pages while maintaining the elegant, modern glassmorphism aesthetic of the Jineau brand.












