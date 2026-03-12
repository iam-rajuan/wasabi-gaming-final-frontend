// "use client";

// import { ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { usePathname } from "next/navigation";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const isActive = (path: string): boolean => pathname === path;

//   return (
//     <header>
//       {/* Top Strip */}
//       <div className="bg-[#FFFFB0] flex text-black text-sm py-1 px-4">
//         <div className="container mx-auto py-3 flex justify-start space-x-2">

//           {/* Students */}
//           <Link href="/">
//             <h3
//               className={`cursor-pointer text-[18px] transition-colors ${isActive("/")
//                   ? "font-semibold text-black underline underline-offset-4"
//                   : "font-normal text-gray-700 hover:text-black"
//                 }`}
//             >
//               Students
//             </h3>
//           </Link>

//           <span>|</span>

//           {/* School */}
//           <Link href="/school">
//             <h3
//               className={`cursor-pointer text-[18px] transition-colors ${isActive("/school")
//                   ? "font-semibold text-black underline underline-offset-4"
//                   : "font-normal text-gray-700 hover:text-black"
//                 }`}
//             >
//               School
//             </h3>
//           </Link>
//         </div>

//         <div className="flex justify-center items-center">
//           <Link href="/coming-soon" className="hover:text-black">
//             <h2 className="lg:flex hidden md:block items-center">
//               Contact With Us
//               <span className="ml-2">
//                 <ChevronRight />
//               </span>
//             </h2>
//             <h2 className="flex md:hidden   items-center">
//               Contact
//               <span className="ml-2">
//                 <ChevronRight />
//               </span>
//             </h2>
//           </Link>
//         </div>
//       </div>

//       {/* Main Navbar */}
//       <nav className="bg-white border-b border-[#B6B6B6] py-4 px-8">
//         <div className="flex items-center justify-between container mx-auto">

//           {/* Logo */}
//           <Link href="/">
//             <Image
//               src="/logo.png"
//               alt="ALN Logo"
//               width={100}
//               height={50}
//               className="cursor-pointer"
//             />
//           </Link>

//           {/* Desktop Menu */}
//           <ul className="hidden md:flex items-center bg-[#EBEBEB] space-x-8 border border-[#EBEBEB] rounded-full text-black font-medium">
//             {[
//               "Application Tracker",
//               "Law Firm Profiles",
//               "Event",
//               "Courses",
//               "Mock Interviews",
//               "More",
//             ].map((item) => (
//               <li key={item} className="py-3 px-4 cursor-pointer">
//                 <Link href="/coming-soon">{item}</Link>
//               </li>
//             ))}
//           </ul>

//           {/* Right Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <Link href="/coming-soon">
//               <button className="bg-[#FFFF00] border border-[#E5E500] py-2 px-6 rounded-full font-semibold">
//                 CV Builder ▼
//               </button>
//             </Link>
//             <Link href="/coming-soon">
//               <button className="border border-[#E5E500] text-[#A6A600] py-2 px-6 rounded-full font-bold">
//                 Login
//               </button>
//             </Link>
//             <Link href="/coming-soon">
//               <button className="bg-[#FFFF00] border border-[#E5E500] py-2 px-6 rounded-full font-semibold">
//                 Sign Up
//               </button>
//             </Link>
//           </div>

//           {/* Mobile Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden"
//           >
//             ☰
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isOpen && (
//           <div className="md:hidden bg-white shadow-lg p-4">
//             {[
//               "Application Tracker",
//               "Law Firm Profiles",
//               "Event",
//               "Courses",
//               "Mock Interviews",
//               "More",
//             ].map((item) => (
//               <div key={item} className="py-2">
//                 {item}
//               </div>
//             ))}
//           </div>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

'use client'

import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string): boolean => pathname === path

  return (
    <header className="w-full">
      {/* Top Strip */}
      <div className="bg-[#FFFFB0] text-black text-sm">
        <div className="container mx-auto px-4 py-1 flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-2">
            <Link href="/">
              <span
                className={`text-base cursor-pointer ${
                  isActive('/')
                    ? 'font-semibold underline underline-offset-4'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                Students
              </span>
            </Link>
            <span>|</span>
            <Link href="/school">
              <span
                className={`text-base cursor-pointer ${
                  isActive('/school')
                    ? 'font-semibold underline underline-offset-4'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                School
              </span>
            </Link>
          </div>

          {/* Right */}
          <Link
            href="/coming-soon"
            className="flex items-center gap-1 font-medium"
          >
            <span className="hidden sm:block">Contact With Us</span>
            <span className="sm:hidden">Contact</span>
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-[#B6B6B6]">
        <div className="container mx-auto px-4 lg:px-6 py-1 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.png"
              alt="ALN Logo"
              width={90}
              height={40}
              className="cursor-pointer"
            />
          </Link>

          {/* Desktop Menu (Laptop safe) */}
          <ul className="hidden md:flex items-center bg-[#EBEBEB] lg:space-x-8 border border-[#EBEBEB] rounded-full text-black font-medium">
            {[
              'Application Tracker',
              'Law Firm Profiles',
              'Event',
              'Courses',
              'Mock Interviews',
              'More',
            ].map(item => (
              <li
                key={item}
                className="lg:py-3 lg:px-4 md:py-3 md:px-2 cursor-pointer"
              >
                <Link href="/coming-soon">{item}</Link>
              </li>
            ))}
          </ul>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/coming-soon">
              <button className="bg-[#FFFF00] border border-[#E5E500] py-2 px-4 rounded-full font-semibold text-sm">
                CV Builder ▼
              </button>
            </Link>
            <Link href="/coming-soon">
              <button className="border border-[#E5E500] text-[#A6A600] py-2 px-4 rounded-full font-bold text-sm">
                Login
              </button>
            </Link>
            <Link href="/coming-soon">
              <button className="bg-[#FFFF00] border border-[#E5E500] py-2 px-4 rounded-full font-semibold text-sm">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t shadow-md">
            <div className="px-4 py-4 space-y-3 text-sm">
              {[
                'Application Tracker',
                'Law Firm Profiles',
                'Event',
                'Courses',
                'Mock Interviews',
                'More',
              ].map(item => (
                <Link
                  key={item}
                  href="/coming-soon"
                  className="block py-2 border-b"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar
