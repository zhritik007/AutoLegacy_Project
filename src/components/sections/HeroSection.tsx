import Button from '@/components/ui/Button'
import { siteConfig } from '@/config/siteConfig'

interface Stat {
  value:  number | string
  suffix: string
  label:  string
}

interface HeroProps {
  eyebrow:    string
  headline:   [string, string, string]  // [before, colored, after]
  subtext:    string
  ctaPrimary:   { label: string; href: string }
  ctaSecondary: { label: string; href: string }
  stats:      Stat[]
}

export default function HeroSection({
  eyebrow, headline, subtext, ctaPrimary, ctaSecondary, stats,
}: HeroProps) {
  return (
    <section
      className="relative min-h-screen bg-brand-dark flex items-center pt-[var(--nav-height,72px)] overflow-hidden"
      aria-label="Welcome"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 55% 75% at 75% 55%, rgb(var(--color-primary)/0.13) 0%, transparent 60%),
            radial-gradient(ellipse 35% 50% at 15% 85%, rgb(var(--color-secondary)/0.06) 0%, transparent 50%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-site mx-auto w-full px-[5%] pb-32 pt-12">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2.5 border border-brand-secondary/40 text-brand-secondary
                        text-[11px] font-bold tracking-[2.5px] uppercase px-4 py-1.5 mb-7
                        animate-[fadeUp_.5s_.1s_ease-out_both]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-[pulseDot_2.2s_infinite] shrink-0" />
          {eyebrow}
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(72px,11vw,140px)] leading-[.9] tracking-[3px] text-white
                       animate-[fadeUp_.5s_.2s_ease-out_both]">
          {headline[0]}
          <span className="block text-brand-primary">{headline[1]}</span>
          {headline[2]}
        </h1>

        {/* Subtext */}
        <p className="mt-7 mb-11 text-[17px] leading-[1.75] text-white/45 max-w-[480px]
                      animate-[fadeUp_.5s_.3s_ease-out_both]">
          {subtext}
        </p>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap animate-[fadeUp_.5s_.4s_ease-out_both]">
          <Button variant="primary" size="lg" href={ctaPrimary.href}>
            {ctaPrimary.label}
          </Button>
          <Button variant="outline-white" size="lg" href={ctaSecondary.href}>
            {ctaSecondary.label}
          </Button>
        </div>

        {/* Stats */}
        <div className="flex mt-14 border-t border-white/[0.07] animate-[fadeUp_.5s_.5s_ease-out_both]
                        flex-wrap">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="py-5 px-8 border-r border-white/[0.07] last:border-r-0 text-center
                         first:pl-0"
            >
              <div className="font-display text-[38px] text-white leading-none tracking-wide">
                {stat.value}
                <em className="not-italic text-brand-primary">{stat.suffix}</em>
              </div>
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-white/28 mt-1.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-9 left-[5%] flex items-center gap-3
                      text-[10px] font-bold tracking-[2px] uppercase text-white/20
                      animate-[fadeUp_.5s_.6s_ease-out_both]"
           aria-hidden="true">
        <span className="w-10 h-px bg-white/15" />
        Scroll to explore
      </div>
    </section>
  )
}
