'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'

export default function SubscriptionErrorHandler() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const originalFetch = window.fetch

    window.fetch = async (...args) => {
      const response = await originalFetch(...args)

      // Clone response to read body without consuming it for the actual caller
      const clonedResponse = response.clone()

      try {
        const contentType = clonedResponse.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          const data = await clonedResponse.json()

          // Check for the specific error structure
          if (
            data?.message === 'Subscription plan error' ||
            data?.errorSources?.[0]?.message ===
              'Subscription plan needed to access this feature'
          ) {
            // Prevent duplicate toasts/redirects if we are already on the plans page
            if (pathname !== '/plans') {
              toast.error(
                'Subscription plan needed to access this feature. Redirecting to plans...',
              )
              router.push('/plans')
            }
          }
        }
      } catch (error) {
        // Ignore JSON parse errors or other issues in the interceptor
      }

      return response
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [router, pathname])

  return null
}
