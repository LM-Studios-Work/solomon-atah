import type { Metadata } from "next";
import Image from "next/image";
import { getPublishedConversations } from "@/lib/data";
import { getRecentYouTubeVideos } from "@/lib/youtube";
import { ConversationCard } from "@/components/sections/ConversationCard";
import { PodcastEpisodeGrid } from "@/components/sections/PodcastEpisodeGrid";

const mediaPlatforms = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@TheSolomonAtahPod",
    iconUrl: "https://cdn.simpleicons.org/youtube/FF0000",
    name: "YouTube",
  },
  {
    label: "Spotify",
    href: "#",
    iconUrl: "https://cdn.simpleicons.org/spotify/1DB954",
    name: "Spotify",
  },
  {
    label: "Apple Podcasts",
    href: "#",
    iconUrl: "https://cdn.simpleicons.org/applepodcasts/872EC4",
    name: "Podcasts",
  },
];

const podcastChannelUrl = "https://www.youtube.com/@TheSolomonAtahPod";
const subscribeUrl =
  "https://www.youtube.com/@TheSolomonAtahPod?sub_confirmation=1";

export const metadata: Metadata = {
  title: "The Solomon Atah Podcast, Solomon Atah Pty Ltd",
  description:
    "The Solomon Atah Podcast, video archive, and featured scholarly conversations from Solomon Atah Pty Ltd.",
};

export default async function MediaPage() {
  const [videos, conversations] = await Promise.all([
    getRecentYouTubeVideos(15),
    Promise.resolve(getPublishedConversations()),
  ]);

  const episodes = videos.map((v, i) => ({
    videoId: v.videoId,
    episodeNumber: videos.length - i,
    title: v.title,
    publishedAt: v.publishedAt,
  }));

  const featured =
    conversations.find((c) => c.featured) ?? conversations[0] ?? null;
  const recent = conversations.filter((c) => c.id !== featured?.id).slice(0, 5);

  return (
    <div>
      {/* ── Podcast Hero ──────────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-purple text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-5">
                  Flagship Property
                </p>
                <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-5">
                  The Solomon Atah Podcast
                </h1>
                <div className="space-y-3 text-white/70 leading-relaxed max-w-2xl">
                  <p>
                    A public-facing academic media institution that commissions,
                    curates, and archives scholarly conversations with PhD holders
                    and PhD candidates. We elevate African and Africa-focused
                    scholarship within global intellectual discourse.
                  </p>
                  <p>
                    Every conversation is archived, given an editorial summary,
                    and made freely accessible. We complement academic journals —
                    surfacing not just arguments, but the thinkers and methods
                    behind them.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#latest-episode"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-purple text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors"
                >
                  Watch the latest episode
                </a>
                <a
                  href={subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-white/30 text-white text-sm font-semibold rounded-sm hover:border-white/60 hover:bg-white/10 transition-colors"
                >
                  Subscribe
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {mediaPlatforms.map((platform) => (
                  <a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.label}
                    className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-white/80 transition-opacity hover:opacity-100 hover:text-white"
                  >
                    <img
                      src={platform.iconUrl}
                      alt=""
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0"
                    />
                    <span>{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex justify-center items-center">
              <a
                href={podcastChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl hover:border-white/40 transition-colors block"
              >
                <Image
                  src="/company%20resources/podcase_image_circle-removebg-preview.png"
                  alt="The Solomon Atah Podcast"
                  fill
                  className="object-cover"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold via-gold/40 to-transparent" />
      </section>

      {/* ── Episodes ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Solomon Atah Podcast
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {episodes.length > 0 ? (
            <PodcastEpisodeGrid episodes={episodes} initialCount={3} />
          ) : (
            <p className="text-sm text-muted-foreground">
              Episodes will appear here once the channel feed is available.
            </p>
          )}
        </div>
      </section>

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
  );
}
