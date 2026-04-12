import type { AssetMapItem } from "@/lib/types";
import { prioritizedAssets } from "@/content/dama-venus/assets";

const SITE_URL_FALLBACK = "https://damavenus.eu";

export function resolveSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!envUrl) {
    return SITE_URL_FALLBACK;
  }

  try {
    return new URL(envUrl).toString().replace(/\/$/, "");
  } catch {
    return SITE_URL_FALLBACK;
  }
}

export const siteConfig = {
  name: "Dama Venus",
  /** Primary site language for UI, metadata, and document language attributes. */
  primaryLanguage: "en",
  language: "en",
  url: resolveSiteUrl(),
  metadata: {
    title: "Dáma Venus | Official Website | Visual Author & Actress",
    description: "Official platform for Dáma Venus. Berlin-based producer, actress, and Miss Americas. Exploring the after-dark cinematic architecture. New album June 12th."
  },
  brandDescriptor: "Sound • Vision • Reign",
  footerLine: "Dama Venus — Sound. Vision. Reign."
} as const;

/**
 * Per-asset object-position overrides based on focusHint analysis.
 * Portraits with faces → upper portion; landscapes/covers → center.
 */
const assetObjectPositions: Record<string, string> = {
  // ── HOME ──
  "home-lead-portrait":           "center 25%",    // Roma Trevi portrait — figure upper portion, architecture backdrop
  "home-release-cover":           "center center", // album cover — keep title visible
  "home-visual-preview":          "center center", // 16:9 landscape — subject centered
  "home-statement-editorial":     "center center", // 16:9 landscape — negative space for text
  "home-contact-newsletter":      "center center", // cover — central motif
  "home-press-preview":           "center 20%",   // portrait — face with headroom

  // ── MUSIC ──
  "music-current-chapter-cover":  "center center", // 4:5 cover — title safe
  "music-current-chapter-visual": "center center", // 16:9 cinematic
  "music-midnight-signal-cover":  "center 30%",   // 4:5 portrait — face & shoulders upper center
  "music-afterglow-cut-cover":    "center center", // 1:1 square — eyes on horizontal center
  "music-nocturne-line-visual":   "center center", // 16:9 — gesture center-right

  // ── VISUALS ──
  "visuals-cinderela-lead-241":       "center 25%",   // portrait — eyes/torso with breathing room
  "visuals-cinderela-frame-243":      "center 30%",   // portrait — face center & shoulder line
  "visuals-cinderela-frame-288":      "center 35%",   // portrait close — eyes above midpoint
  "visuals-cinderela-landscape-210":  "center center", // 16:9 landscape
  "visuals-uuid-6824":                "center center", // wide landscape
  "visuals-uuid-3493":                "center 30%",   // portrait — face & gaze axis
  "visuals-portrait-tamiris-12":      "center 25%",   // portrait — face upper center
  "visuals-still-unnamed-1":          "center center", // 1:1 square
  "visuals-still-unnamed-2":          "center center", // 1:1 square
  "visuals-still-unnamed-3":          "center center", // 1:1 square
  "visuals-linked-current-chapter":   "center center", // 9:16 tall — subject centered

  // ── ABOUT ──
  "about-intro-entry-portrait-primary":     "center 20%",   // portrait — eyes in upper third
  "about-intro-entry-portrait-secondary":   "center 30%",   // portrait — face & shoulders
  "about-supporting-visual-calm-01":        "center center", // 16:9 landscape
  "about-supporting-visual-calm-02":        "center 25%",   // portrait — face upper center
  "about-supporting-visual-calm-reserve-03":"center 30%",   // portrait — gaze axis centered

  // ── PRESS ──
  "press-featured-portrait-primary":   "center 20%",   // portrait — eye-line upper third
  "press-featured-portrait-secondary": "center 30%",   // portrait — face & shoulders
  "press-editorial-landscape":         "center center", // 16:9 landscape
  "press-detail-still":                "center center", // 1:1 square
  "contact-mood-canvas":               "center center", // mood visual
  "curated-contact-mood-canvas":       "center center", // mood visual
  "curated-release-cover":             "center center", // cover
};

export const assetMap: Record<string, AssetMapItem> = Object.fromEntries(
  prioritizedAssets.map((asset) => [
    asset.id,
    {
      src: asset.finalPath,
      alt: asset.altDraft,
      cropHint: asset.cropHint,
      focusHint: asset.focusHint,
      priority: asset.priority,
      swColorMode: asset.swColorMode,
      overlaySuitability: asset.overlaySuitability,
      role: asset.role,
      copyKey: asset.copyKey,
      objectPosition: assetObjectPositions[asset.id] ?? "center center"
    }
  ])
);
