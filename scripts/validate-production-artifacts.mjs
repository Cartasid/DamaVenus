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
    throw new Error('Build-CSS-Verzeichnis fehlt: .next/static/css');
  }

  if (cssFiles.length < 1) {
    throw new Error('Keine CSS-Datei unter .next/static/css gefunden.');
  }
}

async function parsePrioritizedAssets() {
  const assetsTsPath = path.resolve(projectRoot, 'content/dama-venus/assets.ts');
  const source = await fs.readFile(assetsTsPath, 'utf8');
  const objectPattern = /{[\s\S]*?}/g;
  const idToFinalPath = new Map();

  for (const objectMatch of source.matchAll(objectPattern)) {
    const objectContent = objectMatch[0];
    const idMatch = objectContent.match(/id:\s*"([^"]+)"/);
    const finalPathMatch = objectContent.match(/finalPath:\s*"([^"]+)"/);
    if (idMatch && finalPathMatch) {
      idToFinalPath.set(idMatch[1], finalPathMatch[1]);
    }
  }

  return idToFinalPath;
}

async function parseHomepageAssetIds() {
  const homepageDataPath = path.resolve(projectRoot, 'content/data/homepage.data.ts');
  const source = await fs.readFile(homepageDataPath, 'utf8');
  const matches = [
    ...source.matchAll(/assetId:\s*"([^"]+)"/g),
    ...source.matchAll(/coverAsset:\s*\{\s*id:\s*"([^"]+)"\s*\}/g),
    ...source.matchAll(/asset:\s*\{\s*id:\s*"([^"]+)"\s*\}/g),
  ];

  return [...new Set(matches.map((m) => m[1]))];
}

async function ensureHomepageCriticalAssets(idToFinalPath, homepageAssetIds) {
  if (homepageAssetIds.length === 0) {
    throw new Error('Keine Startseiten-Asset-IDs in content/data/homepage.data.ts gefunden.');
  }

  const missingIdMappings = homepageAssetIds.filter((id) => !idToFinalPath.has(id));
  if (missingIdMappings.length > 0) {
    throw new Error(
      `assetMap-Referenzen ohne Zielpfad gefunden: ${missingIdMappings.join(', ')}`
    );
  }

  const missingFiles = [];
  for (const id of homepageAssetIds) {
    const finalPath = idToFinalPath.get(id);
    const absolutePath = path.resolve(projectRoot, 'public', finalPath.replace(/^\/+/, ''));
    try {
      await fs.access(absolutePath);
    } catch {
      missingFiles.push(`${id} -> ${finalPath}`);
    }
  }

  if (missingFiles.length > 0) {
    throw new Error(
      `Kritische Startseiten-Assets fehlen unter public/assets/dama-venus: ${missingFiles.join('; ')}`
    );
  }
}

async function run() {
  await ensureAtLeastOneBuiltCss();
  const idToFinalPath = await parsePrioritizedAssets();
  const homepageAssetIds = await parseHomepageAssetIds();
  await ensureHomepageCriticalAssets(idToFinalPath, homepageAssetIds);
  console.log('Production-Artefakte validiert: CSS vorhanden, kritische Homepage-Assets vorhanden, IDs auf Dateien auflösbar.');
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
