"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import SiteHeader from "@/components/layout/site-header";
import AmbientHoverBackground from "@/components/utils/ambient-hover-background";
import ScrollProgress from "@/components/utils/scroll-progress";
import CustomCursor from "@/components/utils/custom-cursor";

export default function SitePresentation({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  const isFyc = usePathname() === "/fyc";

  return (
    <div className={`site-shell${isFyc ? " site-shell--fyc" : ""}`}>
      {!isFyc && <><AmbientHoverBackground /><ScrollProgress /><CustomCursor /></>}
      <a href="#main-content" className="skip-link">Skip to content</a>
      <SiteHeader />
      {children}
      {isFyc ? (
        <footer className="fyc-footer">
          <p>© {new Date().getFullYear()} Dama Venus Productions</p>
          <nav aria-label="Legal"><Link href="/privacy">Privacy</Link><Link href="/imprint">Imprint</Link></nav>
        </footer>
      ) : footer}
    </div>
  );
}
