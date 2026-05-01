import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merchandise & Books — Solomon Atah Pty Ltd',
  description:
    'Podcast merchandise, branded apparel, special edition books, and pre-orders from Solomon Atah Pty Ltd.',
}

const MERCHANDISE_CATEGORIES = [
  {
    category: 'Podcast Merchandise',
    items: [
      {
        name: 'Know Tomorrow Today — Tote Bag',
        description: 'Heavy canvas tote bag with the Solomon Atah Podcast wordmark and slogan.',
        status: 'Coming Soon' as const,
        price: null,
      },
      {
        name: 'Know Tomorrow Today — Mug',
        description: 'Ceramic mug for the scholar who needs something to hold while thinking.',
        status: 'Coming Soon' as const,
        price: null,
      },
    ],
  },
  {
    category: 'Branded Apparel',
    items: [
      {
        name: 'Solomon Atah Podcast — T-Shirt',
        description: 'Premium cotton t-shirt with the elephant emblem.',
        status: 'Coming Soon' as const,
        price: null,
      },
    ],
  },
  {
    category: 'Special Edition Books',
    items: [
      {
        name: 'The Narrative Manifesto — Special Edition',
        description:
          'Signed hardcover edition of The Narrative Manifesto: How Stories Harm And What You Can Do About It.',
        status: 'Pre-Order' as const,
        price: null,
      },
    ],
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
            Podcast merchandise, branded apparel, special edition books, and pre-orders.
            Every item is an extension of the intellectual identity of Solomon Atah Pty Ltd.
          </p>
        </div>
      </section>

      {/* ── Product Categories ────────────────────────────────────────────────── */}
      {MERCHANDISE_CATEGORIES.map((category) => (
        <section key={category.category} className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                {category.category}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="border border-border rounded-sm p-6 hover:border-purple/30 transition-colors"
                >
                  {/* Placeholder image area */}
                  <div className="aspect-square bg-muted/30 rounded-sm mb-5 flex items-center justify-center border border-border">
                    <span className="text-xs text-muted-foreground">Image coming soon</span>
                  </div>

                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-medium text-sm leading-snug">{item.name}</h3>
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
                        STATUS_STYLES[item.status] || 'text-muted-foreground border-border'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {item.price ? (
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.price}</span>
                      <button className="text-sm text-purple hover:underline font-medium">
                        Add to cart
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Price TBC</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── Notify Banner ─────────────────────────────────────────────────────── */}
      <section className="bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Stay Updated
            </p>
            <h2 className="font-fraunces text-3xl font-light mb-4">
              Be first to know when items launch
            </h2>
            <p className="text-white/70 mb-6 text-sm leading-relaxed">
              The store is launching soon. Leave your email and we will notify you when
              merchandise and books become available.
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
