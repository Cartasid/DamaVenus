import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Syne, Bodoni_Moda, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import ScrollRevealProvider from "@/components/utils/scroll-reveal-provider";
import ScrollProgress from "@/components/utils/scroll-progress";
import CustomCursor from "@/components/utils/custom-cursor";
import ImageLightbox from "@/components/utils/image-lightbox";
import ImageLoadObserver from "@/components/utils/image-load-observer";
import { resolveSiteUrl, siteConfig } from "@/content/data/site.config";

const siteUrl = resolveSiteUrl();

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne"
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-bodoni"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-montserrat"
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
    "Dáma Venus",
    "Dama Venus",
    "Visual Author",
    "international actress",
    "producer",
    "Miss Americas",
    "Berlin artist",
    "Brazilian artist",
    "alternative pop",
    "synth-pop",
    "cinematic music",
    "music",
    "Rio de Janeiro",
    "Europe",
    "fashion artist",
    "visual artist",
    "after-dark architecture",
    "Recording Academy",
    "GRAMMYs",
    "Berlin Künstlerin",
    "Amsterdam",
    "London",
    "trap-pop",
    "R&B",
    "vaporwave",
    "cinematic visualizer",
    "music video",
    "EPK",
    "press kit"
  ],
  authors: [{ name: "Dáma Venus" }],
  creator: "Dáma Venus",
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
  },
  other: {
    "theme-color": "#000000"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Dáma Venus",
  description: metadataDescription,
  url: siteUrl,
  genre: ["Alternative Pop", "Trap Pop", "R&B", "Vaporwave"],
  foundingLocation: {
    "@type": "Place",
    name: "Rio de Janeiro, Brazil"
  },
  location: {
    "@type": "Place",
    name: "Berlin, Germany"
  },
  image: `${siteUrl}/og-default.png`,
  sameAs: [
    "https://open.spotify.com/artist/damavenus",
    "https://www.instagram.com/damavenus",
    "https://www.youtube.com/@damavenus",
    "https://www.linkedin.com/in/damavenus",
    "https://www.filmmakers.eu/damavenus"
  ],
  member: {
    "@type": "Person",
    name: "Dáma Venus",
    nationality: "Brazilian",
    jobTitle: "Visual Author, International Actress, Producer"
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://open.spotify.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${syne.variable} ${bodoni.variable} ${cormorant.variable} ${montserrat.variable} min-h-screen flex flex-col`}>
        <noscript>
          <style>{".reveal,.reveal-fade{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <ScrollProgress />
        <CustomCursor />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1 min-w-0">
          <ScrollRevealProvider>{children}</ScrollRevealProvider>
        </main>
        <SiteFooter />
        <ImageLightbox />
        <ImageLoadObserver />
      </body>
    </html>
  );
}
