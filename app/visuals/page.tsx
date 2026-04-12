import type { Metadata } from "next";
import Image from "next/image";
import { visualsData } from "@/content/data/visuals.data";
import { assetMap } from "@/content/data/site.config";
import ImageReveal from "@/components/utils/image-reveal";

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
  fontFamily: "var(--font-syne), system-ui, sans-serif",
  fontSize: "0.6rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "rgba(200,168,126,0.6)"
};

export default function VisualsPage() {
  const resolveAlt = (asset: (typeof assetMap)[string] | undefined, altTextNotes?: string) => {
    if (!asset) return "";
    if (asset.role === "decorative") return "";
    const baseAlt = asset.alt?.trim() || "Visual";
    return altTextNotes ? `${baseAlt} — ${altTextNotes}` : baseAlt;
  };

  const sortedEntries = [...visualsData.entries].sort((a, b) => a.order - b.order || a.priority - b.priority);

  const leadSequenceEntry = sortedEntries.find((entry) => entry.role === "lead" && entry.type === "series");
  const seriesEntries = sortedEntries.filter((entry) => entry.moduleType === "series-section");
  const editorialRows = sortedEntries.filter((entry) => entry.moduleType === "editorial-image-row");
  const portraitFeature = sortedEntries.find((entry) => entry.type === "portrait");
  const quietStills = sortedEntries.filter((entry) => entry.role === "quiet-spacer" || entry.type === "still");

  const introLeadAsset = visualsData.intro.leadAsset?.id ? assetMap[visualsData.intro.leadAsset.id] : undefined;
  const leadAsset = introLeadAsset ?? (leadSequenceEntry?.assets[0] ? assetMap[leadSequenceEntry.assets[0]] : undefined);
  const portraitAsset = portraitFeature?.assets[0] ? assetMap[portraitFeature.assets[0]] : undefined;

  return (
    <div className="pb-28" aria-labelledby="visuals-page-title">

      {/* ── PAGE HEADER ── */}
      <header className="home-hero-enter site-container pt-24 pb-0">
        <p className="text-muted mb-4" style={labelStyle}>{visualsData.intro.label}</p>
        <h1
          id="visuals-page-title"
          className="text-primary"
          style={{
            fontFamily: "var(--font-bodoni), Georgia, serif",
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 300,
            lineHeight: 0.92,
            maxWidth: "14ch"
          }}
        >
          {visualsData.intro.headline}
        </h1>
        {visualsData.intro.subhead ? (
          <p className="mt-8 text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.75, maxWidth: "34rem" }}>
            {visualsData.intro.subhead}
          </p>
        ) : null}
        <div className="mt-16 h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
      </header>

      {/* ── LEAD VISUAL ── */}
      {leadSequenceEntry && leadAsset ? (
        <section className="reveal site-container mt-16" aria-labelledby={`${leadSequenceEntry.id}-lead-title`}>
          <ImageReveal
            className="relative overflow-hidden"
            style={{ height: "70vh", minHeight: "480px" }}
            lightboxSrc={leadAsset.src}
            lightboxAlt={resolveAlt(leadAsset, leadSequenceEntry.altTextNotes)}
          >
            <Image
              src={leadAsset.src}
              alt={resolveAlt(leadAsset, leadSequenceEntry.altTextNotes)}
              fill
              priority
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: leadAsset.objectPosition ?? "center center" }}
            />
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                background: "linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 50%)"
              }}
            />
            <div className="absolute bottom-0 left-0 p-8">
              <h2
                id={`${leadSequenceEntry.id}-lead-title`}
                className="text-white"
                style={{
                  fontFamily: "var(--font-bodoni), Georgia, serif",
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
          </ImageReveal>
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
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300
            }}
          >
            {entry.title}
          </h2>
          <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(200,168,126,0.04)" }}>
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <ImageReveal
                  key={assetId}
                  className="relative overflow-hidden"
                  style={{ height: "320px", padding: "1px", background: "rgba(200,168,126,0.08)" }}
                  lightboxSrc={asset.src}
                  lightboxAlt={resolveAlt(asset, entry.altTextNotes)}
                >
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: asset.objectPosition ?? "center center" }}
                  />
                </ImageReveal>
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
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300
            }}
          >
            {entry.title}
          </h2>
          <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(200,168,126,0.04)" }}>
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <ImageReveal
                  key={assetId}
                  className="relative aspect-video w-full overflow-hidden md:aspect-[3/2]"
                  style={{ padding: "1px", background: "rgba(200,168,126,0.08)" }}
                  lightboxSrc={asset.src}
                  lightboxAlt={resolveAlt(asset, entry.altTextNotes)}
                >
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: asset.objectPosition ?? "center center" }}
                  />
                </ImageReveal>
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
              fontFamily: "var(--font-bodoni), Georgia, serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300
            }}
          >
            {portraitFeature.title}
          </h2>
          <ImageReveal
            className="relative overflow-hidden"
            style={{ height: "70vh", minHeight: "500px" }}
            lightboxSrc={portraitAsset.src}
            lightboxAlt={resolveAlt(portraitAsset, portraitFeature.altTextNotes)}
          >
            <Image
              src={portraitAsset.src}
              alt={resolveAlt(portraitAsset, portraitFeature.altTextNotes)}
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: portraitAsset.objectPosition ?? "center 25%" }}
            />
          </ImageReveal>
        </section>
      ) : null}

      {/* ── QUIET STILLS ── */}
      {quietStills.map((entry) => (
        <section key={entry.id} className="reveal site-container mt-20" aria-labelledby={`${entry.id}-stills-title`}>
          <h2
            id={`${entry.id}-stills-title`}
            className="mb-6 text-muted"
            style={{
              fontFamily: "var(--font-syne), system-ui, sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(200,168,126,0.6)"
            }}
          >
            {entry.title}
          </h2>
          <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(200,168,126,0.04)" }}>
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <ImageReveal
                  key={assetId}
                  className="relative aspect-square overflow-hidden"
                  style={{ padding: "1px", background: "rgba(200,168,126,0.08)" }}
                  lightboxSrc={asset.src}
                  lightboxAlt={resolveAlt(asset, entry.altTextNotes)}
                >
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: asset.objectPosition ?? "center center" }}
                  />
                </ImageReveal>
              ) : null;
            })}
          </div>
        </section>
      ))}


    </div>
  );
}
