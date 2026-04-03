import Link from "next/link";
import { homepageCoreModules, homepageIntro } from "@/content/data/homepage.data";
import { navigationItems } from "@/content/data/navigation.data";
import { assetMap, siteConfig } from "@/content/data/site.config";

export default function HomePage() {
  const leadModule =
    homepageCoreModules.find((module) => module.id === "lead") ??
    homepageCoreModules.find((module) => module.id === "visuals") ??
    homepageCoreModules.find((module) => module.id === "featuredRelease") ??
    homepageCoreModules.find((module) => Boolean(module.assetId));
  const supportModule =
    homepageCoreModules.find((module) => module.id === "featuredRelease" && module.id !== leadModule?.id) ??
    homepageCoreModules.find((module) => module.id !== leadModule?.id && Boolean(module.assetId));

  const leadAsset = leadModule?.assetId ? assetMap[leadModule.assetId] : undefined;
  const supportAsset = supportModule?.assetId ? assetMap[supportModule.assetId] : undefined;
  const supportCta = supportModule?.copy.cta;

  const leadMediaClass = [
    "h-[28rem] w-full rounded-lg object-cover",
    leadAsset?.swColorMode !== "n/a" ? "grayscale saturate-0" : "",
    leadAsset?.overlaySuitability === "supports-dark-overlay" ? "brightness-90 contrast-125" : "brightness-95 contrast-110"
  ]
    .filter(Boolean)
    .join(" ");

  const supportMediaClass = [
    "h-48 w-full rounded-md object-cover transition duration-300",
    supportModule?.id === "featuredRelease"
      ? ""
      : supportAsset?.swColorMode === "excellent"
        ? "grayscale-[30%] saturate-110"
        : supportAsset?.swColorMode === "good"
          ? "grayscale-[20%] saturate-105"
          : "grayscale-[10%]",
    supportAsset?.overlaySuitability === "no-overlay" ? "contrast-105" : "contrast-110"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-labelledby="home-title" className="home-composition">
      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
        <article className="relative">
          {leadAsset ? (
            <img src={leadAsset.src} alt={leadAsset.alt ?? leadModule?.alt ?? ""} className={leadMediaClass} />
          ) : null}
          <div className="absolute inset-x-3 bottom-3 rounded-md bg-black/65 p-4 text-white backdrop-blur-sm">
            <h1 id="home-title" className="font-display text-3xl font-bold leading-tight md:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="text-sm uppercase tracking-wide text-white/80">{siteConfig.brandDescriptor}</p>
            <p className="mt-2 text-sm leading-snug text-white/90">{homepageIntro.statement}</p>
          </div>
        </article>

        <aside className="space-y-4">
          <nav aria-label="Home Orientierung" className="first-impression-tile rounded-lg p-3">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="interactive-hint">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {supportModule ? (
            supportCta ? (
              <Link href={supportCta.href} className="first-impression-tile block min-h-11 space-y-3 rounded-lg p-3">
                <h2 className="font-display text-xl font-semibold">{supportModule.copy.headline}</h2>
                {supportModule.copy.subline ? <p className="text-sm text-muted">{supportModule.copy.subline}</p> : null}
                {supportAsset ? (
                  <img src={supportAsset.src} alt={supportAsset.alt ?? supportModule.alt} className={supportMediaClass} />
                ) : null}
                <span className="first-impression-cta">{supportCta.label}</span>
              </Link>
            ) : (
              <article className="first-impression-tile space-y-3 rounded-lg p-3">
                <h2 className="font-display text-xl font-semibold">{supportModule.copy.headline}</h2>
                {supportModule.copy.subline ? <p className="text-sm text-muted">{supportModule.copy.subline}</p> : null}
                {supportAsset ? (
                  <img src={supportAsset.src} alt={supportAsset.alt ?? supportModule.alt} className={supportMediaClass} />
                ) : null}
              </article>
            )
          ) : null}
        </aside>
      </div>
    </section>
  );
}
