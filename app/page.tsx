import Link from "next/link";
import Image from "next/image";
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
  const featuredReleaseModule = homepageCoreModules.find((module) => module.id === "featuredRelease");
  const visualsModule = homepageCoreModules.find((module) => module.id === "visuals");
  const statementModule = homepageCoreModules.find((module) => module.id === "statement");
  const pressModule = homepageCoreModules.find((module) => module.id === "press");
  const contactNewsletterModule = homepageCoreModules.find((module) => module.id === "contactNewsletter");

  const leadAsset = leadModule?.assetId ? assetMap[leadModule.assetId] : undefined;
  const supportAsset = supportModule?.assetId ? assetMap[supportModule.assetId] : undefined;
  const featuredReleaseAsset = featuredReleaseModule?.assetId ? assetMap[featuredReleaseModule.assetId] : undefined;
  const visualsAsset = visualsModule?.assetId ? assetMap[visualsModule.assetId] : undefined;
  const pressAsset = pressModule?.assetId ? assetMap[pressModule.assetId] : undefined;
  const supportCta = supportModule?.copy.cta;

  const leadMediaClass = [
    "h-[28rem] w-full rounded-lg object-cover",
    leadAsset?.swColorMode !== "n/a" ? "grayscale saturate-0" : "",
    leadAsset?.overlaySuitability === "supports-dark-overlay" ? "brightness-90 contrast-125" : "brightness-95 contrast-110"
  ]
    .filter(Boolean)
    .join(" ");
  const leadOverlayVariant =
    leadAsset?.overlaySuitability === "supports-dark-overlay" && leadAsset?.swColorMode !== "limited" ? "balanced" : "strong";
  const leadOverlayClass = [
    "absolute inset-x-3 bottom-3 rounded-md p-4 text-white backdrop-blur-sm",
    leadOverlayVariant === "strong"
      ? "bg-gradient-to-t from-black/90 via-black/75 to-black/45"
      : "bg-gradient-to-t from-black/75 via-black/55 to-black/30"
  ]
    .filter(Boolean)
    .join(" ");
  const leadHeadlineClass =
    leadOverlayVariant === "strong" ? "font-display text-3xl font-bold leading-tight text-white md:text-4xl" : "font-display text-3xl font-bold leading-tight text-white/95 md:text-4xl";
  const leadDescriptorClass = leadOverlayVariant === "strong" ? "text-sm uppercase tracking-wide text-white/90" : "text-sm uppercase tracking-wide text-white/80";
  const leadStatementClass = leadOverlayVariant === "strong" ? "mt-2 text-sm leading-snug text-white/95" : "mt-2 text-sm leading-snug text-white/90";

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
            <Image
              src={leadAsset.src}
              alt={leadAsset.alt ?? leadModule?.alt ?? ""}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className={leadMediaClass}
            />
          ) : null}
          <div className={leadOverlayClass}>
            <h1 id="home-title" className={leadHeadlineClass}>
              {siteConfig.name}
            </h1>
            <p className={leadDescriptorClass}>{siteConfig.brandDescriptor}</p>
            <p className={leadStatementClass}>{homepageIntro.statement}</p>
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
                  <Image
                    src={supportAsset.src}
                    alt={supportAsset.alt ?? supportModule.alt ?? ""}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={supportMediaClass}
                  />
                ) : null}
                <span className="first-impression-cta">{supportCta.label}</span>
              </Link>
            ) : (
              <article className="first-impression-tile space-y-3 rounded-lg p-3">
                <h2 className="font-display text-xl font-semibold">{supportModule.copy.headline}</h2>
                {supportModule.copy.subline ? <p className="text-sm text-muted">{supportModule.copy.subline}</p> : null}
                {supportAsset ? (
                  <Image
                    src={supportAsset.src}
                    alt={supportAsset.alt ?? supportModule.alt ?? ""}
                    width={1200}
                    height={800}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={supportMediaClass}
                  />
                ) : null}
              </article>
            )
          ) : null}
        </aside>
      </div>

      <section aria-labelledby="featured-release-title" className="mt-16 rounded-lg border border-white/10 bg-surface/60 p-6 md:mt-20">
        <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-center">
          {featuredReleaseAsset ? (
            <Image
              src={featuredReleaseAsset.src}
              alt={featuredReleaseAsset.alt ?? featuredReleaseModule?.alt ?? ""}
              width={1400}
              height={900}
              sizes="(max-width: 768px) 100vw, 66vw"
              className="h-64 w-full rounded-md object-cover"
            />
          ) : null}
          <div className="space-y-3">
            <h2 id="featured-release-title" className="font-display text-2xl font-semibold">
              {featuredReleaseModule?.copy.headline}
            </h2>
            {featuredReleaseModule?.copy.subline ? <p className="text-sm text-muted">{featuredReleaseModule.copy.subline}</p> : null}
            {featuredReleaseModule?.copy.cta ? (
              <Link href={featuredReleaseModule.copy.cta.href} className="first-impression-cta">
                {featuredReleaseModule.copy.cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="visual-story-title" className="mt-24 grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-end">
        {visualsAsset ? (
          <Image
            src={visualsAsset.src}
            alt={visualsAsset.alt ?? visualsModule?.alt ?? ""}
            width={1400}
            height={900}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="h-72 w-full rounded-lg object-cover"
          />
        ) : null}
        <article className="rounded-lg border border-white/10 bg-surface/70 p-5">
          <h2 id="visual-story-title" className="font-display text-2xl font-semibold">
            {visualsModule?.copy.headline}
          </h2>
          {visualsModule?.copy.subline ? <p className="mt-2 text-sm text-muted">{visualsModule.copy.subline}</p> : null}
          {visualsModule?.copy.cta ? (
            <Link href={visualsModule.copy.cta.href} className="mt-4 inline-block first-impression-cta">
              {visualsModule.copy.cta.label}
            </Link>
          ) : null}
        </article>
      </section>

      <section aria-labelledby="statement-title" className="mt-20 rounded-md border-l-2 border-white/20 pl-5 md:mt-24 md:pl-8">
        <h2 id="statement-title" className="font-display text-2xl font-semibold text-white/90">
          {statementModule?.copy.headline}
        </h2>
      </section>

      <section aria-labelledby="press-epk-title" className="mt-16 rounded-lg border border-white/10 bg-surface/50 p-6 md:mt-20">
        <div className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center">
          <article className="space-y-3">
            <h2 id="press-epk-title" className="font-display text-2xl font-semibold">
              {pressModule?.copy.headline}
            </h2>
            {pressModule?.copy.subline ? <p className="text-sm text-muted">{pressModule.copy.subline}</p> : null}
            {pressModule?.copy.cta ? (
              <Link href={pressModule.copy.cta.href} className="first-impression-cta">
                {pressModule.copy.cta.label}
              </Link>
            ) : null}
          </article>
          {pressAsset ? (
            <Image
              src={pressAsset.src}
              alt={pressAsset.alt ?? pressModule?.alt ?? ""}
              width={1200}
              height={800}
              sizes="(max-width: 768px) 100vw, 60vw"
              className="h-52 w-full rounded-md object-cover"
            />
          ) : null}
        </div>
      </section>

      <section
        aria-labelledby="contact-newsletter-title"
        className="mt-24 rounded-t-xl border-t border-white/10 bg-gradient-to-b from-transparent via-surface/50 to-surface/70 px-6 pb-14 pt-12"
      >
        <h2 id="contact-newsletter-title" className="font-display text-2xl font-semibold">
          {contactNewsletterModule?.copy.headline}
        </h2>
        {contactNewsletterModule?.copy.subline ? <p className="mt-2 text-sm text-muted">{contactNewsletterModule.copy.subline}</p> : null}
        {contactNewsletterModule?.copy.cta ? (
          <Link href={contactNewsletterModule.copy.cta.href} className="mt-4 inline-block first-impression-cta">
            {contactNewsletterModule.copy.cta.label}
          </Link>
        ) : null}
      </section>
    </section>
  );
}
