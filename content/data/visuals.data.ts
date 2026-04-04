import { getCtaActionKind, type SectionContent, validateCta } from "@/lib/types";

type VisualEntryType = "series" | "portrait" | "still" | "linked-visual";
type VisualRole = "lead" | "supporting" | "quiet-spacer";
type LayoutWeight = "xl" | "lg" | "md" | "sm";
type SurfaceMode = "bw-first" | "color-first" | "dual";
type VisualModuleType = "grid" | "series-section" | "large-image-block" | "editorial-image-row" | "linked-visual-module";

export type VisualsEntry = {
  id: string;
  title: string;
  subtitle?: string;
  type: VisualEntryType;
  role: VisualRole;
  order: number;
  priority: number;
  layoutWeight: LayoutWeight;
  moduleType: VisualModuleType;
  assets: string[];
  shortText?: string;
  cropFocusHint: string;
  bwColorSuitability: SurfaceMode;
  altTextNotes: string;
};

export const visualsIntro: SectionContent = {
  label: "Visuals",
  headline: "Frames in Motion",
  subhead: "Portraits, details, and atmosphere—curated in sequence.",
  cta: {
    label: "View Visuals",
    href: "/visuals"
  },
  asset: { id: "visuals-cinderela-lead-241" }
};

export const visualsEntries: VisualsEntry[] = [
  {
    id: "visuals-series-cinderela",
    title: "Cinderela Series",
    subtitle: "Dark Editorial Arc",
    type: "series",
    role: "lead",
    order: 1,
    priority: 1,
    layoutWeight: "xl",
    moduleType: "series-section",
    assets: ["visuals-cinderela-lead-241", "visuals-cinderela-frame-243", "visuals-cinderela-frame-288"],
    shortText: "Core sequence for the main dramatic opening.",
    cropFocusHint: "Keep eyes and shoulder line centered; preserve upper negative space for potential overlay.",
    bwColorSuitability: "dual",
    altTextNotes: "Use scene-specific alt text per frame; avoid generic 'portrait' repetition."
  },
  {
    id: "visuals-group-night-signals",
    title: "Night Signals",
    subtitle: "Color Accent Sequence",
    type: "series",
    role: "supporting",
    order: 2,
    priority: 2,
    layoutWeight: "lg",
    moduleType: "editorial-image-row",
    assets: ["visuals-uuid-6824", "visuals-cinderela-landscape-210", "visuals-uuid-3493"],
    shortText: "Mid-page color pulse before returning to calmer stillness.",
    cropFocusHint: "Anchor central subject; keep lateral breathing room for row crops.",
    bwColorSuitability: "color-first",
    altTextNotes: "Describe gesture/light direction; keep mood wording concise."
  },
  {
    id: "visuals-portrait-tamiris",
    title: "Tamiris Portrait",
    type: "portrait",
    role: "lead",
    order: 3,
    priority: 3,
    layoutWeight: "lg",
    moduleType: "large-image-block",
    assets: ["visuals-portrait-tamiris-12"],
    cropFocusHint: "Maintain face in upper-middle area and retain neck/shoulder framing.",
    bwColorSuitability: "dual",
    altTextNotes: "Single-subject editorial portrait; keep alt text factual and non-promotional."
  },
  {
    id: "visuals-group-square-stills",
    title: "Still Fragments",
    subtitle: "Quiet Texture Row",
    type: "still",
    role: "quiet-spacer",
    order: 4,
    priority: 4,
    layoutWeight: "sm",
    moduleType: "grid",
    assets: ["visuals-still-unnamed-1", "visuals-still-unnamed-2", "visuals-still-unnamed-3"],
    cropFocusHint: "Use center-safe crops; keep details readable in tight square tiles.",
    bwColorSuitability: "bw-first",
    altTextNotes: "Treat as atmospheric stills; decorative alt handling is acceptable when adjacent context already explains the set."
  },
  {
    id: "visuals-linked-current-chapter",
    title: "Current Chapter — Visual Link",
    type: "linked-visual",
    role: "supporting",
    order: 5,
    priority: 5,
    layoutWeight: "md",
    moduleType: "linked-visual-module",
    assets: ["visuals-linked-current-chapter"],
    shortText: "Optional bridge module from visual world to release context.",
    cropFocusHint: "Keep central motif visible and reserve one side for CTA copy.",
    bwColorSuitability: "color-first",
    altTextNotes: "Mention release relation in alt text where link purpose is not otherwise explicit."
  }
];

export const visualsData = {
  intro: visualsIntro,
  entries: visualsEntries,
  groups: {
    featuredSeries: ["visuals-series-cinderela"],
    imageGroups: ["visuals-group-night-signals", "visuals-group-square-stills"],
    standalonePortraits: ["visuals-portrait-tamiris"],
    stills: ["visuals-group-square-stills"],
    linkedVisuals: ["visuals-linked-current-chapter"]
  },
  renderingModules: ["grid", "series-section", "large-image-block", "editorial-image-row", "linked-visual-module"] as VisualModuleType[]
} as const;

if (visualsIntro.cta) {
  validateCta(visualsIntro.cta, "visuals intro");
  if (getCtaActionKind(visualsIntro.cta.href) !== "internal") {
    throw new Error("Visuals intro CTA must target an internal route.");
  }
}
