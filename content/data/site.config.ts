import type { AssetMapItem } from "@/lib/types";
import { prioritizedAssets } from "@/content/dama-venus/assets";

export const siteConfig = {
  name: "Dama Venus",
  /** Primary site language for UI, metadata, and document language attributes. */
  primaryLanguage: "en",
  language: "en",
  url: "https://damavenus.com",
  metadata: {
    title: "Dama Venus",
    description: "Music. Image. Presence."
  },
  brandDescriptor: "Artist • Visual Narratives • Live Energy",
  footerLine: "Dama Venus — Music. Image. Presence."
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
