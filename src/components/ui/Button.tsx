'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'

type Variant = 'primary' | 'dark' | 'outline-white' | 'outline-dark' | 'whatsapp'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?:   Variant
  size?:      Size
  fullWidth?: boolean
  loading?:   boolean
  href?:      string
  external?:  boolean
  children:   React.ReactNode
  className?: string
  onClick?:   () => void
  type?:      'button' | 'submit' | 'reset'
  ariaLabel?: string
}

const variantClasses: Record<Variant, string> = {
  'primary':       'bg-brand-primary text-white border-brand-primary hover:bg-brand-primary/85 hover:shadow-[0_6px_20px_rgb(var(--color-primary)/0.35)] hover:-translate-y-0.5',
  'dark':          'bg-brand-dark text-white border-brand-dark hover:bg-brand-dark/80 hover:-translate-y-0.5',
  'outline-white': 'bg-transparent text-white border-white/30 hover:border-brand-secondary hover:text-brand-secondary',
  'outline-dark':  'bg-transparent text-brand-dark border-brand-dark/30 hover:border-brand-dark',
  'whatsapp':      'bg-[#25D366] text-white border-[#25D366] hover:bg-[#1da855] hover:-translate-y-0.5',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-[11px]',
  md: 'px-8 py-3.5 text-[12px]',
  lg: 'px-11 py-[17px] text-[13px]',
}

export default function Button({
  variant   = 'primary',
  size      = 'md',
  fullWidth = false,
  loading   = false,
  href,
  external  = false,
  children,
  className,
  onClick,
  type      = 'button',
  ariaLabel,
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center gap-2',
    'font-body font-bold tracking-[1.5px] uppercase',
    'border transition-all duration-150 active:scale-[0.98]',
    'whitespace-nowrap select-none',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    loading && 'opacity-70 pointer-events-none',
    className,
  )

  if (href) {
    // Pure hash link — render as <button> to prevent scroll-to-top / router navigation
    if (href === '#') {
      return (
        <button
          type="button"
          onClick={e => { e.preventDefault(); onClick?.() }}
          className={base}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      )
    }
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer"
           className={base} aria-label={ariaLabel}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={base} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={base}
            disabled={loading} aria-label={ariaLabel}>
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
