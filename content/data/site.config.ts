import type { AssetMapItem } from "@/lib/types";

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

export const assetMap: Record<string, AssetMapItem> = {
  "home-release-cover": {
    src: "/assets/releases/current-chapter-cover.jpg",
    alt: "Current Chapter cover"
  },
  "home-visual-preview": {
    src: "/assets/visuals/frames-in-motion.jpg",
    alt: "Frames in Motion preview"
  },
  "press-epk": {
    src: "/assets/press/dama-venus-epk.pdf",
    alt: "Dama Venus EPK"
  }
};
