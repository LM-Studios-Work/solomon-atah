import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDuration(seconds: number | null | undefined): string {
  if (!seconds) return ''
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) {
    return `${h}h ${m.toString().padStart(2, '0')}m`
  }
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function buildCitationAPA(params: {
  guestName: string
  hostName: string
  title: string
  podcastName: string
  publishedAt: string | Date
  url: string
}): string {
  const year = new Date(params.publishedAt).getFullYear()
  return `${params.guestName}. (${year}). ${params.title} [Conversation]. In ${params.hostName} (Host), *${params.podcastName}*. ${params.url}`
}

export function buildCitationMLA(params: {
  guestName: string
  hostName: string
  title: string
  podcastName: string
  publishedAt: string | Date
  url: string
}): string {
  const date = formatDate(params.publishedAt)
  return `${params.guestName}. "${params.title}." *${params.podcastName}*, hosted by ${params.hostName}, ${date}, ${params.url}.`
}

export function buildCitationChicago(params: {
  guestName: string
  hostName: string
  title: string
  podcastName: string
  publishedAt: string | Date
  url: string
}): string {
  const date = formatDate(params.publishedAt)
  return `${params.guestName}. "${params.title}." *${params.podcastName}*. Podcast conversation. Hosted by ${params.hostName}. ${date}. ${params.url}.`
}

export function getYouTubeThumbnail(
  youtubeId: string,
  quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq',
): string {
  const qualityMap = {
    default: 'default',
    mq: 'mqdefault',
    hq: 'hqdefault',
    sd: 'sddefault',
    maxres: 'maxresdefault',
  }
  return `https://i.ytimg.com/vi/${youtubeId}/${qualityMap[quality]}.jpg`
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}
