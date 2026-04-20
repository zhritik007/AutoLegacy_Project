'use client'
import BaseLayout from '@/templates/BaseLayout'
import HeroSection from '@/components/sections/HeroSection'
import TrustBar from '@/components/sections/TrustBar'
import CarGrid from '@/components/sections/CarGrid'
import FeaturesSection from '@/components/sections/FeaturesSection'
import SellPreviewSection from '@/components/sections/SellPreviewSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import CtaStrip from '@/components/sections/CtaStrip'
import Section from '@/components/ui/Section'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { siteConfig } from '@/config/siteConfig'
import { inventory } from '@/config/inventoryConfig'

export default function HomePage() {
  const { hero, stats, trustSignals, features, testimonials, sellSteps, contact } = siteConfig

  return (
    <BaseLayout>

      {/* 1. Hero */}
      <HeroSection
        eyebrow={hero.eyebrow}
        headline={hero.headline as [string, string, string]}
        subtext={hero.subtext}
        ctaPrimary={hero.cta.primary}
        ctaSecondary={hero.cta.secondary}
        stats={stats as any}
      />

      {/* 2. Trust bar */}
      <TrustBar items={trustSignals as unknown as string[]} />

      {/* 3. Search strip */}
      <div className="bg-[#181818] border-b-2 border-brand-primary px-[5%] py-10">
        <div className="max-w-[1060px] mx-auto">
          <h2 className="font-display text-[30px] text-white tracking-[2px] text-center mb-5">
            Search Our <span className="text-brand-primary">Inventory</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 overflow-hidden
                          border border-white/[0.08] bg-white/[0.04]">
            {[
              { id: 'make',   label: 'All Makes',   opts: ['Maruti Suzuki','Hyundai','Honda','Toyota','Mahindra','Tata','Kia','BMW'] },
              { id: 'budget', label: 'Budget',       opts: ['Under ₹3L','₹3L–₹6L','₹6L–₹10L','₹10L–₹20L','Above ₹20L'] },
              { id: 'year',   label: 'Any Year',     opts: ['2023+','2022+','2021+','2020+','2019+'] },
              { id: 'fuel',   label: 'Fuel Type',    opts: ['Petrol','Diesel','Electric','CNG'] },
            ].map(f => (
              <select
                key={f.id}
                aria-label={f.label}
                className="bg-transparent border-r border-white/[0.06] last:border-r-0
                           text-white text-[14px] px-4 py-4 outline-none
                           appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%23888' d='M5 6L0 0h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 14px center',
                  paddingRight: '36px',
                }}
              >
                <option value="">{f.label}</option>
                {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
            <Button
              variant="primary"
              href="/inventory"
              className="rounded-none h-full w-full justify-center px-6"
              ariaLabel="Search cars"
            >
              Search →
            </Button>
          </div>
        </div>
      </div>

      {/* 4. Featured cars */}
      <Section id="inventory" bg="white" ariaLabel="Featured car listings">
        <div className="max-w-site mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <span className="block text-[11px] font-bold tracking-[3px] uppercase
                               text-brand-primary mb-2.5">
                Our Fleet
              </span>
              <h2 className="font-display text-[clamp(40px,5.5vw,72px)] tracking-[2px] leading-[.95]">
                Featured Cars
              </h2>
            </div>
            <Button variant="outline-dark" href="/inventory">
              View All {inventory.length} Cars →
            </Button>
          </div>
          <CarGrid cars={inventory} showFilters limit={6} />
          <div className="text-center mt-10">
            <Button variant="dark" size="lg" href="/inventory">See All Cars →</Button>
          </div>
        </div>
      </Section>

      {/* 5. Why Us */}
      <FeaturesSection
        eyebrow="Why AutoLegacy"
        title={`The Difference\nYou Can Feel`}
        subtitle="We built AutoLegacy on one principle — make buying and selling used cars as trustworthy as buying new."
        features={features as any}
        quote={{
          text:     "Best used car experience in Gurugram. Zero drama, great price, car delivered in perfect condition.",
          name:     "Amit Mehta",
          label:    "Bought: Hyundai Creta 2023",
          initials: "AM",
          rating:   5,
        }}
        miniStats={[
          { value: '₹0',  label: 'Hidden Fees', variant: 'primary'   },
          { value: '24H', label: 'Car Payout',  variant: 'secondary' },
        ]}
      />

      {/* 6. Sell preview */}
      <SellPreviewSection
        eyebrow="Sell With Us"
        title={`Sell Your Car\nIn 3 Steps`}
        subtitle="Get the best market price. No brokers, no middlemen."
        steps={sellSteps as any}
      />

      {/* 7. Testimonials */}
      <TestimonialsSection
        eyebrow="Happy Customers"
        title="Real People. Real Stories."
        testimonials={testimonials as any}
        reviewCount={248}
        reviewLink={siteConfig.social.googleReviews}
      />

      {/* 8. CTA strip */}
      <CtaStrip
        eyebrow="Ready to Get Started?"
        title={`Let's Find Your\nPerfect Car`}
        actions={[
          { label: 'Browse Inventory',  href: '/inventory',                                      variant: 'primary' },
          { label: 'Talk to an Expert', href: '/contact',                                        variant: 'outline-white' },
          { label: '💬 WhatsApp Us Now', href: `https://wa.me/${contact.whatsapp}`, external: true, variant: 'whatsapp' },
        ]}
      />

    </BaseLayout>
  )
}
