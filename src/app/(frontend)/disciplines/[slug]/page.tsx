import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDisciplineBySlug, getDisciplines, getConversationsByDiscipline } from '@/lib/data'
import { ConversationCard } from '@/components/sections/ConversationCard'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const discipline = getDisciplineBySlug(slug)
  if (!discipline) return { title: 'Discipline Not Found' }
  return {
    title: discipline.name,
    description:
      discipline.description ||
      `Browse all scholarly conversations in ${discipline.name} on the Solomon Atah Podcast.`,
  }
}

export function generateStaticParams() {
  return getDisciplines().map((d) => ({ slug: d.slug }))
}

export default async function DisciplinePage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page: pageStr } = await searchParams

  const discipline = getDisciplineBySlug(slug)
  if (!discipline) notFound()

  const page = parseInt(pageStr || '1', 10)
  const result = getConversationsByDiscipline(slug, page)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/disciplines" className="hover:text-foreground transition-colors">
          Disciplines
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{discipline.name}</span>
      </nav>

      <header className="mb-12 pb-8 border-b border-border">
        {discipline.icon && (
          <span className="text-4xl mb-4 block" role="presentation">
            {discipline.icon}
          </span>
        )}
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
          Discipline
        </p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light mb-4">{discipline.name}</h1>
        {discipline.description && (
          <p className="text-lg text-muted-foreground max-w-2xl">{discipline.description}</p>
        )}
        <p className="text-sm text-muted-foreground mt-4">
          {result.totalDocs} conversation{result.totalDocs !== 1 ? 's' : ''} in this discipline
        </p>
      </header>

      {result.docs.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground mb-4">
            No conversations in this discipline yet. Check back soon.
          </p>
          <Link href="/propose" className="text-purple hover:underline text-sm font-medium">
            Propose a conversation →
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.docs.map((conv) => (
              <ConversationCard key={conv.id} conversation={conv} />
            ))}
          </div>

          {result.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {page > 1 && (
                <Link
                  href={`/disciplines/${slug}?page=${page - 1}`}
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
                  href={`/disciplines/${slug}?page=${page + 1}`}
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
  )
}
