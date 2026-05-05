import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPublishedConversations } from '@/lib/data'
import { ConversationCard } from '@/components/sections/ConversationCard'

export const metadata: Metadata = {
  title: 'Solomon Atah Pty Ltd, Know Tomorrow Today',
  description:
    'A sovereign intellectual holding company committed to building durable knowledge infrastructures across media, research, publishing, and cultural production.',
}

const PRIMARY_GATEWAYS = [
  {
    label: 'The Solomon Atah Podcast',
    href: '/solomon-atah-podcast',
    description:
      'The Solomon Atah Podcast, scholarly conversations, video archive, and featured episodes.',
  },
  {
    label: 'Research & Publishing',
    href: '/research',
    description:
      'Ninta Research and Ninta Publishing, narrative intelligence, institutional critique, and books built to last.',
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
    category: 'Audio & Video',
    href: '/solomon-atah-podcast',
    description:
      'A public-facing academic media institution commissioning scholarly conversations with PhD holders and PhD candidates. Archiving African and Africa-focused scholarship for the public record.',
    cta: '',
    ctaHref: '/solomon-atah-podcast',
  },
  {
    name: 'Ninta Research',
    division: 'Research & Publishing',
    category: 'Scholarship',
    href: '/research#ninta-research',
    description:
      'Narrative analysis, institutional critique, cultural diagnostics, and narrative intelligence. Research anchored in how stories construct knowledge, identity, and social reality.',
    cta: '',
    ctaHref: '/research',
  },
  {
    name: 'Film Projects',
    division: 'Film Division',
    category: 'Cultural Production',
    href: '/film',
    description:
      'Documentary and narrative film projects translating intellectual inquiry into cinematic form. Building cultural infrastructure across African and global contexts.',
    cta: '',
    ctaHref: '/film',
  },
]

const HERO_LINKS = [
  { label: 'Our Divisions', href: '#featured-properties' },
  { label: 'Who We Are', href: '/about' },
]

const DIVISION_PROPERTIES = [
  {
    name: 'The Solomon Atah Podcast',
    category: 'Audio & Video',
    description:
      'Long-form intellectual conversations at the frontier of ideas. Exploring scholarship, culture, and public intelligence through one rigorous dialogue at a time.',
    cta: '',
    ctaHref: '/solomon-atah-podcast',
  },
  {
    name: 'Ninta Research and Publishing',
    category: 'Scholarship',
    description:
      'Original scholarship, policy analysis, and knowledge production. Translating complex academic work into accessible, actionable public intelligence.',
    cta: '',
    ctaHref: '/research',
  },
  {
    name: 'Academic Services',
    category: 'Consultancy',
    description:
      'Structured support for researchers, institutions, and scholars. We provide the infrastructure for serious intellectual work to find its fullest expression.',
    cta: '',
    ctaHref: '/academic-services',
  },
  {
    name: 'Film Development',
    category: 'Narrative & Screen',
    description:
      'Narrative systems for the screen. Story projects grounded in historical depth, cultural specificity, and intentionality that builds lasting resonance.',
    cta: '',
    ctaHref: '/film',
  },
]

export default function HomePage() {
  const conversations = getPublishedConversations()
  const latestConversation = conversations.find((c) => c.featured) ?? conversations[0] ?? null

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative border-b border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-36">
          <div className="max-w-3xl">
            {/* Hero video, replace src when video asset is available */}
            <div className="relative w-full max-w-2xl aspect-video rounded-sm overflow-hidden bg-black mb-10 hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                aria-label="Solomon Atah Pty Ltd, brand video"
              >
                {/* <source src="/company%20resources/hero.mp4" type="video/mp4" /> */}
              </video>
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
              and execution, across media, research, publishing, and cultural production.
            </p>

            {/* Primary Gateways */}
            <div className="flex flex-col sm:flex-row gap-4">
              {HERO_LINKS.map((gw) => (
                <Link
                  key={gw.label}
                  href={gw.href}
                  className={
                    gw.label === 'Our Divisions'
                      ? 'inline-flex items-center justify-center px-6 py-3 bg-purple text-white font-medium rounded-sm hover:bg-purple/90 transition-colors'
                      : 'inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-sm hover:border-purple/40 hover:bg-muted/50 transition-colors'
                  }
                >
                  {gw.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative accent */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-gold to-transparent opacity-60" />
      </section>

      {/* ── Featured Properties ───────────────────────────────────────────────── */}
      <section id="featured-properties" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Featured Properties
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="border-t border-border">
            {DIVISION_PROPERTIES.map((property, index) => (
              <div
                key={property.name}
                className="grid gap-5 border-b border-border py-8 transition-colors hover:bg-muted/25 sm:grid-cols-[4rem_13rem_1fr] lg:grid-cols-[5rem_15rem_minmax(18rem,1fr)_minmax(22rem,0.9fr)_4rem] lg:items-center"
              >
                <span className="font-mono text-sm tracking-[0.18em] text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="w-fit border border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {property.category}
                </span>
                <h2 className="font-fraunces text-2xl font-light leading-tight md:text-3xl">{property.name}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground lg:max-w-xl">
                  {property.description}
                </p>
                <Link
                  href={property.ctaHref}
                  aria-label={`View ${property.name}`}
                  className="text-2xl leading-none text-gold transition-transform hover:translate-x-1 lg:justify-self-end"
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
                href="/solomon-atah-podcast"
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
              Through The Solomon Atah Podcast, Ninta Research and Publishing, academic services,
              and film development, we operate at the intersection of thought and execution.
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
              href="/events"
              className="text-sm text-purple hover:underline font-medium hidden sm:block"
            >
              Full calendar →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            <Link href="/events" className="group block">
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
                href="/events"
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
