import Link from "next/link";
import { homepageCoreModules, homepageIntro } from "@/content/data/homepage.data";
import { navigationItems } from "@/content/data/navigation.data";
import { assetMap, siteConfig } from "@/content/data/site.config";

export default function HomePage() {
  const leadModule =
    homepageCoreModules.find((module) => module.id === "featuredRelease") ??
    homepageCoreModules.find((module) => Boolean(module.assetId));
  const supportModule =
    homepageCoreModules.find((module) => module.id === "visuals") ??
    homepageCoreModules.find((module) => module.id !== leadModule?.id && Boolean(module.assetId));

  const leadAsset = leadModule?.assetId ? assetMap[leadModule.assetId] : undefined;
  const supportAsset = supportModule?.assetId ? assetMap[supportModule.assetId] : undefined;

  return (
    <section aria-labelledby="home-title" className="space-y-8">
      <nav aria-label="Home Orientierung" className="border-b border-white/10 pb-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {navigationItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
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
            <img
              src={leadAsset.src}
              alt={leadAsset.alt ?? leadModule?.alt ?? ""}
              className="h-[28rem] w-full rounded-lg object-cover"
            />
          ) : null}
          {leadModule ? (
            <p className="text-muted">
              {leadModule.copy.headline}
              {leadModule.copy.subline ? ` — ${leadModule.copy.subline}` : ""}
            </p>
          ) : null}
        </article>

        <aside className="space-y-6">
          <p className="text-lg leading-tight">{homepageIntro.statement}</p>

          {supportModule ? (
            <article className="space-y-3">
              <h2 className="font-display text-2xl font-semibold">{supportModule.copy.headline}</h2>
              {supportModule.copy.subline ? <p className="text-muted">{supportModule.copy.subline}</p> : null}
              {supportAsset ? (
                <img
                  src={supportAsset.src}
                  alt={supportAsset.alt ?? supportModule.alt}
                  className="h-48 w-full rounded-md object-cover"
                />
              ) : null}
            </article>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
