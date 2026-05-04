import type { Metadata } from 'next'
import Link from 'next/link'
import { queryConversations, getDisciplines } from '@/lib/data'
import { ConversationCard } from '@/components/sections/ConversationCard'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Conversations',
  description:
    'The complete archive of scholarly conversations — searchable and filterable by discipline, institution, region, and year.',
}

interface SearchParams {
  discipline?: string
  region?: string
  page?: string
}

const REGIONS = [
  { label: 'Sub-Saharan Africa', value: 'sub-saharan-africa' },
  { label: 'North Africa', value: 'north-africa' },
  { label: 'North America', value: 'north-america' },
  { label: 'Europe', value: 'europe' },
  { label: 'Asia-Pacific', value: 'asia-pacific' },
  { label: 'Latin America', value: 'latin-america-caribbean' },
  { label: 'Global', value: 'global' },
]

export default async function ConversationsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const page = parseInt(params.page || '1', 10)

  const allDisciplines = getDisciplines()
  const result = queryConversations({
    discipline: params.discipline,
    region: params.region,
    page,
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <header className="mb-12 pb-8 border-b border-border">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Archive</p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light mb-4">Conversations</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {result.totalDocs} scholarly conversations with researchers shaping our understanding of
          Africa and the world.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Discipline filter */}
            <div>
              <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">
                Discipline
              </h3>
              <div className="space-y-1">
                <FilterLink href="/conversations" active={!params.discipline} label="All disciplines" />
                {allDisciplines.map((d) => (
                  <FilterLink
                    key={d.id}
                    href={`/conversations?discipline=${d.slug}${params.region ? `&region=${params.region}` : ''}`}
                    active={params.discipline === d.slug}
                    label={d.name}
                  />
                ))}
              </div>
            </div>

            {/* Region filter */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3">
                Region
              </h3>
              <div className="space-y-1">
                <FilterLink
                  href={`/conversations${params.discipline ? `?discipline=${params.discipline}` : ''}`}
                  active={!params.region}
                  label="All regions"
                />
                {REGIONS.map((r) => (
                  <FilterLink
                    key={r.value}
                    href={`/conversations?region=${r.value}${params.discipline ? `&discipline=${params.discipline}` : ''}`}
                    active={params.region === r.value}
                    label={r.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {result.docs.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No conversations found for this filter.</p>
              <Link href="/conversations" className="text-purple hover:underline mt-2 inline-block text-sm">
                Clear filters
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {result.docs.map((conv) => (
                  <ConversationCard key={conv.id} conversation={conv} />
                ))}
              </div>

              {/* Pagination */}
              {result.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  {page > 1 && (
                    <Link
                      href={`/conversations?page=${page - 1}${params.discipline ? `&discipline=${params.discipline}` : ''}${params.region ? `&region=${params.region}` : ''}`}
                      className="px-4 py-2 text-sm border border-border rounded-sm hover:border-purple/40 transition-colors"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="px-4 py-2 text-sm text-muted-foreground">
                    Page {page} of {result.totalPages}
                  </span>
                  {page < result.totalPages && (
                    <Link
                      href={`/conversations?page=${page + 1}${params.discipline ? `&discipline=${params.discipline}` : ''}${params.region ? `&region=${params.region}` : ''}`}
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
