import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?:   string
  title:      string | React.ReactNode
  subtitle?:  string
  center?:    boolean
  dark?:      boolean
  className?: string
}

export default function SectionHeader({
  eyebrow, title, subtitle, center, dark, className,
}: SectionHeaderProps) {
  return (
    <div className={cn(center && 'text-center', className)}>
      {eyebrow && (
        <span className={cn(
          'block text-[11px] font-bold tracking-[3px] uppercase mb-2.5',
          dark ? 'text-brand-secondary' : 'text-brand-primary',
        )}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        'font-display tracking-[2px] leading-[0.95]',
        'text-[clamp(40px,5.5vw,72px)]',
        dark ? 'text-white' : 'text-brand-dark',
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          'mt-4 text-base leading-[1.75] max-w-[520px]',
          center && 'mx-auto',
          dark ? 'text-white/45' : 'text-[rgb(var(--color-dark)/0.55)]',
        )}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
