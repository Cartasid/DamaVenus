import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { siteConfig } from "@/content/data/site.config";

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main id="main-content" className="mx-auto w-full max-w-[1440px] flex-1 px-5 py-10 md:px-10 xl:px-16">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
