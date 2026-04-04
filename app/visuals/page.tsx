import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { visualsData } from "@/content/data/visuals.data";
import { assetMap } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: { absolute: "Visuals | Dama Venus" },
  description: "Explore curated visuals, portraits, and editorial sequences shaped in the signature of Dama Venus.",
  openGraph: {
    title: "Visuals | Dama Venus",
    description: "Explore curated visuals, portraits, and editorial sequences shaped in the signature of Dama Venus.",
    url: "/visuals"
  },
  twitter: {
    title: "Visuals | Dama Venus",
    description: "Explore curated visuals, portraits, and editorial sequences shaped in the signature of Dama Venus."
  },
  alternates: {
    canonical: "/visuals"
  }
};

export default function VisualsPage() {
  const resolveAlt = (asset: (typeof assetMap)[string] | undefined, altTextNotes?: string) => {
    if (!asset) return "";
    if (asset.role === "decorative") return "";
    const baseAlt = asset.alt?.trim() || "Visual";
    return altTextNotes ? `${baseAlt} — ${altTextNotes}` : baseAlt;
  };
  const getSequenceMediaClass = (
    asset: (typeof assetMap)[string] | undefined,
    phase: "sw-first" | "mid-peak" | "cooldown"
  ) => {
    const phaseClass =
      phase === "sw-first"
        ? "grayscale saturate-0 brightness-95"
        : phase === "mid-peak"
          ? "grayscale-0 saturate-[1.2] brightness-100"
          : "grayscale-[55%] saturate-[0.55] brightness-95";
    const swColorClass =
      asset?.swColorMode === "excellent"
        ? phase === "mid-peak"
          ? "contrast-110"
          : "contrast-105"
        : asset?.swColorMode === "good"
          ? "contrast-105"
          : "contrast-100";
    return [phaseClass, swColorClass].filter(Boolean).join(" ");
  };
  const getOverlayClass = (asset: (typeof assetMap)[string] | undefined, module: "intro" | "lead" | "series" | "editorial" | "portrait" | "quiet" | "linked") => {
    const overlayStrength = asset?.overlaySuitability === "supports-dark-overlay" ? "strong" : "subtle";
    return `visual-overlay visual-overlay--${module} visual-overlay--${overlayStrength}`;
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
    <main className="section-stack-md" aria-labelledby="visuals-page-title">
      <header className="grid gap-4 rounded-lg border border-white/10 bg-surface/60 p-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
        {openerAsset ? (
          <Image
            src={openerAsset.src}
            alt={resolveAlt(openerAsset)}
            width={1400}
            height={900}
            sizes="(max-width: 768px) 100vw, 60vw"
            className={`h-64 w-full rounded-md object-cover ${getSequenceMediaClass(openerAsset, "sw-first")}`}
          />
        ) : null}
        <div className="space-y-2">
          <p className="typo-label">{visualsData.intro.label}</p>
          <h1 id="visuals-page-title" className="typo-h1">{visualsData.intro.headline}</h1>
          <p className="typo-body-m max-w-2xl">{visualsData.intro.subhead}</p>
        </div>
      </header>

      {leadSequenceEntry && leadAsset ? (
        <article className="space-y-3 rounded-lg border border-white/10 p-4" aria-labelledby={`${leadSequenceEntry.id}-lead-title`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md md:aspect-[3/4]">
            <Image
              src={leadAsset.src}
              alt={resolveAlt(leadAsset, leadSequenceEntry.altTextNotes)}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
              className={`object-cover ${getSequenceMediaClass(leadAsset, "sw-first")}`}
            />
            <div className={getOverlayClass(leadAsset, "lead")} aria-hidden="true" />
          </div>
          <h2 id={`${leadSequenceEntry.id}-lead-title`} className="typo-h2">
            {leadSequenceEntry.title}
          </h2>
          {leadSequenceEntry.shortText ? <p className="typo-body-m">{leadSequenceEntry.shortText}</p> : null}
        </article>
      ) : null}

      {seriesEntries.map((entry) => (
        <section key={entry.id} className="space-y-3" aria-labelledby={`${entry.id}-series-title`}>
          <h2 id={`${entry.id}-series-title`} className="typo-h2">
            {entry.title}
          </h2>
          {entry.subtitle ? <p className="typo-body-m">{entry.subtitle}</p> : null}
          <div className="grid gap-3 md:grid-cols-3">
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <Image
                  key={assetId}
                  src={asset.src}
                  alt={resolveAlt(asset, entry.altTextNotes)}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`h-44 w-full rounded-md object-cover ${getSequenceMediaClass(asset, "mid-peak")}`}
                />
              ) : null;
            })}
          </div>
        </section>
      ))}

      {editorialRows.map((entry) => (
        <section key={entry.id} className="space-y-3" aria-labelledby={`${entry.id}-editorial-title`}>
          <h2 id={`${entry.id}-editorial-title`} className="typo-h2">
            {entry.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <div key={assetId} className="relative aspect-video w-full overflow-hidden rounded-md md:aspect-[3/2]">
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`object-cover ${getSequenceMediaClass(asset, "mid-peak")}`}
                  />
                  <div className={getOverlayClass(asset, "editorial")} aria-hidden="true" />
                </div>
              ) : null;
            })}
          </div>
        </section>
      ))}

      {portraitFeature && portraitAsset ? (
        <section className="space-y-3" aria-labelledby={`${portraitFeature.id}-portrait-title`}>
          <h2 id={`${portraitFeature.id}-portrait-title`} className="typo-h2">
            {portraitFeature.title}
          </h2>
          <Image
            src={portraitAsset.src}
            alt={resolveAlt(portraitAsset, portraitFeature.altTextNotes)}
            width={1300}
            height={1600}
            sizes="(max-width: 768px) 100vw, 60vw"
            className={`h-[28rem] w-full rounded-md object-cover ${getSequenceMediaClass(portraitAsset, "mid-peak")}`}
          />
        </section>
      ) : null}

      {quietStills.map((entry) => (
        <section key={entry.id} className="space-y-3" aria-labelledby={`${entry.id}-stills-title`}>
          <h2 id={`${entry.id}-stills-title`} className="typo-h3 text-muted">
            {entry.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <div key={assetId} className="relative aspect-square w-full overflow-hidden rounded-md">
                  <Image
                    src={asset.src}
                    alt={resolveAlt(asset, entry.altTextNotes)}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className={`object-cover ${getSequenceMediaClass(asset, "cooldown")}`}
                  />
                  <div className={getOverlayClass(asset, "quiet")} aria-hidden="true" />
                </div>
              ) : null;
            })}
          </div>
        </section>
      ))}

      {linkedVisual ? (
        <section className="space-y-3 rounded-lg border border-white/10 bg-surface/50 p-4" aria-labelledby={`${linkedVisual.id}-linked-title`}>
          <h2 id={`${linkedVisual.id}-linked-title`} className="typo-h2">
            {linkedVisual.title}
          </h2>
          {linkedVisual.shortText ? <p className="typo-body-m">{linkedVisual.shortText}</p> : null}
          {visualsData.intro.cta && linkedVisualAsset ? (
            <Link href={visualsData.intro.cta.href} className="first-impression-tile block space-y-3 rounded-md p-2">
              <div className="relative aspect-[9/16] w-full overflow-hidden rounded-md md:aspect-[3/2]">
                <Image
                  src={linkedVisualAsset.src}
                  alt={resolveAlt(linkedVisualAsset, linkedVisual.altTextNotes)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover ${getSequenceMediaClass(linkedVisualAsset, "cooldown")}`}
                />
                <div className={getOverlayClass(linkedVisualAsset, "linked")} aria-hidden="true" />
              </div>
              <span className="typo-body-m">{visualsData.intro.cta.label}</span>
            </Link>
          ) : null}
        </section>
      ) : null}

      {visualsData.intro.cta ? (
        <footer className="rounded-lg border border-white/10 p-5">
          <Link href={visualsData.intro.cta.href} className="first-impression-cta">
            {visualsData.intro.cta.label}
          </Link>
        </footer>
      ) : null}
    </main>
  );
}
