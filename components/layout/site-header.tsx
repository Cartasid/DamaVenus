import Link from "next/link";
import { navigationItems } from "@/content/data/navigation.data";
import { siteConfig } from "@/content/data/site.config";

export default function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-surface/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold tracking-wide no-underline">
          {siteConfig.name}
        </Link>
        <nav aria-label="Primary Navigation" className="flex items-center gap-4 text-sm text-muted">
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
