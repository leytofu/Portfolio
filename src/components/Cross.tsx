interface CrossProps {
  className?: string
}

export function Cross({ className = '' }: CrossProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 12 12"
      className={`pointer-events-none absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600 ${className}`}
    >
      <path d="M6 0v12M0 6h12" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
