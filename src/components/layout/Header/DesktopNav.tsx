"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="hidden xl:flex items-stretch self-stretch"
      aria-label="Main navigation"
    >
      {links.map((link) => {
        const active = isActivePath(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center px-3.5 text-[12px] font-semibold tracking-[0.01em] whitespace-nowrap transition-colors ${
              active
                ? "text-gold"
                : "text-white/82 hover:text-white"
            }`}
          >
            <span>{link.label}</span>
            <span
              className={`absolute left-3.5 right-3.5 bottom-3 h-0.5 rounded-full transition-all ${
                active ? "bg-gold" : "bg-white/0"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
