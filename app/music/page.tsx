import { featuredRelease, musicHero } from "@/content/data/music.data";
import { assetMap } from "@/content/data/site.config";

export default function MusicPage() {
  const cover = assetMap[featuredRelease.coverAsset.id];

  return (
    <section className="space-y-3">
      <h1 className="font-display text-3xl font-bold">{musicHero.headline}</h1>
      <p className="text-muted">{musicHero.subhead}</p>
      <p className="text-xs text-muted">Asset: {cover?.src}</p>
    </section>
  );
}
