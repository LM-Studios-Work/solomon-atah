export interface LatestVideo {
  videoId: string
  title: string
  publishedAt: string
  thumbnailUrl: string
}

export async function getLatestYouTubeVideo(): Promise<LatestVideo | null> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  if (!channelId) return null

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }, // revalidate once per hour
    )
    if (!res.ok) return null

    const xml = await res.text()

    // Pull the first <entry> block
    const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/)
    if (!entryMatch) return null
    const entry = entryMatch[1]

    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
    if (!videoId) return null

    const rawTitle = entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? 'Latest Episode'
    const publishedAt = entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? new Date().toISOString()
    const thumbnailUrl =
      entry.match(/media:thumbnail[^>]*url="([^"]+)"/)?.[1] ??
      `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

    // Decode basic HTML entities that YouTube puts in titles
    const title = rawTitle
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")

    return { videoId, title, publishedAt, thumbnailUrl }
  } catch {
    return null
  }
}
