'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

interface NavLink {
  label: string
  href: string
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="xl:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-foreground transition-colors"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed top-16 left-0 right-0 bottom-0 z-[9999] px-6 py-8 border-t border-border overflow-y-auto"
            style={{ backgroundColor: 'hsl(var(--background))' }}
            onClick={() => setOpen(false)}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 text-lg font-medium text-foreground border-b border-border hover:text-purple transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/support"
                className="mt-6 inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-sm bg-purple text-white hover:bg-purple/90 transition-colors"
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
