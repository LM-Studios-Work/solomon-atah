import type { Metadata } from 'next'
import { PartnerForm } from '@/components/sections/PartnerForm'

export const metadata: Metadata = {
  title: 'Partner With Us',
  description:
    'Support the production of publicly accessible scholarly conversations. Partnership opportunities for institutions, foundations, and sponsors.',
}

export default function PartnerPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid lg:grid-cols-3 gap-16">
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Collaboration
            </p>
            <h1 className="font-fraunces text-4xl md:text-5xl font-light leading-tight mb-6">
              Partner With Us
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Solomon Atah Podcast is an independent, public-interest academic media
                institution. We are open to partnerships that advance the accessibility and reach
                of rigorous scholarship.
              </p>
              <p>
                We work with universities, research institutes, foundations, think tanks, and
                other mission-aligned organisations.
              </p>
            </div>

            <div className="mt-8 space-y-4">
              <h2 className="font-fraunces text-lg">Partnership types</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'Institutional sponsorship of conversation series',
                  'Research collaboration and co-production',
                  'Speaking engagements and keynote appearances',
                  'Media partnerships and syndication',
                  'Grant and foundation funding',
                  'Academic collaboration agreements',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5 flex-shrink-0">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <PartnerForm />
        </div>
      </div>
    </div>
  )
}
