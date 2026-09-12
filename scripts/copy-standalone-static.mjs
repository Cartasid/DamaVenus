/**
 * Prepares the self-contained Next.js standalone runtime after `next build`.
 *
 * The production server only needs:
 * - .next/static
 * - public files referenced by the application
 * - the files already traced into .next/standalone
 *
 * The asset preparation pipeline intentionally creates many high-resolution
 * working derivatives under public/assets/dama-venus. Copying that complete
 * tree into the runtime image wastes disk space and previously made the small
 * production host run out of space during Docker builds.
 */

import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { dirname, relative, resolve } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const publicRoot = resolve(root, "public");
const standaloneRoot = resolve(root, ".next/standalone");
const standalonePublic = resolve(standaloneRoot, "public");
const standaloneStatic = resolve(standaloneRoot, ".next/static");

function ensureExists(path, label) {
  if (!existsSync(path)) {
    throw new Error(`[copy-standalone-static] Missing ${label}: ${path}`);
  }
}

function copyDirectory(src, dest) {
  ensureExists(src, "source directory");
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
}

function copyRequiredPublicFile(relativePath) {
  const normalized = relativePath.replace(/^\/+/, "");
  const src = resolve(publicRoot, normalized);
  const dest = resolve(standalonePublic, normalized);
  ensureExists(src, `required public asset ${normalized}`);
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest);
}

function parsePrioritizedAssetPaths() {
  const sourcePath = resolve(root, "content/dama-venus/assets.ts");
  const source = readFileSync(sourcePath, "utf8");
  const paths = new Set();

  for (const match of source.matchAll(/finalPath:\s*"([^"]+)"/g)) {
    paths.add(match[1].replace(/^\/+/, ""));
  }

  if (paths.size === 0) {
    throw new Error("[copy-standalone-static] No prioritized asset paths found.");
  }

  return paths;
}

// Start from a clean standalone static/public payload so stale files from an
// earlier build cannot silently survive a deployment.
rmSync(standaloneStatic, { recursive: true, force: true });
rmSync(standalonePublic, { recursive: true, force: true });

copyDirectory(resolve(root, ".next/static"), standaloneStatic);

// Preserve ordinary public files (favicons, OG images, etc.) while excluding
// the large generated Dama Venus asset workspace. Required Dama Venus files
// are copied explicitly below.
cpSync(publicRoot, standalonePublic, {
  recursive: true,
  filter(src) {
    const rel = relative(publicRoot, src).replaceAll("\\", "/");
    return !(
      rel === "assets/dama-venus" ||
      rel.startsWith("assets/dama-venus/")
    );
  },
});

const runtimeAssets = parsePrioritizedAssetPaths();

// Public files referenced directly instead of through prioritizedAssets.
for (const path of [
  "assets/dama-venus/docs/dama-venus-epk.pdf",
  "assets/dama-venus/docs/dama-venus-epk-en.pdf",
  "assets/dama-venus/press/dv_press_epk_document_v01.pdf",
  "assets/dama-venus/press/press-hero-bnj7p-v01.jpg",
  "assets/dama-venus/video/lonely-berlin-day-1.mp4",
  "assets/dama-venus/visuals/dv_visuals_cinderela_hover_video_v01.mp4",
  "assets/dama-venus/visuals/dv_visuals_still_new_left_v02.jpeg",
  "assets/dama-venus/visuals/dv_visuals_still_new_right_v02.jpeg",
]) {
  runtimeAssets.add(path);
}

for (const assetPath of [...runtimeAssets].sort()) {
  copyRequiredPublicFile(assetPath);
}

console.log(
  `[copy-standalone-static] .next/static + ${runtimeAssets.size} required Dama Venus assets → .next/standalone`,
);
