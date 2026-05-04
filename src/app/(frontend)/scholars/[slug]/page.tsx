import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getScholarBySlug, getConversationsByScholar, queryScholars } from '@/lib/data'
import { ConversationCard } from '@/components/sections/ConversationCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const scholar = getScholarBySlug(slug)
  if (!scholar) return { title: 'Scholar Not Found' }
  return {
    title: scholar.name,
    description: scholar.researchFocus || `${scholar.name} — ${scholar.title || 'Scholar'}`,
  }
}

export function generateStaticParams() {
  return queryScholars({ limit: 1000 }).docs.map((s) => ({ slug: s.slug }))
}

export default async function ScholarPage({ params }: Props) {
  const { slug } = await params
  const scholar = getScholarBySlug(slug)
  if (!scholar) notFound()

  const conversations = getConversationsByScholar(slug)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: scholar.name,
    jobTitle: scholar.title,
    ...(scholar.institution && {
      affiliation: { '@type': 'Organization', name: scholar.institution.name },
    }),
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
              <div className="border border-border rounded-sm p-6">
                {/* Photo */}
                <div className="mb-5">
                  {scholar.photo ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-muted mx-auto">
                      <Image
                        src={scholar.photo.url}
                        alt={scholar.photo.alt || scholar.name}
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
                {scholar.institution && (
                  <p className="text-sm font-medium text-center mb-4">
                    {scholar.institution.shortName || scholar.institution.name}
                  </p>
                )}

                {scholar.disciplines.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {scholar.disciplines.map((d) => (
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
                <p className="prose-editorial text-muted-foreground leading-relaxed">{scholar.bio}</p>
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
                  {scholar.selectedPublications.map((pub, i) => (
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
            {conversations.length > 0 && (
              <section>
                <h2 className="font-fraunces text-2xl mb-6">Conversations on the Podcast</h2>
                <div className="space-y-0 divide-y divide-border">
                  {conversations.map((conv) => (
                    <ConversationCard key={conv.id} variant="compact" conversation={conv} />
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
