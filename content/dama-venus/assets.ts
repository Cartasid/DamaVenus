export type PrioritizedAsset = {
  id: string;
  finalPath: string;
  sourcePath: string;
  area: "home" | "music" | "visuals" | "about" | "press";
  recommendedModuleType: string;
  altDraft: string;
  focusOrCropHint: string;
  bwColorSuitability: string;
  priority: number;
  overlayOrTransparencyNote?: string;
};

export const prioritizedAssets: PrioritizedAsset[] = [
  {
    id: "home-release-cover",
    finalPath: "/assets/releases/current-chapter-cover.jpg",
    sourcePath: "assets/source/releases/current-chapter-cover.jpg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Current Chapter cover",
    focusOrCropHint: "Center crop; keep title and artist fully visible",
    bwColorSuitability: "good",
    priority: 1,
    overlayOrTransparencyNote: "No overlay"
  },
  {
    id: "home-visual-preview",
    finalPath: "/assets/visuals/frames-in-motion.jpg",
    sourcePath: "assets/source/visuals/frames-in-motion.jpg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Frames in Motion preview",
    focusOrCropHint: "Landscape crop with subject centered",
    bwColorSuitability: "excellent",
    priority: 2,
    overlayOrTransparencyNote: "Supports dark overlay"
  },
  {
    id: "press-epk",
    finalPath: "/assets/press/dama-venus-epk.pdf",
    sourcePath: "assets/source/press/dama-venus-epk.pdf",
    area: "press",
    recommendedModuleType: "document",
    altDraft: "Dama Venus EPK",
    focusOrCropHint: "N/A for PDF",
    bwColorSuitability: "n/a",
    priority: 1
  }
];
