'use client'
import { useState } from 'react'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import { siteConfig } from '@/config/siteConfig'

const CAR_BRANDS = [
  'Maruti Suzuki','Hyundai','Honda','Toyota','Mahindra',
  'Tata','Kia','BMW','Mercedes-Benz','Audi','Other',
]

interface SellPreviewProps {
  eyebrow:   string
  title:     string
  subtitle:  string
  steps:     { title: string; desc: string }[]
}

export default function SellPreviewSection({ eyebrow, title, subtitle, steps }: SellPreviewProps) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      await fetch(siteConfig.forms.endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...data, access_key: siteConfig.forms.access_key,
                               _subject: `Sell Car Quote – ${siteConfig.businessName}` }),
      })
      ;(e.target as HTMLFormElement).reset()
      showToast('✓ Quote request sent! We\'ll call you within 1 hour.', 'success')
    } catch {
      showToast('Something went wrong. Please call us directly.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section id="sell-preview" bg="cream">
      <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left — Steps */}
        <div>
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <div className="mt-10 flex flex-col">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex gap-5 pl-6 ml-2.5 relative pb-8
                            ${i < steps.length - 1 ? 'border-l-2 border-gray-200' : ''}`}
              >
                {/* Dot */}
                <span className="absolute -left-[9px] top-0.5 w-[18px] h-[18px]
                                 rounded-full bg-brand-primary shrink-0" />
                <div className="pt-0">
                  <div className="text-[15px] font-bold text-brand-dark mb-1.5">
                    Step {i + 1} — {step.title}
                  </div>
                  <div className="text-[13px] text-gray-500 leading-[1.7]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight stat */}
          <div className="bg-brand-dark px-8 py-7 mt-8 inline-block">
            <div className="text-[10px] font-bold tracking-[2px] uppercase text-brand-secondary mb-2">
              Average Payout Time
            </div>
            <div className="font-display text-[40px] text-white tracking-[1px] leading-none">
              Under 24 Hours
            </div>
          </div>

          <div className="mt-6">
            <Button variant="primary" size="lg" href="/sell">
              Sell My Car Now →
            </Button>
          </div>
        </div>

        {/* Right — Quick form */}
        <div className="bg-brand-dark p-10">
          <h3 className="font-display text-[30px] text-white tracking-[1px] mb-1.5">
            Get Free Quote
          </h3>
          <p className="text-[13px] text-white/30 mb-7">
            No commitment. We'll call within 1 hour.
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Full Name"   id="qs-name"  name="name"      placeholder="Rahul Sharma"    required dark />
              <FormField label="Phone"       id="qs-phone" name="phone" type="tel" placeholder="98765 43210" required dark />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Car Brand" id="qs-brand" name="car_brand" required dark
                options={[
                  { value: '', label: 'Select Brand' },
                  ...CAR_BRANDS.map(b => ({ value: b, label: b })),
                ]}
              />
              <FormField label="Model" id="qs-model" name="car_model" placeholder="e.g. Swift ZXi" required dark />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Year" id="qs-year" name="car_year" required dark
                options={[
                  { value: '', label: 'Year' },
                  ...['2024','2023','2022','2021','2020','2019','2018','2017 & Earlier']
                    .map(y => ({ value: y, label: y })),
                ]}
              />
              <FormField label="KM Driven" id="qs-km" name="km_driven" placeholder="e.g. 45,000 km" dark />
            </div>
            <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
              Get Free Quote →
            </Button>
            <p className="text-[11px] text-white/20 text-center leading-relaxed">
              No commitment. Free evaluation. Your data is safe.
            </p>
          </form>
        </div>
      </div>
    </Section>
  )
}

function showToast(msg: string, type: 'success' | 'error') {
  const el = document.createElement('div')
  el.textContent = msg
  el.style.cssText = `
    position:fixed;bottom:28px;right:28px;z-index:9999;
    background:#111;color:#fff;padding:14px 20px;font-size:13px;font-weight:500;
    border-left:3px solid ${type === 'success' ? '#38a169' : '#e53e3e'};
    animation:slideIn .3s ease-out both;
  `
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 5000)
}
