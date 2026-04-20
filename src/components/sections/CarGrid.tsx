'use client'
import { useState } from 'react'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { useEnquiry } from '@/components/common/EnquiryModal'
import { type Car, type CarType, formatPrice, formatKM } from '@/config/inventoryConfig'
import { siteConfig } from '@/config/siteConfig'
import { cn } from '@/lib/utils'

interface CarGridProps {
  cars:       Car[]
  showFilters?: boolean
  limit?:     number  // undefined = show all
}

const FILTERS: { label: string; value: CarType | 'all' }[] = [
  { label: 'All',        value: 'all'    },
  { label: 'SUVs',       value: 'suv'    },
  { label: 'Sedans',     value: 'sedan'  },
  { label: 'Hatchbacks', value: 'hatch'  },
  { label: 'Luxury',     value: 'luxury' },
]

const badgeClasses: Record<string, string> = {
  hot:     'bg-brand-primary   text-white',
  deal:    'bg-brand-secondary text-brand-dark',
  popular: 'bg-brand-dark      text-white',
  premium: 'bg-[#181818]       text-brand-secondary',
}

export default function CarGrid({ cars, showFilters = true, limit }: CarGridProps) {
  const [activeFilter, setActiveFilter] = useState<CarType | 'all'>('all')

  const filtered = cars
    .filter(c => activeFilter === 'all' || c.type === activeFilter)
    .slice(0, limit)

  return (
    <div>
      {/* Filter tabs */}
      {showFilters && (
        <div className="flex gap-0.5 flex-wrap mb-8" role="tablist" aria-label="Filter by car type">
          {FILTERS.map(f => (
            <button
              key={f.value}
              role="tab"
              aria-selected={activeFilter === f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                'px-5 py-2.5 text-[11px] font-bold tracking-[1.5px] uppercase',
                'border transition-all duration-150',
                activeFilter === f.value
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-transparent text-gray-500 border-gray-200 hover:bg-[rgb(var(--color-light))]',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="font-display text-[28px] tracking-[1px] mb-2">No Cars Found</p>
          <p className="text-gray-500 text-sm">Try a different filter or contact us directly.</p>
        </div>
      )}
    </div>
  )
}

/* ── Individual card ── */
function CarCard({ car }: { car: Car }) {
  const { open } = useEnquiry()
  const waNum = siteConfig.contact.whatsapp
  const waMsg = encodeURIComponent(
    `Hi, I'm interested in the ${car.make} ${car.model} (${car.year}) priced at ${formatPrice(car.price)}.`
  )

  return (
    <article
      className="group bg-white border border-gray-100 overflow-hidden
                 transition-all duration-250
                 hover:-translate-y-1.5 hover:shadow-[0_20px_56px_rgba(0,0,0,0.18)]
                 hover:border-transparent"
      aria-label={`${car.make} ${car.model}`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[rgb(var(--color-light))]">
        <Image
          src={car.image}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-400 group-hover:scale-[1.06]"
        />
        {/* Badge */}
        {car.badge && car.badgeType && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={cn(
              'text-[10px] font-bold tracking-[1.5px] uppercase px-2.5 py-1',
              badgeClasses[car.badgeType],
            )}>
              {car.badge}
            </span>
          </div>
        )}
        {/* Certified */}
        {car.certified && (
          <div className="absolute top-3 right-3 bg-black/80 text-green-400
                          text-[10px] font-bold tracking-[1px] uppercase
                          px-2 py-1 flex items-center gap-1 backdrop-blur-sm">
            ✓ Certified
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="text-[10px] font-bold tracking-[2px] uppercase text-gray-400 mb-0.5">
          {car.make}
        </div>
        <div className="font-display text-[24px] tracking-[1px] leading-tight text-brand-dark mb-3.5">
          {car.model}
        </div>

        {/* Specs */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            { icon: '📅', label: String(car.year)        },
            { icon: '📍', label: formatKM(car.km)         },
            { icon: '⛽', label: car.fuel                 },
            { icon: '⚙',  label: car.transmission         },
          ].map(s => (
            <span
              key={s.label}
              className="text-[11px] font-medium text-gray-500
                         bg-[rgb(var(--color-light))] px-2 py-1
                         flex items-center gap-1"
            >
              <span aria-hidden="true">{s.icon}</span>
              {s.label}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <div>
            <div className="font-display text-[26px] tracking-[1px] leading-none text-brand-dark">
              {formatPrice(car.price)}
            </div>
            <div className="text-[10px] text-gray-400 mt-1">+ RC Transfer &amp; Taxes</div>
          </div>
          <div className="flex gap-1.5 shrink-0">
            <a
              href={`https://wa.me/${waNum}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp about ${car.model}`}
              className="w-9 h-9 flex items-center justify-center
                         border border-gray-200 text-sm
                         hover:border-gray-400 transition-colors"
            >
              💬
            </a>
            <Button
              variant="dark"
              size="sm"
              onClick={() => open(
                `${car.make} ${car.model} ${car.year}`,
                formatPrice(car.price),
              )}
              ariaLabel={`Enquire about ${car.model}`}
            >
              Enquire
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}


