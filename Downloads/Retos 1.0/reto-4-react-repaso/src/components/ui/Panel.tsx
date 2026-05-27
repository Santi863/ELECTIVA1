import type { ReactNode } from 'react'

type PanelProps = {
  children: ReactNode
  className?: string
}

export function Panel({ children, className }: PanelProps) {
  return (
    <section
      className={
        className ??
        'rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm'
      }
    >
      {children}
    </section>
  )
}

