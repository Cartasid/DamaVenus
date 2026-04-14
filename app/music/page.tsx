import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ImageReveal from "@/components/utils/image-reveal";
import { musicData } from "@/content/data/music.data";
import { assetMap } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: { absolute: "Music & Releases | Dáma Venus — Alternative Pop, Trap-Pop, R&B" },
  description: "Explore the music of Dáma Venus — alternative pop, trap-pop, R&B and vaporwave from Berlin. Stream releases, watch cinematic visuals, and discover new singles.",
  openGraph: {
    title: "Music & Releases | Dáma Venus",
    description: "Stream releases, watch cinematic visuals, and discover new singles by Dáma Venus — alternative pop from Berlin.",
    url: "/music",
    images: [{ url: "/og-music.png" }]
  },
  twitter: {
    title: "Music & Releases | Dáma Venus",
    description: "Stream releases, watch cinematic visuals, and discover new singles by Dáma Venus.",
    images: ["/og-music.png"]
  },
  alternates: { canonical: "/music" }
};

const labelStyle = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const
};

const musicJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dama Venus — Selected Releases",
  description: "Selected music releases by Dama Venus — alternative pop, trap-pop, R&B, vaporwave",
  itemListElement: musicData.releases.map((release, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "MusicRecording",
      name: release.title,
      byArtist: { "@type": "MusicGroup", name: "Dama Venus" },
      url: release.primaryCta.href,
      datePublished: release.releaseDate ?? release.year
    }
  }))
};

export default function MusicPage() {
  const featured = musicData.releases.find((release) => release.id === musicData.featuredReleaseId) ?? musicData.releases[0];
  const selectedReleases = [...musicData.releases]
    .sort((a, b) => a.priority - b.priority)
    .filter((release) => release.id !== featured.id);
  const leadSecondary = selectedReleases[0];
  const selectedSingles = leadSecondary ? [leadSecondary] : [];
  const followUpReleases = selectedReleases.slice(1);

  const featuredAsset = assetMap[featured.coverAsset.id] ?? (featured.alternateVisualAsset ? assetMap[featured.alternateVisualAsset.id] : undefined);

  return (
    <div className="pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicJsonLd) }}
      />

      {/* ── PAGE HEADER ── */}
      <div className="site-container pt-16 pb-0">
        <h1 className="sr-only">Dáma Venus — Music &amp; Releases</h1>
        <div className="mb-2">
          <p className="text-muted" style={labelStyle}>{musicData.intro.label}</p>
        </div>
        <p
          role="doc-subtitle"
          className="text-primary"
          style={{
            fontFamily: "var(--font-bodoni), Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.01em"
          }}
        >
          {musicData.intro.headline}
        </p>
        {musicData.intro.subhead ? (
          <p
            className="mt-5 text-muted"
            style={{ maxWidth: "36rem", fontSize: "0.95rem", lineHeight: 1.7 }}
          >
            {musicData.intro.subhead}
          </p>
        ) : null}
        <div className="mt-10 h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
      </div>

      {/* ── FEATURED RELEASE ── */}
      <section
        id={featured.id}
        aria-labelledby="featured-release-title"
        className="reveal mt-0"
      >
        <div className="site-container">
          <div className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}>

            {/* Cover */}
            {featuredAsset ? (
              <ImageReveal
                className="relative overflow-hidden"
                style={{ minHeight: "680px" }}
                lightboxSrc={featuredAsset.src}
                lightboxAlt={featuredAsset.alt ?? featured.title}
              >
                <Image
                  src={featuredAsset.src}
                  alt={featuredAsset.alt ?? featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
              </ImageReveal>
            ) : null}

            {/* Info */}
            <div
              className="flex flex-col justify-end px-8 py-12 md:px-12"
              style={{ borderLeft: "1px solid rgba(200,168,126,0.12)" }}
            >
              <p className="mb-2" style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}>Featured Release</p>
              <h2
                id="featured-release-title"
                className="text-primary"
                style={{
                  fontFamily: "var(--font-bodoni), Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.05
                }}
              >
                {featured.title}
              </h2>
              {featured.subtitle ? (
                <p
                  className="mt-2 text-muted"
                  style={{
                    fontFamily: "var(--font-bodoni), Georgia, serif",
                    fontSize: "1.1rem",
                    fontStyle: "italic"
                  }}
                >
                  {featured.subtitle}
                </p>
              ) : null}
              <p className="mt-4 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "28rem" }}>
                {featured.shortText}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={featured.primaryCta.href} className="cta-primary">
                  {musicData.ctaLabels.listen}
                </Link>
                {featured.watchLinks?.[0] ? (
                  <Link href={featured.watchLinks[0].href} className="cta-secondary">
                    {musicData.ctaLabels.watch}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO SHORT ── */}
      <section className="reveal mt-28" aria-labelledby="video-short-heading">
        <div className="site-container">
          <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}>
            <p id="video-short-heading" className="text-muted" style={labelStyle}>Latest Visual</p>
          </div>
          <div className="grid gap-0 md:grid-cols-[minmax(0,9fr)_minmax(0,16fr)]" style={{ border: "1px solid rgba(200,168,126,0.08)" }}>
            {/* Video */}
            <div className="relative overflow-hidden" style={{ background: "#000" }}>
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "9/16", maxHeight: "780px" }}
                aria-label="Lonely Berlin Day 1 — Short by Dáma Venus"
              >
                <source src="/assets/dama-venus/video/lonely-berlin-day-1.mp4" type="video/mp4" />
              </video>
            </div>
            {/* Info */}
            <div
              className="flex flex-col justify-end px-8 py-12 md:px-12"
              style={{ borderLeft: "1px solid rgba(200,168,126,0.08)" }}
            >
              <p className="mb-3" style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}>The rebirth of the after-dark aesthetic</p>
              <h3
                className="text-primary"
                style={{
                  fontFamily: "var(--font-bodoni), Georgia, serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 300,
                  lineHeight: 1.1
                }}
              >
                More than music, a cinematic experience from the heart of Berlin.
              </h3>
              <p className="mt-4 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "28rem" }}>
                Are you ready to step into the neon?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIRECTOR'S STATEMENT ── */}
      <section className="reveal mt-28" aria-labelledby="director-statement-heading">
        <div className="site-container">
          <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}>
            <p className="text-muted" style={labelStyle}>Director&apos;s Statement</p>
          </div>
          <div
            style={{
              border: "1px solid rgba(200,168,126,0.08)",
              borderLeft: "2px solid rgba(200,168,126,0.15)"
            }}
            className="px-10 py-12 md:px-14 md:py-16"
          >
            <h3
              id="director-statement-heading"
              style={{
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.4,
                color: "rgba(245,240,235,0.85)"
              }}
            >
              The Architecture of Loneliness
            </h3>
            <div
              className="mt-6 mb-6"
              style={{ width: "40px", height: "1px", background: "rgba(200,168,126,0.3)" }}
              aria-hidden="true"
            />
            <p
              style={{
                fontFamily: "var(--font-montserrat), system-ui, sans-serif",
                fontSize: "0.85rem",
                lineHeight: 1.85,
                letterSpacing: "0.01em",
                color: "rgba(245,240,235,0.55)",
                maxWidth: "42rem"
              }}
            >
              Lonely Berlin is a testament to Vanguarda and cinematic precision. This project rejects the noise of mass production to focus on the raw, neo-noir atmosphere of Berlin&apos;s after-dark identity.
              My goal was to prove that high-end aesthetics are born from an uncompromising vision. By merging sophisticated lighting with architectural storytelling, I&apos;ve established a Soberania of style that is impossible to replicate. This is a visual manifesto for the new era of international cinema&mdash;where the author&apos;s DNA is the most valuable currency.
            </p>
          </div>
        </div>
      </section>

      {/* ── VISUAL RELEASES ── */}
      <section id="visual-releases" className="reveal mt-28">
        <div className="site-container">
          <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}>
            <p className="text-muted" style={labelStyle}>Visual Releases</p>
          </div>
          <ul className="space-y-px" style={{ background: "rgba(200,168,126,0.04)" }}>
            {musicData.visualReleases.map((release) => {
              const releaseAsset = assetMap[release.coverAsset.id];
              const watchAction = release.watchLinks?.[0];
              const secondaryAction = release.secondaryCta ?? (!watchAction ? release.primaryCta : undefined);
              const primaryWatchLabel = watchAction
                ? watchAction.label.toLowerCase().includes("watch")
                  ? watchAction.label
                  : `Watch ${release.title}`
                : null;
              const secondaryLabel = secondaryAction
                ? secondaryAction.label === "Open"
                  ? `Open ${release.title}`
                  : secondaryAction.label
                : null;

              return (
                <li key={release.id} className="p-8" style={{ background: "#000000", border: "1px solid rgba(200,168,126,0.06)" }}>
                  <article className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center" aria-labelledby={`${release.id}-title`}>
                    {watchAction && releaseAsset ? (
                      <ImageReveal
                        className="relative overflow-hidden"
                        style={{ height: "300px" }}
                        lightboxSrc={releaseAsset.src}
                        lightboxAlt={releaseAsset.alt ?? `${release.title} visual still`}
                      >
                        <Image
                          src={releaseAsset.src}
                          alt={releaseAsset.alt ?? `${release.title} visual still`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                          style={{ objectPosition: releaseAsset.objectPosition ?? "center center" }}
                        />
                      </ImageReveal>
                    ) : null}
                    <div className="flex flex-col justify-center space-y-3">
                      <h3
                        id={`${release.id}-title`}
                        className="text-primary"
                        style={{
                          fontFamily: "var(--font-bodoni), Georgia, serif",
                          fontSize: "1.6rem",
                          fontWeight: 300
                        }}
                      >
                        {release.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {watchAction && primaryWatchLabel ? (
                          <Link href={watchAction.href} className="cta-secondary">
                            {primaryWatchLabel}
                          </Link>
                        ) : null}
                        {secondaryAction && secondaryLabel ? (
                          <Link href={secondaryAction.href} className={watchAction ? "text-link self-center" : "cta-primary"}>
                            {secondaryLabel}
                          </Link>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

    </div>
  );
}
