'use client'
import { useState } from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import { cn } from '@/lib/utils'

interface Faq {
  q: string
  a: string
}

interface FaqSectionProps {
  eyebrow?: string
  title:    string
  faqs:     Faq[]
  bg?:      'white' | 'cream'
}

export default function FaqSection({ eyebrow, title, faqs, bg = 'cream' }: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <Section bg={bg} ariaLabel="Frequently asked questions">
      <div className="max-w-[720px] mx-auto">
        <SectionHeader eyebrow={eyebrow} title={title} center className="mb-10" />
        <div className="flex flex-col gap-0.5" role="list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-100"
              role="listitem"
            >
              <button
                className="w-full text-left px-5 py-4 flex items-center justify-between
                           gap-4 text-sm font-semibold text-brand-dark
                           hover:text-brand-primary transition-colors duration-150"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <span
                  className={cn(
                    'text-xl text-brand-primary shrink-0 leading-none transition-transform duration-200',
                    open === i && 'rotate-45',
                  )}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0',
                )}
              >
                <p className="px-5 pb-5 text-[13px] text-gray-500 leading-[1.75]">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
