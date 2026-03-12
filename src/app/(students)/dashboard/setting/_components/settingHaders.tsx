'use client'
import { useQuery } from '@tanstack/react-query'
import { LogOut, Sparkles } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'

const SettingHaders = ({
  setIsLogoutModalOpen,
}: {
  setIsLogoutModalOpen: (isOpen: boolean) => void
}) => {
  const { data: sessionData } = useSession()
  const token = sessionData?.accessToken

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (!res.ok) throw new Error('Failed to load profile')
      return res.json()
    },
  })
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-[30px] text-[#1E1E1E] ">Profile Settings</h1>
        <p className="text-[#4A5565] text-[16px] ">
          Manage your account information and preferences
        </p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-3">
          <button className="bg-gradient-to-r from-[#F3E8FF] to-[#DBEAFE] flex items-center justify-center text-[#8200DB] px-5 py-1.5 rounded-full text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />{' '}
            {data?.data?.subscription?.name || ''}
          </button>
          {(!data?.data?.subscription?.name || data?.data?.subscription?.name?.toLowerCase() === 'free') && (
            <a href="/plans">
              <button className="bg-[#FFFF00] border-none text-black px-5 py-1.5 rounded-full text-sm font-medium hover:bg-[#F0F000] transition-all shadow-sm">
                Upgrade Plan
              </button>
            </a>
          )}
        </div>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="flex items-center justify-center bg-[#FFFF00] border-2 border-[#E5E500] text-black px-6 py-2 rounded-full text-base font-bold hover:bg-[#F0F000] transition-all shadow-sm"
        >
          <LogOut className="w-5 h-5 mr-2" /> Logout
        </button>
      </div>
    </div>
  )
}

export default SettingHaders
