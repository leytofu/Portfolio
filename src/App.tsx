import { useCallback, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { CinematicIntro } from '@/components/CinematicIntro'
import { IntroProvider } from '@/components/IntroContext'
import { PageTransition } from '@/components/PageTransition'
import { ScrollToTop } from '@/components/ScrollToTop'
import { SiteLayout } from '@/components/SiteLayout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import ProjectDetail from '@/pages/ProjectDetail'
import Projects from '@/pages/Projects'
import Skills from '@/pages/Skills'

const INTRO_KEY = 'cn-intro-seen'

function shouldPlayIntro() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false

  const forced = new URLSearchParams(window.location.search).get('intro') === '1'
  const pathname = window.location.pathname.replace(/\/+$/, '')
  const homePath = import.meta.env.BASE_URL.replace(/\/+$/, '')
  if (!forced && pathname !== homePath) return false

  try {
    if (!forced && sessionStorage.getItem(INTRO_KEY) === '1') return false
  } catch {
    // Storage can be unavailable in private modes; play the intro anyway.
  }

  return true
}

function Shell() {
  const location = useLocation()
  const [introOpen, setIntroOpen] = useState(shouldPlayIntro)
  const [introActive, setIntroActive] = useState(introOpen)
  const [introCovering, setIntroCovering] = useState(introOpen)

  const finishIntro = useCallback(() => {
    setIntroOpen(false)
    setIntroActive(false)
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      // Ignore storage failures.
    }
  }, [])

  useEffect(() => {
    if (!introCovering) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [introCovering])

  return (
    <>
      <IntroProvider active={introActive}>
        <div aria-hidden={introCovering || undefined}>
          <SiteLayout>
            <ScrollToTop />
            <AnimatePresence mode="wait" initial={false}>
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <PageTransition>
                      <Home />
                    </PageTransition>
                  }
                />
                <Route
                  path="/projects"
                  element={
                    <PageTransition>
                      <Projects />
                    </PageTransition>
                  }
                />
                <Route
                  path="/projects/:id"
                  element={
                    <PageTransition>
                      <ProjectDetail />
                    </PageTransition>
                  }
                />
                <Route
                  path="/about"
                  element={
                    <PageTransition>
                      <About />
                    </PageTransition>
                  }
                />
                <Route
                  path="/skills"
                  element={
                    <PageTransition>
                      <Skills />
                    </PageTransition>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <PageTransition>
                      <Contact />
                    </PageTransition>
                  }
                />
                <Route
                  path="*"
                  element={
                    <PageTransition>
                      <NotFound />
                    </PageTransition>
                  }
                />
              </Routes>
            </AnimatePresence>
          </SiteLayout>
        </div>
      </IntroProvider>

      <AnimatePresence onExitComplete={() => setIntroCovering(false)}>
        {introOpen ? <CinematicIntro onFinish={finishIntro} /> : null}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Shell />
    </BrowserRouter>
  )
}
