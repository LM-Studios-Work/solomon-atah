import Link from "next/link";
import Image from "next/image";

const FOOTER_COLUMNS = [
  {
    heading: "Solomon Atah Podcast",
    links: [
      { label: "Podcast", href: "/solomon-atah-podcast" },
      { label: "Scholars", href: "/scholars" },
      { label: "Conversations", href: "/conversations" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Blog", href: "/blog" },
      { label: "Speakers", href: "/speakers" },
      { label: "Dispatches", href: "/dispatches" },
      { label: "Propose a Conversation", href: "/propose" },
    ],
  },
  {
    heading: "Research & Publishing",
    links: [
      { label: "Research", href: "/research" },
      { label: "Research Publishing", href: "/research-publishing" },
      { label: "Disciplines", href: "/disciplines" },
      { label: "Academic Services", href: "/academic-services" },
    ],
  },
  {
    heading: "Media & Company",
    links: [
      { label: "Events", href: "/events" },
      { label: "Film Projects", href: "/film" },
      { label: "Merchandise & Books", href: "/merchandise" },
      { label: "Media", href: "/media" },
      { label: "About", href: "/about" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { label: "Donate", href: "/support" },
      { label: "Partner With Us", href: "/partner" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 bg-purple text-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4 xl:col-span-3">
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
            <p className="text-xs text-purple-300 italic mb-3">
              Memoria Aedificat Futurum
            </p>
            <p className="text-sm text-purple-100 leading-relaxed max-w-xs">
              A sovereign intellectual holding company building durable
              knowledge infrastructures across media, research, publishing, and
              cultural production.
            </p>
          </div>

          {/* Nav columns */}
          <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
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
                          className="text-sm text-purple-200 hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-purple-200 hover:text-white transition-colors"
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
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-purple-800/50 flex flex-col gap-6">
          <div className="flex flex-wrap justify-center sm:justify-start gap-x-2 gap-y-2 text-xs text-purple-300">
            <Link href="/legal#privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span className="opacity-50">|</span>
            <Link href="/legal#terms" className="hover:text-white transition-colors">Terms</Link>
            <span className="opacity-50">|</span>
            <Link href="/legal#cookies" className="hover:text-white transition-colors">Cookies</Link>
            <span className="opacity-50">|</span>
            <Link href="/legal#podcast-consent" className="hover:text-white transition-colors">Podcast Consent</Link>
            <span className="opacity-50">|</span>
            <Link href="/legal#disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <span className="opacity-50">|</span>
            <Link href="/legal#copyright" className="hover:text-white transition-colors">Copyright</Link>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
            <p className="text-xs text-purple-300 text-center sm:text-left">
              &copy; {year} Solomon Atah Pty Ltd. All rights reserved.
            </p>
            <p className="text-xs text-purple-300 italic text-center sm:text-right">
              Rooted in South Africa. In conversation with the world.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
