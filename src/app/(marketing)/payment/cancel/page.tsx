'use client'

import React from 'react'
import { X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#FEE64D] to-[#FFFFD4] p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-8 relative animate-in zoom-in-95 duration-200 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-6 shadow-sm">
          <X className="w-8 h-8 text-red-600" strokeWidth={3} />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Failed
        </h1>
        <p className="text-gray-600 mb-8 max-w-[80%] mx-auto">
          We encountered an issue processing your payment. Please try again or
          contact support.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/plans">
            <Button className="w-full rounded-full py-6 font-bold text-base bg-[#f3db40] text-black hover:bg-[#dfc836] border-2 border-[#f3db40] transition-all">
              Try Again
            </Button>
          </Link>

          <Link href="/">
            <Button
              variant="ghost"
              className="w-full rounded-full py-6 font-bold text-base text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all"
            >
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
