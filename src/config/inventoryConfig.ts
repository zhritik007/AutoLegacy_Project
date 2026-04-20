/**
 * Inventory Config
 * Add / remove / edit cars here. Nothing else to touch.
 */

export type CarType = 'suv' | 'sedan' | 'hatch' | 'luxury'
export type BadgeType = 'hot' | 'deal' | 'popular' | 'premium' | null

export interface Car {
  id:           string
  make:         string
  model:        string
  year:         number
  km:           number
  fuel:         string
  transmission: string
  price:        number          // in INR (no formatting)
  badge:        string | null
  badgeType:    BadgeType
  type:         CarType
  certified:    boolean
  image:        string
  features:     string[]
}

export const inventory: Car[] = [
  {
    id: 'car-001', make: 'Mahindra', model: 'XUV700 AX7',
    year: 2022, km: 22000, fuel: 'Diesel', transmission: 'Automatic',
    price: 2250000, badge: 'Just In', badgeType: 'hot', type: 'suv', certified: true,
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80',
    features: ['ADAS Level 2', 'Panoramic Sunroof', '7-Seater', '360° Camera'],
  },
  {
    id: 'car-002', make: 'Honda', model: 'City ZX CVT',
    year: 2021, km: 35000, fuel: 'Petrol', transmission: 'Automatic',
    price: 1380000, badge: 'Best Deal', badgeType: 'deal', type: 'sedan', certified: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80',
    features: ['Lane Watch Camera', 'Honda Sensing', 'Sunroof', '6 Airbags'],
  },
  {
    id: 'car-003', make: 'Hyundai', model: 'Creta SX Opt',
    year: 2023, km: 14000, fuel: 'Petrol', transmission: 'Manual',
    price: 1790000, badge: null, badgeType: null, type: 'suv', certified: true,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=700&q=80',
    features: ['Bose Sound', 'ADAS', 'Ventilated Seats', 'Panoramic Sunroof'],
  },
  {
    id: 'car-004', make: 'Maruti Suzuki', model: 'Swift ZXi Plus',
    year: 2022, km: 28000, fuel: 'Petrol', transmission: 'Manual',
    price: 750000, badge: 'Popular', badgeType: 'popular', type: 'hatch', certified: true,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80',
    features: ['SmartPlay Pro+', 'Auto AC', 'Rear Camera', 'Keyless Entry'],
  },
  {
    id: 'car-005', make: 'BMW', model: '3 Series 320i',
    year: 2021, km: 40000, fuel: 'Petrol', transmission: 'Automatic',
    price: 3800000, badge: 'Premium', badgeType: 'premium', type: 'luxury', certified: true,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&q=80',
    features: ['Harman/Kardon', 'Head-Up Display', 'Heated Seats', 'Park Assist'],
  },
  {
    id: 'car-006', make: 'Toyota', model: 'Innova Crysta GX',
    year: 2020, km: 55000, fuel: 'Diesel', transmission: 'Manual',
    price: 1850000, badge: null, badgeType: null, type: 'suv', certified: false,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&q=80',
    features: ['7-Seater', 'Rear AC Vents', 'Captain Seats', 'Cruise Control'],
  },
  {
    id: 'car-007', make: 'Tata', model: 'Nexon EV Max',
    year: 2023, km: 18000, fuel: 'Electric', transmission: 'Automatic',
    price: 1620000, badge: 'EV', badgeType: 'hot', type: 'suv', certified: true,
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&q=80',
    features: ['437km Range', 'Fast Charging', 'ADAS', 'JBL Sound System'],
  },
  {
    id: 'car-008', make: 'Kia', model: 'Seltos HTX G',
    year: 2022, km: 31000, fuel: 'Petrol', transmission: 'Manual',
    price: 1290000, badge: null, badgeType: null, type: 'suv', certified: true,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=700&q=80',
    features: ['Bose Sound', 'UVO Connect', 'Ventilated Seats', 'Sunroof'],
  },
]

/* ── Helpers ── */
export function formatPrice(n: number): string {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(1)} Cr`
  if (n >= 100000)   return `₹${(n / 100000).toFixed(1)}L`
  return `₹${n.toLocaleString('en-IN')}`
}

export function formatKM(n: number): string {
  return `${n.toLocaleString('en-IN')} km`
}
