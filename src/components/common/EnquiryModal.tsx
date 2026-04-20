'use client'
import {
  createContext, useContext, useState, useEffect, useCallback,
  type ReactNode,
} from 'react'
import { X } from 'lucide-react'
import Button from '@/components/ui/Button'
import FormField from '@/components/ui/FormField'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/siteConfig'

/* ─────────────────────────────────────────────────────────
   Context — shared between CarCard trigger and modal.
   Replaces the previous window.dispatchEvent event bus which
   had a race condition: if the event fired before useEffect
   registered the listener, the modal never opened and React
   threw a hydration mismatch.
───────────────────────────────────────────────────────── */
interface EnquiryState  { carName: string; carPrice: string }
interface EnquiryCtxVal { open: (carName: string, carPrice: string) => void }

const EnquiryContext = createContext<EnquiryCtxVal>({ open: () => {} })
export const useEnquiry = () => useContext(EnquiryContext)

/* ─────────────────────────────────────────────────────────
   Provider — add to BaseLayout once, works everywhere
───────────────────────────────────────────────────────── */
export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [isOpen,  setIsOpen]  = useState(false)
  const [car,     setCar]     = useState<EnquiryState>({ carName: '', carPrice: '' })
  const [loading, setLoading] = useState(false)
  const [errors,  setErrors]  = useState<Record<string, string>>({})

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // ESC to close
  useEffect(() => {
    if (!isOpen) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [isOpen])

  const open = useCallback((carName: string, carPrice: string) => {
    setCar({ carName, carPrice })
    setErrors({})
    setIsOpen(true)
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    const errs: Record<string, string> = {}
    if (!String(data.name || '').trim()) errs.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(String(data.phone || '').replace(/[\s\-\+\(\)]/g, '')))
      errs.phone = 'Enter a valid 10-digit number'
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    try {
      await fetch(siteConfig.forms.endpoint, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          car_name:   car.carName,
          car_price:  car.carPrice,
          access_key: siteConfig.forms.access_key,
          _subject:   `Car Enquiry – ${car.carName} – ${siteConfig.businessName}`,
        }),
      })
      form.reset()
      setIsOpen(false)
      showToast("✓ Enquiry sent! We'll call you within the hour.", 'success')
    } catch {
      showToast('Something went wrong. Please call us directly.', 'error')
    } finally {
      setLoading(false)
    }
  }

  function handleWa() {
    const msg = encodeURIComponent(
      `Hi, I'm interested in the ${car.carName} priced at ${car.carPrice}. Please share more details.`
    )
    window.open(`https://wa.me/${siteConfig.contact.whatsapp}?text=${msg}`, '_blank')
    setIsOpen(false)
  }

  return (
    <EnquiryContext.Provider value={{ open }}>
      {children}

      {/* Backdrop — separate element, no z-index stacking issues */}
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={cn(
          'fixed inset-0 z-[200] bg-black/75 transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      />

      {/* Dialog shell */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        aria-hidden={!isOpen}
        className={cn(
          'fixed inset-0 z-[201] flex items-center justify-center p-5',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
      >
        {/* Dialog box */}
        <div
          onClick={e => e.stopPropagation()}
          className={cn(
            'bg-white w-full max-w-[500px] max-h-[90vh] overflow-y-auto',
            'transition-all duration-200',
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-7 pb-0">
            <div>
              <h2
                id="enquiry-title"
                className="font-display text-[28px] tracking-[1px] leading-tight"
              >
                Enquire Now
              </h2>
              {car.carName && (
                <p className="text-[13px] text-gray-500 mt-1">
                  {car.carName}
                  {car.carPrice && (
                    <> &mdash; <strong className="text-brand-dark">{car.carPrice}</strong></>
                  )}
                </p>
              )}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="w-8 h-8 flex items-center justify-center text-gray-400
                         hover:text-gray-800 transition-colors shrink-0 mt-0.5"
            >
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="p-7 pt-5 flex flex-col gap-3.5"
          >
            <div className="grid grid-cols-2 gap-3">
              <FormField
                label="Full Name" id="eq-name" name="name"
                placeholder="Rahul Sharma" required error={errors.name}
              />
              <FormField
                label="Phone" id="eq-phone" name="phone"
                type="tel" placeholder="98765 43210" required error={errors.phone}
              />
            </div>
            <FormField
              label="Best Time to Call" id="eq-timing" name="best_time"
              options={[
                { value: 'anytime',   label: 'Anytime' },
                { value: 'morning',   label: 'Morning (9am–12pm)' },
                { value: 'afternoon', label: 'Afternoon (12pm–5pm)' },
                { value: 'evening',   label: 'Evening (5pm–8pm)' },
              ]}
            />
            <FormField
              label="Message (optional)" id="eq-msg" name="message"
              rows={3} placeholder="Any specific question or requirement..."
            />
            <div className="flex gap-2.5 mt-1">
              <Button type="submit" variant="primary" fullWidth loading={loading}>
                Book Inspection →
              </Button>
              <Button type="button" variant="whatsapp" fullWidth onClick={handleWa}>
                💬 WhatsApp
              </Button>
            </div>
            <p className="text-[11px] text-gray-400 text-center leading-relaxed">
              No spam. Your data is safe with us.
            </p>
          </form>
        </div>
      </div>
    </EnquiryContext.Provider>
  )
}

/* ── Toast ── */
function showToast(msg: string, type: 'success' | 'error') {
  const el = document.createElement('div')
  el.textContent = msg
  el.style.cssText = [
    'position:fixed', 'bottom:28px', 'right:28px', 'z-index:9999',
    'background:#111', 'color:#fff', 'padding:14px 20px',
    'font-size:13px', 'font-weight:500', 'max-width:340px',
    `border-left:3px solid ${type === 'success' ? '#38a169' : '#e53e3e'}`,
    'animation:slideIn .3s ease-out both',
  ].join(';')
  document.body.appendChild(el)
  setTimeout(() => el.remove(), 5000)
}
