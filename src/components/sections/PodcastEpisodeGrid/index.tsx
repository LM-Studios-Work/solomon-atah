"use client";

import { useEffect, useState } from "react";

interface PodcastEpisode {
  videoId: string;
  episodeNumber: number;
  title: string;
  publishedAt?: string;
}

interface PodcastEpisodeGridProps {
  episodes: PodcastEpisode[];
  initialCount?: number;
}

function EpisodeCard({ episode, index, autoplay }: { episode: PodcastEpisode; index: number; autoplay: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    `https://i.ytimg.com/vi/${episode.videoId}/maxresdefault.jpg`
  );

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
      {/* Player / thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${episode.videoId}?autoplay=1&rel=0`}
            title={episode.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play ${episode.title}`}
          >
            <img
              src={thumbSrc}
              alt=""
              aria-hidden="true"
              onError={() =>
                setThumbSrc(`https://i.ytimg.com/vi/${episode.videoId}/hqdefault.jpg`)
              }
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/5" />
            {/* Play button */}
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-purple/90 shadow-xl transition-all group-hover:scale-110 group-hover:bg-purple">
              <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-white" />
            </span>
          </button>
        )}
      </div>

      {/* Meta */}
      <div>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
          Episode {episode.episodeNumber}
        </p>
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
          <EpisodeCard key={ep.videoId} episode={ep} index={i} autoplay={autoplayIndex === i} />
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
