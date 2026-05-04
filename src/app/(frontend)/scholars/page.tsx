import type { Metadata } from 'next'
import Link from 'next/link'
import { queryScholars, getDisciplines } from '@/lib/data'
import { ScholarCard } from '@/components/sections/ScholarCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Scholars',
  description:
    'A directory of every scholar who has appeared on the Solomon Atah Podcast. Browse by discipline, institution, and country.',
}

interface SearchParams {
  discipline?: string
  region?: string
  page?: string
}

export default async function ScholarsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)

  const allDisciplines = getDisciplines()
  const result = queryScholars({
    discipline: params.discipline,
    region: params.region,
    page,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <header className="mb-12 pb-8 border-b border-border">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
          Scholar Directory
        </p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light mb-4">Scholars</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {result.totalDocs} publicly engaged scholars — researchers whose work has appeared on the
          podcast.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">
                Discipline
              </h3>
              <div className="space-y-1">
                <FilterLink href="/scholars" active={!params.discipline} label="All disciplines" />
                {allDisciplines.map((d) => (
                  <FilterLink
                    key={d.id}
                    href={`/scholars?discipline=${d.slug}`}
                    active={params.discipline === d.slug}
                    label={d.name}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* List */}
        <div className="flex-1">
          {result.docs.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No scholars found.</p>
              <Link href="/scholars" className="text-purple hover:underline mt-2 inline-block text-sm">
                Clear filters
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-border">
                {result.docs.map((scholar) => (
                  <ScholarCard key={scholar.id} scholar={scholar} />
                ))}
              </div>

              {/* Pagination */}
              {result.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {page > 1 && (
                    <Link
                      href={`/scholars?page=${page - 1}${params.discipline ? `&discipline=${params.discipline}` : ''}`}
                      className="px-4 py-2 text-sm border border-border rounded-sm hover:border-purple/40 transition-colors"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="text-sm text-muted-foreground px-4">
                    Page {page} of {result.totalPages}
                  </span>
                  {page < result.totalPages && (
                    <Link
                      href={`/scholars?page=${page + 1}${params.discipline ? `&discipline=${params.discipline}` : ''}`}
                      className="px-4 py-2 text-sm border border-border rounded-sm hover:border-purple/40 transition-colors"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      className={`block text-sm py-1 px-2 rounded-sm transition-colors ${
        active
          ? 'text-purple font-medium bg-purple/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
    >
      {label}
    </Link>
  )
}
