import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { pressEpkBlocks } from "@/content/data/press.data";

export const metadata: Metadata = {
  title: { absolute: "Press & EPK | Dáma Venus — Bio, Images & Release Facts" },
  description: "Download the press kit of Dáma Venus — artist bio, high-resolution images, release facts, and EPK for journalists, bloggers, and media professionals.",
  openGraph: {
    title: "Press & EPK | Dáma Venus",
    description: "Download the press kit — bio, high-res images, release facts, and EPK for media use.",
    url: "/press",
    images: [{ url: "/og-press.png" }]
  },
  twitter: {
    title: "Press & EPK | Dáma Venus",
    description: "Download the press kit — bio, high-res images, release facts, and EPK for media use.",
    images: ["/og-press.png"]
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
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
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

      {/* ── HERO ── */}
      <section
        className="img-color-reveal relative overflow-hidden"
        style={{ height: "70vh", minHeight: "520px" }}
        aria-label="Press hero"
      >
        <Image
          src="/assets/dama-venus/press/press-hero-img6485-v01.jpg"
          alt="Dáma Venus — press editorial"
          fill
          priority
          sizes="100vw"
          className="object-cover img-press-hero"
          style={{ objectPosition: "center 20%" }}
        />
        {/* gradient — text legibility left, breathing room right */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.25) 55%, rgba(5,5,5,0.15) 100%)" }}
          aria-hidden="true"
        />
        {/* text overlay */}
        {introBlock ? (
          <div className="relative z-10 flex h-full flex-col justify-end site-container pb-14">
            <p
              className="mb-3"
              style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,168,126,0.9)" }}
            >
              Press &amp; EPK
            </p>
            <h1
              className="text-primary"
              style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 300, lineHeight: 0.95, maxWidth: "28rem" }}
            >
              {introBlock.title}
            </h1>
            {summaryBlock && typeof summaryBlock.body === "string" ? (
              <p className="mt-5 text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "34rem" }}>
                {summaryBlock.body}
              </p>
            ) : null}
            <div className="mt-8">
              <Link href={introBlock.target} className="cta-primary">
                {introBlock.ctaLabel}
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      {/* spacer line */}
      <div className="site-container">
        <div className="mt-12 h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
      </div>


      {/* ── PRESS ESSENTIALS ── */}
      <section className="reveal site-container mt-24">
        <p className="text-muted mb-8" style={labelStyle}>Press Essentials</p>
        <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(200,168,126,0.04)" }}>
          {primaryLeadBlocks.map((block) => renderBlock(block))}
        </div>
      </section>

      {/* ── ADDITIONAL RESOURCES ── */}
      <section className="reveal site-container mt-24">
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
      <section className="reveal site-container mt-24" id="epk-downloads">
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

    </div>
  );
}
