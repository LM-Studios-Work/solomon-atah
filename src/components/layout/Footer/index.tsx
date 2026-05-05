import Link from "next/link";
import Image from "next/image";

const FOOTER_COLUMNS = [
  {
    heading: "Media",
    links: [
      { label: "Scholars", href: "/scholars" },
      { label: "Dispatches", href: "/dispatches" },
    ],
  },
  {
    heading: "Research & Publishing",
    links: [
      { label: "Ninta Research", href: "/research#ninta-research" },
      { label: "Ninta Publishing", href: "/research#ninta-publishing" },
      { label: "Books", href: "/research#books" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Academic Services", href: "/academic-services" },
      { label: "Film Projects", href: "/film" },
      { label: "Merchandise & Books", href: "/merchandise" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Support Our Work", href: "/support" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Propose a Conversation", href: "/propose" },
      { label: "Contact", href: "/contact" },
      { label: "RSS Feed", href: "/feed.xml", isExternal: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-5">
              <div className="relative w-40 h-24 rounded-sm overflow-hidden bg-black">
                <Image
                  src="/company%20resources/logo%20solomon%20atah%20main%20company.jpeg"
                  alt="Solomon Atah Pty Ltd"
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
            </Link>
            <p className="text-xs text-muted-foreground italic mb-3">
              Memoria Aedificat Futurum
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A sovereign intellectual holding company building durable
              knowledge infrastructures across media, research, publishing, and
              cultural production.
            </p>
          </div>

          {/* Nav columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"isExternal" in link && link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Solomon Atah Pty Ltd. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Rooted in South Africa. In conversation with the world.
          </p>
        </div>
      </div>
    </footer>
  );
}
