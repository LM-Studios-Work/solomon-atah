import React from 'react';
import Link from 'next/link';
import { Blog } from '@/types/blog';
import { formatDate } from '@/lib/utils';

interface Props {
  blog: Blog;
  featured?: boolean;
}

export function BlogCard({ blog, featured = false }: Props) {
  return (
    <article
      className={`group flex flex-col border border-border rounded-sm overflow-hidden hover:border-purple/30 transition-colors bg-card h-full ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`flex flex-col flex-1 ${featured ? 'p-8 md:p-10' : 'p-6'}`}>
        {/* Top Metadata */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
            Blog
          </span>
        </div>

        {/* Subtitle / Series if any */}
        {blog.subtitle && (
          <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
            {blog.subtitle}
          </p>
        )}

        {/* Title */}
        <h3
          className={`font-fraunces font-light leading-snug mb-3 flex-1 ${
            featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
          }`}
        >
          <Link href={`/blog/${blog.slug}`} className="hover:text-purple transition-colors">
            {blog.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-6">
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
            {blog.tags.slice(0, 3).map((tag) => (
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
            {formatDate(blog.published_at)}
          </time>
          <Link
            href={`/blog/${blog.slug}`}
            className="text-xs font-medium text-purple hover:underline"
          >
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
}
