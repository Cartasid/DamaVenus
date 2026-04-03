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

export type PressMaterialItem = {
  id: string;
  title: string;
  description: string;
  asset: AssetRef;
};
