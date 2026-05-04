import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedConversations } from '@/lib/data'
import { ConversationCard } from '@/components/sections/ConversationCard'

export const metadata: Metadata = {
  title: 'Solomon Atah Pty Ltd — Know Tomorrow Today',
  description:
    'A sovereign intellectual holding company committed to building durable knowledge infrastructures across media, research, publishing, and cultural production.',
}

const PRIMARY_GATEWAYS = [
  {
    label: 'Media',
    href: '/media',
    description:
      'The Solomon Atah Podcast — scholarly conversations, video archive, and featured episodes.',
  },
  {
    label: 'Research & Publishing',
    href: '/research',
    description:
      'Ninta Research and Ninta Publishing — narrative intelligence, institutional critique, and books built to last.',
  },
  {
    label: 'Academic Services',
    href: '/academic-services',
    description:
      'Speaking, consulting, research advisory, institutional workshops, and website services for academics.',
  },
]

const FEATURED_PROPERTIES = [
  {
    name: 'The Solomon Atah Podcast',
    division: 'Media',
    href: '/media',
    description:
      'A public-facing academic media institution commissioning scholarly conversations with PhD holders and PhD candidates. Archiving African and Africa-focused scholarship for the public record.',
    cta: 'Browse Archive',
    ctaHref: '/conversations',
  },
  {
    name: 'Ninta Research',
    division: 'Research & Publishing',
    href: '/research#ninta-research',
    description:
      'Narrative analysis, institutional critique, cultural diagnostics, and narrative intelligence. Research anchored in how stories construct knowledge, identity, and social reality.',
    cta: 'Learn More',
    ctaHref: '/research',
  },
  {
    name: 'Film Projects',
    division: 'Film Division',
    href: '/film',
    description:
      'Documentary and narrative film projects translating intellectual inquiry into cinematic form. Building cultural infrastructure across African and global contexts.',
    cta: 'Film Division',
    ctaHref: '/film',
  },
]

export default async function HomePage() {
  const payload = await getPayload()

  const featuredResult = await payload.find({
    collection: 'conversations',
    where: { and: [{ status: { equals: 'published' } }, { featured: { equals: true } }] },
    limit: 1,
    depth: 2,
  })

  const latestResult = await payload.find({
    collection: 'conversations',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 1,
    depth: 2,
  })

  const latestConversation = featuredResult.docs[0] || latestResult.docs[0] || null

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Elephant emblem placeholder */}
            <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-gold/40 rounded-sm mb-8 bg-gold/5">
              <span className="text-2xl" role="img" aria-label="Elephant emblem">
                🐘
              </span>
            </div>

            {/* Eyebrow */}
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">
              Solomon Atah Pty Ltd
            </p>

            {/* Headline */}
            <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-balance mb-6">
              Building Durable
              <br />
              <em className="text-purple not-italic">Knowledge Infrastructures.</em>
            </h1>

            {/* Positioning statement */}
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl font-light text-pretty">
              A sovereign intellectual holding company operating at the intersection of thought
              and execution — across media, research, publishing, and cultural production.
            </p>

            {/* Primary Gateways */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/media"
                className="inline-flex items-center justify-center px-6 py-3 bg-purple text-white font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Media
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-sm hover:border-purple/40 hover:bg-muted/50 transition-colors"
              >
                Research &amp; Publishing
              </Link>
              <Link
                href="/academic-services"
                className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-sm hover:border-purple/40 hover:bg-muted/50 transition-colors"
              >
                Academic Services
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-gold to-transparent opacity-60" />
      </section>

      {/* ── Featured Properties ───────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Featured Properties
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_PROPERTIES.map((property) => (
              <div
                key={property.name}
                className="border border-border rounded-sm p-7 hover:border-purple/30 transition-colors flex flex-col"
              >
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">
                  {property.division}
                </p>
                <h2 className="font-fraunces text-xl mb-4">{property.name}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                  {property.description}
                </p>
                <Link
                  href={property.ctaHref}
                  className="text-sm text-purple hover:underline font-medium"
                >
                  {property.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── From the Podcast ──────────────────────────────────────────────────── */}
      {latestConversation && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                  From the Podcast
                </span>
                <div className="h-px bg-border w-16" />
              </div>
              <Link
                href="/media"
                className="text-sm text-purple hover:underline font-medium hidden sm:block"
              >
                All episodes →
              </Link>
            </div>
            <ConversationCard conversation={latestConversation} variant="featured" />
          </div>
        </section>
      )}

      {/* ── Mission Strip ─────────────────────────────────────────────────────── */}
      <section className="bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6">
              Our Mandate
            </p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-light leading-relaxed mb-6 text-balance">
              We develop ideas that endure, translate complex scholarship into public
              intelligence, and construct narrative systems that shape institutions rather
              than merely respond to them.
            </h2>
            <p className="text-white/70 leading-relaxed mb-8">
              Through The Solomon Atah Podcast, Atah Global Media, Ninta Research and Publishing,
              academic services, and film development, we operate at the intersection of thought
              and execution.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-sm border border-white/20 transition-colors"
            >
              About Solomon Atah Pty Ltd
            </Link>
          </div>
        </div>
      </section>

      {/* ── Institutional Logos ───────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Partners &amp; Institutions
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex items-center justify-center py-8 text-sm text-muted-foreground">
            Institutional partners will be listed here.
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ───────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Upcoming Events
              </span>
              <div className="h-px bg-border w-16" />
            </div>
            <Link
              href="/academic-services#events"
              className="text-sm text-purple hover:underline font-medium hidden sm:block"
            >
              Full calendar →
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            No events currently scheduled.{' '}
            <Link href="/contact" className="text-purple hover:underline">
              Get in touch
            </Link>{' '}
            to book Solomon Atah for a speaking engagement or institutional event.
          </p>
        </div>
      </section>
    </div>
  )
}
