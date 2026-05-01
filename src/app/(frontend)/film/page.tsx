import type { Metadata } from 'next'
import Link from 'next/link'

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
  const hasProjects = DOCUMENTARY_PROJECTS.length > 0 || NARRATIVE_PROJECTS.length > 0

  return (
    <div>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            Film Projects
          </h1>
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

      {/* ── Production Partnerships ───────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
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
            <div className="border border-border rounded-sm p-8">
              <h3 className="font-fraunces text-xl mb-4">Our Approach</h3>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Our film work is an extension of the same intellectual commitments that drive
                  our podcast, research, and publishing — rigour, long horizon thinking, and
                  a commitment to ideas that endure.
                </p>
                <p>
                  We develop projects that translate complex scholarship and lived experience
                  into narrative and documentary form — building cultural infrastructure,
                  not content.
                </p>
              </div>
            </div>
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
