import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  Boxes,
  FileText,
  Globe2,
  Landmark,
  Layers3,
  MailOpen,
  Network,
  PenTool,
  RadioTower,
  Search,
  ShieldCheck,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research & Publishing, Solomon Atah Pty Ltd',
  description:
    'NinTA Research and Ninta Publishing, building narrative intelligence, institutional critique, and publishing intellectual infrastructure.',
}

const RESEARCH_CARDS = [
  {
    name: 'Scenario Analysis',
    description:
      'Evaluate how institutions, markets, and cultural narratives are likely to move under pressure.',
    icon: Search,
  },
  {
    name: 'Institutional Culture',
    description:
      'Map the visible and hidden stories that determine how organizations behave and make decisions.',
    icon: Landmark,
  },
  {
    name: 'Letters & Responders',
    description:
      'Develop public-facing responses, letters, briefs, and narrative positions with intellectual weight.',
    icon: MailOpen,
  },
  {
    name: 'Accretorial Signages',
    description:
      'Identify the recurring symbols, assumptions, and signals that shape public interpretation.',
    icon: RadioTower,
  },
  {
    name: 'Network Sigmech',
    description:
      'Study how narratives travel through networks, communities, institutions, and media ecosystems.',
    icon: Network,
  },
]

const BOOKS: {
  title: string
  subtitle: string | null
  image: string | null
  status: string
  description: string
}[] = [
  {
    title: 'The Narrative Manifesto',
    subtitle: 'How Stories Harm, And What You Can Do About It',
    image: '/company%20resources/book.jpeg',
    status: 'Available',
    description:
      'A systematic account of how stories operate as instruments of harm, and a practical framework for resistance and reconstruction.',
  },
  {
    title: 'The Marriage Stock Exchange',
    subtitle: 'Why Marriage Was Never About Love',
    image: '/company%20resources/book_2_cover.jpeg',
    status: 'Available',
    description:
      'An institutional and economic reading of marriage as a system of exchange, stripped of its romantic mythology.',
  },
  {
    title: 'The 48 Laws of Personal Sovereignty',
    subtitle: 'Self Preservation Intelligence',
    image: '/company%20resources/book_3.jpeg',
    status: 'Available',
    description:
      'A framework for navigating power, autonomy, and self-determination in an age of institutional overreach and social manipulation.',
  },
  {
    title: 'The University of Money',
    subtitle: 'Financialisation and Higher Education',
    image: null,
    status: 'Available',
    description:
      'A critical examination of the financialisation of higher education and its consequences for knowledge production.',
  },
]

const PUBLISHING_SERVICES = [
  {
    name: 'Scenario Analysis',
    description:
      'Argument framing, audience analysis, and manuscript direction for complex public work.',
    icon: BookOpen,
  },
  {
    name: 'Institutional Culture',
    description:
      'Scholarly positioning, editorial architecture, and institutional language development.',
    icon: Landmark,
  },
  {
    name: 'Letters, Domains',
    description:
      'Letters, forewords, essays, domain copy, and public documents for serious projects.',
    icon: FileText,
  },
  {
    name: 'Accretional Cigens',
    description:
      'Bibliographic development, citation discipline, and manuscript structure review.',
    icon: Layers3,
  },
  {
    name: 'Accord Network',
    description:
      'Publishing strategy, permissions, contributors, and cross-institutional coordination.',
    icon: Globe2,
  },
  {
    name: 'Network Services',
    description:
      'Distribution planning, launch materials, reading communities, and long-tail circulation.',
    icon: Boxes,
  },
]

export default function ResearchPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="relative min-h-[430px] overflow-hidden border-b border-border bg-purple text-white md:min-h-[500px]">
        <Image
          src="/company%20resources/research%20hero.jpg"
          alt="Layered map of Africa for research and publishing"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-purple/72" />

        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 md:min-h-[500px] md:pb-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Research &amp; Publishing
            </p>
            <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight text-white md:text-7xl">
              Research &amp; Publishing
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/82 md:text-lg">
              Research and services we provide aim to brief the future of where African and
              global institutions are headed. We turn narrative intelligence into durable
              books, public arguments, and institutional frameworks.
            </p>
          </div>
        </div>
      </section>

      <section id="ninta-research" className="relative border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              NinTA Research
            </p>
            <h2 className="mb-5 font-fraunces text-4xl font-light">NinTA Research</h2>
            <p className="mb-5 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
              NinTA is the research and narrative intelligence house of Solomon Atah Pty Ltd.
              Our work cuts across African institutions, public thought, and media systems,
              identifying the stories that govern behavior before they become policy,
              reputation, or institutional risk.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-sm bg-purple px-5 py-3 text-sm font-medium text-white shadow-[0_14px_26px_rgba(74,25,66,0.18)] transition-colors hover:bg-purple-800"
            >
              Enquire measurement of narrative
            </Link>
          </div>

          <div className="grid gap-4">
            <div className="relative min-h-[220px] overflow-hidden rounded-sm border border-gold/70 bg-[#101042] shadow-2xl md:min-h-[330px]">
              <Image
                src="/company%20resources/ninta.jpeg"
                alt="NinTA Narrative Intelligence Africa"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="flex gap-5 rounded-sm border border-border bg-card p-7 shadow-[0_14px_28px_rgba(0,0,0,0.05)]">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted/30 text-gold">
                <PenTool className="h-7 w-7" strokeWidth={1.4} />
              </div>
              <div>
                <h3 className="mb-2 font-fraunces text-xl font-light">Letters: Responders</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  Institutional letters, briefs, and language systems for high-stakes public
                  moments.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl gap-5 px-4 pb-20 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {RESEARCH_CARDS.map((service, index) => {
            const Icon = service.icon

            return (
              <article
                key={service.name}
                className={`rounded-sm border border-border bg-card p-6 shadow-[0_16px_30px_rgba(0,0,0,0.06)] ${
                  index === 2 ? 'md:row-span-2' : ''
                }`}
              >
                <div className="mb-6 flex h-24 items-center justify-center border-b border-border text-gold">
                  <Icon className="h-12 w-12" strokeWidth={1.25} />
                </div>
                <h3 className="mb-3 font-fraunces text-lg font-light">{service.name}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
                {index === 2 && (
                  <div className="relative mt-8 hidden aspect-[1374/784] overflow-hidden rounded-sm bg-muted/20 md:block">
                    <Image
                      src="/company%20resources/map.webp"
                      alt="Africa to the world map"
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 360px"
                    />
                  </div>
                )}
              </article>
            )
          })}
        </div>
      </section>

      <section id="ninta-publishing" className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Featured Works
            </p>
            <h2 className="mb-5 font-fraunces text-4xl font-light">Ninta Publishing</h2>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              Books built as public infrastructure: essays, arguments, and frameworks designed
              to circulate beyond a single season and become reference points for readers,
              scholars, institutions, and cultural workers.
            </p>
          </div>

          <div className="relative mb-16 min-h-[360px] overflow-hidden rounded-sm bg-[#211710] shadow-2xl md:min-h-[530px]">
            <Image
              src="/company%20resources/books_museum.jpeg"
              alt="Featured Ninta Publishing works"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,15,10,0.68),rgba(21,15,10,0.2)_46%,rgba(255,255,255,0.02))]" />
            <div className="absolute bottom-8 left-6 max-w-sm text-white md:bottom-12 md:left-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Publishing House
              </p>
              <h3 className="font-fraunces text-3xl font-light md:text-5xl">
                The shelf as an institution
              </h3>
            </div>
          </div>

          <div id="books" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BOOKS.map((book) => (
              <article key={book.title} className="group">
                <div className="relative mb-5 aspect-[2/3] overflow-hidden rounded-sm bg-muted/30 shadow-[0_18px_32px_rgba(0,0,0,0.12)]">
                  {book.image ? (
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                      <BookOpen className="mb-4 h-12 w-12 text-gold" strokeWidth={1.2} />
                      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Cover coming soon
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-2 flex items-start justify-between gap-3">
                  <h3 className="font-fraunces text-xl font-light leading-snug">{book.title}</h3>
                  <span className="shrink-0 rounded-full border border-purple/25 px-2.5 py-1 text-[11px] font-medium text-purple">
                    {book.status}
                  </span>
                </div>
                {book.subtitle && (
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.08em] text-gold">
                    {book.subtitle}
                  </p>
                )}
                <p className="mb-4 text-sm leading-6 text-muted-foreground">{book.description}</p>
                <a href="#" className="text-sm font-medium text-purple hover:underline">
                  Order title →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-9 max-w-3xl">
            <h2 className="mb-4 font-fraunces text-4xl font-light">Publishing Services</h2>
            <p className="text-sm leading-7 text-muted-foreground md:text-base">
              We help scholars, institutions, and independent thinkers turn serious work into
              organized, edited, designed, and publishable material.
            </p>
          </div>

          <div className="grid border-t border-l border-border md:grid-cols-2 lg:grid-cols-3">
            {PUBLISHING_SERVICES.map((service) => {
              const Icon = service.icon

              return (
                <article
                  key={service.name}
                  className="flex gap-5 border-r border-b border-border bg-background p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <div>
                    <h3 className="mb-2 font-fraunces text-lg font-light">{service.name}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{service.description}</p>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-12 grid gap-6 rounded-sm border border-border bg-card p-7 shadow-[0_14px_28px_rgba(0,0,0,0.05)] md:grid-cols-[1fr_auto] md:items-center md:p-8">
            <div>
              <h3 className="mb-3 font-fraunces text-2xl font-light">Publishing Services</h3>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                Academic editing, developmental editing, book design, manuscript assessment,
                and publishing strategy for authors who need precision before visibility.
              </p>
              <Link href="/contact" className="mt-4 inline-flex text-sm font-medium text-purple hover:underline">
                Publishing with us →
              </Link>
            </div>
            <Link
              href="/contact"
              className="inline-flex min-w-64 items-center justify-center rounded-sm bg-purple px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-800"
            >
              Publishing with us...
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-purple text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Our Products
            </p>
            <p className="font-fraunces text-3xl font-light leading-tight text-white md:text-5xl">
              We build ideas that enclose complex scholarship, make intelligence more
              legible, and construct narrative systems that institutions must answer.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-4 text-gold">
            <ShieldCheck className="h-7 w-7" strokeWidth={1.4} />
            <span className="text-sm uppercase tracking-[0.18em]">
              Memoria Aedificat Futurum
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
