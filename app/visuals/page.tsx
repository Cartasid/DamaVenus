import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { visualsData, visualsCategories } from "@/content/data/visuals.data";
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
  const linkedVisual = sortedEntries.find((entry) => entry.moduleType === "linked-visual-module");

  // Group by category
  const entriesByCategory = visualsCategories.map((cat) => ({
    ...cat,
    entries: sortedEntries.filter((e) => e.category === cat.id)
  }));

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
                fontFamily: "var(--font-bodoni), Georgia, serif",
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: 300,
                lineHeight: 0.95
              }}
            >
              {visualsData.intro.headline}
            </h1>
          </div>
          {openerAsset ? (
            <ImageReveal
              className="relative overflow-hidden"
              style={{ height: "220px" }}
              lightboxSrc={openerAsset.src}
              lightboxAlt={resolveAlt(openerAsset)}
            >
              <Image
                src={openerAsset.src}
                alt={resolveAlt(openerAsset)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover object-top"
              />
            </ImageReveal>
          ) : null}
        </div>
        {visualsData.intro.subhead ? (
          <p className="mt-6 text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "36rem" }}>
            {visualsData.intro.subhead}
          </p>
        ) : null}

        {/* Category Navigation */}
        <nav aria-label="Visual categories" className="mt-10 flex flex-wrap items-center gap-6">
          {visualsCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#category-${cat.id}`}
              className="text-muted hover:text-offWhite no-underline"
              style={{
                fontFamily: "var(--font-syne), system-ui, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                transition: "color 300ms",
                borderBottom: "1px solid rgba(200,168,126,0.25)",
                paddingBottom: "4px"
              }}
            >
              {cat.label}
            </a>
          ))}
        </nav>

        <div className="mt-14 h-px" style={{ background: "rgba(200,168,126,0.08)" }} />
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
              className="object-cover object-top"
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

      {/* ── CATEGORY SECTIONS ── */}
      {entriesByCategory.map((cat) => cat.entries.length > 0 ? (
        <div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-24">
          <div className="site-container mt-20 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1" style={{ background: "rgba(200,168,126,0.12)" }} />
              <h2
                style={{
                  fontFamily: "var(--font-syne), system-ui, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(200,168,126,0.7)"
                }}
              >
                {cat.label}
              </h2>
              <div className="h-px flex-1" style={{ background: "rgba(200,168,126,0.12)" }} />
            </div>
            <p className="mt-3 text-center text-muted" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>
              {cat.description}
            </p>
          </div>
        </div>
      ) : null)}

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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-top"
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
              sizes="100vw"
              className="object-cover object-top"
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
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                </ImageReveal>
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
              fontFamily: "var(--font-bodoni), Georgia, serif",
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
              className="block no-underline group"
            >
              <ImageReveal
                className="relative overflow-hidden"
                style={{ height: "60vh", minHeight: "400px" }}
              >
                <Image
                  src={linkedVisualAsset.src}
                  alt={resolveAlt(linkedVisualAsset, linkedVisual.altTextNotes)}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  aria-hidden="true"
                  style={{ background: "rgba(5,5,5,0.4)" }}
                />
                <div className="absolute bottom-0 left-0 p-8">
                  <span
                    className="cta-primary"
                    style={{ display: "inline-block" }}
                  >
                    {visualsData.intro.cta.label}
                  </span>
                </div>
              </ImageReveal>
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
