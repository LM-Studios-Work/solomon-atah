import type { Metadata } from 'next';
import { BlogCMS } from '@/components/blocks/BlogCMS';
import { getPublishedBlogs } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog Writing Studio | The Solomon Atah Podcast',
  description: 'Writing studio for articles and blog posts.',
};

export default async function BlogCMSPage() {
  const allBlogs = await getPublishedBlogs();
  return <BlogCMS allBlogs={allBlogs} />;
}
