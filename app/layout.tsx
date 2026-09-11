import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import "./globals.css";
import "./premium-polish.css";
import SiteFooter from "@/components/layout/site-footer";
import SiteHeader from "@/components/layout/site-header";
import ScrollRevealProvider from "@/components/utils/scroll-reveal-provider";
import ScrollProgress from "@/components/utils/scroll-progress";
import CustomCursor from "@/components/utils/custom-cursor";
import ImageLightbox from "@/components/utils/image-lightbox";
import ImageLoadObserver from "@/components/utils/image-load-observer";
import { resolveSiteUrl, siteConfig } from "@/content/data/site.config";
import { artistSameAs } from "@/content/data/official-links";

const siteUrl = resolveSiteUrl();

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap"
});

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap"
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
    "Berlin artist",
    "Brazilian artist",
    "alternative pop",
    "trap-pop",
    "R&B",
    "vaporwave",
    "cinematic music",
    "Lonely Berlin",
    "Eclipse",
    "Valentines",
    "Close Friend",
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
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Dáma Venus — Artist"
      }
    ]
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

const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteConfig.name,
      url: siteUrl,
      description: metadataDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#artist` }
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#artist`,
      name: "Dáma Venus",
      alternateName: ["Dama Venus", "Tamiris Dama Venus"],
      description: metadataDescription,
      url: siteUrl,
      nationality: {
        "@type": "Country",
        name: "Brazil"
      },
      jobTitle: [
        "Singer",
        "Songwriter",
        "Visual Author",
        "International Actress",
        "Producer"
      ],
      knowsLanguage: ["en", "pt", "de"],
      image: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-default.png`,
        width: 1200,
        height: 630
      },
      sameAs: artistSameAs
    }
  ]
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body
        className={`${bodoni.variable} ${montserrat.variable} premium-site min-h-screen flex flex-col`}
      >
        <noscript>
          <style>
            {
              ".reveal,.reveal-fade{opacity:1!important;transform:none!important}img[loading='lazy']{opacity:1!important}"
            }
          </style>
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
