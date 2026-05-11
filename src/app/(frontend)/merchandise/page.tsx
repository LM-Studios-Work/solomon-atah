import type { Metadata } from 'next'
import { MerchandisePageContent } from '@/components/sections/MerchandisePageContent'

export const metadata: Metadata = {
  title: 'Merchandise & Books, Solomon Atah Pty Ltd',
  description:
    'Podcast merchandise, branded apparel, and books from Solomon Atah Pty Ltd.',
}

export default function MerchandisePage() {
  return <MerchandisePageContent />
}
