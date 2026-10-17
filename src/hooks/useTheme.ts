import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'
const themeChange = 'portfolio:theme-change'
let activeTransition: ViewTransition | undefined
let pendingTheme: Theme | undefined
let switchVersion = 0

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const version = ++switchVersion
  activeTransition?.skipTransition()
  activeTransition = undefined
  pendingTheme = theme
  root.classList.add('theme-switching')

  const update = () => {
    if (version !== switchVersion) return
    // Include the React toggle icon in the same snapshot as the CSS colors.
    flushSync(() => {
      root.dataset.theme = theme
      root.classList.toggle('dark', theme === 'dark')
      window.dispatchEvent(new Event(themeChange))
    })
    pendingTheme = undefined
  }
  const finish = () => {
    if (version !== switchVersion) return
    root.classList.remove('theme-switching')
    activeTransition = undefined
  }

  if (
    typeof document.startViewTransition === 'function' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    // One composited page fade; descendants never animate colors separately.
    activeTransition = document.startViewTransition(update)
    // Rapid clicks intentionally skip the previous snapshot animation.
    void activeTransition.ready.catch(() => {})
    void activeTransition.finished.then(finish, finish)
  } else {
    update()
    // Paint the atomic change before restoring ordinary hover transitions.
    requestAnimationFrame(() => requestAnimationFrame(finish))
  }
}

export function setTheme(theme: Theme) {
  applyTheme(theme)
  try {
    localStorage.setItem('theme', theme)
  } catch {
    /* Storage may be disabled in private or embedded browsers. */
  }
}

export function toggleTheme() {
  setTheme((pendingTheme ?? getTheme()) === 'dark' ? 'light' : 'dark')
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia('(prefers-color-scheme: light)')
  const onSystemChange = () => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'light' || stored === 'dark') return
    } catch {
      /* Follow the system when no preference can be saved. */
    }
    applyTheme(getSystemTheme())
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key !== 'theme' && event.key !== null) return
    const stored = event.newValue
    applyTheme(stored === 'light' || stored === 'dark' ? stored : getSystemTheme())
  }

  window.addEventListener(themeChange, onChange)
  window.addEventListener('storage', onStorage)
  media.addEventListener('change', onSystemChange)
  return () => {
    window.removeEventListener(themeChange, onChange)
    window.removeEventListener('storage', onStorage)
    media.removeEventListener('change', onSystemChange)
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'dark' as const)
}
