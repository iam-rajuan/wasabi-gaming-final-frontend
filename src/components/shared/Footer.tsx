import React from 'react'
import Image from 'next/image' // If using Next.js (recommended with Shadcn)
import Link from 'next/link'
// import logo from '@/public/logo-aspiring.png' // Place your logo in public folder

const Footer = () => {
  return (
    <footer className="main-bg-color py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-start">
            <Image
              src={'/logo.png'}
              alt="Aspiring Legal Network Logo"
              width={120}
              height={120}
              className="mb-6"
            />
            <p className="text-gray-700 text-lg leading-relaxed max-w-sm">
              Aspiring helps you create professional, job-ready resumes in
              minutes. Build, customise, and share your CV with ease to take the
              next step in your career.
            </p>
          </div>

          {/* About Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Legal and Accessibility
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-700 hover:text-gray-900 transition"
                >
                  Privacy policies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Divider & Copyright */}
        <hr className="border-gray-300 mb-6" />
        <p className="text-center text-gray-600 text-sm">
          ©copyright aspiringlegalwork {new Date().getFullYear()} . All right reserves
        </p>
      </div>
    </footer>
  )
}

export default Footer
