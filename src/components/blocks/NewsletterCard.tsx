import React from 'react';
import Link from 'next/link';
import { Newsletter } from '@/types/newsletter';
import { formatDate } from '@/lib/utils';

interface Props {
  newsletter: Newsletter;
  featured?: boolean;
}

export function NewsletterCard({ newsletter, featured = false }: Props) {
  return (
    <article
      className={`group flex flex-col border border-border rounded-sm overflow-hidden hover:border-purple/30 transition-colors bg-card h-full ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`flex flex-col flex-1 ${featured ? 'p-8 md:p-10' : 'p-6'}`}>
        {/* Top Metadata */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          {newsletter.issue_number && (
            <span className="font-mono text-xs font-bold text-gold px-2.5 py-1 rounded-sm bg-gold/10 border border-gold/30">
              ISSUE #{String(newsletter.issue_number).padStart(3, '0')}
            </span>
          )}
          <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
            {newsletter.type}
          </span>
        </div>

        {/* Subtitle / Series if any */}
        {newsletter.subtitle && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
            {newsletter.subtitle}
          </p>
        )}

        {/* Title */}
        <h3
          className={`font-fraunces font-light leading-snug mb-3 flex-1 ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          }`}
        >
          <Link href={`/newsletter/${newsletter.slug}`} className="hover:text-purple transition-colors">
            {newsletter.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {newsletter.excerpt && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
            {newsletter.excerpt}
          </p>
        )}

        {/* Tags */}
        {newsletter.tags && newsletter.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
            {newsletter.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded-sm bg-muted/60 text-muted-foreground border border-border/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Card Footer */}
        <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
          <time className="text-xs text-muted-foreground">
            {formatDate(newsletter.published_at)}
          </time>
          <Link
            href={`/newsletter/${newsletter.slug}`}
            className="text-xs font-medium text-purple hover:underline"
          >
            Read Dispatch →
          </Link>
        </div>
      </div>
    </article>
  );
}
