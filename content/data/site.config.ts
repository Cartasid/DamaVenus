import type { AssetMapItem } from "@/lib/types";
import { prioritizedAssets } from "@/content/dama-venus/assets";

export const siteConfig = {
  name: "Dama Venus",
  language: "de",
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
      focusOrCropHint: asset.focusOrCropHint,
      bwColorSuitability: asset.bwColorSuitability,
      overlayOrTransparencyNote: asset.overlayOrTransparencyNote
    }
  ])
);
