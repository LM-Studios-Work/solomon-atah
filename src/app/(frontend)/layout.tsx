import type { Metadata } from 'next'
import { fraunces, inter } from '@/lib/fonts'
import { Providers } from '@/components/layout/Providers'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'The Solomon Atah Podcast — Know Tomorrow Today',
    template: '%s | Solomon Atah Podcast',
  },
  description:
    'Scholarly conversations with PhD holders and PhD candidates. A public-facing academic media institution elevating African and Africa-focused scholarship.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://solomonatah.com'),
  openGraph: {
    siteName: 'The Solomon Atah Podcast',
    type: 'website',
    locale: 'en_ZA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-ZA"
      className={`${fraunces.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
