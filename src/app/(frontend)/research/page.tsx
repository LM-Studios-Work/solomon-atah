import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  BookOpen,
  Globe,
  Mail,
  BarChart2,
  Building2,
  Network,
  Landmark,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research & Publishing, Solomon Atah Pty Ltd',
  description:
    'NinTA Research and Ninta Publishing: building narrative intelligence, institutional critique, and publishing intellectual infrastructure.',
}

/* ─── Data ──────────────────────────────────────────────────────────────── */

const RESEARCH_SERVICES = [
  {
    icon: BarChart2,
    name: 'Narrative Analysis',
    description:
      'Systematic examination of the stories institutions, governments, and media use to frame reality, identifying structure, intent, and consequence.',
  },
  {
    icon: Building2,
    name: 'Institutional Culture',
    description:
      'Rigorous evaluation of how institutions construct and maintain power through narrative, and where those narratives fracture under scrutiny.',
  },
  {
    icon: Mail,
    name: 'Letters: Despatches',
    description:
      'Curated editorial dispatches from across the African intellectual landscape, delivered to scholars, institutions, and decision-makers.',
  },
  {
    icon: Globe,
    name: 'Accentological Signacs',
    description:
      'Diagnostic readings of cultural and linguistic signalling systems that shape public perception and institutional credibility.',
  },
  {
    icon: Network,
    name: 'Network: Sigmatic',
    description:
      'Mapping the connective tissue of idea-networks, tracing how narratives travel, mutate, and accrue authority across institutions.',
  },
]

const PUBLISHING_SERVICES = [
  {
    icon: BarChart2,
    name: 'Narrative Analysis',
    description:
      'As narrative analysis works assess, communicate language and expressions framing consciousness across domains, relation, socialisation, and key communities.',
  },
  {
    icon: Building2,
    name: 'Institutional Culture',
    description:
      'Topics emissary concerns data sources and connexions collaborative works on old commissions and policies of assertions.',
  },
  {
    icon: Mail,
    name: 'Letters, Donations',
    description:
      'Assessment of alliances advisors interpreting professional, its lines and aggregating and compose to so perennial constructions.',
  },
  {
    icon: Landmark,
    name: 'Accreditation Urgents',
    description:
      "Registering early underlying/guiding instruction's system solid/government process and more management/succinct, and resources.",
  },
  {
    icon: BookOpen,
    name: 'Accord Liveriwork',
    description:
      'Analyses construct and evaluations high resolution balance in/document systems, objectives, transformations, diversity, and priorities.',
  },
  {
    icon: Users,
    name: 'Network Services',
    description:
      'Assessment of solutions locutions intelligence, technology advancement collections, cohesive/skills and organised assess.',
  },
]

const BOOKS = [
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
    title: 'University Dynamics',
    subtitle: null,
    image: '/company%20resources/books_museum.jpeg',
    status: 'Available',
    description:
      'A critical examination of the sociological forces structuring knowledge production inside contemporary African universities.',
  },
  {
    title: 'The University of Money',
    subtitle: 'Reforming Education From the Inside Out',
    image: '/company%20resources/book_2.jpeg',
    status: 'Available',
    description:
      'A critical examination of the financialisation of higher education and its consequences for knowledge production.',
  },
]

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function ResearchPage() {
  return (
    <div className="bg-background text-foreground">
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#2d1229] border-b border-gold/20">
        {/* Background map texture */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/company%20resources/africa.jpeg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d1229]/95 via-[#2d1229]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 min-h-[68vh]">
            {/* Left: Text */}
            <div className="flex flex-col justify-end pb-16 pt-36">
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-5">
                Ninta Publishing
              </p>
              <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-white mb-6 text-pretty">
                Research &amp; Publishing
              </h1>
              <p className="text-lg text-white/75 leading-relaxed max-w-xl">
                Frounti and nunoc wie provides nkitin to bter ffoe of ssorb ofono. We
                neofe prevtoir wide flauliting cultures for one meevary addibility can for
                get on orcaise into the citv.
              </p>
            </div>

            {/* Right: Brand logos stacked */}
            <div className="hidden lg:flex flex-col justify-end pb-16 pt-36 gap-4 items-end">
              <div className="relative w-full max-w-xs rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/company%20resources/ninta.jpeg"
                  alt="NinTA – Narrative Intelligence Africa"
                  width={480}
                  height={260}
                  className="w-full h-52 object-cover"
                  sizes="480px"
                />
              </div>
              <div className="relative w-full max-w-xs rounded-sm overflow-hidden shadow-2xl">
                <Image
                  src="/company%20resources/africa.jpeg"
                  alt="Minority Views from Africa"
                  width={480}
                  height={200}
                  className="w-full h-44 object-cover"
                  sizes="480px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NINTA RESEARCH ────────────────────────────────────────────────── */}
      <section id="ninta-research" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Top: two-col intro */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-4">
                Ninta Research
              </p>
              <h2 className="font-fraunces text-4xl font-light mb-6">NinTA Research</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NinTA&apos;s research / dtaerosed is new or kere ati ama mause of Solomon Adar Fs, Ld.
                stte ot fut fractibes aba wie kners dm o moavest ry you ai&apos;ti stbac, and
                algmors and pablity ot audit alsot areat borners barexys oe may as jolie ments.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Pre with global in temas, guts, and at grope agr angtore.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Ensure measurement of narrate →
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 relative w-full rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/company%20resources/ninta.jpeg"
                  alt="NinTA – Narrative Intelligence Africa"
                  width={640}
                  height={280}
                  className="w-full h-56 object-cover"
                  sizes="640px"
                />
              </div>
              <div className="relative w-full rounded-sm overflow-hidden shadow-md">
                <Image
                  src="/company%20resources/africa.jpeg"
                  alt="Narrative Intelligence Africa"
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                  sizes="300px"
                />
              </div>
              <div className="relative w-full rounded-sm overflow-hidden shadow-md bg-[#2d1229] flex items-center justify-center p-4">
                <Image
                  src="/company%20resources/logo%20solomon%20atah%20main%20company.jpeg"
                  alt="Solomon Atah"
                  width={160}
                  height={100}
                  className="w-full h-40 object-contain"
                  sizes="160px"
                />
              </div>
            </div>
          </div>

          {/* Service cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESEARCH_SERVICES.map((service) => {
              const Icon = service.icon
              return (
                <div
                  key={service.name}
                  className="border border-border rounded-sm p-6 hover:border-purple/40 hover:shadow-sm transition-all group"
                >
                  <div className="mb-4 w-12 h-12 rounded-full bg-purple/8 border border-purple/15 flex items-center justify-center group-hover:bg-purple/12 transition-colors">
                    <Icon className="w-5 h-5 text-purple" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-fraunces text-lg mb-3">{service.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURED WORKS / NINTA PUBLISHING ────────────────────────────── */}
      <section id="ninta-publishing" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-4">
              Featured Works
            </p>
            <h2 className="font-fraunces text-4xl font-light mb-4">Ninta Publishing</h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Ninka flie biling is a meita c nuka cad, storetds as sand adseural sazas are —
              wnie, saed tn say, and imports of capen followed srice itv is usecarfhat then
              sot its meost areas, ure and curiosty ansewly gtibs me to got mecifulty.
            </p>
          </div>

          {/* Books horizontal scroll carousel */}
          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="flex gap-5 overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide">
              {BOOKS.map((book) => (
                <div
                  key={book.title}
                  className="snap-start shrink-0 w-56 md:w-64 group"
                >
                  <div className="relative w-full aspect-[2/3] rounded-sm overflow-hidden shadow-lg mb-3 group-hover:shadow-xl transition-shadow">
                    {book.image ? (
                      <Image
                        src={book.image}
                        alt={book.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="256px"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted/40 flex items-center justify-center">
                        <span className="text-xs text-muted-foreground px-4 text-center">
                          {book.title}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-fraunces text-sm leading-snug mb-1">{book.title}</h3>
                  {book.subtitle && (
                    <p className="text-xs text-gold leading-snug">{book.subtitle}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-purple' : 'bg-border'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURE BOOKS PAIR ────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {BOOKS.slice(3).map((book) => (
              <div
                key={book.title}
                className="group relative rounded-sm overflow-hidden shadow-lg aspect-[3/4] hover:shadow-xl transition-shadow cursor-pointer"
              >
                {book.image && (
                  <Image
                    src={book.image}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-fraunces text-xl text-white font-semibold leading-tight mb-1">
                    {book.title.toUpperCase()}
                  </p>
                  <p className="text-xs text-white/75 font-medium tracking-wide uppercase">
                    Solomon Attah
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground tracking-widest uppercase">
            Learn More
          </p>
        </div>
      </section>

      {/* ── PUBLISHING SERVICES ───────────────────────────────────────────── */}
      <section id="publishing-services" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-fraunces text-4xl font-light mb-10">Publishing Services</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Services grid 3x2 */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
              {PUBLISHING_SERVICES.map((service) => {
                const Icon = service.icon
                return (
                  <div key={service.name} className="flex gap-4">
                    <div className="shrink-0 mt-0.5">
                      <div className="w-9 h-9 rounded-full bg-purple/10 border border-purple/20 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-purple" strokeWidth={1.5} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-fraunces text-base mb-1.5">{service.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* CTA box */}
            <div className="lg:col-span-1">
              <div className="border border-border rounded-sm p-8 sticky top-24">
                <h3 className="font-fraunces text-xl mb-4">Publishing Services</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  We work with academics and scholars to develop, edit, design, and publish works
                  that the most solutions do floss else for pasts main.
                </p>
                <Link
                  href="/contact"
                  className="text-sm text-purple hover:underline block mb-6"
                >
                  Publishing us →
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-5 py-3 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
                >
                  Publishing with us...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION STRIP ─────────────────────────────────────────────────── */}
      <section className="bg-[#2d1229] text-white border-b border-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-8">
              Our Proufe
            </p>
            <p className="font-fraunces text-3xl md:text-4xl font-light leading-relaxed text-white/90 text-pretty">
              We build ideas that enclose Inceolate complex scholarship innecatable intelligence,
              and consemnot natworks revrems that shape institutions mather has morely respond to
              them.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
