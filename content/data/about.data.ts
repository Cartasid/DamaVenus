import type { CTA } from "@/lib/types";

export const aboutPageModel = {
  aboutIntro: {
    title: "About",
    introLine: "Built on atmosphere.",
    shortText:
      "Dama Venus creates cinematic music and visual narratives with a dark editorial edge.",
    sectionPriority: 1,
    primaryCtaPattern: {
      label: "Read More",
      href: "/about"
    }
  },
  aboutBio: {
    shortText:
      "Dama Venus creates cinematic music and visual narratives with a dark editorial edge.",
    mediumText:
      "Each project is crafted as a complete aesthetic world."
  },
  aboutKeyStatements: [
    {
      id: "cinematic-worldbuilding",
      title: "Cinematic worldbuilding",
      text: "Dama Venus creates cinematic music and visual narratives.",
      sectionPriority: 1
    },
    {
      id: "editorial-edge",
      title: "Dark editorial edge",
      text: "The work is shaped with a dark editorial edge.",
      sectionPriority: 2
    },
    {
      id: "complete-aesthetic-world",
      title: "Complete aesthetic worlds",
      text: "Each project is crafted as a complete aesthetic world.",
      sectionPriority: 3
    }
  ],
  aboutVisualModules: {
    featuredPortraits: [
      {
        assetId: "about-intro-entry-portrait-primary",
        cropFocusHint: "face-center",
        altTextNote: "Primary portrait for About entry section.",
        role: "lead-portrait",
        sectionPriority: 1
      }
    ],
    supportingVisuals: [
      {
        assetId: "about-supporting-visual-calm-02",
        cropFocusHint: "mid-frame-subject",
        altTextNote: "Supporting visual close to text for calm transitions.",
        role: "supporting",
        sectionPriority: 2
      },
      {
        assetId: "about-supporting-visual-calm-reserve-03",
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
