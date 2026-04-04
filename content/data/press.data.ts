import type { PressEpkBlock, PressMaterialItem, SectionContent } from "@/lib/types";

export const pressEpkBlocks: PressEpkBlock[] = [
  {
    id: "pageIntro",
    title: "Press & EPK",
    shortDescriptor: "Press overview with key artist materials.",
    body: "Images, bio, and release facts for press inquiries.",
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
    shortDescriptor: "Concise artist positioning for editorial context.",
    body: "Dama Venus creates cinematic music and visual narratives with a dark editorial edge.",
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
    body: "Cinematic pop artist blending mood-first sound and visual storytelling.",
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
    linkedAssets: ["press-featured-portrait-primary", "press-featured-portrait-secondary", "press-editorial-landscape", "press-detail-still"],
    order: 5,
    priority: 5,
    ctaLabel: "Open Image Selection",
    target: "/visuals"
  },
  {
    id: "musicListeningLinks",
    title: "Music Listening Links",
    shortDescriptor: "Official listening destinations for coverage.",
    body: "Official links for streaming and direct listening contexts.",
    linkedAssets: ["music-current-chapter-cover"],
    order: 6,
    priority: 6,
    ctaLabel: "Open Listening Links",
    target: "/music"
  },
  {
    id: "videoVisualLinks",
    title: "Video & Visual Links",
    shortDescriptor: "Official video and visual release links.",
    body: "Curated video links for editorial embedding and visual references.",
    linkedAssets: ["music-current-chapter-visual", "music-nocturne-line-visual"],
    order: 7,
    priority: 7,
    ctaLabel: "Open Video Links",
    target: "/visuals"
  },
  {
    id: "socialStreamingLinks",
    title: "Social & Streaming Links",
    shortDescriptor: "Official social and streaming profiles.",
    body: "Official social and streaming endpoints for profile linking.",
    linkedAssets: [],
    order: 8,
    priority: 8,
    ctaLabel: "Open Link Hub",
    target: "/contact"
  },
  {
    id: "contactBlock",
    title: "Contact",
    shortDescriptor: "Direct contact point for press inquiries.",
    body: "For interviews, features, and media usage requests, use the direct contact route.",
    linkedAssets: [],
    order: 10,
    priority: 10,
    ctaLabel: "Contact Press",
    target: "/contact",
    isPrimaryVisible: true
  },
  {
    id: "downloads",
    title: "Downloads",
    shortDescriptor: "Download section for press assets.",
    body: "Downloads are currently provided on request after editorial approval.",
    linkedAssets: ["press-epk", "press-featured-portrait-primary", "press-editorial-landscape"],
    order: 9,
    priority: 9,
    ctaLabel: "Open Downloads",
    target: "/press#downloads"
  }
];

const primaryIntroBlock = pressEpkBlocks.find((block) => block.id === "pageIntro") ?? pressEpkBlocks[0];

export const pressContent: SectionContent = {
  headline: primaryIntroBlock.title,
  subhead: typeof primaryIntroBlock.body === "string" ? primaryIntroBlock.body : primaryIntroBlock.body[0],
  cta: {
    label: primaryIntroBlock.ctaLabel,
    href: primaryIntroBlock.target
  }
};

export const pressMaterials: PressMaterialItem[] = [
  {
    id: "epk",
    title: "Electronic Press Kit",
    description: "Approved media material for editorial use.",
    type: "download",
    accessMode: "request",
    url: "/contact",
    notes: "Download follows in the next step; currently available on request.",
    asset: { id: "press-epk" }
  }
];
