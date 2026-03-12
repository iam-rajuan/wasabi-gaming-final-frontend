'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/hooks/useUserProfile'
import { toast } from 'sonner'

interface SubscriptionGuardProps {
    children: React.ReactNode
    requireSubscription?: boolean
    requireLogin?: boolean
    message?: string
    requiredPlan?: 'basic' | 'premium'
}

export default function SubscriptionGuard({
    children,
    requireSubscription = true,
    requireLogin = true,
    message,
    requiredPlan = 'basic',
}: SubscriptionGuardProps) {
    const router = useRouter()
    const { isAuthenticated, hasActiveSubscription, isLoading, subscriptionName } = useUserProfile()

    useEffect(() => {
        // Wait for loading to complete
        if (isLoading) return

        // Check login requirement
        if (requireLogin && !isAuthenticated) {
            toast.error('Please login to access this page')
            router.push('/login')
            return
        }

        // Check subscription requirement
        if (requireSubscription && isAuthenticated) {
            const isPremium = subscriptionName.toLowerCase().includes('premium') || subscriptionName.toLowerCase().includes('pro')
            const hasBasic = hasActiveSubscription

            if (requiredPlan === 'premium' && !isPremium) {
                toast.error(message || 'This feature requires an active premium subscription')
                router.push('/plans')
                return
            }

            if (requiredPlan === 'basic' && !hasBasic) {
                toast.error(message || 'This feature requires an active subscription')
                router.push('/plans')
                return
            }
        }
    }, [isAuthenticated, hasActiveSubscription, isLoading, requireLogin, requireSubscription, router, requiredPlan, subscriptionName, message])

    // Show loading state
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    // Don't render children if requirements not met
    if (requireLogin && !isAuthenticated) {
        return null
    }

    if (requireSubscription && isAuthenticated) {
        const isPremium = subscriptionName.toLowerCase().includes('premium') || subscriptionName.toLowerCase().includes('pro')
        const hasBasic = hasActiveSubscription

        if (requiredPlan === 'premium' && !isPremium) return null
        if (requiredPlan === 'basic' && !hasBasic) return null
    }

    return <>{children}</>
}
