import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import { siteConfig } from "@/content/data/site.config";

const metadataTitle = {
  default: siteConfig.metadata.title,
  template: `%s | ${siteConfig.name}`
};

const metadataDescription = siteConfig.metadata.description;

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    title: metadataTitle.default,
    description: metadataDescription,
    images: [{ url: "/og-default.svg" }]
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle.default,
    description: metadataDescription,
    images: ["/og-default.svg"]
  },
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-icon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
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
