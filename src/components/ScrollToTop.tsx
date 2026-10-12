import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function getEditorScroller() {
  return document.getElementById('editor-scroll-container')
}

export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const scroller = getEditorScroller()
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el && scroller) {
        const top = el.offsetTop - 60
        scroller.scrollTo({ top, behavior: 'smooth' })
        return
      }
    }
    if (scroller) {
      scroller.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}
