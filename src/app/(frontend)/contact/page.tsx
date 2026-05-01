import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with The Solomon Atah Podcast — general enquiries, press, and social links.',
}

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <header className="mb-12">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Reach Us</p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light mb-4">Contact</h1>
      </header>

      <div className="grid sm:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="font-fraunces text-xl mb-4">General Enquiries</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            For general questions about the podcast, the archive, or the institution:
          </p>
          <a href="mailto:hello@solomonatah.com" className="text-purple hover:underline font-medium">
            hello@solomonatah.com
          </a>
        </div>

        <div>
          <h2 className="font-fraunces text-xl mb-4">Press Enquiries</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Interview requests, media coverage, and press kit downloads:
          </p>
          <a href="mailto:press@solomonatah.com" className="text-purple hover:underline font-medium">
            press@solomonatah.com
          </a>
        </div>

        <div>
          <h2 className="font-fraunces text-xl mb-4">Propose a Conversation</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            PhD holders and PhD candidates who want to appear on the podcast:
          </p>
          <a href="/propose" className="text-purple hover:underline font-medium">
            Submit a proposal →
          </a>
        </div>

        <div>
          <h2 className="font-fraunces text-xl mb-4">Partnership Inquiries</h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Institutions, foundations, and sponsors:
          </p>
          <a href="/partner" className="text-purple hover:underline font-medium">
            Partner with us →
          </a>
        </div>
      </div>

      <div className="border-t border-border pt-10">
        <h2 className="font-fraunces text-xl mb-6">Follow the Work</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { label: 'YouTube', href: 'https://youtube.com/@solomonatah' },
            { label: 'Twitter / X', href: 'https://twitter.com/solomonatah' },
            { label: 'Instagram', href: 'https://instagram.com/solomonatah' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/solomonatah' },
            { label: 'RSS Feed', href: '/feed.xml' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-sm font-medium text-muted-foreground hover:text-purple transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
