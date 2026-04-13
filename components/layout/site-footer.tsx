import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";
import { extendedNavigationItems } from "@/content/data/navigation.data";
import SocialIcon from "@/components/utils/social-icons";

const socialLinks = [
  { label: "Spotify", href: "https://open.spotify.com/artist/damavenus" },
  { label: "Instagram", href: "https://www.instagram.com/ichbindamavenus" },
  { label: "YouTube", href: "https://www.youtube.com/@damavenus" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/damavenus" },
  { label: "Filmmakers.eu", href: "https://www.filmmakers.eu/de/actors/tamiris-bittencourt-da-silva-brasil" }
];

const footerNav = extendedNavigationItems;

const linkStyleBase = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  transition: "color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
};

const categoryLabel = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.5rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase" as const,
  color: "rgba(200,168,126,0.5)"
};

export default function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(200,168,126,0.1)"
      }}
    >
      <div className="site-container py-16">

        {/* Top — Brand + Statement */}
        <div className="grid gap-16 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <p
              className="text-primary"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase"
              }}
            >
              {siteConfig.name}
            </p>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.25,
                color: "rgba(200,168,126,0.35)"
              }}
            >
              Sound. Vision. Reign.
            </p>
            <div
              className="mt-6"
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(200,168,126,0.2)"
              }}
            />
          </div>

          {/* Navigation grid */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">

            {/* Site links */}
            <div>
              <p className="mb-5" style={categoryLabel}>
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
              <p className="mb-5" style={categoryLabel}>
                Connect
              </p>
              <nav aria-label="Social Links" className="flex flex-col gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} (opens in new tab)`}
                    className="text-offWhite hover:text-accent no-underline flex items-center gap-2"
                    style={linkStyleBase}
                  >
                    <SocialIcon name={item.label} />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Legal */}
            <div>
              <p className="mb-5" style={categoryLabel}>
                Legal
              </p>
              <nav aria-label="Legal" className="flex flex-col gap-3">
                <Link
                  href="/privacy"
                  className="text-muted hover:text-offWhite no-underline"
                  style={linkStyleBase}
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/imprint"
                  className="text-muted hover:text-offWhite no-underline"
                  style={linkStyleBase}
                >
                  Imprint
                </Link>
                <a
                  href="/sitemap.xml"
                  className="text-muted hover:text-offWhite no-underline"
                  style={linkStyleBase}
                >
                  Sitemap
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px" style={{ background: "rgba(200,168,126,0.06)" }} />

        {/* Copyright notice */}
        <p
          style={{
            fontFamily: "var(--font-montserrat), system-ui, sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.08em",
            lineHeight: 1.7,
            color: "rgba(245,240,235,0.45)",
            maxWidth: "42rem"
          }}
        >
          &copy; {new Date().getFullYear()} Dáma Venus. All rights reserved. Any unauthorized use of visual or sonic assets will be subject to international legal action.
        </p>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
          <span
            style={{
              fontFamily: "var(--font-montserrat), system-ui, sans-serif",
              fontSize: "0.48rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(200,168,126,0.25)"
            }}
          >
            Berlin &middot; Amsterdam &middot; London
          </span>
        </div>

      </div>
    </footer>
  );
}
