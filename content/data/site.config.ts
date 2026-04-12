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
  /** Primary site language for UI, metadata, and document language attributes. */
  primaryLanguage: "en",
  language: "en",
  url: resolveSiteUrl(),
  metadata: {
    title: "Dáma Venus | Official Website | Visual Author & Actress",
    description: "Explore the cinematic world of Dáma Venus. Berlin-based artist, producer, and Miss Americas. New album launching June 12th."
  },
  brandDescriptor: "Sound • Vision • Reign",
  footerLine: "Dama Venus — Sound. Vision. Reign."
} as const;

export const assetMap: Record<string, AssetMapItem> = Object.fromEntries(
  prioritizedAssets.map((asset) => [
    asset.id,
    {
      src: asset.finalPath,
      alt: asset.altDraft,
      cropHint: asset.cropHint,
      focusHint: asset.focusHint,
      priority: asset.priority,
      swColorMode: asset.swColorMode,
      overlaySuitability: asset.overlaySuitability,
      role: asset.role,
      copyKey: asset.copyKey
    }
  ])
);
