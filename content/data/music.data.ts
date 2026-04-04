import { getCtaActionKind, type MusicAction, type MusicRelease, type ReleaseItem, type SectionContent, validateCta } from "@/lib/types";

const musicCtaLabels = {
  listen: "Listen Now",
  watch: "Watch Visual",
  explore: "Explore Releases",
  open: "Open",
  viewRelease: "View Release"
} as const;

const platformLinks = {
  spotify: "https://open.spotify.com/",
  appleMusic: "https://music.apple.com/",
  youtube: "https://www.youtube.com/",
  soundcloud: "https://soundcloud.com/"
} as const;

const buildAction = (kind: MusicAction["kind"], href: string, label: string): MusicAction => ({
  kind,
  href,
  label
});

export const musicIntro: SectionContent = {
  label: "Music",
  headline: "Current Chapter",
  subhead: "New music, framed in shadow and light."
};

export const musicReleases: MusicRelease[] = [
  {
    id: "current-chapter",
    title: "Current Chapter",
    subtitle: "Featured Single",
    shortText: "Lead release of the current phase with the clearest listen-first CTA.",
    releaseType: "single",
    status: "active",
    releaseDate: "2026-03-14",
    year: "2026",
    featured: true,
    priority: 1,
    coverAsset: { id: "music-current-chapter-cover" },
    alternateVisualAsset: { id: "music-current-chapter-visual" },
    listeningLinks: [
      buildAction("listen", platformLinks.spotify, musicCtaLabels.listen),
      buildAction("open", platformLinks.appleMusic, musicCtaLabels.open)
    ],
    watchLinks: [buildAction("watch", platformLinks.youtube, musicCtaLabels.watch)],
    primaryCta: buildAction("listen", platformLinks.spotify, musicCtaLabels.listen),
    secondaryCta: buildAction("view-release", "/music#current-chapter", musicCtaLabels.viewRelease)
  },
  {
    id: "midnight-signal",
    title: "Midnight Signal",
    subtitle: "Selected Single",
    shortText: "Secondary release for continuity in the release stack.",
    releaseType: "single",
    status: "active",
    year: "2025",
    featured: false,
    priority: 2,
    coverAsset: { id: "music-midnight-signal-cover" },
    listeningLinks: [
      buildAction("listen", platformLinks.spotify, musicCtaLabels.listen),
      buildAction("open", platformLinks.soundcloud, musicCtaLabels.open)
    ],
    primaryCta: buildAction("listen", platformLinks.spotify, musicCtaLabels.listen),
    secondaryCta: buildAction("explore", "/music#selected-releases", musicCtaLabels.explore)
  },
  {
    id: "afterglow-cut",
    title: "Afterglow Cut",
    subtitle: "Coming Soon",
    shortText: "Prepared as upcoming item with status-driven CTA behavior.",
    releaseType: "upcoming",
    status: "coming-soon",
    year: "2026",
    featured: false,
    priority: 3,
    coverAsset: { id: "music-afterglow-cut-cover" },
    listeningLinks: [buildAction("explore", "/contact", "Get Update")],
    primaryCta: buildAction("explore", "/contact", "Get Update")
  }
];

export const musicVisualReleases: MusicRelease[] = [
  {
    id: "nocturne-line-visual",
    title: "Nocturne Line",
    subtitle: "Visual Release",
    shortText: "Visual-led module for watch CTA and cinematic framing.",
    releaseType: "visual-release",
    status: "active",
    year: "2025",
    featured: false,
    priority: 4,
    coverAsset: { id: "music-nocturne-line-visual" },
    listeningLinks: [buildAction("open", platformLinks.youtube, musicCtaLabels.open)],
    watchLinks: [buildAction("watch", platformLinks.youtube, musicCtaLabels.watch)],
    primaryCta: buildAction("watch", platformLinks.youtube, musicCtaLabels.watch),
    secondaryCta: buildAction("view-release", "/music#visual-releases", musicCtaLabels.viewRelease)
  }
];

export const musicData = {
  intro: musicIntro,
  ctaLabels: musicCtaLabels,
  featuredReleaseId: "current-chapter",
  releases: musicReleases,
  visualReleases: musicVisualReleases
} as const;

const fallbackFeatured = musicData.releases[0];
const selectedFeatured = musicData.releases.find((release) => release.id === musicData.featuredReleaseId) ?? fallbackFeatured;

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
    if ((action.kind === "listen" || action.kind === "watch" || action.kind === "open") && targetKind !== "external") {
      throw new Error(`Music action "${action.kind}" must target an external destination.`);
    }
    if ((action.kind === "view-release" || action.kind === "explore") && targetKind === "mailto") {
      throw new Error(`Music action "${action.kind}" must not target mailto.`);
    }
  }
}

validateMusicActions([...musicReleases, ...musicVisualReleases]);
