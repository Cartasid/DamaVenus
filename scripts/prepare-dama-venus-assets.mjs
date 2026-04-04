#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import sharp from 'sharp';

const CONFIG = {
  sourceDir: path.resolve('pics'),
  outputRootDir: path.resolve('public/assets/dama-venus'),
  outputMapJsonPath: path.resolve('public/assets/dama-venus/asset-map.json'),
  outputMapTsPath: path.resolve('public/assets/dama-venus/asset-map.ts'),
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.heic'],
  bereiche: [
    { key: 'homepage', keywords: ['home', 'hero', 'spotify_canvas'] },
    { key: 'visuals', keywords: ['cinderela', 'gemini', 'unnamed'] },
    { key: 'music', keywords: ['music', 'release', 'cover', 'spotify'] },
    { key: 'about', keywords: ['portrait', 'tamiris'] },
    { key: 'press', keywords: ['epk', 'press'] },
    { key: 'contact', keywords: ['contact'] },
  ],
  defaultBereich: 'visuals',
  motivRules: [
    { key: 'cinderela', keywords: ['cinderela'] },
    { key: 'tamiris', keywords: ['tamiris'] },
    { key: 'spotify-canvas', keywords: ['spotify_canvas'] },
    { key: 'portrait', keywords: ['portrait'] },
    { key: 'generated', keywords: ['gemini_generated'] },
  ],
  defaultMotiv: 'editorial',
  priorityPatterns: ['cinderela', 'tamiris', 'spotify_canvas', 'img_'],
  qualities: {
    hero: 90,
    portrait: 88,
    square: 86,
    landscape: 88,
    tall: 86,
    base: 90,
  },
  sizes: {
    hero: { width: 2400, height: 1350 },
    portrait: { width: 1600, height: 2000 },
    square: { width: 1600, height: 1600 },
    landscape: { width: 2000, height: 1125 },
    tall: { width: 1350, height: 1800 },
    base: { width: null, height: null },
  },
  variantPolicy: {
    prioritized: ['hero', 'portrait', 'square', 'landscape', 'tall'],
    default: ['portrait', 'landscape'],
  },
};

const counters = {
  found: 0,
  processed: 0,
  skipped: 0,
  errors: 0,
};

const heicStatus = {
  supported: false,
  selectedTool: null,
  fallbackUsed: false,
  skipped: 0,
  nonBlockingSkips: 0,
  todo: [],
};

const mapping = {
  generatedAt: null,
  config: {
    allowedExtensions: CONFIG.allowedExtensions,
    qualities: CONFIG.qualities,
    sizes: CONFIG.sizes,
    priorityPatterns: CONFIG.priorityPatterns,
    variantPolicy: CONFIG.variantPolicy,
  },
  heicStatus,
  items: [],
};

async function walkDirRecursive(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkDirRecursive(absolutePath)));
    } else if (entry.isFile()) {
      files.push(absolutePath);
    }
  }

  return files;
}

function normalizeSlug(value) {
  return value
    .normalize('NFKD')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function pickByKeywords(input, rules, fallback) {
  for (const rule of rules) {
    if (rule.keywords.some((keyword) => input.includes(keyword))) {
      return rule.key;
    }
  }
  return fallback;
}

function detectBereich(baseNameNormalized) {
  return pickByKeywords(baseNameNormalized, CONFIG.bereiche, CONFIG.defaultBereich);
}

function detectMotiv(baseNameNormalized) {
  return pickByKeywords(baseNameNormalized, CONFIG.motivRules, CONFIG.defaultMotiv);
}

function isPrioritized(baseNameNormalized) {
  return CONFIG.priorityPatterns.some((pattern) => baseNameNormalized.includes(pattern));
}

function toPositionalIndex(value) {
  return String(value).padStart(3, '0');
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function copyVariant(sourcePath, targetPath) {
  await ensureDir(path.dirname(targetPath));
  await fs.copyFile(sourcePath, targetPath);
}

function runToolCommand(command, args) {
  return new Promise((resolve) => {
    const child = spawn(command, args, { stdio: 'ignore' });
    child.on('error', () => resolve(false));
    child.on('close', (code) => resolve(code === 0));
  });
}

async function detectHeicTool() {
  const candidates = [
    { name: 'magick', type: 'magick' },
    { name: 'convert', type: 'convert' },
    { name: 'heif-convert', type: 'heif-convert' },
    { name: 'sips', type: 'sips' },
  ];

  for (const candidate of candidates) {
    const available = await runToolCommand('which', [candidate.name]);
    if (available) {
      return candidate;
    }
  }

  return null;
}

async function processHeicVariant(sourcePath, targetPath, tool) {
  await ensureDir(path.dirname(targetPath));
  if (tool.type === 'magick' || tool.type === 'convert') {
    return runToolCommand(tool.name, [sourcePath, targetPath]);
  }
  if (tool.type === 'heif-convert') {
    return runToolCommand(tool.name, [sourcePath, targetPath]);
  }
  if (tool.type === 'sips') {
    return runToolCommand(tool.name, ['-s', 'format', 'jpeg', sourcePath, '--out', targetPath]);
  }
  return false;
}

async function processSharpDerivative(sourcePath, targetPath, options = {}) {
  await ensureDir(path.dirname(targetPath));

  let instance = sharp(sourcePath, { failOn: 'none' });
  const metadata = await instance.metadata();

  if (options.resize) {
    instance = instance.resize(options.resize);
  }

  if (options.format === 'jpeg') {
    instance = instance.jpeg({
      quality: options.quality ?? 90,
      mozjpeg: true,
    });
  } else if (options.format === 'webp') {
    instance = instance.webp({
      quality: options.quality ?? 90,
    });
  }

  const output = await instance.toFile(targetPath);

  return {
    sourceWidth: metadata.width ?? null,
    sourceHeight: metadata.height ?? null,
    width: output.width ?? null,
    height: output.height ?? null,
    format: output.format ?? null,
    bytes: output.size ?? null,
  };
}

async function canProcessHeicWithSharp(sourcePath) {
  try {
    await sharp(sourcePath)
      .resize({ width: 1, height: 1, fit: 'inside' })
      .jpeg({ quality: 60 })
      .toBuffer();
    return true;
  } catch (_error) {
    return false;
  }
}

function buildTsMapContent(mapObject) {
  return [
    '// This file is generated by scripts/prepare-dama-venus-assets.mjs',
    'export const damaVenusAssetMap = ' + JSON.stringify(mapObject, null, 2) + ' as const;',
    '',
    'export default damaVenusAssetMap;',
    '',
  ].join('\n');
}

async function run() {
  await ensureDir(CONFIG.outputRootDir);
  const detectedHeicTool = await detectHeicTool();
  if (detectedHeicTool) {
    heicStatus.supported = true;
    heicStatus.selectedTool = detectedHeicTool.name;
  } else {
    heicStatus.fallbackUsed = true;
    heicStatus.todo = [
      'HEIC-Support-Tooling installieren (magick/convert/heif-convert/sips).',
      'HEIC-Dateien in der Pipeline erneut verarbeiten.',
    ];
  }

  let sourceFiles = [];
  try {
    sourceFiles = await walkDirRecursive(CONFIG.sourceDir);
  } catch (error) {
    counters.errors += 1;
    console.error('[error] Konnte Quellordner nicht lesen:', error.message);
    process.exitCode = 1;
    return;
  }

  const relevantFiles = sourceFiles.filter((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return CONFIG.allowedExtensions.includes(ext);
  });
  relevantFiles.sort((a, b) => a.localeCompare(b));

  counters.found = relevantFiles.length;

  const globalPerBereichIndex = new Map();
  const versionCounter = new Map();

  for (const sourcePath of relevantFiles) {
    const ext = path.extname(sourcePath).toLowerCase();
    const baseName = path.basename(sourcePath, path.extname(sourcePath));
    const normalizedBaseName = normalizeSlug(baseName);

    if (!normalizedBaseName) {
      counters.skipped += 1;
      mapping.items.push({
        source: path.relative(process.cwd(), sourcePath),
        status: 'skipped',
        reason: 'Leerer normalisierter Dateiname',
      });
      continue;
    }

    const bereich = detectBereich(normalizedBaseName);
    const motiv = detectMotiv(normalizedBaseName);
    const indexKey = `${bereich}:${motiv}`;
    const nextIndex = (globalPerBereichIndex.get(indexKey) || 0) + 1;
    globalPerBereichIndex.set(indexKey, nextIndex);

    const prioritized = isPrioritized(normalizedBaseName);
    const variants = prioritized ? CONFIG.variantPolicy.prioritized : CONFIG.variantPolicy.default;
    const itemResult = {
      source: path.relative(process.cwd(), sourcePath),
      normalized: {
        bereich,
        motiv,
        slug: normalizedBaseName,
        index: toPositionalIndex(nextIndex),
      },
      prioritized,
      master: [],
      variants: [],
      status: 'processed',
    };

    let assetHasError = false;
    let assetHasSkip = false;

    const versionBaseKey = `${bereich}:${motiv}:${normalizedBaseName}`;
    const nextVersion = (versionCounter.get(versionBaseKey) || 0) + 1;
    versionCounter.set(versionBaseKey, nextVersion);
    const version = `v${String(nextVersion).padStart(2, '0')}`;

    const baseDir = path.join(CONFIG.outputRootDir, bereich, motiv);

    const heicFallbackSourcePath = path.join(
      baseDir,
      `${normalizedBaseName}-master-heic-fallback-${version}.jpg`,
    );
    let sourceForVariants = sourcePath;

    if (ext === '.heic') {
      const sharpCanProcessHeic = await canProcessHeicWithSharp(sourcePath);
      if (sharpCanProcessHeic) {
        heicStatus.supported = true;
        heicStatus.selectedTool = 'sharp';
      } else if (!detectedHeicTool) {
        heicStatus.skipped += 1;
        heicStatus.nonBlockingSkips += 1;
        assetHasSkip = true;
        itemResult.status = 'skipped-heic';
        mapping.items.push(itemResult);
        counters.skipped += 1;
        continue;
      } else {
        const converted = await processHeicVariant(sourcePath, heicFallbackSourcePath, detectedHeicTool);
        if (!converted) {
          counters.errors += 1;
          itemResult.status = 'error';
          itemResult.variants.push({
            variant: 'heic-fallback',
            target: path.relative(process.cwd(), heicFallbackSourcePath),
            error: `HEIC-Verarbeitung mit ${detectedHeicTool.name} fehlgeschlagen`,
          });
          mapping.items.push(itemResult);
          counters.skipped += 1;
          continue;
        }
        heicStatus.supported = true;
        heicStatus.selectedTool = detectedHeicTool.name;
        sourceForVariants = heicFallbackSourcePath;
      }
    }

    const masterTargets = [
      {
        kind: 'master-jpeg',
        format: 'jpeg',
        ext: '.jpg',
      },
      {
        kind: 'master-webp',
        format: 'webp',
        ext: '.webp',
      },
    ];

    for (const master of masterTargets) {
      const masterFileName = `${normalizedBaseName}-${master.kind}-${version}${master.ext}`;
      const masterPath = path.join(baseDir, masterFileName);
      try {
        const result = await processSharpDerivative(sourceForVariants, masterPath, {
          format: master.format,
          quality: CONFIG.qualities.base,
        });
        itemResult.master.push({
          kind: master.kind,
          target: path.relative(process.cwd(), masterPath),
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        });
      } catch (error) {
        counters.errors += 1;
        assetHasError = true;
        itemResult.status = 'error';
        itemResult.master.push({
          kind: master.kind,
          target: path.relative(process.cwd(), masterPath),
          error: error.message,
        });
      }
    }

    for (const variant of variants) {
      const fileName = `${normalizedBaseName}-${variant}-${version}.jpg`;
      const targetPath = path.join(baseDir, fileName);
      const relativeTargetPath = path.relative(process.cwd(), targetPath);

      try {
        const derivative = await processSharpDerivative(sourceForVariants, targetPath, {
          resize: {
            width: CONFIG.sizes[variant]?.width ?? undefined,
            height: CONFIG.sizes[variant]?.height ?? undefined,
            fit: 'cover',
            position: 'attention',
          },
          format: 'jpeg',
          quality: CONFIG.qualities[variant] ?? CONFIG.qualities.base,
        });

        itemResult.variants.push({
          variant,
          quality: CONFIG.qualities[variant] ?? null,
          size: {
            width: derivative.width,
            height: derivative.height,
          },
          format: derivative.format,
          bytes: derivative.bytes,
          target: relativeTargetPath,
        });
      } catch (error) {
        counters.errors += 1;
        assetHasError = true;
        itemResult.status = 'error';
        itemResult.variants.push({
          variant,
          target: relativeTargetPath,
          error: error.message,
        });
      }
    }

    mapping.items.push(itemResult);

    if (assetHasError || assetHasSkip) {
      counters.skipped += 1;
    } else {
      counters.processed += 1;
    }
  }

  mapping.items.sort((a, b) => a.source.localeCompare(b.source));

  await fs.writeFile(CONFIG.outputMapJsonPath, JSON.stringify(mapping, null, 2) + '\n', 'utf8');
  await fs.writeFile(CONFIG.outputMapTsPath, buildTsMapContent(mapping), 'utf8');

  console.log('--- Dama Venus Asset Preparation Report ---');
  console.log(`Gefunden: ${counters.found}`);
  console.log(`Verarbeitet: ${counters.processed}`);
  console.log(`Übersprungen: ${counters.skipped}`);
  console.log(`Fehler: ${counters.errors}`);
  console.log(`Mapping JSON: ${path.relative(process.cwd(), CONFIG.outputMapJsonPath)}`);
  console.log(`Mapping TS: ${path.relative(process.cwd(), CONFIG.outputMapTsPath)}`);

  if (counters.errors > 0) {
    process.exitCode = 1;
  }
}

run();
