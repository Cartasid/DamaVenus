"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/content/data/navigation.data";
import { siteConfig } from "@/content/data/site.config";

function isActiveHref(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    firstMobileLinkRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-surface/80 backdrop-blur-sm">
      <div className="site-container py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-lg font-semibold tracking-wide no-underline">
            {siteConfig.name}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            Menu
          </button>

          <nav aria-label="Primary Navigation" className="hidden items-center gap-4 text-sm md:flex">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActiveHref(item.href, pathname) ? "page" : undefined}
                className={["nav-link min-h-11 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current md:inline-flex md:min-h-0", isActiveHref(item.href, pathname) ? "nav-link--active" : ""].filter(Boolean).join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {isMenuOpen ? (
          <nav
            id={menuId}
            aria-label="Primary Navigation Mobile"
            className="mt-3 flex flex-col text-sm text-muted md:hidden"
          >
            {navigationItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                aria-current={isActiveHref(item.href, pathname) ? "page" : undefined}
                className={["nav-link inline-flex min-h-11 items-center rounded-md px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current", isActiveHref(item.href, pathname) ? "nav-link--active" : ""].filter(Boolean).join(" ")}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
