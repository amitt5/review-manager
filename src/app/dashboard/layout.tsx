"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Menu, Settings, Star, X, Zap } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-white">
      {/* Mobile menu button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-30 p-2 rounded-md bg-[#252525]"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar - Desktop: always visible, Mobile: overlay when open */}
      <div
        className={`${
          isMobile ? (isMobileMenuOpen ? "fixed inset-0 z-40 block" : "hidden") : "w-64 relative"
        } bg-[#1a1a1a] border-r border-gray-800 h-full`}
      >
        {/* Close button for mobile */}
        {isMobile && isMobileMenuOpen && (
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-md bg-[#252525]"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        {/* Sidebar header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold">ReviewBoost</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-2">
            <NavLink
              href="/dashboard"
              icon={<Home className="h-5 w-5" />}
              label="Dashboard"
              isActive={pathname === "/dashboard"}
            />
            <NavLink
              href="/dashboard/business"
              icon={<Star className="h-5 w-5" />}
              label="Business"
              isActive={pathname === "/dashboard/business"}
            />
            <NavLink
              href="/dashboard/analytics"
              icon={<BarChart3 className="h-5 w-5" />}
              label="Analytics"
              isActive={pathname === "/dashboard/analytics"}
            />
            <NavLink
              href="/dashboard/settings"
              icon={<Settings className="h-5 w-5" />}
              label="Settings"
              isActive={pathname === "/dashboard/settings"}
            />
          </nav>
        </div>

        {/* User profile */}
        <div className="absolute bottom-0 p-4 border-t border-gray-800 w-full">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {/* Add padding on mobile to account for the menu button */}
        <div className={isMobile ? "pt-8" : ""}>{children}</div>
      </div>
    </div>
  )
}

function NavLink({ href, icon, label, isActive }: { href: string, icon: React.ReactNode, label: string, isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 rounded-md ${
        isActive ? "bg-[#252525]" : "hover:bg-[#252525]"
      } text-white`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

