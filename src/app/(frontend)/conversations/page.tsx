import type { Metadata } from "next";
import Link from "next/link";
import { getAchievements } from "@/lib/data";
import { getRecentYouTubeVideos } from "@/lib/youtube";
import { PodcastEpisodeGrid } from "@/components/sections/PodcastEpisodeGrid";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Solomon Atah Podcast — Solomon Atah Pty Ltd",
  description:
    "Scholarly conversations with PhD holders and PhD candidates — elevating African and Africa-focused research within global intellectual discourse.",
};

const CATEGORY_LABEL: Record<string, string> = {
  award: "Award",
  milestone: "Milestone",
  recognition: "Recognition",
  media: "Media",
};

export default async function ConversationsPage() {
  const [videos, achievements] = await Promise.all([
    getRecentYouTubeVideos(15),
    Promise.resolve(getAchievements()),
  ]);

  const episodes = videos.map((v) => ({
    videoId: v.videoId,
    title: v.title,
    publishedAt: v.publishedAt,
  }));

  const latest = videos[0] ?? null;

  return (
    <div>
      {/* ── Page Header ───────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">
            Solomon Atah Pty Ltd
          </p>
          <h1 className="font-fraunces text-5xl md:text-6xl font-light leading-tight mb-6">
            The Solomon Atah Podcast
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Commissioning, curating, and archiving scholarly conversations with
            PhD holders and PhD candidates — elevating African and
            Africa-focused research within global intellectual discourse.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "YouTube", href: "https://youtube.com/@solomonatah" },
              { label: "Spotify", href: "#" },
              { label: "Apple Podcasts", href: "#" },
            ].map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-border rounded-sm text-sm font-medium hover:border-purple/50 hover:bg-muted/40 transition-colors"
              >
                {p.label} →
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest episode meta strip ─────────────────────────────────────────── */}
      {latest && (
        <div className="border-b border-border bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                Latest
              </span>
              <span className="text-sm font-medium line-clamp-1">
                {latest.title}
              </span>
            </div>
            <time className="text-xs text-muted-foreground shrink-0 hidden sm:block">
              {formatDate(latest.publishedAt)}
            </time>
          </div>
        </div>
      )}

      {/* ── Episodes ──────────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {episodes.length > 0 ? (
            <>
              <div className="flex items-center gap-4 mb-10">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
                  Episodes
                </span>
                <div className="flex-1 h-px bg-border" />
                <a
                  href="https://youtube.com/@solomonatah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple hover:underline font-medium hidden sm:block shrink-0"
                >
                  Full archive on YouTube →
                </a>
              </div>
              <PodcastEpisodeGrid episodes={episodes} initialCount={6} />
            </>
          ) : (
            <p className="text-muted-foreground text-sm py-8 text-center">
              Episodes are loading. Make sure{" "}
              <code className="text-xs bg-muted px-1 py-0.5 rounded">
                YOUTUBE_CHANNEL_ID
              </code>{" "}
              is set in your environment.
            </p>
          )}
        </div>
      </section>

      {/* ── Achievements ──────────────────────────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              Achievements
            </span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {achievements.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className="border border-border rounded-sm p-6 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                      {CATEGORY_LABEL[a.category] ?? a.category}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono shrink-0">
                      {a.year}
                    </span>
                  </div>
                  <h3 className="font-fraunces text-lg font-light leading-snug mb-2">
                    {a.title}
                  </h3>
                  {a.issuer && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {a.issuer}
                    </p>
                  )}
                  {a.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {a.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Achievements will be listed here.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
