'use client'
import { useState } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import FaqSection from '@/components/sections/FaqSection'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import { siteConfig } from '@/config/siteConfig'

const CAR_BRANDS = ['Maruti Suzuki','Hyundai','Honda','Toyota','Mahindra','Tata','Kia','Ford','Volkswagen','BMW','Mercedes-Benz','Audi','Renault','Nissan','Skoda','MG','Jeep','Other']
const YEARS      = ['2024','2023','2022','2021','2020','2019','2018','2017','2016','2015','2014 & Earlier']

export default function SellPage() {
  const [loading, setLoading] = useState(false)
  const { sellSteps, faqs, contact } = siteConfig

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      await fetch(siteConfig.forms.endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ ...data, access_key: siteConfig.forms.access_key,
                                  _subject: `Sell Car Request – ${siteConfig.businessName}` }),
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
    <BaseLayout>
      {/* Page header */}
      <header className="bg-brand-dark px-[5%] pt-[calc(72px+56px)] pb-14 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgb(var(--color-primary)/0.1) 0%, transparent 60%)' }} />
        <div className="max-w-site mx-auto relative">
          <nav className="flex items-center gap-2 mb-5 text-[12px]" aria-label="Breadcrumb">
            <a href="/" className="text-white/35 hover:text-brand-secondary transition-colors">Home</a>
            <span className="text-white/18">›</span>
            <span className="text-white/55" aria-current="page">Sell Your Car</span>
          </nav>
          <h1 className="font-display text-[clamp(52px,8vw,100px)] text-white tracking-[2px] leading-[.95]">
            Sell Your <span className="text-brand-primary">Car</span>
          </h1>
          <p className="text-[16px] text-white/40 mt-4 max-w-[500px]">
            Best price guarantee. Free inspection. Instant payment to your bank.
          </p>
        </div>
      </header>

      {/* Main section */}
      <section className="px-[5%] py-20 bg-[rgb(var(--color-light))]">
        <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — Steps */}
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] uppercase text-brand-primary mb-2.5">
              How It Works
            </span>
            <h2 className="font-display text-[clamp(40px,5vw,64px)] tracking-[2px] leading-[.95] mb-4">
              Sell in 3 Easy Steps
            </h2>
            <p className="text-[16px] text-gray-500 leading-[1.75] mb-10">
              No brokers, no middlemen. Just a fair deal — fast.
            </p>

            {/* Steps */}
            <div className="flex flex-col">
              {sellSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex gap-5 pl-6 ml-2.5 relative pb-8
                              ${i < sellSteps.length - 1 ? 'border-l-2 border-gray-200' : ''}`}
                >
                  <span className="absolute -left-[9px] top-0.5 w-[18px] h-[18px] rounded-full bg-brand-primary shrink-0" />
                  <div>
                    <div className="text-[15px] font-bold text-brand-dark mb-1.5">
                      Step {i + 1} — {step.title}
                    </div>
                    <div className="text-[13px] text-gray-500 leading-[1.7]">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stat */}
            <div className="bg-brand-dark px-8 py-7 mt-6 inline-block">
              <div className="text-[10px] font-bold tracking-[2px] uppercase text-brand-secondary mb-2">
                Average Payout Time
              </div>
              <div className="font-display text-[40px] text-white tracking-[1px] leading-none">
                Under 24 Hours
              </div>
            </div>

            {/* Trust items */}
            <ul className="mt-8 flex flex-col gap-3.5">
              {[
                'Best price in market — we beat competitor quotes',
                'All paperwork handled — RC, NOC, insurance, Form 29/30',
                'Zero broker commission — you keep 100% of the price',
                'Free inspection — zero obligation to sell',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="text-brand-primary shrink-0" width="18" height="18"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span className="text-[14px] text-gray-500">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Form */}
          <div>
            <div className="bg-brand-dark p-10">
              <h3 className="font-display text-[30px] text-white tracking-[1px] mb-1.5">
                Get a Free Quote
              </h3>
              <p className="text-[13px] text-white/30 mb-7">No commitment. We'll call within 1 hour.</p>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
                {/* Owner details */}
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-white/20
                                pb-2 border-b border-white/[0.07] mb-1">
                  Your Details
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Full Name" id="s-name"  name="owner_name" placeholder="Rahul Sharma"  required dark />
                  <FormField label="Phone"     id="s-phone" name="phone" type="tel" placeholder="98765 43210" required dark />
                </div>
                <FormField label="Email Address" id="s-email" name="email" type="email" placeholder="you@email.com" dark />

                {/* Car details */}
                <div className="text-[10px] font-bold tracking-[2px] uppercase text-white/20
                                pb-2 border-b border-white/[0.07] mt-2 mb-1">
                  Your Car
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Car Brand" id="s-brand" name="car_brand" required dark
                    options={[{ value: '', label: 'Select Brand' }, ...CAR_BRANDS.map(b => ({ value: b, label: b }))]} />
                  <FormField label="Model" id="s-model" name="car_model" placeholder="e.g. Swift ZXi" required dark />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Year" id="s-year" name="car_year" required dark
                    options={[{ value: '', label: 'Year' }, ...YEARS.map(y => ({ value: y, label: y }))]} />
                  <FormField label="KM Driven" id="s-km" name="km_driven" placeholder="e.g. 45,000" required dark />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Fuel Type" id="s-fuel" name="fuel_type" required dark
                    options={[{ value: '', label: 'Fuel Type' }, ...['Petrol','Diesel','CNG','Electric'].map(f => ({ value: f, label: f }))]} />
                  <FormField label="Transmission" id="s-trans" name="transmission" dark
                    options={[{ value: '', label: 'Select' }, ...['Manual','Automatic','AMT','CVT'].map(t => ({ value: t, label: t }))]} />
                </div>
                <FormField label="Condition" id="s-cond" name="condition" dark
                  options={[
                    { value: '', label: 'Select Condition' },
                    { value: 'excellent', label: 'Excellent – No scratches or dents' },
                    { value: 'good',      label: 'Good – Minor scratches, no major damage' },
                    { value: 'average',   label: 'Average – Some dents/scratches, functional' },
                    { value: 'needs-work', label: 'Needs Work – Major repairs needed' },
                  ]} />
                <FormField label="Additional Notes" id="s-notes" name="notes" rows={3}
                           placeholder="Accident history, modifications, service records..." dark />

                <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                  Get My Free Quote →
                </Button>
                <p className="text-[11px] text-white/20 text-center leading-relaxed">
                  By submitting, you agree to be contacted. Your data is secure and never shared.
                </p>
              </form>
            </div>

            {/* WhatsApp alt */}
            <div className="border border-gray-100 p-5 flex items-center justify-between
                            gap-4 flex-wrap mt-3.5 bg-white">
              <div>
                <div className="text-[13px] font-semibold">Prefer WhatsApp?</div>
                <div className="text-[12px] text-gray-500 mt-0.5">Send us your car details directly</div>
              </div>
              <Button
                variant="whatsapp"
                href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hi, I want to sell my car. Please help me with a quote.')}`}
                external
              >
                💬 Chat on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        faqs={faqs as any}
        bg="cream"
      />
    </BaseLayout>
  )
}

function showToast(msg: string, type: 'success' | 'error') {
  const el = document.createElement('div')
  el.textContent = msg
  el.style.cssText = `position:fixed;bottom:28px;right:28px;z-index:9999;background:#111;color:#fff;padding:14px 20px;font-size:13px;font-weight:500;border-left:3px solid ${type === 'success' ? '#38a169' : '#e53e3e'};animation:slideIn .3s ease-out both;`
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 5000)
}
