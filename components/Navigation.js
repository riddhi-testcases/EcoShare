"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import AuthModal from "./AuthModal"
import { Menu, X, Leaf, Search, Plus, User, LogOut, Home, Users, BarChart3 } from "lucide-react"

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: "login" })
  const { user, logout } = useAuth()

  const handleAuthClick = (mode) => {
    setAuthModal({ isOpen: true, mode })
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/browse", label: "Browse", icon: Search },
    { href: "/communities", label: "Communities", icon: Users },
    { href: "/impact", label: "Impact", icon: BarChart3 },
  ]

  return (
    <>
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gray-900">EcoShare</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-primary transition-colors flex items-center space-x-1"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Desktop Auth/User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <Link href="/list-item">
                    <Button className="flex items-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>List Item</span>
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="flex items-center space-x-2">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                    Sign In
                  </Button>
                  <Button onClick={() => handleAuthClick("register")}>Sign Up</Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md flex items-center space-x-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    href="/list-item"
                    className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="h-4 w-4" />
                    <span>List Item</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md flex items-center space-x-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick("login")}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick("register")}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal({ isOpen: false, mode: "login" })}
        defaultMode={authModal.mode}
      />
    </>
  )
}
