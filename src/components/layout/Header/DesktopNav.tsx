"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

interface NavLink {
  label: string;
  href?: string;
  subLinks?: { label: string; href: string }[];
}

function isActivePath(pathname: string, href?: string) {
  if (!href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <nav
      className="hidden xl:flex flex-1 items-stretch justify-center self-stretch gap-6 2xl:gap-10"
      aria-label="Main navigation"
    >
      {links.map((link) => {
        const active = link.href 
          ? isActivePath(pathname, link.href) 
          : link.subLinks?.some(sub => isActivePath(pathname, sub.href));

        if (link.subLinks) {
          return (
            <div key={link.label} className="relative flex items-stretch group">
              <button
                className={`relative flex items-center gap-1.5 px-3 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
                  active
                    ? "text-gold"
                    : "text-white/85 group-hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                <span
                  className={`absolute left-3 right-3 bottom-3 h-0.5 rounded-full transition-all ${
                    active ? "bg-gold" : "bg-white/0"
                  }`}
                />
              </button>
              
              <div className="absolute top-[90%] left-1/2 -translate-x-1/2 min-w-[220px] pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-purple shadow-2xl border border-gold/20 rounded-md py-2.5 flex flex-col gap-1 backdrop-blur-md">
                  {link.subLinks.map((subLink) => {
                    const subActive = isActivePath(pathname, subLink.href);
                    return (
                      <Link
                        key={subLink.href}
                        href={subLink.href}
                        className={`px-5 py-2.5 text-sm font-medium transition-colors ${
                          subActive ? "text-gold bg-white/5" : "text-white/85 hover:text-gold hover:bg-white/5"
                        }`}
                      >
                        {subLink.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={link.label}
            href={link.href!}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center px-3 text-sm font-semibold tracking-wide whitespace-nowrap transition-colors ${
              active
                ? "text-gold"
                : "text-white/85 hover:text-white"
            }`}
          >
            <span>{link.label}</span>
            <span
              className={`absolute left-3 right-3 bottom-3 h-0.5 rounded-full transition-all ${
                active ? "bg-gold" : "bg-white/0"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
