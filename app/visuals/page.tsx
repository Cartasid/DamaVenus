import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { visualsData } from "@/content/data/visuals.data";
import { assetMap } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: { absolute: "Visuals | Dama Venus" },
  description: "Curated visuals, portraits, and editorial sequences in the cinematic signature of Dama Venus — fashion-driven image direction.",
  openGraph: {
    title: "Visuals | Dama Venus",
    description: "Curated visuals, portraits, and editorial sequences shaped in the signature of Dama Venus.",
    url: "/visuals",
    images: [{ url: "/og-default.svg" }]
  },
  twitter: {
    title: "Visuals | Dama Venus",
    description: "Curated visuals, portraits, and editorial sequences shaped in the signature of Dama Venus.",
    images: ["/og-default.svg"]
  },
  alternates: { canonical: "/visuals" }
};

const labelStyle = {
  fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const
};

export default function VisualsPage() {
  const resolveAlt = (asset: (typeof assetMap)[string] | undefined, altTextNotes?: string) => {
    if (!asset) return "";
    if (asset.role === "decorative") return "";
    const baseAlt = asset.alt?.trim() || "Visual";
    return altTextNotes ? `${baseAlt} — ${altTextNotes}` : baseAlt;
  };

  const sortedEntries = [...visualsData.entries].sort((a, b) => a.order - b.order || a.priority - b.priority);

  const leadSequenceEntry = sortedEntries.find((entry) => entry.role === "lead");
  const seriesEntries = sortedEntries.filter((entry) => entry.moduleType === "series-section");
  const editorialRows = sortedEntries.filter((entry) => entry.moduleType === "editorial-image-row");
  const portraitFeature = sortedEntries.find((entry) => entry.type === "portrait");
  const quietStills = sortedEntries.filter((entry) => entry.role === "quiet-spacer" || entry.type === "still");
  const linkedVisual = sortedEntries.find((entry) => entry.moduleType === "linked-visual-module");

  const openerAsset = visualsData.intro.asset ? assetMap[visualsData.intro.asset.id] : undefined;
  const leadAsset = leadSequenceEntry?.assets[0] ? assetMap[leadSequenceEntry.assets[0]] : undefined;
  const portraitAsset = portraitFeature?.assets[0] ? assetMap[portraitFeature.assets[0]] : undefined;
  const linkedVisualAsset = linkedVisual?.assets[0] ? assetMap[linkedVisual.assets[0]] : undefined;

  return (
    <div className="pb-28" aria-labelledby="visuals-page-title">

      {/* ── PAGE HEADER ── */}
      <header className="home-hero-enter site-container pt-16 pb-0">
        <div className="grid gap-12 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
          <div>
            <p className="text-muted mb-3" style={labelStyle}>{visualsData.intro.label}</p>
            <h1
              id="visuals-page-title"
              className="text-primary"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 300,
                lineHeight: 0.95
              }}
            >
              {visualsData.intro.headline}
            </h1>
          </div>
          {openerAsset ? (
            <div className="img-color-reveal relative overflow-hidden" style={{ height: "220px" }}>
              <Image
                src={openerAsset.src}
                alt={resolveAlt(openerAsset)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </div>
        {visualsData.intro.subhead ? (
          <p className="mt-6 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "36rem" }}>
            {visualsData.intro.subhead}
          </p>
        ) : null}
        <div className="mt-14 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
      </header>

      {/* ── LEAD VISUAL ── */}
      {leadSequenceEntry && leadAsset ? (
        <section className="reveal site-container mt-16" aria-labelledby={`${leadSequenceEntry.id}-lead-title`}>
          <div className="img-color-reveal relative overflow-hidden" style={{ height: "70vh", minHeight: "480px" }}>
            <Image
              src={leadAsset.src}
              alt={resolveAlt(leadAsset, leadSequenceEntry.altTextNotes)}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)"
              }}
            />
            <div className="absolute bottom-0 left-0 p-8">
              <h2
                id={`${leadSequenceEntry.id}-lead-title`}
                className="text-white"
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 300,
                  lineHeight: 1.05
                }}
              >
                {leadSequenceEntry.title}
              </h2>
              {leadSequenceEntry.shortText ? (
                <p className="mt-2 text-white/70" style={{ fontSize: "0.875rem" }}>
                  {leadSequenceEntry.shortText}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── SERIES ENTRIES ── */}
      {seriesEntries.map((entry) => (
        <section key={entry.id} className="reveal site-container mt-20" aria-labelledby={`${entry.id}-series-title`}>
          <p className="text-muted mb-2" style={labelStyle}>Series</p>
          <h2
            id={`${entry.id}-series-title`}
            className="text-primary mb-8"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300
            }}
          >
            {entry.title}
          </h2>
          <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(255,255,255,0.05)" }}>
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <div key={assetId} className="img-color-reveal relative overflow-hidden" style={{ height: "320px" }}>
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : null;
            })}
          </div>
          {entry.subtitle ? (
            <p className="mt-4 text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
              {entry.subtitle}
            </p>
          ) : null}
        </section>
      ))}

      {/* ── EDITORIAL ROWS ── */}
      {editorialRows.map((entry) => (
        <section key={entry.id} className="reveal site-container mt-20" aria-labelledby={`${entry.id}-editorial-title`}>
          <p className="text-muted mb-2" style={labelStyle}>Editorial</p>
          <h2
            id={`${entry.id}-editorial-title`}
            className="text-primary mb-8"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300
            }}
          >
            {entry.title}
          </h2>
          <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(255,255,255,0.05)" }}>
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <div key={assetId} className="img-color-reveal relative aspect-video w-full overflow-hidden md:aspect-[3/2]">
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : null;
            })}
          </div>
        </section>
      ))}

      {/* ── PORTRAIT FEATURE ── */}
      {portraitFeature && portraitAsset ? (
        <section className="reveal site-container mt-20" aria-labelledby={`${portraitFeature.id}-portrait-title`}>
          <p className="text-muted mb-2" style={labelStyle}>Portrait</p>
          <h2
            id={`${portraitFeature.id}-portrait-title`}
            className="text-primary mb-8"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300
            }}
          >
            {portraitFeature.title}
          </h2>
          <div className="img-color-reveal relative overflow-hidden" style={{ height: "70vh", minHeight: "500px" }}>
            <Image
              src={portraitAsset.src}
              alt={resolveAlt(portraitAsset, portraitFeature.altTextNotes)}
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
        </section>
      ) : null}

      {/* ── QUIET STILLS ── */}
      {quietStills.map((entry) => (
        <section key={entry.id} className="reveal site-container mt-20" aria-labelledby={`${entry.id}-stills-title`}>
          <h2
            id={`${entry.id}-stills-title`}
            className="mb-6 text-muted"
            style={{
              fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase"
            }}
          >
            {entry.title}
          </h2>
          <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(255,255,255,0.05)" }}>
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <div key={assetId} className="img-color-reveal relative aspect-square overflow-hidden">
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : null;
            })}
          </div>
        </section>
      ))}

      {/* ── LINKED VISUAL ── */}
      {linkedVisual ? (
        <section className="reveal site-container mt-20" aria-labelledby={`${linkedVisual.id}-linked-title`}>
          <h2
            id={`${linkedVisual.id}-linked-title`}
            className="text-primary mb-6"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300
            }}
          >
            {linkedVisual.title}
          </h2>
          {linkedVisual.shortText ? (
            <p className="mb-6 text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
              {linkedVisual.shortText}
            </p>
          ) : null}
          {visualsData.intro.cta && linkedVisualAsset ? (
            <Link
              href={visualsData.intro.cta.href}
              className="img-color-reveal block relative overflow-hidden no-underline group"
              style={{ height: "60vh", minHeight: "400px" }}
            >
              <Image
                src={linkedVisualAsset.src}
                alt={resolveAlt(linkedVisualAsset, linkedVisual.altTextNotes)}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                aria-hidden="true"
                style={{ background: "rgba(0,0,0,0.35)" }}
              />
              <div className="absolute bottom-0 left-0 p-8">
                <span
                  className="cta-primary"
                  style={{ display: "inline-block" }}
                >
                  {visualsData.intro.cta.label}
                </span>
              </div>
            </Link>
          ) : null}
        </section>
      ) : null}

      {/* ── FOOTER CTA ── */}
      {visualsData.intro.cta ? (
        <div className="reveal site-container mt-16">
          <Link href={visualsData.intro.cta.href} className="cta-secondary">
            {visualsData.intro.cta.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
