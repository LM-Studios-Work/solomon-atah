import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getConversationBySlug, getPublishedConversations } from '@/lib/data'
import { YouTubePlayer } from '@/components/sections/YouTubePlayer'
import { CitationBlock } from '@/components/sections/CitationBlock'
import { formatDate, formatDuration, getYouTubeThumbnail } from '@/lib/utils'
import { SITE_URL } from '@/lib/seo/buildMetadata'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const conv = getConversationBySlug(slug)
  if (!conv) return { title: 'Conversation Not Found' }

  const thumbnailUrl = conv.youtubeThumbnailUrl || getYouTubeThumbnail(conv.youtubeId, 'maxres')

  return {
    title: conv.title,
    description: conv.excerpt || undefined,
    openGraph: {
      title: conv.title,
      description: conv.excerpt || undefined,
      type: 'article',
      images: [{ url: thumbnailUrl, width: 1280, height: 720 }],
    },
  }
}

export function generateStaticParams() {
  return getPublishedConversations().map((c) => ({ slug: c.slug }))
}

export default async function ConversationPage({ params }: Props) {
  const { slug } = await params
  const conv = getConversationBySlug(slug)
  if (!conv) notFound()

  const thumbnailUrl = conv.youtubeThumbnailUrl || getYouTubeThumbnail(conv.youtubeId, 'maxres')
  const pageUrl = `${SITE_URL}/conversations/${conv.slug}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: conv.title,
    description: conv.excerpt || conv.title,
    thumbnailUrl,
    uploadDate: conv.publishedAt,
    embedUrl: `https://www.youtube.com/embed/${conv.youtubeId}`,
    url: pageUrl,
    ...(conv.duration && {
      duration: `PT${Math.floor(conv.duration / 60)}M${conv.duration % 60}S`,
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/conversations" className="hover:text-foreground transition-colors">
            Conversations
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{conv.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Main column */}
          <div className="lg:col-span-2">
            {/* Disciplines */}
            {conv.disciplines.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {conv.disciplines.map((d) => (
                  <Link key={d.id} href={`/disciplines/${d.slug}`} className="discipline-tag hover:bg-purple/10">
                    {d.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-fraunces text-4xl md:text-5xl font-light leading-tight mb-4">
              {conv.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
              <time dateTime={conv.publishedAt || ''}>{formatDate(conv.publishedAt)}</time>
              {conv.duration && (
                <span className="flex items-center gap-1">
                  <span aria-hidden>⏱</span>
                  {formatDuration(conv.duration)}
                </span>
              )}
            </div>

            {/* Video player */}
            <div className="mb-10">
              <YouTubePlayer videoId={conv.youtubeId} title={conv.title} thumbnailUrl={thumbnailUrl} />
            </div>

            {/* Excerpt / lead */}
            {conv.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-light border-l-4 border-gold pl-5">
                {conv.excerpt}
              </p>
            )}

            {/* Editorial summary */}
            {conv.editorialSummary && (
              <section className="mb-10">
                <h2 className="font-fraunces text-2xl mb-4">About This Conversation</h2>
                <p className="prose-editorial text-muted-foreground leading-relaxed">
                  {conv.editorialSummary}
                </p>
              </section>
            )}

            {/* Timestamps */}
            {conv.timestamps && conv.timestamps.length > 0 && (
              <section className="mb-10">
                <h2 className="font-fraunces text-2xl mb-4">Chapter Markers</h2>
                <ol className="space-y-2">
                  {conv.timestamps.map((ts, i) => (
                    <li key={i} className="flex items-start gap-4 py-2 border-b border-border last:border-0">
                      <a
                        href={`https://www.youtube.com/watch?v=${conv.youtubeId}&t=${ts.time}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-purple hover:underline flex-shrink-0"
                      >
                        {ts.time}
                      </a>
                      <span className="text-sm">{ts.label}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Further reading */}
            {conv.furtherReading && conv.furtherReading.length > 0 && (
              <section className="mb-10">
                <h2 className="font-fraunces text-2xl mb-4">Further Reading</h2>
                <ul className="space-y-4">
                  {conv.furtherReading.map((item, i) => (
                    <li key={i} className="flex gap-3 py-3 border-b border-border last:border-0">
                      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground flex-shrink-0 mt-0.5 w-16">
                        {item.type}
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          {item.url ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple hover:underline"
                            >
                              {item.title}
                            </a>
                          ) : (
                            item.title
                          )}
                        </p>
                        {(item.author || item.year) && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {[item.author, item.year].filter(Boolean).join(' · ')}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Citation */}
            {conv.publishedAt && (
              <section className="mb-10">
                <h2 className="font-fraunces text-2xl mb-4">Cite This Conversation</h2>
                <CitationBlock
                  guestName={conv.scholars.map((s) => s.name).join(' & ') || 'Guest Scholar'}
                  title={conv.title}
                  publishedAt={conv.publishedAt}
                  url={pageUrl}
                />
              </section>
            )}

            {/* Disclaimer */}
            <div className="p-4 border border-border rounded-sm bg-muted/20 text-xs text-muted-foreground">
              The views expressed by guests are their own and do not represent the position of The
              Solomon Atah Podcast or its host.
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Scholar profiles */}
              {conv.scholars.map((scholar) => (
                <div key={scholar.id} className="border border-border rounded-sm p-5">
                  <div className="flex items-start gap-4 mb-4">
                    {scholar.photo ? (
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                        <Image
                          src={scholar.photo.url}
                          alt={scholar.photo.alt || scholar.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-purple/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-fraunces text-xl text-purple font-bold">
                          {scholar.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-fraunces text-lg leading-tight">{scholar.name}</h3>
                      {scholar.title && (
                        <p className="text-xs text-muted-foreground mt-0.5">{scholar.title}</p>
                      )}
                      {scholar.institution && (
                        <p className="text-xs text-muted-foreground">
                          {scholar.institution.shortName || scholar.institution.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {scholar.researchFocus && (
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {scholar.researchFocus}
                    </p>
                  )}

                  {scholar.links && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {scholar.links.googleScholar && (
                        <a href={scholar.links.googleScholar} target="_blank" rel="noopener noreferrer" className="text-xs text-purple hover:underline">
                          Google Scholar
                        </a>
                      )}
                      {scholar.links.orcid && (
                        <a href={scholar.links.orcid} target="_blank" rel="noopener noreferrer" className="text-xs text-purple hover:underline">
                          ORCID
                        </a>
                      )}
                      {scholar.links.website && (
                        <a href={scholar.links.website} target="_blank" rel="noopener noreferrer" className="text-xs text-purple hover:underline">
                          Website
                        </a>
                      )}
                    </div>
                  )}

                  <Link href={`/scholars/${scholar.slug}`} className="text-xs text-purple hover:underline font-medium">
                    Full profile →
                  </Link>
                </div>
              ))}

              {/* Share */}
              <div className="border border-border rounded-sm p-5">
                <h3 className="font-fraunces text-base mb-3">Share</h3>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(conv.title)}&url=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Share on X / Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Share on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
