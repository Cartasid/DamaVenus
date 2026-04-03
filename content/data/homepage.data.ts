import type { ReleaseItem, SectionContent } from "@/lib/types";
import type { AssetRef } from "@/lib/types";

export const homepageIntro = {
  statement: "Where image becomes frequency."
};

export const homepageRelease: ReleaseItem = {
  title: "Current Chapter",
  description: "New music, framed in shadow and light.",
  cta: {
    label: "Listen Now",
    href: "/music"
  },
  coverAsset: { id: "home-release-cover" }
};

export const homepageVisuals: SectionContent = {
  headline: "Frames in Motion",
  subhead: "Portraits, details, and atmosphere—curated in sequence.",
  cta: {
    label: "View Visuals",
    href: "/visuals"
  },
  asset: { id: "home-visual-preview" }
};

export const homepageStatement: SectionContent = {
  headline: "I don’t chase volume. I shape presence."
};

export const homepageServices: SectionContent = {
  headline: "Work With Dama Venus",
  subhead: "Curated offers for brands, media, and live platforms.",
  body: [
    "Artistic Direction",
    "Live Performance",
    "Visual Campaign Concepts",
    "Brand / Editorial Collaborations"
  ],
  cta: {
    label: "View Services",
    href: "/contact"
  }
};

export type HomepageModule =
  | {
      id: "release";
      type: "release";
      title: string;
      description: string;
      cta: ReleaseItem["cta"];
      asset: AssetRef;
    }
  | {
      id: "visuals";
      type: "section";
      headline: string;
      subhead?: string;
      cta?: SectionContent["cta"];
      asset: AssetRef;
    }
  | {
      id: "statement";
      type: "section";
      headline: string;
      subhead?: string;
      cta?: SectionContent["cta"];
    }
  | {
      id: "services";
      type: "section";
      headline: string;
      subhead?: string;
      body?: string[];
      cta?: SectionContent["cta"];
    };

export const homepageModules: HomepageModule[] = [
  {
    id: "release",
    type: "release",
    title: homepageRelease.title,
    description: homepageRelease.description,
    cta: homepageRelease.cta,
    asset: homepageRelease.coverAsset
  },
  {
    id: "visuals",
    type: "section",
    headline: homepageVisuals.headline,
    subhead: homepageVisuals.subhead,
    cta: homepageVisuals.cta,
    asset: homepageVisuals.asset as AssetRef
  },
  {
    id: "statement",
    type: "section",
    headline: homepageStatement.headline
  },
  {
    id: "services",
    type: "section",
    headline: homepageServices.headline,
    subhead: homepageServices.subhead,
    body: homepageServices.body,
    cta: homepageServices.cta
  }
];
