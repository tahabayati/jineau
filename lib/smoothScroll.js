/**
 * Enhanced smooth scroll utilities
 * Provides smoother scrolling with custom easing
 */

/**
 * Easing function for smooth scrolling
 * @param {number} t - Current time (0 to 1)
 * @returns {number} - Eased value
 */
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

/**
 * Smooth scroll to element with custom easing
 * @param {string|HTMLElement} target - Element or selector to scroll to
 * @param {Object} options - Scroll options
 */
export const smoothScrollTo = (target, options = {}) => {
  const {
    duration = 1000,
    offset = -80, // Account for fixed header
    callback = null,
  } = options

  const element = typeof target === 'string' 
    ? document.querySelector(target) 
    : target

  if (!element) return

  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime = null

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const ease = easeInOutCubic(progress)

    window.scrollTo(0, startPosition + distance * ease)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    } else {
      if (callback) callback()
    }
  }

  requestAnimationFrame(animation)
}

/**
 * Smooth scroll to top of page
 * @param {Object} options - Scroll options
 */
export const smoothScrollToTop = (options = {}) => {
  const { duration = 800, callback = null } = options
  
  const startPosition = window.pageYOffset
  let startTime = null

  const animation = (currentTime) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const ease = easeInOutCubic(progress)

    window.scrollTo(0, startPosition * (1 - ease))

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    } else {
      if (callback) callback()
    }
  }

  requestAnimationFrame(animation)
}

/**
 * React hook for smooth scroll
 * Usage: const scrollTo = useSmoothScroll()
 *        scrollTo('#section')
 */
export const useSmoothScroll = () => {
  return (target, options) => smoothScrollTo(target, options)
}

/**
 * Add smooth scroll to all anchor links on the page
 */
export const initSmoothScrollLinks = () => {
  if (typeof window === 'undefined') return

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href')
      
      // Skip if it's just "#" or empty
      if (!href || href === '#') return
      
      e.preventDefault()
      smoothScrollTo(href, { duration: 800 })
      
      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, href)
      }
    })
  })
}

