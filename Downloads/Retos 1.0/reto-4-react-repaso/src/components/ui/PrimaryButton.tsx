import type { ButtonHTMLAttributes } from 'react'

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({ className, ...props }: PrimaryButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60'

  const variant = props.disabled ? 'bg-slate-700 text-slate-100' : 'bg-indigo-500 text-white hover:bg-indigo-400'

  return (
    <button
      {...props}
      className={
        `${base} ${variant} ${className ?? ''}`.trim()
      }
    />
  )
}

