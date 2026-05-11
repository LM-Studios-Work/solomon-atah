"use client";

import { useEffect, useState } from "react";

interface PodcastEpisode {
  videoId: string;
  title: string;
  publishedAt?: string;
}

interface PodcastEpisodeGridProps {
  episodes: PodcastEpisode[];
  initialCount?: number;
}

function EpisodeCard({
  episode,
  index,
  autoplay,
}: {
  episode: PodcastEpisode;
  index: number;
  autoplay: boolean;
}) {
  const date = episode.publishedAt
    ? new Date(episode.publishedAt).toLocaleDateString("en-ZA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <article
      id={index === 0 ? "latest-episode" : undefined}
      className="flex flex-col gap-3 scroll-mt-24"
    >
      {/* YouTube Embed */}
      <div className="relative aspect-video w-full overflow-hidden rounded-sm">
        <iframe
          src={`https://www.youtube.com/embed/${episode.videoId}?${autoplay ? "autoplay=1" : ""}&rel=0`}
          title={episode.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="h-full w-full"
        />
      </div>

      {/* Meta */}
      <div>
        <h3 className="font-fraunces text-lg font-light leading-snug mb-1 line-clamp-2">
          {episode.title}
        </h3>
        {date && <p className="text-xs text-muted-foreground">{date}</p>}
        <a
          href={`https://www.youtube.com/watch?v=${episode.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs font-medium text-purple hover:underline"
        >
          Watch on YouTube →
        </a>
      </div>
    </article>
  );
}

export function PodcastEpisodeGrid({
  episodes,
  initialCount = 3,
}: PodcastEpisodeGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [autoplayIndex, setAutoplayIndex] = useState<number | null>(null);

  useEffect(() => {
    const check = () => {
      if (window.location.hash === "#latest-episode") setAutoplayIndex(0);
    };
    check();
    window.addEventListener("hashchange", check);
    return () => window.removeEventListener("hashchange", check);
  }, []);

  const visible = expanded ? episodes : episodes.slice(0, initialCount);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
        {visible.map((ep, i) => (
          <EpisodeCard
            key={ep.videoId}
            episode={ep}
            index={i}
            autoplay={autoplayIndex === i}
          />
        ))}
      </div>

      {episodes.length > initialCount && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm hover:bg-purple/90 transition-colors"
          >
            {expanded ? "Show less" : `Show all ${episodes.length} episodes`}
          </button>
        </div>
      )}
    </>
  );
}
