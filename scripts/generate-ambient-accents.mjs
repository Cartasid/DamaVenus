/**
 * Generates the ambient accent colour map used by the hover background effect.
 *
 * For every image referenced by `assetMap` the dominant *vivid* colour is
 * extracted from the real file in `public/` (sharp -> raw RGB -> weighted hue
 * histogram). The result is written to
 * `content/data/ambient-accents.generated.ts` and consumed by
 * `components/utils/image-reveal.tsx`.
 *
 * Re-run after adding or replacing visual assets:
 *   npm run generate:ambient-accents
 *
 * Pass --check to verify the committed map is up to date (used for review/CI);
 * the script then writes nothing and exits non-zero on drift.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { registerHooks } from "node:module";

import sharp from "sharp";

const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUTPUT_FILE = join(PROJECT_ROOT, "content/data/ambient-accents.generated.ts");
const PUBLIC_DIR = join(PROJECT_ROOT, "public");

/** Sample size used for the histogram — large enough to be stable, small enough to stay fast. */
const SAMPLE_SIZE = 128;

/** Pixels below these thresholds carry no usable colour information. */
const MIN_SATURATION = 0.12;
const MIN_LIGHTNESS = 0.06;
const MAX_LIGHTNESS = 0.96;

/** Below this average vividness an image is treated as monochrome. */
const MONOCHROME_THRESHOLD = 0.02;

/** Output normalisation — keeps the hue of the image, but a usable UI range. */
const ACCENT_SATURATION_RANGE = [0.5, 1];
const ACCENT_LIGHTNESS_RANGE = [0.46, 0.62];
const NEUTRAL_SATURATION_RANGE = [0.02, 0.12];
const NEUTRAL_LIGHTNESS = 0.52;

const HUE_BINS = 36;

// Resolve the project's "@/..." TypeScript path alias so the asset map can be
// imported directly instead of duplicating it here.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const basePath = join(PROJECT_ROOT, specifier.slice(2));
      const resolved = [basePath, `${basePath}.ts`, join(basePath, "index.ts")].find((candidate) =>
        existsSync(candidate)
      );
      if (!resolved) {
        throw new Error(`Cannot resolve path alias: ${specifier}`);
      }
      return { shortCircuit: true, url: pathToFileURL(resolved).href };
    }
    return nextResolve(specifier, context);
  }
});

function rgbToHsl(r, g, b) {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const delta = max - min;

  if (delta === 0) {
    return { h: 0, s: 0, l };
  }

  const s = delta / (1 - Math.abs(2 * l - 1));
  let h;
  if (max === rn) {
    h = ((gn - bn) / delta) % 6;
  } else if (max === gn) {
    h = (bn - rn) / delta + 2;
  } else {
    h = (rn - gn) / delta + 4;
  }
  h *= 60;
  if (h < 0) h += 360;

  return { h, s, l };
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let rgb;
  if (h < 60) rgb = [c, x, 0];
  else if (h < 120) rgb = [x, c, 0];
  else if (h < 180) rgb = [0, c, x];
  else if (h < 240) rgb = [0, x, c];
  else if (h < 300) rgb = [x, 0, c];
  else rgb = [c, 0, x];

  return rgb.map((value) => Math.round((value + m) * 255));
}

function toHex([r, g, b]) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Weights a pixel by how "prägnant" (vivid and mid-bright) it is. Very dark,
 * blown-out or washed-out pixels contribute close to nothing.
 */
function vividness(s, l) {
  if (s < MIN_SATURATION || l < MIN_LIGHTNESS || l > MAX_LIGHTNESS) return 0;
  const lightnessWeight = Math.max(0, 1 - Math.abs(l - 0.5) * 1.6);
  return s ** 1.5 * lightnessWeight;
}

export async function extractAccent(filePath) {
  const { data, info } = await sharp(filePath)
    .resize(SAMPLE_SIZE, SAMPLE_SIZE, { fit: "inside", withoutEnlargement: true })
    .flatten({ background: "#000000" })
    .toColorspace("srgb")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const channels = info.channels;
  const pixelCount = info.width * info.height;

  const bins = Array.from({ length: HUE_BINS }, () => ({
    weight: 0,
    x: 0,
    y: 0,
    s: 0,
    l: 0
  }));

  let totalWeight = 0;
  let neutralR = 0;
  let neutralG = 0;
  let neutralB = 0;

  for (let index = 0; index < pixelCount; index += 1) {
    const offset = index * channels;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];

    neutralR += r;
    neutralG += g;
    neutralB += b;

    const { h, s, l } = rgbToHsl(r, g, b);
    const weight = vividness(s, l);
    if (weight === 0) continue;

    totalWeight += weight;

    const bin = bins[Math.min(HUE_BINS - 1, Math.floor((h / 360) * HUE_BINS))];
    const radians = (h * Math.PI) / 180;
    bin.weight += weight;
    bin.x += Math.cos(radians) * weight;
    bin.y += Math.sin(radians) * weight;
    bin.s += s * weight;
    bin.l += l * weight;
  }

  const averageVividness = totalWeight / pixelCount;

  if (averageVividness < MONOCHROME_THRESHOLD) {
    // Essentially monochrome source: keep its own neutral tone instead of
    // inventing a hue, so the page lifts to graphite rather than a false colour.
    const { h, s } = rgbToHsl(neutralR / pixelCount, neutralG / pixelCount, neutralB / pixelCount);
    return {
      hex: toHex(hslToRgb(h, clamp(s, NEUTRAL_SATURATION_RANGE), NEUTRAL_LIGHTNESS)),
      monochrome: true,
      measured: { hue: h, saturation: s, lightness: 0, vividness: averageVividness }
    };
  }

  // Merge the strongest hue bin with its direct neighbours so a hue sitting on a
  // bin border is not split in half.
  let strongestIndex = 0;
  for (let index = 1; index < HUE_BINS; index += 1) {
    if (bins[index].weight > bins[strongestIndex].weight) strongestIndex = index;
  }

  const merged = { weight: 0, x: 0, y: 0, s: 0, l: 0 };
  for (const offset of [-1, 0, 1]) {
    const bin = bins[(strongestIndex + offset + HUE_BINS) % HUE_BINS];
    merged.weight += bin.weight;
    merged.x += bin.x;
    merged.y += bin.y;
    merged.s += bin.s;
    merged.l += bin.l;
  }

  let hue = (Math.atan2(merged.y, merged.x) * 180) / Math.PI;
  if (hue < 0) hue += 360;

  const rawSaturation = merged.s / merged.weight;
  const rawLightness = merged.l / merged.weight;
  const saturation = clamp(rawSaturation, ACCENT_SATURATION_RANGE);
  const lightness = clamp(rawLightness, ACCENT_LIGHTNESS_RANGE);

  return {
    hex: toHex(hslToRgb(hue, saturation, lightness)),
    monochrome: false,
    measured: { hue, saturation: rawSaturation, lightness: rawLightness, vividness: averageVividness }
  };
}

function renderFile(entries) {
  const lines = entries.map(
    ({ src, hex, monochrome }, index) =>
      `  "${src}": "${hex}"${index < entries.length - 1 ? "," : ""}${monochrome ? " // monochrome source" : ""}`
  );

  return `// GENERATED FILE — do not edit by hand.
// Source of truth: scripts/generate-ambient-accents.mjs (npm run generate:ambient-accents)
//
// Dominant vivid colour per image asset, extracted from the real files in
// public/. Used by the hover ambient background effect.

export const ambientAccentBySrc: Record<string, string> = {
${lines.join("\n")}
};
`;
}

async function main() {
  const checkOnly = process.argv.includes("--check");

  const { assetMap } = await import(pathToFileURL(join(PROJECT_ROOT, "content/data/site.config.ts")).href);

  const sources = [...new Set(Object.values(assetMap).map((asset) => asset.src))]
    .filter((src) => /\.(jpe?g|png|webp|avif)$/i.test(src))
    .sort();

  const entries = [];
  const missing = [];

  for (const src of sources) {
    const filePath = join(PUBLIC_DIR, src.replace(/^\//, ""));
    if (!existsSync(filePath)) {
      missing.push(src);
      continue;
    }
    const { hex, monochrome, measured } = await extractAccent(filePath);
    entries.push({ src, hex, monochrome, measured });
  }

  if (process.argv.includes("--report")) {
    for (const entry of entries) {
      const { hue, saturation, vividness: vivid } = entry.measured;
      console.log(
        `${entry.hex} ${entry.monochrome ? "MONO" : "    "} h=${hue.toFixed(0).padStart(3)} s=${saturation.toFixed(2)} vivid=${vivid.toFixed(3)}  ${entry.src}`
      );
    }
    return;
  }

  if (entries.length === 0) {
    throw new Error("No image assets could be processed — is public/assets prepared?");
  }

  const output = renderFile(entries);

  if (checkOnly) {
    const current = existsSync(OUTPUT_FILE) ? readFileSync(OUTPUT_FILE, "utf8") : "";
    if (current !== output) {
      console.error("[ambient-accents] generated map is out of date — run: npm run generate:ambient-accents");
      process.exitCode = 1;
      return;
    }
    console.log(`[ambient-accents] up to date (${entries.length} assets)`);
    return;
  }

  writeFileSync(OUTPUT_FILE, output, "utf8");
  console.log(`[ambient-accents] wrote ${entries.length} accent colours to ${OUTPUT_FILE}`);
  if (missing.length > 0) {
    console.warn(`[ambient-accents] skipped ${missing.length} asset(s) without a file in public/:`);
    for (const src of missing) console.warn(`  - ${src}`);
  }
}

// Only run when executed directly; `extractAccent` stays importable for checks.
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
