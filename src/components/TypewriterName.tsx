import { useEffect, useState } from 'react'

interface TypewriterNameProps {
  first: string
  last: string
  /** Typing begins when true; the Home page waits for the intro overlay to clear. */
  start: boolean
}

/** Milliseconds between typed characters. */
const SPEED = 70
/** Pause after the first line before the surname starts. */
const LINE_PAUSE = 260
/** Delay before the first character so the hero reveal can settle. */
const START_DELAY = 500
/** How long the finished name stays on screen before it is erased. */
const HOLD_DELAY = 2200
/** Milliseconds between erased characters (undo runs faster than typing). */
const ERASE_SPEED = 45
/** Pause between erasing the surname and the first name. */
const ERASE_LINE_PAUSE = 180
/** How long the empty heading waits before typing again. */
const REST_DELAY = 700

type Phase =
  | 'typing-first'
  | 'typing-last'
  | 'holding'
  | 'erasing-last'
  | 'erasing-first'
  | 'resting'

/**
 * Types the hero name, holds it, erases it, and starts over.
 *
 * - Types "Charlie" then "Nozares", holds, erases back to empty, then repeats.
 * - Reserves both line heights up front so the hero never jumps.
 * - Renders the full name as the heading's accessible label while the
 *   animated glyphs stay `aria-hidden`.
 * - Shows the finished name immediately under `prefers-reduced-motion`.
 */
export function TypewriterName({ first, last, start }: TypewriterNameProps) {
  const [reducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [firstCount, setFirstCount] = useState(() => (reducedMotion ? first.length : 0))
  const [lastCount, setLastCount] = useState(() => (reducedMotion ? last.length : 0))

  useEffect(() => {
    if (!start || reducedMotion) return

    let cancelled = false
    let timer = 0
    let firstN = 0
    let lastN = 0
    let phase: Phase = 'typing-first'

    const schedule = (ms: number) => {
      timer = window.setTimeout(() => {
        if (!cancelled) step()
      }, ms)
    }

    const step = () => {
      switch (phase) {
        case 'typing-first':
          firstN += 1
          setFirstCount(firstN)
          if (firstN >= first.length) {
            phase = 'typing-last'
            schedule(LINE_PAUSE)
          } else {
            schedule(SPEED)
          }
          break

        case 'typing-last':
          lastN += 1
          setLastCount(lastN)
          if (lastN >= last.length) {
            phase = 'holding'
            schedule(HOLD_DELAY)
          } else {
            schedule(SPEED)
          }
          break

        case 'holding':
          phase = 'erasing-last'
          schedule(ERASE_SPEED)
          break

        case 'erasing-last':
          lastN -= 1
          setLastCount(lastN)
          if (lastN <= 0) {
            phase = 'erasing-first'
            schedule(ERASE_LINE_PAUSE)
          } else {
            schedule(ERASE_SPEED)
          }
          break

        case 'erasing-first':
          firstN -= 1
          setFirstCount(firstN)
          if (firstN <= 0) {
            phase = 'resting'
            schedule(REST_DELAY)
          } else {
            schedule(ERASE_SPEED)
          }
          break

        case 'resting':
          phase = 'typing-first'
          schedule(LINE_PAUSE)
          break
      }
    }

    schedule(START_DELAY)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [start, reducedMotion, first, last])

  // The caret waits at the start of the surname line once the first name is complete.
  const caretOnLastLine = firstCount >= first.length

  return (
    <h1 className="hero__title" aria-label={`${first} ${last}`}>
      <span className="hero__title-line" aria-hidden="true">
        {first.slice(0, firstCount)}
        {!caretOnLastLine && <span className="hero__caret" />}
      </span>
      <span className="hero__title-line grad-text" aria-hidden="true">
        {last.slice(0, lastCount)}
        {caretOnLastLine && <span className="hero__caret" />}
      </span>
    </h1>
  )
}
