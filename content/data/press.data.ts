import type { PressMaterialItem, SectionContent } from "@/lib/types";

export const pressContent: SectionContent = {
  headline: "Press & EPK",
  subhead: "Images, bio, and release facts for press inquiries.",
  cta: {
    label: "Open EPK",
    href: "/press"
  }
};

export const pressMaterials: PressMaterialItem[] = [
  {
    id: "epk",
    title: "Electronic Press Kit",
    description: "Approved media material for editorial use.",
    asset: { id: "press-epk" }
  }
];
