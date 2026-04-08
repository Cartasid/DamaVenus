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
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

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

  const headerBg = isScrolled
    ? "bg-black/90 backdrop-blur-md border-b border-white/[0.06]"
    : "bg-transparent border-b border-transparent";

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-500"
      style={{ transition: "background-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
    >
      <div className={`${headerBg}`} style={{ transition: "background-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
        <div className="site-container py-5">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="no-underline group"
              aria-label="Dama Venus — Home"
            >
              <span
                className="block text-primary"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  transition: "color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
              >
                Dama Venus
              </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              className="inline-flex min-h-11 items-center text-muted hover:text-primary md:hidden"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? "Close" : "Menu"}
            </button>

            {/* Desktop navigation */}
            <nav aria-label="Primary Navigation" className="hidden items-center gap-8 md:flex">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveHref(item.href, pathname) ? "page" : undefined}
                  className={[
                    "nav-link inline-flex min-h-11 items-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current md:min-h-0",
                    isActiveHref(item.href, pathname) ? "nav-link--active" : ""
                  ].filter(Boolean).join(" ")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Mobile menu */}
          {isMenuOpen ? (
            <nav
              id={menuId}
              aria-label="Primary Navigation Mobile"
              className="mt-6 flex flex-col gap-1 pb-4 md:hidden"
            >
              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  aria-current={isActiveHref(item.href, pathname) ? "page" : undefined}
                  className={[
                    "nav-link inline-flex min-h-11 items-center px-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current",
                    isActiveHref(item.href, pathname) ? "nav-link--active" : ""
                  ].filter(Boolean).join(" ")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
