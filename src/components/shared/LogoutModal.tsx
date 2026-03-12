'use client'

import React from 'react'
import { X } from 'lucide-react'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
  onLogout: () => void
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6 relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-[#FFFF00] flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-gray-900">Sign out</h3>
          <p className="text-gray-500 text-sm">
            Are you sure you want to sign out? You'll need to sign back in to
            access your account.
          </p>

          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onLogout}
              className="flex-1 px-4 py-2 bg-[#FFFF00] text-black rounded-lg font-medium hover:bg-[#faea0a] transition-colors shadow-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoutModal
