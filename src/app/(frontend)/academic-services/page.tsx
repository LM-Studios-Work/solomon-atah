import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BriefcaseBusiness,
  GraduationCap,
  Mic2,
  Monitor,
  UsersRound,
} from 'lucide-react'
import { EventCard } from '@/components/sections/EventCard'
import { UPCOMING_EVENTS } from '@/lib/events'

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
    icon: Mic2,
  },
  {
    title: 'Academic Consulting',
    description:
      'A consultation pathway for students, researchers, professionals, and others who want to speak with academics in our space. We help route serious enquiries to suitable scholars for field-specific guidance, research direction, and intellectual engagement.',
    themes: [],
    icon: UsersRound,
  },
  {
    title: 'Research Advisory',
    description:
      'Advisory support for research projects, doctoral candidates, and academic programmes, with particular expertise in narrative methodology, qualitative research design, and knowledge dissemination.',
    themes: [],
    icon: GraduationCap,
  },
  {
    title: 'Institutional Workshops',
    description:
      'Structured workshops delivered to academic departments, research institutes, and professional organisations on narrative analysis, public communication of research, and institutional storytelling.',
    themes: [],
    icon: Monitor,
  },
  {
    title: 'Website Services for Academics',
    description:
      'Design and development of professional academic websites, helping scholars establish a durable digital presence that reflects the quality of their intellectual work. Includes portfolio sites, research pages, and speaking profiles.',
    themes: [],
    icon: BriefcaseBusiness,
  },
]

export default function AcademicServicesPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-[430px] overflow-hidden border-b border-border bg-purple text-white md:min-h-[500px]">
        <Image
          src="/company%20resources/academic%20hero.webp"
          alt="Academic Services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-purple/68" />
        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 md:min-h-[500px] md:pb-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Solomon Atah Pty Ltd
            </p>
            <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight text-white md:text-7xl">
              Academic Services
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/84 md:text-lg">
              Institutional engagement, academic consultation access, and professional services
              at the intersection of academic rigour and public practice.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What We Offer
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {SERVICES.slice(0, 4).map((service) => {
              const Icon = service.icon

              return (
                <article
                  key={service.title}
                  className="flex min-h-[310px] flex-col border border-border bg-card shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
                >
                  <div className="flex items-center gap-3 border-b border-purple/20 bg-purple px-6 py-4 text-white">
                    <Icon className="h-5 w-5 text-gold" strokeWidth={1.45} />
                    <h2 className="font-fraunces text-xl font-light">{service.title}</h2>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div>
                      <p className="mb-5 text-sm leading-7 text-muted-foreground">
                        {service.description}
                      </p>
                      {service.themes.length > 0 && (
                        <div>
                          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Keynote Themes
                          </p>
                          <ul className="space-y-1.5">
                            {service.themes.map((theme) => (
                              <li
                                key={theme}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <span className="mt-1.5 h-px w-3 shrink-0 bg-gold" />
                                <span>{theme}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    <Link
                      href="/contact"
                      className="mt-auto inline-flex w-fit items-center border-b border-gold/45 pt-7 text-sm font-semibold text-gold transition-colors hover:border-purple hover:text-purple"
                    >
                      Learn More
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm bg-purple px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-800"
            >
              Book a Speaking Engagement
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-purple/40"
            >
              Request Academic Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Awards &amp; Recognitions
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <p className="text-sm text-muted-foreground">
            Awards and institutional recognitions will be listed here.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Upcoming Events
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {UPCOMING_EVENTS.length > 0 ? (
            <div className="space-y-10">
              {UPCOMING_EVENTS.map((event) => (
                <EventCard
                  key={event.title}
                  event={event}
                  showMap
                />
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

