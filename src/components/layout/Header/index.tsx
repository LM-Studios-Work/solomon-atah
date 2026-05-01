import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { MobileMenu } from './MobileMenu'

const NAV_LINKS = [
  { label: 'Media', href: '/media' },
  { label: 'Research & Publishing', href: '/research' },
  { label: 'Academic Services', href: '/academic-services' },
  { label: 'Film Projects', href: '/film' },
  { label: 'Merchandise & Books', href: '/merchandise' },
  { label: 'Support', href: '/support' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <Link href="/" className="flex flex-col leading-none group shrink-0">
            <span className="font-fraunces text-lg font-semibold text-foreground group-hover:text-purple transition-colors">
              Solomon Atah
            </span>
            <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
              Pty Ltd
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-medium whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <MobileMenu links={NAV_LINKS} />
          </div>
        </div>
      </div>
    </header>
  )
}
