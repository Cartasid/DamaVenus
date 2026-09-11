import {
  getCtaActionKind,
  type MusicAction,
  type MusicRelease,
  type ReleaseItem,
  type SectionContent,
  validateCta
} from "@/lib/types";
import { officialReleaseLinks } from "@/content/data/official-links";

const musicCtaLabels = {
  listen: "Listen on Amazon Music",
  watch: "Watch Visual",
  explore: "Explore Releases",
  open: "Open",
  viewRelease: "View Release"
} as const;

const buildAction = (kind: MusicAction["kind"], href: string, label: string): MusicAction => ({
  kind,
  href,
  label
});

export const musicIntro: SectionContent = {
  label: "Music",
  headline: "Official Releases",
  subhead: "Verified releases and direct listening links from Dáma Venus."
};

export const musicReleases: MusicRelease[] = [
  {
    id: "lonely-berlin",
    title: "Lonely Berlin",
    subtitle: "Latest Official Single",
    shortText: "Released April 24, 2026 — a Berlin-centered chapter in the after-dark world of Dáma Venus.",
    releaseType: "single",
    status: "active",
    releaseDate: "2026-04-24",
    year: "2026",
    featured: true,
    priority: 1,
    coverAsset: { id: "music-current-chapter-cover" },
    alternateVisualAsset: { id: "music-current-chapter-visual" },
    listeningLinks: [
      buildAction("listen", officialReleaseLinks.lonelyBerlin, musicCtaLabels.listen)
    ],
    primaryCta: buildAction("listen", officialReleaseLinks.lonelyBerlin, musicCtaLabels.listen),
    secondaryCta: buildAction("view-release", "/music#lonely-berlin", musicCtaLabels.viewRelease)
  },
  {
    id: "valentines",
    title: "Valentines",
    subtitle: "Official Single",
    shortText: "A compact 2026 single released February 16, 2026.",
    releaseType: "single",
    status: "active",
    releaseDate: "2026-02-16",
    year: "2026",
    featured: false,
    priority: 2,
    coverAsset: { id: "music-midnight-signal-cover" },
    listeningLinks: [
      buildAction("listen", officialReleaseLinks.valentines, musicCtaLabels.listen)
    ],
    primaryCta: buildAction("listen", officialReleaseLinks.valentines, musicCtaLabels.listen)
  },
  {
    id: "eclipse",
    title: "Eclipse",
    subtitle: "Official Single",
    shortText: "The 2025 single released June 30, 2025.",
    releaseType: "single",
    status: "active",
    releaseDate: "2025-06-30",
    year: "2025",
    featured: false,
    priority: 3,
    coverAsset: { id: "music-afterglow-cut-cover" },
    listeningLinks: [
      buildAction("listen", officialReleaseLinks.eclipse, musicCtaLabels.listen)
    ],
    primaryCta: buildAction("listen", officialReleaseLinks.eclipse, musicCtaLabels.listen)
  },
  {
    id: "close-friend",
    title: "Close Friend",
    subtitle: "Dáma Venus & Kawoury",
    shortText: "A trap and R&B collaboration with Kawoury, released in 2025.",
    releaseType: "single",
    status: "active",
    releaseDate: "2025-01-11",
    year: "2025",
    featured: false,
    priority: 4,
    coverAsset: { id: "music-nocturne-line-visual" },
    listeningLinks: [
      buildAction("listen", officialReleaseLinks.closeFriend, musicCtaLabels.listen)
    ],
    primaryCta: buildAction("listen", officialReleaseLinks.closeFriend, musicCtaLabels.listen)
  }
];

export const musicVisualReleases: MusicRelease[] = [];

export const musicData = {
  intro: musicIntro,
  ctaLabels: musicCtaLabels,
  featuredReleaseId: "lonely-berlin",
  releases: musicReleases,
  visualReleases: musicVisualReleases
} as const;

const fallbackFeatured = musicData.releases[0];
const selectedFeatured =
  musicData.releases.find((release) => release.id === musicData.featuredReleaseId) ??
  fallbackFeatured;

export const musicHero = musicIntro;

export const featuredRelease: ReleaseItem = {
  title: selectedFeatured.title,
  description: selectedFeatured.shortText,
  cta: {
    label: selectedFeatured.primaryCta.label,
    href: selectedFeatured.primaryCta.href
  },
  coverAsset: selectedFeatured.coverAsset
};

function validateMusicActions(releases: MusicRelease[]): void {
  const allActions = releases.flatMap((release) => [
    ...release.listeningLinks,
    ...(release.watchLinks ?? []),
    release.primaryCta,
    ...(release.secondaryCta ? [release.secondaryCta] : [])
  ]);

  for (const action of allActions) {
    validateCta({ label: action.label, href: action.href }, `music action ${action.kind}`);
    const targetKind = getCtaActionKind(action.href);

    if (
      (action.kind === "listen" || action.kind === "watch" || action.kind === "open") &&
      targetKind !== "external"
    ) {
      throw new Error(`Music action "${action.kind}" must target an external destination.`);
    }

    if (
      (action.kind === "view-release" || action.kind === "explore") &&
      targetKind === "mailto"
    ) {
      throw new Error(`Music action "${action.kind}" must not target mailto.`);
    }
  }
}

validateMusicActions([...musicReleases, ...musicVisualReleases]);
