import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import ScrollRevealProvider from "@/components/utils/scroll-reveal-provider";
import { resolveSiteUrl, siteConfig } from "@/content/data/site.config";

const siteUrl = resolveSiteUrl();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk"
});

const metadataTitle = {
  default: siteConfig.metadata.title,
  template: `%s | ${siteConfig.name}`
};

const metadataDescription = siteConfig.metadata.description;

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    title: metadataTitle.default,
    description: metadataDescription,
    images: [{ url: "/og-default.png" }]
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle.default,
    description: metadataDescription,
    images: ["/og-default.png"]
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen flex flex-col`}>
        <noscript>
          <style>{".reveal,.reveal-fade{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="site-container flex-1 py-10">
          <ScrollRevealProvider>{children}</ScrollRevealProvider>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
