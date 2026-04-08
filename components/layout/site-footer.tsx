import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";

const socialLinks = [
  { label: "Spotify", href: "https://open.spotify.com/artist/damavenus" },
  { label: "Instagram", href: "https://www.instagram.com/damavenus" },
  { label: "YouTube", href: "https://www.youtube.com/@damavenus" }
];

const footerNav = [
  { label: "Music", href: "/music" },
  { label: "Visuals", href: "/visuals" },
  { label: "About", href: "/about" },
  { label: "Press", href: "/press" },
  { label: "Contact", href: "/contact" }
];

const linkStyleBase = {
  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  transition: "color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
};

export default function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="site-container py-16">

        {/* Top — Brand + Statement */}
        <div className="grid gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <p
              className="text-primary"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase"
              }}
            >
              {siteConfig.name}
            </p>
            <p
              className="mt-3 text-white/40"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.3
              }}
            >
              Music. Image. Presence.
            </p>
          </div>

          {/* Navigation grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

            {/* Site links */}
            <div>
              <p
                className="text-mutedFaint mb-4"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}
              >
                Explore
              </p>
              <nav aria-label="Footer Navigation" className="flex flex-col gap-3">
                {footerNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted hover:text-offWhite no-underline"
                    style={linkStyleBase}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div>
              <p
                className="text-mutedFaint mb-4"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}
              >
                Connect
              </p>
              <nav aria-label="Social Links" className="flex flex-col gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-offWhite no-underline"
                    style={linkStyleBase}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div>
              <p
                className="text-mutedFaint mb-4"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase"
                }}
              >
                Legal
              </p>
              <nav aria-label="Legal" className="flex flex-col gap-3">
                <Link
                  href="/privacy"
                  className="text-muted hover:text-offWhite no-underline"
                  style={linkStyleBase}
                >
                  Privacy
                </Link>
                <Link
                  href="/imprint"
                  className="text-muted hover:text-offWhite no-underline"
                  style={linkStyleBase}
                >
                  Imprint
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Bottom row */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span
            className="text-mutedFaint"
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase"
            }}
          >
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span
            className="text-mutedFaint"
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase"
            }}
          >
            Rio de Janeiro &middot; Europe
          </span>
        </div>

      </div>
    </footer>
  );
}
