import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  HeartHandshake,
  Landmark,
  LibraryBig,
  MessageSquarePlus,
  Podcast,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Donate, Solomon Atah Pty Ltd',
  description:
    'Donate to Solomon Atah Pty Ltd, become a patron, partner with us, or propose a scholarly conversation.',
}

const SUPPORT_OPTIONS = [
  {
    title: 'Patron Donation',
    description:
      'Sustain the archive, editorial work, scholar profiles, reading lists, and public scholarship infrastructure.',
    action: 'Become a patron',
    href: '/contact',
    icon: HeartHandshake,
  },
  {
    title: 'Institutional Partnership',
    description:
      'For universities, foundations, cultural organisations, and aligned institutions donating to serious public knowledge.',
    action: 'Discuss partnership',
    href: '/partner',
    icon: Building2,
  },
  {
    title: 'Academic Translation',
    description:
      'Fund transcripts, summaries, citations, research notes, and materials that make scholarship easier to use.',
    action: 'Donate to translation',
    href: '/partner',
    icon: LibraryBig,
  },
]

const ENGAGEMENT_OPTIONS = [
  {
    title: 'Partner With Us',
    description:
      'For institutions, foundations, research groups, cultural organisations, and sponsors interested in formal collaboration.',
    action: 'Open partnership form',
    href: '/partner',
    icon: Building2,
  },
  {
    title: 'Propose a Conversation',
    description:
      'For scholars, doctoral candidates, or nominators proposing a rigorous public conversation for the Solomon Atah Podcast.',
    action: 'Open proposal form',
    href: '/propose',
    icon: Podcast,
  },
  {
    title: 'Contact the Company',
    description:
      'For donation routing, general enquiries, media requests, research questions, or anything that needs direct follow-up.',
    action: 'Send a message',
    href: '/contact',
    icon: MessageSquarePlus,
  },
]

export default function SupportPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="border-b border-border bg-purple text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Donate
          </p>
          <h1 className="mb-6 max-w-3xl font-fraunces text-5xl font-light leading-tight md:text-7xl">
            Donate
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-white/78 md:text-lg">
            The archive is free. The scholarship is rigorous. The work is ongoing. Donations help
            sustain the intellectual infrastructure being built across media, research, and public
            scholarship.
          </p>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Ways to Donate
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SUPPORT_OPTIONS.map((option) => {
              const Icon = option.icon

              return (
                <article key={option.title} className="border border-border bg-card p-7 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
                  <Icon className="mb-6 h-9 w-9 text-gold" strokeWidth={1.35} />
                  <h2 className="mb-3 font-fraunces text-2xl font-light">{option.title}</h2>
                  <p className="mb-7 text-sm leading-7 text-muted-foreground">{option.description}</p>
                  <Link href={option.href} className="inline-flex items-center gap-2 text-sm font-medium text-purple hover:underline">
                    {option.action}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Get Involved
            </p>
            <h2 className="mb-4 font-fraunces text-4xl font-light">
              Partner, propose, or contact us directly
            </h2>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              Donation is one way to support the work. If you are trying to collaborate,
              sponsor a series, nominate a scholar, or propose a conversation, use the
              dedicated forms below so the enquiry reaches the right workflow.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {ENGAGEMENT_OPTIONS.map((option) => {
              const Icon = option.icon

              return (
                <article key={option.title} className="border border-border bg-card p-7 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
                  <Icon className="mb-6 h-9 w-9 text-gold" strokeWidth={1.35} />
                  <h3 className="mb-3 font-fraunces text-2xl font-light">{option.title}</h3>
                  <p className="mb-7 text-sm leading-7 text-muted-foreground">{option.description}</p>
                  <Link href={option.href} className="inline-flex items-center gap-2 text-sm font-medium text-purple hover:underline">
                    {option.action}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_0.8fr] md:items-center lg:px-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              One-Time Donation
            </p>
            <h2 className="mb-4 font-fraunces text-4xl font-light">Make a Donation</h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
              One-time donations directly fund new conversations, archive maintenance,
              research summaries, and academic translation work.
            </p>
          </div>
          <div className="border border-border bg-card p-7 shadow-[0_12px_28px_rgba(0,0,0,0.04)]">
            <Landmark className="mb-5 h-8 w-8 text-gold" strokeWidth={1.4} />
            <p className="mb-6 text-sm leading-7 text-muted-foreground">
              Donation processing is being set up. For now, contact us directly and we will route
              the contribution properly.
            </p>
            <Link
              href="/contact"
              className="inline-flex rounded-sm bg-purple px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-800"
            >
              Contact us to donate
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-purple text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            Institutional Partnerships
          </p>
          <p className="mb-7 max-w-4xl font-fraunces text-2xl font-light leading-tight md:text-4xl">
            Universities, foundations, cultural organisations, and mission-aligned institutions
            are invited to explore formal partnership and strategic alliances.
          </p>
          <Link
            href="/partner"
            className="inline-flex rounded-sm bg-white px-5 py-2.5 text-sm font-medium text-purple transition-colors hover:bg-white/90"
          >
            Partnership enquiries
          </Link>
        </div>
      </section>
    </div>
  )
}
