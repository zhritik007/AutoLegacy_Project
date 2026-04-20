import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'

interface Testimonial {
  text:     string
  name:     string
  label:    string
  initials: string
  rating:   number
}

interface TestimonialsSectionProps {
  eyebrow:      string
  title:        string
  testimonials: Testimonial[]
  reviewLink?:  string
  reviewCount?: number
}

export default function TestimonialsSection({
  eyebrow, title, testimonials, reviewLink, reviewCount,
}: TestimonialsSectionProps) {
  return (
    <Section id="reviews" bg="white" ariaLabel="Customer testimonials">
      <div className="max-w-site mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} center className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="relative border border-gray-100 p-8 bg-white
                         transition-all duration-200
                         hover:border-brand-primary hover:shadow-md"
              aria-label={`Testimonial from ${t.name}`}
            >
              {/* Decorative quote */}
              <span
                className="absolute top-3 left-4 font-serif text-[72px] leading-none
                           text-brand-primary/[0.08] pointer-events-none select-none"
                aria-hidden="true"
              >
                "
              </span>
              <div className="text-brand-secondary text-sm tracking-wide mb-3">
                {'★'.repeat(t.rating)}
                <span className="sr-only">{t.rating} out of 5 stars</span>
              </div>
              <p className="text-[15px] leading-[1.75] text-brand-dark mb-6 relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[rgb(var(--color-light))]
                                border-2 border-gray-100
                                flex items-center justify-center
                                font-display text-base text-brand-primary shrink-0"
                     aria-hidden="true">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-dark">{t.name}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{t.label}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {reviewLink && (
          <div className="text-center mt-10">
            <Button variant="outline-dark" href={reviewLink} external>
              {reviewCount ? `Read All ${reviewCount} Google Reviews →` : 'Read All Google Reviews →'}
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}
