import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Archive,
  BookOpen,
  Globe2,
  GraduationCap,
  Lock,
  Presentation,
  Shield,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'About, Solomon Atah Pty Ltd',
  description:
    'Solomon Atah Pty Ltd is a sovereign intellectual holding company committed to building durable knowledge infrastructures across media, research, publishing, and cultural production.',
}

const BARRIERS = [
  {
    name: 'Lecture Hall Walls',
    description: 'Confine ideas to classrooms.',
    icon: GraduationCap,
  },
  {
    name: 'Conference Walls',
    description: 'Limit intellectual exchange to those able to attend.',
    icon: Presentation,
  },
  {
    name: 'Journal Paywalls',
    description: 'Restrict publicly funded research from reaching society.',
    icon: Lock,
  },
]

const PRINCIPLES = [
  {
    name: 'Guest selection',
    description:
      'We invite PhD holders and candidates whose research speaks to public significance.',
    icon: Users,
  },
  {
    name: 'Preparation',
    description:
      'Conversations are tailored to the specifics of each scholar\'s research and work.',
    icon: BookOpen,
  },
  {
    name: 'Editorial independence',
    description:
      'The views expressed by guests are their own. We do not demand endorsement.',
    icon: Shield,
  },
  {
    name: 'Archiving and citation',
    description:
      'Every conversation is archived, summarized, and made citable as intellectual record.',
    icon: Archive,
  },
  {
    name: 'Accessibility',
    description:
      'The archive is free and open. We are committed to accessible scholarship.',
    icon: Globe2,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[430px] overflow-hidden border-b border-border bg-purple text-white md:min-h-[500px]">
        <Image
          src="/company%20resources/research%20hero.jpg"
          alt="Layered map of Africa"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-purple/72" />

        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 md:min-h-[500px] md:pb-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Solomon Atah Pty Ltd
            </p>
            <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight text-white md:text-7xl">
              About
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/82 md:text-lg">
              A sovereign intellectual holding company. Deliberate, structurally grounded, and
              future-facing.
            </p>
          </div>
        </div>
      </section>

      {/* The Company */}
      <section id="mission" className="border-b border-border bg-background py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[400px_1fr] lg:gap-20 lg:px-8">
          <div className="relative w-full max-w-[400px] mx-auto lg:mx-0">
            <Image
              src="/company%20resources/logo solomon atah main company.jpeg"
              alt="Solomon Atah Logo"
              width={800}
              height={800}
              className="w-full h-auto object-contain rounded-sm shadow-lg"
            />
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Our Mission
            </p>
            <h2 className="mb-5 font-fraunces text-4xl font-light">The Company</h2>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground md:text-base">
              <p>
                <strong className="font-medium text-foreground">Solomon Atah Pty Ltd</strong> is a sovereign intellectual holding company committed to
                building durable knowledge infrastructures across media, research, publishing, and
                cultural production. Anchored by the elephant emblem, our identity reflects memory,
                strength, discipline, and long horizon thinking.
              </p>
              <p>
                We develop ideas that endure, translate complex scholarship into public intelligence,
                and construct narrative systems that shape institutions rather than merely respond to
                them.
              </p>
              <ul className="list-disc pl-5 space-y-2 py-2">
                <li>Through <strong>The Solomon Atah Podcast</strong>.</li>
                <li>Ninta Research and Publishing, academic services and film development.</li>
                <li>Operate at the intersection of thought and execution. Our work is deliberate, structurally grounded, and future-facing.</li>
              </ul>
            </div>
            <Link
              href="/support"
              className="mt-8 inline-flex items-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-purple shadow-sm transition-colors hover:bg-gold/90"
            >
              Support our work
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Positioning */}
      <section id="positioning" className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Row: Text + Large Quote */}
          <div className="mb-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Media & Infrastructure
              </p>
              <h2 className="mb-5 font-fraunces text-4xl font-light">Brand Positioning</h2>
              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <p>
                  The Solomon Atah Podcast is a public-facing academic media institution and academic
                  media production company that commissions, curates, produces and disseminates
                  scholarly conversations for global audiences.
                </p>
                <p>
                  We partner with universities, research institutes, conferences, governments and
                  international organisations to transform academic knowledge into premium intellectual
                  media experiences that extend the reach and impact of research far beyond the campus.
                </p>
                <div className="mt-6 border-l-2 border-purple pl-4 italic">
                  Academic research continues to be constrained by three institutional barriers. The
                  lecture hall walls that confine ideas to classrooms. The conference walls that limit
                  intellectual exchange to those able to attend. The journal paywalls that restrict
                  publicly funded research from reaching the public it is intended to serve.
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="w-full rounded-sm border border-border bg-card p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:p-14">
                <p className="font-fraunces text-3xl font-light md:text-5xl text-foreground">
                  "Knowledge achieves its greatest value only when it is visible, accessible and engaged by society."
                </p>
              </div>
            </div>
          </div>

          {/* Middle Row: 3 Barrier Cards */}
          <div className="mb-16 grid gap-6 sm:grid-cols-3">
            {BARRIERS.map((barrier, index) => {
              const Icon = barrier.icon
              return (
                <article
                  key={barrier.name}
                  className="rounded-sm border border-border bg-card p-6 shadow-[0_16px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="mb-6 flex h-24 items-center justify-center border-b border-border text-gold">
                    <Icon className="h-12 w-12" strokeWidth={1.25} />
                  </div>
                  <h3 className="mb-3 font-fraunces text-lg font-light">{barrier.name}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{barrier.description}</p>
                </article>
              )
            })}
          </div>

          {/* Bottom Row: Text + Large Quote */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h3 className="mb-5 font-fraunces text-2xl font-light">
                The Solomon Atah Podcast exists to dismantle these barriers.
              </h3>
              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <p>
                  Through long-form interviews, conference media productions, executive conversations,
                  research storytelling and original editorial formats, we create enduring public
                  records of scholarship that connect researchers with policymakers, industry leaders,
                  students, journalists and citizens.
                </p>
                <p>
                  Our signature media experiences include:
                </p>
              </div>

              <div className="my-6 flex flex-wrap gap-2.5">
                {[
                  'Academic Media Hub™',
                  'Academic Red Carpet™',
                  'Leadership Studio™',
                  'Daily Conference Show™',
                  'Research Spotlight™',
                  'University Voices™',
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-sm leading-7 text-muted-foreground">
                Positioned at the intersection of scholarship, media and public engagement, The Solomon
                Atah Podcast helps organisations move beyond knowledge production to knowledge visibility.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full rounded-sm border border-border bg-card p-10 shadow-[0_20px_40px_rgba(0,0,0,0.08)] md:p-14">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Our Conviction
                </p>
                <p className="font-fraunces text-3xl font-light md:text-5xl text-foreground">
                  "We help institutions transform temporary events into lasting intellectual assets."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Principles */}
      <section id="principles" className="border-b border-border bg-purple py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="mb-4 font-fraunces text-4xl font-light text-white">Editorial Principles</h2>
            <p className="text-sm leading-7 text-white/80 md:text-base">
              Our core values for selecting, engaging, and presenting scholarly work to the public.
            </p>
          </div>

          {/* 5 Column Grid for Principles */}
          <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {PRINCIPLES.map((principle) => {
              const Icon = principle.icon
              return (
                <article
                  key={principle.name}
                  className="rounded-sm border border-border bg-card text-foreground p-6 shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
                >
                  <div className="mb-6 flex h-24 items-center justify-center border-b border-border text-gold">
                    <Icon className="h-12 w-12" strokeWidth={1.25} />
                  </div>
                  <h3 className="mb-3 font-fraunces text-lg font-light">{principle.name}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{principle.description}</p>
                </article>
              )
            })}
          </div>

          <div className="rounded-sm border border-white/20 bg-white/5 p-5 text-center">
            <p className="text-xs text-white/80 sm:text-sm">
              <strong className="font-semibold text-white">Disclaimer:</strong> The views expressed by
              guests in conversations on The Solomon Atah Podcast are their own and do not
              represent the position of the podcast, its host, or any affiliated institution.
            </p>
          </div>
        </div>
      </section>

      {/* The Host */}
      <section id="host" className="border-b border-border bg-muted/20 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[450px_1fr] lg:gap-20 lg:px-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-gold/40 shadow-2xl mx-auto lg:mx-0 lg:aspect-square max-w-[450px]">
            <Image
              src="/company%20resources/owner.jpeg"
              alt="Solomon Atah"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 450px"
            />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              The Host
            </p>
            <h2 className="mb-5 font-fraunces text-4xl font-light">SOLOMON ATAH</h2>
            <div className="space-y-5 text-sm leading-7 text-muted-foreground md:text-base">
              <p>
                Solomon Atah is the founder and host of the podcast. He launched it with a conviction:
                that ideas matter, that scholars deserve a public, and that African research in
                particular deserves to be heard beyond the seminar room and the journal article.
              </p>
              <p>
                His approach to interviewing is rooted in preparation. Solomon reads the work before
                he records the conversation. He is interested not just in what scholars argue but in
                how they think, the methodological choices, the intellectual debts, the unresolved
                tensions in their research.
              </p>
              <p>
                He is not a journalist seeking conflict. He is a host seeking clarity. The result is
                a conversation that feels closer to an extended tutorial than to a debate, rigorous,
                curious, and hospitable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Press Kit CTA */}
      <section id="press" className="bg-purple text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Media & Press
            </p>
            <p className="mb-10 font-fraunces text-3xl font-light leading-tight text-white md:text-5xl">
              We are building a new category of institution: an academic media production company
              dedicated to making the world&apos;s most important ideas impossible to ignore.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:podcast@solomonatah.com"
                className="inline-flex items-center rounded-sm bg-gold px-7 py-3.5 text-sm font-semibold text-purple transition-colors hover:bg-gold/90"
              >
                Contact for Press
              </a>
              <Link
                href="/partner"
                className="inline-flex items-center rounded-sm border border-white/30 bg-transparent px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Partnership Enquiries
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

