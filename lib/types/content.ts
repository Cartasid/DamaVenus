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
  /** CSS object-position value, derived from focusHint. Defaults to "center center". */
  objectPosition?: string;
};

export type CTA = {
  label: string;
  href: string;
};

export type CtaTarget = `/${string}` | `https://${string}` | `http://${string}` | `mailto:${string}`;
export type CtaActionKind = "internal" | "external" | "mailto";

export function getCtaActionKind(href: string): CtaActionKind {
  if (href.startsWith("mailto:")) return "mailto";
  if (href.startsWith("http://") || href.startsWith("https://")) return "external";
  return "internal";
}

export function isValidCtaTarget(target: string): target is CtaTarget {
  return target.startsWith("/") || target.startsWith("https://") || target.startsWith("http://") || target.startsWith("mailto:");
}

export function validateCta(cta: CTA, context: string): void {
  if (!isValidCtaTarget(cta.href)) {
    throw new Error(`Invalid CTA target in ${context}: ${cta.href}`);
  }
}

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


export type ContactFieldType = "text" | "email" | "textarea" | "select";

export type ContactFieldDefinition = {
  id: string;
  label: string;
  type: ContactFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export type ContactAlternatePath = {
  label: string;
  href: string;
};

export type ContactPageContent = {
  headline: string;
  subhead?: string;
  fields?: ContactFieldDefinition[];
  alternatePaths?: ContactAlternatePath[];
  cta?: CTA;
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
  type: "bio" | "image" | "one-sheet" | "download" | "external-link";
  accessMode: "direct" | "request" | "restricted";
  url: string;
  notes: string;
  asset: AssetRef;
};
