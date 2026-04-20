# Agency Site Template — Reuse Guide

## To deploy a new client site in under 30 minutes

### Step 1 — Duplicate the project
```bash
cp -r autolegacy-next my-new-client
cd my-new-client
npm install
```

### Step 2 — Edit ONLY these 2 files

**`src/config/siteConfig.ts`**
```ts
businessName: "Sharma Motors",
contact: {
  phone:    "+91 99999 00000",
  whatsapp: "919999900000",
  email:    "info@sharmamotors.in",
  address:  "45, MG Road, Pune, Maharashtra – 411001",
},
theme: {
  primary:   { r: 30,  g: 100, b: 200 },  // ← change to client's brand color
  secondary: { r: 255, g: 200, b: 50  },  // ← accent color
},
```

**`src/config/inventoryConfig.ts`**
Replace the `inventory` array with client's actual car listings.

### Step 3 — Run
```bash
npm run dev        # local preview at localhost:3000
npm run build      # production build
```

### Step 4 — Deploy
```bash
# Vercel (free)
npx vercel --prod

# OR Hostinger/cPanel — run build then upload /out folder
npm run build && npm run export
```

---

## Full Folder Structure

```
src/
├── config/
│   ├── siteConfig.ts          ← EDIT PER CLIENT (business info, theme, content)
│   └── inventoryConfig.ts     ← EDIT PER CLIENT (car listings)
│
├── lib/
│   └── utils.ts               ← cn(), theme helpers (never touch)
│
├── components/
│   ├── ui/                    ← Primitive building blocks
│   │   ├── Button.tsx         ← variants: primary, dark, outline-white/dark, whatsapp
│   │   ├── Card.tsx           ← light/dark, hover, padding props
│   │   ├── Section.tsx        ← background switcher wrapper
│   │   ├── SectionHeader.tsx  ← eyebrow + title + subtitle
│   │   └── FormField.tsx      ← input, select, textarea unified
│   │
│   ├── common/                ← Shared across all pages
│   │   ├── Navbar.tsx         ← reads siteConfig.nav
│   │   ├── Footer.tsx         ← reads siteConfig.footerLinks, social
│   │   ├── FloatingActions.tsx← WhatsApp + Call FABs
│   │   └── EnquiryModal.tsx   ← Global car enquiry modal
│   │
│   └── sections/              ← Page section blocks
│       ├── HeroSection.tsx
│       ├── TrustBar.tsx
│       ├── CarGrid.tsx
│       ├── FeaturesSection.tsx
│       ├── SellPreviewSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── FaqSection.tsx
│       └── CtaStrip.tsx
│
├── templates/
│   └── BaseLayout.tsx         ← Wraps every page (Nav + Footer + FAB + Modal)
│
└── app/                       ← Next.js App Router pages
    ├── layout.tsx             ← Root layout (fonts, metadata, SEO)
    ├── globals.css            ← Tailwind base + keyframes
    ├── page.tsx               ← Homepage
    ├── inventory/page.tsx     ← Inventory with filters
    ├── sell/page.tsx          ← Sell your car
    └── contact/page.tsx       ← Contact + map
```

---

## Theme System

The entire color palette is driven by 4 values in `siteConfig.theme`:

| Token    | Tailwind class          | Usage                     |
|----------|-------------------------|---------------------------|
| primary  | `bg-brand-primary`      | Buttons, accents, borders |
| secondary| `bg-brand-secondary`    | Gold accents, eyebrows    |
| dark     | `bg-brand-dark`         | Backgrounds, nav, footer  |
| light    | `bg-brand-light`        | Page bg, cream sections   |

Change the RGB values → entire site recolors. No component changes needed.

## Font System

Change `theme.fonts.googleFontsUrl` and `theme.fonts.display/body/serif` in siteConfig → new fonts everywhere.

---

## Before vs After

### Before (plain HTML)
- Hardcoded business name in 40+ places
- Phone number hardcoded in nav, footer, CTAs, FABs, modals
- Colors as hex strings in 150+ CSS rules
- Duplicate nav/footer HTML in every .html file
- No TypeScript = silent bugs

### After (Next.js + Tailwind)
- Business name: 1 place (`siteConfig.businessName`)
- Phone number: 1 place (`siteConfig.contact.phone`)
- Brand colors: 4 RGB values (`siteConfig.theme`)
- Nav + Footer: defined once, used everywhere via `BaseLayout`
- Full TypeScript — compile errors catch config mistakes instantly

---

## Adding a new page

```tsx
// src/app/about/page.tsx
import BaseLayout from '@/templates/BaseLayout'
import SectionHeader from '@/components/ui/SectionHeader'
import Section from '@/components/ui/Section'

export default function AboutPage() {
  return (
    <BaseLayout>
      <Section bg="white">
        <SectionHeader eyebrow="Our Story" title="About Us" />
        {/* your content */}
      </Section>
    </BaseLayout>
  )
}
```

That's it. Nav, Footer, FABs, Modal, theme — all inherited automatically.

---

## Forms

Uses **Web3Forms** (free, no subscription):
1. Go to web3forms.com
2. Enter client email → get access key
3. Paste key into `siteConfig.forms.access_key`

All 4 forms (enquiry, sell, quick sell, contact) are now live.
