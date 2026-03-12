'use client'

import React from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#FEE64D] to-[#FFFFD4] p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-8 relative animate-in zoom-in-95 duration-200 text-center">

                <div className="mx-auto w-16 h-16 rounded-full bg-[#FFFF00] flex items-center justify-center mb-6 shadow-sm">
                    <Check className="w-8 h-8 text-black" strokeWidth={3} />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
                <p className="text-gray-600 mb-8 max-w-[80%] mx-auto">
                    Thank you for your subscription. Your account has been upgraded successfully.
                </p>

                <Link href="/">
                    <Button className="w-full rounded-full py-6 font-bold text-base bg-black text-white hover:bg-gray-800 transition-all">
                        Go to Home
                    </Button>
                </Link>
            </div>
        </div>
    )
}
