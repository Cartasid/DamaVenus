import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { musicData } from "@/content/data/music.data";
import { assetMap } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: { absolute: "Music | Dama Venus" },
  description: "Selected releases and visual chapters from Dama Venus — alternative pop, trap-pop, R&B inflections, and vaporwave atmosphere.",
  openGraph: {
    title: "Music | Dama Venus",
    description: "Selected releases and visual chapters from Dama Venus — alternative pop, trap-pop, R&B inflections.",
    url: "/music",
    images: [{ url: "/og-default.svg" }]
  },
  twitter: {
    title: "Music | Dama Venus",
    description: "Selected releases and visual chapters from Dama Venus.",
    images: ["/og-default.svg"]
  },
  alternates: { canonical: "/music" }
};

const labelStyle = {
  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
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
        <div className="mb-2">
          <p className="text-muted" style={labelStyle}>{musicData.intro.label}</p>
        </div>
        <h1
          className="text-primary"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.01em"
          }}
        >
          {musicData.intro.headline}
        </h1>
        {musicData.intro.subhead ? (
          <p
            className="mt-5 text-muted"
            style={{ maxWidth: "36rem", fontSize: "0.95rem", lineHeight: 1.7 }}
          >
            {musicData.intro.subhead}
          </p>
        ) : null}
        <div className="mt-10 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* ── FEATURED RELEASE ── */}
      <section
        id={featured.id}
        aria-labelledby="featured-release-title"
        className="reveal mt-0"
      >
        <div className="site-container">
          <div className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>

            {/* Cover */}
            {featuredAsset ? (
              <div
                className="img-color-reveal relative overflow-hidden"
                style={{ minHeight: "520px" }}
              >
                <Image
                  src={featuredAsset.src}
                  alt={featuredAsset.alt ?? featured.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            ) : null}

            {/* Info */}
            <div
              className="flex flex-col justify-end px-8 py-12 md:px-12"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-accent mb-2" style={labelStyle}>Featured Release</p>
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
                {featured.title}
              </h2>
              {featured.subtitle ? (
                <p
                  className="mt-2 text-muted"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
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

      {/* ── SELECTED RELEASES ── */}
      {selectedReleases.length ? (
        <section id="selected-releases" className="reveal mt-20">
          <div className="site-container">
            <p className="text-muted mb-8" style={labelStyle}>Selected Releases</p>

            {selectedSingles.length ? (
              <ul className="grid gap-px md:grid-cols-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                {selectedSingles.map((release) => (
                  <li
                    key={release.id}
                    id={release.id}
                    className="reveal-child space-y-3 p-8"
                    style={{ background: "#000" }}
                  >
                    <p className="text-accent" style={labelStyle}>{release.status}</p>
                    <h3
                      className="text-primary"
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                        fontWeight: 300,
                        lineHeight: 1.1
                      }}
                    >
                      {release.title}
                    </h3>
                    <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                      {release.shortText}
                    </p>
                    <Link href={release.primaryCta.href} className="inline-block cta-primary mt-2">
                      {release.primaryCta.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {followUpReleases.length ? (
              <ul className="mt-px grid gap-px md:grid-cols-2" style={{ background: "rgba(255,255,255,0.05)" }}>
                {followUpReleases.map((release) => {
                  const releaseAsset = assetMap[release.coverAsset.id];
                  return (
                    <li
                      key={release.id}
                      id={release.id}
                      className="p-6"
                      style={{ background: "#000" }}
                    >
                      {releaseAsset ? (
                        <div className="img-color-reveal relative mb-4 overflow-hidden" style={{ height: "200px" }}>
                          <Image
                            src={releaseAsset.src}
                            alt={releaseAsset.alt ?? release.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 30vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <h3
                        className="text-primary"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                          fontSize: "1.6rem",
                          fontWeight: 300
                        }}
                      >
                        {release.title}
                      </h3>
                      <p className="mt-2 text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
                        {release.shortText}
                      </p>
                      <Link href={release.primaryCta.href} className="mt-4 inline-block cta-secondary">
                        {release.primaryCta.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ── VISUAL RELEASES ── */}
      <section id="visual-releases" className="reveal mt-20">
        <div className="site-container">
          <p className="text-muted mb-8" style={labelStyle}>Visual Releases</p>
          <ul className="space-y-px" style={{ background: "rgba(255,255,255,0.05)" }}>
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
                <li key={release.id} className="p-6" style={{ background: "#000" }}>
                  <article className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]" aria-labelledby={`${release.id}-title`}>
                    {watchAction && releaseAsset ? (
                      <div className="img-color-reveal relative overflow-hidden" style={{ height: "160px" }}>
                        <Image
                          src={releaseAsset.src}
                          alt={releaseAsset.alt ?? `${release.title} visual still`}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-col justify-center space-y-3">
                      <h3
                        id={`${release.id}-title`}
                        className="text-primary"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
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
