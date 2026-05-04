import type { Metadata } from 'next'
import Link from 'next/link'
import { getPublishedConversations } from '@/lib/data'
import { getLatestYouTubeVideo } from '@/lib/youtube'
import { YouTubePlayer } from '@/components/sections/YouTubePlayer'
import { ConversationCard } from '@/components/sections/ConversationCard'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Media — Solomon Atah Pty Ltd',
  description:
    'The media division of Solomon Atah Pty Ltd — home of The Solomon Atah Podcast, video archive, and featured scholarly conversations.',
}

export default async function MediaPage() {
  const [latestVideo, conversations] = await Promise.all([
    getLatestYouTubeVideo(),
    Promise.resolve(getPublishedConversations()),
  ])

  const featured = conversations.find((c) => c.featured) ?? conversations[0] ?? null
  const recent = conversations.filter((c) => c.id !== featured?.id).slice(0, 5)

  return (
    <div>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            Media
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            The media arm of Solomon Atah Pty Ltd — producing scholarly conversations, archiving
            intellectual work, and making rigorous research visible to the public.
          </p>
        </div>
      </section>

      {/* ── Latest Episode ────────────────────────────────────────────────────── */}
      {latestVideo && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                  Latest Episode
                </span>
                <div className="h-px bg-border w-16" />
              </div>
              <time className="text-xs text-muted-foreground hidden sm:block">
                {formatDate(latestVideo.publishedAt)}
              </time>
            </div>

            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2">
                <YouTubePlayer
                  videoId={latestVideo.videoId}
                  title={latestVideo.title}
                  thumbnailUrl={latestVideo.thumbnailUrl}
                />
              </div>
              <div className="flex flex-col justify-start pt-2">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Now Playing
                </p>
                <h2 className="font-fraunces text-2xl font-light leading-snug mb-4">
                  {latestVideo.title}
                </h2>
                <time className="text-sm text-muted-foreground mb-6 block">
                  {formatDate(latestVideo.publishedAt)}
                </time>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors w-fit"
                  >
                    Watch on YouTube →
                  </a>
                  <Link
                    href="/conversations"
                    className="text-sm text-purple hover:underline font-medium"
                  >
                    Browse full archive →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── The Solomon Atah Podcast ──────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                Flagship Property
              </p>
              <h2 className="font-fraunces text-4xl font-light mb-6">
                The Solomon Atah Podcast
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  A public-facing academic media institution that commissions, curates, and archives
                  scholarly conversations with PhD holders and PhD candidates. We elevate African
                  and Africa-focused scholarship within global intellectual discourse.
                </p>
                <p>
                  Every conversation is archived, given an editorial summary, and made freely
                  accessible. We complement academic journals — surfacing not just arguments, but
                  the thinkers and methods behind them.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/conversations"
                  className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
                >
                  Browse Archive
                </Link>
                <Link
                  href="/scholars"
                  className="inline-flex items-center px-5 py-2.5 border border-border text-sm font-medium rounded-sm hover:border-purple/40 hover:bg-muted/40 transition-colors"
                >
                  Scholars Directory
                </Link>
              </div>
            </div>

            {/* Watch & Listen */}
            <div className="border border-border rounded-sm p-8 bg-muted/20">
              <h3 className="font-fraunces text-xl mb-6">Watch &amp; Listen</h3>
              <div className="space-y-3">
                {[
                  { label: 'YouTube', description: 'Full video archive', href: 'https://youtube.com/@solomonatah' },
                  { label: 'Spotify', description: 'Audio episodes', href: '#' },
                  { label: 'Apple Podcasts', description: 'Subscribe on Apple', href: '#' },
                ].map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-border rounded-sm hover:border-purple/40 hover:bg-muted/40 transition-colors group"
                  >
                    <div>
                      <p className="font-medium text-sm">{platform.label}</p>
                      <p className="text-xs text-muted-foreground">{platform.description}</p>
                    </div>
                    <span className="text-muted-foreground group-hover:text-purple transition-colors text-sm">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Conversations (from JSON archive) ──────────────────────────── */}
      {(featured || recent.length > 0) && (
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                  From the Archive
                </span>
                <div className="h-px bg-border w-16" />
              </div>
              <Link
                href="/conversations"
                className="text-sm text-purple hover:underline font-medium hidden sm:block"
              >
                Full archive →
              </Link>
            </div>

            {featured && (
              <div className="mb-8">
                <ConversationCard conversation={featured} variant="featured" />
              </div>
            )}

            {recent.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recent.map((conv) => (
                  <ConversationCard key={conv.id} conversation={conv} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Awards & Recognition ──────────────────────────────────────────────── */}
      <section className="border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Awards &amp; Recognition
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <p className="text-muted-foreground text-sm">
            Awards and recognitions will be listed here.
          </p>
        </div>
      </section>
    </div>
  )
}
