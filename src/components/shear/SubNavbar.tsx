"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function SubNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "CV Builder", href: "/cv-builder" },
    { name: "Psychometric Test", href: "/psychometric-test" },
    { name: "Mock Interview", href: "/mock-interview" },
    { name: "Law Firm Profiles", href: "/law-firms" },
    { name: "AI Assessment Center", href: "/ai-assessment" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="relative h-10 w-40">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <button
                  onClick={() => setActiveItem(item.name)}
                  className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeItem === item.name
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </button>
              </Link>
            ))}

            <Link href="/application-tracker">
              <button className="ml-4 px-6 py-2 bg-yellow-400 text-black text-sm font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                Application Tracker
              </button>
            </Link>
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/profile">
              <button className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                JD
              </button>
            </Link>
            <Link href="/profile">
              <button className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                Profile
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900 p-2"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <button
                  onClick={() => {
                    setActiveItem(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeItem === item.name
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                </button>
              </Link>
            ))}

            <Link href="/application-tracker">
              <button className="w-full mt-3 px-6 py-2 bg-yellow-400 text-black text-sm font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                Application Tracker
              </button>
            </Link>

            <div className="pt-4 mt-4 border-t border-gray-200 flex gap-4">
              <Link href="/profile">
                <button className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                  JD
                </button>
              </Link>
              <Link href="/profile">
                <button className="text-gray-700 hover:text-gray-900 text-sm font-medium">
                  Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default SubNavbar;
