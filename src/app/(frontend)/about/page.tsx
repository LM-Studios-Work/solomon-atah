import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About, Solomon Atah Pty Ltd',
  description:
    'Solomon Atah Pty Ltd is a sovereign intellectual holding company committed to building durable knowledge infrastructures across media, research, publishing, and cultural production.',
}

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Page header */}
      <header className="max-w-3xl mb-16 pb-16 border-b border-border">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
          Solomon Atah Pty Ltd
        </p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">About</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A sovereign intellectual holding company. Deliberate, structurally grounded, and
          future-facing.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-16">
          {/* Mission */}
          <section id="mission">
            <h2 className="font-fraunces text-3xl mb-6">The Company</h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                Solomon Atah Pty Ltd is a sovereign intellectual holding company committed to
                building durable knowledge infrastructures across media, research, publishing,
                and cultural production. Anchored by the elephant emblem, our identity reflects
                memory, strength, discipline, and long horizon thinking.
              </p>
              <p>
                We develop ideas that endure, translate complex scholarship into public
                intelligence, and construct narrative systems that shape institutions rather than
                merely respond to them.
              </p>
              <blockquote className="pull-quote">
                &ldquo;Know Tomorrow Today.&rdquo;
              </blockquote>
              <p>
                Through The Solomon Atah Podcast, Ninta Research and Publishing,
                academic services, and film development, we operate at the intersection of thought
                and execution. Our work is deliberate, structurally grounded, and future-facing -
                designed not for momentary visibility but for generational continuity.
              </p>
            </div>
          </section>

          {/* Brand positioning */}
          <section id="positioning">
            <h2 className="font-fraunces text-3xl mb-6">Brand Positioning</h2>
            <div className="prose-editorial space-y-6 text-muted-foreground">
              <p>
                The Solomon Atah Podcast is a public-facing academic media institution and academic
                media production company that commissions, curates, produces and disseminates
                scholarly conversations for global audiences.
              </p>
              <p>
                We partner with universities, research institutes, conferences, governments and
                international organisations to transform academic knowledge into premium
                intellectual media experiences that extend the reach and impact of research far
                beyond the campus.
              </p>
              <p>
                Our work is driven by a simple conviction: knowledge achieves its greatest value
                only when it is visible, accessible and engaged by society.
              </p>

              <blockquote className="pull-quote">
                &ldquo;Knowledge achieves its greatest value only when it is visible, accessible
                and engaged by society.&rdquo;
              </blockquote>

              <p>
                Academic research continues to be constrained by three institutional barriers. The
                lecture hall walls that confine ideas to classrooms. The conference walls that limit
                intellectual exchange to those able to attend. The journal paywalls that restrict
                publicly funded research from reaching the public it is intended to serve.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 not-prose my-6">
                <div className="p-4 rounded-sm border border-border bg-muted/20 space-y-1.5">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                    Barrier I
                  </span>
                  <h4 className="font-fraunces text-base text-foreground font-medium">
                    Lecture Hall Walls
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Confine ideas to classrooms.
                  </p>
                </div>
                <div className="p-4 rounded-sm border border-border bg-muted/20 space-y-1.5">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                    Barrier II
                  </span>
                  <h4 className="font-fraunces text-base text-foreground font-medium">
                    Conference Walls
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Limit intellectual exchange to those able to attend.
                  </p>
                </div>
                <div className="p-4 rounded-sm border border-border bg-muted/20 space-y-1.5">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                    Barrier III
                  </span>
                  <h4 className="font-fraunces text-base text-foreground font-medium">
                    Journal Paywalls
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Restrict publicly funded research from reaching society.
                  </p>
                </div>
              </div>

              <p className="text-foreground font-medium text-lg">
                The Solomon Atah Podcast exists to dismantle these barriers.
              </p>

              <p>
                Through long-form interviews, conference media productions, executive
                conversations, research storytelling and original editorial formats, we create
                enduring public records of scholarship that connect researchers with policymakers,
                industry leaders, students, journalists and citizens.
              </p>
              <p>
                Our role extends beyond communication. We produce intellectual media ecosystems
                that increase research visibility, strengthen institutional reputation, amplify
                thought leadership and preserve important ideas as accessible public knowledge.
              </p>
              <p>
                Our signature media experiences include the Academic Media Hub&trade;, Academic Red
                Carpet&trade;, Leadership Studio&trade;, Daily Conference Show&trade;, Research
                Spotlight&trade; and University Voices&trade;, enabling conferences and institutions
                to transform temporary events into lasting intellectual assets.
              </p>

              <div className="flex flex-wrap gap-2.5 not-prose pt-1 pb-2">
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
                    className="inline-flex items-center text-xs font-semibold tracking-wider uppercase px-3.5 py-1.5 rounded-sm bg-purple/10 text-purple border border-purple/20 dark:bg-purple/20 dark:text-purple-300 dark:border-purple/30"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p>
                Positioned at the intersection of scholarship, media and public engagement, The
                Solomon Atah Podcast helps organisations move beyond knowledge production to
                knowledge visibility, ensuring that research is not merely published, but
                discovered, understood and applied.
              </p>

              <div className="mt-8 p-6 border-l-4 border-purple bg-purple/5 rounded-r-sm not-prose">
                <p className="font-fraunces text-xl md:text-2xl text-foreground leading-snug">
                  We are building a new category of institution: an academic media production
                  company dedicated to making the world&apos;s most important ideas impossible to
                  ignore.
                </p>
              </div>
            </div>
          </section>

          {/* The host */}
          <section id="host">
            <h2 className="font-fraunces text-3xl mb-6">The Host</h2>
            <div className="mb-8">
              <div className="relative w-48 h-64 rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/company%20resources/owner.jpeg"
                  alt="Solomon Atah"
                  fill
                  className="object-cover object-top"
                  sizes="192px"
                />
              </div>
            </div>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                <strong className="text-foreground">Solomon Atah</strong> is the founder and host of
                the podcast. He launched it with a conviction: that ideas matter, that scholars
                deserve a public, and that African research in particular deserves to be heard beyond
                the seminar room and the journal article.
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
          </section>

          {/* Editorial principles */}
          <section id="principles">
            <h2 className="font-fraunces text-3xl mb-6">Editorial Principles</h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                <strong className="text-foreground">Guest selection.</strong> We invite PhD holders
                and PhD candidates whose research speaks to questions of broad public significance.
                Priority is given to scholars working on Africa and the Global South, to
                under-represented voices in global intellectual discourse, and to research that
                challenges received wisdom.
              </p>
              <p>
                <strong className="text-foreground">Preparation.</strong> Every conversation is
                preceded by thorough research. The host reads the guest&apos;s published work,
                doctoral thesis, or working papers in advance. Conversations are not generic
                interviews; they are tailored to the specifics of each scholar&apos;s research.
              </p>
              <p>
                <strong className="text-foreground">Editorial independence.</strong> Guests are not
                asked to endorse the podcast&apos;s positions, nor does the podcast endorse
                theirs. The views expressed by guests are their own.
              </p>
              <p>
                <strong className="text-foreground">Archiving and citation.</strong> Every
                conversation is archived, given an editorial summary, and made citable in APA, MLA,
                and Chicago formats. We believe conversations with scholars constitute a legitimate
                form of intellectual record.
              </p>
              <p>
                <strong className="text-foreground">Accessibility.</strong> The archive is free and
                open. Transcripts are provided where available. We are committed to making
                scholarship accessible across digital divides.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-5 border border-border rounded-sm bg-muted/20">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> The views expressed by
                guests in conversations on The Solomon Atah Podcast are their own and do not
                represent the position of the podcast, its host, or any affiliated institution.
              </p>
            </div>
          </section>

          {/* Press */}
          <section id="press">
            <h2 className="font-fraunces text-3xl mb-6">Press Kit</h2>
            <div className="prose-editorial text-muted-foreground mb-6">
              <p>
                Media enquiries, interview requests, and press coverage can be directed to{' '}
                <a
                  href="mailto:press@solomonatah.com"
                  className="text-purple hover:underline"
                >
                  press@solomonatah.com
                </a>
                .
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-border rounded-sm text-sm font-medium hover:border-purple/40 hover:bg-muted/30 transition-colors"
              >
                Download Press Kit (PDF)
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-border rounded-sm text-sm font-medium hover:border-purple/40 hover:bg-muted/30 transition-colors"
              >
                Logo Files
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 border border-border rounded-sm text-sm font-medium hover:border-purple/40 hover:bg-muted/30 transition-colors"
              >
                Host Photo
              </a>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Quick links */}
            <div className="border border-border rounded-sm p-6">
              <h3 className="font-fraunces text-lg mb-4">On this page</h3>
              <nav className="space-y-2">
                {[
                  { label: 'The Company', href: '#mission' },
                  { label: 'Brand Positioning', href: '#positioning' },
                  { label: 'The Host', href: '#host' },
                  { label: 'Editorial Principles', href: '#principles' },
                  { label: 'Press Kit', href: '#press' },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1 border-l-2 border-transparent hover:border-gold pl-3"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* CTA */}
            <div className="border border-border rounded-sm p-6 bg-purple/5">
              <h3 className="font-fraunces text-lg mb-3">Donate</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Sustain the archive, the research, and the editorial work that makes scholarship
                freely accessible.
              </p>
              <Link
                href="/support"
                className="inline-flex w-full items-center justify-center px-4 py-2 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Donate
              </Link>
            </div>

            {/* Partner */}
            <div className="border border-border rounded-sm p-6">
              <h3 className="font-fraunces text-lg mb-3">Partner With Us</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Institutions, foundations, and organisations supporting intellectual infrastructure.
              </p>
              <Link
                href="/partner"
                className="text-sm text-purple hover:underline font-medium"
              >
                Partnership enquiries →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
