import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">404</p>
        <h1 className="font-fraunces text-4xl md:text-5xl font-light mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">
          The page you are looking for does not exist, or may have been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-purple text-white font-medium rounded-sm hover:bg-purple/90 transition-colors"
          >
            Return Home
          </Link>
          <Link
            href="/solomon-atah-podcast"
            className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-sm hover:border-purple/40 transition-colors"
          >
            Browse Podcast
          </Link>
        </div>
      </div>
    </div>
  )
}
