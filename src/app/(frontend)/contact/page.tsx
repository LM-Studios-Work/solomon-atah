import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact, Solomon Atah Pty Ltd',
  description:
    'Get in touch with Solomon Atah Pty Ltd for podcast, research, and general information enquiries.',
}

const CONTACT_CATEGORIES = [
  {
    title: 'Podcast Enquiries',
    description:
      'Podcast appearances, episode enquiries, interview requests, and archive questions.',
    email: 'podcast@solomonatah.com',
    formType: 'podcast',
  },
  {
    title: 'Research Collaborations',
    description:
      'Research partnerships, advisory roles, NinTA Research commissions, and academic consulting enquiries.',
    email: 'research@solomonatah.com',
    formType: 'research',
  },
  {
    title: 'Information Enquiries',
    description:
      'Questions about the podcast, the archive, Ninta Publishing, film projects, or anything else.',
    email: 'info@solomonatah.com',
    formType: 'info',
  },
]

export default function ContactPage() {
  return (
    <div>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            Contact
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Reach the right person directly. Use the form or email address that matches
            your enquiry.
          </p>
        </div>
      </section>

      {/* ── Contact categories ────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-6">
            {CONTACT_CATEGORIES.map((cat) => (
              <div key={cat.title} className="border border-border rounded-sm p-8 hover:border-purple/30 transition-colors">
                <h2 className="font-fraunces text-2xl mb-3">{cat.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {cat.description}
                </p>
                <a
                  href={`mailto:${cat.email}`}
                  className="text-sm text-purple hover:underline font-medium"
                >
                  {cat.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email Form ────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Send a Message
            </p>
            <h2 className="font-fraunces text-3xl font-light mb-3">Get in Touch</h2>
            <p className="text-muted-foreground">
              Not sure which category applies? Use this form and we will route your message.
            </p>
          </div>

          <form action="#" method="post" className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
                />
              </div>
            </div>

            <div>
              <label htmlFor="organisation" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Organisation / Institution <span className="font-normal normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="organisation"
                name="organisation"
                type="text"
                className="w-full px-4 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
              />
            </div>

            <div>
              <label htmlFor="enquiry-type" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Enquiry Type
              </label>
              <select
                id="enquiry-type"
                name="enquiry_type"
                required
                className="w-full px-4 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple"
              >
                <option value="">Select a category</option>
                <option value="podcast">Podcast Enquiry</option>
                <option value="research">Research Collaboration</option>
                <option value="info">Information Enquiry</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full px-4 py-2.5 text-sm border border-border rounded-sm bg-background focus:outline-none focus:ring-2 focus:ring-purple/30 focus:border-purple resize-y"
              />
            </div>

            {/* Honeypot */}
            <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

            <button
              type="submit"
              className="px-8 py-3 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ── Social / Follow ───────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Follow the Work
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
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
      </section>
    </div>
  )
}
