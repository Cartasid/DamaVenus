#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';

const projectRoot = process.cwd();
const canonicalEpk = path.resolve(projectRoot, 'docs/Dama Venus EPK.pdf');
const stagedEpk = path.resolve(
  projectRoot,
  'assets-src/dama-venus/curated/dv_curated_press_epk_document_v01.pdf',
);
const publicEpk = path.resolve(
  projectRoot,
  'public/assets/dama-venus/docs/dama-venus-epk.pdf',
);
const legacyEnglishEpk = path.resolve(
  projectRoot,
  'public/assets/dama-venus/docs/dama-venus-epk-en.pdf',
);
const generatedPressEpk = path.resolve(
  projectRoot,
  'public/assets/dama-venus/press/dv_press_epk_document_v01.pdf',
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

async function run() {
  await assertNonEmptyFile(canonicalEpk, 'Kanonisches EPK');

  await fs.mkdir(path.dirname(stagedEpk), { recursive: true });
  await fs.mkdir(path.dirname(publicEpk), { recursive: true });

  const canonicalHash = await sha256(canonicalEpk);

  try {
    // docs/Dama Venus EPK.pdf is the single source of truth. The existing
    // asset pipeline still expects its curated staging path, so provide that
    // source only for the duration of the build.
    await fs.copyFile(canonicalEpk, stagedEpk);

    // Publish one neutral canonical URL for the website. Keep the historical
    // English URL synchronized only as a backwards-compatible alias so old
    // bookmarks never serve an outdated press kit.
    await fs.copyFile(canonicalEpk, publicEpk);
    await fs.copyFile(canonicalEpk, legacyEnglishEpk);

    const code = await runNodeScript(assetPreparationScript);
    if (code !== 0) {
      throw new Error(`Asset preparation fehlgeschlagen (Exit-Code ${code}).`);
    }

    await assertNonEmptyFile(publicEpk, 'Öffentliches EPK');
    await assertNonEmptyFile(legacyEnglishEpk, 'Legacy-EPK-Alias');
    await assertNonEmptyFile(generatedPressEpk, 'Generiertes Press-EPK');

    const [publicHash, legacyHash, generatedHash] = await Promise.all([
      sha256(publicEpk),
      sha256(legacyEnglishEpk),
      sha256(generatedPressEpk),
    ]);

    if (
      publicHash !== canonicalHash ||
      legacyHash !== canonicalHash ||
      generatedHash !== canonicalHash
    ) {
      throw new Error(
        'EPK-Synchronisierung inkonsistent: öffentliche/generierte Datei stimmt nicht mit docs/Dama Venus EPK.pdf überein.',
      );
    }

    console.log(
      '[epk] docs/Dama Venus EPK.pdf → kanonischer Download + Legacy-Alias + Press-Asset synchronisiert und verifiziert.',
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
