import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsletterBySlug, getPublishedNewsletters } from '@/lib/newsletter-data';
import { formatDate } from '@/lib/utils';
import { NewsletterBlockRenderer } from '@/components/blocks/NewsletterBlockRenderer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);

  if (!newsletter) {
    return { title: 'Newsletter Issue Not Found' };
  }

  return {
    title: `${newsletter.title} | Newsletter`,
    description: newsletter.excerpt || `Read ${newsletter.title} on The Solomon Atah Podcast.`,
    openGraph: {
      title: newsletter.title,
      description: newsletter.excerpt || undefined,
      type: 'article',
      publishedTime: newsletter.published_at,
    },
  };
}

export async function generateStaticParams() {
  const newsletters = await getPublishedNewsletters();
  return newsletters.map((n) => ({ slug: n.slug }));
}

function calculateReadingTime(blocks: any[]): number {
  if (!blocks || blocks.length === 0) return 2;
  const totalWords = blocks.reduce((acc, block) => {
    if (block.text) return acc + block.text.split(/\s+/).length;
    if (block.items) {
      return acc + block.items.join(' ').split(/\s+/).length;
    }
    return acc;
  }, 0);

  return Math.max(1, Math.ceil(totalWords / 200));
}

export default async function NewsletterIssuePage({ params }: Props) {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);

  if (!newsletter) {
    notFound();
  }

  const readMinutes = calculateReadingTime(newsletter.blocks);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Navigation Breadcrumb */}
      <nav className="flex items-center justify-between gap-4 text-xs text-muted-foreground mb-10 pb-4 border-b border-border/60">
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors font-medium"
        >
          <span aria-hidden="true">←</span>
          <span>All Newsletters</span>
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-14 pb-10 border-b border-border">
        {/* Issue Series & Number */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {newsletter.issue_number && (
            <span className="font-mono text-xs font-bold text-muted-foreground px-2.5 py-1 rounded-sm bg-muted/50 border border-border">
              ISSUE #{String(newsletter.issue_number).padStart(3, '0')}
            </span>
          )}
          {newsletter.subtitle && (
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground">
              {newsletter.subtitle}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.15] mb-6">
          {newsletter.title}
        </h1>

        {/* Excerpt */}
        {newsletter.excerpt && (
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
            {newsletter.excerpt}
          </p>
        )}

        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-4 border-t border-border/40">
          <div className="flex items-center gap-4 font-medium">
            <time dateTime={newsletter.published_at}>
              {formatDate(newsletter.published_at)}
            </time>
            <span className="text-border">•</span>
            <span>{readMinutes} min read</span>
          </div>

          {/* Tags */}
          {newsletter.tags && newsletter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {newsletter.tags.map((tag) => (
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

      {/* Main Newsletter Blocks Rendered */}
      <div className="my-10">
        <NewsletterBlockRenderer blocks={newsletter.blocks} />
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
              Enjoyed this dispatch?
            </h3>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Share it with fellow researchers and colleagues, or subscribe to get every
              upcoming monthly newsletter edition directly in your inbox.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/newsletter"
              className="px-6 py-3 bg-foreground text-background font-medium text-sm transition-colors hover:bg-foreground/90 whitespace-nowrap"
            >
              Browse All Issues
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
