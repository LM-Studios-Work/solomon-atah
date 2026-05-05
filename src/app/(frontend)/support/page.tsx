import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Support, Solomon Atah Pty Ltd',
  description:
    'Support the work of Solomon Atah Pty Ltd, donate, become a patron, or partner with us.',
}

const PATRON_TIERS = [
  {
    name: 'Reader',
    amount: 'R50 / month',
    description:
      'Support the archive and keep conversations freely accessible to everyone. Named acknowledgement in our annual report.',
    perks: [
      'Named patron acknowledgement',
      'Access to Dispatches newsletter',
    ],
  },
  {
    name: 'Scholar',
    amount: 'R200 / month',
    description:
      'Support the academic translation work, the research, editorial summaries, further reading lists, and citation infrastructure.',
    perks: [
      'Everything in Reader',
      'Early access to new conversations',
      'Quarterly supporter update',
    ],
    featured: true,
  },
  {
    name: 'Institutional',
    amount: 'R1 000 / month',
    description:
      'Institutional-level support for universities, foundations, and organisations that value the existence of rigorous public scholarship.',
    perks: [
      'Everything in Scholar',
      'Institutional acknowledgement on website',
      'Direct line to research and partnership discussions',
    ],
  },
]

export default function SupportPage() {
  return (
    <div>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            Support Our Work
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            The archive is free. The scholarship is rigorous. The work is ongoing. Your support
            makes it possible to sustain and expand the intellectual infrastructure we are
            building.
          </p>
        </div>
      </section>

      {/* ── Patron Tiers ──────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Patron Programme
            </p>
            <h2 className="font-fraunces text-4xl font-light mb-4">Become a Patron</h2>
            <p className="text-muted-foreground leading-relaxed">
              Patrons sustain the archive, the research, and the editorial work that makes
              scholarly conversations accessible to everyone. Choose the level of support
              that suits you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PATRON_TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`border rounded-sm p-8 relative flex h-full flex-col ${
                  tier.featured
                    ? 'border-purple bg-purple/5'
                    : 'border-border hover:border-purple/30'
                } transition-colors`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-6">
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 bg-purple text-white rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-fraunces text-2xl mb-1">{tier.name}</h3>
                  <p className="text-gold font-semibold">{tier.amount}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {tier.description}
                </p>
                <ul className="space-y-2 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-gold mt-0.5">✓</span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-auto inline-flex w-full items-center justify-center px-4 py-2.5 text-sm font-medium rounded-sm transition-colors ${
                    tier.featured
                      ? 'bg-purple text-white hover:bg-purple/90'
                      : 'border border-border hover:border-purple/40 hover:bg-muted/40'
                  }`}
                >
                  Become a {tier.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── One-time Donation ─────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                One-Time Support
              </p>
              <h2 className="font-fraunces text-3xl font-light mb-4">Make a Donation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Prefer to give once? One-time donations directly support the production of new
                conversations, the maintenance of the archive, and the ongoing academic
                translation work.
              </p>
            </div>
            <div className="border border-border rounded-sm p-8 h-full">
              <p className="text-sm text-muted-foreground mb-6">
                One-time donation processing is being set up. In the meantime, contact us
                directly to arrange a contribution.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Contact us to donate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Support Academic Translation ──────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Targeted Giving
            </p>
            <h2 className="font-fraunces text-3xl font-light mb-6">
              Support Academic Translation Work
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The editorial work, transcripts, summaries, citation infrastructure, further
              reading lists, scholar profiles, is expensive and time-consuming. Targeted
              contributions to this work ensure that the archive remains a serious intellectual
              resource, not just a content library.
            </p>
            <Link
              href="/partner"
              className="inline-flex items-center px-5 py-2.5 border border-border text-sm font-medium rounded-sm hover:border-purple/40 hover:bg-muted/40 transition-colors"
            >
              Partner with us →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Partnership Enquiries ─────────────────────────────────────────────── */}
      <section className="bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Institutional Partnerships
            </p>
            <h2 className="font-fraunces text-3xl font-light mb-4">
              Partner With Solomon Atah Pty Ltd
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              Universities, foundations, cultural organisations, and mission-aligned institutions
              are invited to explore formal partnership, co-production, research collaboration,
              media sponsorship, and strategic alliances.
            </p>
            <Link
              href="/partner"
              className="inline-flex items-center px-5 py-2.5 bg-white text-purple text-sm font-medium rounded-sm hover:bg-white/90 transition-colors"
            >
              Partnership enquiries
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
