import type { CTA, ReleaseItem, SectionContent } from "@/lib/types";
import { contactContent } from "@/content/data/contact.data";
import { pressContent } from "@/content/data/press.data";

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

type HomepageModuleId =
  | "lead"
  | "featuredRelease"
  | "visuals"
  | "statement"
  | "press"
  | "contactNewsletter";

type HomepageModule = {
  id: HomepageModuleId;
  assetId?: string;
  assetPath?: string;
  alt: string;
  cropFocusHint: string;
  priority: "high" | "medium" | "low";
  swColorLogic: string;
  overlaySuitability: "high" | "medium" | "low";
  copy: {
    headline: string;
    subline?: string;
    cta?: CTA;
  };
};

export const homepageCoreModules: HomepageModule[] = [
  {
    id: "lead",
    assetId: "home-lead-portrait",
    alt: "Dama Venus homepage lead section",
    cropFocusHint: "center-face",
    priority: "high",
    swColorLogic: "inherit-site-palette",
    overlaySuitability: "high",
    copy: {
      headline: "Dama Venus",
      subline: homepageIntro.statement
    }
  },
  {
    id: "featuredRelease",
    assetId: homepageRelease.coverAsset.id,
    alt: "Cover image of the current chapter release",
    cropFocusHint: "center-subject",
    priority: "high",
    swColorLogic: "derive-from-cover",
    overlaySuitability: "high",
    copy: {
      headline: homepageRelease.title,
      subline: homepageRelease.description,
      cta: homepageRelease.cta
    }
  },
  {
    id: "visuals",
    assetId: homepageVisuals.asset?.id,
    alt: "Visual preview of portrait and atmosphere sequence",
    cropFocusHint: "upper-third-subject",
    priority: "medium",
    swColorLogic: "derive-from-visual-preview",
    overlaySuitability: "medium",
    copy: {
      headline: homepageVisuals.headline,
      subline: homepageVisuals.subhead,
      cta: homepageVisuals.cta
    }
  },
  {
    id: "statement",
    assetId: "home-statement-editorial",
    alt: "Typographic statement module",
    cropFocusHint: "center-safe-text",
    priority: "medium",
    swColorLogic: "inherit-site-palette",
    overlaySuitability: "high",
    copy: {
      headline: homepageStatement.headline
    }
  },
  {
    id: "press",
    assetId: "home-press-preview",
    assetPath: "/press",
    alt: "Press and EPK access module",
    cropFocusHint: "center-subject",
    priority: "low",
    swColorLogic: "neutral-editorial",
    overlaySuitability: "medium",
    copy: {
      headline: pressContent.headline,
      subline: pressContent.subhead,
      cta: pressContent.cta
    }
  },
  {
    id: "contactNewsletter",
    assetId: "home-contact-newsletter",
    assetPath: `mailto:${contactContent.primaryContact.email}`,
    alt: "Contact and newsletter call-to-action module",
    cropFocusHint: "center-safe-text",
    priority: "low",
    swColorLogic: "accent-contrast",
    overlaySuitability: "high",
    copy: {
      headline: contactContent.intro.headline,
      subline: contactContent.intro.subhead,
      cta: { label: contactContent.form.ctaLabel, href: `mailto:${contactContent.primaryContact.email}` }
    }
  }
];

const expectedHomeModuleCtas: Partial<Record<HomepageModuleId, CTA>> = {
  featuredRelease: { label: "Listen Now", href: "/music" },
  visuals: { label: "View Visuals", href: "/visuals" },
  press: { label: "Open EPK", href: "/press" },
  contactNewsletter: { label: "Send Inquiry", href: `mailto:${contactContent.primaryContact.email}` }
};

const primaryToSecondaryCtaSequence: HomepageModuleId[] = ["featuredRelease", "visuals", "press", "contactNewsletter"];

function validateHomeModuleCtasAndFlow(modules: HomepageModule[]): void {
  const moduleById = new Map(modules.map((module) => [module.id, module]));

  for (const [moduleId, expectedCta] of Object.entries(expectedHomeModuleCtas) as [HomepageModuleId, CTA][]) {
    const cta = moduleById.get(moduleId)?.copy.cta;
    if (!cta || cta.label !== expectedCta.label || cta.href !== expectedCta.href) {
      throw new Error(`Invalid CTA config for home module: ${moduleId}`);
    }
  }

  const sequenceIndexes = primaryToSecondaryCtaSequence.map((moduleId) => modules.findIndex((module) => module.id === moduleId));
  for (let index = 1; index < sequenceIndexes.length; index += 1) {
    if (sequenceIndexes[index - 1] === -1 || sequenceIndexes[index] === -1 || sequenceIndexes[index - 1] > sequenceIndexes[index]) {
      throw new Error("Invalid home CTA sequence: expected Release/Visuals -> Press/EPK -> Contact");
    }
  }
}

validateHomeModuleCtasAndFlow(homepageCoreModules);
