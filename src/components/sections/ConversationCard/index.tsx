import Link from 'next/link'
import Image from 'next/image'
import { formatDate, formatDuration, getYouTubeThumbnail } from '@/lib/utils'

export interface ConversationCardData {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  youtubeId: string
  youtubeThumbnailUrl?: string | null
  thumbnail?: { url: string; alt: string } | null
  duration?: number | null
  publishedAt?: string | null
  scholars?: Array<{
    id: string
    name: string
    title?: string | null
    institution?: { name: string; shortName?: string | null } | null
  }>
  disciplines?: Array<{ id: string; name: string; slug: string }>
}

interface ConversationCardProps {
  conversation: ConversationCardData
  variant?: 'default' | 'featured' | 'compact'
}

export function ConversationCard({ conversation, variant = 'default' }: ConversationCardProps) {
  const thumbnailUrl =
    conversation.thumbnail?.url ||
    conversation.youtubeThumbnailUrl ||
    getYouTubeThumbnail(conversation.youtubeId, 'maxres')

  const primaryScholar = conversation.scholars?.[0]

  if (variant === 'featured') {
    return (
      <article className="group grid md:grid-cols-2 gap-0 border border-border rounded-sm overflow-hidden hover:border-purple/30 transition-colors">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={conversation.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {conversation.duration && (
            <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-0.5 rounded-sm">
              {formatDuration(conversation.duration)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col justify-between bg-card">
          <div>
            {conversation.disciplines && conversation.disciplines.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {conversation.disciplines.slice(0, 2).map((d) => (
                  <Link key={d.id} href={`/disciplines/${d.slug}`} className="discipline-tag hover:bg-purple/10 transition-colors">
                    {d.name}
                  </Link>
                ))}
              </div>
            )}
            <h2 className="font-fraunces text-2xl md:text-3xl leading-snug mb-3">
              <Link href={`/conversations/${conversation.slug}`} className="hover:text-purple transition-colors">
                {conversation.title}
              </Link>
            </h2>
            {conversation.excerpt && (
              <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3 mb-6">
                {conversation.excerpt}
              </p>
            )}
          </div>

          <div>
            {primaryScholar && (
              <div className="mb-4 pb-4 border-b border-border">
                <p className="text-sm font-semibold">{primaryScholar.name}</p>
                {primaryScholar.title && (
                  <p className="text-xs text-muted-foreground">{primaryScholar.title}</p>
                )}
                {primaryScholar.institution && (
                  <p className="text-xs text-muted-foreground">
                    {primaryScholar.institution.shortName || primaryScholar.institution.name}
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center justify-between">
              <time className="text-xs text-muted-foreground" dateTime={conversation.publishedAt || ''}>
                {formatDate(conversation.publishedAt)}
              </time>
              <Link
                href={`/conversations/${conversation.slug}`}
                className="text-xs font-medium text-purple hover:underline"
              >
                Watch conversation →
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  }

  if (variant === 'compact') {
    return (
      <article className="group flex gap-4 py-4 border-b border-border last:border-0">
        <div className="relative w-24 aspect-video flex-shrink-0 bg-muted rounded-sm overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={conversation.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-fraunces text-base leading-snug line-clamp-2 mb-1">
            <Link href={`/conversations/${conversation.slug}`} className="hover:text-purple transition-colors">
              {conversation.title}
            </Link>
          </h3>
          {primaryScholar && (
            <p className="text-xs text-muted-foreground truncate">{primaryScholar.name}</p>
          )}
          <time className="text-xs text-muted-foreground">{formatDate(conversation.publishedAt)}</time>
        </div>
      </article>
    )
  }

  // Default card
  return (
    <article className="group flex flex-col border border-border rounded-sm overflow-hidden hover:border-purple/30 transition-colors bg-card h-full">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <Image
          src={thumbnailUrl}
          alt={conversation.title}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {conversation.duration && (
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-mono px-2 py-0.5 rounded-sm">
            {formatDuration(conversation.duration)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {conversation.disciplines && conversation.disciplines.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {conversation.disciplines.slice(0, 2).map((d) => (
              <Link key={d.id} href={`/disciplines/${d.slug}`} className="discipline-tag hover:bg-purple/10 transition-colors">
                {d.name}
              </Link>
            ))}
          </div>
        )}

        <h3 className="font-fraunces text-lg leading-snug mb-2 flex-1">
          <Link href={`/conversations/${conversation.slug}`} className="hover:text-purple transition-colors line-clamp-2">
            {conversation.title}
          </Link>
        </h3>

        {primaryScholar && (
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-medium leading-tight">{primaryScholar.name}</p>
            {primaryScholar.institution && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {primaryScholar.institution.shortName || primaryScholar.institution.name}
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <time className="text-xs text-muted-foreground" dateTime={conversation.publishedAt || ''}>
            {formatDate(conversation.publishedAt)}
          </time>
        </div>
      </div>
    </article>
  )
}
