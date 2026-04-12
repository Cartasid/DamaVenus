import type { Metadata } from "next";
import Link from "next/link";
import { pressEpkBlocks } from "@/content/data/press.data";

export const metadata: Metadata = {
  title: { absolute: "Press & EPK — Images, Bio & Release Facts | Dama Venus" },
  description: "Press-ready overview with bio, images, and release facts for Dama Venus. Fast editorial use — alternative pop, trap-pop, vaporwave.",
  openGraph: {
    title: "Press & EPK | Dama Venus",
    description: "Access press-ready information, selected assets, and EPK links for Dama Venus.",
    url: "/press",
    images: [{ url: "/og-default.svg" }]
  },
  twitter: {
    title: "Press & EPK | Dama Venus",
    description: "Access press-ready information, selected assets, and EPK links for Dama Venus.",
    images: ["/og-default.svg"]
  },
  alternates: { canonical: "/press" }
};

const primaryBlockIds = ["veryShortBio", "featuredPressImages", "contactBlock"];
const secondaryBlockIds = ["shortBio", "pressReadyDescription", "musicListeningLinks", "videoVisualLinks", "socialStreamingLinks", "downloads"];

const secondaryLinkGroups: Array<{ purpose: "listen" | "watch" | "social" | "download"; blockIds: string[] }> = [
  { purpose: "listen", blockIds: ["musicListeningLinks"] },
  { purpose: "watch", blockIds: ["videoVisualLinks"] },
  { purpose: "social", blockIds: ["socialStreamingLinks"] },
  { purpose: "download", blockIds: ["downloads"] }
];

const blockSectionIds: Partial<Record<(typeof pressEpkBlocks)[number]["id"], string>> = {
  veryShortBio: "very-short-bio",
  shortBio: "short-bio",
  pressReadyDescription: "press-ready-description",
  downloads: "downloads"
};

const labelStyle = {
  fontFamily: "var(--font-syne), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const
};

function renderBody(body: string | string[]) {
  if (Array.isArray(body)) {
    return (
      <div className="space-y-3">
        {body.map((paragraph) => (
          <p key={paragraph} className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  }
  return <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>{body}</p>;
}

function renderBlock(
  block: (typeof pressEpkBlocks)[number],
  options?: { purpose?: string; ctaVariant?: "primary" | "secondary" | "soft" | "text" }
) {
  const purpose = options?.purpose;
  const ctaVariant = options?.ctaVariant ?? "text";
  const sectionId = blockSectionIds[block.id];
  const headingId = `${block.id}-heading`;
  const ctaClassName =
    ctaVariant === "primary" ? "cta-primary" :
    ctaVariant === "secondary" ? "cta-secondary" :
    ctaVariant === "soft" ? "cta-soft" :
    "text-link";

  return (
    <section
      key={block.id}
      id={sectionId}
      aria-labelledby={headingId}
      className="p-6"
      style={{ background: "rgba(200,168,126,0.03)", borderLeft: "1px solid rgba(200,168,126,0.1)" }}
    >
      {purpose ? (
        <p className="text-accent mb-2" style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}>{purpose}</p>
      ) : null}
      <h3
        id={headingId}
        className="text-primary mb-1"
        style={{
          fontFamily: "var(--font-bodoni), Georgia, serif",
          fontSize: "clamp(1.4rem, 3vw, 2rem)",
          fontWeight: 300
        }}
      >
        {block.title}
      </h3>
      <p className="text-mutedFaint mb-4" style={labelStyle}>{block.shortDescriptor}</p>
      {renderBody(block.body)}
      <Link href={block.target} className={`mt-5 inline-block ${ctaClassName}`}>
        {block.ctaLabel}
      </Link>
    </section>
  );
}

export default function PressPage() {
  const introBlock = pressEpkBlocks.find((block) => block.id === "pageIntro");
  const summaryBlock = pressEpkBlocks.find((block) => block.id === "artistSummary");

  const primaryBlocks = primaryBlockIds
    .map((id) => pressEpkBlocks.find((block) => block.id === id))
    .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

  const secondaryBlocks = secondaryBlockIds
    .map((id) => pressEpkBlocks.find((block) => block.id === id))
    .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));

  const secondaryInfoBlocks = secondaryBlocks.filter(
    (block) => !secondaryLinkGroups.some((group) => group.blockIds.includes(block.id))
  );
  const contactBlock = primaryBlocks.find((block) => block.id === "contactBlock");
  const primaryLeadBlocks = primaryBlocks.filter((block) => block.id !== "contactBlock");

  return (
    <div className="pb-28">

      {/* ── PAGE HEADER ── */}
      {introBlock ? (
        <section className="home-hero-enter site-container pt-16 pb-0">
          <p className="text-accent mb-3" style={labelStyle}>Press &amp; EPK</p>
          <h1
            className="text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              maxWidth: "22rem"
            }}
          >
            {introBlock.title}
          </h1>
          {summaryBlock ? (
            <div className="mt-6 max-w-2xl">
              {typeof summaryBlock.body === "string" ? (
                <p className="text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.75 }}>
                  {summaryBlock.body}
                </p>
              ) : renderBody(summaryBlock.body)}
            </div>
          ) : null}
          <div className="mt-8">
            <Link href={introBlock.target} className="cta-primary">
              {introBlock.ctaLabel}
            </Link>
          </div>
          <div className="mt-14 h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
        </section>
      ) : null}

      {/* ── PRESS ESSENTIALS ── */}
      <section className="reveal site-container mt-16">
        <p className="text-muted mb-8" style={labelStyle}>Press Essentials</p>
        <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(200,168,126,0.04)" }}>
          {primaryLeadBlocks.map((block) => renderBlock(block))}
        </div>
      </section>

      {/* ── ADDITIONAL RESOURCES ── */}
      <section className="reveal site-container mt-16">
        <p className="text-muted mb-8" style={labelStyle}>Additional Press Resources</p>
        <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(200,168,126,0.04)" }}>
          {secondaryInfoBlocks.filter((block) => block.id !== "contactBlock").map((block) => renderBlock(block))}
          {secondaryLinkGroups.map((group) => {
            const groupBlocks = group.blockIds
              .map((id) => secondaryBlocks.find((block) => block.id === id))
              .filter((block): block is (typeof pressEpkBlocks)[number] => Boolean(block));
            return groupBlocks.map((block) =>
              renderBlock(block, {
                purpose: group.purpose,
                ctaVariant: block.id === "downloads" ? "secondary" : "soft"
              })
            );
          })}
        </div>
      </section>

      {/* ── EPK DOWNLOADS ── */}
      <section className="reveal site-container mt-16" id="epk-downloads">
        <p className="text-muted mb-8" style={labelStyle}>Electronic Press Kit</p>
        <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(200,168,126,0.04)" }}>
          <div
            className="p-6"
            style={{ background: "rgba(200,168,126,0.03)", borderLeft: "1px solid rgba(200,168,126,0.1)" }}
          >
            <p className="text-accent mb-2" style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}>English</p>
            <h3
              className="text-primary mb-1"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300
              }}
            >
              EPK — English
            </h3>
            <p className="text-muted mb-5" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
              Full press kit with biography, discography, press photos, and contact details.
            </p>
            <a
              href="/assets/dama-venus/docs/dama-venus-epk-en.pdf"
              download
              className="ghost-btn no-underline inline-block"
            >
              Download PDF
            </a>
          </div>
          <div
            className="p-6"
            style={{ background: "rgba(200,168,126,0.03)", borderLeft: "1px solid rgba(200,168,126,0.1)" }}
          >
            <p className="text-accent mb-2" style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}>Português</p>
            <h3
              className="text-primary mb-1"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300
              }}
            >
              EPK — Português
            </h3>
            <p className="text-muted mb-5" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
              Press kit completo com biografia, discografia, fotos e contato.
            </p>
            <a
              href="/assets/dama-venus/docs/dama-venus-epk-pt.pdf"
              download
              className="ghost-btn no-underline inline-block"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      {contactBlock ? (
        <section className="reveal site-container mt-16">
          <div
            className="p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, rgba(200,168,126,0.06) 0%, transparent 70%)",
              border: "1px solid rgba(200,168,126,0.15)"
            }}
          >
            <p className="text-accent mb-3" style={labelStyle}>Contact</p>
            <h2
              className="text-primary mb-4"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 300
              }}
            >
              {contactBlock.title}
            </h2>
            {renderBody(contactBlock.body)}
            <Link href={contactBlock.target} className="mt-6 inline-block cta-primary">
              {contactBlock.ctaLabel}
            </Link>
          </div>
        </section>
      ) : null}
    </div>
  );
}
