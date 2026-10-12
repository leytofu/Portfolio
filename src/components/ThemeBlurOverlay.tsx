import { useEffect, useRef } from 'react'

/**
 * Full-viewport overlay that produces the theme-switch blur.
 *
 * Design notes:
 * - `pointer-events: none` guarantees clicks, typing, scrolling, and screen
 *   readers are never blocked while it is on screen.
 * - `position: fixed` with no transformed ancestor means zero layout impact
 *   and no reflow when it appears or disappears.
 * - The blur is a constant `backdrop-filter`; only `opacity` is animated.
 *   Opacity is compositor-only, so this stays cheap even though the layer
 *   covers the viewport.
 * - Cleanup happens on `animationend`, not a JS timer, so the `html` class
 *   that lengthens theme colour transitions is removed at the exact frame
 *   the blur finishes.
 */
export function ThemeBlurOverlay() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleAnimationEnd = (event: AnimationEvent) => {
      // Only react to our own animation, not any descendant animation.
      if (event.target !== el) return
      document.documentElement.classList.remove('theme-transitioning')
    }

    el.addEventListener('animationend', handleAnimationEnd)
    return () => el.removeEventListener('animationend', handleAnimationEnd)
  }, [])

  return <div ref={ref} className="theme-blur-overlay" aria-hidden="true" />
}
