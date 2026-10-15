import { officialReleaseLinks } from "@/content/data/official-links";

// Public copy and recording URL: pics/Dama_Venus_FYC_Send_To_Member_v5_Safe_Font.
// Public FYC data deliberately excludes private entry/ballot identifiers,
// awards-cycle numbers, promotional claims and unrelated licensing information.
export const fycData = {
  title: "Kitsune Pt 2",
  artist: "Dama Venus",
  category: "Best Rap Performance",
  description:
    "“Kitsune Pt 2” by Dama Venus features first-person lyrics about desire and connection, a recurring “no drama, no stress” refrain, and imagery of constellations, lanterns and midnight.",
  metadataTitle: "Dama Venus — Kitsune Pt 2 | For Your GRAMMY® Consideration",
  metadataDescription:
    "Dama Venus — Kitsune Pt 2. Best Rap Performance. FYC opt-out: contact@damavenus.eu; subject: STOP FYC.",
  videoUrl: "https://youtu.be/h6OUAxJmKRw",
  videoEmbedUrl:
    "https://www.youtube-nocookie.com/embed/h6OUAxJmKRw?autoplay=1&playsinline=1&rel=0&iv_load_policy=3",
  amazonUrl: officialReleaseLinks.kitsunePt2,
  amazonEmbedUrl: "https://music.amazon.com/embed/B0HC3YQYTN/",
  spotifyUrl: "https://open.spotify.com/track/0aZbNd2vuGDZKKDKPO6vDD",
  spotifyEmbedUrl: "https://open.spotify.com/embed/track/0aZbNd2vuGDZKKDKPO6vDD?theme=0",
  artwork: "/assets/dama-venus/fyc/kitsune-pt-2-fyc-landscape.jpg",
  contact: "contact@damavenus.eu",
  optOutUrl: "mailto:contact@damavenus.eu?subject=STOP%20FYC",
  guidelinesUrl: "https://www.recordingacademy.com/awards/voting-and-solicitation-guidelines"
} as const;
