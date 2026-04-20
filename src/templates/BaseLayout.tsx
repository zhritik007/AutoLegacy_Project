import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'
import FloatingActions from '@/components/common/FloatingActions'
import { EnquiryProvider } from '@/components/common/EnquiryModal'

interface BaseLayoutProps {
  children: React.ReactNode
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <EnquiryProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2
                   focus:z-[999] focus:bg-brand-primary focus:text-white
                   focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {children}
      </main>

      <Footer />
      <FloatingActions />
    </EnquiryProvider>
  )
}
