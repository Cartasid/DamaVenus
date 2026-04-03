import Image from "next/image";
import Link from "next/link";
import { aboutPageModel } from "@/content/data/about.data";
import { assetMap } from "@/content/data/site.config";

export default function AboutPage() {
  const { aboutBio, aboutIntro, aboutKeyStatements, aboutVisualModules } = aboutPageModel;
  const aboutCta = aboutIntro.primaryCtaPattern;

  const featuredPortraits = [...aboutVisualModules.featuredPortraits].sort(
    (a, b) => a.sectionPriority - b.sectionPriority
  );
  const supportingVisuals = [...aboutVisualModules.supportingVisuals].sort(
    (a, b) => a.sectionPriority - b.sectionPriority
  );
  const keyStatements = [...aboutKeyStatements].sort((a, b) => a.sectionPriority - b.sectionPriority);

  const leadPortrait = featuredPortraits[0];
  const leadPortraitAsset = leadPortrait ? assetMap[leadPortrait.assetId] : undefined;

  return (
    <section className="space-y-6" aria-labelledby="about-title">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted">{aboutIntro.title}</p>
        <h1 id="about-title" className="font-display text-3xl font-bold">
          {aboutIntro.introLine}
        </h1>
        <p className="text-muted">{aboutIntro.shortText}</p>
      </header>

      {leadPortraitAsset ? (
        <article className="space-y-3 rounded-lg border border-white/10 p-4" aria-label="Lead Portrait">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md border border-white/10">
            <Image
              src={leadPortraitAsset.src}
              alt={leadPortrait.altTextNote ?? leadPortraitAsset.alt ?? "Lead portrait"}
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

      {supportingVisuals.length ? (
        <section className="grid gap-3 sm:grid-cols-2" aria-label="Supporting Visuals">
          {supportingVisuals.map((visual) => {
            const asset = assetMap[visual.assetId];
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
        <ul className="grid gap-2 sm:grid-cols-2" aria-label="Methodik und Haltung">
          {keyStatements.map((statement) => (
            <li key={statement.id} className="rounded-md border border-white/10 p-3 text-sm text-muted">
              <p className="font-medium text-foreground">{statement.title}</p>
              <p>{statement.shortText}</p>
            </li>
          ))}
        </ul>
      </section>

      <div>
        <Link href={aboutCta.href} className="first-impression-cta">
          {aboutCta.label}
        </Link>
      </div>
    </section>
  );
}
