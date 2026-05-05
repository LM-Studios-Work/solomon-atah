import type { Metadata } from 'next'
import { ProposalForm } from '@/components/sections/ProposalForm'

export const metadata: Metadata = {
  title: 'Propose a Conversation',
  description:
    'Propose a scholarly conversation for the Solomon Atah Podcast. We invite PhD holders and PhD candidates whose research speaks to questions of broad public significance.',
}

export default function ProposePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid lg:grid-cols-3 gap-16">
        {/* Header & context */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
              Join the Archive
            </p>
            <h1 className="font-fraunces text-4xl md:text-5xl font-light leading-tight mb-6">
              Propose a Conversation
            </h1>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We are looking for PhD holders and PhD candidates whose research speaks to
                questions of broad public significance, particularly (but not exclusively)
                scholars working on Africa and the Global South.
              </p>
              <p>
                This is not an application to be on a podcast. It is a proposal for a scholarly
                conversation to be commissioned, recorded, and archived as part of a permanent
                public record.
              </p>
              <p>
                We read every proposal carefully. If your research is a strong fit, we will be
                in touch.
              </p>
            </div>

            {/* What we look for */}
            <div className="mt-8 p-5 border border-border rounded-sm">
              <h2 className="font-fraunces text-lg mb-4">What we look for</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'Original research with a clear, defensible argument',
                  'Public significance, the work speaks to real questions',
                  'Africa or Global South focus (preferred, not required)',
                  'Willingness to engage a non-specialist audience seriously',
                  'A PhD, or enrolment in a doctoral programme',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gold mt-0.5 flex-shrink-0">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <ProposalForm />
        </div>
      </div>
    </div>
  )
}
