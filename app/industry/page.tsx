import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Industry Access | Dáma Venus" },
  description: "Exclusive previews for Recording Academy members and Industry Partners. Private access to unreleased material by Dáma Venus.",
  openGraph: {
    title: "Industry Access | Dáma Venus",
    description: "Exclusive previews for Recording Academy members and Industry Partners.",
    url: "/industry",
    images: [{ url: "/og-default.png" }]
  },
  twitter: {
    title: "Industry Access | Dáma Venus",
    description: "Exclusive previews for Recording Academy members and Industry Partners.",
    images: ["/og-default.png"]
  },
  alternates: { canonical: "/industry" },
  robots: { index: false, follow: false }
};

const labelStyle = {
  fontFamily: "var(--font-syne), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "rgba(200,168,126,0.6)"
};

export default function IndustryPage() {
  return (
    <div className="pb-28">
      {/* ── HERO ── */}
      <header className="home-hero-enter site-container pt-20 pb-0">
        <p className="text-muted mb-3" style={labelStyle}>Private Portal</p>
        <h1
          id="industry-title"
          className="text-primary"
          style={{
            fontFamily: "var(--font-bodoni), Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
            lineHeight: 0.95
          }}
        >
          Industry Access
        </h1>
        <p className="mt-6 text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "36rem" }}>
          Exclusive previews for Recording Academy members and Industry Partners. Request access or enter your private key.
        </p>
        <div className="mt-14 h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
      </header>

      {/* ── ACCESS GATE ── */}
      <section className="reveal site-container mt-20" aria-labelledby="industry-gate-title">
        <div
          className="relative overflow-hidden px-8 py-20 md:px-16 md:py-28"
          style={{
            background: "linear-gradient(135deg, rgba(200,168,126,0.03) 0%, rgba(5,5,5,0.95) 50%, rgba(255,79,168,0.02) 100%)",
            border: "1px solid rgba(200,168,126,0.12)"
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(200,168,126,0.3), transparent)" }} aria-hidden="true" />
          <div className="absolute left-0 top-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(200,168,126,0.25), transparent 40%)" }} aria-hidden="true" />

          <h2
            id="industry-gate-title"
            className="text-primary mb-6"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300,
              fontStyle: "italic"
            }}
          >
            Private Preview
          </h2>

          <p className="text-muted mb-10" style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "30rem" }}>
            This section contains unreleased audio, unlisted video, and private material reserved for verified industry contacts. Access is granted on a per-request basis.
          </p>

          {/* Locked Content Indicators */}
          <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(200,168,126,0.04)", borderTop: "1px solid rgba(200,168,126,0.08)", borderLeft: "1px solid rgba(200,168,126,0.08)" }}>
            <div
              className="p-8 shine-hover"
              style={{
                background: "#050505",
                borderRight: "1px solid rgba(200,168,126,0.08)",
                borderBottom: "1px solid rgba(200,168,126,0.08)"
              }}
            >
              <p style={{ ...labelStyle, color: "rgba(200,168,126,0.8)", marginBottom: "0.75rem" }}>Unreleased Audio</p>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Private SoundCloud links to upcoming album tracks. Available to verified Recording Academy members.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,79,168,0.6)" }} aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-syne), system-ui, sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,79,168,0.7)" }}>Access Required</span>
              </div>
            </div>

            <div
              className="p-8 shine-hover"
              style={{
                background: "#050505",
                borderRight: "1px solid rgba(200,168,126,0.08)",
                borderBottom: "1px solid rgba(200,168,126,0.08)"
              }}
            >
              <p style={{ ...labelStyle, color: "rgba(200,168,126,0.8)", marginBottom: "0.75rem" }}>Unlisted Video</p>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Full music video and behind-the-scenes footage. Unlisted YouTube links shared upon verification.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,79,168,0.6)" }} aria-hidden="true" />
                <span style={{ fontFamily: "var(--font-syne), system-ui, sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,79,168,0.7)" }}>Access Required</span>
              </div>
            </div>
          </div>

          {/* Request Access CTA */}
          <div className="mt-12">
            <Link href="/contact" className="ghost-btn no-underline">
              Request Access
            </Link>
          </div>
        </div>
      </section>

      {/* ── INFO ── */}
      <section className="reveal site-container mt-16">
        <div style={{ borderLeft: "1px solid rgba(200,168,126,0.25)", paddingLeft: "1.5rem" }}>
          <p className="text-muted mb-2" style={labelStyle}>Verification</p>
          <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "36rem" }}>
            To verify your credentials, please include your affiliation and role in the contact form. Access is typically granted within 24 hours for qualified industry professionals.
          </p>
        </div>
      </section>
    </div>
  );
}
