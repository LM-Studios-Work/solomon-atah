"use client";

import { useEffect, useState } from "react";

interface PodcastEpisode {
  videoId: string;
  episodeNumber: number;
  title: string;
}

interface PodcastEpisodeGridProps {
  episodes: PodcastEpisode[];
  initialCount?: number;
}

export function PodcastEpisodeGrid({
  episodes,
  initialCount = 3,
}: PodcastEpisodeGridProps) {
  const [expanded, setExpanded] = useState(false);
  const [autoplayFirstEpisode, setAutoplayFirstEpisode] = useState(false);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const visibleEpisodes = expanded ? episodes : episodes.slice(0, initialCount);
  const canToggle = episodes.length > initialCount;

  useEffect(() => {
    const playLatestEpisode = () => {
      if (window.location.hash === "#latest-episode") {
        setAutoplayFirstEpisode(true);
        setPlayingVideoId(episodes[0]?.videoId ?? null);
      }
    };

    playLatestEpisode();
    window.addEventListener("hashchange", playLatestEpisode);

    return () => window.removeEventListener("hashchange", playLatestEpisode);
  }, [episodes]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {visibleEpisodes.map((episode, index) => (
          <article
            key={episode.videoId}
            id={index === 0 ? "latest-episode" : undefined}
            className="space-y-4 scroll-mt-24"
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-black">
              {playingVideoId === episode.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${episode.videoId}?autoplay=${
                    index === 0 && autoplayFirstEpisode ? "1" : "0"
                  }`}
                  title={`${episode.title} Episode ${episode.episodeNumber}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlayingVideoId(episode.videoId)}
                  className="group absolute inset-0 block h-full w-full"
                  aria-label={`Play ${episode.title}`}
                >
                  <img
                    src={`https://i.ytimg.com/vi/${episode.videoId}/maxresdefault.jpg`}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/5" />
                  <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-105">
                    <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[18px] border-y-transparent border-l-white" />
                  </span>
                </button>
              )}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-2">
                Episode {episode.episodeNumber}
              </p>
              <h3 className="font-fraunces text-xl font-light mb-3">
                {episode.title}
              </h3>
              <a
                href={`https://www.youtube.com/watch?v=${episode.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-purple hover:text-purple/80 transition-colors"
              >
                Watch on YouTube
              </a>
            </div>
          </article>
        ))}
      </div>

      {canToggle && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="inline-flex items-center px-5 py-2.5 bg-purple text-white text-sm font-medium rounded-sm transition-colors hover:bg-purple/90"
          >
            {expanded ? "View less" : "View more"}
          </button>
        </div>
      )}
    </>
  );
}
