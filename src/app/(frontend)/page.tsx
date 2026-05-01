import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload/getPayload'
import { ConversationCard } from '@/components/sections/ConversationCard'

export const dynamic = 'force-dynamic'

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
            {/* Company logo */}
            <div className="relative w-48 h-28 mb-8 rounded-sm overflow-hidden bg-black">
              <Image
                src="/company%20resources/logo.jpeg"
                alt="Solomon Atah Pty Ltd"
                fill
                className="object-contain"
                sizes="192px"
                priority
              />
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
            <ConversationCard
              conversation={{
                id: String(latestConversation.id),
                title: latestConversation.title,
                slug: latestConversation.slug,
                excerpt: latestConversation.excerpt,
                youtubeId: latestConversation.youtubeId,
                youtubeThumbnailUrl: latestConversation.youtubeThumbnailUrl,
                duration: latestConversation.duration,
                publishedAt: latestConversation.publishedAt,
                scholars: Array.isArray(latestConversation.scholars)
                  ? latestConversation.scholars
                      .filter((s): s is NonNullable<typeof s> => typeof s === 'object' && s !== null)
                      .map((s) => ({
                        id: String(s.id),
                        name: s.name,
                        title: s.title,
                        institution:
                          typeof s.institution === 'object' && s.institution !== null
                            ? { name: s.institution.name, shortName: s.institution.shortName }
                            : null,
                      }))
                  : [],
                disciplines: Array.isArray(latestConversation.disciplines)
                  ? latestConversation.disciplines
                      .filter((d): d is NonNullable<typeof d> => typeof d === 'object' && d !== null)
                      .map((d) => ({ id: String(d.id), name: d.name, slug: d.slug }))
                  : [],
              }}
              variant="featured"
            />
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
              href="/academic-services"
              className="text-sm text-purple hover:underline font-medium hidden sm:block"
            >
              Full calendar →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Link href="/academic-services" className="group block">
              <div className="relative w-full aspect-[3/4] max-w-xs rounded-sm overflow-hidden">
                <Image
                  src="/company%20resources/event_sep.jpeg"
                  alt="Academia in the Public Interest Conference"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
            </Link>
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
                The Solomon Atah Podcast Presents
              </p>
              <h3 className="font-fraunces text-3xl md:text-4xl font-light mb-2">
                Academia in the Public Interest Conference
              </h3>
              <p className="text-muted-foreground mb-5 italic">Where Scholarship Meets Society</p>
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium">5 September 2026</p>
                <p className="text-sm text-muted-foreground">Johannesburg, South Africa</p>
              </div>
              <Link
                href="/academic-services"
                className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors w-fit"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
