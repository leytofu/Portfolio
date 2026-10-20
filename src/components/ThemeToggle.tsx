import { useEffect } from 'react'
import { toggleTheme, useTheme } from '@/hooks/useTheme'

export function ThemeToggle() {
  const theme = useTheme()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.documentElement.classList.remove('preload-no-transition')
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle"
      role="switch"
      aria-checked={theme === 'light'}
      aria-label="Light mode"
      title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <span className="theme-toggle__icon-wrap">
        {/* Sun Icon */}
        <svg
          className={`theme-toggle__icon theme-toggle__icon--sun ${
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
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  )
}
