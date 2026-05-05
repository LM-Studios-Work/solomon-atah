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
                Through The Solomon Atah Podcast, Atah Global Media, Ninta Research and Publishing,
                academic services, and film development, we operate at the intersection of thought
                and execution. Our work is deliberate, structurally grounded, and future-facing -
                designed not for momentary visibility but for generational continuity.
              </p>
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
              <h3 className="font-fraunces text-lg mb-3">Support Our Work</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Sustain the archive, the research, and the editorial work that makes scholarship
                freely accessible.
              </p>
              <Link
                href="/support"
                className="inline-flex w-full items-center justify-center px-4 py-2 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Support Us
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
