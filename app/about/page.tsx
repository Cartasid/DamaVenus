import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutPageModel } from "@/content/data/about.data";
import { assetMap } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: { absolute: "About | Dama Venus" },
  description: "Read the artist profile of Dama Venus—an atmosphere-driven practice between music, image, and intention.",
  openGraph: {
    title: "About | Dama Venus",
    description: "Read the artist profile of Dama Venus—an atmosphere-driven practice between music, image, and intention.",
    url: "/about"
  },
  twitter: {
    title: "About | Dama Venus",
    description: "Read the artist profile of Dama Venus—an atmosphere-driven practice between music, image, and intention."
  },
  alternates: {
    canonical: "/about"
  }
};

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
  const leadPortraitObjectPosition = "center";
  const resolveAltText = (role: string, preferredAlt?: string, fallbackAlt?: string) => {
    if (role === "decorative") {
      return "";
    }

    return preferredAlt ?? fallbackAlt ?? "Portrait of Dama Venus";
  };

  return (
    <section className="section-stack-md" aria-labelledby="about-title">
      {leadPortraitAsset ? (
        <article className="overflow-hidden rounded-lg border border-white/10">
          <div className="relative aspect-[4/5] sm:aspect-[3/4]">
            <Image
              src={leadPortraitAsset.src}
              alt={resolveAltText(leadPortrait.role, leadPortrait.altTextNote, leadPortraitAsset.alt)}
              fill
              className="object-cover"
              style={{ objectPosition: leadPortraitObjectPosition }}
              sizes="(min-width: 640px) 420px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15" aria-hidden="true" />
            <header className="absolute inset-0 flex items-end p-4 sm:p-6">
              <div className="max-w-xl space-y-2">
                <p className="typo-label text-white/80">{aboutIntro.title}</p>
                <h1 id="about-title" className="typo-h1 font-bold text-white">
                  {aboutIntro.introLine}
                </h1>
                <p className="typo-body-m max-w-2xl text-white/90">{aboutIntro.shortText}</p>
              </div>
            </header>
          </div>
        </article>
      ) : (
        <header className="space-y-2">
          <h2 className="typo-label">{aboutIntro.title}</h2>
          <h1 id="about-title" className="typo-h1 font-bold">
            {aboutIntro.introLine}
          </h1>
          <p className="typo-body-m max-w-2xl">{aboutIntro.shortText}</p>
        </header>
      )}

      <section className="space-y-2" aria-label="Positionierung">
        <p className="typo-body-m max-w-2xl">{aboutBio.mediumText}</p>
      </section>

      <section className="space-y-2 rounded-lg border border-white/10 p-4" aria-label="Haltung">
        <p className="typo-label">Short Bio</p>
        <p className="typo-body-m max-w-2xl">{aboutBio.shortText}</p>
      </section>

      {aboutBio.longArtistNote ? (
        <section className="space-y-2 rounded-lg border border-white/10 bg-surface/50 p-4" aria-labelledby="about-artist-note-heading">
          <h3 id="about-artist-note-heading" className="typo-label">
            Artist Note
          </h3>
          <p className="typo-body-m max-w-2xl">{aboutBio.longArtistNote}</p>
        </section>
      ) : null}

      <section className="space-y-3 rounded-lg border border-white/10 bg-surface/50 p-4" aria-labelledby="about-method-heading">
        <h2 id="about-method-heading" className="typo-label">
          Arbeitsweise
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {keyStatements.map((statement) => (
            <li key={statement.id} className="rounded-md border border-white/10 p-3 typo-body-m">
              <h3 className="typo-h4 text-foreground">{statement.title}</h3>
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

      {supportingVisuals.length ? (
        <section className="grid gap-3 sm:grid-cols-2" aria-labelledby="about-supporting-visuals-heading">
          <h2 id="about-supporting-visuals-heading" className="sr-only">
            Supporting Visuals
          </h2>
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
                    alt={resolveAltText(visual.role, visual.altTextNote, asset.alt)}
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

    </section>
  );
}
