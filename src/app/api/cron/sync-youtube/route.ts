import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload/getPayload'
import { fetchChannelVideos, fetchVideoMetadata, parseISO8601Duration } from '@/lib/youtube/client'
import { slugify } from '@/lib/utils'

export async function GET(req: NextRequest) {
  // Secure the cron endpoint
  const secret = req.headers.get('x-cron-secret') || req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 })
  }

  const channelId = process.env.YOUTUBE_CHANNEL_ID
  if (!channelId) {
    return NextResponse.json({ message: 'YOUTUBE_CHANNEL_ID not set.' }, { status: 500 })
  }

  try {
    const payload = await getPayload()
    const videos = await fetchChannelVideos(channelId)

    let created = 0
    let updated = 0

    for (const video of videos) {
      const existing = await payload.find({
        collection: 'conversations',
        where: { youtubeId: { equals: video.id } },
        limit: 1,
      })

      const duration = parseISO8601Duration(video.contentDetails.duration)
      const thumbnailUrl =
        video.snippet.thumbnails.maxres?.url ||
        video.snippet.thumbnails.standard?.url ||
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.medium?.url ||
        video.snippet.thumbnails.default?.url ||
        ''

      if (existing.docs.length === 0) {
        // Create new draft conversation
        const slug = slugify(video.snippet.title)
        await payload.create({
          collection: 'conversations',
          data: {
            title: video.snippet.title,
            slug: `${slug}-${video.id}`,
            youtubeId: video.id,
            youtubeThumbnailUrl: thumbnailUrl,
            duration,
            publishedAt: video.snippet.publishedAt,
            status: 'draft',
            excerpt: video.snippet.description.slice(0, 280) || '',
            scholars: [],
          },
        })
        created++
      } else {
        // Update metadata on existing
        const doc = existing.docs[0]
        await payload.update({
          collection: 'conversations',
          id: doc.id,
          data: {
            youtubeThumbnailUrl: thumbnailUrl,
            duration,
          },
        })
        updated++
      }
    }

    return NextResponse.json({
      message: `Sync complete. Created: ${created}, Updated: ${updated}.`,
      created,
      updated,
      total: videos.length,
    })
  } catch (err) {
    console.error('YouTube sync error:', err)
    return NextResponse.json({ message: 'Sync failed.', error: String(err) }, { status: 500 })
  }
}
