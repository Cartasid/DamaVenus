import {
  homepageIntro,
  homepageRelease,
  homepageServices,
  homepageStatement,
  homepageVisuals
} from "@/content/data/homepage.data";
import { assetMap, siteConfig } from "@/content/data/site.config";

export default function HomePage() {
  const releaseCover = assetMap[homepageRelease.coverAsset.id];
  const visualsPreview = homepageVisuals.asset ? assetMap[homepageVisuals.asset.id] : undefined;

  return (
    <section aria-labelledby="home-title" className="space-y-8">
      <div className="space-y-3">
        <h1 id="home-title" className="font-display text-4xl font-bold">
          {siteConfig.name}
        </h1>
        <p className="text-muted">{siteConfig.brandDescriptor}</p>
        <p className="text-lg">{homepageIntro.statement}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold">{homepageRelease.title}</h2>
        <p className="text-muted">{homepageRelease.description}</p>
        <p className="text-xs text-muted">Asset: {releaseCover?.src}</p>
      </div>

      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold">{homepageVisuals.headline}</h2>
        <p className="text-muted">{homepageVisuals.subhead}</p>
        <p className="text-xs text-muted">Asset: {visualsPreview?.src}</p>
      </div>

      <p className="font-display text-xl">{homepageStatement.headline}</p>

      <div className="space-y-2">
        <h2 className="font-display text-2xl font-semibold">{homepageServices.headline}</h2>
        <p className="text-muted">{homepageServices.subhead}</p>
        <ul className="list-inside list-disc text-muted">
          {homepageServices.body?.map((service) => <li key={service}>{service}</li>)}
        </ul>
      </div>
    </section>
  );
}
