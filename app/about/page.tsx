import Image from "next/image";
import Link from "next/link";
import { aboutPageModel } from "@/content/data/about.data";
import { assetMap } from "@/content/data/site.config";

export default function AboutPage() {
  const { aboutBio, aboutIntro, aboutKeyStatements, aboutVisualModules } = aboutPageModel;
  const aboutCta = aboutIntro.primaryCtaPattern;
  const featuredPortraits = aboutVisualModules.featuredPortraits;
  const supportingVisuals = aboutVisualModules.supportingVisuals;

  const leadPortrait = featuredPortraits[0];
  const leadPortraitAsset = leadPortrait ? assetMap[leadPortrait.assetId] : undefined;
  const resolvedSupportingVisuals = supportingVisuals
    .map((visual) => ({ visual, asset: assetMap[visual.assetId] }))
    .filter((entry) => Boolean(entry.asset));
  const keyStatements = [...aboutKeyStatements].sort((a, b) => a.sectionPriority - b.sectionPriority);

  return (
    <section className="space-y-6" aria-labelledby="about-title">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted">About</p>
        <h1 id="about-title" className="font-display text-3xl font-bold">
          Built on atmosphere.
        </h1>
        <p className="text-muted">{aboutIntro.shortText}</p>
      </header>

      {leadPortraitAsset ? (
        <article className="space-y-3 rounded-lg border border-white/10 p-4" aria-label="Lead Portrait">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-white/10">
            <Image
              src={leadPortraitAsset.src}
              alt={leadPortrait.altText ?? leadPortraitAsset.alt ?? "Lead portrait"}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 320px, 100vw"
            />
          </div>
        </article>
      ) : null}

      <section className="space-y-2 rounded-lg border border-white/10 p-4" aria-label="Kurzprofil">
        <p className="text-xs uppercase tracking-wide text-muted">Short Bio</p>
        <p className="text-sm text-muted">{aboutBio.shortText}</p>
      </section>

      <section className="space-y-2" aria-label="Haltung">
        <p className="text-sm text-muted">{aboutBio.mediumText}</p>
      </section>

      {resolvedSupportingVisuals.length ? (
        <section className="grid gap-3 sm:grid-cols-2" aria-label="Supporting Visuals">
          {resolvedSupportingVisuals.map(({ visual, asset }) => {
            if (!asset) {
              return null;
            }

            const ratioClass = visual.role === "reserve" ? "aspect-[3/4]" : "aspect-[4/5]";

            return (
              <article key={visual.assetId} className="space-y-2">
                <div className={`relative ${ratioClass} overflow-hidden rounded-md border border-white/10`}>
                  <Image
                    src={asset.src}
                    alt={visual.altTextNote ?? asset.alt ?? "Supporting visual"}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 280px, 48vw"
                  />
                </div>
              </article>
            );
          })}
        </section>
      ) : null}

      {aboutBio.longArtistNote ? (
        <section className="space-y-2 rounded-lg border border-white/10 bg-white/[0.02] p-4" aria-label="Artist Note">
          <p className="text-sm text-muted">{aboutBio.longArtistNote}</p>
        </section>
      ) : null}

      <section className="space-y-3 rounded-lg border border-white/10 bg-white/[0.02] p-4" aria-label="Arbeitsweise">
        <p className="text-xs uppercase tracking-wide text-muted">Arbeitsweise</p>
        <p className="text-sm text-muted">{aboutBio.mediumText}</p>
        <ul className="grid gap-2 sm:grid-cols-2" aria-label="Methodik und Haltung">
          {keyStatements.map((statement) => (
            <li key={statement.id} className="rounded-md border border-white/10 p-3 text-sm text-muted">
              {statement.text}
            </li>
          ))}
        </ul>
        {aboutBio.longArtistNote ? <p className="text-sm text-muted">{aboutBio.longArtistNote}</p> : null}
      </section>

      {rhythmVisuals[1]?.asset ? (
        <section className="relative aspect-[16/10] overflow-hidden rounded-md border border-white/10" aria-label="Visual Rhythm">
          <Image
            src={rhythmVisuals[1].asset.src}
            alt={rhythmVisuals[1].visual.altText ?? rhythmVisuals[1].asset.alt ?? "Supporting visual"}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </section>
      ) : null}

      <div>
        <Link href={aboutCta.href} className="first-impression-cta">
          {aboutCta.label}
        </Link>
      </div>
    </section>
  );
}
