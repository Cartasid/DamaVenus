import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: { absolute: "Industry & Academy Access | Dáma Venus" },
  description: "Exclusive private previews of the upcoming album and cinematic visualizers. Reserved for Recording Academy members, press partners, and industry executives.",
  openGraph: {
    title: "Industry & Academy Access | Dáma Venus",
    description: "Exclusive private previews for Recording Academy members and Industry Partners.",
    url: "/industry",
    images: [{ url: "/og-default.png" }]
  },
  twitter: {
    title: "Industry & Academy Access | Dáma Venus",
    description: "Exclusive private previews for Recording Academy members and Industry Partners.",
    images: ["/og-default.png"]
  },
  alternates: { canonical: "/industry" },
  robots: { index: false, follow: false }
};

const labelStyle = {
  fontFamily: "var(--font-montserrat), var(--font-syne), system-ui, sans-serif",
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
            fontFamily: "var(--font-montserrat), var(--font-syne), system-ui, sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 5rem)",
            fontWeight: 700,
            lineHeight: 0.95,
            letterSpacing: "0.06em",
            textTransform: "uppercase"
          }}
        >
          Industry &amp; Academy Access
        </h1>
        <p className="mt-8 text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "38rem" }}>
          Exclusive private previews of the upcoming album and cinematic visualizers. This area is reserved for members of the Recording Academy (GRAMMYs), press partners, and industry executives.
        </p>
        <p className="mt-4 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "38rem" }}>
          To request a private link or a press kit (EPK), please use the contact form below.
        </p>
        <div className="mt-14 h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
      </header>

      {/* ── ACCESS GATE ── */}
      <section className="reveal site-container mt-20" aria-labelledby="industry-gate-title">
        <div
          className="relative overflow-hidden px-8 py-20 md:px-16 md:py-28"
          style={{
            background: "linear-gradient(135deg, rgba(200,168,126,0.03) 0%, rgba(0,0,0,0.95) 50%, rgba(255,79,168,0.02) 100%)",
            border: "1px solid rgba(200,168,126,0.12)"
          }}
        >
          <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(200,168,126,0.3), transparent)" }} aria-hidden="true" />
          <div className="absolute left-0 top-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(200,168,126,0.25), transparent 40%)" }} aria-hidden="true" />

          <h2
            id="industry-gate-title"
            className="text-primary mb-6"
            style={{
              fontFamily: "var(--font-montserrat), var(--font-syne), system-ui, sans-serif",
              fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
              fontWeight: 600,
              letterSpacing: "0.04em"
            }}
          >
            Private Preview
          </h2>

          <p className="text-muted mb-10" style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "34rem" }}>
            This section contains unreleased audio, unlisted video, and private material reserved for verified industry contacts. Access is granted on a per-request basis.
          </p>

          {/* Locked Content Indicators */}
          <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(200,168,126,0.04)", borderTop: "1px solid rgba(200,168,126,0.08)", borderLeft: "1px solid rgba(200,168,126,0.08)" }}>
            {[
              { label: "Unreleased Audio", desc: "Private SoundCloud links to upcoming album tracks. Available to verified Recording Academy members." },
              { label: "Unlisted Video", desc: "Full music video and behind-the-scenes footage. Unlisted YouTube links shared upon verification." },
              { label: "Press Kit (EPK)", desc: "High-resolution imagery, artist biography, and comprehensive release materials for editorial use." }
            ].map((item) => (
              <div
                key={item.label}
                className="p-8 shine-hover"
                style={{
                  background: "#000000",
                  borderRight: "1px solid rgba(200,168,126,0.08)",
                  borderBottom: "1px solid rgba(200,168,126,0.08)"
                }}
              >
                <p style={{ ...labelStyle, color: "rgba(200,168,126,0.8)", marginBottom: "0.75rem" }}>{item.label}</p>
                <p className="text-muted" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
                  {item.desc}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(255,79,168,0.6)" }} aria-hidden="true" />
                  <span style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,79,168,0.7)" }}>Access Required</span>
                </div>
              </div>
            ))}
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
            To verify your credentials, please include your organization, role, and affiliation in the contact form. Access is typically granted within 24 hours for qualified industry professionals.
          </p>
        </div>
      </section>
    </div>
  );
}
