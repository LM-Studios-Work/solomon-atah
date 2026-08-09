import React from 'react';
import Image from 'next/image';
import { NewsletterBlock } from '@/types/newsletter';

// Helper to safely render simple markdown-like inline formatting (**bold**, *italic*, #hashtags)
export function renderFormattedText(text: string): React.ReactNode {
  if (!text) return '';

  // Split by bold (**text**), italic (*text*), and hashtags
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|#\w+)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-foreground/90">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('#')) {
      return (
        <span key={index} className="font-semibold text-gold tracking-wide">
          {part}
        </span>
      );
    }
    return part;
  });
}

interface Props {
  blocks: NewsletterBlock[];
  className?: string;
}

export function NewsletterBlockRenderer({ blocks, className = '' }: Props) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-7 max-w-3xl mx-auto text-foreground/90 ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            if (block.level === 2) {
              return (
                <h2
                  key={block.id || idx}
                  className="font-fraunces text-2xl md:text-3xl font-light text-foreground mt-12 mb-4 pt-4 border-t border-border/60 first:mt-0 first:pt-0 first:border-0 leading-tight"
                >
                  {renderFormattedText(block.text)}
                </h2>
              );
            }
            if (block.level === 3) {
              return (
                <h3
                  key={block.id || idx}
                  className="font-fraunces text-xl md:text-2xl font-light text-foreground mt-8 mb-3"
                >
                  {renderFormattedText(block.text)}
                </h3>
              );
            }
            return (
              <h4
                key={block.id || idx}
                className="font-fraunces text-lg md:text-xl font-normal text-foreground mt-6 mb-2"
              >
                {renderFormattedText(block.text)}
              </h4>
            );
          }

          case 'paragraph': {
            return (
              <p
                key={block.id || idx}
                className="text-base md:text-lg text-muted-foreground leading-[1.8] tracking-[0.01em]"
              >
                {renderFormattedText(block.text)}
              </p>
            );
          }

          case 'list': {
            const isNumbered = block.style === 'numbered';
            return (
              <div key={block.id || idx} className="my-6">
                {isNumbered ? (
                  <ol className="space-y-3.5 pl-2">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3.5 text-base md:text-lg text-muted-foreground leading-[1.75]">
                        <span className="font-mono text-xs font-bold text-gold px-2 py-0.5 rounded bg-gold/10 border border-gold/20 shrink-0 mt-1">
                          {String(itemIdx + 1).padStart(2, '0')}
                        </span>
                        <div className="flex-1">{renderFormattedText(item)}</div>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <ul className="space-y-3.5 pl-2">
                    {block.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-base md:text-lg text-muted-foreground leading-[1.75]">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-2.5 shadow-[0_0_8px_rgba(201,168,76,0.6)]" />
                        <div className="flex-1">{renderFormattedText(item)}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          }

          case 'quote': {
            return (
              <blockquote
                key={block.id || idx}
                className="relative my-10 pl-6 md:pl-8 py-3 border-l-2 border-gold bg-gold/[0.03] rounded-r-lg"
              >
                <p className="font-fraunces text-xl md:text-2xl italic font-light text-foreground leading-relaxed">
                  "{renderFormattedText(block.text)}"
                </p>
                {block.attribution && (
                  <cite className="block text-xs font-semibold uppercase tracking-[0.18em] text-gold mt-3 not-italic">
                    — {block.attribution}
                  </cite>
                )}
              </blockquote>
            );
          }

          case 'callout': {
            const isPurple = block.variant === 'purple';
            const isGold = block.variant === 'gold' || !block.variant;

            return (
              <div
                key={block.id || idx}
                className={`my-8 p-6 rounded-lg border transition-all ${
                  isGold
                    ? 'bg-gold/5 border-gold/30 text-foreground shadow-sm'
                    : isPurple
                    ? 'bg-purple/10 border-purple/30 text-foreground shadow-sm'
                    : 'bg-muted/40 border-border text-foreground'
                }`}
              >
                {block.title && (
                  <h4 className="font-fraunces text-lg font-semibold mb-2 flex items-center gap-2 text-gold">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    {block.title}
                  </h4>
                )}
                <p className="text-base text-muted-foreground leading-relaxed">
                  {renderFormattedText(block.text)}
                </p>
              </div>
            );
          }

          case 'image': {
            return (
              <figure key={block.id || idx} className="my-10">
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-muted/30 border border-border shadow-sm">
                  <Image
                    src={block.url}
                    alt={block.alt || 'Newsletter image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 768px"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-center text-xs text-muted-foreground mt-3 italic">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case 'divider': {
            return (
              <div key={block.id || idx} className="my-10 flex items-center justify-center gap-3">
                <div className="h-px bg-border flex-1" />
                <span className="text-gold text-xs tracking-widest uppercase">✦ ✦ ✦</span>
                <div className="h-px bg-border flex-1" />
              </div>
            );
          }

          default:
            return null;
        }
      })}
    </div>
  );
}
