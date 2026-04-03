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
  const leadCta = leadModule?.copy.cta;
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
    supportAsset?.swColorMode === "excellent"
      ? "grayscale-[30%] saturate-110"
      : supportAsset?.swColorMode === "good"
        ? "grayscale-[20%] saturate-105"
        : "grayscale-[10%]",
    supportAsset?.overlaySuitability === "no-overlay" ? "contrast-105" : "contrast-110"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section aria-labelledby="home-title" className="home-composition space-y-8">
      <nav aria-label="Home Orientierung" className="border-b border-white/10 pb-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="interactive-hint">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-start">
        <article className="space-y-3">
          <h1 id="home-title" className="font-display text-4xl font-bold">
            {siteConfig.name}
          </h1>
          {leadAsset ? (
            <img src={leadAsset.src} alt={leadAsset.alt ?? leadModule?.alt ?? ""} className={leadMediaClass} />
          ) : null}
          {leadModule ? (
            leadCta ? (
              <Link href={leadCta.href} className="first-impression-tile block min-h-11 space-y-3 rounded-lg p-3">
                <p className="text-muted">
                  {leadModule.copy.headline}
                  {leadModule.copy.subline ? ` — ${leadModule.copy.subline}` : ""}
                </p>
                <span className="first-impression-cta">{leadCta.label}</span>
              </Link>
            ) : (
              <p className="text-muted">
                {leadModule.copy.headline}
                {leadModule.copy.subline ? ` — ${leadModule.copy.subline}` : ""}
              </p>
            )
          ) : null}
        </article>

        <aside className="space-y-6">
          <p className="text-lg leading-tight">{homepageIntro.statement}</p>

          {supportModule ? (
            supportCta ? (
              <Link href={supportCta.href} className="first-impression-tile block min-h-11 space-y-3 rounded-lg p-3">
                <h2 className="font-display text-2xl font-semibold">{supportModule.copy.headline}</h2>
                {supportModule.copy.subline ? <p className="text-muted">{supportModule.copy.subline}</p> : null}
                <span className="first-impression-cta">{supportCta.label}</span>
                {supportAsset ? (
                  <img src={supportAsset.src} alt={supportAsset.alt ?? supportModule.alt} className={supportMediaClass} />
                ) : null}
              </Link>
            ) : (
              <article className="space-y-3">
                <h2 className="font-display text-2xl font-semibold">{supportModule.copy.headline}</h2>
                {supportModule.copy.subline ? <p className="text-muted">{supportModule.copy.subline}</p> : null}
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
