export type AssetRef = {
  id: string;
};

export type AssetMapItem = {
  src: string;
  alt?: string;
  focusOrCropHint?: string;
  bwColorSuitability?: string;
  overlayOrTransparencyNote?: string;
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
