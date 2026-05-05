import type { Metadata } from "next";
import Image from "next/image";
import { getPublishedConversations } from "@/lib/data";
import { getLatestYouTubeVideo } from "@/lib/youtube";
import { YouTubePlayer } from "@/components/sections/YouTubePlayer";
import { ConversationCard } from "@/components/sections/ConversationCard";
import { PodcastEpisodeGrid } from "@/components/sections/PodcastEpisodeGrid";
import { formatDate } from "@/lib/utils";

const podcastEpisodes = [
  {
    videoId: "deOyZlBmuPE",
    episodeNumber: 45,
    title:
      "Cardio-Metabolic Frontiers: Stress, Disease, and the Making of Holistic Science.",
  },
  {
    videoId: "eQmkGKEBRbo",
    episodeNumber: 44,
    title:
      "Decolonising Business Education: Entrepreneurial Ecosystems at the Margins",
  },
  {
    videoId: "1eKjYerssaU",
    episodeNumber: 43,
    title:
      "From Agenda 2063 To Global Health Diplomacy: Rethinking Africa's Health Future.",
  },
  {
    videoId: "9MB4WOBQE30",
    episodeNumber: 42,
    title:
      "Apartheid Beyond 1994: Universities, Epistemic Violence And The Persistence Of Apartheid.",
  },
  {
    videoId: "F9gwHRCwNjU",
    episodeNumber: 41,
    title:
      "Language, Power, And Leadership: Who Gets To Speak And Who Gets To Govern In Africa",
  },
];

const mediaPlatforms = [
  {
    label: "YouTube",
    href: "https://youtube.com/@solomonatah",
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

const subscribeUrl = "https://youtube.com/@solomonatah?sub_confirmation=1";

export const metadata: Metadata = {
  title: "Media, Solomon Atah Pty Ltd",
  description:
    "The media division of Solomon Atah Pty Ltd, home of The Solomon Atah Podcast, video archive, and featured scholarly conversations.",
};

export default async function MediaPage() {
  const [latestVideo, conversations] = await Promise.all([
    getLatestYouTubeVideo(),
    Promise.resolve(getPublishedConversations()),
  ]);

  const featured =
    conversations.find((c) => c.featured) ?? conversations[0] ?? null;
  const recent = conversations.filter((c) => c.id !== featured?.id).slice(0, 5);

  return (
    <div>
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
                <a
                  href={`https://www.youtube.com/watch?v=${latestVideo.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors w-fit"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border border-border bg-white/90">
                  <Image
                    src="/company%20resources/podcase_image_circle-removebg-preview.png"
                    alt="The Solomon Atah Podcast logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="sm:max-w-xl">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
                    Flagship Property
                  </p>
                  <h2 className="font-fraunces text-4xl font-light mb-0">
                    The Solomon Atah Podcast
                  </h2>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A public-facing academic media institution that commissions,
                  curates, and archives scholarly conversations with PhD holders
                  and PhD candidates. We elevate African and Africa-focused
                  scholarship within global intellectual discourse.
                </p>
                <p>
                  Every conversation is archived, given an editorial summary,
                  and made freely accessible. We complement academic journals -
                  surfacing not just arguments, but the thinkers and methods
                  behind them.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${podcastEpisodes[0].videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-purple text-white text-sm font-semibold rounded-sm hover:bg-purple/90 transition-colors"
                >
                  Watch the latest episode
                </a>
                <a
                  href={subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-purple/30 text-purple text-sm font-semibold rounded-sm hover:border-purple hover:bg-purple/5 transition-colors"
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
                    className="inline-flex items-center gap-2 text-xl font-semibold tracking-tight transition-opacity hover:opacity-75"
                  >
                    <img
                      src={platform.iconUrl}
                      alt=""
                      aria-hidden="true"
                      className="h-8 w-8 shrink-0"
                    />
                    <span>{platform.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                Solomon Atah Podcast
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <PodcastEpisodeGrid episodes={podcastEpisodes} />
          </div>
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
