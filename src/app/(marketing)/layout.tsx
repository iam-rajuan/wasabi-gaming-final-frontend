'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/shared/Navbar'
// import Footer from "@/components/shared/Footer";
import { IMAGES } from '@/assets'
import Footer from '@/components/shared/Footer'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isContactPage = pathname === '/contact-us'

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`relative ${isContactPage ? 'min-h-screen' : ''} bg-[#FAFAFA] flex flex-col flex-1`}
        style={{
          backgroundImage: isContactPage
            ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${IMAGES.contact})`
            : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Navbar />

        {/* Content layer */}
        <div className={`flex-1 ${isContactPage ? 'relative z-10' : ''}`}>
          {children}
        </div>

        {/* Footer inside the styled div? Original code has Footer OUTSIDE the styled div but INSIDE the flex container. */}
      </div>
      <Footer />
    </div>
  )
}
