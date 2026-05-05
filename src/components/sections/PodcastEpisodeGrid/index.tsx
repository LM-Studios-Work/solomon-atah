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
  const visibleEpisodes = expanded ? episodes : episodes.slice(0, initialCount);
  const canToggle = episodes.length > initialCount;

  useEffect(() => {
    const playLatestEpisode = () => {
      if (window.location.hash === "#latest-episode") {
        setAutoplayFirstEpisode(true);
      }
    };

    playLatestEpisode();
    window.addEventListener("hashchange", playLatestEpisode);

    return () => window.removeEventListener("hashchange", playLatestEpisode);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {visibleEpisodes.map((episode, index) => (
          <article
            key={episode.videoId}
            id={index === 0 ? "latest-episode" : undefined}
            className="space-y-4 scroll-mt-24"
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${episode.videoId}${
                  index === 0 && autoplayFirstEpisode ? "?autoplay=1" : ""
                }`}
                title={`${episode.title} Episode ${episode.episodeNumber}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
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
