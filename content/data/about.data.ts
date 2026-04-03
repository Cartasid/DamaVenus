import type { CTA } from "@/lib/types";

export const aboutIntro = {
  label: "About",
  title: "Built on atmosphere.",
  introLine: "Dama Venus creates cinematic music and visual narratives with a dark editorial edge.",
  cta: {
    label: "Read More",
    href: "/about"
  }
} as const;

export const featuredPortraits = [
  {
    id: "about-lead-portrait",
    assetId: "home-lead-portrait",
    title: "Lead Portrait",
    altText: "Dama Venus lead portrait"
  }
] as const;

export const aboutBio = {
  shortText: "Each project is crafted as a complete aesthetic world.",
  mediumText: "The work connects sound, imagery, and staging into one coherent artistic language.",
  longArtistNote:
    "Optional artist note for extended context. Remove this field if no long-form note should be displayed."
} as const;

export const aboutKeyStatements = [
  { id: "presence", text: "I don’t chase volume. I shape presence.", priority: 1 },
  { id: "worldbuilding", text: "Every release is built as a full visual and sonic world.", priority: 2 },
  { id: "direction", text: "Direction, performance, and atmosphere are developed as one system.", priority: 3 }
] as const;

export const aboutCta: CTA = aboutIntro.cta;
