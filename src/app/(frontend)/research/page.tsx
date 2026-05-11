import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Zap, Building2, Mail, Microscope, BookOpen, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Research & Publishing, Solomon Atah Pty Ltd',
  description:
    'NinTA Research and Ninta Publishing: building narrative intelligence, institutional critique, and publishing intellectual infrastructure.',
}

interface ServiceData {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  themes: string[]
}

const services: ServiceData[] = [
  {
    id: 'narrative-analysis',
    title: 'Narrative Analysis',
    description:
      'Examine the deep currents of the narratives that lie at the center of cultural, social, and governmental systems. We analyze and illuminate the governing stories that shape institutions.',
    icon: <Zap className="w-8 h-8" />,
    themes: [
      'How stories structure power',
      'Institutional narrative mapping',
      'Media knowledge and public discourse',
      'Storytelling as strategy',
    ],
  },
  {
    id: 'institutional-culture',
    title: 'Institutional Culture',
    description:
      'Organisations often struggle to understand their own cultures. We work with institutions to map the formal and informal structures that determine how they actually operate.',
    icon: <Building2 className="w-8 h-8" />,
    themes: ['Organisational structure and process', 'Power analysis', 'Culture mapping', 'Institutional diagnostics'],
  },
  {
    id: 'letters-reminders',
    title: 'Letters: Reminders',
    description:
      'Institutional memory is always incomplete and contested. We work with organisations to document their own history and institutionalise critical insights.',
    icon: <Mail className="w-8 h-8" />,
    themes: [],
  },
  {
    id: 'accentological-signacs',
    title: 'Accentological Signacs',
    description:
      'Accentological signac is a term which we term for the distinct semiotic and linguistic registers of institutions and formal organizations. These include institutions&apos; operational semantics.',
    icon: <Microscope className="w-8 h-8" />,
    themes: [],
  },
]

const publishingServices = [
  { title: 'Scenario Analysis', description: 'We help develop complex institutional scenarios and strategic planning frameworks.' },
  { title: 'Institutional Culture', description: 'Deep analysis of organizational dynamics, power structures, and cultural patterns.' },
  { title: 'Letters: Donations', description: 'Documentation and institutional archiving of organizational knowledge.' },
  { title: 'Accimistian Ugesns', description: 'Strategic organizational development and institutional capabilities.' },
  { title: 'Accord livework', description: 'Analysis of organizational governance and institutional frameworks.' },
  { title: 'Network Services', description: 'Building and strengthening institutional networks and partnerships.' },
]

function ServiceCard({ service }: { service: ServiceData }) {
  return (
    <article className="flex flex-col rounded-sm border border-border overflow-hidden hover:border-purple/40 hover:shadow-sm transition-all group">
      <div className="flex items-start gap-5 px-7 py-7 bg-[#2d1229]">
        <span className="text-gold mt-0.5 shrink-0">{service.icon}</span>
        <h2 className="font-fraunces text-xl font-light leading-snug text-white">
          {service.title}
        </h2>
      </div>

      <div className="flex flex-col flex-1 px-7 py-7 gap-5 bg-card">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {service.description}
        </p>

        {service.themes.length > 0 && (
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Keynote Themes
            </p>
            <ul className="space-y-1.5">
              {service.themes.map((theme) => (
                <li key={theme} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-gold mt-0.5 leading-none">–</span>
                  {theme}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-auto pt-2">
          <Link
            href="/contact"
            className="text-sm font-medium text-gold hover:text-gold/80 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </article>
  )
}

export default function ResearchPage() {
  return (
    <main className="w-full bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-end overflow-hidden">
        {/* Background Image */}
        <Image
          src="/company resources/research hero.jpg"
          alt="Academic research and publishing"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2d1229]/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 container max-w-7xl px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-6">
              RESEARCH & PUBLISHING
            </p>
            <h1 className="font-fraunces text-5xl md:text-6xl font-light text-white mb-6 leading-tight">
              Research & Publishing
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-xl">
              Books and research positioned as intellectual infrastructure. We produce knowledge designed not for momentary visibility but for generational continuity.
            </p>
          </div>
        </div>
      </section>

      {/* NinTA Research Section */}
      <section className="bg-card border-b border-border">
        <div className="container max-w-7xl px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Column - Text */}
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-6">
                NINTA RESEARCH
              </p>
              <h2 className="font-fraunces text-3xl md:text-4xl font-light text-foreground mb-8">
                NinTA Research
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                NinTA, Narrative Intelligence Africa, is the analytical engine of Solomon Atah Pty Ltd. We conduct narrative-focused research for institutions, governments, and organisations seeking to understand and reshape the stories that govern them. Our work bridges academic rigour and strategic application.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Enquire about research collaboration
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-purple text-white text-sm font-medium rounded hover:bg-purple/90 transition-colors"
              >
                Enquire about research collaboration →
              </Link>
            </div>

            {/* Right Column - Images Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted rounded overflow-hidden aspect-square">
                <Image
                  src="/company resources/ninta.jpeg"
                  alt="NinTA Research"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-muted rounded overflow-hidden aspect-square">
                <Image
                  src="/company resources/africa.jpeg"
                  alt="Africa research"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-muted rounded overflow-hidden aspect-square col-span-2">
                <Image
                  src="/company resources/books_museum.jpeg"
                  alt="Research illustration"
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works / Ninta Publishing */}
      <section className="bg-background border-b border-border">
        <div className="container max-w-7xl px-6 py-16 md:py-24">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-6">
            FEATURED WORKS
          </p>
          <h2 className="font-fraunces text-3xl md:text-4xl font-light text-foreground mb-12">
            Ninta Publishing
          </h2>

          {/* Book Carousel */}
          <div className="mb-16 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex gap-6 min-w-min">
              {['book.jpeg', 'book_2.jpeg', 'book_3.jpeg', 'book_2_back.jpeg'].map((book, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-48 h-64 bg-muted rounded shadow-sm hover:shadow-md transition-shadow"
                >
                  <Image
                    src={`/company resources/${book}`}
                    alt={`Book ${idx + 1}`}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-12">
            {[0, 1, 2, 3].map((idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === 0 ? 'bg-purple w-8' : 'bg-border'
                }`}
                aria-label={`Go to book ${idx + 1}`}
              />
            ))}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Ninta Publishing produces books that function as intellectual infrastructure - ideas built to last, arguments designed to be returned to, frameworks intended for institutional use. We also offer publishing services to academics.
          </p>
        </div>
      </section>

      {/* Featured Book Pair */}
      <section className="bg-background border-b border-border">
        <div className="container max-w-7xl px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-96 bg-gradient-to-br from-purple/10 to-gold/5 rounded overflow-hidden">
              <Image
                src="/company resources/book_2_cover.jpeg"
                alt="University Dynamics"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="font-fraunces text-2xl text-white font-light">University Dynamics</h3>
              </div>
            </div>
            <div className="relative h-96 bg-gradient-to-br from-purple/10 to-gold/5 rounded overflow-hidden">
              <Image
                src="/company resources/book.jpeg"
                alt="The University of Money"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="font-fraunces text-2xl text-white font-light">The University of Money</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publishing Services */}
      <section className="bg-card border-b border-border">
        <div className="container max-w-7xl px-6 py-16 md:py-24">
          <h2 className="font-fraunces text-3xl md:text-4xl font-light text-foreground mb-6">
            Publishing Services
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-12">
            We work with academics and scholars to develop, edit, design, and publish works that translate complex scholarship into durable public documents. Enquiries welcome.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {publishingServices.map((service, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="bg-background border border-border rounded p-8">
            <h3 className="font-fraunces text-xl text-foreground mb-4">Publishing Services</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              We work with academics and scholars to develop, edit, design, and publish works that translate complex scholarship into durable public documents.
            </p>
            <Link href="/contact" className="text-sm text-purple hover:underline block mb-6">
              Publishing enquiries →
            </Link>
            <button className="w-full px-6 py-3 bg-purple text-white text-sm font-medium rounded hover:bg-purple/90 transition-colors">
              Publishing with us...
            </button>
          </div>
        </div>
      </section>

      {/* Mission Strip */}
      <section className="bg-[#2d1229] py-20 md:py-28">
        <div className="container max-w-7xl px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-gold mb-8">
              Our Approach
            </p>
            <p className="font-fraunces text-3xl md:text-4xl font-light leading-relaxed text-white/90 text-pretty">
              We build ideas that endure, translate complex scholarship into public intelligence, and construct narrative systems that shape institutions rather than merely respond to them.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
