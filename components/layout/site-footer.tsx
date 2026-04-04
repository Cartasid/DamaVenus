import Link from "next/link";
import { siteConfig } from "@/content/data/site.config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-6 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} {siteConfig.footerLine}</span>
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
