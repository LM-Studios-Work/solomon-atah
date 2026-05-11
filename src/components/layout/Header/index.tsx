import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

const NAV_LINKS = [
  { label: "Solomon Atah Podcast", href: "/solomon-atah-podcast" },
  { label: "Research & Publishing", href: "/research" },
  { label: "Academic Services", href: "/academic-services" },
  { label: "Events", href: "/events" },
  { label: "Film Projects", href: "/film" },
  { label: "Merchandise & Books", href: "/merchandise" },
  { label: "Donate", href: "/support" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-purple text-white shadow-[0_12px_32px_rgba(45,18,41,0.22)] border-b border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-stretch justify-between h-[72px] gap-8">
          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 ring-gold/75 ring-offset-2 ring-offset-purple bg-white shadow-sm">
              <Image
                src="/company%20resources/logo%20solomon%20atah%20main%20company.jpeg"
                alt="Solomon Atah Pty Ltd"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-fraunces text-xl font-semibold text-white group-hover:text-gold transition-colors">
                Solomon Atah
              </span>
              <span className="mt-1 text-[10px] font-semibold tracking-[0.22em] uppercase text-gold/90">
                Pty Ltd
              </span>
            </div>
          </Link>

          <DesktopNav links={NAV_LINKS} />

          {/* Right actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <ThemeToggle className="text-white/80 hover:text-gold" />
            <MobileMenu links={NAV_LINKS} />
          </div>
        </div>
      </div>
    </header>
  );
}
