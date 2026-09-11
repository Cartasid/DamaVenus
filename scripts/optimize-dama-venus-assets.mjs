#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const CONFIG = {
  assetDefinitionPath: path.resolve("content/dama-venus/assets.ts"),
  publicRoot: path.resolve("public"),
  maxEdge: 2400,
  minBytesForReencode: 750 * 1024,
  jpegQuality: 88,
  webpQuality: 88
};

function extractPublicAssetPaths(source) {
  return [...source.matchAll(/finalPath:\s*"([^"]+)"/g)]
    .map((match) => match[1])
    .filter(Boolean);
}

function resolvePublicPath(publicPath) {
  return path.join(CONFIG.publicRoot, publicPath.replace(/^\/+/, ""));
}

async function optimizeAsset(publicPath) {
  const absolutePath = resolvePublicPath(publicPath);
  const extension = path.extname(absolutePath).toLowerCase();

  if (![".jpg", ".jpeg", ".webp"].includes(extension)) {
    return { status: "skipped-format", publicPath };
  }

  let stat;
  try {
    stat = await fs.stat(absolutePath);
  } catch {
    return { status: "missing", publicPath };
  }

  const metadata = await sharp(absolutePath, { failOn: "none" }).metadata();
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;
  const needsResize = Math.max(width, height) > CONFIG.maxEdge;
  const needsReencode = stat.size > CONFIG.minBytesForReencode;

  if (!needsResize && !needsReencode) {
    return { status: "unchanged", publicPath, bytes: stat.size, width, height };
  }

  const temporaryPath = `${absolutePath}.optimized-${process.pid}`;
  let pipeline = sharp(absolutePath, { failOn: "none" });

  if (needsResize) {
    pipeline = pipeline.resize({
      width: CONFIG.maxEdge,
      height: CONFIG.maxEdge,
      fit: "inside",
      withoutEnlargement: true
    });
  }

  if (extension === ".webp") {
    pipeline = pipeline.webp({ quality: CONFIG.webpQuality, effort: 4 });
  } else {
    pipeline = pipeline.jpeg({ quality: CONFIG.jpegQuality, mozjpeg: true });
  }

  const output = await pipeline.toFile(temporaryPath);

  if (!needsResize && output.size >= stat.size) {
    await fs.unlink(temporaryPath);
    return { status: "kept-original", publicPath, bytes: stat.size, width, height };
  }

  await fs.rename(temporaryPath, absolutePath);
  return {
    status: "optimized",
    publicPath,
    beforeBytes: stat.size,
    afterBytes: output.size,
    width: output.width,
    height: output.height
  };
}

async function run() {
  const definitionSource = await fs.readFile(CONFIG.assetDefinitionPath, "utf8");
  const publicPaths = [...new Set(extractPublicAssetPaths(definitionSource))].sort();
  const results = [];

  for (const publicPath of publicPaths) {
    try {
      results.push(await optimizeAsset(publicPath));
    } catch (error) {
      console.warn(`[asset-optimize] ${publicPath}: ${error.message}`);
      results.push({ status: "error", publicPath });
    }
  }

  const optimized = results.filter((result) => result.status === "optimized");
  const beforeBytes = optimized.reduce((sum, result) => sum + (result.beforeBytes ?? 0), 0);
  const afterBytes = optimized.reduce((sum, result) => sum + (result.afterBytes ?? 0), 0);

  console.log(
    `[asset-optimize] ${optimized.length}/${publicPaths.length} assets optimized; ` +
      `${beforeBytes} -> ${afterBytes} bytes for changed files.`
  );
}

run().catch((error) => {
  console.error("[asset-optimize] Fatal error:", error);
  process.exitCode = 1;
});
