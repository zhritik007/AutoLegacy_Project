import type { Metadata } from 'next'
import './globals.css'
import { siteConfig } from '@/config/siteConfig'

export const metadata: Metadata = {
  title:       siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords:    siteConfig.seo.keywords,
  openGraph: {
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    type:        'website',
    url:         siteConfig.url,
  },
  twitter: {
    card:  'summary_large_image',
    title: siteConfig.seo.title,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded from config so swapping fonts = just change siteConfig */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={siteConfig.theme.fonts.googleFontsUrl} rel="stylesheet" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context':    'https://schema.org',
              '@type':       'AutoDealer',
              name:          siteConfig.businessName,
              description:   siteConfig.description,
              url:           siteConfig.url,
              telephone:     siteConfig.contact.phone,
              email:         siteConfig.contact.email,
              address: {
                '@type':          'PostalAddress',
                streetAddress:    siteConfig.contact.address,
                addressCountry:   'IN',
              },
              openingHours: 'Mo-Su 09:00-20:00',
              aggregateRating: {
                '@type':       'AggregateRating',
                ratingValue:   '4.9',
                reviewCount:   '248',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
