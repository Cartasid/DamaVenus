import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { homepageCoreModules, homepageIntro } from "@/content/data/homepage.data";
import { assetMap, siteConfig } from "@/content/data/site.config";
import HeroTextReveal from "@/components/utils/hero-text-reveal";
import SocialIcon from "@/components/utils/social-icons";
import Marquee from "@/components/utils/marquee";
import ParallaxHero from "@/components/utils/parallax-hero";
import ImageReveal from "@/components/utils/image-reveal";

export const metadata: Metadata = {
  title: { absolute: "Dáma Venus | Official Website | Visual Author & Actress" },
  description: "Official platform for Dáma Venus. Berlin-based producer, actress, and Miss Americas. Exploring the after-dark cinematic architecture. New album June 12th.",
  openGraph: {
    title: "Dáma Venus | Official Website | Visual Author & Actress",
    description: "Official platform for Dáma Venus. Berlin-based producer, actress, and Miss Americas. Exploring the after-dark cinematic architecture. New album June 12th.",
    url: "/",
    images: [{ url: "/og-default.png" }]
  },
  twitter: {
    title: "Dáma Venus | Official Website | Visual Author & Actress",
    description: "Explore the cinematic world of Dáma Venus. Berlin-based artist, producer, and Miss Americas.",
    images: ["/og-default.png"]
  },
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const leadModule =
    homepageCoreModules.find((m) => m.id === "lead") ??
    homepageCoreModules.find((m) => m.id === "visuals") ??
    homepageCoreModules.find((m) => m.id === "featuredRelease") ??
    homepageCoreModules.find((m) => Boolean(m.assetId));

  const visualsModule = homepageCoreModules.find((m) => m.id === "visuals");
  const statementModule = homepageCoreModules.find((m) => m.id === "statement");
  const pressModule = homepageCoreModules.find((m) => m.id === "press");
  const contactNewsletterModule = homepageCoreModules.find((m) => m.id === "contactNewsletter");

  const leadAsset = leadModule?.assetId ? assetMap[leadModule.assetId] : undefined;
  const visualsAsset = visualsModule?.assetId ? assetMap[visualsModule.assetId] : undefined;
  const statementAsset = statementModule?.assetId ? assetMap[statementModule.assetId] : undefined;
  const pressAsset = pressModule?.assetId ? assetMap[pressModule.assetId] : undefined;

  return (
    <div className="home-composition">

      {/* ═══ HERO — CINEMATIC FULL VIEWPORT ═══ */}
      <section
        className="home-hero-enter relative min-h-[100vh] flex flex-col justify-end overflow-hidden"
        aria-labelledby="home-title"
      >
        {leadAsset ? (
          <ParallaxHero className="absolute inset-0" intensity={0.25}>
            <ImageReveal className="absolute inset-0" style={{ height: "120%" }} lightboxSrc={leadAsset.src} lightboxAlt={leadAsset.alt ?? "Dama Venus"}>
              <Image
                src={leadAsset.src}
                alt={leadAsset.alt ?? leadModule?.alt ?? ""}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center img-hero-bw"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: "linear-gradient(to top, rgba(5,5,5,0.98) 0%, rgba(5,5,5,0.7) 25%, rgba(5,5,5,0.3) 55%, rgba(5,5,5,0.05) 100%)" }}
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: "linear-gradient(135deg, rgba(200,168,126,0.04) 0%, transparent 40%)" }}
              />
            </ImageReveal>
          </ParallaxHero>
        ) : (
          <div className="absolute inset-0" style={{ background: "#000000" }} />
        )}

        <div className="site-container relative z-10 pb-24 pt-40">
          <div className="max-w-5xl">
            <HeroTextReveal
              text="DÁMA VENUS"
              tag="h1"
              id="home-title"
              className="text-white"
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "clamp(3.5rem, 10vw, 9rem)",
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: "0.06em",
                textTransform: "uppercase"
              }}
              delayMs={400}
            />

            <p
              className="mt-8"
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "clamp(0.7rem, 1.5vw, 0.95rem)",
                fontWeight: 400,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                maxWidth: "32rem",
                color: "rgba(245,240,235,0.5)"
              }}
            >
              {homepageIntro.statement}
            </p>

            <div className="mt-8 flex items-center gap-4 flex-wrap">
              {["Alternative Pop", "Trap-Pop", "R&B", "Vaporwave"].map((genre, i) => (
                <span key={genre} className="flex items-center gap-4">
                  {i > 0 && <span style={{ width: "20px", height: "1px", background: "rgba(200,168,126,0.35)" }} aria-hidden="true" />}
                  <span style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,235,0.25)" }}>{genre}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true" style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, rgba(200,168,126,0.5), transparent)", animation: "pulse 2.5s ease-in-out infinite" }} />
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="py-10" style={{ borderTop: "1px solid rgba(200,168,126,0.08)", borderBottom: "1px solid rgba(200,168,126,0.08)" }}>
        <Marquee items={["Sound", "Vision", "Reign", "Alternative Pop", "Trap-Pop", "R&B", "Vaporwave", "Rio de Janeiro", "Europe", "Cinematic Artist"]} speed={40} />
      </div>

      {/* ═══ STATEMENT ═══ */}
      <section aria-labelledby="statement-title" className="reveal-fade section-gap-lg statement-block">
        {statementAsset ? (
          <div className="statement-block__bg" aria-hidden="true">
            <Image src={statementAsset.src} alt="" fill sizes="100vw" loading="lazy" className="object-cover img-statement-bg" />
          </div>
        ) : null}
        <div className="statement-block__content">
          <p className="statement-block__eyebrow">Manifesto</p>
          <h2 id="statement-title" className="statement-block__headline">{statementModule?.copy.headline}</h2>
        </div>
      </section>

      {/* ═══ VISUALS ═══ */}
      <section aria-labelledby="visual-story-title" className="reveal section-gap-lg">
        <div className="site-container">
          <div className="grid gap-0 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-stretch premium-card">
            {visualsAsset ? (
              <ImageReveal className="img-hover-zoom relative overflow-hidden" style={{ minHeight: "600px" }} lightboxSrc={visualsAsset.src} lightboxAlt={visualsAsset.alt ?? visualsModule?.alt ?? ""}>
                <Image src={visualsAsset.src} alt={visualsAsset.alt ?? visualsModule?.alt ?? ""} fill loading="lazy" sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" style={{ objectPosition: visualsAsset.objectPosition ?? "center center" }} />
              </ImageReveal>
            ) : null}
            <div className="flex flex-col justify-end px-10 py-20 md:px-16" style={{ borderTop: "1px solid rgba(200,168,126,0.08)", borderLeft: "1px solid rgba(200,168,126,0.08)", borderBottom: "1px solid rgba(200,168,126,0.08)" }}>
              <p className="mb-4" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(200,168,126,0.7)" }}>Visual World</p>
              <h2 id="visual-story-title" className="text-primary" style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "clamp(2rem, 4.5vw, 3.8rem)", fontWeight: 400, lineHeight: 1.05, fontStyle: "italic" }}>
                {visualsModule?.copy.headline}
              </h2>
              {visualsModule?.copy.subline ? <p className="mt-4 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>{visualsModule.copy.subline}</p> : null}
              {visualsModule?.copy.cta ? <Link href={visualsModule.copy.cta.href} className="mt-10 inline-block cta-secondary self-start">{visualsModule.copy.cta.label}</Link> : null}
              <div className="mt-12 w-20 h-px" style={{ background: "linear-gradient(to right, rgba(200,168,126,0.5), transparent)" }} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRESS / EPK ═══ */}
      <section aria-labelledby="press-epk-title" className="reveal section-gap-lg">
        <div className="site-container">
          <div className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-stretch premium-card shine-hover" style={{ border: "1px solid rgba(200,168,126,0.08)" }}>
            <div className="flex flex-col justify-center px-10 py-20 md:px-16">
              <p className="mb-3" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,235,0.4)" }}>Press &amp; EPK</p>
              <h2 id="press-epk-title" className="text-primary" style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "clamp(2rem, 4.5vw, 3.5rem)", fontWeight: 400, lineHeight: 1.02, fontStyle: "italic" }}>
                {pressModule?.copy.headline}
              </h2>
              {pressModule?.copy.subline ? <p className="mt-4 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75 }}>{pressModule.copy.subline}</p> : null}
              {pressModule?.copy.cta ? <Link href={pressModule.copy.cta.href} className="mt-10 inline-block cta-primary self-start">{pressModule.copy.cta.label}</Link> : null}
            </div>
            {pressAsset ? (
              <ImageReveal className="img-hover-zoom relative overflow-hidden" style={{ minHeight: "540px", borderLeft: "1px solid rgba(200,168,126,0.08)" }} lightboxSrc={pressAsset.src} lightboxAlt={pressAsset.alt ?? pressModule?.alt ?? ""}>
                <Image src={pressAsset.src} alt={pressAsset.alt ?? pressModule?.alt ?? ""} fill loading="lazy" sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" style={{ objectPosition: pressAsset.objectPosition ?? "center center" }} />
              </ImageReveal>
            ) : null}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT CTA ═══ */}
      <section aria-labelledby="contact-newsletter-title" className="reveal section-gap-lg">
        <div className="site-container">
          <div className="relative overflow-hidden px-10 py-36 md:px-20 md:py-44 glow-accent" style={{ border: "1px solid rgba(200,168,126,0.12)" }}>
            {assetMap["contact-red-portrait-69bf"] ? (
              <ImageReveal className="absolute inset-0 img-color-reveal" aria-hidden="true">
                <Image src={assetMap["contact-red-portrait-69bf"].src} alt="" fill sizes="100vw" loading="lazy" className="object-cover img-contact-bg" style={{ objectPosition: assetMap["contact-red-portrait-69bf"].objectPosition ?? "center 30%" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.15) 55%, rgba(5,5,5,0.35) 100%)" }} />
              </ImageReveal>
            ) : (
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(200,168,126,0.04) 0%, rgba(5,5,5,0.95) 50%, rgba(255,0,255,0.03) 100%)" }} aria-hidden="true" />
            )}
            <div className="absolute right-0 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(200,168,126,0.3), transparent)" }} aria-hidden="true" />
            <div className="absolute left-0 top-0 right-0 h-px" style={{ background: "linear-gradient(to right, rgba(200,168,126,0.25), transparent 40%)" }} aria-hidden="true" />
            <div className="absolute left-0 bottom-0 right-0 h-px" style={{ background: "linear-gradient(to left, rgba(255,0,255,0.15), transparent 40%)" }} aria-hidden="true" />
            <div className="relative z-10">
              <p className="mb-6" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(200,168,126,0.8)" }}>Inquiries</p>
              <h2 id="contact-newsletter-title" className="text-primary" style={{ fontFamily: "var(--font-bodoni), Georgia, serif", fontSize: "clamp(2.8rem, 6vw, 5.5rem)", fontWeight: 400, lineHeight: 1.0, fontStyle: "italic", maxWidth: "24rem" }}>
                {contactNewsletterModule?.copy.headline}
              </h2>
              {contactNewsletterModule?.copy.subline ? <p className="mt-6 text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "30rem" }}>{contactNewsletterModule.copy.subline}</p> : null}
              {contactNewsletterModule?.copy.cta ? <Link href={contactNewsletterModule.copy.cta.href} className="mt-10 inline-block cta-primary">{contactNewsletterModule.copy.cta.label}</Link> : null}
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <a href="mailto:contact@damavenus.eu" className="text-muted hover:text-offWhite no-underline" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 300ms" }} aria-label="Send email to contact@damavenus.eu">contact@damavenus.eu</a>
                <span style={{ width: "1px", height: "16px", background: "rgba(200,168,126,0.2)" }} aria-hidden="true" />
                {[
                  { label: "Spotify", href: "https://open.spotify.com/artist/damavenus" },
                  { label: "Instagram", href: "https://www.instagram.com/ichbindamavenus" },
                  { label: "YouTube", href: "https://www.youtube.com/@damavenus" }
                ].map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`${social.label} (opens in new tab)`} className="text-muted hover:text-offWhite no-underline flex items-center gap-2" style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", transition: "color 300ms" }}><SocialIcon name={social.label} />{social.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom marquee */}
      <div className="py-8" style={{ borderTop: "1px solid rgba(200,168,126,0.06)" }}>
        <Marquee items={["Dama Venus", "Sound", "Vision", "Reign", "Live Performer", "Rio de Janeiro", "Europe"]} speed={50} />
      </div>

      <div className="section-gap-md" />
    </div>
  );
}
