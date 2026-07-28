"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/content/data/navigation.data";

function isActiveHref(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

function getFocusableElements(
  menu: HTMLElement | null,
  toggle: HTMLButtonElement | null
): HTMLElement[] {
  const menuElements = menu
    ? Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"])'
        )
      )
    : [];

  return toggle ? [toggle, ...menuElements] : menuElements;
}

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;

    const updateScrolledState = () => {
      frame = 0;
      const nextState = window.scrollY > 40;
      setIsScrolled((currentState) =>
        currentState === nextState ? currentState : nextState
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusableElements(menuRef.current, toggleRef.current);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    const timeout = window.setTimeout(() => firstMobileLinkRef.current?.focus(), 80);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timeout);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="site-header sticky top-0 z-50"
        data-scrolled={isScrolled ? "true" : "false"}
        data-menu-open={isMenuOpen ? "true" : "false"}
      >
        <div className="site-header__surface">
          <div className="site-container py-5">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="no-underline group relative z-50"
                aria-label="Dama Venus — Home"
              >
                <span
                  className="site-header__brand block text-primary"
                  style={{
                    fontFamily: "var(--font-bodoni), Georgia, serif",
                    fontSize: "0.85rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    fontWeight: 400
                  }}
                >
                  Dama Venus
                </span>
              </Link>

              <button
                ref={toggleRef}
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls={menuId}
                aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
                className="relative z-50 inline-flex min-h-11 items-center text-muted hover:text-primary md:hidden"
                style={{
                  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  transition: "color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  <span
                    aria-hidden="true"
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

              <nav aria-label="Primary Navigation" className="hidden items-center gap-10 md:flex">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActiveHref(item.href, pathname) ? "page" : undefined}
                    className={[
                      "nav-link inline-flex min-h-11 items-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-current md:min-h-0",
                      isActiveHref(item.href, pathname) ? "nav-link--active" : ""
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{
                      fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                      fontWeight: 500,
                      fontSize: "0.6rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase"
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </header>

      <nav
        ref={menuRef}
        id={menuId}
        aria-label="Primary Navigation Mobile"
        className="mobile-menu-overlay md:hidden"
        data-open={isMenuOpen ? "true" : "false"}
      >
        <div className="space-y-1">
          {navigationItems.map((item, index) => (
            <div key={item.href}>
              <Link
                href={item.href}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                tabIndex={isMenuOpen ? undefined : -1}
                aria-current={isActiveHref(item.href, pathname) ? "page" : undefined}
                className="mobile-nav-link block"
                onClick={() => setIsMenuOpen(false)}
                style={{
                  fontFamily: "var(--font-bodoni), Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(2rem, 6vw, 3.5rem)",
                  fontWeight: 400,
                  opacity: isMenuOpen ? 1 : 0,
                  transform: isMenuOpen ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.07}s, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 0.07}s, color 0.3s`
                }}
              >
                {item.label}
              </Link>
              {index < navigationItems.length - 1 && (
                <div
                  className="my-2"
                  style={{
                    height: "1px",
                    background: "rgba(200,168,126,0.1)",
                    opacity: isMenuOpen ? 1 : 0,
                    transition: `opacity 0.4s ${index * 0.07 + 0.1}s`
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-12 left-0 right-0 px-6"
          style={{
            opacity: isMenuOpen ? 1 : 0,
            transition: "opacity 0.6s 0.4s"
          }}
          aria-hidden="true"
        >
          <div className="h-px mb-6" style={{ background: "rgba(200,168,126,0.12)" }} />
          <p
            style={{
              fontFamily: "var(--font-montserrat), system-ui, sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(200,168,126,0.4)"
            }}
          >
            Sound. Vision. Reign.
          </p>
        </div>
      </nav>
    </>
  );
}
