import type { Metadata } from 'next'

const SITE_NAME = 'The Solomon Atah Podcast'
const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://solomonatah.com'
const SITE_DESCRIPTION =
  'Scholarly conversations with researchers shaping our understanding of Africa and the world. Know Tomorrow Today.'

export function buildMetadata({
  title,
  description,
  image,
  path,
  type = 'website',
}: {
  title?: string
  description?: string
  image?: string
  path?: string
  type?: 'website' | 'article'
}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Know Tomorrow Today`
  const metaDescription = description || SITE_DESCRIPTION
  const ogImage = image || `${SITE_URL}/og-default.png`
  const url = path ? `${SITE_URL}${path}` : SITE_URL

  return {
    title: fullTitle,
    description: metaDescription,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url,
      siteName: SITE_NAME,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
    },
  }
}

export { SITE_NAME, SITE_URL, SITE_DESCRIPTION }
