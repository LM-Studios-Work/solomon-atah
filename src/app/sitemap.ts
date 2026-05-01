import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload/getPayload'
import { SITE_URL } from '@/lib/seo/buildMetadata'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let payload: Awaited<ReturnType<typeof getPayload>> | null = null
  try {
    payload = await getPayload()
  } catch {
    // Return static pages only if database unavailable
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/conversations`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/scholars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/disciplines`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/dispatches`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/propose`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/partner`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.4 },
  ]

  if (!payload) return staticPages

  try {
    const [conversationsResult, scholarsResult, disciplinesResult, dispatchesResult] =
      await Promise.all([
        payload.find({ collection: 'conversations', where: { status: { equals: 'published' } }, limit: 1000 }),
        payload.find({ collection: 'scholars', limit: 1000 }),
        payload.find({ collection: 'disciplines', limit: 100 }),
        payload.find({ collection: 'dispatches', where: { status: { equals: 'published' } }, limit: 500 }),
      ])

    const conversationPages: MetadataRoute.Sitemap = conversationsResult.docs.map((c) => ({
      url: `${SITE_URL}/conversations/${c.slug}`,
      lastModified: c.updatedAt ? new Date(String(c.updatedAt)) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const scholarPages: MetadataRoute.Sitemap = scholarsResult.docs.map((s) => ({
      url: `${SITE_URL}/scholars/${s.slug}`,
      lastModified: s.updatedAt ? new Date(String(s.updatedAt)) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    const disciplinePages: MetadataRoute.Sitemap = disciplinesResult.docs.map((d) => ({
      url: `${SITE_URL}/disciplines/${d.slug}`,
      lastModified: d.updatedAt ? new Date(String(d.updatedAt)) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const dispatchPages: MetadataRoute.Sitemap = dispatchesResult.docs.map((d) => ({
      url: `${SITE_URL}/dispatches/${d.slug}`,
      lastModified: d.updatedAt ? new Date(String(d.updatedAt)) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))

    return [...staticPages, ...conversationPages, ...scholarPages, ...disciplinePages, ...dispatchPages]
  } catch {
    return staticPages
  }
}
