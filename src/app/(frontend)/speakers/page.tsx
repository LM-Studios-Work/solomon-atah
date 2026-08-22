import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Mic, Presentation, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Academic Keynote Speakers & Experts Bureau',
  description:
    'The Solomon Atah Academic Keynote Speakers & Experts Bureau provides access to world-class scholars, thought leaders, and industry experts for events and media engagements.',
}

const SERVICES = [
  {
    name: 'Keynote Addresses',
    description:
      'Engaging, deeply researched presentations tailored to your audience. Our speakers distill years of scholarly inquiry into compelling narratives that offer fresh perspectives on industry trends, societal shifts, and global dynamics.',
    icon: Mic,
  },
  {
    name: 'Executive Briefings',
    description:
      'Private, intensive sessions for leadership teams and boards of directors. We provide direct access to leading minds who can unpack complex research and its strategic implications for your organization.',
    icon: Users,
  },
  {
    name: 'Panel Moderation & Curation',
    description:
      'Elevate your next conference or symposium with expert moderation. We design intellectually rigorous panel discussions and provide facilitators who ask the right questions to extract the highest value from your participants.',
    icon: Presentation,
  },
]

const EXPERTISE_AREAS = [
  'Global Political Economy',
  'Technology & Society',
  'African Futures',
  'Cultural Production & Memory',
  'Sustainable Infrastructure',
  'Media & Knowledge Systems',
  'Institutional Design',
  'Public Policy & Governance',
]

export default function SpeakersPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-[430px] overflow-hidden border-b border-border bg-purple text-white md:min-h-[500px]">
        <Image
          src="/company%20resources/academic%20hero.webp"
          alt="Academic Keynote Speakers"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-purple/72" />

        <div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl items-end px-4 pb-16 pt-24 sm:px-6 md:min-h-[500px] md:pb-20 lg:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
              Expertise &amp; Engagement
            </p>
            <h1 className="mb-6 font-fraunces text-5xl font-light leading-tight text-white md:text-7xl">
              Academic Keynote Speakers &amp; Experts Bureau
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-white/82 md:text-lg">
              Connecting organizations with world-class scholars, researchers, and thought leaders for
              high-impact speaking engagements and strategic insights.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-[1fr_350px] lg:gap-20">
            {/* Left Column */}
            <div className="space-y-20">
              {/* Elevating the Conversation */}
              <section id="about">
                <h2 className="mb-6 font-fraunces text-4xl font-light">Elevating the Conversation</h2>
                <div className="space-y-5 text-sm leading-7 text-muted-foreground md:text-base">
                  <p>
                    In an era defined by complex global challenges, organizations need more than just
                    inspiration—they need rigorous analysis, structural understanding, and
                    evidence-based insights. The Solomon Atah Academic Keynote Speakers and Experts
                    Bureau bridges the gap between the academy and the public square.
                  </p>
                  <p>
                    We curate a premier roster of leading academics, researchers, and intellectual
                    voices whose work speaks directly to the most pressing issues of our time. From
                    geopolitics and technology to culture and economics, our experts deliver keynote
                    addresses, moderate high-level panels, and provide strategic advisory services
                    that challenge conventional thinking and illuminate the path forward.
                  </p>
                  <div className="mt-8 border-l-2 border-purple pl-6 italic text-foreground">
                    <p className="font-fraunces text-2xl font-light leading-snug">
                      &ldquo;Knowledge that transforms must first be heard.&rdquo;
                    </p>
                  </div>
                </div>
              </section>

              {/* Our Services */}
              <section id="services">
                <h2 className="mb-8 font-fraunces text-4xl font-light">Our Services</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICES.map((service) => {
                    const Icon = service.icon
                    return (
                      <article
                        key={service.name}
                        className="rounded-sm border border-border bg-card p-6 shadow-[0_16px_30px_rgba(0,0,0,0.06)]"
                      >
                        <div className="mb-6 flex h-24 items-center justify-center border-b border-border text-gold">
                          <Icon className="h-12 w-12" strokeWidth={1.25} />
                        </div>
                        <h3 className="mb-3 font-fraunces text-lg font-light">{service.name}</h3>
                        <p className="text-sm leading-6 text-muted-foreground">
                          {service.description}
                        </p>
                      </article>
                    )
                  })}
                </div>
              </section>

              {/* Areas of Expertise */}
              <section id="expertise">
                <h2 className="mb-6 font-fraunces text-4xl font-light">Areas of Expertise</h2>
                <div className="mb-8 text-sm leading-7 text-muted-foreground md:text-base">
                  <p>
                    Our bureau features scholars and experts across a wide range of disciplines, with
                    a particular emphasis on forward-looking, structural analysis:
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {EXPERTISE_AREAS.map((area) => (
                    <div
                      key={area}
                      className="flex items-center space-x-3 rounded-sm border border-border bg-card p-4 shadow-sm transition-colors hover:border-gold/50"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold"></span>
                      <span className="text-sm font-medium text-foreground">{area}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              <div className="sticky top-24 space-y-8">
                {/* Request a Speaker CTA */}
                <div className="rounded-sm border border-purple bg-purple p-8 text-white shadow-xl">
                  <h3 className="mb-4 font-fraunces text-2xl font-light">Request a Speaker</h3>
                  <p className="mb-8 text-sm leading-relaxed text-white/80">
                    Let us help you find the right scholarly voice for your next event or strategic
                    initiative.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex w-full items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold text-purple transition-colors hover:bg-gold/90"
                  >
                    Inquire Now
                  </Link>
                </div>

                {/* For Academics CTA */}
                <div className="rounded-sm border border-border bg-card p-8 shadow-sm">
                  <h3 className="mb-4 font-fraunces text-2xl font-light">For Academics</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    Are you a researcher or scholar interested in joining our bureau? We are always
                    looking to expand our roster of transformative thinkers.
                  </p>
                  <Link
                    href="/propose"
                    className="inline-flex items-center text-sm font-semibold text-purple transition-colors hover:text-gold"
                  >
                    Submit your profile <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
