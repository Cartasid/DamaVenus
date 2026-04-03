import Link from "next/link";
import Image from "next/image";
import { musicData } from "@/content/data/music.data";
import { assetMap } from "@/content/data/site.config";

export default function MusicPage() {
  const featured = musicData.releases.find((release) => release.id === musicData.featuredReleaseId) ?? musicData.releases[0];
  const selectedSingles = musicData.releases.filter((release) => !release.featured);

  const featuredAsset = assetMap[featured.coverAsset.id];

  return (
    <section className="space-y-10">
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">{musicData.intro.label}</p>
        <h1 className="font-display text-3xl font-bold">{musicData.intro.headline}</h1>
        <p className="max-w-2xl text-muted">{musicData.intro.subhead}</p>
      </header>

      <article id={featured.id} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center">
        {featuredAsset ? (
          <div className="aspect-[4/5] w-full overflow-hidden rounded-md">
            <Image
              src={featuredAsset.src}
              alt={featuredAsset.alt ?? featured.title}
              width={1200}
              height={1500}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Featured Release</p>
          <h2 className="font-display text-2xl font-semibold">{featured.title}</h2>
          {featured.subtitle ? <p className="text-sm text-muted">{featured.subtitle}</p> : null}
          <p className="text-sm text-muted">{featured.shortText}</p>
          <div className="flex flex-wrap gap-3">
            <Link href={featured.primaryCta.href} className="first-impression-cta">
              {musicData.ctaLabels.listen}
            </Link>
            {featured.watchLinks?.[0] ? (
              <Link href={featured.watchLinks[0].href} className="first-impression-cta">
                {musicData.ctaLabels.watch}
              </Link>
            ) : null}
          </div>
        </div>
      </article>

      <section id="selected-releases" className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">Selected Releases</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {selectedSingles.map((release) => {
            const releaseAsset = assetMap[release.coverAsset.id];
            return (
              <li key={release.id} id={release.id} className="space-y-2 rounded-lg border border-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{release.status}</p>
                <h3 className="font-display text-xl">{release.title}</h3>
                <p className="text-sm text-muted">{release.shortText}</p>
                {releaseAsset ? <p className="text-xs text-muted">Asset: {releaseAsset.src}</p> : null}
                <Link href={release.primaryCta.href} className="first-impression-cta">
                  {release.primaryCta.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section id="visual-releases" className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">Visual Releases</h2>
        <ul className="space-y-3">
          {musicData.visualReleases.map((release) => {
            const releaseAsset = assetMap[release.coverAsset.id];
            return (
              <li key={release.id} className="rounded-lg border border-white/10 p-4">
                <p className="text-sm text-muted">{release.title}</p>
                <p className="text-xs text-muted">
                  Asset hints: {releaseAsset?.cropHint} · {releaseAsset?.focusHint}
                </p>
                <Link href={release.primaryCta.href} className="first-impression-cta mt-2 inline-block">
                  {release.primaryCta.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
