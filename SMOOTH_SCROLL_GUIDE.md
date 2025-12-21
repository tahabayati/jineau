# Smooth Scroll Guide

## Overview
Your website now has enhanced smooth scrolling functionality throughout. This guide explains what was added and how to use it.

---

## Features Added

### 1. ✨ Automatic Smooth Scrolling
All anchor links (links starting with `#`) automatically scroll smoothly.

**Example:**
```jsx
<Link href="#about">About Us</Link>
// This will smoothly scroll to the element with id="about"
```

**No configuration needed!** It works automatically across your entire site.

---

### 2. 🚀 Back to Top Button
A floating "Back to Top" button appears when you scroll down 300px.

**Features:**
- Smooth fade-in/out animation
- Beautiful gradient styling matching your brand
- Smooth scroll animation when clicked
- Performance optimized with throttling
- Accessible with proper ARIA labels

**Location:** Bottom right corner of the screen

---

### 3. 📏 Smart Scroll Positioning
All scrolling automatically accounts for your fixed header (80px offset).

**What this means:**
- When scrolling to an anchor, content appears below the header (not hidden behind it)
- Proper spacing for all internal navigation
- Works on all pages automatically

---

## Custom Usage (For Developers)

### Programmatic Smooth Scrolling

If you need to trigger smooth scrolling from your code:

```jsx
import { smoothScrollTo, smoothScrollToTop } from "@/lib/smoothScroll"

// Scroll to a specific element
const handleClick = () => {
  smoothScrollTo('#section-id', {
    duration: 1000,     // Animation duration in ms (default: 1000)
    offset: -100,       // Offset from top in pixels (default: -80)
    callback: () => {   // Optional callback after scroll
      console.log('Scroll complete!')
    }
  })
}

// Scroll to top of page
const scrollTop = () => {
  smoothScrollToTop({
    duration: 800,      // Animation duration in ms (default: 800)
    callback: () => {   // Optional callback
      console.log('At top!')
    }
  })
}
```

### React Hook Usage

Use the hook in your React components:

```jsx
'use client'

import { smoothScrollTo } from "@/lib/smoothScroll"

export default function MyComponent() {
  const handleScroll = () => {
    smoothScrollTo('#target-section', { duration: 600 })
  }

  return (
    <button onClick={handleScroll}>
      Scroll to section
    </button>
  )
}
```

---

## CSS Enhancements

### Scroll Padding
The site now has `scroll-padding-top: 5rem` which ensures anchors scroll to the right position below your fixed header.

### Smooth Scrollbar
- Wider scrollbar (8px instead of 6px)
- Smooth color transitions on hover
- Consistent styling across browsers
- Firefox support included

### Scroll Margin
All elements have `scroll-margin-top: 5rem` ensuring proper positioning when scrolling to anchors.

---

## Browser Support

✅ **Chrome/Edge**: Full support with hardware acceleration  
✅ **Firefox**: Full support with custom scrollbar  
✅ **Safari**: Full support with webkit optimization  
✅ **Mobile**: Optimized touch scrolling  

---

## Accessibility

All smooth scroll features respect user preferences:
- Users with `prefers-reduced-motion: reduce` get instant scrolling (no animation)
- Proper ARIA labels on interactive elements
- Keyboard navigation support
- Focus management maintained

---

## Performance

All smooth scroll features are optimized:
- ⚡ Uses `requestAnimationFrame` for 60fps smooth animation
- ⚡ Throttled scroll event listeners (no performance impact)
- ⚡ Passive event listeners for better scrolling
- ⚡ Memoized components to prevent re-renders

---

## Customization

### Change Scroll Duration
Edit `/lib/smoothScroll.js` and modify the default duration:

```javascript
// Change default from 1000ms to 600ms for faster scrolling
duration = 600
```

### Change Header Offset
Edit `/app/globals.css`:

```css
html {
  scroll-padding-top: 5rem; /* Change this value */
}
```

### Customize Back to Top Button
Edit `/components/ScrollToTop.jsx`:
- Change appearance threshold (currently 300px)
- Modify button styling
- Change animation duration
- Adjust button position

---

## Examples

### Scroll to Section on Click
```jsx
<button onClick={() => smoothScrollTo('#contact')}>
  Contact Us
</button>
```

### Scroll to Top After Form Submit
```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  await submitForm()
  smoothScrollToTop({ duration: 600 })
}
```

### Scroll with Callback
```jsx
smoothScrollTo('#newsletter', {
  duration: 800,
  callback: () => {
    // Focus on input after scroll
    document.querySelector('#email-input').focus()
  }
})
```

---

## Troubleshooting

### Issue: Anchor links don't scroll smoothly
**Solution:** The links should work automatically. Make sure you're using `#id` format in your href.

### Issue: Content is hidden behind header
**Solution:** Already fixed! The scroll offset accounts for the fixed header.

### Issue: Back to Top button not showing
**Solution:** Make sure you've scrolled down at least 300px on the page.

### Issue: Scrolling feels too fast/slow
**Solution:** Adjust the `duration` parameter in your scroll function calls.

---

## Best Practices

1. **Use Descriptive IDs**: Make sure your anchor targets have meaningful IDs
   ```jsx
   <section id="about-us">...</section>
   ```

2. **Don't Overuse**: Let the automatic smooth scroll handle most cases

3. **Test on Mobile**: Always test smooth scrolling on touch devices

4. **Respect User Preferences**: The system automatically respects `prefers-reduced-motion`

---

## Files Reference

- `/lib/smoothScroll.js` - Smooth scroll utilities
- `/components/ScrollToTop.jsx` - Back to top button
- `/components/SmoothScrollInit.jsx` - Automatic initialization
- `/app/globals.css` - Scroll styling and behavior

---

**Questions?** Check the code comments in the smooth scroll utilities for more details.

**Enjoying the smooth scroll?** Consider adding more interactive scroll-based animations to enhance the user experience further!

---

Last Updated: December 21, 2025

