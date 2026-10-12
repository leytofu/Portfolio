import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  try {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'light' || stored === 'dark') return stored
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  } catch {
    /* storage unavailable */
  }
  return 'dark'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  // Remove initial page load transition lock after first frame
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.documentElement.classList.remove('preload-no-transition')
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    // Only run the blur + slow colour ramp when motion is welcome.
    // Under prefers-reduced-motion the switch stays instant (the global
    // reduced-motion rule already collapses every transition).
    const allowMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (allowMotion) {
      // The overlay removes the class itself on animationend. If a second
      // toggle lands mid-animation we simply leave the class in place — the
      // running veil keeps going and the new colour change happens under it.
      // Deliberately no `offsetWidth` reflow here: forcing layout on the
      // click frame is itself a visible stall on a large page.
      document.documentElement.classList.add('theme-transitioning')
    }

    // Synchronously mutate DOM attributes on the exact click frame.
    // data-theme is set in the same turn as the class above, so the
    // colour transition that starts now already resolves the 1000ms token.
    document.documentElement.setAttribute('data-theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    try {
      localStorage.setItem('theme', nextTheme)
    } catch {
      /* storage unavailable */
    }
    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
    >
      <div className="theme-toggle__icon-wrap">
        {/* Sun Icon */}
        <svg
          className={`theme-toggle__icon theme-toggle__icon--sun ${
            theme === 'dark' ? 'theme-toggle__icon--active' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="4" />
          <line x1="12" y1="20" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="4" y2="12" />
          <line x1="20" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.07" y2="4.93" />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`theme-toggle__icon theme-toggle__icon--moon ${
            theme === 'light' ? 'theme-toggle__icon--active' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>
    </button>
  )
}
