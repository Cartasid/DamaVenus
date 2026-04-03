import type { ReleaseItem, SectionContent } from "@/lib/types";

export const musicHero: SectionContent = {
  headline: "Current Chapter",
  subhead: "New music, framed in shadow and light."
};

export const featuredRelease: ReleaseItem = {
  title: "Current Chapter",
  description: "New music, framed in shadow and light.",
  cta: {
    label: "Listen Now",
    href: "/music"
  },
  coverAsset: { id: "home-release-cover" }
};
