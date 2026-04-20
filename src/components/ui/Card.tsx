import { cn } from '@/lib/utils'

interface CardProps {
  className?: string
  children:   React.ReactNode
  hover?:     boolean
  dark?:      boolean
  padding?:   'sm' | 'md' | 'lg'
  as?:        'div' | 'article' | 'li'
}

const padClasses = { sm: 'p-5', md: 'p-8', lg: 'p-10' }

export default function Card({
  className, children, hover, dark, padding = 'md', as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={cn(
        'border transition-all duration-200',
        dark
          ? 'bg-white/[0.03] border-white/[0.07] text-white'
          : 'bg-[rgb(var(--color-light))] border-[rgb(var(--color-light))] text-[rgb(var(--color-dark))]',
        hover && 'hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(0,0,0,0.18)] hover:border-transparent',
        padClasses[padding],
        className,
      )}
    >
      {children}
    </Tag>
  )
}
