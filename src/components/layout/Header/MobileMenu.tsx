'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 text-white/80 hover:text-gold transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-[9999] px-6 py-8 border-t border-gold/35 overflow-y-auto bg-purple text-white"
            onClick={() => setOpen(false)}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {links.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between py-3.5 text-lg font-semibold border-b transition-colors ${
                      active
                        ? 'border-gold/70 text-gold'
                        : 'border-white/12 text-white hover:text-gold'
                    }`}
                  >
                    {link.label}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-gold" />}
                  </Link>
                )
              })}
              <Link
                href="/support"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-sm bg-gold text-gold-foreground hover:bg-gold/90 transition-colors"
              >
                Support Our Work
              </Link>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  )
}
