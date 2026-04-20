'use client'
import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { siteConfig } from '@/config/siteConfig'

/* ── Logo split helper (same pattern as Navbar) ── */
function LogoText({ name }: { name: string }) {
  const match = name.match(/^(.*?)([A-Z][a-z]+)$/)
  const first = match?.[1] ?? name
  const last  = match?.[2] ?? ''
  return (
    <>
      {first}
      <em className="not-italic text-brand-primary">{last}</em>
      <sup className="font-body text-[9px] font-bold tracking-[1px] text-brand-secondary uppercase">
        ®
      </sup>
    </>
  )
}

export default function Footer() {
  const { businessName, contact, social, footerLinks, yearEstd } = siteConfig

  return (
    <footer className="bg-[#050505] border-t border-white/[0.04]" aria-label="Site footer">

      {/* Main grid */}
      <div className="max-w-site mx-auto px-[5%] pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display text-[28px] text-white tracking-[2px] leading-none
                         inline-block mb-4 hover:opacity-80 transition-opacity"
              aria-label={`${businessName} home`}
            >
              <LogoText name={businessName} />
            </Link>
            <p className="text-[13px] text-white/28 leading-[1.75] max-w-[280px] mb-6">
              {siteConfig.tagline}. Transparent. Fair. Fast. Since {yearEstd}.
            </p>

            {/* Social */}
            <div className="flex gap-2.5" aria-label="Social media links">
              {social.facebook && (
                <SocialLink href={social.facebook} label="Facebook">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </SocialLink>
              )}
              {social.instagram && (
                <SocialLink href={social.instagram} label="Instagram">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </SocialLink>
              )}
              {social.youtube && (
                <SocialLink href={social.youtube} label="YouTube">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                </SocialLink>
              )}
              {social.twitter && (
                <SocialLink href={social.twitter} label="X / Twitter">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </SocialLink>
              )}
            </div>

            {/* Google badge */}
            <div className="inline-flex items-center gap-2 border border-white/[0.08] px-3 py-1.5 mt-5">
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-[12px] text-white/40">
                <strong className="text-brand-secondary">4.9/5</strong> on Google Reviews
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[2.5px] uppercase text-white/35 mb-4">
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Footer quick links">
              {footerLinks.quickLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-white/26 hover:text-white/65 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[2.5px] uppercase text-white/35 mb-4">
              Services
            </h3>
            <nav className="flex flex-col gap-2.5" aria-label="Footer services">
              {footerLinks.services.map(link => (
                link.href === '#'
                  ? (
                    <button
                      key={link.label}
                      type="button"
                      onClick={() => {}}
                      className="text-[13px] text-white/26 hover:text-white/65 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[13px] text-white/26 hover:text-white/65 transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold tracking-[2.5px] uppercase text-white/35 mb-4">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-3">
              <ContactRow icon={<MapPin size={13} />}>
                {contact.address}
              </ContactRow>
              <ContactRow icon={<Phone size={13} />}>
                <a href={`tel:${contact.phone}`}
                   className="hover:text-white/60 transition-colors">
                  {contact.phone}
                </a>
              </ContactRow>
              <ContactRow icon={<Mail size={13} />}>
                <a href={`mailto:${contact.email}`}
                   className="hover:text-white/60 transition-colors">
                  {contact.email}
                </a>
              </ContactRow>
              <ContactRow icon={<Clock size={13} />}>
                {contact.hours}
              </ContactRow>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] px-[5%] py-5">
        <div className="max-w-site mx-auto flex flex-col sm:flex-row items-center
                        justify-between gap-3 flex-wrap">
          <span className="text-[12px] text-white/17">
            © 2025 {businessName}. All rights reserved.
          </span>
          <nav className="flex gap-5" aria-label="Legal links">
            {(['Privacy Policy', 'Terms of Use', 'Sitemap'] as const).map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => {}} // replace with real routes when available
                className="text-[12px] text-white/17 hover:text-white/40 transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}

/* ── Sub-components ── */
function SocialLink({ href, label, children }: {
  href: string; label: string; children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 border border-white/[0.10] flex items-center justify-center
                 text-white/32 hover:border-brand-secondary hover:text-brand-secondary
                 transition-all duration-150"
    >
      {children}
    </a>
  )
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex gap-2.5 items-start">
      <span className="text-brand-primary mt-0.5 shrink-0">{icon}</span>
      <span className="text-[12px] text-white/26 leading-[1.55]">{children}</span>
    </div>
  )
}
