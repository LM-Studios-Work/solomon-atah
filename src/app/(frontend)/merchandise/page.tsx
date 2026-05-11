import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Merchandise & Books, Solomon Atah Pty Ltd',
  description:
    'Podcast merchandise, branded apparel, and books from Solomon Atah Pty Ltd.',
}

const PODCAST_MERCH = [
  {
    name: 'Know Tomorrow Today, Tote Bag',
    tagline: 'Know Tomorrow Today',
    description: 'Heavy canvas tote bag with the Solomon Atah Podcast wordmark and slogan.',
    image: null as string | null,
    status: 'Pre-Order' as const,
  },
  {
    name: 'Know Tomorrow Today, Mug',
    tagline: 'Know Tomorrow Today',
    description: 'Ceramic mug. For the scholar who needs something to hold while thinking.',
    image: null as string | null,
    status: 'Pre-Order' as const,
  },
]

const HOODIES = [
  {
    name: 'Epistemic Humility Hoodie',
    tagline: 'Epistemic Humility',
    description:
      'Premium pullover hoodie with purple lining. "Epistemic Humility, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_1.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'Academic Valour Hoodie',
    tagline: 'Academic Valour',
    description:
      'Premium pullover hoodie with purple lining. "Academic Valour, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_2.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'Academic Researcher Hoodie',
    tagline: 'Academic Researcher',
    description:
      'Premium pullover hoodie with purple lining. "Academic Researcher, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_3.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'Academic Personality Hoodie',
    tagline: 'Academic Personality',
    description:
      'Premium pullover hoodie with purple lining. "Academic Personality, The Solomon Atah Podcast."',
    image: '/company%20resources/hoodie_4.jpeg',
    status: 'Available' as const,
  },
]

const BOOKS = [
  {
    name: 'The Narrative Manifesto',
    subtitle: 'How Stories Harm, And What You Can Do About It',
    description: 'How Stories Harm, And What You Can Do About It, by Solomon Atah.',
    image: '/company%20resources/book.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'The Marriage Stock Exchange',
    subtitle: 'Why Marriage Was Never About Love',
    description: 'Why Marriage Was Never About Love, by Solomon Atah.',
    image: '/company%20resources/book_2_cover.jpeg',
    status: 'Available' as const,
  },
  {
    name: 'The 48 Laws of Personal Sovereignty',
    subtitle: 'Self Preservation Intelligence',
    description: 'Self Preservation Intelligence, by Solomon Atah.',
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
    <div className="bg-background text-foreground">
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-7xl font-light leading-tight mb-6">
            Merchandise &amp; Books
          </h1>
          <p className="text-base md:text-lg text-white/78 leading-relaxed max-w-2xl">
            Branded apparel and books from The Solomon Atah Podcast and Solomon Atah Pty Ltd.
            Every item is an extension of the intellectual identity of the brand.
          </p>
        </div>
      </section>

      {/* ── Podcast Merchandise ───────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Podcast Merchandise
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {PODCAST_MERCH.map((item) => (
              <div key={item.name} className="border border-border bg-card rounded-sm overflow-hidden hover:border-purple/30 transition-colors shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
                <div className="relative aspect-square bg-muted/30 flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">Image coming soon</p>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-sm leading-snug">{item.name}</p>
                    <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Branded Apparel
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOODIES.map((item) => (
              <div
                key={item.name}
                className="border border-border bg-card rounded-sm overflow-hidden hover:border-purple/30 transition-colors group shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
              >
                <div className="relative aspect-[3/4] bg-muted/30">
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

      {/* ── Special Edition Books ─────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-10 max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                Special Edition Books
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <h2 className="font-fraunces text-4xl font-light mb-4">Books from Solomon Atah</h2>
            <p className="text-sm md:text-base text-muted-foreground leading-7">
              Published works presented as durable intellectual objects: books, arguments, and
              frameworks connected to the wider research and publishing house.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {BOOKS.map((book) => (
              <article key={book.name} className="group">
                <div className="relative mb-5 aspect-[2/3] overflow-hidden rounded-sm bg-muted/30 shadow-[0_18px_32px_rgba(0,0,0,0.12)]">
                  <div className="absolute inset-0 bg-muted/30" />
                  <Image
                    src={book.image}
                    alt={book.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-fraunces text-xl font-light leading-snug">{book.name}</h3>
                  <span
                    className={`shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-full border ${
                      STATUS_STYLES[book.status]
                    }`}
                  >
                    {book.status}
                  </span>
                </div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-gold">
                  {book.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-6 mb-4">
                  {book.description}
                </p>
                <a href="#" className="text-sm text-purple hover:underline font-medium">
                  Order title →
                </a>
              </article>
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
