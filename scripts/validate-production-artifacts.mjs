#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectRoot = process.cwd();
const imageFormatsByExtension = new Map([
  ['.jpg', 'jpeg'],
  ['.jpeg', 'jpeg'],
  ['.png', 'png'],
  ['.webp', 'webp'],
]);

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
    if (containsTailwindOutput(cssSource)) return;
  }

  throw new Error('CSS-Datei vorhanden, aber Tailwind-Ausgabe nicht erkannt.');
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

async function validateImageFile(absolutePath) {
  const extension = path.extname(absolutePath).toLowerCase();
  const expectedFormat = imageFormatsByExtension.get(extension);
  if (!expectedFormat) return;

  const metadata = await sharp(absolutePath, { failOn: 'error' }).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error('Bilddimensionen fehlen oder sind ungültig.');
  }
  if (metadata.format !== expectedFormat) {
    throw new Error(`Dateiendung ${extension} enthält Format ${metadata.format ?? 'unbekannt'}.`);
  }

  await sharp(absolutePath, { failOn: 'error' })
    .resize({ width: 1, height: 1, fit: 'inside', withoutEnlargement: true })
    .toBuffer();
}

async function ensureAllPrioritizedAssetsAreValid(assets) {
  if (assets.length === 0) {
    throw new Error('Keine priorisierten Assets in content/dama-venus/assets.ts gefunden.');
  }

  const failures = [];
  const uniqueFinalPaths = new Map();
  for (const asset of assets) {
    if (!uniqueFinalPaths.has(asset.finalPath)) uniqueFinalPaths.set(asset.finalPath, asset);
  }

  for (const asset of uniqueFinalPaths.values()) {
    const absolutePath = path.resolve(
      projectRoot,
      'public',
      asset.finalPath.replace(/^\/+/, ''),
    );

    try {
      const stat = await fs.stat(absolutePath);
      if (!stat.isFile() || stat.size <= 0) {
        throw new Error('Datei fehlt, ist leer oder ist keine reguläre Datei.');
      }
      await validateImageFile(absolutePath);
    } catch (error) {
      failures.push(
        `id="${asset.id}" finalPath="${asset.finalPath}" sourcePath="${asset.sourcePath}": ${error.message}`,
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(`Ungültige Produktions-Assets: ${failures.join('; ')}`);
  }
}

async function run() {
  await ensureAtLeastOneBuiltCss();
  const assets = await parsePrioritizedAssets();
  await ensureAllPrioritizedAssetsAreValid(assets);
  console.log(
    'Production-Artefakte validiert: CSS vorhanden und alle priorisierten Bilddateien existieren und sind dekodierbar.',
  );
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
