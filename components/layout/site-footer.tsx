import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";

export default function SiteFooter() {
  const tagline = siteConfig.footerLine.split("—")[1]?.trim();

  return (
    <footer className="border-t border-white/10">
      <div className="site-container flex w-full flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span className="font-display text-xs uppercase tracking-widest text-muted/60">
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        {tagline ? (
          <span className="hidden text-xs italic tracking-wide text-muted/40 md:block">
            {tagline}
          </span>
        ) : null}
        <nav aria-label="Legal" className="flex items-center gap-4">
          <Link href="/privacy" className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
            Privacy
          </Link>
          <Link href="/imprint" className="underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
            Imprint
          </Link>
        </nav>
      </div>
    </footer>
  );
}
