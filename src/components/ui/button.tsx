import { cva, type VariantProps } from 'class-variance-authority'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-sky-400 text-navy-950 hover:bg-sky-300',
        secondary:
          'border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10',
        ghost: 'text-slate-200 hover:bg-white/10',
        danger: 'bg-red-400/20 text-red-100 hover:bg-red-400/30',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-9 px-3',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

