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
    finalPath: "/assets/dama-venus/home/dv_home_release_cover_primary_color_4x5_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_release_cover_primary_color_4x5_v01.jpg",
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
    finalPath: "/assets/dama-venus/visuals/dv_visuals_story_frame01_bw_16x9_v01.jpeg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_visual_story_frame01_bw_16x9_v01.jpeg",
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
    finalPath: "/assets/dama-venus/press/dv_press_portrait_main_color_3x4_v01.jpeg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_press_portrait_main_color_3x4_v01.jpeg",
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
