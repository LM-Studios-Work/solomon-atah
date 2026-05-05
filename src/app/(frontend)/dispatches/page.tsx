import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPublishedDispatches } from '@/lib/data'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Dispatches',
  description: 'Essays, reading lists, and reflections from conversations at the frontier of scholarship.',
}

export default function DispatchesPage() {
  const dispatches = getPublishedDispatches()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Field Notes</p>
        <h1 className="font-fraunces text-5xl md:text-6xl font-light mb-4">Dispatches</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Essays, reading lists, and reflections, delivered when we have something worth saying.
        </p>
      </header>

      {dispatches.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground text-lg mb-2">The first dispatch is forthcoming.</p>
          <p className="text-sm text-muted-foreground">Subscribe below to receive it when it arrives.</p>
        </div>
      ) : (
        <div className="space-y-0 divide-y divide-border">
          {dispatches.map((dispatch) => (
            <article key={dispatch.id} className="py-8 grid sm:grid-cols-4 gap-6 items-start">
              {dispatch.coverImage && (
                <div className="sm:col-span-1">
                  <div className="relative aspect-[4/3] bg-muted rounded-sm overflow-hidden">
                    <Image
                      src={dispatch.coverImage.url}
                      alt={dispatch.coverImage.alt || dispatch.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 25vw"
                    />
                  </div>
                </div>
              )}
              <div className={dispatch.coverImage ? 'sm:col-span-3' : 'sm:col-span-4'}>
                <div className="flex items-center gap-3 mb-2">
                  {dispatch.issue && (
                    <span className="text-xs font-mono text-muted-foreground">#{String(dispatch.issue).padStart(3, '0')}</span>
                  )}
                  <span className="text-xs font-medium uppercase tracking-wide text-gold">
                    {dispatch.type}
                  </span>
                </div>
                <h2 className="font-fraunces text-2xl mb-2">
                  <Link href={`/dispatches/${dispatch.slug}`} className="hover:text-purple transition-colors">
                    {dispatch.title}
                  </Link>
                </h2>
                {dispatch.excerpt && (
                  <p className="text-muted-foreground leading-relaxed text-sm mb-3 line-clamp-3">
                    {dispatch.excerpt}
                  </p>
                )}
                <time className="text-xs text-muted-foreground">{formatDate(dispatch.publishedAt)}</time>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
