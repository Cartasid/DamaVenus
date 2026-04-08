"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/content/data/navigation.data";

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
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const timeout = setTimeout(() => firstMobileLinkRef.current?.focus(), 100);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimeout(timeout);
    };
  }, [isMenuOpen]);

  const headerBg = isScrolled
    ? "bg-black/90 backdrop-blur-md border-b border-white/[0.06]"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{ transition: "background-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
      >
        <div className={headerBg} style={{ transition: "background-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
          <div className="site-container py-5">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <Link
                href="/"
                className="no-underline group relative z-50"
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
                className="relative z-50 inline-flex min-h-11 items-center text-muted hover:text-primary md:hidden"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  transition: "color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  {/* Hamburger / X icon */}
                  <span
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: isMenuOpen ? "0px" : "4px",
                      width: "18px",
                      transition: "gap 0.3s"
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        width: "100%",
                        height: "1px",
                        background: "currentColor",
                        transform: isMenuOpen ? "rotate(45deg) translateY(0.5px)" : "none",
                        transition: "transform 0.3s"
                      }}
                    />
                    <span
                      style={{
                        display: "block",
                        width: "100%",
                        height: "1px",
                        background: "currentColor",
                        transform: isMenuOpen ? "rotate(-45deg) translateY(-0.5px)" : "none",
                        transition: "transform 0.3s"
                      }}
                    />
                  </span>
                  {isMenuOpen ? "Close" : "Menu"}
                </span>
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
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <nav
        id={menuId}
        aria-label="Primary Navigation Mobile"
        className="mobile-menu-overlay md:hidden"
        data-open={isMenuOpen ? "true" : "false"}
      >
        <div className="space-y-2">
          {navigationItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              ref={index === 0 ? firstMobileLinkRef : undefined}
              aria-current={isActiveHref(item.href, pathname) ? "page" : undefined}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
              style={{
                opacity: isMenuOpen ? 1 : 0,
                transform: isMenuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.06}s, transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.06}s, color 0.3s`
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bottom info in mobile menu */}
        <div
          className="absolute bottom-12 left-0 right-0"
          style={{
            paddingLeft: "inherit",
            paddingRight: "inherit",
            opacity: isMenuOpen ? 1 : 0,
            transition: "opacity 0.5s 0.3s"
          }}
        >
          <div className="h-px mb-6" style={{ background: "rgba(255,255,255,0.06)" }} />
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1rem",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgba(255,255,255,0.3)"
            }}
          >
            Music. Image. Presence.
          </p>
        </div>
      </nav>
    </>
  );
}
