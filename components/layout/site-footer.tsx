import { siteConfig } from "@/content/data/site.config";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="site-container py-6 text-sm text-muted">
        © {new Date().getFullYear()} {siteConfig.footerLine}
      </div>
    </footer>
  );
}
