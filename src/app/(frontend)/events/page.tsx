import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Events, Solomon Atah Pty Ltd',
  description:
    'Upcoming events from Solomon Atah Pty Ltd, including the Academia in the Public Interest Conference.',
}

const EVENTS = [
  {
    title: 'Academia in the Public Interest Conference',
    subtitle: 'Where Scholarship Meets Society',
    presenter: 'The Solomon Atah Podcast Presents',
    date: '5 September 2026',
    location: 'Johannesburg, South Africa',
    type: 'Conference',
    hashtag: '#KnowTomorrowToday',
    image: '/company%20resources/event_sep.jpeg',
  },
]

export default function EventsPage() {
  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            Events
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Conferences, public scholarship gatherings, and institutional events from
            Solomon Atah Pty Ltd.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Upcoming Events
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-12">
            {EVENTS.map((event) => (
              <article key={event.title} className="grid gap-8 md:grid-cols-[minmax(220px,320px)_1fr] md:items-start">
                <div className="relative w-full max-w-xs aspect-[3/4] rounded-sm overflow-hidden shadow-md">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 320px"
                  />
                </div>
                <div className="py-2">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
                    {event.presenter}
                  </p>
                  <span className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full border border-border text-muted-foreground mb-4">
                    {event.type}
                  </span>
                  <h2 className="font-fraunces text-3xl md:text-4xl font-light mb-2">
                    {event.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 italic">{event.subtitle}</p>
                  <div className="space-y-2 mb-7">
                    <p className="text-sm font-semibold text-gold">{event.date}</p>
                    <p className="text-sm text-muted-foreground">{event.location}</p>
                    <p className="text-sm text-purple font-medium">{event.hashtag}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
                  >
                    Register Interest
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
