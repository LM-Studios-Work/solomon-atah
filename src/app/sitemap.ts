import type { MetadataRoute } from 'next'
import {
  getPublishedConversations,
  queryScholars,
  getDisciplines,
  getPublishedDispatches,
} from '@/lib/data'
import { SITE_URL } from '@/lib/seo/buildMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
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

  const conversationPages: MetadataRoute.Sitemap = getPublishedConversations().map((c) => ({
    url: `${SITE_URL}/conversations/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const scholarPages: MetadataRoute.Sitemap = queryScholars({ limit: 1000 }).docs.map((s) => ({
    url: `${SITE_URL}/scholars/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const disciplinePages: MetadataRoute.Sitemap = getDisciplines().map((d) => ({
    url: `${SITE_URL}/disciplines/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const dispatchPages: MetadataRoute.Sitemap = getPublishedDispatches().map((d) => ({
    url: `${SITE_URL}/dispatches/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...conversationPages, ...scholarPages, ...disciplinePages, ...dispatchPages]
}
