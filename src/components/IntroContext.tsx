import { createContext, useContext, type ReactNode } from 'react'

const IntroActiveContext = createContext(false)

/** Lets the hero know that the cinematic intro is still covering the page. */
export function IntroProvider({
  active,
  children,
}: {
  active: boolean
  children: ReactNode
}) {
  return <IntroActiveContext.Provider value={active}>{children}</IntroActiveContext.Provider>
}

export function useIntroActive() {
  return useContext(IntroActiveContext)
}
