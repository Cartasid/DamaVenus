import type { CTA } from "@/lib/types";

export const aboutPageModel = {
  aboutIntro: {
    title: "About",
    introLine: "Built on atmosphere.",
    shortText:
      "Dama Venus creates cinematic music and visual narratives with a dark editorial edge.",
    sectionPriority: 1,
    primaryCtaPattern: {
      label: "Contact",
      href: "/contact"
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
        assetId: "about-featured-portrait-01",
        cropFocusHint: "face-center",
        altTextNote: "Primary portrait for About entry section.",
        role: "entry",
        sectionPriority: 1
      }
    ],
    supportingVisuals: [
      {
        assetId: "about-supporting-visual-01",
        cropFocusHint: "mid-frame-subject",
        altTextNote: "Supporting atmospheric visual for About section.",
        role: "supporting",
        sectionPriority: 2
      },
      {
        assetId: "about-supporting-visual-02",
        cropFocusHint: "wide-environment",
        altTextNote: "Secondary visual extending the cinematic mood.",
        role: "secondary",
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
