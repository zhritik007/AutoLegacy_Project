import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface CtaAction {
  label:    string
  href:     string
  variant:  'primary' | 'outline-white' | 'whatsapp' | 'dark'
  external?: boolean
}

interface CtaStripProps {
  eyebrow?: string
  title:    string
  actions:  CtaAction[]
  className?: string
}

export default function CtaStrip({ eyebrow, title, actions, className }: CtaStripProps) {
  return (
    <div className={cn('bg-brand-dark border-t border-white/[0.04] px-[5%] py-16', className)}>
      <div className="max-w-site mx-auto flex flex-col md:flex-row items-center
                      justify-between gap-8 flex-wrap">
        <div>
          {eyebrow && (
            <span className="block text-[11px] font-bold tracking-[3px] uppercase
                             text-brand-secondary mb-2.5">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-[clamp(32px,4vw,52px)] tracking-[2px]
                         leading-[0.95] text-white">
            {title}
          </h2>
        </div>
        <div className="flex flex-col gap-2.5 min-w-[240px]">
          {actions.map((a, i) => (
            <Button
              key={i}
              variant={a.variant}
              size="lg"
              href={a.href}
              external={a.external}
              fullWidth
            >
              {a.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
