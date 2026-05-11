import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Clapperboard, FileText, Handshake, Play, RadioTower } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Film Projects, Solomon Atah Pty Ltd',
  description:
    'The film division of Solomon Atah Pty Ltd, documentary projects, narrative film, and productions in development.',
}

const FILM_PROJECTS = [
  {
    title: 'Narrative Intelligence Africa',
    category: 'Documentary',
    logline:
      'A documentary project examining how public stories shape institutions, power, and cultural memory across African contexts.',
    status: 'In Development',
    image: '/company%20resources/africa_film_division.jpeg',
  },
  {
    title: 'The Public Interest Archive',
    category: 'Documentary Series',
    logline:
      'A long-form series extending academic conversations into cinematic essays for scholars, institutions, and public audiences.',
    status: 'Concept',
    image: '/company%20resources/film_division.jpeg',
  },
  {
    title: 'Moto Boyz',
    category: 'Documentary',
    status: 'In Development',
    image: '/company%20resources/Moto%20Boyz%20Documentary%20Project.jpeg',
  },
]

const PRODUCTION_NOTES = [
  {
    title: 'Documentary Development',
    description: 'Research-led factual projects, interviews, archive work, and field production.',
    icon: Clapperboard,
  },
  {
    title: 'Narrative Film',
    description: 'Scripted projects shaped by institutional critique, cultural memory, and public ideas.',
    icon: Play,
  },
  {
    title: 'Concept Notes',
    description: 'Treatment documents available for verified broadcasters, producers, and funders.',
    icon: FileText,
  },
]

export default function FilmPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-[460px] overflow-hidden border-b border-border bg-purple text-white md:min-h-[540px]">
        <Image
          src="/company%20resources/film_division.jpeg"
          alt="Solomon Atah Film Division"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-purple/70" />
        <div className="relative z-10 mx-auto flex min-h-[460px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 md:min-h-[540px] md:pb-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Solomon Atah Pty Ltd
            </p>
            <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight text-white md:text-7xl">
              Film Projects
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/84 md:text-lg">
              Documentary and narrative projects that translate intellectual inquiry into
              cinematic form, extending research, scholarship, and publishing into moving image.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Film Slate
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FILM_PROJECTS.map((project) => (
              <article
                key={project.title}
                className="group overflow-hidden border border-border bg-card shadow-[0_12px_28px_rgba(0,0,0,0.04)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-purple">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-purple px-3 py-1 text-xs font-medium text-white">
                    {project.status}
                  </div>
                </div>
                <div className="p-6">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                    {project.category}
                  </p>
                  <h2 className="font-fraunces text-2xl font-light">{project.title}</h2>
                  {'logline' in project && project.logline ? (
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {project.logline}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}

            <article className="flex min-h-[360px] flex-col justify-between border border-dashed border-border bg-muted/30 p-6">
              <div>
                <RadioTower className="mb-6 h-10 w-10 text-gold" strokeWidth={1.4} />
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Future Listing
                </p>
                <h2 className="mb-3 font-fraunces text-2xl font-light">New projects slot here</h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  The grid is prepared for additional documentary, narrative, and series projects
                  as the slate expands.
                </p>
              </div>
              <Link href="/contact" className="mt-8 text-sm font-medium text-purple hover:underline">
                Submit a production enquiry →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-3">
            {PRODUCTION_NOTES.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.title} className="border border-border bg-card p-6">
                  <Icon className="mb-5 h-8 w-8 text-gold" strokeWidth={1.4} />
                  <h3 className="mb-3 font-fraunces text-xl font-light">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-purple text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Production Partnerships
            </p>
            <p className="font-fraunces text-2xl font-light leading-tight md:text-4xl">
              We are open to co-production, distribution, broadcaster, and institutional
              partnerships for rigorous film work.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 text-sm font-medium text-purple transition-colors hover:bg-white/90"
          >
            <Handshake className="h-4 w-4" strokeWidth={1.7} />
            Production enquiries
          </Link>
        </div>
      </section>
    </div>
  )
}

