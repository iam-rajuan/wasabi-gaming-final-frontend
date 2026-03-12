'use client'

import { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import RoleSelectionModal from './RoleSelectionModal'

export default function GoogleLoginButton() {
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [cachedIdToken, setCachedIdToken] = useState<string | null>(null)

  const handleLogin = async ({
    idToken,
    role,
  }: {
    idToken: string
    role?: string
  }) => {
    try {
      const result = await signIn('google-login', {
        idToken,
        role: role || '',
        redirect: false,
      })

      if (result?.error) {
        console.error('❌ Google Login Error:', result.error)

        // Try to parse the error to see if it's the ROLE_REQUIRED case
        try {
          const errorData = JSON.parse(result.error)
          if (errorData.code === 'ROLE_REQUIRED') {
            // Cache the Google idToken so we can re-send it with the selected role
            setCachedIdToken(idToken)
            setShowRoleModal(true)
            return
          }
        } catch (e) {
          // Not a JSON error, proceed to show string error
        }

        toast.error(result.error)
      } else {
        toast.success('Login successful!')

        // Fetch session to get user role
        const { getSession } = await import('next-auth/react')
        const session = await getSession()
        const role = session?.user?.role

        if (role === 'school') {
          window.location.href = '/school/premium-features'
        } else {
          window.location.href = '/dashboard'
        }
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred during Google Login')
    }
  }

  const onRoleSelect = (role: 'student' | 'school') => {
    if (cachedIdToken) {
      console.log('🎯 Role selected, completing registration...', role)
      handleLogin({ idToken: cachedIdToken, role })
      setShowRoleModal(false)
    }
  }

  return (
    <>
      <div className="w-full relative flex justify-center group">
        {/* Custom Button UI */}
        <div className="w-full max-w-[400px] h-[50px] bg-[#FFFF00] rounded-xl flex items-center justify-center gap-3 cursor-pointer transition-transform active:scale-95 border border-transparent group-hover:shadow-md">
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[#FFFF00] font-bold text-sm">
            G
          </div>
          <span className="text-black font-bold text-lg">
            Continue with google
          </span>
        </div>

        {/* Invisible Google Button Overlay */}
        <div className="absolute inset-0 w-full h-full opacity-0 overflow-hidden flex justify-center items-center z-10">
          <GoogleLogin
            onSuccess={credentialResponse => {
              if (credentialResponse.credential) {
                handleLogin({ idToken: credentialResponse.credential })
              } else {
                toast.error('Failed to retrieve Google Token')
              }
            }}
            onError={() => {
              toast.error('Google Login Failed')
            }}
            useOneTap={false}
            theme="outline"
            shape="rectangular"
            text="continue_with"
            width="400"
            containerProps={{
              style: { width: '100%', height: '100%', display: 'block' },
            }}
          />
        </div>
      </div>

      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => {
          setShowRoleModal(false)
          setCachedIdToken(null)
        }}
        onSelectRole={onRoleSelect}
      />
    </>
  )
}

// "code changed by mamun"
