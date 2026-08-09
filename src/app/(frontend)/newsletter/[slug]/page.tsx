import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsletterBySlug, getPublishedNewsletters } from '@/lib/newsletter-data';
import { formatDate } from '@/lib/utils';
import { NewsletterBlockRenderer } from '@/components/blocks/NewsletterBlockRenderer';
import { ArrowLeft, BookOpen, Clock, Share2, Sparkles, PenSquare } from 'lucide-react';

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
          className="inline-flex items-center gap-1.5 hover:text-gold transition-colors font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Newsletters</span>
        </Link>
      </nav>

      {/* Article Header */}
      <header className="mb-14 pb-10 border-b border-border">
        {/* Issue Series & Number */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {newsletter.issue_number && (
            <span className="font-mono text-xs font-bold text-gold px-2.5 py-1 rounded bg-gold/10 border border-gold/30">
              ISSUE #{String(newsletter.issue_number).padStart(3, '0')}
            </span>
          )}
          {newsletter.subtitle && (
            <span className="text-xs font-semibold tracking-wider uppercase text-gold">
              {newsletter.subtitle}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-[1.15] mb-6 text-balance">
          {newsletter.title}
        </h1>

        {/* Excerpt */}
        {newsletter.excerpt && (
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic max-w-3xl mb-8 border-l-2 border-gold/40 pl-4">
            {newsletter.excerpt}
          </p>
        )}

        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-muted-foreground pt-4 border-t border-border/40">
          <div className="flex items-center gap-4">
            <time dateTime={newsletter.published_at}>
              {formatDate(newsletter.published_at)}
            </time>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span>{readMinutes} min read</span>
            </span>
          </div>

          {/* Tags */}
          {newsletter.tags && newsletter.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {newsletter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground"
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
      <footer className="mt-16 pt-12 border-t border-border space-y-10">
        <div className="p-8 rounded-2xl bg-card border border-gold/30 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>The Solomon Atah Podcast</span>
            </span>
            <h3 className="font-fraunces text-2xl font-light text-foreground mb-2">
              Enjoyed this dispatch?
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Share it with fellow researchers and colleagues, or subscribe to get every
              upcoming monthly newsletter edition directly in your inbox.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/newsletter"
              className="px-4 py-2.5 rounded-lg bg-gold hover:bg-gold-400 text-gold-foreground font-semibold text-xs transition-colors shadow-sm"
            >
              Browse All Issues
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
