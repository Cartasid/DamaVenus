import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { homepageCoreModules, homepageIntro } from "@/content/data/homepage.data";
import { navigationItems } from "@/content/data/navigation.data";
import { assetMap, siteConfig } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: { absolute: "Dama Venus — Artist, Visual Storyteller" },
  description: "Dama Venus — Brazilian alternative pop artist based in Europe. Fashion-led music at the intersection of trap, R&B, and vaporwave.",
  openGraph: {
    title: "Dama Venus — Artist, Visual Storyteller",
    description: "Dama Venus — Brazilian alternative pop artist based in Europe. Fashion-led music at the intersection of trap, R&B, and vaporwave.",
    url: "/",
    images: [{ url: "/og-default.png" }]
  },
  twitter: {
    title: "Dama Venus — Artist, Visual Storyteller",
    description: "Dama Venus — Brazilian alternative pop artist based in Europe. Fashion-led music at the intersection of trap, R&B, and vaporwave.",
    images: ["/og-default.png"]
  },
  alternates: {
    canonical: "/"
  }
};

export default function HomePage() {
  const leadModule =
    homepageCoreModules.find((module) => module.id === "lead") ??
    homepageCoreModules.find((module) => module.id === "visuals") ??
    homepageCoreModules.find((module) => module.id === "featuredRelease") ??
    homepageCoreModules.find((module) => Boolean(module.assetId));

  const featuredReleaseModule = homepageCoreModules.find((module) => module.id === "featuredRelease");
  const visualsModule = homepageCoreModules.find((module) => module.id === "visuals");
  const statementModule = homepageCoreModules.find((module) => module.id === "statement");
  const pressModule = homepageCoreModules.find((module) => module.id === "press");
  const contactNewsletterModule = homepageCoreModules.find((module) => module.id === "contactNewsletter");

  const leadAsset = leadModule?.assetId ? assetMap[leadModule.assetId] : undefined;
  const featuredReleaseAsset = featuredReleaseModule?.assetId ? assetMap[featuredReleaseModule.assetId] : undefined;
  const visualsAsset = visualsModule?.assetId ? assetMap[visualsModule.assetId] : undefined;
  const statementAsset = statementModule?.assetId ? assetMap[statementModule.assetId] : undefined;
  const pressAsset = pressModule?.assetId ? assetMap[pressModule.assetId] : undefined;

  return (
    <div className="home-composition">

      {/* ══════════════════════════════════════════════
          HERO — FULL VIEWPORT
      ══════════════════════════════════════════════ */}
      <section
        className="home-hero-enter relative min-h-[92vh] flex flex-col justify-end overflow-hidden"
        aria-labelledby="home-title"
      >
        {leadAsset ? (
          <div className="img-color-reveal absolute inset-0">
            <Image
              src={leadAsset.src}
              alt={leadAsset.alt ?? leadModule?.alt ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center img-hero-bw"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 65%, transparent 100%)"
              }}
            />
            {/* Left accent line */}
            <div
              className="absolute bottom-0 left-0 top-0 w-px"
              aria-hidden="true"
              style={{ background: "rgba(255,79,168,0.3)" }}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        {/* Hero content */}
        <div className="site-container relative z-10 pb-16 pt-32">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p
              className="mb-4 text-white/50"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.35em",
                textTransform: "uppercase"
              }}
            >
              Brazilian Artist · Based in Europe
            </p>

            {/* Main headline */}
            <h1
              id="home-title"
              className="text-white"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(4rem, 12vw, 10rem)",
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: "-0.01em"
              }}
            >
              {siteConfig.name}
            </h1>

            {/* Statement */}
            <p
              className="mt-6 text-white/70"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                fontWeight: 300,
                fontStyle: "italic",
                maxWidth: "30rem"
              }}
            >
              {homepageIntro.statement}
            </p>

            {/* Brand descriptor */}
            <p
              className="mt-5 text-white/40"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase"
              }}
            >
              Alternative Pop · Trap-Pop · R&amp;B · Vaporwave
            </p>
          </div>

          {/* Navigation row at bottom of hero */}
          <nav
            aria-label="Home navigation"
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="interactive-hint text-white/50 hover:text-white/90 no-underline"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  transition: "color 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          EDITORIAL DIVIDER
      ══════════════════════════════════════════════ */}
      <div className="site-container">
        <div className="my-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* ══════════════════════════════════════════════
          FEATURED RELEASE
      ══════════════════════════════════════════════ */}
      <section
        aria-labelledby="featured-release-title"
        className="reveal section-gap-lg"
      >
        <div className="site-container">
          <div className="grid gap-0 md:grid-cols-2">

            {/* Image panel */}
            <div className="img-color-reveal relative overflow-hidden" style={{ minHeight: "480px" }}>
              {featuredReleaseAsset ? (
                <Image
                  src={featuredReleaseAsset.src}
                  alt={featuredReleaseAsset.alt ?? featuredReleaseModule?.alt ?? ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-surfaceElevated" />
              )}
            </div>

            {/* Text panel */}
            <div
              className="flex flex-col justify-center px-8 py-12 md:px-12"
              style={{ background: "rgba(255,255,255,0.015)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="mb-4 text-accent"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase"
                }}
              >
                Featured Release
              </p>
              <h2
                id="featured-release-title"
                className="text-primary"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.05
                }}
              >
                {featuredReleaseModule?.copy.headline}
              </h2>
              {featuredReleaseModule?.copy.subline ? (
                <p
                  className="mt-4 text-muted"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.15rem",
                    fontStyle: "italic",
                    fontWeight: 300
                  }}
                >
                  {featuredReleaseModule.copy.subline}
                </p>
              ) : null}
              {featuredReleaseModule?.copy.cta ? (
                <div className="mt-8">
                  <Link href={featuredReleaseModule.copy.cta.href} className="cta-primary">
                    {featuredReleaseModule.copy.cta.label}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STATEMENT BLOCK
      ══════════════════════════════════════════════ */}
      <section
        aria-labelledby="statement-title"
        className="reveal-fade section-gap-lg statement-block"
      >
        {statementAsset ? (
          <div className="statement-block__bg" aria-hidden="true">
            <Image
              src={statementAsset.src}
              alt=""
              fill
              sizes="100vw"
              loading="lazy"
              className="object-cover img-statement-bg"
            />
          </div>
        ) : null}
        <div className="statement-block__content">
          <p className="statement-block__eyebrow">Statement</p>
          <h2 id="statement-title" className="statement-block__headline">
            {statementModule?.copy.headline}
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          VISUALS
      ══════════════════════════════════════════════ */}
      <section
        aria-labelledby="visual-story-title"
        className="reveal section-gap-lg"
      >
        <div className="site-container">
          <div className="grid gap-0 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-stretch">

            {/* Image */}
            {visualsAsset ? (
              <div className="img-color-reveal relative overflow-hidden" style={{ minHeight: "420px" }}>
                <Image
                  src={visualsAsset.src}
                  alt={visualsAsset.alt ?? visualsModule?.alt ?? ""}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            {/* Text */}
            <div
              className="flex flex-col justify-end px-8 py-10 md:px-10"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)"
              }}
            >
              <h2
                id="visual-story-title"
                className="text-primary"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 300,
                  lineHeight: 1.1
                }}
              >
                {visualsModule?.copy.headline}
              </h2>
              {visualsModule?.copy.subline ? (
                <p className="mt-3 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  {visualsModule.copy.subline}
                </p>
              ) : null}
              {visualsModule?.copy.cta ? (
                <Link href={visualsModule.copy.cta.href} className="mt-8 inline-block cta-secondary self-start">
                  {visualsModule.copy.cta.label}
                </Link>
              ) : null}

              {/* Accent line */}
              <div
                className="mt-10 w-12 h-px"
                style={{ background: "rgba(255,79,168,0.4)" }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PRESS / EPK
      ══════════════════════════════════════════════ */}
      <section
        aria-labelledby="press-epk-title"
        className="reveal section-gap-lg"
      >
        <div className="site-container">
          <div
            className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-stretch"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Text */}
            <div className="flex flex-col justify-center px-8 py-12 md:px-10">
              <p
                className="mb-3 text-muted"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase"
                }}
              >
                Press &amp; EPK
              </p>
              <h2
                id="press-epk-title"
                className="text-primary"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 300,
                  lineHeight: 1.05
                }}
              >
                {pressModule?.copy.headline}
              </h2>
              {pressModule?.copy.subline ? (
                <p className="mt-3 text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                  {pressModule.copy.subline}
                </p>
              ) : null}
              {pressModule?.copy.cta ? (
                <Link href={pressModule.copy.cta.href} className="mt-8 inline-block cta-primary self-start">
                  {pressModule.copy.cta.label}
                </Link>
              ) : null}
            </div>

            {/* Image */}
            {pressAsset ? (
              <div className="img-color-reveal relative overflow-hidden" style={{ minHeight: "340px", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                <Image
                  src={pressAsset.src}
                  alt={pressAsset.alt ?? pressModule?.alt ?? ""}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT / CTA SECTION
      ══════════════════════════════════════════════ */}
      <section
        aria-labelledby="contact-newsletter-title"
        className="reveal section-gap-lg"
      >
        <div className="site-container">
          <div
            className="relative overflow-hidden px-8 py-20 md:px-16 md:py-28"
            style={{
              background: "linear-gradient(135deg, rgba(255,79,168,0.04) 0%, transparent 60%)",
              border: "1px solid rgba(255,79,168,0.12)"
            }}
          >
            {/* Decorative element */}
            <div
              className="absolute right-0 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(255,79,168,0.2), transparent)" }}
              aria-hidden="true"
            />

            <p
              className="mb-4 text-accent"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase"
              }}
            >
              Inquiries
            </p>
            <h2
              id="contact-newsletter-title"
              className="text-primary"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.05,
                maxWidth: "20rem"
              }}
            >
              {contactNewsletterModule?.copy.headline}
            </h2>
            {contactNewsletterModule?.copy.subline ? (
              <p
                className="mt-4 text-muted"
                style={{ fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "28rem" }}
              >
                {contactNewsletterModule.copy.subline}
              </p>
            ) : null}
            {contactNewsletterModule?.copy.cta ? (
              <Link href={contactNewsletterModule.copy.cta.href} className="mt-8 inline-block cta-primary">
                {contactNewsletterModule.copy.cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="section-gap-lg" />

    </div>
  );
}
