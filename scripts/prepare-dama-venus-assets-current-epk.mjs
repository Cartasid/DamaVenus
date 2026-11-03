#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import sharp from 'sharp';

const projectRoot = process.cwd();
// Canonical sources: one EPK per language, maintained in docs/.
const canonicalEpk = path.resolve(projectRoot, 'docs/EPK EN.pdf');
const canonicalEpkPt = path.resolve(projectRoot, 'docs/EPK PT.pdf');
const stagedEpk = path.resolve(
  projectRoot,
  'assets-src/dama-venus/curated/dv_curated_press_epk_document_v01.pdf',
);
const publicEpk = path.resolve(
  projectRoot,
  'public/assets/dama-venus/docs/dama-venus-epk.pdf',
);
const publicEpkEn = path.resolve(
  projectRoot,
  'public/assets/dama-venus/docs/dama-venus-epk-en.pdf',
);
const publicEpkPt = path.resolve(
  projectRoot,
  'public/assets/dama-venus/docs/dama-venus-epk-pt.pdf',
);
const generatedPressEpk = path.resolve(
  projectRoot,
  'public/assets/dama-venus/press/dv_press_epk_document_v01.pdf',
);
const homeVisualSource = path.resolve(projectRoot, 'pics/3.jpeg');
const homeVisualTarget = path.resolve(
  projectRoot,
  'public/assets/dama-venus/visuals/dv_visuals_frames_portrait_color_4x3_v01.jpg',
);
const assetPreparationScript = path.resolve(
  projectRoot,
  'scripts/prepare-dama-venus-assets.mjs',
);

async function assertNonEmptyFile(filePath, label) {
  const stat = await fs.stat(filePath);
  if (!stat.isFile() || stat.size <= 0) {
    throw new Error(`${label} fehlt, ist leer oder ist keine reguläre Datei: ${filePath}`);
  }
}

async function sha256(filePath) {
  const content = await fs.readFile(filePath);
  return createHash('sha256').update(content).digest('hex');
}

function runNodeScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [scriptPath], {
      cwd: projectRoot,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('close', (code, signal) => {
      if (signal) {
        reject(new Error(`Asset preparation durch Signal ${signal} beendet.`));
        return;
      }
      resolve(code ?? 1);
    });
  });
}

async function normalizeHomeVisualOrientation() {
  await assertNonEmptyFile(homeVisualSource, 'Homepage-Visual-Quelle');
  await fs.mkdir(path.dirname(homeVisualTarget), { recursive: true });

  const temporaryTarget = `${homeVisualTarget}.orientation-${process.pid}.tmp.jpg`;

  try {
    const output = await sharp(homeVisualSource, { failOn: 'error' })
      // pics/3.jpeg is stored with the camera frame sideways. Normalize the
      // actual pixels so browsers do not depend on EXIF interpretation after
      // the asset pipeline has re-encoded the image.
      .rotate(90)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(temporaryTarget);

    if (!output.width || !output.height || output.height <= output.width) {
      throw new Error(
        `Homepage-Visual wurde nicht in die erwartete aufrechte Ausrichtung normalisiert (${output.width}x${output.height}).`,
      );
    }

    await fs.rename(temporaryTarget, homeVisualTarget);
    console.log(
      `[visual] ${path.relative(projectRoot, homeVisualSource)} → ${path.relative(projectRoot, homeVisualTarget)}: 90° clockwise normalisiert (${output.width}x${output.height}).`,
    );
  } finally {
    await fs.rm(temporaryTarget, { force: true });
  }
}

async function run() {
  await assertNonEmptyFile(canonicalEpk, 'Kanonisches EPK (EN)');
  await assertNonEmptyFile(canonicalEpkPt, 'Kanonisches EPK (PT)');

  await fs.mkdir(path.dirname(stagedEpk), { recursive: true });
  await fs.mkdir(path.dirname(publicEpk), { recursive: true });

  const [canonicalHash, canonicalHashPt] = await Promise.all([
    sha256(canonicalEpk),
    sha256(canonicalEpkPt),
  ]);

  try {
    // docs/EPK EN.pdf and docs/EPK PT.pdf are the single sources of truth.
    // The existing asset pipeline still expects its curated staging path
    // (English edition), so provide that source only for the duration of the build.
    await fs.copyFile(canonicalEpk, stagedEpk);

    // Publish language-specific downloads. The neutral URL stays an English
    // alias so old bookmarks never serve an outdated press kit.
    await fs.copyFile(canonicalEpk, publicEpk);
    await fs.copyFile(canonicalEpk, publicEpkEn);
    await fs.copyFile(canonicalEpkPt, publicEpkPt);

    const code = await runNodeScript(assetPreparationScript);
    if (code !== 0) {
      throw new Error(`Asset preparation fehlgeschlagen (Exit-Code ${code}).`);
    }

    // The generic pipeline preserves source pixel orientation. This one legacy
    // camera asset needs a deterministic physical rotation before delivery.
    await normalizeHomeVisualOrientation();

    await assertNonEmptyFile(publicEpk, 'Öffentliches EPK');
    await assertNonEmptyFile(publicEpkEn, 'Öffentliches EPK (EN)');
    await assertNonEmptyFile(publicEpkPt, 'Öffentliches EPK (PT)');
    await assertNonEmptyFile(generatedPressEpk, 'Generiertes Press-EPK');

    const [publicHash, enHash, ptHash, generatedHash] = await Promise.all([
      sha256(publicEpk),
      sha256(publicEpkEn),
      sha256(publicEpkPt),
      sha256(generatedPressEpk),
    ]);

    if (
      publicHash !== canonicalHash ||
      enHash !== canonicalHash ||
      generatedHash !== canonicalHash ||
      ptHash !== canonicalHashPt
    ) {
      throw new Error(
        'EPK-Synchronisierung inkonsistent: öffentliche/generierte Dateien stimmen nicht mit docs/EPK EN.pdf bzw. docs/EPK PT.pdf überein.',
      );
    }

    console.log(
      '[epk] docs/EPK EN.pdf + docs/EPK PT.pdf → EN/PT-Downloads, neutraler Alias und Press-Asset synchronisiert und verifiziert.',
    );
  } finally {
    // Never keep a generated second source copy around after the build.
    await fs.rm(stagedEpk, { force: true });
  }
}

run().catch((error) => {
  console.error(`[epk] ${error.message}`);
  process.exit(1);
});
