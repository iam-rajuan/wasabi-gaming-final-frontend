'use client'

import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface RoleGuardProps {
    children: React.ReactNode
    allowedRole: 'student' | 'school'
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRole }) => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        if (status === 'loading') return

        if (status === 'unauthenticated') {
            toast.error('Please login to access this page')
            router.push('/login')
            return
        }

        const userRole = session?.user?.role

        if (userRole !== allowedRole) {
            toast.error(`Access denied. This section is for ${allowedRole}s only.`)

            // Redirect to their respective dashboard if they are logged in but in the wrong section
            if (userRole === 'student') {
                router.push('/dashboard')
            } else if (userRole === 'school') {
                router.push('/school/dashboard')
            } else {
                router.push('/')
            }
            return
        }

        setIsAuthorized(true)
    }, [status, session, allowedRole, router, pathname])

    if (status === 'loading' || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-8 h-8 border-4 border-[#FFFF00] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return <>{children}</>
}

export default RoleGuard
