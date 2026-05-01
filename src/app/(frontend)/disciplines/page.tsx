import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from '@/lib/payload/getPayload'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Disciplines',
  description:
    'Browse scholarly conversations by academic discipline. From economics to public health, law to philosophy.',
}

export default async function DisciplinesPage() {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'disciplines',
    sort: 'order',
    limit: 50,
  })

  // Get conversation count per discipline
  type DisciplineWithCount = (typeof result.docs)[number] & { count: number }
  const disciplinesWithCounts: DisciplineWithCount[] = await Promise.all(
    result.docs.map(async (discipline) => {
      const count = await payload.count({
        collection: 'conversations',
        where: {
          and: [
            { 'disciplines.slug': { equals: discipline.slug } },
            { status: { equals: 'published' } },
          ],
        },
      })
      return { ...discipline, count: count.totalDocs } as DisciplineWithCount
    }),
  )

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
        {disciplinesWithCounts.map((discipline) => (
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

      {result.docs.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">
            Disciplines will appear here as the archive grows.
          </p>
        </div>
      )}
    </div>
  )
}
