'use client'
import { useState, useMemo } from 'react'
import BaseLayout from '@/templates/BaseLayout'
import CarGrid from '@/components/sections/CarGrid'
import CtaStrip from '@/components/sections/CtaStrip'
import { inventory, type CarType } from '@/config/inventoryConfig'
import { cn } from '@/lib/utils'

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'year-desc' | 'km-asc'

const MAKES   = ['Maruti Suzuki','Hyundai','Honda','Toyota','Mahindra','Tata','Kia','BMW','Mercedes-Benz','Audi']
const FUELS   = ['Petrol','Diesel','Electric','CNG']
const BUDGETS = [
  { label: 'Under ₹7.5L',  value: 750000  },
  { label: 'Under ₹10L',   value: 1000000 },
  { label: 'Under ₹20L',   value: 2000000 },
  { label: 'Under ₹50L',   value: 5000000 },
]
const YEARS   = [2022, 2021, 2020, 2019, 2018]
const SORTS: { label: string; value: SortKey }[] = [
  { label: 'Featured',          value: 'default'    },
  { label: 'Price: Low → High', value: 'price-asc'  },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Newest First',      value: 'year-desc'  },
  { label: 'Lowest KM',         value: 'km-asc'     },
]

export default function InventoryPage() {
  const [make,   setMake]   = useState('')
  const [type,   setType]   = useState<CarType | ''>('')
  const [fuel,   setFuel]   = useState('')
  const [budget, setBudget] = useState(0)
  const [year,   setYear]   = useState(0)
  const [sort,   setSort]   = useState<SortKey>('default')

  const filtered = useMemo(() => {
    let result = inventory.filter(car =>
      (!make   || car.make.toLowerCase().includes(make.toLowerCase())) &&
      (!type   || car.type === type) &&
      (!fuel   || car.fuel === fuel) &&
      (!budget || car.price <= budget) &&
      (!year   || car.year >= year)
    )
    if (sort === 'price-asc')  result = [...result].sort((a,b) => a.price - b.price)
    if (sort === 'price-desc') result = [...result].sort((a,b) => b.price - a.price)
    if (sort === 'year-desc')  result = [...result].sort((a,b) => b.year  - a.year)
    if (sort === 'km-asc')     result = [...result].sort((a,b) => a.km    - b.km)
    return result
  }, [make, type, fuel, budget, year, sort])

  function clearAll() {
    setMake(''); setType(''); setFuel(''); setBudget(0); setYear(0)
  }

  const SelectCls = "w-full text-sm border border-gray-200 px-3 py-3 outline-none bg-white appearance-none cursor-pointer focus:border-brand-primary transition-colors"

  return (
    <BaseLayout>
      {/* Page header */}
      <header className="bg-brand-dark px-[5%] pt-[calc(72px+56px)] pb-14 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 80% at 70% 50%, rgb(var(--color-primary)/0.1) 0%, transparent 60%)' }}
        />
        <div className="max-w-site mx-auto relative">
          <nav className="flex items-center gap-2 mb-5 text-[12px]" aria-label="Breadcrumb">
            <a href="/" className="text-white/35 hover:text-brand-secondary transition-colors">Home</a>
            <span className="text-white/18">›</span>
            <span className="text-white/55" aria-current="page">Inventory</span>
          </nav>
          <h1 className="font-display text-[clamp(52px,8vw,100px)] text-white tracking-[2px] leading-[.95]">
            Our <span className="text-brand-primary">Inventory</span>
          </h1>
          <p className="text-[16px] text-white/40 mt-4 max-w-[500px]">
            Every car is inspected, verified and ready to drive.
          </p>
        </div>
      </header>

      <section className="px-[5%] py-12 bg-[rgb(var(--color-light))]">
        <div className="max-w-site mx-auto">

          {/* Filter panel */}
          <div className="bg-white border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-400">Make</label>
                <select className={SelectCls} value={make} onChange={e => setMake(e.target.value)}>
                  <option value="">All Makes</option>
                  {MAKES.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-400">Body Type</label>
                <select className={SelectCls} value={type} onChange={e => setType(e.target.value as CarType | '')}>
                  <option value="">All Types</option>
                  <option value="hatch">Hatchback</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-400">Fuel</label>
                <select className={SelectCls} value={fuel} onChange={e => setFuel(e.target.value)}>
                  <option value="">All Fuels</option>
                  {FUELS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-400">Max Budget</label>
                <select className={SelectCls} value={budget} onChange={e => setBudget(Number(e.target.value))}>
                  <option value={0}>Any Price</option>
                  {BUDGETS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold tracking-[1.5px] uppercase text-gray-400">Min Year</label>
                <select className={SelectCls} value={year} onChange={e => setYear(Number(e.target.value))}>
                  <option value={0}>Any Year</option>
                  {YEARS.map(y => <option key={y} value={y}>{y}+</option>)}
                </select>
              </div>
              <button
                onClick={clearAll}
                className="text-[11px] font-bold tracking-[1px] uppercase px-4 py-3
                           border border-gray-200 text-gray-500 hover:bg-gray-50
                           transition-colors whitespace-nowrap"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <p className="text-[13px] text-gray-500">
              Showing <strong className="text-brand-dark font-bold">{filtered.length}</strong> cars
            </p>
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold tracking-[1px] uppercase text-gray-400">Sort:</span>
              <select
                className="text-[13px] border border-gray-200 px-3 py-2 outline-none
                           bg-white focus:border-brand-primary transition-colors cursor-pointer"
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
              >
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Grid — pass pre-filtered cars, disable internal filter tabs */}
          <CarGrid cars={filtered} showFilters={false} />
        </div>
      </section>

      <CtaStrip
        eyebrow="Can't find what you want?"
        title="We'll source it for you."
        actions={[
          { label: 'Make a Request', href: '/contact', variant: 'primary' },
          { label: 'Sell Your Car',  href: '/sell',    variant: 'outline-white' },
        ]}
      />
    </BaseLayout>
  )
}
