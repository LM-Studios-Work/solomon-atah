"use client";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  thumbnailUrl?: string | null;
}

export function YouTubePlayer({ videoId, title }: YouTubePlayerProps) {
  return (
    <div className="relative aspect-video w-full rounded-sm overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}
