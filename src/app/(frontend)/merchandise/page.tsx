import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Merchandise & Books — Solomon Atah Pty Ltd',
  description:
    'Podcast merchandise, branded apparel, and books from Solomon Atah Pty Ltd.',
}

const HOODIES = [
  {
    name: 'Epistemic Humility Hoodie',
    tagline: 'Epistemic Humility',
    description:
      'Premium pullover hoodie with purple lining. "Epistemic Humility — The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_1.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'Academic Valour Hoodie',
    tagline: 'Academic Valour',
    description:
      'Premium pullover hoodie with purple lining. "Academic Valour — The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_2.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'Academic Researcher Hoodie',
    tagline: 'Academic Researcher',
    description:
      'Premium pullover hoodie with purple lining. "Academic Researcher — The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_3.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'Academic Personality Hoodie',
    tagline: 'Academic Personality',
    description:
      'Premium pullover hoodie with purple lining. "Academic Personality — The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_4.jpeg',
    status: 'Available' as const,
  },
]

const BOOKS = [
  {
    name: 'The Narrative Manifesto',
    description: 'How Stories Harm, And What You Can Do About It — by Solomon Atah.',
    image: '/company%20resources/book.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'The Marriage Stock Exchange',
    description: 'Why Marriage Was Never About Love — by Solomon Atah.',
    image: '/company%20resources/book_2_cover.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'The 48 Laws of Personal Sovereignty',
    description: 'Self Preservation Intelligence — by Solomon Atah.',
    image: '/company%20resources/book_3.jpeg',
    status: 'Available' as const,
  },
]

const STATUS_STYLES: Record<string, string> = {
  'Coming Soon': 'text-muted-foreground border-border',
  'Pre-Order': 'text-gold border-gold/30',
  Available: 'text-purple border-purple/30',
}

export default function MerchandisePage() {
  return (
    <div>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            Merchandise &amp; Books
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Branded apparel and books from The Solomon Atah Podcast and Solomon Atah Pty Ltd.
            Every item is an extension of the intellectual identity of the brand.
          </p>
        </div>
      </section>

      {/* ── Hoodies ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Branded Apparel
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOODIES.map((item) => (
              <div
                key={item.name}
                className="border border-border rounded-sm overflow-hidden hover:border-purple/30 transition-colors group"
              >
                <div className="relative aspect-[3/4] bg-muted/10">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-fraunces text-base leading-snug">{item.tagline}</p>
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
                        STATUS_STYLES[item.status]
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <a href="#" className="text-sm text-purple hover:underline font-medium">
                    Order →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Books ─────────────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Books
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {BOOKS.map((book) => (
              <div key={book.name} className="group">
                <div className="relative w-full aspect-[2/3] rounded-sm overflow-hidden mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                  <Image
                    src={book.image}
                    alt={book.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 280px"
                  />
                </div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-fraunces text-lg leading-snug">{book.name}</h3>
                  <span
                    className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
                      STATUS_STYLES[book.status]
                    }`}
                  >
                    {book.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {book.description}
                </p>
                <a href="#" className="text-sm text-purple hover:underline font-medium">
                  Order →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notify Banner ─────────────────────────────────────────────────────── */}
      <section className="bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Stay Updated
            </p>
            <h2 className="font-fraunces text-3xl font-light mb-4">
              New titles and drops incoming
            </h2>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              Leave your email to be notified when new merchandise and book editions launch.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" action="#" method="post">
              <input
                type="email"
                name="email"
                required
                placeholder="your@email.com"
                className="flex-1 px-4 py-2.5 text-sm border border-white/20 rounded-sm bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-white text-purple text-sm font-medium rounded-sm hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
