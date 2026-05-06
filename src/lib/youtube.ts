export interface YouTubeVideo {
  videoId: string
  title: string
  publishedAt: string
  thumbnailUrl: string
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function parseEntry(entry: string): YouTubeVideo | null {
  const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1]
  if (!videoId) return null

  const rawTitle = entry.match(/<title>([^<]+)<\/title>/)?.[1] ?? 'Untitled'
  const publishedAt =
    entry.match(/<published>([^<]+)<\/published>/)?.[1] ?? new Date().toISOString()
  const thumbnailUrl =
    entry.match(/media:thumbnail[^>]*url="([^"]+)"/)?.[1] ??
    `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`

  return { videoId, title: decodeEntities(rawTitle), publishedAt, thumbnailUrl }
}

async function fetchChannelFeed(): Promise<string | null> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  if (!channelId) return null

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } },
    )
    if (!res.ok) return null
    return res.text()
  } catch {
    return null
  }
}

/** Returns the single most recent video, or null. */
export async function getLatestYouTubeVideo(): Promise<YouTubeVideo | null> {
  const xml = await fetchChannelFeed()
  if (!xml) return null

  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/)
  if (!entryMatch) return null

  return parseEntry(entryMatch[1])
}

/** Returns up to `limit` recent videos (default 15 — the full RSS feed). */
export async function getRecentYouTubeVideos(limit = 15): Promise<YouTubeVideo[]> {
  const xml = await fetchChannelFeed()
  if (!xml) return []

  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
  return entries
    .slice(0, limit)
    .map((m) => parseEntry(m[1]))
    .filter((v): v is YouTubeVideo => v !== null)
}
