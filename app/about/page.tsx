import Image from "next/image";
import Link from "next/link";
import { aboutBio, aboutCta, aboutIntro, aboutKeyStatements, featuredPortraits } from "@/content/data/about.data";
import { assetMap } from "@/content/data/site.config";

export default function AboutPage() {
  const leadPortrait = featuredPortraits[0];
  const leadPortraitAsset = leadPortrait ? assetMap[leadPortrait.assetId] : undefined;
  const keyStatements = [...aboutKeyStatements].sort((a, b) => a.priority - b.priority);

  return (
    <section className="space-y-6" aria-labelledby="about-title">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-wide text-muted">{aboutIntro.label}</p>
        <h1 id="about-title" className="font-display text-3xl font-bold">
          {aboutIntro.title}
        </h1>
        <p className="text-muted">{aboutIntro.introLine}</p>
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

      <section className="space-y-2" aria-label="Kurzprofil">
        <p className="text-sm text-muted">{aboutBio.shortText}</p>
      </section>

      <section className="space-y-2" aria-label="Haltung">
        <p className="text-sm text-muted">{aboutBio.mediumText}</p>
      </section>

      {aboutBio.longArtistNote ? (
        <section className="space-y-2 rounded-lg border border-white/10 bg-white/[0.02] p-4" aria-label="Artist Note">
          <p className="text-sm text-muted">{aboutBio.longArtistNote}</p>
        </section>
      ) : null}

      <section className="space-y-3" aria-label="Key Statements">
        <ul className="grid gap-2 sm:grid-cols-2">
          {keyStatements.map((statement) => (
            <li key={statement.id} className="rounded-md border border-white/10 p-3 text-sm text-muted">
              {statement.text}
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
