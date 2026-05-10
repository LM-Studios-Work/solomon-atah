import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Academic Services, Solomon Atah Pty Ltd',
  description:
    'Speaking, keynotes, academic consultation access, research advisory, institutional workshops, and website services for academics.',
}

const SERVICES = [
  {
    title: 'Speaking & Keynotes',
    description:
      'Solomon Atah delivers keynote addresses and panel contributions on narrative intelligence, African intellectual production, public scholarship, and the intersection of media and knowledge systems.',
    themes: [
      'Narrative and institutional power',
      'The future of African scholarship',
      'Public intellectual practice',
      'Media, knowledge, and accountability',
      'Storytelling as strategy',
    ],
  },
  {
    title: 'Academic Consulting',
    description:
      'A consultation pathway for students, researchers, professionals, and others who want to speak with academics in our space. We help route serious enquiries to suitable scholars for field-specific guidance, research direction, and intellectual engagement.',
    themes: [],
  },
  {
    title: 'Research Advisory',
    description:
      'Advisory support for research projects, doctoral candidates, and academic programmes, with particular expertise in narrative methodology, qualitative research design, and knowledge dissemination.',
    themes: [],
  },
  {
    title: 'Institutional Workshops',
    description:
      'Structured workshops delivered to academic departments, research institutes, and professional organisations on narrative analysis, public communication of research, and institutional storytelling.',
    themes: [],
  },
  {
    title: 'Website Services for Academics',
    description:
      'Design and development of professional academic websites, helping scholars establish a durable digital presence that reflects the quality of their intellectual work. Includes portfolio sites, research pages, and speaking profiles.',
    themes: [],
  },
]

const UPCOMING_EVENTS = [
  {
    title: 'Academia in the Public Interest Conference',
    subtitle: 'Where Scholarship Meets Society',
    date: '5 September 2026',
    location: 'Johannesburg, South Africa',
    type: 'Conference',
    hashtag: '#KnowTomorrowToday',
    image: '/company%20resources/event_sep.jpeg',
  },
]

export default function AcademicServicesPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[62vh] overflow-hidden border-b border-border flex items-end">
        <Image
          src="/company%20resources/academic%20hero.webp"
          alt="Academic Services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 pt-32 md:pb-18 md:pt-40">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Solomon Atah Pty Ltd
            </p>
            <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6 text-white">
              Academic Services
            </h1>
            <p className="text-xl text-white/82 leading-relaxed max-w-2xl">
              Institutional engagement, academic consultation access, and professional services at
              the intersection of academic rigour and public practice.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              What We Offer
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="border border-border rounded-sm p-8 hover:border-purple/30 transition-colors"
              >
                <h2 className="font-fraunces text-2xl mb-4">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 max-w-3xl">
                  {service.description}
                </p>
                {service.themes.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Keynote Themes
                    </p>
                    <ul className="space-y-1">
                      {service.themes.map((theme) => (
                        <li key={theme} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-gold mt-1">-</span>
                          {theme}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
            >
              Book a Speaking Engagement
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 border border-border text-sm font-medium rounded-sm hover:border-purple/40 hover:bg-muted/40 transition-colors"
            >
              Request Academic Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Awards & Recognitions ─────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Awards &amp; Recognitions
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-sm text-muted-foreground">
            Awards and institutional recognitions will be listed here.
          </p>
        </div>
      </section>

      {/* ── Event Calendar ────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Upcoming Events
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {UPCOMING_EVENTS.length > 0 ? (
            <div className="space-y-10">
              {UPCOMING_EVENTS.map((event) => (
                <div key={event.title} className="grid md:grid-cols-2 gap-8 items-start">
                  <div className="relative w-full max-w-xs aspect-[3/4] rounded-sm overflow-hidden shadow-md">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  </div>
                  <div className="flex flex-col justify-center py-4">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-border text-muted-foreground w-fit mb-4">
                      {event.type}
                    </span>
                    <h3 className="font-fraunces text-3xl font-light mb-2">{event.title}</h3>
                    {event.subtitle && (
                      <p className="text-muted-foreground italic mb-5">{event.subtitle}</p>
                    )}
                    <div className="space-y-2 mb-6">
                      <p className="text-sm font-semibold text-gold">{event.date}</p>
                      <p className="text-sm text-muted-foreground">{event.location}</p>
                      {event.hashtag && (
                        <p className="text-sm text-purple font-medium">{event.hashtag}</p>
                      )}
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors w-fit"
                    >
                      Register Interest
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No events currently scheduled. Check back soon or{' '}
              <Link href="/contact" className="text-purple hover:underline">
                get in touch
              </Link>{' '}
              to arrange a speaking engagement.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
