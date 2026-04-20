import { cn } from '@/lib/utils'

type BgVariant = 'white' | 'cream' | 'black' | 'dark' | 'gray'

interface SectionProps {
  id?:        string
  bg?:        BgVariant
  className?: string
  children:   React.ReactNode
  tight?:     boolean  // less vertical padding
  ariaLabel?: string
}

const bgClasses: Record<BgVariant, string> = {
  white: 'bg-brand-light',
  cream: 'bg-[rgb(var(--color-light))]',
  black: 'bg-brand-dark',
  dark:  'bg-[#181818]',
  gray:  'bg-[#111111]',
}

export default function Section({
  id, bg = 'white', className, children, tight, ariaLabel
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        bgClasses[bg],
        tight ? 'py-16 px-[5%]' : 'py-24 px-[5%]',
        'md:py-24',
        className,
      )}
    >
      {children}
    </section>
  )
}
