import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Academic Services — Solomon Atah Pty Ltd',
  description:
    'Speaking, keynotes, academic consultation access, research advisory, and institutional workshops at the intersection of academic rigour and public practice.',
}

// ── Icon components (inline SVG, gold stroke) ──────────────────────────────

function MicIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="14" y="4" width="12" height="20" rx="6" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 20c0 6.627 5.373 12 12 12s12-5.373 12-12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line x1="20" y1="32" x2="20" y2="38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="14" y1="38" x2="26" y2="38" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* quill */}
      <path
        d="M26 10 C32 4 36 12 28 18 C30 12 28 10 26 10Z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="15" stroke="currentColor" strokeWidth="1.8" />
      <polygon
        points="20,8 23,20 20,26 17,20"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <circle cx="20" cy="20" r="2" stroke="currentColor" strokeWidth="1.4" />
      <line x1="20" y1="5" x2="20" y2="8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="20" y1="32" x2="20" y2="35" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="5" y1="20" x2="8" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="32" y1="20" x2="35" y2="20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function MicroscopeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="16" y="4" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="12" height="4" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 18 C8 22 8 28 10 30"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line x1="8" y1="34" x2="32" y2="34" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M20 30 L20 34"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="28" cy="22" r="4" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="28" cy="22" r="1.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}

function WorkshopIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <line x1="20" y1="24" x2="20" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="30" x2="28" y2="30" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      {/* people */}
      <circle cx="13" cy="35" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="20" cy="35" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="27" cy="35" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: 'speaking',
    icon: <MicIcon />,
    title: 'Speaking & Keynotes',
    description:
      'Solomon Atah delivers keynotes addresses and panel appearances on narrative intelligence, African intellectual production, public scholarship, and the intersection of media and knowledge systems.',
    themes: [
      'Narrative and institutional power',
      'The future of African scholarship',
      'Public intellectual practice',
      'Media, knowledge, and accountability',
      'Storytelling as strategy',
    ],
  },
  {
    id: 'consulting',
    icon: <CompassIcon />,
    title: 'Academic Consulting',
    description:
      'A consultation pathway for students, researchers, professionals, and others who want to speak with academics in our space. We help route serious enquiries to suitable scholars for field-specific guidance, research direction, and intellectual engagement.',
    themes: [],
  },
  {
    id: 'research',
    icon: <MicroscopeIcon />,
    title: 'Research Advisory',
    description:
      'Advisory support for research projects, doctoral candidates, and academic programmes, with particular expertise in narrative methodology, qualitative research design, and knowledge dissemination.',
    themes: [],
  },
  {
    id: 'workshops',
    icon: <WorkshopIcon />,
    title: 'Institutional Workshops',
    description:
      'Structured workshops delivered to academic departments, research institutes, and professional organisations on narrative analysis, public communication of research, and institutional storytelling profiles.',
    themes: [],
  },
]

const UPCOMING_EVENTS = [
  {
    title: 'Academia in the Public Interest Conference',
    subtitle: 'Where Scholarship Meets Society',
    date: '8 September 2026',
    location: 'Johannesburg, South Africa',
    hashtag: '#KnowTomorrowToday',
    image: '/company%20resources/event_sep.jpeg',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228871.4!2d28.04!3d-26.20!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c68f0406a51%3A0x238ac9d9b1d34041!2sJohannesburg%2C%20South%20Africa!5e0!3m2!1sen!2sus!4v1699000000000',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────

export default function AcademicServicesPage() {
  return (
    <div className="bg-background">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[62vh] overflow-hidden flex items-end">
        <Image
          src="/company%20resources/academic%20hero.webp"
          alt="Academic library with globe and bookshelves"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* layered overlays: darkening + warm tint toward bottom */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 via-transparent to-transparent" />

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-36 md:pb-20">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold mb-5">
              Solomon Atah Pty Ltd
            </p>
            <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-6 text-white text-balance">
              Academic Services
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
              Institutional engagement, academic consultation access, and professional services at
              the intersection of academic rigour and public practice.
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Offer ────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
              What We Offer
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* 2×2 card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
            >
              Book a Speaking Engagement
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-border text-sm font-medium rounded-sm hover:border-purple/40 hover:bg-muted/30 transition-colors"
            >
              Request Academic Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Awards & Recognitions ────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
              Awards &amp; Recognitions
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-sm text-muted-foreground">
            Awards and institutional recognitions will be listed here.
          </p>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap">
              Upcoming Events
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-10">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/events"
              className="inline-flex items-center px-8 py-3 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────

type ServiceData = (typeof SERVICES)[number]

function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <article className="flex flex-col rounded-sm border border-border overflow-hidden">
      {/* card header strip — dark olive/charcoal background */}
      <div
        className="flex items-start gap-5 px-7 py-7"
        style={{ backgroundColor: '#2e3028' }}
      >
        <span className="text-gold mt-0.5 shrink-0">{service.icon}</span>
        <div>
          <h2
            className="font-fraunces text-xl font-light leading-snug text-white"
          >
            {service.title}
          </h2>
        </div>
      </div>

      {/* card body — light */}
      <div className="flex flex-col flex-1 px-7 py-7 gap-5 bg-card">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {service.themes.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Keynote Themes
            </p>
            <ul className="space-y-1.5">
              {service.themes.map((theme) => (
                <li key={theme} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-gold mt-0.5 leading-none">–</span>
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link
            href="/contact"
            className="text-sm font-medium text-gold hover:text-gold/80 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  )
}

type EventData = (typeof UPCOMING_EVENTS)[number]

function EventCard({ event }: { event: EventData }) {
  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-8 items-start bg-card border border-border rounded-sm overflow-hidden">
      {/* Event poster */}
      <div className="relative w-full h-64 md:h-full min-h-64">
        <Image
          src={event.image}
          alt={`Event poster for ${event.title}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>

      {/* Event details */}
      <div className="flex flex-col justify-center px-6 py-8 md:px-8 gap-4">
        <div>
          <h3 className="font-fraunces text-3xl font-light leading-snug mb-1 text-balance">
            {event.title}
          </h3>
          <p className="text-muted-foreground italic text-base">{event.subtitle}</p>
        </div>

        {/* Embedded mini-map */}
        <div className="rounded-sm overflow-hidden border border-border w-full max-w-sm h-36">
          <iframe
            src={event.mapEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Map showing location of ${event.title}`}
          />
        </div>

        {/* Date / location / hashtag */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">{event.date}</p>
          <p className="text-sm text-muted-foreground">{event.location}</p>
          <p className="text-sm font-medium text-gold">{event.hashtag}</p>
        </div>

        <div>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
          >
            Register Interest
          </Link>
        </div>
      </div>
    </div>
  )
}
