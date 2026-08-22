'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'

interface NavLink {
  label: string
  href?: string
  subLinks?: { label: string; href: string }[]
}

function isActivePath(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggleExpand = (e: React.MouseEvent, label: string) => {
    e.preventDefault()
    e.stopPropagation()
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }))
  }

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
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {links.map((link) => {
                const active = link.href 
                  ? isActivePath(pathname, link.href) 
                  : link.subLinks?.some(sub => isActivePath(pathname, sub.href));
                  
                const isExpanded = expanded[link.label]

                if (link.subLinks) {
                  return (
                    <div key={link.label} className="flex flex-col border-b border-white/12">
                      <button
                        onClick={(e) => toggleExpand(e, link.label)}
                        className={`flex items-center justify-between py-3.5 text-lg font-semibold transition-colors ${
                          active || isExpanded
                            ? 'text-gold'
                            : 'text-white hover:text-gold'
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isExpanded && (
                        <div className="flex flex-col gap-1 pb-3 pl-4 border-l-2 border-gold/30 ml-2">
                          {link.subLinks.map(subLink => {
                            const subActive = isActivePath(pathname, subLink.href);
                            return (
                              <Link
                                key={subLink.href}
                                href={subLink.href}
                                onClick={() => setOpen(false)}
                                className={`py-2 text-base font-medium transition-colors ${
                                  subActive ? 'text-gold' : 'text-white/80 hover:text-gold'
                                }`}
                              >
                                {subLink.label}
                              </Link>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href!}
                    onClick={() => setOpen(false)}
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
              
              <div className="flex flex-col gap-3 mt-6">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center px-6 py-3 text-base font-medium border border-white/20 rounded-sm hover:bg-white/5 transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href="/support"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center px-6 py-3 text-base font-medium rounded-sm bg-gold text-gold-foreground hover:bg-gold/90 transition-colors"
                >
                  Donate
                </Link>
              </div>
            </nav>
          </div>,
          document.body,
        )}
    </div>
  )
}
