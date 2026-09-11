import type { Metadata } from "next";
import Image from "next/image";
import ImageReveal from "@/components/utils/image-reveal";
import { musicData } from "@/content/data/music.data";
import { assetMap } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: { absolute: "Music & Releases | Dáma Venus — Official Singles" },
  description:
    "Explore official releases by Dáma Venus, including Lonely Berlin, Valentines, Eclipse, and Close Friend, with direct listening links.",
  openGraph: {
    title: "Music & Releases | Dáma Venus",
    description:
      "Official releases by Dáma Venus with direct listening links and cinematic visuals.",
    url: "/music",
    images: [{ url: "/og-music.png" }]
  },
  twitter: {
    title: "Music & Releases | Dáma Venus",
    description: "Official releases by Dáma Venus with direct listening links.",
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
  name: "Dáma Venus — Official Releases",
  description: "Official music releases by Dáma Venus",
  itemListElement: musicData.releases.map((release, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "MusicRecording",
      name: release.title,
      byArtist: {
        "@type": "Person",
        "@id": "https://damavenus.eu/#artist",
        name: "Dáma Venus"
      },
      url: release.primaryCta.href,
      datePublished: release.releaseDate
    }
  }))
};

export default function MusicPage() {
  const featured =
    musicData.releases.find((release) => release.id === musicData.featuredReleaseId) ??
    musicData.releases[0];

  const selectedReleases = [...musicData.releases]
    .sort((a, b) => a.priority - b.priority)
    .filter((release) => release.id !== featured.id);

  const featuredAsset =
    assetMap[featured.coverAsset.id] ??
    (featured.alternateVisualAsset ? assetMap[featured.alternateVisualAsset.id] : undefined);

  return (
    <div className="pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(musicJsonLd) }}
      />

      <div className="site-container pt-16 pb-0">
        <h1 className="sr-only">Dáma Venus — Music &amp; Releases</h1>
        <div className="mb-2">
          <p className="text-muted" style={labelStyle}>
            {musicData.intro.label}
          </p>
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

      <section
        id={featured.id}
        aria-labelledby="featured-release-title"
        className="reveal mt-0"
      >
        <div className="site-container">
          <div
            className="grid gap-0 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}
          >
            {featuredAsset ? (
              <ImageReveal
                className="relative overflow-hidden"
                style={{ minHeight: "680px" }}
                lightboxSrc={featuredAsset.src}
                lightboxAlt={`${featured.title} — Dáma Venus release visual`}
              >
                <Image
                  src={featuredAsset.src}
                  alt={`${featured.title} — Dáma Venus release visual`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  style={{
                    objectPosition: featuredAsset.objectPosition ?? "center 15%"
                  }}
                />
              </ImageReveal>
            ) : null}

            <div
              className="flex flex-col justify-end px-8 py-12 md:px-12"
              style={{ borderLeft: "1px solid rgba(200,168,126,0.12)" }}
            >
              <p
                className="mb-2"
                style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}
              >
                Featured Release
              </p>
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
              <p
                className="mt-4 text-muted"
                style={{ fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "28rem" }}
              >
                {featured.shortText}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={featured.primaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary no-underline"
                >
                  {featured.primaryCta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedReleases.length ? (
        <section id="selected-releases" className="reveal mt-28" aria-labelledby="selected-releases-heading">
          <div className="site-container">
            <div
              className="mb-8 pb-8"
              style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}
            >
              <p id="selected-releases-heading" className="text-muted" style={labelStyle}>
                Selected Releases
              </p>
            </div>
            <ul className="grid gap-px md:grid-cols-3" style={{ background: "rgba(200,168,126,0.04)" }}>
              {selectedReleases.map((release) => {
                const releaseAsset = assetMap[release.coverAsset.id];

                return (
                  <li
                    key={release.id}
                    id={release.id}
                    style={{
                      background: "#000000",
                      border: "1px solid rgba(200,168,126,0.06)"
                    }}
                  >
                    <article aria-labelledby={`${release.id}-title`}>
                      {releaseAsset ? (
                        <ImageReveal
                          className="relative overflow-hidden"
                          style={{ height: "360px" }}
                          lightboxSrc={releaseAsset.src}
                          lightboxAlt={`${release.title} — Dáma Venus release visual`}
                        >
                          <Image
                            src={releaseAsset.src}
                            alt={`${release.title} — Dáma Venus release visual`}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                            style={{
                              objectPosition: releaseAsset.objectPosition ?? "center center"
                            }}
                          />
                        </ImageReveal>
                      ) : null}
                      <div className="p-8">
                        <p
                          className="mb-3"
                          style={{ ...labelStyle, color: "rgba(200,168,126,0.55)" }}
                        >
                          {release.releaseDate ?? release.year}
                        </p>
                        <h3
                          id={`${release.id}-title`}
                          className="text-primary"
                          style={{
                            fontFamily: "var(--font-bodoni), Georgia, serif",
                            fontSize: "1.8rem",
                            fontWeight: 300,
                            lineHeight: 1.1
                          }}
                        >
                          {release.title}
                        </h3>
                        {release.subtitle ? (
                          <p className="mt-2 text-muted" style={{ fontSize: "0.8rem" }}>
                            {release.subtitle}
                          </p>
                        ) : null}
                        <p
                          className="mt-4 text-muted"
                          style={{ fontSize: "0.88rem", lineHeight: 1.65 }}
                        >
                          {release.shortText}
                        </p>
                        <a
                          href={release.primaryCta.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-7 inline-block cta-secondary no-underline"
                        >
                          {release.primaryCta.label}
                        </a>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="reveal mt-28" aria-labelledby="video-short-heading">
        <div className="site-container">
          <div
            className="mb-8 pb-8"
            style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}
          >
            <p id="video-short-heading" className="text-muted" style={labelStyle}>
              Latest Visual
            </p>
          </div>
          <div
            className="grid gap-0 md:grid-cols-[minmax(0,9fr)_minmax(0,16fr)]"
            style={{ border: "1px solid rgba(200,168,126,0.08)" }}
          >
            <div className="relative overflow-hidden" style={{ background: "#000" }}>
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ aspectRatio: "9/16", maxHeight: "780px" }}
                aria-label="Lonely Berlin Day 1 — short visual by Dáma Venus"
              >
                <source
                  src="/assets/dama-venus/video/lonely-berlin-day-1.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div
              className="flex flex-col justify-end px-8 py-12 md:px-12"
              style={{ borderLeft: "1px solid rgba(200,168,126,0.08)" }}
            >
              <p
                className="mb-3"
                style={{ ...labelStyle, color: "rgba(200,168,126,0.6)" }}
              >
                Lonely Berlin — visual chapter
              </p>
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
              <p
                className="mt-4 text-muted"
                style={{ fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "28rem" }}
              >
                Play the short visual on demand. Autoplay is intentionally disabled to reduce
                bandwidth and respect user preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {musicData.visualReleases.length ? (
        <section id="visual-releases" className="reveal mt-28">
          <div className="site-container">
            <div
              className="mb-8 pb-8"
              style={{ borderBottom: "1px solid rgba(200,168,126,0.08)" }}
            >
              <p className="text-muted" style={labelStyle}>
                Visual Releases
              </p>
            </div>
            <ul className="space-y-px" style={{ background: "rgba(200,168,126,0.04)" }}>
              {musicData.visualReleases.map((release) => {
                const releaseAsset = assetMap[release.coverAsset.id];
                const watchAction = release.watchLinks?.[0];

                return (
                  <li
                    key={release.id}
                    className="p-8"
                    style={{
                      background: "#000000",
                      border: "1px solid rgba(200,168,126,0.06)"
                    }}
                  >
                    <article
                      className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center"
                      aria-labelledby={`${release.id}-title`}
                    >
                      {watchAction && releaseAsset ? (
                        <ImageReveal
                          className="relative overflow-hidden"
                          style={{ height: "300px" }}
                          lightboxSrc={releaseAsset.src}
                          lightboxAlt={`${release.title} visual still`}
                        >
                          <Image
                            src={releaseAsset.src}
                            alt={`${release.title} visual still`}
                            fill
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                            style={{
                              objectPosition: releaseAsset.objectPosition ?? "center center"
                            }}
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
                        {watchAction ? (
                          <a
                            href={watchAction.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cta-secondary no-underline self-start"
                          >
                            {watchAction.label}
                          </a>
                        ) : null}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}
    </div>
  );
}
