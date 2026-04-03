import {
  homepageIntro,
  homepageModules
} from "@/content/data/homepage.data";
import { assetMap, siteConfig } from "@/content/data/site.config";

export default function HomePage() {
  const resolvedModules = homepageModules.map((module) => ({
    ...module,
    asset: "asset" in module ? assetMap[module.asset.id] : undefined
  }));

  return (
    <section aria-labelledby="home-title" className="space-y-8">
      <div className="space-y-3">
        <h1 id="home-title" className="font-display text-4xl font-bold">
          {siteConfig.name}
        </h1>
        <p className="text-muted">{siteConfig.brandDescriptor}</p>
        <p className="text-lg">{homepageIntro.statement}</p>
      </div>

      {resolvedModules.map((module) => {
        if (module.type === "release") {
          return (
            <div key={module.id} className="space-y-2">
              <h2 className="font-display text-2xl font-semibold">{module.title}</h2>
              <p className="text-muted">{module.description}</p>
              {module.asset ? (
                <img
                  src={module.asset.src}
                  alt={module.asset.alt ?? ""}
                  className="h-48 w-full rounded-md object-cover"
                />
              ) : null}
              <p className="text-xs text-muted">
                {module.asset?.overlayOrTransparencyNote ?? "No overlay note"}
              </p>
              <p className="text-xs text-muted">
                {module.asset?.bwColorSuitability ?? "No BW/color hint"}
              </p>
            </div>
          );
        }

        return (
          <div key={module.id} className="space-y-2">
            <h2 className="font-display text-2xl font-semibold">{module.headline}</h2>
            {module.subhead ? <p className="text-muted">{module.subhead}</p> : null}
            {module.asset ? (
              <>
                <img
                  src={module.asset.src}
                  alt={module.asset.alt ?? ""}
                  className="h-48 w-full rounded-md object-cover"
                />
                <p className="text-xs text-muted">
                  {module.asset.overlayOrTransparencyNote ?? "No overlay note"}
                </p>
                <p className="text-xs text-muted">
                  {module.asset.bwColorSuitability ?? "No BW/color hint"}
                </p>
              </>
            ) : null}
            {"body" in module && module.body ? (
              <ul className="list-inside list-disc text-muted">
                {module.body.map((service) => <li key={service}>{service}</li>)}
              </ul>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
