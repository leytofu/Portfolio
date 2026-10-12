import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'motion/react'
import { PageTransition } from '@/components/PageTransition'
import { ScrollToTop } from '@/components/ScrollToTop'
import { ThemeBlurOverlay } from '@/components/ThemeBlurOverlay'
import { VSCodeLayout } from '@/components/VSCodeLayout'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'
import ProjectDetail from '@/pages/ProjectDetail'
import Projects from '@/pages/Projects'
import Resume from '@/pages/Resume'
import Skills from '@/pages/Skills'

function Shell() {
  const location = useLocation()

  return (
    <>
      {/* Theme-switch blur layer. Rendered as a sibling of the layout so no
          transformed ancestor can turn `position: fixed` into a containing
          block. `pointer-events: none` keeps it fully non-interactive. */}
      <ThemeBlurOverlay />
      <VSCodeLayout>
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
            path="/resume"
            element={
              <PageTransition>
                <Resume />
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
      </VSCodeLayout>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
