import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Film Projects — Solomon Atah Pty Ltd',
  description:
    'The film division of Solomon Atah Pty Ltd — documentary projects, narrative film, and productions in development.',
}

const DOCUMENTARY_PROJECTS: {
  title: string
  logline: string
  status: 'In Development' | 'In Production' | 'Completed'
}[] = [
  // Add documentary projects here
]

const NARRATIVE_PROJECTS: {
  title: string
  logline: string
  status: 'In Development' | 'In Production' | 'Completed'
}[] = [
  // Add narrative film projects here
]

export default function FilmPage() {
  return (
    <div>
      {/* ── Hero image ────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="relative w-full h-72 md:h-96 overflow-hidden">
          <Image
            src="/company%20resources/film_division.jpeg"
            alt="Solomon Atah Film Division"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
                Solomon Atah Pty Ltd
              </p>
              <h1 className="font-fraunces text-5xl md:text-6xl font-light text-white leading-tight">
                Film Projects
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            The film division develops documentary and narrative projects that translate intellectual
            inquiry into cinematic form — extending the work of research and scholarship into
            moving image.
          </p>
        </div>
      </section>

      {/* ── Documentary Projects ──────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Documentary Projects
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {DOCUMENTARY_PROJECTS.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {DOCUMENTARY_PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Documentary projects will be listed here as they move into active development.
            </p>
          )}
        </div>
      </section>

      {/* ── Narrative Film ────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Narrative Film Projects
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {NARRATIVE_PROJECTS.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-6">
              {NARRATIVE_PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Narrative film projects will be listed here as they move into active development.
            </p>
          )}
        </div>
      </section>

      {/* ── Concept Notes ────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Concept Notes
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="max-w-2xl">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Concept notes for projects in development are available to verified production
              partners, broadcasters, and development funds on request. Each note outlines
              the intellectual premise, proposed format, and target audience for the project.
            </p>
            <Link
              href="/contact"
              className="text-sm text-purple hover:underline font-medium"
            >
              Request concept notes →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Production Partnerships ───────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                Production Partnerships
              </p>
              <h2 className="font-fraunces text-3xl font-light mb-6">
                Collaborate on Film
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are open to co-production arrangements, distribution partnerships, and
                institutional collaborations with broadcasters, cultural organisations, and
                film development funds that share our commitment to rigorous, intellectually
                serious storytelling.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Production enquiries
              </Link>
            </div>

            <div className="relative w-full rounded-sm overflow-hidden">
              <Image
                src="/company%20resources/africa_film_division.jpeg"
                alt="Africa Film Division"
                width={600}
                height={800}
                className="w-full object-cover rounded-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Approach ──────────────────────────────────────────────────────── */}
      <section className="bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6">
              Our Approach
            </p>
            <p className="font-fraunces text-2xl md:text-3xl font-light leading-relaxed">
              Our film work is an extension of the same intellectual commitments that drive
              our podcast, research, and publishing — rigour, long horizon thinking, and
              a commitment to ideas that endure. We develop cultural infrastructure, not content.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({
  project,
}: {
  project: { title: string; logline: string; status: string }
}) {
  const statusColors: Record<string, string> = {
    'In Development': 'text-gold border-gold/30',
    'In Production': 'text-purple border-purple/30',
    Completed: 'text-muted-foreground border-border',
  }

  return (
    <div className="border border-border rounded-sm p-6 hover:border-purple/30 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-fraunces text-lg leading-snug">{project.title}</h3>
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${
            statusColors[project.status] || 'text-muted-foreground border-border'
          }`}
        >
          {project.status}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{project.logline}</p>
    </div>
  )
}
