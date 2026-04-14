import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { visualsData } from "@/content/data/visuals.data";
import { assetMap } from "@/content/data/site.config";
import ImageReveal from "@/components/utils/image-reveal";
import VideoReveal from "@/components/utils/video-reveal";

const VIDEO_ASSETS: Record<string, string> = {
  "visuals-cinderela-landscape-210": "/assets/dama-venus/visuals/dv_visuals_cinderela_hover_video_v01.mp4"
};

export const metadata: Metadata = {
  title: { absolute: "Visuals | Dáma Venus — Editorial Portraits & Photography" },
  description: "Curated editorial portraits, cinematic photography, and fashion-driven visual direction by Dáma Venus — from Rio de Janeiro to Berlin. View the full visual world.",
  openGraph: {
    title: "Visuals | Dáma Venus — Editorial Portraits & Photography",
    description: "Curated editorial portraits and cinematic photography by Dáma Venus — fashion-driven visual direction.",
    url: "/visuals",
    images: [{ url: "/og-visuals.png" }]
  },
  twitter: {
    title: "Visuals | Dáma Venus — Editorial Portraits & Photography",
    description: "Curated editorial portraits and cinematic photography by Dáma Venus.",
    images: ["/og-visuals.png"]
  },
  alternates: { canonical: "/visuals" }
};

const labelStyle = {
  fontFamily: "var(--font-montserrat), system-ui, sans-serif",
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
        <h1 className="sr-only">Dáma Venus — Visuals &amp; Photography</h1>
        <p className="text-muted mb-4" style={labelStyle}>{visualsData.intro.label}</p>
        <p
          role="doc-subtitle"
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
        </p>
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
        <section key={entry.id} className="reveal site-container mt-28" aria-labelledby={`${entry.id}-series-title`}>
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
        <section key={entry.id} className="reveal site-container mt-28" aria-labelledby={`${entry.id}-editorial-title`}>
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
              const videoSrc = VIDEO_ASSETS[assetId];
              if (videoSrc) {
                return (
                  <VideoReveal
                    key={assetId}
                    src={videoSrc}
                    className="aspect-video w-full md:aspect-[3/2]"
                    style={{ padding: "1px", background: "rgba(200,168,126,0.08)" }}
                    aria-label="Dáma Venus — Cinderela cinematic sequence"
                  />
                );
              }
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

      {/* ── QUIET STILLS ── */}
      {quietStills.map((entry) => (
        <section key={entry.id} className="reveal site-container mt-28" aria-labelledby={`${entry.id}-stills-title`}>
          <h2
            id={`${entry.id}-stills-title`}
            className="mb-6 text-muted"
            style={{
              fontFamily: "var(--font-montserrat), system-ui, sans-serif",
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

      {/* ── CROSS-LINKS ── */}
      <nav aria-label="Explore more" className="reveal site-container mt-28">
        <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(200,168,126,0.04)" }}>
          <Link href="/music" className="block p-8 no-underline hover:bg-white/[0.02] transition-colors" style={{ background: "#000000", border: "1px solid rgba(200,168,126,0.06)" }}>
            <p className="text-accent mb-2" style={labelStyle}>Music</p>
            <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>Selected releases and visual chapters — alternative pop, trap-pop, R&B, and vaporwave.</p>
          </Link>
          <Link href="/about" className="block p-8 no-underline hover:bg-white/[0.02] transition-colors" style={{ background: "#000000", border: "1px solid rgba(200,168,126,0.06)" }}>
            <p className="text-accent mb-2" style={labelStyle}>Bio</p>
            <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>The story behind the cinematic universe of Dáma Venus — from Rio de Janeiro to Europe.</p>
          </Link>
          <Link href="/contact" className="block p-8 no-underline hover:bg-white/[0.02] transition-colors" style={{ background: "#000000", border: "1px solid rgba(200,168,126,0.06)" }}>
            <p className="text-accent mb-2" style={labelStyle}>Contact</p>
            <p className="text-muted" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>Bookings, collaborations, and exclusive partnerships.</p>
          </Link>
        </div>
      </nav>

    </div>
  );
}
