import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Academic Keynote Speakers & Experts Bureau',
  description:
    'The Solomon Atah Academic Keynote Speakers & Experts Bureau provides access to world-class scholars, thought leaders, and industry experts for events and media engagements.',
}

export default function SpeakersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Page header */}
      <header className="max-w-3xl mb-16 pb-16 border-b border-border">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
          Expertise & Engagement
        </p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
          Academic Keynote Speakers & Experts Bureau
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Connecting organizations with world-class scholars, researchers, and thought leaders for high-impact speaking engagements and strategic insights.
        </p>
      </header>

      <div className="grid lg:grid-cols-3 gap-16">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-16">
          <section id="about">
            <h2 className="font-fraunces text-3xl mb-6">Elevating the Conversation</h2>
            <div className="prose-editorial space-y-5 text-muted-foreground">
              <p>
                In an era defined by complex global challenges, organizations need more than just inspiration—they need rigorous analysis, structural understanding, and evidence-based insights. The Solomon Atah Academic Keynote Speakers and Experts Bureau bridges the gap between the academy and the public square.
              </p>
              <p>
                We curate a premier roster of leading academics, researchers, and intellectual voices whose work speaks directly to the most pressing issues of our time. From geopolitics and technology to culture and economics, our experts deliver keynote addresses, moderate high-level panels, and provide strategic advisory services that challenge conventional thinking and illuminate the path forward.
              </p>
              <blockquote className="pull-quote">
                &ldquo;Knowledge that transforms must first be heard.&rdquo;
              </blockquote>
            </div>
          </section>

          <section id="services">
            <h2 className="font-fraunces text-3xl mb-6">Our Services</h2>
            <div className="space-y-8">
              <div className="p-6 border border-border rounded-sm bg-muted/5">
                <h3 className="font-fraunces text-xl mb-3 text-foreground">Keynote Addresses</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Engaging, deeply researched presentations tailored to your audience. Our speakers distill years of scholarly inquiry into compelling narratives that offer fresh perspectives on industry trends, societal shifts, and global dynamics.
                </p>
              </div>
              <div className="p-6 border border-border rounded-sm bg-muted/5">
                <h3 className="font-fraunces text-xl mb-3 text-foreground">Executive Briefings</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Private, intensive sessions for leadership teams and boards of directors. We provide direct access to leading minds who can unpack complex research and its strategic implications for your organization.
                </p>
              </div>
              <div className="p-6 border border-border rounded-sm bg-muted/5">
                <h3 className="font-fraunces text-xl mb-3 text-foreground">Panel Moderation & Curation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Elevate your next conference or symposium with expert moderation. We design intellectually rigorous panel discussions and provide facilitators who ask the right questions to extract the highest value from your participants.
                </p>
              </div>
            </div>
          </section>

          <section id="expertise">
            <h2 className="font-fraunces text-3xl mb-6">Areas of Expertise</h2>
            <div className="prose-editorial text-muted-foreground mb-6">
              <p>
                Our bureau features scholars and experts across a wide range of disciplines, with a particular emphasis on forward-looking, structural analysis:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 not-prose">
              {[
                'Global Political Economy',
                'Technology & Society',
                'African Futures',
                'Cultural Production & Memory',
                'Sustainable Infrastructure',
                'Media & Knowledge Systems',
                'Institutional Design',
                'Public Policy & Governance',
              ].map((area) => (
                <div key={area} className="flex items-center space-x-3 p-4 border border-border rounded-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0"></span>
                  <span className="text-sm font-medium text-foreground">{area}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="sticky top-24 space-y-8">
            <div className="border border-border rounded-sm p-6 bg-purple/5">
              <h3 className="font-fraunces text-lg mb-3">Request a Speaker</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let us help you find the right scholarly voice for your next event or strategic initiative.
              </p>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center px-4 py-2 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
              >
                Inquire Now
              </Link>
            </div>

            <div className="border border-border rounded-sm p-6">
              <h3 className="font-fraunces text-lg mb-3">For Academics</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Are you a researcher or scholar interested in joining our bureau? We are always looking to expand our roster of transformative thinkers.
              </p>
              <Link
                href="/propose"
                className="text-sm text-purple hover:underline font-medium"
              >
                Submit your profile →
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
