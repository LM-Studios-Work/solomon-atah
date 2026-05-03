import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Research & Publishing — Solomon Atah Pty Ltd',
  description:
    'NinTA Research and Ninta Publishing — building narrative intelligence, institutional critique, and publishing intellectual infrastructure.',
}

const NINTA_RESEARCH_SERVICES = [
  {
    name: 'Narrative Analysis',
    description:
      'Systematic examination of the stories institutions, governments, and media use to frame reality — identifying structure, intent, and consequence.',
  },
  {
    name: 'Institutional Critique',
    description:
      'Rigorous evaluation of how institutions construct and maintain power through narrative — and where those narratives fracture under scrutiny.',
  },
  {
    name: 'Cultural Diagnostics',
    description:
      'Assessment of the cultural logics shaping collective behaviour, public discourse, and policy formation across African and global contexts.',
  },
  {
    name: 'Narrative Intelligence',
    description:
      'Strategic insight derived from the analysis of competing narratives — applied to communications, policy, and institutional positioning.',
  },
  {
    name: 'Narrative Research',
    description:
      'Primary and secondary research anchored in how stories construct knowledge, identity, and social reality within specific institutional settings.',
  },
]

const BOOKS: { title: string; subtitle: string | null; image: string | null; status: string; description: string }[] = [
  {
    title: 'The Narrative Manifesto',
    subtitle: 'How Stories Harm, And What You Can Do About It',
    image: '/company%20resources/book.jpeg',
    status: 'Available',
    description:
      'A systematic account of how stories operate as instruments of harm — and a practical framework for resistance and reconstruction.',
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
    title: '7 Quantum Humanomics',
    subtitle: null,
    image: null,
    status: 'Available',
    description:
      'A theoretical framework integrating quantum principles with humanistic inquiry into economic and social systems.',
  },
  {
    title: 'The University of Money',
    subtitle: null,
    image: null,
    status: 'Available',
    description:
      'A critical examination of the financialisation of higher education and its consequences for knowledge production.',
  },
]

export default function ResearchPage() {
  return (
    <div>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            Research &amp; Publishing
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Books and research positioned as intellectual infrastructure. We produce knowledge
            designed not for momentary visibility but for generational continuity.
          </p>
        </div>
      </section>

      {/* ── Ninta Research ────────────────────────────────────────────────────── */}
      <section id="ninta-research" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                Research Division
              </p>
              <h2 className="font-fraunces text-4xl font-light mb-6">NinTA Research</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                NinTA — Narrative Intelligence Africa — is the analytical engine of Solomon Atah
                Pty Ltd. We conduct narrative-focused research for institutions, governments, and
                organisations seeking to understand and reshape the stories that govern them.
                Our work bridges academic rigour and strategic application.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-5 py-2.5 border border-border text-sm font-medium rounded-sm hover:border-purple/40 hover:bg-muted/40 transition-colors"
              >
                Enquire about research collaboration →
              </Link>
            </div>
            <div className="space-y-4">
              <div className="relative w-full rounded-sm overflow-hidden">
                <Image
                  src="/company%20resources/ninta.jpeg"
                  alt="NinTA — Narrative Intelligence Africa"
                  width={640}
                  height={360}
                  className="w-full object-cover rounded-sm"
                />
              </div>
              <div className="relative w-full rounded-sm overflow-hidden">
                <Image
                  src="/company%20resources/africa.jpeg"
                  alt="Narrative Intelligence Africa"
                  width={640}
                  height={360}
                  className="w-full object-cover rounded-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {NINTA_RESEARCH_SERVICES.map((service) => (
              <div
                key={service.name}
                className="border border-border rounded-sm p-6 hover:border-purple/30 transition-colors"
              >
                <h3 className="font-fraunces text-lg mb-3">{service.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ninta Publishing ──────────────────────────────────────────────────── */}
      <section id="ninta-publishing" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Publishing Division
            </p>
            <h2 className="font-fraunces text-4xl font-light mb-6">Ninta Publishing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Ninta Publishing produces books that function as intellectual infrastructure —
              ideas built to last, arguments designed to be returned to, frameworks intended
              for institutional use. We also offer publishing services to academics.
            </p>
          </div>

          {/* Books museum banner */}
          <div className="relative w-full h-56 md:h-72 rounded-sm overflow-hidden mb-12">
            <Image
              src="/company%20resources/books_museum.jpeg"
              alt="Solomon Atah — Published Works"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-6">
              <p className="text-white font-fraunces text-2xl font-light">Our Titles</p>
            </div>
          </div>

          {/* Books */}
          <div id="books">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {BOOKS.map((book) => (
                <div key={book.title} className="group border border-border rounded-sm p-6 hover:border-purple/30 transition-colors flex flex-col">
                  {book.image ? (
                    <div className="relative w-full aspect-[2/3] rounded-sm overflow-hidden mb-5 shadow-md group-hover:shadow-lg transition-shadow">
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      />
                    </div>
                  ) : (
                    <div className="w-full aspect-[2/3] rounded-sm bg-muted/30 border border-border mb-5 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Cover coming soon</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-fraunces text-lg leading-snug">{book.title}</h3>
                    <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                      {book.status}
                    </span>
                  </div>
                  {book.subtitle && (
                    <p className="text-xs text-gold mb-2 font-medium">{book.subtitle}</p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {book.description}
                  </p>
                  <a href="#" className="text-sm text-purple hover:underline font-medium mt-auto">
                    Order →
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Publishing Services */}
          <div className="mt-14 p-8 border border-border rounded-sm bg-muted/20">
            <h3 className="font-fraunces text-2xl mb-4">Publishing Services</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mb-4">
              We work with academics and scholars to develop, edit, design, and publish works
              that translate complex scholarship into durable public documents. Enquiries welcome.
            </p>
            <Link href="/contact" className="text-sm text-purple hover:underline font-medium">
              Publishing enquiries →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mission strip ─────────────────────────────────────────────────────── */}
      <section className="bg-purple text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-6">
              Our Approach
            </p>
            <p className="font-fraunces text-2xl md:text-3xl font-light leading-relaxed">
              We build ideas that endure, translate complex scholarship into public intelligence,
              and construct narrative systems that shape institutions rather than merely respond
              to them.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
