'use client'
import { useState } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const { contact, businessName } = siteConfig

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    try {
      await fetch(siteConfig.forms.endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify({ ...data, access_key: siteConfig.forms.access_key,
                                  _subject: `Contact Form – ${businessName}` }),
      })
      ;(e.target as HTMLFormElement).reset()
      showToast('✓ Message sent! We\'ll reply within 2 hours.', 'success')
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
            <span className="text-white/55" aria-current="page">Contact</span>
          </nav>
          <h1 className="font-display text-[clamp(52px,8vw,100px)] text-white tracking-[2px] leading-[.95]">
            Get In <span className="text-brand-primary">Touch</span>
          </h1>
          <p className="text-[16px] text-white/40 mt-4">
            We're here 7 days a week, 9am–8pm. Real people, no bots.
          </p>
        </div>
      </header>

      {/* Contact section */}
      <section className="px-[5%] py-20 bg-[rgb(var(--color-light))]"
               aria-labelledby="contact-heading">
        <h2 id="contact-heading" className="sr-only">Contact Information and Form</h2>
        <div className="max-w-site mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* Left — Info */}
          <div>
            <span className="block text-[11px] font-bold tracking-[3px] uppercase text-brand-primary mb-2.5">
              Contact Details
            </span>
            <h3 className="font-display text-[clamp(36px,4vw,52px)] tracking-[2px] leading-[.95] mb-8">
              Talk to a Car<br />Expert Today
            </h3>

            {/* Info cards */}
            <div className="bg-brand-dark p-9 flex flex-col gap-7 mb-6">
              {[
                { icon: <MapPin size={18} />,  label: 'Showroom Address', value: contact.address },
                { icon: <Phone size={18} />,   label: 'Phone & WhatsApp',
                  value: <><a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a><br />
                           <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer"
                              className="hover:text-white transition-colors">Chat on WhatsApp →</a></> },
                { icon: <Mail size={18} />,    label: 'Email',
                  value: <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a> },
                { icon: <Clock size={18} />,   label: 'Working Hours', value: contact.hours },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-11 h-11 border border-white/[0.10] flex items-center
                                  justify-center text-brand-secondary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[2px] uppercase text-brand-secondary mb-1">
                      {item.label}
                    </div>
                    <div className="text-[14px] text-white/60 leading-[1.55]">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-col gap-2.5">
              <Button variant="primary" size="lg" fullWidth href={`tel:${contact.phone}`} external>
                📞 Call Now
              </Button>
              <Button variant="whatsapp" size="lg" fullWidth
                      href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent('Hi, I need help with a used car.')}`}
                      external>
                💬 WhatsApp Us
              </Button>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <div className="bg-brand-dark p-11">
              <h3 className="font-display text-[28px] text-white tracking-[1px] mb-1.5">
                Send a Message
              </h3>
              <p className="text-[13px] text-white/30 mb-7">
                We reply within 2 hours on business days.
              </p>

              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
                {/* Honeypot */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-2 gap-3">
                  <FormField label="Full Name" id="c-name"  name="name"  placeholder="Rahul Sharma"  required dark />
                  <FormField label="Phone"     id="c-phone" name="phone" type="tel" placeholder="98765 43210" required dark />
                </div>
                <FormField label="Email" id="c-email" name="email" type="email" placeholder="you@email.com" dark />
                <FormField label="Subject" id="c-subject" name="subject" required dark
                  options={[
                    { value: '',               label: 'Select a topic' },
                    { value: 'buy',            label: 'I want to buy a car' },
                    { value: 'sell',           label: 'I want to sell my car' },
                    { value: 'finance',        label: 'Finance enquiry' },
                    { value: 'rc-transfer',    label: 'RC Transfer / Documentation' },
                    { value: 'general',        label: 'General Enquiry' },
                    { value: 'feedback',       label: 'Complaint / Feedback' },
                  ]} />
                <FormField label="Message" id="c-message" name="message" rows={5}
                           placeholder="Tell us how we can help..." required dark />

                <Button type="submit" variant="primary" fullWidth size="lg" loading={loading}>
                  Send Message →
                </Button>
                <p className="text-[11px] text-white/20 text-center">
                  We never share your details. No spam, ever.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <div className="w-full bg-brand-dark">
        <div className="w-full aspect-[16/5] overflow-hidden">
          <iframe
            src={contact.mapEmbed}
            title={`${businessName} Showroom Location`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="w-full h-full border-0 block grayscale-[0.3] contrast-[1.1]"
          />
        </div>
        <div className="bg-[#111] px-[5%] py-3.5 flex items-center justify-center gap-2.5">
          <MapPin size={13} className="text-brand-primary shrink-0" />
          <span className="text-[13px] text-white/35">{contact.address}</span>
          <a
            href="https://maps.google.com/?q=Sector+18+Gurugram"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold text-brand-primary ml-2
                       hover:underline"
          >
            Get Directions →
          </a>
        </div>
      </div>
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
