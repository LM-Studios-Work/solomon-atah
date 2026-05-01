import Link from 'next/link'
import Image from 'next/image'

export interface ScholarCardData {
  id: string
  name: string
  slug: string
  title?: string | null
  photo?: { url: string; alt: string } | null
  researchFocus?: string | null
  institution?: { name: string; shortName?: string | null; country?: string | null } | null
  disciplines?: Array<{ id: string; name: string; slug: string }>
  country?: string | null
}

export function ScholarCard({ scholar }: { scholar: ScholarCardData }) {
  return (
    <article className="group flex gap-5 py-5 border-b border-border hover:bg-muted/30 transition-colors px-2 -mx-2">
      {/* Photo */}
      <div className="flex-shrink-0">
        {scholar.photo ? (
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted ring-2 ring-border group-hover:ring-purple/30 transition-all">
            <Image
              src={scholar.photo.url}
              alt={scholar.photo.alt}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-purple/10 flex items-center justify-center ring-2 ring-border">
            <span className="font-fraunces text-xl text-purple font-bold">
              {scholar.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-fraunces text-lg leading-tight mb-0.5">
          <Link
            href={`/scholars/${scholar.slug}`}
            className="hover:text-purple transition-colors"
          >
            {scholar.name}
          </Link>
        </h3>
        {scholar.title && (
          <p className="text-sm text-muted-foreground leading-snug mb-1">{scholar.title}</p>
        )}
        {scholar.institution && (
          <p className="text-xs text-muted-foreground mb-2">
            {scholar.institution.shortName || scholar.institution.name}
            {scholar.institution.country && ` · ${scholar.institution.country}`}
          </p>
        )}
        {scholar.researchFocus && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {scholar.researchFocus}
          </p>
        )}
        {scholar.disciplines && scholar.disciplines.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {scholar.disciplines.slice(0, 3).map((d) => (
              <Link key={d.id} href={`/disciplines/${d.slug}`} className="discipline-tag">
                {d.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
