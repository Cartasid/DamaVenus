import type {
  AssetOverlaySuitability,
  AssetRole,
  AssetSwColorMode
} from "@/lib/types";

export type PrioritizedAsset = {
  id: string;
  finalPath: string;
  sourcePath: string;
  area: "home" | "music" | "visuals" | "about" | "press";
  recommendedModuleType: string;
  altDraft: string;
  cropHint: string;
  focusHint: string;
  swColorMode: AssetSwColorMode;
  overlaySuitability: AssetOverlaySuitability;
  priority: number;
  role: AssetRole;
  copyKey?: string;
};

export const prioritizedAssets: PrioritizedAsset[] = [
  {
    id: "home-release-cover",
    finalPath: "/assets/dama-venus/home/dama-venus-home-release-cover.jpg",
    sourcePath: "assets/source/releases/current-chapter-cover.jpg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Current Chapter cover",
    cropHint: "Center crop",
    focusHint: "Keep title and artist fully visible",
    swColorMode: "good",
    overlaySuitability: "no-overlay",
    priority: 1,
    role: "informative"
  },
  {
    id: "home-visual-preview",
    finalPath: "/assets/dama-venus/visuals/dama-venus-visuals-preview.jpg",
    sourcePath: "assets/source/visuals/frames-in-motion.jpg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Frames in Motion preview",
    cropHint: "Landscape crop",
    focusHint: "Subject centered",
    swColorMode: "excellent",
    overlaySuitability: "supports-dark-overlay",
    priority: 2,
    role: "decorative"
  },
  {
    id: "press-epk",
    finalPath: "/assets/dama-venus/press/dama-venus-press-epk.jpg",
    sourcePath: "assets/source/press/dama-venus-epk.pdf",
    area: "press",
    recommendedModuleType: "document",
    altDraft: "Dama Venus EPK",
    cropHint: "N/A for PDF",
    focusHint: "N/A for PDF",
    swColorMode: "n/a",
    overlaySuitability: "n/a",
    priority: 1,
    role: "informative"
  }
];
