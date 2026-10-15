import { officialReleaseLinks } from "@/content/data/official-links";

// Public copy and recording URL: pics/Dama_Venus_FYC_Send_To_Member_v5_Safe_Font.
// The owner explicitly requested the entry identifiers and rights information
// below for this website. These are not a claim of nomination or Academy approval.
export const fycData = {
  title: "Kitsune Pt 2",
  artist: "Dama Venus",
  category: "Best Rap Performance",
  entryNumber: "011293",
  webId: "10149486",
  description:
    "First-person lyrics about desire and connection move through a nocturnal world of constellations, lanterns and midnight, anchored by the recurring ‘no drama, no stress’ refrain.",
  videoUrl: "https://youtu.be/h6OUAxJmKRw",
  videoEmbedUrl:
    "https://www.youtube-nocookie.com/embed/h6OUAxJmKRw?autoplay=1&playsinline=1&rel=0&iv_load_policy=3",
  amazonUrl: officialReleaseLinks.kitsunePt2,
  amazonEmbedUrl: "https://music.amazon.com/embed/B0HC3YQYTN/",
  spotifyUrl: "https://open.spotify.com/track/0aZbNd2vuGDZKKDKPO6vDD",
  spotifyEmbedUrl: "https://open.spotify.com/embed/track/0aZbNd2vuGDZKKDKPO6vDD?theme=0",
  artwork: "/assets/dama-venus/fyc/kitsune-pt-2-fyc-landscape.jpg",
  contact: "contact@damavenus.eu",
  clearance: "100% One-Stop (Master & Publishing controlled by Dama Venus Productions)",
  pro: "BMI (Application Submitted / Pending)",
  base: "Berlin, Germany (Natürlich IP Assets)"
} as const;
