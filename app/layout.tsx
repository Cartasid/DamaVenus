import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import ScrollRevealProvider from "@/components/utils/scroll-reveal-provider";
import ScrollProgress from "@/components/utils/scroll-progress";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant"
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
  keywords: [
    "Dama Venus",
    "Brazilian artist",
    "alternative pop",
    "trap pop",
    "R&B",
    "vaporwave",
    "music",
    "Rio de Janeiro",
    "Europe",
    "fashion artist",
    "visual artist",
    "Valentines",
    "Eclipse Bossanova",
    "Blue Cinderella"
  ],
  authors: [{ name: "Dama Venus" }],
  creator: "Dama Venus",
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    title: metadataTitle.default,
    description: metadataDescription,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Dama Venus — Artist" }]
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Dama Venus",
  description: metadataDescription,
  url: siteUrl,
  genre: ["Alternative Pop", "Trap Pop", "R&B", "Vaporwave"],
  foundingLocation: {
    "@type": "Place",
    name: "Rio de Janeiro, Brazil"
  },
  image: `${siteUrl}/og-default.png`,
  sameAs: [
    "https://open.spotify.com/artist/damavenus",
    "https://www.instagram.com/damavenus",
    "https://www.youtube.com/@damavenus"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable} min-h-screen flex flex-col`}>
        <noscript>
          <style>{".reveal,.reveal-fade{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <ScrollProgress />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 min-w-0">
          <ScrollRevealProvider>{children}</ScrollRevealProvider>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
