const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeVideoSnippet {
  title: string
  description: string
  publishedAt: string
  channelId: string
  thumbnails: {
    default?: { url: string; width: number; height: number }
    medium?: { url: string; width: number; height: number }
    high?: { url: string; width: number; height: number }
    standard?: { url: string; width: number; height: number }
    maxres?: { url: string; width: number; height: number }
  }
  tags?: string[]
}

export interface YouTubeContentDetails {
  duration: string // ISO 8601 duration, e.g. "PT1H23M45S"
}

export interface YouTubeVideoItem {
  id: string
  snippet: YouTubeVideoSnippet
  contentDetails: YouTubeContentDetails
}

export function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!match) return 0
  const hours = parseInt(match[1] || '0', 10)
  const minutes = parseInt(match[2] || '0', 10)
  const seconds = parseInt(match[3] || '0', 10)
  return hours * 3600 + minutes * 60 + seconds
}

export async function fetchVideoMetadata(videoId: string): Promise<YouTubeVideoItem | null> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    console.warn('YOUTUBE_API_KEY not set, skipping video metadata fetch.')
    return null
  }

  const url = new URL(`${YOUTUBE_API_BASE}/videos`)
  url.searchParams.set('part', 'snippet,contentDetails')
  url.searchParams.set('id', videoId)
  url.searchParams.set('key', apiKey)

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  if (!res.ok) {
    console.error(`YouTube API error: ${res.status} ${res.statusText}`)
    return null
  }

  const data = await res.json()
  const item = data.items?.[0]
  if (!item) return null

  return {
    id: item.id,
    snippet: item.snippet,
    contentDetails: item.contentDetails,
  }
}

export async function fetchChannelVideos(channelId: string): Promise<YouTubeVideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    console.warn('YOUTUBE_API_KEY not set, skipping channel sync.')
    return []
  }

  const videos: YouTubeVideoItem[] = []
  let pageToken: string | undefined

  do {
    const searchUrl = new URL(`${YOUTUBE_API_BASE}/search`)
    searchUrl.searchParams.set('part', 'id')
    searchUrl.searchParams.set('channelId', channelId)
    searchUrl.searchParams.set('type', 'video')
    searchUrl.searchParams.set('maxResults', '50')
    searchUrl.searchParams.set('order', 'date')
    searchUrl.searchParams.set('key', apiKey)
    if (pageToken) searchUrl.searchParams.set('pageToken', pageToken)

    const searchRes = await fetch(searchUrl.toString())
    if (!searchRes.ok) break

    const searchData = await searchRes.json()
    const videoIds: string[] = searchData.items
      ?.map((item: { id: { videoId: string } }) => item.id.videoId)
      .filter(Boolean) ?? []

    if (videoIds.length > 0) {
      const detailUrl = new URL(`${YOUTUBE_API_BASE}/videos`)
      detailUrl.searchParams.set('part', 'snippet,contentDetails')
      detailUrl.searchParams.set('id', videoIds.join(','))
      detailUrl.searchParams.set('key', apiKey)

      const detailRes = await fetch(detailUrl.toString())
      if (detailRes.ok) {
        const detailData = await detailRes.json()
        videos.push(...(detailData.items ?? []))
      }
    }

    pageToken = searchData.nextPageToken
  } while (pageToken)

  return videos
}
