import type { CTA, SectionContent } from "@/lib/types";

export type AboutSection = {
  id: string;
  title: string;
  introLine: string;
  shortText: string;
  mediumText: string;
  longerText?: string;
  associatedImageAssetIds: string[];
  cropFocusHint: string;
  altTextNote: string;
  sectionPriority: number;
};

export const aboutPageModel = {
  aboutIntro: {
    title: "About",
    introLine: "Built on atmosphere.",
    shortText:
      "Dama Venus creates cinematic music and visual narratives with a dark editorial edge.",
    mediumText:
      "Every chapter is composed as one clear aesthetic world: image, sound, and intention in one line.",
    sectionPriority: 1,
    primaryCtaPattern: {
      label: "Contact",
      href: "/contact"
    }
  },
  aboutBio: {
    shortText:
      "The line stays reduced: calm pressure, clear form, no excess.",
    mediumText:
      "Dama Venus composes one coherent language across sound, image, and timing.",
    longArtistNote:
      "The approach stays reduced: fewer words, clearer mood, stronger form. Feminine strength, modern mystique, and controlled intensity remain the constant line across each chapter."
  },
  aboutSections: [
    {
      id: "page-intro",
      title: "About",
      introLine: "Built on atmosphere.",
      shortText:
        "Dama Venus creates cinematic music and visual narratives with a dark editorial edge.",
      mediumText:
        "Every chapter is composed as one clear aesthetic world: image, sound, and intention in one line.",
      associatedImageAssetIds: ["about-intro-entry-portrait-primary"],
      cropFocusHint: "face-center",
      altTextNote: "Primary portrait for the About entry and first-page orientation.",
      sectionPriority: 1
    },
    {
      id: "short-bio",
      title: "Short Bio",
      introLine: "Artist language in image and sound.",
      shortText:
        "Dama Venus works between music, image, and presence—focused, cinematic, and precise.",
      mediumText:
        "The work connects sonic storytelling with visual direction. Releases are built as complete atmospheres, not isolated tracks or standalone visuals.",
      associatedImageAssetIds: ["about-supporting-visual-calm-02"],
      cropFocusHint: "upper-face-focus",
      altTextNote: "Calm portrait detail for text-near bio module.",
      sectionPriority: 2
    },
    {
      id: "artist-note",
      title: "Artist Note",
      introLine: "Precision, mood, intention.",
      shortText:
        "The artistic stance is reduced, atmospheric, and intentional rather than explanatory.",
      mediumText:
        "Music and visuals are developed in one direction so the audience enters a coherent mood-space.",
      longerText:
        "The approach stays reduced: fewer words, clearer mood, stronger form. Feminine strength, modern mystique, and controlled intensity remain the constant line across each chapter.",
      associatedImageAssetIds: ["about-supporting-visual-calm-reserve-03"],
      cropFocusHint: "gaze-axis-center",
      altTextNote: "Secondary reserve visual for a quieter artist-note transition.",
      sectionPriority: 3
    }
  ] as AboutSection[],
  aboutKeyStatements: [
    {
      id: "cinematic-worldbuilding",
      title: "Positioning",
      introLine: "Image and frequency move together.",
      shortText: "Projects are built as one atmosphere, not as separate assets.",
      mediumText:
        "Each release is conceived as one narrative arc across sound, image, and atmosphere.",
      associatedImageAssetIds: ["about-intro-entry-portrait-primary"],
      cropFocusHint: "face-center",
      altTextNote: "Lead portrait anchor for the worldbuilding statement.",
      sectionPriority: 1
    },
    {
      id: "editorial-edge",
      title: "Stance",
      introLine: "Controlled intensity over volume.",
      shortText: "The tone is restrained, dark, and precise.",
      mediumText:
        "Visual and musical decisions follow one editorial language with deliberate restraint.",
      associatedImageAssetIds: ["about-supporting-visual-calm-02"],
      cropFocusHint: "mid-frame-subject",
      altTextNote: "Supporting portrait for the editorial-edge statement.",
      sectionPriority: 2
    },
    {
      id: "method-clarity",
      title: "Method",
      introLine: "A complete aesthetic line.",
      shortText: "Concept, execution, and rhythm follow one direction.",
      mediumText:
        "The method keeps the experience compact, atmospheric, and legible across formats.",
      associatedImageAssetIds: ["about-supporting-visual-calm-reserve-03"],
      cropFocusHint: "wide-environment",
      altTextNote: "Reserve image for quieter transition and spacing rhythm.",
      sectionPriority: 3
    }
  ] as AboutSection[],
  aboutVisualModules: {
    featuredPortraits: [
      {
        assetId: "about-intro-entry-portrait-primary",
        title: "Entry Portrait",
        introLine: "Primary visual entrance",
        shortText: "Carries the first impression of the About page.",
        mediumText: "Used as lead portrait next to intro and short bio content.",
        cropFocusHint: "face-center",
        altTextNote: "Primary portrait for About entry section.",
        role: "lead-portrait",
        sectionPriority: 1
      }
    ],
    supportingVisuals: [
      {
        assetId: "about-supporting-visual-calm-02",
        title: "Calm Supporting Portrait",
        introLine: "Quiet text-near module",
        shortText: "Supports short and medium bio passages without overtaking them.",
        mediumText: "Used as calm transition between intro and method section.",
        cropFocusHint: "mid-frame-subject",
        altTextNote: "Supporting visual close to text for calm transitions.",
        role: "supporting",
        sectionPriority: 2
      },
      {
        assetId: "about-supporting-visual-calm-reserve-03",
        title: "Reserve Visual",
        introLine: "Secondary quiet module",
        shortText: "Lower-priority visual for optional expansion and rhythm breaks.",
        mediumText: "Reserved for slower pacing blocks or longer artist-note passages.",
        cropFocusHint: "wide-environment",
        altTextNote: "Optional reserve visual, clearly lower priority.",
        role: "reserve",
        sectionPriority: 3
      }
    ],
    quotesOrCaptions: []
  }
} as const;

// Compatibility export for existing consumers. Primary source is `aboutPageModel`.
export const aboutContent: SectionContent = {
  label: aboutPageModel.aboutIntro.title,
  headline: aboutPageModel.aboutIntro.introLine,
  body: [aboutPageModel.aboutBio.shortText, aboutPageModel.aboutBio.mediumText],
  cta: aboutPageModel.aboutIntro.primaryCtaPattern
};

export const aboutIntro = {
  label: aboutPageModel.aboutIntro.title,
  title: aboutPageModel.aboutIntro.title,
  introLine: aboutPageModel.aboutIntro.introLine,
  shortText: aboutPageModel.aboutIntro.shortText,
  sectionPriority: aboutPageModel.aboutIntro.sectionPriority
} as const;

export const aboutBio = aboutPageModel.aboutBio;
export const aboutSections = aboutPageModel.aboutSections;
export const aboutKeyStatements = aboutPageModel.aboutKeyStatements;
export const featuredPortraits = aboutPageModel.aboutVisualModules.featuredPortraits;
export const supportingVisuals = aboutPageModel.aboutVisualModules.supportingVisuals;
export const aboutCta: CTA = aboutPageModel.aboutIntro.primaryCtaPattern;
