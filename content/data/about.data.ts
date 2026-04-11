import { getCtaActionKind, type CTA, validateCta } from "@/lib/types";

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
    introLine: "Born from atmosphere.",
    shortText:
      "Dama Venus commands the intersection of cinematic sound and high-fashion visual narrative — an artist who doesn't just perform, but architects worlds.",
    mediumText:
      "Each chapter is composed as a singular aesthetic universe: sound, image, and intention fused into one uncompromising vision.",
    sectionPriority: 1,
    primaryCtaPattern: {
      label: "Contact",
      href: "/contact"
    }
  },
  aboutBio: {
    shortText:
      "The artistic line is absolute: precision, presence, and purpose in every note and frame.",
    mediumText:
      "Dama Venus speaks a singular language across sound, image, and timing — each element calibrated to command attention.",
    longArtistNote:
      "The approach is intentional: fewer words, deeper resonance, stronger form. Feminine power, modern mystique, and controlled intensity define every chapter."
  },
  aboutSections: [
    {
      id: "page-intro",
      title: "About",
      introLine: "Born from atmosphere.",
      shortText:
        "Dama Venus commands the intersection of cinematic sound and high-fashion visual narrative — an artist who doesn't just perform, but architects worlds.",
      mediumText:
        "Each chapter is composed as a singular aesthetic universe: sound, image, and intention fused into one uncompromising vision.",
      associatedImageAssetIds: ["about-intro-entry-portrait-primary"],
      cropFocusHint: "face-center",
      altTextNote: "Primary portrait for the About entry and first-page orientation.",
      sectionPriority: 1
    },
    {
      id: "short-bio",
      title: "Short Bio",
      introLine: "A voice that transcends borders.",
      shortText:
        "From Rio de Janeiro to the stages of Europe — Dama Venus moves between music, image, and presence with cinematic precision.",
      mediumText:
        "The work bridges sonic storytelling with editorial direction. Every release is a complete atmosphere — not an isolated track, but a cinematic experience.",
      associatedImageAssetIds: ["about-supporting-visual-calm-02"],
      cropFocusHint: "upper-face-focus",
      altTextNote: "Calm portrait detail for text-near bio module.",
      sectionPriority: 2
    },
    {
      id: "artist-note",
      title: "Artist Note",
      introLine: "Discipline. Mood. Vision.",
      shortText:
        "The artistic stance is uncompromising: atmospheric, intentional, and never explanatory.",
      mediumText:
        "Music and visuals converge in one direction so the audience doesn't just listen — they enter a world.",
      longerText:
        "The approach is intentional: fewer words, deeper resonance, stronger form. Feminine power, modern mystique, and controlled intensity define every chapter.",
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
      introLine: "Where sound and vision converge.",
      shortText: "Every project is a world — sound, image, and atmosphere moving as one.",
      mediumText:
        "Each release is conceived as a cinematic arc — sound, image, and atmosphere in perfect alignment.",
      associatedImageAssetIds: ["about-intro-entry-portrait-primary"],
      cropFocusHint: "face-center",
      altTextNote: "Lead portrait anchor for the worldbuilding statement.",
      sectionPriority: 1
    },
    {
      id: "editorial-edge",
      title: "Stance",
      introLine: "Intensity over noise.",
      shortText: "The tone is commanding: dark, precise, and deliberately restrained.",
      mediumText:
        "Visual and musical decisions follow one editorial language — each choice made with the confidence of absolute clarity.",
      associatedImageAssetIds: ["about-supporting-visual-calm-02"],
      cropFocusHint: "mid-frame-subject",
      altTextNote: "Supporting portrait for the editorial-edge statement.",
      sectionPriority: 2
    },
    {
      id: "method-clarity",
      title: "Method",
      introLine: "Total creative control.",
      shortText: "Concept, execution, and rhythm — every element follows one artistic direction.",
      mediumText:
        "The method ensures every experience is immersive, atmospheric, and unmistakably Dama Venus.",
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

validateCta(aboutCta, "about intro");
if (getCtaActionKind(aboutCta.href) !== "internal") {
  throw new Error("About CTA must target an internal route.");
}
