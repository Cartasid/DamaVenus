import Link from "next/link";
import Image from "next/image";
import { visualsData } from "@/content/data/visuals.data";
import { assetMap } from "@/content/data/site.config";

export default function VisualsPage() {
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

  return (
    <section className="space-y-10">
      <header className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
        {openerAsset ? (
          <Image
            src={openerAsset.src}
            alt={openerAsset.alt ?? visualsData.intro.headline}
            width={1400}
            height={900}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-64 w-full rounded-md object-cover"
          />
        ) : null}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{visualsData.intro.label}</p>
          <h1 className="font-display text-3xl font-semibold">{visualsData.intro.headline}</h1>
          <p className="text-sm text-muted">{visualsData.intro.subhead}</p>
        </div>
      </header>

      {leadSequenceEntry && leadAsset ? (
        <article className="space-y-3 rounded-lg border border-white/10 p-4" aria-labelledby={`${leadSequenceEntry.id}-lead-title`}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md md:aspect-[3/4]">
            <Image
              src={leadAsset.src}
              alt={leadAsset.alt ?? leadSequenceEntry.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 75vw"
              className="object-cover"
            />
          </div>
          <h2 id={`${leadSequenceEntry.id}-lead-title`} className="font-display text-2xl font-semibold">
            {leadSequenceEntry.title}
          </h2>
          {leadSequenceEntry.shortText ? <p className="text-sm text-muted">{leadSequenceEntry.shortText}</p> : null}
        </article>
      ) : null}

      {seriesEntries.map((entry) => (
        <section key={entry.id} className="space-y-3" aria-labelledby={`${entry.id}-series-title`}>
          <h2 id={`${entry.id}-series-title`} className="font-display text-2xl font-semibold">
            {entry.title}
          </h2>
          {entry.subtitle ? <p className="text-sm text-muted">{entry.subtitle}</p> : null}
          <div className="grid gap-3 md:grid-cols-3">
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <Image
                  key={assetId}
                  src={asset.src}
                  alt={asset.alt ?? entry.title}
                  width={1200}
                  height={1200}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="h-44 w-full rounded-md object-cover"
                />
              ) : null;
            })}
          </div>
        </section>
      ))}

      {editorialRows.map((entry) => (
        <section key={entry.id} className="space-y-3" aria-labelledby={`${entry.id}-editorial-title`}>
          <h2 id={`${entry.id}-editorial-title`} className="font-display text-2xl font-semibold">
            {entry.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <div key={assetId} className="relative aspect-video w-full overflow-hidden rounded-md md:aspect-[3/2]">
                  <Image
                    src={asset.src}
                    alt={asset.alt ?? entry.title}
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

      {portraitFeature && portraitAsset ? (
        <section className="space-y-3" aria-labelledby={`${portraitFeature.id}-portrait-title`}>
          <h2 id={`${portraitFeature.id}-portrait-title`} className="font-display text-2xl font-semibold">
            {portraitFeature.title}
          </h2>
          <Image
            src={portraitAsset.src}
            alt={portraitAsset.alt ?? portraitFeature.title}
            width={1300}
            height={1600}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-[28rem] w-full rounded-md object-cover"
          />
        </section>
      ) : null}

      {quietStills.map((entry) => (
        <section key={entry.id} className="space-y-3" aria-labelledby={`${entry.id}-stills-title`}>
          <h2 id={`${entry.id}-stills-title`} className="font-display text-xl font-semibold text-muted">
            {entry.title}
          </h2>
          <div className="grid gap-3 md:grid-cols-3">
            {entry.assets.map((assetId) => {
              const asset = assetMap[assetId];
              return asset ? (
                <div key={assetId} className="relative aspect-square w-full overflow-hidden rounded-md">
                  <Image
                    src={asset.src}
                    alt={asset.alt ?? entry.title}
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

      {linkedVisual ? (
        <section className="space-y-3 rounded-lg border border-white/10 bg-white/[0.02] p-4" aria-labelledby={`${linkedVisual.id}-linked-title`}>
          <h2 id={`${linkedVisual.id}-linked-title`} className="font-display text-2xl font-semibold">
            {linkedVisual.title}
          </h2>
          {linkedVisual.shortText ? <p className="text-sm text-muted">{linkedVisual.shortText}</p> : null}
          {visualsData.intro.cta ? (
            <Link href={visualsData.intro.cta.href} className="first-impression-cta">
              {visualsData.intro.cta.label}
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
    </section>
  );
}
