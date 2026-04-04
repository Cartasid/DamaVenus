/**
 * Copies static assets into the standalone output directory after `next build`.
 *
 * In Next.js standalone mode (`output: "standalone"`), the generated server.js
 * does NOT serve /_next/static/ or /public/ by itself — those directories must
 * be present alongside server.js inside .next/standalone/.
 *
 * This script must run after `next build` and before the server starts.
 */

import { cpSync, existsSync } from "fs";
import { resolve } from "path";

const root = new URL("..", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");

function copy(src, dest) {
  const srcPath = resolve(root, src);
  const destPath = resolve(root, dest);
  if (!existsSync(srcPath)) {
    console.warn(`[copy-standalone-static] Skipped (not found): ${src}`);
    return;
  }
  cpSync(srcPath, destPath, { recursive: true });
  console.log(`[copy-standalone-static] ${src} → ${dest}`);
}

copy(".next/static", ".next/standalone/.next/static");
copy("public", ".next/standalone/public");
