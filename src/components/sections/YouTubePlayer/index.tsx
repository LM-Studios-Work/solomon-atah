'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { getYouTubeThumbnail } from '@/lib/utils'

interface YouTubePlayerProps {
  videoId: string
  title: string
  thumbnailUrl?: string | null
}

export function YouTubePlayer({ videoId, title, thumbnailUrl }: YouTubePlayerProps) {
  const [activated, setActivated] = useState(false)
  const thumb = thumbnailUrl || getYouTubeThumbnail(videoId, 'maxres')

  if (activated) {
    return (
      <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  return (
    <div className="relative aspect-video w-full rounded-sm overflow-hidden bg-black cursor-pointer group">
      <Image
        src={thumb}
        alt={`Thumbnail for: ${title}`}
        fill
        className="object-cover group-hover:opacity-80 transition-opacity"
        sizes="(max-width: 1024px) 100vw, 720px"
        priority
      />
      {/* Play button */}
      <button
        onClick={() => setActivated(true)}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={`Play: ${title}`}
      >
        <span className="flex items-center justify-center w-18 h-18 bg-purple/90 hover:bg-purple rounded-full shadow-2xl transition-all group-hover:scale-105">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </span>
      </button>
    </div>
  )
}
