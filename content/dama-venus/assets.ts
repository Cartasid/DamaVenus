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
    id: "home-lead-portrait",
    finalPath: "/assets/dama-venus/home/dv_home_lead_portrait_main_color_3x4_v01.jpeg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_press_portrait_main_color_3x4_v01.jpeg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Dama Venus lead portrait",
    cropHint: "Portrait crop",
    focusHint: "Keep face centered with headroom",
    swColorMode: "excellent",
    overlaySuitability: "supports-dark-overlay",
    priority: 100,
    role: "decorative"
  },
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
    id: "home-statement-editorial",
    finalPath: "/assets/dama-venus/visuals/dv_visuals_story_frame01_bw_16x9_v01.jpeg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_visual_story_frame01_bw_16x9_v01.jpeg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Editorial background for homepage statement",
    cropHint: "Landscape crop",
    focusHint: "Maintain central negative space for text",
    swColorMode: "excellent",
    overlaySuitability: "supports-dark-overlay",
    priority: 3,
    role: "decorative"
  },
  {
    id: "home-contact-newsletter",
    finalPath: "/assets/dama-venus/home/dv_home_release_cover_primary_color_4x5_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_release_cover_primary_color_4x5_v01.jpg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Contact and newsletter module visual",
    cropHint: "Center crop",
    focusHint: "Keep central motif visible",
    swColorMode: "good",
    overlaySuitability: "supports-dark-overlay",
    priority: 4,
    role: "decorative"
  },
  {
    id: "home-press-preview",
    finalPath: "/assets/dama-venus/home/dv_home_lead_portrait_main_color_3x4_v01.jpeg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_press_portrait_main_color_3x4_v01.jpeg",
    area: "home",
    recommendedModuleType: "image",
    altDraft: "Home press preview portrait",
    cropHint: "Portrait crop",
    focusHint: "Keep face centered with headroom",
    swColorMode: "excellent",
    overlaySuitability: "supports-dark-overlay",
    priority: 5,
    role: "informative"
  },

  {
    id: "music-current-chapter-cover",
    finalPath: "/assets/dama-venus/music/dv_music_current_chapter_cover_color_4x5_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_release_cover_primary_color_4x5_v01.jpg",
    area: "music",
    recommendedModuleType: "featured-release",
    altDraft: "Current Chapter single cover by Dama Venus",
    cropHint: "4:5 center crop with title-safe area",
    focusHint: "Keep artist and release title visible in center",
    swColorMode: "good",
    overlaySuitability: "no-overlay",
    priority: 1,
    role: "informative"
  },
  {
    id: "music-current-chapter-visual",
    finalPath: "/assets/dama-venus/music/dv_music_current_chapter_visual_color_16x9_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_release_cover_primary_color_4x5_v01.jpg",
    area: "music",
    recommendedModuleType: "visual-release",
    altDraft: "Current Chapter visual frame",
    cropHint: "16:9 cinematic crop",
    focusHint: "Preserve central subject and negative space for text",
    swColorMode: "good",
    overlaySuitability: "supports-dark-overlay",
    priority: 2,
    role: "informative"
  },
  {
    id: "music-midnight-signal-cover",
    finalPath: "/assets/dama-venus/music/dv_music_midnight_signal_cover_bw_4x5_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_visual_story_frame01_bw_16x9_v01.jpeg",
    area: "music",
    recommendedModuleType: "release-card",
    altDraft: "Midnight Signal single artwork",
    cropHint: "4:5 portrait crop",
    focusHint: "Keep face and shoulder line in upper center",
    swColorMode: "excellent",
    overlaySuitability: "supports-dark-overlay",
    priority: 3,
    role: "informative"
  },
  {
    id: "music-afterglow-cut-cover",
    finalPath: "/assets/dama-venus/music/dv_music_afterglow_cut_cover_color_1x1_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_press_portrait_main_color_3x4_v01.jpeg",
    area: "music",
    recommendedModuleType: "release-card",
    altDraft: "Afterglow Cut release artwork",
    cropHint: "1:1 center crop",
    focusHint: "Keep eyes on central horizontal line",
    swColorMode: "limited",
    overlaySuitability: "supports-dark-overlay",
    priority: 4,
    role: "informative"
  },
  {
    id: "music-nocturne-line-visual",
    finalPath: "/assets/dama-venus/music/dv_music_nocturne_line_visual_bw_16x9_v01.jpg",
    sourcePath: "public/assets/dama-venus/curated/dv_curated_visual_story_frame01_bw_16x9_v01.jpeg",
    area: "music",
    recommendedModuleType: "video-link",
    altDraft: "Nocturne Line visual sequence still",
    cropHint: "16:9 crop with left-safe text area",
    focusHint: "Keep motion gesture in center-right",
    swColorMode: "excellent",
    overlaySuitability: "supports-dark-overlay",
    priority: 5,
    role: "informative"
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
