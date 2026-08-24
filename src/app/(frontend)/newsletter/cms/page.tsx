import type { Metadata } from 'next';
import { NewsletterCMS } from '@/components/blocks/NewsletterCMS';

export const metadata: Metadata = {
  title: 'Newsletter Block CMS Studio | The Solomon Atah Podcast',
  description: 'Visual block-based newsletter editor and publishing studio.',
};

import { getAllNewsletters } from '@/lib/newsletter-data';

export default async function NewsletterCMSPage() {
  const allNewsletters = await getAllNewsletters();
  return <NewsletterCMS allNewsletters={allNewsletters} />;
}
