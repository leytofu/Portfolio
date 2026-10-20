import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'light' | 'dark'
const themeChange = 'portfolio:theme-change'
let activeTransition: ViewTransition | undefined
let fallbackTimer: number | undefined
let pendingTheme: Theme | undefined
let switchVersion = 0

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function syncThemeColor(theme: Theme) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f4f1eb' : '#07070a')
}

function setThemeRevealOrigin() {
  const root = document.documentElement
  const toggle = document.querySelector<HTMLElement>('.theme-toggle')
  const rect = toggle?.getBoundingClientRect()
  const viewportWidth = root.clientWidth
  const viewportHeight = root.clientHeight
  const x = rect && rect.width > 0 ? rect.left + rect.width / 2 : viewportWidth / 2
  const y = rect && rect.height > 0 ? rect.top + rect.height / 2 : viewportHeight / 2
  const radius = Math.hypot(
    Math.max(x, viewportWidth - x),
    Math.max(y, viewportHeight - y),
  )

  root.style.setProperty('--theme-reveal-x', `${x}px`)
  root.style.setProperty('--theme-reveal-y', `${y}px`)
  root.style.setProperty('--theme-reveal-radius', `${radius}px`)
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  const version = ++switchVersion
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  activeTransition?.skipTransition()
  activeTransition = undefined
  if (fallbackTimer !== undefined) {
    window.clearTimeout(fallbackTimer)
    fallbackTimer = undefined
  }
  root.classList.remove('theme-switching', 'theme-fade')
  pendingTheme = theme

  const update = () => {
    if (version !== switchVersion) return
    // Include the React toggle icon in the same snapshot as the CSS colors.
    flushSync(() => {
      root.dataset.theme = theme
      root.classList.toggle('dark', theme === 'dark')
      syncThemeColor(theme)
      window.dispatchEvent(new Event(themeChange))
    })
    pendingTheme = undefined
  }
  const finish = () => {
    if (version !== switchVersion) return
    root.classList.remove('theme-switching')
    activeTransition = undefined
  }

  if (typeof document.startViewTransition === 'function' && !reducedMotion) {
    // One composited page reveal from the switch; descendants never animate
    // colors separately, so gradients and images stay pixel-perfect.
    root.classList.add('theme-switching')
    setThemeRevealOrigin()
    try {
      const transition = document.startViewTransition(update)
      activeTransition = transition
      // Rapid clicks intentionally skip the previous snapshot animation.
      void transition.ready.catch(() => {})
      void transition.finished.then(finish, finish)
      return
    } catch {
      root.classList.remove('theme-switching')
      activeTransition = undefined
      update()
      return
    }
  }

  if (reducedMotion) {
    update()
    return
  }

  // Fallback for browsers without View Transitions: crossfade the palette.
  root.classList.add('theme-fade')
  // Apply the transition rules before the theme variables change.
  void root.offsetWidth
  update()
  fallbackTimer = window.setTimeout(() => {
    fallbackTimer = undefined
    if (version !== switchVersion) return
    root.classList.remove('theme-fade')
  }, 450)
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
