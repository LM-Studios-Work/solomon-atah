import type { Metadata } from 'next'
import Image from 'next/image'
import { EventCard } from '@/components/sections/EventCard'
import { UPCOMING_EVENTS } from '@/lib/events'

export const metadata: Metadata = {
  title: 'Events, Solomon Atah Pty Ltd',
  description:
    'Upcoming events from Solomon Atah Pty Ltd, including the Academia in the Public Interest Conference.',
}

export default function EventsPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-[430px] overflow-hidden border-b border-border bg-purple text-white md:min-h-[500px]">
        <Image
          src="/company%20resources/academic%20hero.webp"
          alt="Academic event library"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-purple/72" />
        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 md:min-h-[500px] md:pb-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Public Programmes
            </p>
            <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight text-white md:text-7xl">
              Events
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/84 md:text-lg">
              Conferences, public scholarship gatherings, and institutional events built for
              rigorous conversation and long-horizon intellectual work.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Upcoming Events
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-8">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.title} event={event} showMap />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

