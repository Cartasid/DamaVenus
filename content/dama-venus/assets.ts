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
    finalPath: "/assets/dama-venus/home/dv_home_release_cover_primary_color_4x5_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_release_cover_primary_color_4x5_v01.jpg",
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
    finalPath: "/assets/dama-venus/visuals/dv_visuals_story_frame01_bw_16x9_v01.jpeg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_visual_story_frame01_bw_16x9_v01.jpeg",
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
    finalPath: "/assets/dama-venus/press/dv_press_portrait_main_color_3x4_v01.jpeg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_press_portrait_main_color_3x4_v01.jpeg",
    area: "press",
    recommendedModuleType: "document",
    altDraft: "Dama Venus EPK",
    focusOrCropHint: "N/A for PDF",
    bwColorSuitability: "n/a",
    priority: 1
  }
];
