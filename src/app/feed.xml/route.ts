import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload/getPayload'
import { SITE_URL, SITE_NAME } from '@/lib/seo/buildMetadata'

export const dynamic = 'force-dynamic'

export async function GET() {
  let items = ''

  try {
    const payload = await getPayload()
    const result = await payload.find({
      collection: 'conversations',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 50,
      depth: 2,
    })

    items = result.docs
      .map((conv) => {
        const scholars = Array.isArray(conv.scholars)
          ? conv.scholars
              .filter((s): s is NonNullable<typeof s> => typeof s === 'object' && s !== null)
              .map((s) => s.name)
              .join(', ')
          : ''

        const pubDate = conv.publishedAt
          ? new Date(conv.publishedAt).toUTCString()
          : new Date().toUTCString()

        const thumbnailUrl =
          conv.youtubeThumbnailUrl || `https://i.ytimg.com/vi/${conv.youtubeId}/hqdefault.jpg`

        return `
    <item>
      <title><![CDATA[${conv.title}]]></title>
      <link>${SITE_URL}/conversations/${conv.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/conversations/${conv.slug}</guid>
      <pubDate>${pubDate}</pubDate>
      ${scholars ? `<author><![CDATA[${scholars}]]></author>` : ''}
      ${conv.excerpt ? `<description><![CDATA[${conv.excerpt}]]></description>` : ''}
      <enclosure url="https://www.youtube.com/watch?v=${conv.youtubeId}" type="video/youtube" length="0" />
      ${thumbnailUrl ? `<image><url>${thumbnailUrl}</url></image>` : ''}
      ${
        conv.duration
          ? `<itunes:duration>${Math.floor(conv.duration / 60)}:${String(conv.duration % 60).padStart(2, '0')}</itunes:duration>`
          : ''
      }
    </item>`
      })
      .join('\n')
  } catch {
    // Return empty feed if DB unavailable
  }

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>Scholarly conversations with PhD holders and PhD candidates. Know Tomorrow Today.</description>
    <language>en-za</language>
    <copyright>© ${new Date().getFullYear()} The Solomon Atah Podcast</copyright>
    <itunes:author>Solomon Atah</itunes:author>
    <itunes:category text="Education" />
    <itunes:category text="Society &amp; Culture" />
    <itunes:explicit>false</itunes:explicit>
    <itunes:type>episodic</itunes:type>
    ${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
