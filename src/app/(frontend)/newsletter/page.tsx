import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedNewsletters } from '@/lib/newsletter-data';
import { NewsletterCard } from '@/components/blocks/NewsletterCard';
import { Sparkles, Mail, PenSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Newsletter | The Solomon Atah Podcast',
  description:
    'Essays, infrastructure notes, and monthly dispatches from The Solomon Atah Podcast. Translating African scholarship into public value.',
};

export const revalidate = 60; // ISR 1 minute

export default async function NewsletterPage() {
  const newsletters = await getPublishedNewsletters();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header section */}
      <header className="mb-14 pb-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Publications & Field Notes
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-xs font-mono text-muted-foreground">Monthly Series</span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-light text-foreground mb-4 leading-tight">
              Newsletter
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Essays, policy briefings, and reflections on building durable knowledge
              infrastructure for African and global scholarship.
            </p>
          </div>

        </div>
      </header>

      {/* Subscription Callout Banner */}
      <div className="mb-16 p-8 rounded-2xl border border-gold/30 bg-gradient-to-r from-purple/20 via-card to-gold/10 relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>#KnowTomorrowToday</span>
          </div>
          <h2 className="font-fraunces text-2xl md:text-3xl font-light text-foreground mb-3">
            Subscribe to Monthly Briefings
          </h2>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Delivered directly to your inbox. In-depth analysis of research translation,
            institutional discoverability, and conversations with leading scholars.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md" action="#" method="GET">
            <input
              type="email"
              placeholder="Enter your academic or work email"
              required
              className="px-4 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-gold flex-1"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-400 text-gold-foreground font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4" />
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </div>

      {/* Issues Listing */}
      <section>
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border/60">
          <h2 className="font-fraunces text-2xl font-light text-foreground">
            Published Editions
          </h2>
          <span className="text-xs text-muted-foreground font-mono">
            {newsletters.length} {newsletters.length === 1 ? 'Edition' : 'Editions'}
          </span>
        </div>

        {newsletters.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-border rounded-xl">
            <p className="text-muted-foreground text-base mb-3">
              No newsletter issues published yet.
            </p>
            <Link
              href="/newsletter/cms"
              className="text-xs text-gold underline hover:text-gold-400"
            >
              Open CMS Editor to create your first newsletter
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {newsletters.map((newsletter, idx) => (
              <NewsletterCard
                key={newsletter.id || newsletter.slug}
                newsletter={newsletter}
                featured={idx === 0}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
