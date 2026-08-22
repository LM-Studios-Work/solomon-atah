import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogBySlug, getPublishedBlogs } from '@/lib/blog-data';
import { formatDate } from '@/lib/utils';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: 'Blog Post Not Found' };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.excerpt || `Read ${blog.title} on The Solomon Atah Podcast.`,
    openGraph: {
      title: blog.title,
      description: blog.excerpt || undefined,
      type: 'article',
      publishedTime: blog.published_at,
    },
  };
}

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((b) => ({ slug: b.slug }));
}

function calculateReadingTime(text: string): number {
  if (!text) return 2;
  const totalWords = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(totalWords / 200));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const readMinutes = calculateReadingTime(blog.content);

  // Simple rendering for plain text content
  const paragraphs = blog.content.split('\n\n').filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Navigation Breadcrumb */}
      <nav className="flex items-center justify-between gap-4 text-xs text-muted-foreground mb-10 pb-4 border-b border-border/60">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium"
        >
          <span aria-hidden="true">←</span>
          <span>All Articles</span>
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-14 pb-10 border-b border-border">
        {/* Series */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {blog.subtitle && (
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              {blog.subtitle}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.15] mb-6">
          {blog.title}
        </h1>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {blog.excerpt}
          </p>
        )}

        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-4 border-t border-border/40">
          <div className="flex items-center gap-4 font-medium">
            <time dateTime={blog.published_at}>
              {formatDate(blog.published_at)}
            </time>
            <span className="text-border">•</span>
            <span>{readMinutes} min read</span>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-sm bg-muted text-muted-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="my-10 text-foreground">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base sm:text-lg leading-relaxed mb-6 whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Footer Sign-off & Next Steps */}
      <div className="mt-16">
        <div className="py-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-[0.15em] mb-4">
              <span>The Solomon Atah Podcast</span>
              <div className="flex-1 h-px bg-border max-w-[4rem]" />
            </div>
            <h3 className="font-fraunces text-2xl font-light text-foreground mb-3">
              Enjoyed this article?
            </h3>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Share it with fellow researchers and colleagues.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/blog"
              className="px-6 py-3 bg-foreground text-background font-medium text-sm transition-colors hover:bg-foreground/90 whitespace-nowrap"
            >
              Browse All Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
