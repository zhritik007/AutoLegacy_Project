/**
 * ═══════════════════════════════════════════════════════
 *  SITE CONFIG  —  The ONLY file you edit per client
 *  Duplicate this project → change this file → done.
 * ═══════════════════════════════════════════════════════
 */

export const siteConfig = {

  /* ─── BUSINESS ──────────────────────────────────── */
  businessName: "AutoLegacy",
  tagline:      "India's Most Trusted Pre-Owned Car Marketplace",
  description:  "Buy & sell premium pre-owned vehicles in Gurugram. 150-point inspected, RC transfer support, easy finance.",
  logo:         "Auto<span style='color:var(--color-primary-hex)'>Legacy</span>®",
  logoText:     "AutoLegacy®",
  yearEstd:     "2016",
  url:          "https://www.autolegacy.in",

  contact: {
    phone:    "+91 98765 43210",
    whatsapp: "919876543210",
    email:    "hello@autolegacy.in",
    address:  "123, Sector 18, Gurugram, Haryana – 122001",
    hours:    "Monday – Sunday: 9:00 AM – 8:00 PM",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.08!2d77.0208!3d28.4701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d18c8c69b4b31%3A0x8c2a9d5b3e2bc1e0!2sSector%2018%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000",
  },

  social: {
    facebook:      "https://facebook.com/autolegacy",
    instagram:     "https://instagram.com/autolegacy",
    youtube:       "https://youtube.com/@autolegacy",
    twitter:       "https://twitter.com/autolegacy",
    googleReviews: "https://g.page/r/autolegacy/review", // replace with real Google Reviews URL
  },

  /* ─── THEME ─────────────────────────────────────── */
  // Change these to rebrand the entire site instantly
  theme: {
    primary:   { r: 200, g:  56, b:  42 },   // #c8382a — brand red
    secondary: { r: 201, g: 168, b:  76 },   // #c9a84c — gold
    dark:      { r:  10, g:  10, b:  10 },   // #0a0a0a — near black
    light:     { r: 245, g: 240, b: 232 },   // #f5f0e8 — cream
    fonts: {
      display: "Bebas Neue",
      body:    "DM Sans",
      serif:   "DM Serif Display",
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap",
    },
  },

  /* ─── NAV ───────────────────────────────────────── */
  nav: [
    { label: "Inventory",  href: "/inventory" },
    { label: "Sell Car",   href: "/sell"      },
    { label: "Why Us",     href: "/#why"      },
    { label: "Reviews",    href: "/#reviews"  },
    { label: "Contact",    href: "/contact"   },
  ],

  /* ─── HERO ──────────────────────────────────────── */
  hero: {
    eyebrow:  "India's Trusted Pre-Owned Car Marketplace",
    headline: ["Find Your", "Perfect", "Drive"],
    // headline[1] renders in primary color
    subtext:  "Premium pre-owned vehicles, thoroughly inspected, fairly priced. Buy with confidence or sell your car in 24 hours.",
    cta: {
      primary:   { label: "Browse All Cars", href: "/inventory" },
      secondary: { label: "Sell Your Car",   href: "/sell"      },
    },
  },

  /* ─── STATS ─────────────────────────────────────── */
  stats: [
    { value: 500,   suffix: "+",  label: "Cars Sold"     },
    { value: 12000, suffix: "+",  label: "Happy Clients" },
    { value: 8,     suffix: "+",  label: "Years Active"  },
    { value: "4.9", suffix: "★", label: "Google Rating" },
  ],

  /* ─── TRUST SIGNALS ─────────────────────────────── */
  trustSignals: [
    "150-Point Inspection",
    "RC Transfer Support",
    "Easy Finance Options",
    "Exchange Available",
    "Same-Day Evaluation",
    "7-Day Return Policy",
  ],

  /* ─── WHY US ────────────────────────────────────── */
  features: [
    {
      num:   "01",
      title: "150-Point Inspection",
      desc:  "Engine, suspension, electricals, body — all verified by certified mechanics before listing.",
    },
    {
      num:   "02",
      title: "Zero Hidden Costs",
      desc:  "Price shown is final. No last-minute add-ons or surprise fees at delivery.",
    },
    {
      num:   "03",
      title: "Full RC Transfer",
      desc:  "We handle all paperwork — RC transfer, NOC, insurance, Form 29/30.",
    },
    {
      num:   "04",
      title: "7-Day Return Policy",
      desc:  "Not satisfied? Return within 7 days for a full refund. No questions asked.",
    },
  ],

  /* ─── SELL STEPS ────────────────────────────────── */
  sellSteps: [
    {
      title: "Fill the Form",
      desc:  "Submit your car's details. Takes under 2 minutes. We call you within the hour.",
    },
    {
      title: "Free Home Inspection",
      desc:  "Our certified mechanic visits you or you come to us. Price quote same day.",
    },
    {
      title: "Instant Payment",
      desc:  "Accept the offer, complete paperwork, receive payment directly to your bank.",
    },
  ],

  /* ─── TESTIMONIALS ──────────────────────────────── */
  testimonials: [
    {
      text:   "Bought a Hyundai Creta from AutoLegacy. 100% transparent — no hidden charges, no surprises. Car delivered to my home.",
      name:   "Amit Mehta",
      label:  "Bought: Hyundai Creta 2023 · Gurugram",
      initials: "AM",
      rating: 5,
    },
    {
      text:   "Sold my old Swift in under 24 hours. They gave me 8% above my expectation and paid immediately. Never using a broker again.",
      name:   "Priya Kapoor",
      label:  "Sold: Maruti Swift 2019 · Delhi",
      initials: "PK",
      rating: 5,
    },
    {
      text:   "The 7-day return policy gave me total confidence. The BMW was better than advertised. They handled insurance, RC, everything.",
      name:   "Rohan Verma",
      label:  "Bought: BMW 3 Series 2021 · Noida",
      initials: "RV",
      rating: 5,
    },
  ],

  /* ─── FAQ ───────────────────────────────────────── */
  faqs: [
    {
      q: "How long does the whole process take?",
      a: "From form submission to payment, most transactions complete within 24 hours. Inspection is done same day you confirm.",
    },
    {
      q: "Do I need to bring my car to you?",
      a: "No! We offer free home inspection. Our mechanic comes to your location. You can also visit our showroom in Sector 18, Gurugram.",
    },
    {
      q: "What documents do I need to sell my car?",
      a: "Original RC book, Aadhaar/PAN, insurance papers, any loan NOC. We help with all paperwork including Form 29/30.",
    },
    {
      q: "Will you buy cars with minor accidents or damage?",
      a: "Yes, we buy cars in all conditions. The price will reflect condition, but we always offer fair market value.",
    },
    {
      q: "Is there any charge for the inspection?",
      a: "Absolutely none. Inspection, evaluation and consultation are 100% free with zero obligation to sell.",
    },
  ],

  /* ─── FOOTER LINKS ──────────────────────────────── */
  footerLinks: {
    quickLinks: [
      { label: "Home",          href: "/"          },
      { label: "Browse Cars",   href: "/inventory" },
      { label: "Sell Your Car", href: "/sell"      },
      { label: "About Us",      href: "/#why"      },
      { label: "Reviews",       href: "/#reviews"  },
      { label: "Contact Us",    href: "/contact"   },
    ],
    services: [
      { label: "Car Inspection (150-Point)", href: "#" },
      { label: "RC Transfer Support",        href: "#" },
      { label: "Car Finance Help",           href: "#" },
      { label: "Insurance Renewal",          href: "#" },
      { label: "Exchange / Upgrade",         href: "#" },
      { label: "Extended Warranty",          href: "#" },
    ],
  },

  /* ─── FORMS (Web3Forms — free, no subscription) ── */
  forms: {
    provider:   "web3forms",
    endpoint:   "https://api.web3forms.com/submit",
    access_key: "YOUR_WEB3FORMS_KEY_HERE",   // get free at web3forms.com
  },

  /* ─── SEO ───────────────────────────────────────── */
  seo: {
    title:       "AutoLegacy – Premium Pre-Owned Cars | Buy & Sell Used Cars Gurugram",
    description: "Buy & sell trusted pre-owned vehicles in Gurugram. 150-point inspected, RC transfer support, easy finance. Best prices guaranteed.",
    keywords:    "used cars gurugram, second hand cars haryana, buy old cars india, pre-owned vehicles, car dealer gurugram",
    ogImage:     "/og-image.jpg",
  },

} as const

export type SiteConfig = typeof siteConfig
