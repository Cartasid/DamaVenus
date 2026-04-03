import Link from "next/link";
import Image from "next/image";
import { musicData } from "@/content/data/music.data";
import { assetMap } from "@/content/data/site.config";

export default function MusicPage() {
  const featured = musicData.releases.find((release) => release.id === musicData.featuredReleaseId) ?? musicData.releases[0];
  const selectedReleases = [...musicData.releases]
    .sort((a, b) => a.priority - b.priority)
    .filter((release) => release.id !== featured.id);
  const leadSecondary = selectedReleases[0];
  const followUpReleases = selectedReleases.slice(1);

  const featuredAsset = assetMap[featured.coverAsset.id] ?? (featured.alternateVisualAsset ? assetMap[featured.alternateVisualAsset.id] : undefined);

  return (
    <section className="space-y-10">
      <header className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{musicData.intro.label}</p>
          <h1 className="font-display text-3xl font-semibold md:text-4xl">{musicData.intro.headline}</h1>
          <p className="max-w-xl text-sm text-muted md:text-base">{musicData.intro.subhead}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Featured Release · {featured.title}</p>
        </div>

        {featuredAsset ? (
          <Image
            src={featuredAsset.src}
            alt={featuredAsset.alt ?? featured.title}
            width={1200}
            height={1500}
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="h-72 w-full rounded-md object-cover"
          />
        ) : null}

        <div>
          <Link href={featured.primaryCta.href} className="first-impression-cta">
            {featured.primaryCta.label}
          </Link>
        </div>
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
            return (
              <li key={release.id} id={release.id} className="space-y-2 rounded-lg border border-white/10 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{release.status}</p>
                <h3 className="font-display text-xl">{release.title}</h3>
                <p className="text-sm text-muted">{release.shortText}</p>
                <Link href={release.primaryCta.href} className="first-impression-cta">
                  {release.primaryCta.label}
                </Link>
              </li>
            );
          })() : null}
          <ul className="grid gap-3 md:grid-cols-2">
            {followUpReleases.map((release) => {
              const releaseAsset = assetMap[release.coverAsset.id];
              return (
                <li key={release.id} id={release.id} className="space-y-3 rounded-lg border border-white/10 p-4">
                  {releaseAsset ? (
                    <Image
                      src={releaseAsset.src}
                      alt={releaseAsset.alt ?? release.title}
                      width={900}
                      height={900}
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="h-40 w-full rounded-md object-cover"
                    />
                  ) : null}
                  <h3 className="font-display text-lg">{release.title}</h3>
                  <p className="text-sm text-muted">{release.shortText}</p>
                  <Link href={release.primaryCta.href} className="first-impression-cta">
                    {release.primaryCta.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="visual-releases" className="space-y-3">
        <h2 className="font-display text-2xl font-semibold">Visual Releases</h2>
        <ul className="space-y-3">
          {musicData.visualReleases.map((release) => {
            const releaseAsset = assetMap[release.coverAsset.id];
            const watchAction = release.watchLinks?.[0];
            const secondaryAction = release.secondaryCta ?? (!watchAction ? release.primaryCta : undefined);
            const primaryWatchLabel = watchAction
              ? watchAction.label.toLowerCase().includes("watch")
                ? watchAction.label
                : `Watch ${release.title}`
              : null;
            const secondaryLabel = secondaryAction
              ? secondaryAction.label === "Open"
                ? `Open ${release.title}`
                : secondaryAction.label
              : null;

            return (
              <li key={release.id} className="rounded-lg border border-white/10 p-4">
                <article className="space-y-3" aria-labelledby={`${release.id}-title`}>
                  {watchAction && releaseAsset ? (
                    <Image
                      src={releaseAsset.src}
                      alt={releaseAsset.alt ?? `${release.title} visual still`}
                      width={1200}
                      height={675}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="h-44 w-full rounded-md object-cover"
                    />
                  ) : null}
                  <h3 id={`${release.id}-title`} className="font-display text-xl">
                    {release.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {watchAction && primaryWatchLabel ? (
                      <Link href={watchAction.href} className="first-impression-cta">
                        {primaryWatchLabel}
                      </Link>
                    ) : null}
                    {secondaryAction && secondaryLabel ? (
                      <Link href={secondaryAction.href} className={watchAction ? "text-sm text-muted underline-offset-4 hover:underline" : "first-impression-cta"}>
                        {secondaryLabel}
                      </Link>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted">
                    Asset hints: {releaseAsset?.cropHint} · {releaseAsset?.focusHint}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
}
