#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

async function listFiles(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function ensureAtLeastOneBuiltCss() {
  const cssDir = path.resolve(projectRoot, '.next/static/css');
  let cssFiles = [];
  try {
    cssFiles = (await listFiles(cssDir)).filter((filePath) => filePath.endsWith('.css'));
  } catch {
    throw new Error('CSS-Datei fehlt: Build-CSS-Verzeichnis fehlt (.next/static/css).');
  }

  if (cssFiles.length < 1) {
    throw new Error('CSS-Datei fehlt: Keine CSS-Datei unter .next/static/css gefunden.');
  }

  const containsTailwindOutput = (cssSource) => {
    const hasUtilitySelector = /(?:^|[}\s])\.[_a-zA-Z][\w-]*(?:\\:[\w-]+)*\s*\{/m.test(cssSource);
    const hasTailwindVariable = /--tw-[\w-]+\s*:/.test(cssSource);
    return hasUtilitySelector && hasTailwindVariable;
  };

  for (const cssFile of cssFiles) {
    const cssSource = await fs.readFile(cssFile, 'utf8');
    if (containsTailwindOutput(cssSource)) {
      return;
    }
  }

  throw new Error('CSS-Datei vorhanden, aber Tailwind-Ausgabe nicht erkannt.');
}

async function ensureHomepageReferencesCssInBuildManifest() {
  const manifestCandidates = [
    { file: '.next/build-manifest.json', keys: ['/', '/index'] },
    { file: '.next/app-build-manifest.json', keys: ['/', '/page'] },
  ];

  for (const candidate of manifestCandidates) {
    const manifestPath = path.resolve(projectRoot, candidate.file);
    let manifest;
    try {
      manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
    } catch {
      continue;
    }

    const pages = manifest?.pages;
    if (!pages || typeof pages !== 'object') {
      continue;
    }

    for (const key of candidate.keys) {
      const assets = pages[key];
      if (Array.isArray(assets) && assets.some((asset) => typeof asset === 'string' && asset.endsWith('.css'))) {
        return;
      }
    }
  }

  throw new Error(
    'Build-Manifest-Check fehlgeschlagen: Startseite referenziert kein CSS-Asset.'
  );
}

async function parsePrioritizedAssets() {
  const assetsTsPath = path.resolve(projectRoot, 'content/dama-venus/assets.ts');
  const source = await fs.readFile(assetsTsPath, 'utf8');
  const objectPattern = /{[\s\S]*?}/g;
  const assets = [];

  for (const objectMatch of source.matchAll(objectPattern)) {
    const objectContent = objectMatch[0];
    const idMatch = objectContent.match(/id:\s*"([^"]+)"/);
    const finalPathMatch = objectContent.match(/finalPath:\s*"([^"]+)"/);
    const sourcePathMatch = objectContent.match(/sourcePath:\s*"([^"]+)"/);
    if (idMatch && finalPathMatch && sourcePathMatch) {
      assets.push({
        id: idMatch[1],
        finalPath: finalPathMatch[1],
        sourcePath: sourcePathMatch[1],
      });
    }
  }

  return assets;
}

async function ensureAllPrioritizedAssetsExist(assets) {
  if (assets.length === 0) {
    throw new Error('Keine priorisierten Assets in content/dama-venus/assets.ts gefunden.');
  }

  const missingIdMappings = referencedAssetIds.filter((id) => !idToFinalPath.has(id));
  const missingFiles = [];
  for (const asset of assets) {
    const finalPath = asset.finalPath;
    const absolutePath = path.resolve(projectRoot, 'public', finalPath.replace(/^\/+/, ''));
    try {
      await fs.access(absolutePath);
    } catch {
      missingFiles.push(
        `id="${asset.id}" finalPath="${asset.finalPath}" sourcePath="${asset.sourcePath}"`
      );
    }
  }

  if (missingFiles.length > 0) {
    throw new Error(
      `Pflicht-Assets fehlen unter public/: ${missingFiles.join('; ')}`
    );
  }
}

async function run() {
  await ensureAtLeastOneBuiltCss();
  const assets = await parsePrioritizedAssets();
  await ensureAllPrioritizedAssetsExist(assets);
  console.log('Production-Artefakte validiert: CSS vorhanden und alle finalPath-Assets unter public/ vorhanden.');
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
