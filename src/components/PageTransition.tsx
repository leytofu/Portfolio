import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

export function PageTransition({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className="page-transition">{children}</div>
  }

  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
