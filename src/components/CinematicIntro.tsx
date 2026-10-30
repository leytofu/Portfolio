import {
  useEffect,
  useRef,
  useState,
} from 'react'
import { motion } from 'motion/react'
import portfolio from '@/data/portfolio.json'

// 1.5s title card + 0.5s curtain exit = 2s end to end.
const INTRO_DURATION = 1500
const EXIT_DURATION = 0.5
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EASE_IN_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1]

const fullName = `${portfolio.hero.firstName} ${portfolio.hero.lastName}`
const roleParts = portfolio.hero.role.toUpperCase().split(' ')
const roleFirst = roleParts[0]
const roleSecond = roleParts.slice(1).join(' ')
const year = new Date().getFullYear()

function IntroCounter() {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const started = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(Math.max((now - started - 100) / 950, 0), 1)
      setValue(Math.round(progress * 100))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <span className="intro__counter" aria-hidden="true">
      {String(value).padStart(3, '0')}
    </span>
  )
}

/**
 * A short, typography-led opening sequence.
 *
 * A small name sits above a left-aligned two-line role. The first line runs
 * into a hairline rule, the second is prefixed with a tilde. Soft gradient
 * fields drift behind the composition; the scene then lifts, blurs and
 * dissolves into the page. Reduced-motion visitors skip it entirely.
 */
export function CinematicIntro({ onFinish }: { onFinish: () => void }) {
  const skipRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(onFinish, INTRO_DURATION)
    return () => window.clearTimeout(timer)
  }, [onFinish])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onFinish()
      }

      if (event.key === 'Tab' && !event.ctrlKey && !event.metaKey && !event.altKey) {
        event.preventDefault()
        skipRef.current?.focus({ preventScroll: true })
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onFinish])

  useEffect(() => {
    skipRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <motion.div
      className="intro"
      role="dialog"
      aria-modal="true"
      aria-label={`${fullName} portfolio intro`}
      exit={{
        opacity: 0,
        transition: { duration: EXIT_DURATION, ease: EASE_IN_OUT },
      }}
    >
      <motion.div
        className="intro__content"
        exit={{
          opacity: 0,
          y: -26,
          scale: 1.025,
          filter: 'blur(10px)',
          transition: { duration: 0.4, ease: EASE_OUT },
        }}
      >
        <div className="intro__name-block">
          <motion.p
            className="intro__eyebrow"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.45, ease: EASE_OUT }}
          >
            {fullName}
          </motion.p>

          <h2 className="intro__title" aria-label={portfolio.hero.role}>
            <span className="intro__title-row">
              <span className="intro__line">
                <motion.span
                  className="intro__line-inner"
                  initial={{
                    y: '115%',
                    opacity: 0,
                    scale: 1.03,
                    letterSpacing: '-0.09em',
                    filter: 'blur(12px)',
                  }}
                  animate={{
                    y: '0%',
                    opacity: 1,
                    scale: 1,
                    letterSpacing: '-0.065em',
                    filter: 'blur(0px)',
                  }}
                  transition={{ delay: 0.18, duration: 0.68, ease: EASE_OUT }}
                >
                  {roleFirst}
                </motion.span>
              </span>

              <motion.span
                className="intro__title-rule"
                aria-hidden="true"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.34, duration: 0.72, ease: EASE_IN_OUT }}
              />
            </span>

            <span className="intro__title-row">
              <motion.span
                className="intro__tilde"
                aria-hidden="true"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.45, ease: EASE_OUT }}
              >
                ~
              </motion.span>

              <span className="intro__line">
                <motion.span
                  className="intro__line-inner grad-text"
                  initial={{
                    y: '115%',
                    opacity: 0,
                    scale: 1.03,
                    letterSpacing: '-0.09em',
                    filter: 'blur(12px)',
                  }}
                  animate={{
                    y: '0%',
                    opacity: 1,
                    scale: 1,
                    letterSpacing: '-0.065em',
                    filter: 'blur(0px)',
                  }}
                  transition={{ delay: 0.25, duration: 0.68, ease: EASE_OUT }}
                >
                  {roleSecond}
                </motion.span>
              </span>
            </span>
          </h2>
        </div>
      </motion.div>

      <motion.div
        className="intro__hud intro__hud--top"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        transition={{ delay: 0.1, duration: 0.45, ease: EASE_OUT }}
      >
        <span className="intro__hud-brand">
          <span className="intro__hud-dot" aria-hidden="true" />
          Portfolio
        </span>
        <span>{year}</span>
      </motion.div>

      <motion.div
        className="intro__hud intro__hud--bottom"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8, transition: { duration: 0.25 } }}
        transition={{ delay: 0.12, duration: 0.45, ease: EASE_OUT }}
      >
        
        <div className="intro__load">
          <IntroCounter />
        </div>
        
        <div className="intro__progress" aria-hidden="true">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.1, duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        <button
          ref={skipRef}
          type="button"
          className="intro__skip"
          onClick={onFinish}
        >
          Skip intro
        </button>
      </motion.div>
    </motion.div>
  )
}
