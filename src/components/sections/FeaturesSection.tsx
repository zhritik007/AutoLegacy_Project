import SectionHeader from '@/components/ui/SectionHeader'
import Section from '@/components/ui/Section'

interface Feature {
  num:   string
  title: string
  desc:  string
}

interface FeatureProps {
  eyebrow:  string
  title:    string
  subtitle: string
  features: Feature[]
  quote?: {
    text:     string
    name:     string
    label:    string
    initials: string
    rating:   number
  }
  miniStats?: { value: string; label: string; variant: 'primary' | 'secondary' }[]
}

export default function FeaturesSection({
  eyebrow, title, subtitle, features, quote, miniStats
}: FeatureProps) {
  return (
    <Section id="why" bg="black" ariaLabel="Why choose us">
      <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            subtitle={subtitle}
            dark
          />
          <div className="w-12 h-0.5 bg-brand-primary mt-5 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="border-l-2 border-brand-primary pl-4">
                <div className="font-display text-[52px] leading-none text-white/[0.06] -mb-1.5">
                  {f.num}
                </div>
                <div className="text-[15px] font-semibold text-white mb-2">{f.title}</div>
                <div className="text-[13px] text-white/40 leading-[1.7]">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4">
          {quote && (
            <div className="bg-white/[0.04] border border-white/[0.07] p-8">
              <div className="text-brand-secondary text-sm tracking-[1px] mb-3">
                {'★'.repeat(quote.rating)}
              </div>
              <blockquote className="font-serif text-lg italic text-white leading-[1.6] mb-5">
                "{quote.text}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center
                                justify-content-center font-display text-brand-primary text-base
                                flex-shrink-0 flex items-center justify-center">
                  {quote.initials}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-white">{quote.name}</div>
                  <div className="text-[11px] text-white/30 mt-0.5">{quote.label}</div>
                </div>
              </div>
            </div>
          )}

          {miniStats && (
            <div className="grid grid-cols-2 gap-3">
              {miniStats.map((s, i) => (
                <div
                  key={i}
                  className={`p-6 text-center border ${
                    s.variant === 'primary'
                      ? 'bg-brand-primary/[0.07] border-brand-primary/15'
                      : 'bg-brand-secondary/[0.07] border-brand-secondary/15'
                  }`}
                >
                  <div className={`font-display text-[38px] leading-none tracking-wide ${
                    s.variant === 'primary' ? 'text-brand-primary' : 'text-brand-secondary'
                  }`}>
                    {s.value}
                  </div>
                  <div className="text-[10px] font-bold tracking-[1.5px] uppercase text-white/28 mt-1.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Section>
  )
}
