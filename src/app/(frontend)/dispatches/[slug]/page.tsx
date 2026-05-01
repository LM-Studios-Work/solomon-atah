import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from '@/lib/payload/getPayload'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()
  const result = await payload.find({
    collection: 'dispatches',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const dispatch = result.docs[0]
  if (!dispatch) return { title: 'Not Found' }
  return {
    title: dispatch.title,
    description: dispatch.excerpt || undefined,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'dispatches',
      where: { status: { equals: 'published' } },
      limit: 200,
    })
    return result.docs.map((d) => ({ slug: d.slug }))
  } catch {
    return []
  }
}

export default async function DispatchPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'dispatches',
    where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
  })

  const dispatch = result.docs[0]
  if (!dispatch) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/dispatches" className="hover:text-foreground transition-colors">Dispatches</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{dispatch.title}</span>
      </nav>

      <header className="mb-10 pb-8 border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          {dispatch.issue && (
            <span className="text-xs font-mono text-muted-foreground">#{String(dispatch.issue).padStart(3, '0')}</span>
          )}
          <span className="text-xs font-semibold uppercase tracking-wider text-gold">
            {dispatch.type}
          </span>
        </div>
        <h1 className="font-fraunces text-4xl md:text-5xl font-light leading-tight mb-4 text-balance">
          {dispatch.title}
        </h1>
        {dispatch.excerpt && (
          <p className="text-xl text-muted-foreground leading-relaxed">{dispatch.excerpt}</p>
        )}
        <time className="block text-sm text-muted-foreground mt-4">{formatDate(dispatch.publishedAt)}</time>
      </header>

      {/* Content */}
      <div className="prose-editorial text-muted-foreground">
        <p className="italic text-sm">[Dispatch content — managed in Payload CMS]</p>
      </div>

      {/* Related conversations */}
      {Array.isArray(dispatch.relatedConversations) && dispatch.relatedConversations.length > 0 && (
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="font-fraunces text-xl mb-4">Related Conversations</h2>
          <ul className="space-y-2">
            {dispatch.relatedConversations.map((conv) => {
              if (typeof conv !== 'object' || conv === null) return null
              return (
                <li key={conv.id}>
                  <Link
                    href={`/conversations/${conv.slug}`}
                    className="text-purple hover:underline text-sm"
                  >
                    {conv.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
