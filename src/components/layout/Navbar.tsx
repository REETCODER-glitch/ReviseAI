'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Sparkles, BookOpen, CreditCard, Building2, StickyNote, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Study', icon: BookOpen },
  { href: '/notes', label: 'Notes', icon: StickyNote },
  { href: '/pricing', label: 'Pricing', icon: CreditCard },
  { href: '/partners', label: 'Partners', icon: Building2, badge: 'PRO' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-syne font-800 text-xl font-extrabold text-brand-500 tracking-tight">
              REVISE<span className="text-accent-500">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ href, label, icon: Icon, badge }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                  pathname === href
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-gray-500 hover:bg-brand-50 hover:text-brand-500'
                )}
              >
                <Icon size={15} />
                {label}
                {badge && (
                  <span className="text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/pricing"
              className="hidden md:flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <Sparkles size={14} />
              Upgrade
            </Link>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-brand-50 text-gray-500"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-100 py-3 animate-fade-in">
            {navItems.map(({ href, label, icon: Icon, badge }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium mb-1 transition-all',
                  pathname === href
                    ? 'bg-brand-500 text-white'
                    : 'text-gray-600 hover:bg-brand-50 hover:text-brand-500'
                )}
              >
                <Icon size={16} />
                {label}
                {badge && (
                  <span className="text-[10px] font-bold bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
