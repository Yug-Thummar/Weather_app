import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-white/10 bg-navy-900/80 px-4 text-sm text-white placeholder:text-slate-400',
        className,
      )}
      {...props}
    />
  )
}
