import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { homepageCoreModules, homepageIntro } from "@/content/data/homepage.data";
import { navigationItems } from "@/content/data/navigation.data";
import { assetMap, siteConfig } from "@/content/data/site.config";
import HeroTextReveal from "@/components/utils/hero-text-reveal";
import Marquee from "@/components/utils/marquee";
import ParallaxHero from "@/components/utils/parallax-hero";

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
          HERO — FULL VIEWPORT WITH PARALLAX
      ══════════════════════════════════════════════ */}
      <section
        className="home-hero-enter relative min-h-[100vh] flex flex-col justify-end overflow-hidden"
        aria-labelledby="home-title"
      >
        {leadAsset ? (
          <ParallaxHero className="absolute inset-0" intensity={0.25}>
            <div className="img-color-reveal absolute inset-0" style={{ height: "120%" }}>
              <Image
                src={leadAsset.src}
                alt={leadAsset.alt ?? leadModule?.alt ?? ""}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center img-hero-bw"
              />
              {/* Multi-layer gradient overlay for depth */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.05) 100%)"
                }}
              />
              {/* Side accent gradient */}
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{
                  background: "linear-gradient(to right, rgba(255,79,168,0.03) 0%, transparent 30%)"
                }}
              />
              {/* Left accent line */}
              <div
                className="absolute bottom-0 left-0 top-0 w-px"
                aria-hidden="true"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(255,79,168,0.4), transparent)" }}
              />
            </div>
          </ParallaxHero>
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}

        {/* Hero content */}
        <div className="site-container relative z-10 pb-20 pt-32">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <p
              className="mb-5 text-white/40"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.4em",
                textTransform: "uppercase"
              }}
            >
              Brazilian Artist &middot; Based in Europe
            </p>

            {/* Main headline with stagger animation */}
            <HeroTextReveal
              text={siteConfig.name}
              tag="h1"
              id="home-title"
              className="text-white"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(4.5rem, 14vw, 12rem)",
                fontWeight: 300,
                lineHeight: 0.88,
                letterSpacing: "-0.02em"
              }}
              delayMs={400}
            />

            {/* Statement */}
            <p
              className="mt-7 text-white/60"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.15rem, 2.8vw, 1.8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                maxWidth: "28rem",
                letterSpacing: "0.01em"
              }}
            >
              {homepageIntro.statement}
            </p>

            {/* Brand descriptor */}
            <p
              className="mt-6 text-white/25"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase"
              }}
            >
              Alternative Pop &middot; Trap-Pop &middot; R&amp;B &middot; Vaporwave
            </p>
          </div>

          {/* Navigation row at bottom of hero */}
          <nav
            aria-label="Home navigation"
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="interactive-hint text-white/40 hover:text-white/90 no-underline"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.58rem",
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

        {/* Scroll indicator */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
          aria-hidden="true"
          style={{
            width: "1px",
            height: "40px",
            background: "linear-gradient(to bottom, rgba(255,79,168,0.4), transparent)",
            animation: "pulse 2s ease-in-out infinite"
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════════ */}
      <div className="py-6" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <Marquee
          items={["Music", "Image", "Presence", "Alternative Pop", "Trap-Pop", "R&B", "Vaporwave", "Rio de Janeiro", "Europe", "Visual Storyteller"]}
          speed={45}
        />
      </div>

      {/* ══════════════════════════════════════════════
          FEATURED RELEASE
      ══════════════════════════════════════════════ */}
      <section
        aria-labelledby="featured-release-title"
        className="reveal section-gap-lg"
      >
        <div className="site-container">
          <div className="grid gap-0 md:grid-cols-2 premium-card shine-hover">

            {/* Image panel */}
            <div className="img-color-reveal relative overflow-hidden" style={{ minHeight: "520px" }}>
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
              className="flex flex-col justify-center px-8 py-14 md:px-14"
              style={{ background: "rgba(255,255,255,0.015)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="mb-4 text-accent"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.3em",
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
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 300,
                  lineHeight: 1.02
                }}
              >
                {featuredReleaseModule?.copy.headline}
              </h2>
              {featuredReleaseModule?.copy.subline ? (
                <p
                  className="mt-4 text-muted"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.2rem",
                    fontStyle: "italic",
                    fontWeight: 300
                  }}
                >
                  {featuredReleaseModule.copy.subline}
                </p>
              ) : null}
              {featuredReleaseModule?.copy.cta ? (
                <div className="mt-10">
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
          <div className="grid gap-0 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-stretch premium-card">

            {/* Image */}
            {visualsAsset ? (
              <div className="img-color-reveal img-hover-zoom relative overflow-hidden" style={{ minHeight: "460px" }}>
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
              className="flex flex-col justify-end px-8 py-12 md:px-12"
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
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.05
                }}
              >
                {visualsModule?.copy.headline}
              </h2>
              {visualsModule?.copy.subline ? (
                <p className="mt-4 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {visualsModule.copy.subline}
                </p>
              ) : null}
              {visualsModule?.copy.cta ? (
                <Link href={visualsModule.copy.cta.href} className="mt-10 inline-block cta-secondary self-start">
                  {visualsModule.copy.cta.label}
                </Link>
              ) : null}

              {/* Accent line */}
              <div
                className="mt-12 w-16 h-px"
                style={{ background: "linear-gradient(to right, rgba(255,79,168,0.5), transparent)" }}
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
            className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-stretch premium-card shine-hover"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Text */}
            <div className="flex flex-col justify-center px-8 py-14 md:px-12">
              <p
                className="mb-3 text-muted"
                style={{
                  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.25em",
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
                  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.02
                }}
              >
                {pressModule?.copy.headline}
              </h2>
              {pressModule?.copy.subline ? (
                <p className="mt-4 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                  {pressModule.copy.subline}
                </p>
              ) : null}
              {pressModule?.copy.cta ? (
                <Link href={pressModule.copy.cta.href} className="mt-10 inline-block cta-primary self-start">
                  {pressModule.copy.cta.label}
                </Link>
              ) : null}
            </div>

            {/* Image */}
            {pressAsset ? (
              <div className="img-color-reveal img-hover-zoom relative overflow-hidden" style={{ minHeight: "380px", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
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
            className="relative overflow-hidden px-8 py-24 md:px-16 md:py-32 glow-accent"
            style={{
              background: "linear-gradient(135deg, rgba(255,79,168,0.05) 0%, transparent 50%, rgba(255,79,168,0.02) 100%)",
              border: "1px solid rgba(255,79,168,0.12)"
            }}
          >
            {/* Decorative corner lines */}
            <div
              className="absolute right-0 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(255,79,168,0.25), transparent)" }}
              aria-hidden="true"
            />
            <div
              className="absolute left-0 top-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, rgba(255,79,168,0.2), transparent 40%)" }}
              aria-hidden="true"
            />

            <p
              className="mb-5 text-accent"
              style={{
                fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
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
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                fontWeight: 300,
                lineHeight: 1.02,
                maxWidth: "22rem"
              }}
            >
              {contactNewsletterModule?.copy.headline}
            </h2>
            {contactNewsletterModule?.copy.subline ? (
              <p
                className="mt-5 text-muted"
                style={{ fontSize: "0.9rem", lineHeight: 1.7, maxWidth: "30rem" }}
              >
                {contactNewsletterModule.copy.subline}
              </p>
            ) : null}
            {contactNewsletterModule?.copy.cta ? (
              <Link href={contactNewsletterModule.copy.cta.href} className="mt-10 inline-block cta-primary">
                {contactNewsletterModule.copy.cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Bottom marquee */}
      <div className="py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <Marquee
          items={["Dama Venus", "Artist", "Visual Storyteller", "Live Performer", "Rio de Janeiro", "Europe"]}
          speed={55}
        />
      </div>

      {/* Bottom spacing */}
      <div className="section-gap-md" />

    </div>
  );
}
