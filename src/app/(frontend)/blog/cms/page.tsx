import type { Metadata } from 'next';
import { BlogCMS } from '@/components/blocks/BlogCMS';
import { getAllBlogs } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Blog Writing Studio | The Solomon Atah Podcast',
  description: 'Writing studio for articles and blog posts.',
};

export default async function BlogCMSPage() {
  const allBlogs = await getAllBlogs();
  return <BlogCMS allBlogs={allBlogs} />;
}
