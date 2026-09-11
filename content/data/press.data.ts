import {
  getCtaActionKind,
  type PressEpkBlock,
  type PressMaterialItem,
  type SectionContent,
  validateCta
} from "@/lib/types";

export const pressEpkBlocks: PressEpkBlock[] = [
  {
    id: "pageIntro",
    title: "Press & EPK",
    shortDescriptor: "Complete press materials for editorial use.",
    body:
      "High-resolution imagery, artist biography, and comprehensive release materials for editorial and broadcast use.",
    linkedAssets: ["press-epk"],
    order: 1,
    priority: 1,
    ctaLabel: "Open Press & EPK Overview",
    target: "/press",
    isPrimaryVisible: true
  },
  {
    id: "artistSummary",
    title: "Artist Summary",
    shortDescriptor: "Artist positioning for international editorial context.",
    body:
      "Dama Venus commands the intersection of cinematic sound and high-fashion visual narrative — an international artist redefining alternative pop.",
    linkedAssets: ["press-epk"],
    order: 2,
    priority: 2,
    ctaLabel: "Go to Artist Profile",
    target: "/about"
  },
  {
    id: "veryShortBio",
    title: "Very Short Bio",
    shortDescriptor: "One-line artist bio for quick press use.",
    body:
      "International cinematic pop artist. Sound-first. Vision-driven. Uncompromising.",
    linkedAssets: ["press-epk"],
    order: 3,
    priority: 3,
    ctaLabel: "Use Very Short Bio",
    target: "/press#very-short-bio"
  },
  {
    id: "shortBio",
    title: "Short Bio",
    shortDescriptor: "Short artist text for media kits and lineups.",
    body: [
      "Dama Venus composes each release as one coherent atmosphere across sound and image.",
      "The artistic language stays reduced, focused, and editorial in tone."
    ],
    linkedAssets: ["press-epk"],
    order: 4,
    priority: 4,
    ctaLabel: "Use Short Bio",
    target: "/press#short-bio"
  },
  {
    id: "pressReadyDescription",
    title: "Press-ready Description",
    shortDescriptor: "Expanded artist description for publication.",
    body: [
      "Dama Venus develops releases as cinematic chapters with controlled intensity and clear visual identity.",
      "Music direction, imagery, and cadence are built as one aesthetic line for editorial clarity."
    ],
    linkedAssets: ["press-epk"],
    order: 11,
    priority: 11,
    ctaLabel: "Use Press Description",
    target: "/press#press-ready-description"
  },
  {
    id: "featuredPressImages",
    title: "Featured Press Images",
    shortDescriptor: "Selected approved visuals for editorial use.",
    body: "Portrait and campaign visuals approved for press publication.",
    linkedAssets: [
      "press-featured-portrait-primary",
      "press-featured-portrait-secondary",
      "press-editorial-landscape",
      "press-detail-still"
    ],
    order: 5,
    priority: 5,
    ctaLabel: "Open Image Selection",
    target: "/visuals"
  },
  {
    id: "musicListeningLinks",
    title: "Music Listening Links",
    shortDescriptor: "Official listening destinations for coverage.",
    body:
      "Verified release links for Lonely Berlin, Valentines, Eclipse, and Close Friend are available on the music page.",
    linkedAssets: ["music-current-chapter-cover"],
    order: 6,
    priority: 6,
    ctaLabel: "Open Official Releases",
    target: "/music"
  },
  {
    id: "videoVisualLinks",
    title: "Video & Visual Links",
    shortDescriptor: "Official video and visual material.",
    body:
      "Curated visual material for editorial reference and embedding contexts.",
    linkedAssets: ["music-current-chapter-visual"],
    order: 7,
    priority: 7,
    ctaLabel: "Open Visuals",
    target: "/visuals"
  },
  {
    id: "socialStreamingLinks",
    title: "Official Profiles",
    shortDescriptor: "Official artist and professional profiles.",
    body:
      "Verified and maintained profile destinations are linked throughout the official website.",
    linkedAssets: [],
    order: 8,
    priority: 8,
    ctaLabel: "Open Artist Profile",
    target: "/about"
  },
  {
    id: "downloads",
    title: "EPK Downloads",
    shortDescriptor: "Direct English and Portuguese press-kit downloads.",
    body:
      "Download the current English or Portuguese EPK directly from the official press page.",
    linkedAssets: [
      "press-epk",
      "press-featured-portrait-primary",
      "press-editorial-landscape"
    ],
    order: 9,
    priority: 9,
    ctaLabel: "Open EPK Downloads",
    target: "/press#epk-downloads"
  },
  {
    id: "contactBlock",
    title: "Contact",
    shortDescriptor: "Direct contact point for press inquiries.",
    body:
      "For interviews, features, and media usage requests, use the direct contact route.",
    linkedAssets: [],
    order: 10,
    priority: 10,
    ctaLabel: "Contact Press",
    target: "/contact",
    isPrimaryVisible: true
  }
];

const primaryIntroBlock =
  pressEpkBlocks.find((block) => block.id === "pageIntro") ?? pressEpkBlocks[0];

export const pressContent: SectionContent = {
  headline: primaryIntroBlock.title,
  subhead:
    typeof primaryIntroBlock.body === "string"
      ? primaryIntroBlock.body
      : primaryIntroBlock.body[0],
  cta: {
    label: primaryIntroBlock.ctaLabel,
    href: primaryIntroBlock.target
  }
};

export const pressMaterials: PressMaterialItem[] = [
  {
    id: "epk",
    title: "Electronic Press Kit — English",
    description:
      "Current official EPK with biography, discography, press photos, and contact information.",
    type: "download",
    accessMode: "direct",
    url: "/assets/dama-venus/docs/dama-venus-epk-en.pdf",
    notes:
      "A Portuguese edition is also available at /assets/dama-venus/docs/dama-venus-epk-pt.pdf.",
    asset: { id: "press-epk" }
  }
];

for (const block of pressEpkBlocks) {
  validateCta(
    { label: block.ctaLabel, href: block.target },
    `press block ${block.id}`
  );

  if (getCtaActionKind(block.target) === "mailto") {
    throw new Error(`Press block "${block.id}" must use route-based CTA targets.`);
  }
}
