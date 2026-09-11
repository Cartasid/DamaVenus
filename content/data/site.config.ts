import type { AssetMapItem } from "@/lib/types";
import { prioritizedAssets } from "@/content/dama-venus/assets";

const SITE_URL_FALLBACK = "https://damavenus.eu";

export function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!envUrl) {
    return SITE_URL_FALLBACK;
  }

  try {
    return new URL(envUrl).toString().replace(/\/$/, "");
  } catch {
    return SITE_URL_FALLBACK;
  }
}

export const siteConfig = {
  name: "Dama Venus",
  primaryLanguage: "en",
  language: "en",
  url: resolveSiteUrl(),
  metadata: {
    title: "Dáma Venus | Official Website | Singer, Visual Author & Actress",
    description:
      "Official platform for Dáma Venus — Berlin-based singer, songwriter, visual author, producer, and actress. Official releases, cinematic visuals, press materials, and bookings."
  },
  brandDescriptor: "Sound • Vision • Reign",
  footerLine: "Dama Venus — Sound. Vision. Reign."
} as const;

const assetObjectPositions: Record<string, string> = {
  "home-lead-portrait": "center 25%",
  "home-release-cover": "center center",
  "home-visual-preview": "center 42%",
  "home-statement-editorial": "center 20%",
  "home-contact-newsletter": "center center",
  "home-press-preview": "center 20%",

  "music-current-chapter-cover": "60% center",
  "music-current-chapter-visual": "center center",
  "music-midnight-signal-cover": "center 30%",
  "music-afterglow-cut-cover": "center center",
  "music-nocturne-line-visual": "center center",

  "visuals-cinderela-lead-241": "center 25%",
  "visuals-night-portrait-0e9128": "center 65%",
  "contact-red-portrait-69bf": "center 30%",
  "visuals-cinderela-frame-243": "center 30%",
  "visuals-cinderela-frame-288": "center 35%",
  "visuals-cinderela-landscape-210": "center center",
  "visuals-uuid-6824": "center center",
  "visuals-uuid-3493": "center 30%",
  "visuals-portrait-tamiris-12": "center 25%",
  "visuals-still-unnamed-1": "center center",
  "visuals-still-unnamed-2": "center center",
  "visuals-still-unnamed-3": "center center",
  "visuals-linked-current-chapter": "center center",

  "about-intro-entry-portrait-primary": "center 25%",
  "about-intro-entry-portrait-secondary": "center 30%",
  "about-supporting-visual-calm-01": "center center",
  "about-supporting-visual-calm-02": "center 25%",
  "about-supporting-visual-calm-reserve-03": "center 30%",

  "press-featured-portrait-primary": "center 20%",
  "press-featured-portrait-secondary": "center 30%",
  "press-editorial-landscape": "center center",
  "press-detail-still": "center center",
  "contact-mood-canvas": "center center",
  "curated-contact-mood-canvas": "center center",
  "curated-release-cover": "center center"
};

// Historical asset IDs remain stable to avoid breaking generated files and
// references, while public alt text follows the current release/content model.
const assetAltOverrides: Record<string, string> = {
  "home-release-cover": "Dáma Venus — Lonely Berlin release visual",
  "home-visual-preview": "Dáma Venus — musical worlds connecting art and visuals",
  "music-current-chapter-cover": "Lonely Berlin — official release visual by Dáma Venus",
  "music-current-chapter-visual": "Lonely Berlin — visual frame by Dáma Venus",
  "music-midnight-signal-cover": "Valentines — official release visual by Dáma Venus",
  "music-afterglow-cut-cover": "Eclipse — official release visual by Dáma Venus",
  "music-nocturne-line-visual": "Close Friend — official release visual by Dáma Venus",
  "visuals-linked-current-chapter": "Lonely Berlin — linked visual by Dáma Venus"
};

export const assetMap: Record<string, AssetMapItem> = Object.fromEntries(
  prioritizedAssets.map((asset) => [
    asset.id,
    {
      src: asset.finalPath,
      alt: assetAltOverrides[asset.id] ?? asset.altDraft,
      cropHint: asset.cropHint,
      focusHint: asset.focusHint,
      priority: asset.priority,
      swColorMode: asset.swColorMode,
      overlaySuitability: asset.overlaySuitability,
      role: asset.role,
      copyKey: asset.copyKey,
      objectPosition: assetObjectPositions[asset.id] ?? "center center"
    }
  ])
);
