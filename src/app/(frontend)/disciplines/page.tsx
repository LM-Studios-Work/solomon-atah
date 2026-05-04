import type { Metadata } from 'next'
import Link from 'next/link'
import { getDisciplinesWithCounts } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Disciplines',
  description:
    'Browse scholarly conversations by academic discipline. From economics to public health, law to philosophy.',
}

export default function DisciplinesPage() {
  const disciplines = getDisciplinesWithCounts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
          Browse by Field
        </p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light mb-4">Disciplines</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Entry points into the archive organised by academic field.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {disciplines.map((discipline) => (
          <Link
            key={discipline.id}
            href={`/disciplines/${discipline.slug}`}
            className="group flex flex-col p-6 border border-border rounded-sm hover:border-purple/30 hover:bg-muted/30 transition-colors"
          >
            {discipline.icon && (
              <span className="text-3xl mb-4" role="presentation">
                {discipline.icon}
              </span>
            )}
            <h2 className="font-fraunces text-xl mb-2 group-hover:text-purple transition-colors">
              {discipline.name}
            </h2>
            {discipline.description && (
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {discipline.description}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-auto">
              {discipline.count} conversation{discipline.count !== 1 ? 's' : ''}
            </p>
          </Link>
        ))}
      </div>

      {disciplines.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">
            Disciplines will appear here as the archive grows.
          </p>
        </div>
      )}
    </div>
  )
}
