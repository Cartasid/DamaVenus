import type { AssetRole, SectionContent } from "@/lib/types";

export type ContactContent = SectionContent & {
  accent?: {
    assetId: string;
    alt?: string;
    role?: AssetRole;
  };
};

export const contactContent: ContactContent = {
  headline: "Let’s Create the Next Chapter.",
  subhead: "For bookings, collaborations, and selected requests.",
  cta: {
    label: "Send Inquiry",
    href: "mailto:booking@damavenus.com"
  },
  accent: {
    assetId: "home-contact-newsletter",
    role: "decorative"
  }
};
