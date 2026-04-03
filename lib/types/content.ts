export type AssetRef = {
  id: string;
};

export type AssetSwColorMode = "excellent" | "good" | "limited" | "n/a";

export type AssetOverlaySuitability =
  | "supports-dark-overlay"
  | "supports-light-overlay"
  | "no-overlay"
  | "n/a";

export type AssetRole = "decorative" | "informative";

export type AssetMapItem = {
  src: string;
  alt?: string;
  cropHint: string;
  focusHint: string;
  priority: number;
  swColorMode: AssetSwColorMode;
  overlaySuitability: AssetOverlaySuitability;
  role: AssetRole;
  copyKey?: string;
};

export type CTA = {
  label: string;
  href: string;
};

export type NavigationItem = {
  label: string;
  href: string;
};

export type SectionContent = {
  label?: string;
  headline: string;
  subhead?: string;
  body?: string[];
  cta?: CTA;
  asset?: AssetRef;
};

export type ReleaseItem = {
  title: string;
  description: string;
  cta: CTA;
  coverAsset: AssetRef;
};

export type MusicReleaseType = "single" | "visual-release" | "upcoming" | "archive";
export type MusicReleaseStatus = "active" | "coming-soon" | "archived";

export type MusicAction = {
  kind: "listen" | "watch" | "explore" | "open" | "view-release";
  label: string;
  href: string;
};

export type MusicRelease = {
  id: string;
  title: string;
  subtitle?: string;
  shortText: string;
  releaseType: MusicReleaseType;
  status: MusicReleaseStatus;
  releaseDate?: string;
  year?: string;
  featured: boolean;
  priority: number;
  coverAsset: AssetRef;
  alternateVisualAsset?: AssetRef;
  listeningLinks: MusicAction[];
  watchLinks?: MusicAction[];
  primaryCta: MusicAction;
  secondaryCta?: MusicAction;
};

export type PressEpkBlock = {
  id: string;
  title: string;
  shortDescriptor: string;
  body: string | string[];
  linkedAssets: string[];
  order: number;
  priority: number;
  ctaLabel: string;
  target: string;
  isPrimaryVisible?: boolean;
};

export type PressMaterialItem = {
  id: string;
  title: string;
  description: string;
  asset: AssetRef;
};
