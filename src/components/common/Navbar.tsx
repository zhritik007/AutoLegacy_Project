'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/siteConfig'

/* ── Logo split helper ────────────────────────────────────── */
function LogoText({ name, size = 26 }: { name: string; size?: number }) {
  const match = name.match(/^(.*?)([A-Z][a-z]+)$/)
  const first = match?.[1] ?? name
  const last = match?.[2] ?? ''

  return (
    <span style={{ fontSize: size }}>
      {first}
      <em className="not-italic text-brand-primary">{last}</em>
      <sup
        className="font-body font-bold tracking-[1px] text-brand-secondary uppercase"
        style={{ fontSize: 9 }}
      >
        ®
      </sup>
    </span>
  )
}

/* ── MAIN COMPONENT ───────────────────────────────────────── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { nav, contact, businessName } = siteConfig

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center',
          'border-b border-white/[0.06]',
          'transition-[background,box-shadow] duration-250',
          scrolled
            ? 'bg-brand-dark shadow-[0_4px_28px_rgba(0,0,0,0.45)]'
            : 'bg-brand-dark/95 backdrop-blur-[16px]'
        )}
        aria-label="Main navigation"
      >
        <div className="max-w-site mx-auto px-[5%] w-full flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[26px] text-white tracking-[2px] leading-none
                       hover:opacity-80 transition-opacity shrink-0"
            aria-label={`${businessName} home`}
          >
            <LogoText name={businessName} />
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {nav.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="relative text-[12px] font-semibold tracking-[1px] uppercase
                             text-white/50 hover:text-white px-3.5 py-2 transition-colors
                             group"
                >
                  {item.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-brand-primary
                                   scale-x-0 group-hover:scale-x-100 origin-left
                                   transition-transform duration-200" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3.5 shrink-0">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-1.5 text-[12px] font-semibold
                         text-white/45 hover:text-brand-secondary transition-colors"
              aria-label="Call us"
            >
              <Phone size={13} aria-hidden="true" />
              {contact.phone}
            </a>

            <Button variant="primary" size="sm" href="/inventory">
              Browse Cars
            </Button>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-[5px] p-1 text-white"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen
              ? <X size={22} aria-hidden="true" />
              : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="menu"
        className={cn(
          'fixed top-[72px] left-0 right-0 z-[99] bg-brand-dark',
          'border-t border-white/[0.06]',
          'flex flex-col px-[5%] transition-all duration-300 overflow-hidden',
          mobileOpen ? 'max-h-screen py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
        )}
      >
        {nav.map(item => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            onClick={closeMobile}
            className="text-sm font-semibold tracking-[1px] uppercase
                       text-white/60 hover:text-white py-3.5
                       border-b border-white/[0.05] last:border-b-0
                       transition-colors"
          >
            {item.label}
          </Link>
        ))}

        <div className="flex flex-col gap-2.5 mt-5">
          <Button
            variant="primary"
            fullWidth
            href={`tel:${contact.phone}`}
            external
            ariaLabel="Call us"
          >
            📞 {contact.phone}
          </Button>

          <Button
            variant="whatsapp"
            fullWidth
            href={`https://wa.me/${contact.whatsapp}`}
            external
            ariaLabel="WhatsApp us"
          >
            💬 WhatsApp Us
          </Button>
        </div>
      </div>
    </>
  )
}