import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";

export default function SiteFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="site-container py-10">

        {/* Top row */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          {/* Brand */}
          <div className="space-y-2">
            <p
              className="text-primary"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase"
              }}
            >
              Dama Venus
            </p>
            <p
              className="text-muted"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.1rem",
                fontWeight: 300,
                fontStyle: "italic"
              }}
            >
              Music. Image. Presence.
            </p>
          </div>

          {/* Legal nav */}
          <nav aria-label="Legal" className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-muted hover:text-offWhite no-underline"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}
            >
              Privacy
            </Link>
            <Link
              href="/imprint"
              className="text-muted hover:text-offWhite no-underline"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                transition: "color 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              }}
            >
              Imprint
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Bottom row */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span
            className="text-mutedFaint"
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase"
            }}
          >
            © {new Date().getFullYear()} {siteConfig.name}
          </span>
          <span
            className="text-mutedFaint"
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase"
            }}
          >
            Rio de Janeiro · Europe
          </span>
        </div>

      </div>
    </footer>
  );
}
