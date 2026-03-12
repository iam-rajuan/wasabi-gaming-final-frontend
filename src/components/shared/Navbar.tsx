'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import Logo from './logo/Logo'
import { ActiveSection } from '../../constant/navConstant'
import { useAppStore } from '@/store/useAppStore'
import { Building2, LogOut, User } from 'lucide-react'
import LogoutModal from '@/components/shared/LogoutModal'

const Navbar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const isContactPage = pathname === '/contact-us'

  const { activeSection, setActiveSection } = useAppStore()
  const { data: session, status } = useSession()

  const [mounted, setMounted] = useState(false)
  const [cvBuilderSelection, setCvBuilderSelection] = useState('CV Builder')
  const [isCvBuilderOpen, setIsCvBuilderOpen] = useState(false)
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedCv = localStorage.getItem('cvBuilderSelection')
    if (savedCv) setCvBuilderSelection(savedCv)

    // Sync activeSection with user role on login
    if (status === 'authenticated') {
      if (
        session?.user?.role === 'student' &&
        activeSection !== ActiveSection.Students
      ) {
        setActiveSection(ActiveSection.Students)
      } else if (
        session?.user?.role === 'school' &&
        activeSection !== ActiveSection.School
      ) {
        setActiveSection(ActiveSection.School)
      }
    }
  }, [status, session, activeSection, setActiveSection])

  const isLoggedIn = status === 'authenticated'
  const isStudent = session?.user?.role === 'student'
  const isSchool = session?.user?.role === 'school'
  const isAuthorized =
    (activeSection === ActiveSection.Students && isStudent) ||
    (activeSection === ActiveSection.School && isSchool)

  const navItemsData =
    activeSection === ActiveSection.Students
      ? [
        ...(isLoggedIn ? [{ name: 'Dashboard', to: '/dashboard' }] : []),
        { name: 'Application Tracker', to: '/dashboard/application-tracker' },
        { name: 'Law Firm Profiles', to: '/dashboard/law-firm-profiles' },
        { name: 'Portfolio', to: '/dashboard/portfolio' },
        { name: 'Courses', to: '/dashboard/courses' },
        { name: 'Mock Interviews', to: '/dashboard/mock-interview' },
      ]
      : [
        // ...(isLoggedIn
        //   ? [{ name: 'Dashboard', to: '/school/dashboard' }]
        //   : []),
        { name: 'Manage Students', to: '/school/manage-students' },
        { name: 'Invite Students', to: '/school/invite-students' },
        { name: 'Premium Features', to: '/school/premium-features' },
      ]

  const moreItems = [
    {
      name: 'About us',
      to: `/about-us`,
    },
    { name: 'Contact us', to: '/contact-us' },
    {
      name: 'Plans',
      to: '/plans',
    },
    { name: 'FAQ', to: '/faq' },
  ]

  const handleCvSelection = (option: string) => {
    setCvBuilderSelection(option)
    localStorage.setItem('cvBuilderSelection', option)
    setIsCvBuilderOpen(false)
    if (option === 'CV Builder') {
      router.push('/dashboard/cv-builder')
    } else if (option === 'Cover Letter Builder') {
      router.push('/dashboard/cover-letter')
    }
  }

  const handleMobileCvSelection = (option: string) => {
    setCvBuilderSelection(option)
    localStorage.setItem('cvBuilderSelection', option)
    setIsCvBuilderOpen(false)
    setIsMobileMenuOpen(false)
    if (option === 'CV Builder') {
      router.push('/dashboard/cv-builder')
    } else if (option === 'Cover Letter Builder') {
      router.push('/dashboard/cover-letter')
    }
  }

  const handleLogoutClick = () => {
    setIsMobileMenuOpen(false)
    setIsLogoutModalOpen(true)
  }

  const confirmLogout = async () => {
    await signOut({ callbackUrl: '/' })
    setIsLogoutModalOpen(false)
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    // Stay on homepage when switching sections
    if (pathname !== '/') {
      router.push('/')
    }
  }

  // Check if we should show the Profile button (only for logged-in School users)
  const showProfileButton = isLoggedIn && activeSection === ActiveSection.School

  if (!mounted) {
    return (
      <nav className="relative z-50 w-full min-h-[140px] bg-transparent">
        {/* Skeleton or empty space to avoid layout shift */}
      </nav>
    )
  }

  return (
    <>
      <nav className="relative z-50 w-full">
        {/* Top Section - Optimized for all screens - Hidden on Contact Page and for Logged-in Users */}
        {!isContactPage && !isLoggedIn && (
          <div
            className={`flex items-center justify-start bg-[#FFFFB0] p-0.5 sm:p-1 md:p-1 lg:p-1.5 xl:p-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-2xl neuton`}
          >
            <button
              className={`py-0.5 md:py-1 lg:py-1 px-3 md:px-4 lg:px-4 xl:px-4 ${activeSection === ActiveSection.Students
                  ? 'border-b-2 border-[#FDC700] font-semibold'
                  : 'text-gray-700'
                }`}
              onClick={() => handleSectionChange(ActiveSection.Students)}
            >
              Students
            </button>
            <span className="mx-1 sm:mx-2 md:mx-2 lg:mx-2 xl:mx-2 text-gray-500">
              |
            </span>
            <button
              className={`px-2 py-0.5 sm:px-3 sm:py-0.5 md:px-4 md:py-1 lg:px-4 lg:py-1 ${activeSection === ActiveSection.School
                  ? 'border-b-2 border-[#FDC700] font-semibold'
                  : 'text-gray-700'
                }`}
              onClick={() => handleSectionChange(ActiveSection.School)}
            >
              School
            </button>
          </div>
        )}

        {/* Main Navbar - Responsive for all breakpoints */}
        <div
          className={`flex items-center justify-between py-2 md:py-2 lg:py-2 px-4 md:px-8 lg:px-2 xl:px-16 ${isContactPage
              ? ''
              : activeSection === ActiveSection.Students
                ? 'bg-slate-50'
                : ''
            }`}
          style={
            !isContactPage && activeSection === ActiveSection.School
              ? { backgroundColor: 'rgb(248, 250, 252)' }
              : undefined
          }
        >
          {/* Logo - Responsive sizing */}
          <Link href="/">
            <div className="w-auto">
              <Logo />
            </div>
          </Link>

          {/* Desktop Navbar Items - Optimized for LG and XL */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div
              className={`flex items-center space-x-2 lg:space-x-3 xl:space-x-4 ${isContactPage
                  ? 'bg-white/80 backdrop-blur-md shadow-sm border border-white/20 rounded-full px-6 py-2'
                  : ''
                }`}
            >
              <div
                className={`flex items-center border border-[#E6E6E6] rounded-full px-3 lg:px-4 xl:px-4 py-2 ${isContactPage
                    ? 'bg-transparent border-none'
                    : 'lg:bg-[#FEFACA]'
                  }`}
              >
                {navItemsData.map(item => (
                  <Link
                    key={item.name}
                    href={item.to}
                    className={`px-2 lg:px-3 xl:px-3 text-center py-1 font-medium transition-colors duration-200 text-xs sm:text-base md:text-lg lg:text-sm xl:text-base ${pathname === item.to
                        ? 'yellow text-black rounded-3xl px-3 lg:px-4 xl:px-4 py-2'
                        : isContactPage
                          ? 'text-[#1E1E1E] hover:text-black'
                          : 'text-[#505050] hover:text-black'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* More Dropdown - Improved for LG */}
                <div
                  className="relative"
                  onMouseLeave={() => setIsMoreOpen(false)}
                >
                  <button
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    className={`flex items-center px-2 lg:px-3 xl:px-4 py-1 font-medium transition-colors duration-200 text-xs sm:text-base md:text-lg lg:text-sm xl:text-base ${isContactPage ? 'text-[#1E1E1E]' : 'text-[#505050]'
                      }`}
                  >
                    More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      className={`ml-1 lg:ml-2 transform transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''
                        }`}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.475 14.475L7.84995 10.85C7.79995 10.8 7.76262 10.746 7.73795 10.688C7.71328 10.63 7.70062 10.5673 7.69995 10.5C7.69995 10.3667 7.74595 10.25 7.83795 10.15C7.92995 10.05 8.05062 10 8.19995 10H15.8C15.95 10 16.071 10.05 16.163 10.15C16.255 10.25 16.3006 10.3667 16.3 10.5C16.3 10.5333 16.25 10.65 16.15 10.85L12.525 14.475C12.4416 14.5583 12.3583 14.6167 12.275 14.65C12.1916 14.6833 12.1 14.7 12 14.7C11.9 14.7 11.8083 14.6833 11.725 14.65C11.6416 14.6167 11.5583 14.5583 11.475 14.475Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  {isMoreOpen && (
                    <div className="absolute top-full right-0 pt-2 lg:pt-4 xl:pt-2 w-40 lg:w-44 xl:w-48 z-10">
                      <div className="flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-lg">
                        {moreItems.map((item, idx) => (
                          <React.Fragment key={item.name}>
                            <Link
                              href={item.to}
                              onClick={() => setIsMoreOpen(false)}
                              className={`w-full text-left px-3 lg:px-4 xl:px-4 py-2 text-[#505050] font-medium transition-colors duration-200 text-xs lg:text-sm xl:text-base ${pathname === item.to
                                  ? 'bg-[#FFFF85] border-b-[1px] border-b-[#E6E6E6]'
                                  : 'hover:bg-gray-100'
                                }`}
                            >
                              {item.name}
                            </Link>
                            {idx < moreItems.length - 1 && (
                              <div className="w-full border-b border-gray-200" />
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Responsive buttons for LG and XL */}
          <div className="hidden lg:flex items-center space-x-2 lg:space-x-3 xl:space-x-3">
            {/* CV Builder - Responsive - Only for Students */}
            {activeSection === ActiveSection.Students && (
              <div className="relative neuton">
                <button
                  className="flex items-center space-x-1 lg:space-x-2 bg-[#FFFF00] border-2 border-[#E5E500] text-black px-2 lg:px-3 xl:px-4 py-1 lg:py-2 rounded-full font-semibold text-xs lg:text-sm xl:text-base"
                  onClick={() => setIsCvBuilderOpen(!isCvBuilderOpen)}
                >
                  <span className="truncate max-w-[80px] lg:max-w-[90px] xl:max-w-none">
                    {cvBuilderSelection}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 ml-1 transform transition-transform duration-200"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M11.475 14.475L7.84995 10.85C7.79995 10.8 7.76262 10.746 7.73795 10.688C7.71328 10.63 7.70062 10.5673 7.69995 10.5C7.69995 10.3667 7.74595 10.25 7.83795 10.15C7.92995 10.05 8.05062 10 8.19995 10H15.8C15.95 10 16.071 10.05 16.163 10.15C16.255 10.25 16.3006 10.3667 16.3 10.5C16.3 10.5333 16.25 10.65 16.15 10.85L12.525 14.475C12.4416 14.5583 12.3583 14.6167 12.275 14.65C12.1916 14.6833 12.1 14.7 12 14.7C11.9 14.7 11.8083 14.6833 11.725 14.65C11.6416 14.6167 11.5583 14.5583 11.475 14.475Z"
                      fill="#000000"
                    />
                  </svg>
                </button>
                {isCvBuilderOpen && (
                  <div className="absolute top-full right-0 mt-2 w-36 lg:w-40 xl:w-48 z-10 flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow-lg">
                    {['CV Builder', 'Cover Letter Builder'].map(
                      (option, idx) => (
                        <React.Fragment key={option}>
                          <button
                            className={`w-full text-left px-3 lg:px-4 xl:px-4 py-2 text-[#505050] font-medium transition-colors duration-200 text-xs lg:text-sm xl:text-base ${cvBuilderSelection === option
                                ? 'bg-[#FFFF85]'
                                : 'hover:bg-gray-100'
                              }`}
                            onClick={() => handleCvSelection(option)}
                          >
                            {option}
                          </button>
                          {idx === 0 && (
                            <div className="w-full border-b border-gray-200" />
                          )}
                        </React.Fragment>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Elegant Profile Button - Only for logged-in School users */}
            {showProfileButton && (
              <Link href="/school/profile">
                <button className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 xl:px-3 py-1 lg:py-1.5 xl:py-1.5 rounded-full border border-[#E5E5E5] bg-white text-[#1F2937] text-xs lg:text-sm xl:text-sm font-medium shadow-sm hover:bg-gray-50 hover:shadow-md transition-all duration-200 min-w-[fit-content]">
                  {/* Avatar-style identity */}
                  <div className="w-6 h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Building2
                      size={12}
                      className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 text-black"
                    />
                  </div>

                  <span className="whitespace-nowrap truncate max-w-[80px] lg:max-w-[90px] xl:max-w-none">
                    School Profile
                  </span>
                </button>
              </Link>
            )}

            {/* Auth Buttons - Responsive */}
            {isLoggedIn && isAuthorized ? (
              <div className="flex items-center gap-3">
                <Link
                  href={
                    activeSection === ActiveSection.Students
                      ? '/dashboard/setting'
                      : '/school/profile'
                  }
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden cursor-pointer hover:border-[#FFFF00] transition-colors relative bg-gray-100">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="bg-[#FFFF00] border-2 border-[#E5E500] text-black p-2.5 rounded-full hover:bg-[#F0F000] transition-colors flex items-center justify-center"
                  title="Logout"
                >
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="border-2 border-[#E5E500] text-[#525240] px-2 lg:px-3 xl:px-4 py-1 lg:py-2 rounded-full font-semibold neuton text-xs lg:text-sm xl:text-base">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-[#FFFF00] border-2 border-[#E5E500] text-black px-2 lg:px-3 xl:px-4 py-1 lg:py-2 rounded-full font-semibold neuton text-xs lg:text-sm xl:text-base">
                    Sign up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle - Shows on LG and below */}
          <div className="lg:hidden">
            <button
              className="text-black p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Improved for smaller LG screens */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#FEF9BE] p-4 flex flex-col space-y-3">
            {navItemsData.map(item => (
              <Link
                key={item.name}
                href={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-[#505050] font-medium hover:bg-gray-100 rounded transition-colors duration-200 text-sm"
              >
                {item.name}
              </Link>
            ))}

            {/* More Dropdown for Mobile */}
            <div className="relative">
              <button
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className="flex justify-between items-center w-full px-3 py-2 text-[#505050] font-medium rounded transition-colors duration-200 text-sm"
              >
                More{' '}
                <span
                  className={`${isMoreOpen ? 'rotate-180' : ''
                    } inline-block text-lg`}
                >
                  ▼
                </span>
              </button>
              {isMoreOpen && (
                <div className="mt-1 ml-4 flex flex-col space-y-1 border-gray-200 rounded-lg shadow-lg p-1">
                  {moreItems.map((item, idx) => (
                    <React.Fragment key={item.name}>
                      <Link
                        href={item.to}
                        onClick={() => {
                          setIsMoreOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                        className={`px-3 py-2 text-[#505050] font-medium hover:bg-gray-100 rounded transition-colors duration-200 text-sm ${pathname === item.to
                            ? 'bg-[#FFFF85] border-b-[1px] border-b-[#E6E6E6]'
                            : ''
                          }`}
                      >
                        {item.name}
                      </Link>
                      {idx < moreItems.length - 1 && (
                        <div className="w-full border-b border-gray-200" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile CV Builder - Only for Students */}
            {activeSection === ActiveSection.Students && (
              <div className="relative">
                <button
                  onClick={() => setIsCvBuilderOpen(!isCvBuilderOpen)}
                  className="flex justify-between items-center w-full px-3 py-2 bg-[#FFFF00] border-2 border-[#E5E500] text-black rounded font-semibold text-sm"
                >
                  {cvBuilderSelection}{' '}
                  <span
                    className={`${isCvBuilderOpen ? 'rotate-180' : ''
                      } inline-block`}
                  >
                    ▼
                  </span>
                </button>
                {isCvBuilderOpen && (
                  <div className="mt-1 ml-4 flex flex-col space-y-1 border-gray-200 rounded-lg shadow-lg p-1">
                    {['CV Builder', 'Cover Letter Builder'].map(
                      (option, idx) => (
                        <React.Fragment key={option}>
                          <button
                            onClick={() => handleMobileCvSelection(option)}
                            className={`text-start px-3 py-2 text-[#505050] font-medium hover:bg-gray-100 rounded transition-colors duration-200 w-full text-sm ${cvBuilderSelection === option
                                ? 'bg-[#FFFF85]'
                                : ''
                              }`}
                          >
                            {option}
                          </button>
                          {idx === 0 && (
                            <div className="w-full border-b border-gray-200" />
                          )}
                        </React.Fragment>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Mobile Profile Button */}
            {showProfileButton && (
              <Link
                href="/school/profile"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-[#E5E5E5] bg-white text-[#1F2937] text-sm font-medium shadow-sm hover:bg-gray-50 transition-all">
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                    <Building2 size={18} className="text-black" />
                  </div>
                  School Profile
                </button>
              </Link>
            )}

            {/* Mobile Auth Buttons */}
            {isLoggedIn && isAuthorized ? (
              <div className="flex flex-col gap-3 pt-2 border-t border-yellow-200">
                <Link
                  href={
                    activeSection === ActiveSection.Students
                      ? '/dashboard/setting'
                      : '/school/profile'
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-yellow-100 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden bg-white relative">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <User size={16} />
                      </div>
                    )}
                  </div>
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-3 px-3 py-3 bg-[#FFFF00] border-2 border-[#E5E500] text-black hover:bg-[#F0F000] rounded-xl font-bold w-full text-left"
                >
                  <LogOut size={24} />
                  Logout
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </nav>
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onLogout={confirmLogout}
      />
    </>
  )
}

export default Navbar
