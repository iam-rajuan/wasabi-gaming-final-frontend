'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LogOut, User } from 'lucide-react'
import Logo from '@/components/shared/logo/Logo'
import { useSession, signOut } from 'next-auth/react'
import LogoutModal from '@/components/shared/LogoutModal'
import { useUserProfile } from '@/hooks/useUserProfile'
import { toast } from 'sonner'

interface NavItem {
  name: string
  path: string
}

const SchoolNavbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const { hasActiveSubscription, isAuthenticated } = useUserProfile()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const confirmLogout = async () => {
    await signOut({ callbackUrl: '/' })
    setIsLogoutModalOpen(false)
  }

  // Routes that require subscription
  const subscriptionRequiredRoutes = [
    '/school/manage-students',
    '/school/invite-students',
    '/school/profile',
  ]

  // Routes that only require login
  const loginRequiredRoutes = ['/school/premium-features']

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Check if route requires subscription
    if (subscriptionRequiredRoutes.includes(path)) {
      if (!isAuthenticated) {
        e.preventDefault()
        toast.error('Please login to access this feature')
        router.push('/login')
        return
      }
      if (!hasActiveSubscription) {
        e.preventDefault()
        toast.error('This feature requires an active subscription')
        router.push('/plans')
        return
      }
    }

    // Check if route requires login only
    if (loginRequiredRoutes.includes(path)) {
      if (!isAuthenticated) {
        e.preventDefault()
        toast.error('Please login to access this feature')
        router.push('/login')
        return
      }
    }
  }

  const navItems: NavItem[] = [
    // { name: "Dashboard", path: "/school/dashboard" },
    { name: 'Manage Students', path: '/school/manage-students' },
    { name: 'Invite Students', path: '/school/invite-students' },
    { name: 'Premium Features', path: '/school/premium-features' },
    { name: 'School Profile', path: '/school/profile' },
  ]

  const isActive = (path: string): boolean => {
    // For dashboard, only match exactly the path
    if (path === '/school/dashboard') {
      return pathname === '/school/dashboard'
    }

    // For other routes, check exact match or sub-routes
    return pathname === path || pathname.startsWith(path + '/')
  }

  // console.log('school profile image', session?.user?.image)

  return (
    <div>
      <nav className="w-full border border-[#E5E7EB] bg-slate-50">
        <div className="flex items-center justify-between px-4 md:px-8 lg:px-16 py-2">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-2 flex-grow justify-center">
            {navItems.map(item => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`px-3.5 py-2 rounded-full font-medium transition-all duration-200 ${isActive(item.path)
                    ? 'yellow text-[#1E1E1E]'
                    : 'text-[#505050] hover:text-black'
                    }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Section - Desktop */}
          {session?.user?.role === 'school' ? (
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/school/profile"
                onClick={(e) => handleNavClick(e, '/school/profile')}
                className={`px-4 py-2 rounded-2xl font-medium transition-all duration-200 border-2 ${isActive('/school/profile')
                  ? 'bg-[#FFFF00] text-[#1E1E1E] border-[#E5E500]'
                  : 'bg-white border-transparent text-[#505050] hover:text-black hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-gray-400" />
                    )}
                  </div>
                  <span className="font-semibold">School Profile</span>
                </div>
              </Link>
              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="p-2.5 rounded-full bg-[#FFFF00] border-2 border-[#E5E500] text-black hover:bg-[#F0F000] transition-colors flex items-center justify-center"
                title="Logout"
              >
                <LogOut size={22} />
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-3">
              <Link href="/login">
                <button className="border-2 border-[#E5E500] text-[#A6A600] px-4 py-2 rounded-full font-semibold text-sm">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-[#FFFF00] border-2 border-[#E5E500] text-black px-4 py-2 rounded-full font-semibold text-sm">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-black p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FEF9BE] border-t border-[#E5E500] px-4 py-3">
            <ul className="flex flex-col space-y-2">
              {navItems.map(item => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={(e) => {
                      handleNavClick(e, item.path)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${isActive(item.path)
                      ? 'bg-[#FFFF00] text-black border-2 border-[#E5E500]'
                      : 'text-[#505050] hover:text-black'
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Right Section */}
            {session?.user?.role === 'school' ? (
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-[#E5E500]">
                <Link
                  href="/school/profile"
                  onClick={(e) => {
                    handleNavClick(e, '/school/profile')
                    setIsMobileMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={16} className="text-gray-400" />
                    )}
                  </div>
                  <span className="text-black font-semibold">
                    School Profile
                  </span>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsLogoutModalOpen(true)
                  }}
                  className="flex items-center space-x-3 px-3 py-3 bg-[#FFFF00] border-2 border-[#E5E500] text-black hover:bg-[#F0F000] rounded-xl font-bold"
                >
                  <LogOut size={24} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-4 pt-4 border-t border-[#E5E500]">
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="border-2 border-[#E5E500] text-black px-4 py-2 rounded-full font-semibold w-full text-sm">
                    Login
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <button className="bg-[#FFFF00] border-2 border-[#E5E500] text-black px-4 py-2 rounded-full font-semibold w-full text-sm">
                    Sign up
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={confirmLogout}
      />
    </div>
  )
}

export default SchoolNavbar
