import type { Metadata } from 'next';
import { getPublishedBlogs } from '@/lib/blog-data';
import { BlogCard } from '@/components/blocks/BlogCard';

export const metadata: Metadata = {
  title: 'Blog | The Solomon Atah Podcast',
  description:
    'Essays, announcements, and deep dives from The Solomon Atah Podcast.',
};

export const revalidate = 60; // ISR 1 minute

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header section */}
      <header className="mb-14 pb-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Articles & Essays
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-xs font-mono text-muted-foreground">Blog</span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-4 leading-tight">
              Blog
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Long-form thoughts, reflections, and deep dives into specific topics.
            </p>
          </div>
        </div>
      </header>

      {/* Issues Listing */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border/60">
          <h2 className="font-fraunces text-2xl font-light text-foreground">
            Latest Articles
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            {blogs.length} {blogs.length === 1 ? 'Article' : 'Articles'}
          </span>
        </div>

        {blogs.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground text-base mb-3">
              No articles published yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.map((blog, idx) => (
              <BlogCard
                key={blog.id || blog.slug}
                blog={blog}
                featured={false}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
