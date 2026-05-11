import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Archive,
  ArrowLeft,
  ArrowRight,
  Check,
  Globe2,
  Monitor,
  SearchCheck,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Academic Website Services, Solomon Atah Pty Ltd',
  description:
    'Academic website packages for scholars who need independent digital visibility, research archiving, and professional positioning.',
}

const PILLARS = [
  {
    title: 'Academic Positionality',
    description:
      'Position the scholar as an intellectual agent with a clear agenda, archive, and research trajectory.',
    icon: SearchCheck,
  },
  {
    title: 'Sovereign Visibility',
    description:
      'Anchor research visibility on a domain and platform the scholar controls.',
    icon: ShieldCheck,
  },
  {
    title: 'Academic Observability',
    description:
      'Make scholarship discoverable, legible, structured, and referenceable beyond institutional portals.',
    icon: Globe2,
  },
]

const PACKAGES = [
  {
    name: 'Emerging Scholar',
    audience: 'PhD scholars, postdocs, and early career academics.',
    summary: 'Best for scholars building their first independent digital presence.',
    pages: '4 to 5 page professional website',
    term: '12 months domain registration and secure hosting',
    features: [
      'Academic bio refinement and rewriting',
      'Publications archive formatting',
      'Research interests section',
      'Contact and collaboration page',
      'Basic search optimisation',
      'Mobile responsive design',
    ],
  },
  {
    name: 'Established Academic',
    audience: 'Senior lecturers, associate professors, and funded researchers.',
    summary: 'Designed for stronger global visibility and collaboration opportunities.',
    pages: 'Full website design up to 8 pages',
    term: '24 months domain registration and secure hosting',
    featured: true,
    features: [
      '60 minute strategy and positioning session',
      'Advanced academic narrative development',
      'Research projects showcase section',
      'Media, speaking, and podcast integration',
      'Publications with downloadable citations',
      'Impact and grant highlight section',
      'Analytics integration',
      'Foundational search optimisation',
    ],
  },
  {
    name: 'Research Leader',
    audience: 'Research chairs, rated scholars, directors, and policy advisors.',
    summary: 'Built for scholars shaping national and international conversations.',
    pages: 'Custom designed website up to 10 pages',
    term: '36 months domain registration and premium hosting',
    features: [
      'Full brand positioning architecture',
      'Intellectual impact strategy consultation',
      'Research impact storytelling',
      'Book and major project landing pages',
      'Media kit and downloadable CV',
      'Newsletter setup',
      'Collaboration inquiry system',
      '3 months advisory support',
      'Advanced search optimisation',
    ],
  },
]

const OUTCOMES = [
  'Greater citation visibility',
  'Stronger grant positioning',
  'Controlled digital identity',
  'Independent research archiving',
  'Long term intellectual legacy',
]

export default function AcademicWebsiteServicesPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-[430px] overflow-hidden border-b border-border bg-purple text-white md:min-h-[500px]">
        <Image
          src="/company%20resources/academic%20hero.webp"
          alt="Academic Website Services"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-purple/74" />
        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-end px-4 pb-14 pt-24 sm:px-6 md:min-h-[500px] md:pb-18 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/academic-services"
              className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.6} />
              Academic Services
            </Link>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              The Solomon Atah Podcast
            </p>
            <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight text-white md:text-7xl">
              Academic Website Services
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/84 md:text-lg">
              Strategic academic websites for scholars who need a controlled domain, structured
              archive, and credible digital platform for their research.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Infrastructure, Not Vanity
            </p>
            <h2 className="mb-6 font-fraunces text-4xl font-light md:text-5xl">
              Let your research resolve to your own name.
            </h2>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground md:text-base">
              <p>
                Scholars across Africa and the Global South are not absent from knowledge
                production. They are often underrepresented in the digital systems that shape
                credibility, citation pathways, media discovery, and collaboration.
              </p>
              <p>
                University pages are useful, but they are usually template driven,
                administratively controlled, and limited in narrative depth. A personal academic
                website creates a professional platform around the scholar&apos;s work, voice, and
                long-term intellectual archive.
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="border border-purple/20 bg-purple p-7 text-white">
              <Archive className="mb-6 h-9 w-9 text-gold" strokeWidth={1.35} />
              <h3 className="mb-4 font-fraunces text-3xl font-light">
                The problem is not output. The problem is infrastructure.
              </h3>
              <p className="text-sm leading-7 text-white/78">
                Search results shape credibility. Professional websites shape perception.
                Structured visibility shapes opportunity.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {PILLARS.map((pillar) => {
                const Icon = pillar.icon

                return (
                  <article key={pillar.title} className="border border-border bg-card p-5">
                    <Icon className="mb-5 h-7 w-7 text-gold" strokeWidth={1.35} />
                    <h3 className="mb-3 font-fraunces text-xl font-light">{pillar.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{pillar.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Packages
              </p>
              <h2 className="font-fraunces text-4xl font-light md:text-5xl">
                Choose the right level of visibility.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground">
              Each package is quoted according to scope, content readiness, and required
              integrations. Podcast guests receive a 10 percent discount on any package.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {PACKAGES.map((pkg) => (
              <article
                key={pkg.name}
                className={`flex flex-col border bg-card shadow-[0_12px_28px_rgba(0,0,0,0.04)] ${
                  pkg.featured
                    ? 'border-purple shadow-[0_18px_36px_rgba(74,25,66,0.12)]'
                    : 'border-border'
                }`}
              >
                <div
                  className={`border-b px-6 py-5 ${
                    pkg.featured ? 'border-purple/20 bg-purple text-white' : 'border-border'
                  }`}
                >
                  {pkg.featured && (
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                      Most Flexible
                    </p>
                  )}
                  <h3 className="mb-2 font-fraunces text-3xl font-light">{pkg.name}</h3>
                  <p
                    className={`text-sm leading-6 ${
                      pkg.featured ? 'text-white/76' : 'text-muted-foreground'
                    }`}
                  >
                    {pkg.audience}
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-5 text-sm leading-7 text-muted-foreground">{pkg.summary}</p>

                  <div className="mb-5 space-y-3 border-y border-border py-5">
                    <div className="flex items-start gap-3 text-sm">
                      <Monitor className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                      <span>{pkg.pages}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <Globe2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                      <span>{pkg.term}</span>
                    </div>
                  </div>

                  <ul className="mb-7 space-y-2.5">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                      >
                        <Check className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/contact?service=${encodeURIComponent(pkg.name)}`}
                    className={`mt-auto inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors ${
                      pkg.featured
                        ? 'bg-purple text-white hover:bg-purple-800'
                        : 'border border-border bg-background text-foreground hover:border-purple/40'
                    }`}
                  >
                    Request a Quote
                    <ArrowRight className="h-4 w-4" strokeWidth={1.6} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Why It Matters
            </p>
            <h2 className="font-fraunces text-4xl font-light">Sovereign visibility compounds.</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {OUTCOMES.map((outcome) => (
              <div
                key={outcome}
                className="flex items-center gap-3 border border-border bg-card px-4 py-3 text-sm text-muted-foreground"
              >
                <Check className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
