import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutPageModel } from "@/content/data/about.data";
import { assetMap } from "@/content/data/site.config";
import ParallaxHero from "@/components/utils/parallax-hero";
import HeroTextReveal from "@/components/utils/hero-text-reveal";
import ImageReveal from "@/components/utils/image-reveal";

export const metadata: Metadata = {
  title: { absolute: "About | Dama Venus" },
  description: "Dama Venus — Brazilian artist from Rio de Janeiro, based in Europe. Building an international music identity where sound, fashion, and visual authorship move together.",
  openGraph: {
    title: "About | Dama Venus",
    description: "Read the artist profile of Dama Venus — an atmosphere-driven practice between music, image, and intention.",
    url: "/about",
    images: [{ url: "/og-default.svg" }]
  },
  twitter: {
    title: "About | Dama Venus",
    description: "Read the artist profile of Dama Venus.",
    images: ["/og-default.svg"]
  },
  alternates: { canonical: "/about" }
};

const labelStyle = {
  fontFamily: "var(--font-syne), system-ui, sans-serif",
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
      <section className="reveal site-container mt-20 grid gap-16 md:grid-cols-2">
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

      {/* ── AS SEEN IN ── */}
      <section className="reveal site-container mt-16">
        <div style={{ borderTop: "1px solid rgba(200,168,126,0.08)", paddingTop: "2rem" }}>
          <p className="text-center mb-6" style={{ ...labelStyle, color: "rgba(200,168,126,0.4)" }}>As Seen In</p>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            <a
              href="https://www.thereviewgeek.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-offWhite no-underline"
              style={{
                fontFamily: "var(--font-syne), system-ui, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                transition: "color 300ms",
                opacity: 0.6
              }}
              aria-label="The Review Geek (opens in new tab)"
            >
              The Review Geek
            </a>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="site-container mt-16">
        <div className="h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
      </div>

      {/* ── METHOD / KEY STATEMENTS ── */}
      <section className="reveal site-container mt-16" aria-labelledby="about-method-heading">
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
                  fontFamily: "var(--font-syne), system-ui, sans-serif",
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
      <div className="reveal site-container mt-12" style={{ borderTop: "1px solid rgba(200,168,126,0.15)", paddingTop: "2rem" }}>
        <Link href={aboutCta.href} className="cta-primary">
          {aboutCta.label}
        </Link>
      </div>

      {/* ── SUPPORTING VISUALS ── */}
      {supportingVisuals.length ? (
        <section className="reveal site-container mt-20" aria-labelledby="about-supporting-visuals-heading">
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
    </div>
  );
}
