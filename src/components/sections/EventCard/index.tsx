import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Landmark, MapPin, Mic2 } from 'lucide-react'

export type EventCardEvent = {
  title: string
  subtitle?: string
  presenter?: string
  date: string
  location: string
  type: string
  hashtag?: string
  image: string
  mapEmbedUrl?: string
}

type EventCardProps = {
  event: EventCardEvent
  variant?: 'featured' | 'compact'
  ctaHref?: string
  ctaLabel?: string
  showMap?: boolean
  showAcademicBadge?: boolean
}

export function EventCard({
  event,
  variant = 'featured',
  ctaHref = '/contact',
  ctaLabel = 'Register Interest',
  showMap = false,
  showAcademicBadge = false,
}: EventCardProps) {
  if (variant === 'compact') {
    return (
      <article className="flex flex-col gap-6">
        <Link href={ctaHref} className="group block">
          <div className="relative w-full overflow-hidden rounded-sm bg-card">
            <Image
              src={event.image}
              alt={event.title}
              width={1200}
              height={800}
              className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center">
          {event.presenter && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {event.presenter}
            </p>
          )}
          <h3 className="mb-2 font-fraunces text-3xl font-light md:text-4xl">{event.title}</h3>
          {event.subtitle && <p className="mb-5 italic text-muted-foreground">{event.subtitle}</p>}
          <div className="mb-6 space-y-2">
            <p className="text-sm font-medium">{event.date}</p>
            <p className="text-sm text-muted-foreground">{event.location}</p>
          </div>
          <Link
            href={ctaHref}
            className="inline-flex w-fit items-center rounded-sm bg-purple px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple/90"
          >
            {ctaLabel}
          </Link>
        </div>
      </article>
    )
  }

  return (
    <article className="overflow-hidden border border-border bg-card shadow-[0_18px_42px_rgba(0,0,0,0.06)]">
      <div
        className={
          showMap && event.mapEmbedUrl
            ? 'grid gap-0 lg:grid-cols-2'
            : 'grid gap-8 p-6 lg:grid-cols-2 md:p-8 lg:items-center'
        }
      >
        <div
          className={
            showMap && event.mapEmbedUrl
              ? 'relative w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-border flex items-center justify-center bg-card lg:h-full'
              : 'relative w-full overflow-hidden rounded-sm shadow-md bg-card'
          }
        >
          <Image
            src={event.image}
            alt={event.title}
            width={1600}
            height={1000}
            className="w-full h-auto object-contain"
            sizes={showMap && event.mapEmbedUrl ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 1024px) 100vw, 50vw'}
          />
        </div>

        <div className="flex flex-col h-full">
          <div className={showMap && event.mapEmbedUrl ? "flex flex-col justify-center p-6 sm:p-8 flex-1" : "py-2 flex-1 flex flex-col justify-center"}>
            {showAcademicBadge ? (
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  <CalendarDays className="h-3.5 w-3.5 text-gold" strokeWidth={1.6} />
                  {event.type}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                  <Landmark className="h-3.5 w-3.5 text-gold" strokeWidth={1.6} />
                  Academic programme
                </span>
              </div>
            ) : (
              event.presenter && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  {event.presenter}
                </p>
              )
            )}

            <h2 className="mb-3 font-fraunces text-3xl font-light leading-tight md:text-5xl lg:text-4xl xl:text-5xl">
              {event.title}
            </h2>
            {event.subtitle && <p className="mb-7 max-w-2xl italic text-muted-foreground">{event.subtitle}</p>}
            <div
              className={
                showMap && event.mapEmbedUrl
                  ? 'mb-8 grid gap-4 text-sm text-muted-foreground sm:grid-cols-2'
                  : 'mb-7 space-y-2'
              }
            >
              <span className={showMap && event.mapEmbedUrl ? 'inline-flex items-center gap-2' : 'block text-sm font-semibold text-gold'}>
                {showMap && event.mapEmbedUrl && (
                  <CalendarDays className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                )}
                {event.date}
              </span>
              <span className={showMap && event.mapEmbedUrl ? 'inline-flex items-center gap-2' : 'block text-sm text-muted-foreground'}>
                {showMap && event.mapEmbedUrl && (
                  <MapPin className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                )}
                {event.location}
              </span>
              {showMap && event.mapEmbedUrl ? (
                <span className="inline-flex items-center gap-2 font-medium text-purple sm:col-span-2 mt-2">
                  <Mic2 className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} />
                  {event.type}
                </span>
              ) : (
                event.hashtag && <span className="block text-sm font-medium text-purple">{event.hashtag}</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={ctaHref}
                className="inline-flex w-fit items-center rounded-sm bg-purple px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-purple-800"
              >
                {ctaLabel}
              </Link>
              {showMap && event.hashtag && (
                <span className="text-sm font-medium text-purple">{event.hashtag}</span>
              )}
            </div>
          </div>

          {showMap && event.mapEmbedUrl && (
            <div className="bg-muted/20 p-4 sm:p-5 border-t border-border">
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Location
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-purple">
                  <MapPin className="h-4 w-4 text-gold" strokeWidth={1.6} />
                  {event.location.split(',')[0]}
                </span>
              </div>
              <div className="aspect-[21/9] overflow-hidden border border-border bg-card shadow-sm lg:aspect-[16/9]">
                <iframe
                  title={`${event.title} map location`}
                  src={event.mapEmbedUrl}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
