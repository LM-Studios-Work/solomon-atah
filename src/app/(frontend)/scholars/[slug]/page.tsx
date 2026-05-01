import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload/getPayload'
import { ConversationCard } from '@/components/sections/ConversationCard'
import { getYouTubeThumbnail } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'scholars',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  })

  const scholar = result.docs[0]
  if (!scholar) return { title: 'Scholar Not Found' }

  return {
    title: scholar.name,
    description: scholar.researchFocus || `${scholar.name} — ${scholar.title || 'Scholar'}`,
  }
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const result = await payload.find({ collection: 'scholars', limit: 500 })
    return result.docs.map((s) => ({ slug: s.slug }))
  } catch {
    return []
  }
}

export default async function ScholarPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const scholarResult = await payload.find({
    collection: 'scholars',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 3,
  })

  const scholar = scholarResult.docs[0]
  if (!scholar) notFound()

  // Fetch this scholar's conversations
  const conversationsResult = await payload.find({
    collection: 'conversations',
    where: {
      and: [
        { 'scholars.slug': { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    sort: '-publishedAt',
    limit: 10,
    depth: 2,
  })

  const photo =
    typeof scholar.photo === 'object' && scholar.photo !== null ? scholar.photo : null
  const institution =
    typeof scholar.institution === 'object' && scholar.institution !== null
      ? scholar.institution
      : null
  const disciplines = Array.isArray(scholar.disciplines)
    ? scholar.disciplines.filter(
        (d): d is NonNullable<typeof d> => typeof d === 'object' && d !== null,
      )
    : []

  // Structured data: Person
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: scholar.name,
    jobTitle: scholar.title,
    ...(institution && { affiliation: { '@type': 'Organization', name: (institution as { name: string }).name } }),
    ...(scholar.links?.website && { url: scholar.links.website }),
    ...(scholar.links?.orcid && { identifier: scholar.links.orcid }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8">
          <Link href="/scholars" className="hover:text-foreground transition-colors">
            Scholars
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{scholar.name}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Sidebar — Scholar card */}
          <aside className="lg:order-last">
            <div className="sticky top-24 space-y-6">
              {/* Profile */}
              <div className="border border-border rounded-sm p-6">
                {/* Photo */}
                <div className="mb-5">
                  {photo ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted mx-auto">
                      <Image
                        src={(photo as { url: string }).url}
                        alt={(photo as { alt: string }).alt || scholar.name}
                        fill
                        className="object-cover"
                        sizes="96px"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-purple/10 flex items-center justify-center mx-auto">
                      <span className="font-fraunces text-3xl text-purple font-bold">
                        {scholar.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="font-fraunces text-xl text-center mb-1">{scholar.name}</h3>
                {scholar.title && (
                  <p className="text-sm text-muted-foreground text-center mb-1">{scholar.title}</p>
                )}
                {institution && (
                  <p className="text-sm font-medium text-center mb-4">
                    {(institution as { shortName?: string; name: string }).shortName ||
                      (institution as { name: string }).name}
                  </p>
                )}

                {disciplines.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {disciplines.map((d) => (
                      <Link key={d.id} href={`/disciplines/${d.slug}`} className="discipline-tag">
                        {d.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Links */}
                {scholar.links && (
                  <div className="border-t border-border pt-4 space-y-2">
                    {scholar.links.googleScholar && (
                      <ExternalLink href={scholar.links.googleScholar} label="Google Scholar" />
                    )}
                    {scholar.links.orcid && (
                      <ExternalLink href={scholar.links.orcid} label="ORCID" />
                    )}
                    {scholar.links.website && (
                      <ExternalLink href={scholar.links.website} label="Academic Website" />
                    )}
                    {scholar.links.twitter && (
                      <ExternalLink href={scholar.links.twitter} label="Twitter / X" />
                    )}
                    {scholar.links.linkedin && (
                      <ExternalLink href={scholar.links.linkedin} label="LinkedIn" />
                    )}
                    {scholar.links.researchgate && (
                      <ExternalLink href={scholar.links.researchgate} label="ResearchGate" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main */}
          <div className="lg:col-span-2">
            <h1 className="font-fraunces text-4xl md:text-5xl font-light leading-tight mb-8">
              {scholar.name}
            </h1>

            {/* Bio */}
            {scholar.bio && (
              <section className="mb-12">
                <h2 className="font-fraunces text-2xl mb-4">Biography</h2>
                <div className="prose-editorial text-muted-foreground">
                  {/* Payload rich text would be rendered here */}
                  <p className="italic text-sm text-muted-foreground">
                    [Full biography — managed in Payload CMS]
                  </p>
                </div>
              </section>
            )}

            {/* Research focus */}
            {scholar.researchFocus && (
              <section className="mb-12">
                <h2 className="font-fraunces text-2xl mb-4">Research Focus</h2>
                <p className="text-muted-foreground leading-relaxed prose-editorial">
                  {scholar.researchFocus}
                </p>
              </section>
            )}

            {/* Selected publications */}
            {scholar.selectedPublications && scholar.selectedPublications.length > 0 && (
              <section className="mb-12">
                <h2 className="font-fraunces text-2xl mb-4">Selected Publications</h2>
                <ol className="space-y-4">
                  {scholar.selectedPublications.map((pub: { citation: string; url?: string | null; year?: number | null }, i: number) => (
                    <li key={i} className="flex gap-3 py-3 border-b border-border last:border-0">
                      <span className="text-sm text-muted-foreground flex-shrink-0 font-mono">
                        {pub.year}
                      </span>
                      <div>
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-purple hover:underline"
                          >
                            {pub.citation}
                          </a>
                        ) : (
                          <p className="text-sm">{pub.citation}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Conversations */}
            {conversationsResult.docs.length > 0 && (
              <section>
                <h2 className="font-fraunces text-2xl mb-6">
                  Conversations on the Podcast
                </h2>
                <div className="space-y-0 divide-y divide-border">
                  {conversationsResult.docs.map((conv) => (
                    <ConversationCard
                      key={conv.id}
                      variant="compact"
                      conversation={{
                        id: String(conv.id),
                        title: conv.title,
                        slug: conv.slug,
                        excerpt: conv.excerpt,
                        youtubeId: conv.youtubeId,
                        youtubeThumbnailUrl: conv.youtubeThumbnailUrl,
                        duration: conv.duration,
                        publishedAt: conv.publishedAt,
                        scholars: [],
                        disciplines: [],
                      }}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors group"
    >
      <span>{label}</span>
      <span className="text-xs opacity-50 group-hover:opacity-100">↗</span>
    </a>
  )
}
