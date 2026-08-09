import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Newsletter } from '@/types/newsletter';
import { formatDate } from '@/lib/utils';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

interface Props {
  newsletter: Newsletter;
  featured?: boolean;
}

export function NewsletterCard({ newsletter, featured = false }: Props) {
  return (
    <article
      className={`group relative rounded-xl border border-border bg-card/50 hover:bg-card hover:border-gold/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
        featured ? 'md:col-span-2 p-8 bg-gradient-to-br from-purple/10 via-card to-card border-gold/40' : 'p-6'
      }`}
    >
      <div>
        {/* Top Metadata */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            {newsletter.issue_number && (
              <span className="font-mono text-xs font-bold text-gold px-2.5 py-1 rounded-md bg-gold/10 border border-gold/30">
                ISSUE #{String(newsletter.issue_number).padStart(3, '0')}
              </span>
            )}
            <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
              {newsletter.type}
            </span>
          </div>

          <time className="text-xs text-muted-foreground">
            {formatDate(newsletter.published_at)}
          </time>
        </div>

        {/* Subtitle / Series if any */}
        {newsletter.subtitle && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
            {newsletter.subtitle}
          </p>
        )}

        {/* Title */}
        <h3
          className={`font-fraunces font-light text-foreground group-hover:text-gold transition-colors leading-snug mb-3 ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
          }`}
        >
          <Link href={`/newsletter/${newsletter.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
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
          <div className="flex flex-wrap gap-1.5 mb-6">
            {newsletter.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-medium px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-medium text-gold">
        <span className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Read Dispatch</span>
        </span>
        <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          <span>Explore Issue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
}
