import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutPageModel } from "@/content/data/about.data";
import { assetMap } from "@/content/data/site.config";
import ParallaxHero from "@/components/utils/parallax-hero";
import HeroTextReveal from "@/components/utils/hero-text-reveal";
import ImageReveal from "@/components/utils/image-reveal";

export const metadata: Metadata = {
  title: { absolute: "Bio | Dáma Venus — Singer & Actress from Rio de Janeiro" },
  description: "Dáma Venus — Brazilian singer, songwriter, visual author, and actress based in Berlin. From Rio de Janeiro to Europe, where sound, fashion, and cinematic vision converge.",
  openGraph: {
    title: "Bio | Dáma Venus — Singer & Actress",
    description: "Brazilian singer, songwriter, visual author, and actress — from Rio de Janeiro to Berlin.",
    url: "/about",
    images: [{ url: "/og-about.png" }]
  },
  twitter: {
    title: "Bio | Dáma Venus — Singer & Actress",
    description: "Brazilian singer, songwriter, visual author, and actress — from Rio de Janeiro to Berlin.",
    images: ["/og-about.png"]
  },
  alternates: { canonical: "/about" }
};

const labelStyle = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "rgba(200,168,126,0.6)"
};

export default function AboutPage() {
  const { aboutBio, aboutIntro, aboutKeyStatements, aboutVisualModules } = aboutPageModel;
  const aboutCta = aboutIntro.primaryCtaPattern;

  const featuredPortraits = [...aboutVisualModules.featuredPortraits].sort(
    (a, b) => a.sectionPriority - b.sectionPriority
  );
  const supportingVisuals = [...aboutVisualModules.supportingVisuals].sort(
    (a, b) => a.sectionPriority - b.sectionPriority
  );
  const keyStatements = [...aboutKeyStatements].sort((a, b) => a.sectionPriority - b.sectionPriority);

  const leadPortrait = featuredPortraits[0];
  const leadPortraitAsset = leadPortrait ? assetMap[leadPortrait.assetId] : undefined;

  const resolveAltText = (role: string, preferredAlt?: string, fallbackAlt?: string) => {
    if (role === "decorative") return "";
    return preferredAlt ?? fallbackAlt ?? "Portrait of Dama Venus";
  };

  return (
    <div className="pb-28">

      {/* ── HERO PORTRAIT ── */}
      {leadPortraitAsset ? (
        <section className="home-hero-enter relative" style={{ height: "90vh", minHeight: "560px" }}>
          <ParallaxHero className="absolute inset-0" intensity={0.2}>
            <ImageReveal
              className="absolute inset-0"
              style={{ height: "120%" }}
              lightboxSrc={leadPortraitAsset.src}
              lightboxAlt={resolveAltText(leadPortrait.role, leadPortrait.altTextNote, leadPortraitAsset.alt)}
            >
              <Image
                src={leadPortraitAsset.src}
                alt={resolveAltText(leadPortrait.role, leadPortrait.altTextNote, leadPortraitAsset.alt)}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center img-hero-bw"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.55) 35%, rgba(5,5,5,0.1) 100%)"
                }}
              />
            </ImageReveal>
          </ParallaxHero>
          <div className="site-container relative z-10 flex h-full flex-col justify-end pb-16">
            <p className="text-white/40 mb-4" style={labelStyle}>{aboutIntro.title}</p>
            <HeroTextReveal
              text={aboutIntro.introLine}
              tag="h1"
              id="about-title"
              className="text-white"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.02em"
              }}
              delayMs={300}
            />
            <p
              className="mt-6 text-white/55"
              style={{ fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "32rem" }}
            >
              {aboutIntro.shortText}
            </p>
          </div>
        </section>
      ) : (
        <header className="site-container pt-20 pb-12">
          <p className="text-muted mb-2" style={labelStyle}>{aboutIntro.title}</p>
          <h1
            id="about-title"
            className="text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              lineHeight: 0.95
            }}
          >
            {aboutIntro.introLine}
          </h1>
          <p className="mt-5 text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "32rem" }}>
            {aboutIntro.shortText}
          </p>
        </header>
      )}

      {/* ── BIO ── */}
      <section className="reveal site-container mt-28 grid gap-20 md:grid-cols-2">
        <div>
          <p className="text-muted mb-6" style={labelStyle}>About</p>
          <p
            className="text-primary"
            style={{
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "1.4rem",
              fontWeight: 300,
              lineHeight: 1.6
            }}
          >
            {aboutBio.mediumText}
          </p>
        </div>
        <div className="space-y-6">
          <div style={{ borderLeft: "1px solid rgba(200,168,126,0.25)", paddingLeft: "1.5rem" }}>
            <p className="text-muted mb-2" style={labelStyle}>Short Bio</p>
            <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
              {aboutBio.shortText}
            </p>
          </div>
          {aboutBio.longArtistNote ? (
            <div>
              <p className="text-muted mb-2" style={labelStyle}>Artist Note</p>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>
                {aboutBio.longArtistNote}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── PRESS FEATURE — THE REVIEW GEEK ── */}
      <section className="reveal site-container mt-32" aria-labelledby="press-feature-heading">
        <div
          className="grid gap-0 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)]"
          style={{ border: "1px solid rgba(200,168,126,0.1)" }}
        >
          {/* Quote & CTA */}
          <div className="flex flex-col justify-center px-10 py-16 md:px-16 md:py-20">
            <p className="mb-8" style={labelStyle}>Press</p>

            {/* Publication Name */}
            <p
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(245,240,235,0.35)",
                marginBottom: "1.5rem"
              }}
            >
              The Review Geek
            </p>

            {/* Quote */}
            <blockquote
              id="press-feature-heading"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.55,
                color: "rgba(245,240,235,0.85)",
                margin: 0,
                padding: 0
              }}
            >
              &ldquo;Dáma Venus blends atmospheric depth with a unique sonic vision, marking her as a rising force in the international scene.&rdquo;
            </blockquote>

            <p
              className="mt-6"
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "rgba(200,168,126,0.5)"
              }}
            >
              — The Review Geek
            </p>

            {/* Divider */}
            <div
              className="mt-10 mb-10 w-16 h-px"
              style={{ background: "linear-gradient(to right, rgba(200,168,126,0.4), transparent)" }}
              aria-hidden="true"
            />

            {/* CTA */}
            <div>
              <a
                href="https://www.thereviewgeek.com/damavenus-eclipsebossanovaedition-review/"
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-btn no-underline"
                aria-label="Read full review on The Review Geek (opens in new tab)"
              >
                Read Full Review
              </a>
            </div>
          </div>

          {/* Portrait Visual */}
          {(() => {
            const pressPortrait = assetMap["about-press-feature-tamiris"] ?? assetMap["about-supporting-visual-calm-02"] ?? assetMap["about-intro-entry-portrait-primary"];
            return pressPortrait ? (
              <ImageReveal
                className="relative overflow-hidden hidden md:block"
                style={{ minHeight: "480px", borderLeft: "1px solid rgba(200,168,126,0.1)" }}
                lightboxSrc={pressPortrait.src}
                lightboxAlt={pressPortrait.alt ?? "Dáma Venus portrait"}
              >
                <Image
                  src={pressPortrait.src}
                  alt={pressPortrait.alt ?? "Dáma Venus portrait"}
                  fill
                  loading="lazy"
                  sizes="40vw"
                  className="object-cover"
                  style={{ objectPosition: pressPortrait.objectPosition ?? "center 25%" }}
                />
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{ background: "linear-gradient(to left, transparent 60%, rgba(0,0,0,0.3) 100%)" }}
                />
              </ImageReveal>
            ) : null;
          })()}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="site-container mt-28">
        <div className="h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
      </div>

      {/* ── METHOD / KEY STATEMENTS ── */}
      <section className="reveal site-container mt-20" aria-labelledby="about-method-heading">
        <p id="about-method-heading" className="text-muted mb-8" style={labelStyle}>Method</p>
        <ul className="grid gap-px md:grid-cols-2" style={{ background: "rgba(200,168,126,0.04)", borderTop: "1px solid rgba(200,168,126,0.08)", borderLeft: "1px solid rgba(200,168,126,0.08)" }}>
          {keyStatements.map((statement, index) => (
            <li
              key={statement.id}
              className="p-8 shine-hover"
              style={{
                background: "#000000",
                borderRight: "1px solid rgba(200,168,126,0.08)",
                borderBottom: "1px solid rgba(200,168,126,0.08)"
              }}
            >
              <h3
                className="text-primary mb-3"
                style={{
                  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(200,168,126,0.8)"
                }}
              >
                {statement.title}
              </h3>
              <p
                className="text-muted"
                style={{
                  fontFamily: "var(--font-bodoni), Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  lineHeight: 1.5
                }}
              >
                {statement.shortText}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── CTA ── */}
      <div className="reveal site-container mt-16" style={{ borderTop: "1px solid rgba(200,168,126,0.15)", paddingTop: "2.5rem" }}>
        <Link href={aboutCta.href} className="cta-primary">
          {aboutCta.label}
        </Link>
      </div>

      {/* ── SUPPORTING VISUALS ── */}
      {supportingVisuals.length ? (
        <section className="reveal site-container mt-28" aria-labelledby="about-supporting-visuals-heading">
          <h2 id="about-supporting-visuals-heading" className="sr-only">Supporting Visuals</h2>
          <div className="grid gap-px sm:grid-cols-2" style={{ background: "rgba(200,168,126,0.04)", borderTop: "1px solid rgba(200,168,126,0.08)", borderLeft: "1px solid rgba(200,168,126,0.08)" }}>
            {supportingVisuals.map((visual) => {
              const asset = assetMap[visual.assetId];
              if (!asset) return null;
              const ratioClass = visual.role === "reserve" ? "aspect-[3/4]" : "aspect-[4/5]";

              return (
                <ImageReveal
                  key={visual.assetId}
                  className={`relative ${ratioClass} overflow-hidden`}
                  style={{ borderRight: "1px solid rgba(200,168,126,0.08)", borderBottom: "1px solid rgba(200,168,126,0.08)" }}
                  lightboxSrc={asset.src}
                  lightboxAlt={resolveAltText(visual.role, visual.altTextNote, asset.alt)}
                >
                  <Image
                    src={asset.src}
                    alt={resolveAltText(visual.role, visual.altTextNote, asset.alt)}
                    fill
                    loading="lazy"
                    className="object-cover"
                    style={{ objectPosition: asset.objectPosition ?? "center center" }}
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </ImageReveal>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* ── CROSS-LINKS ── */}
      <nav aria-label="Explore more" className="reveal site-container mt-28">
        <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(200,168,126,0.04)" }}>
          <Link href="/music" className="block p-8 no-underline hover:bg-white/[0.02] transition-colors" style={{ background: "#000000", border: "1px solid rgba(200,168,126,0.06)" }}>
            <p className="text-accent mb-2" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Music</p>
            <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>Selected releases and visual chapters — alternative pop, trap-pop, R&B, and vaporwave.</p>
          </Link>
          <Link href="/visuals" className="block p-8 no-underline hover:bg-white/[0.02] transition-colors" style={{ background: "#000000", border: "1px solid rgba(200,168,126,0.06)" }}>
            <p className="text-accent mb-2" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Visuals</p>
            <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>Curated portraits and editorial sequences in the cinematic signature of Dáma Venus.</p>
          </Link>
          <Link href="/press" className="block p-8 no-underline hover:bg-white/[0.02] transition-colors" style={{ background: "#000000", border: "1px solid rgba(200,168,126,0.06)" }}>
            <p className="text-accent mb-2" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>Press &amp; EPK</p>
            <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>Bio, press-ready images, and release facts for editorial use.</p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
