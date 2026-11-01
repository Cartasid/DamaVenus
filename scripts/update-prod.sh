#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

# Jeder Build erzeugt die abgeleiteten Assets und den TypeScript-Buildcache neu.
# Diese getrackten Build-Artefakte werden vor dem Pull auf den Git-Stand
# zurückgesetzt, damit lokaler Drift `git pull --ff-only` nie blockiert.
GENERATED_PATHS=(
  tsconfig.tsbuildinfo
  public/assets/dama-venus/asset-map.json
  public/assets/dama-venus/asset-map.ts
  public/assets/dama-venus/about
  public/assets/dama-venus/contact
  public/assets/dama-venus/curated
  public/assets/dama-venus/docs
  public/assets/dama-venus/home
  public/assets/dama-venus/music
  public/assets/dama-venus/press
  public/assets/dama-venus/visuals
)

git fetch --all --prune

mapfile -t DRIFT < <(git ls-files -m -- "${GENERATED_PATHS[@]}")
if [ "${#DRIFT[@]}" -gt 0 ]; then
  echo "Info: setze ${#DRIFT[@]} lokal neu erzeugte Build-Artefakte vor dem Pull zurück."
  git checkout -- "${DRIFT[@]}"
fi

OLD_HEAD="$(git rev-parse HEAD)"
git pull --ff-only
NEW_HEAD="$(git rev-parse HEAD)"

if [ "${OLD_HEAD}" = "${NEW_HEAD}" ]; then
  echo "Info: Repository bereits auf ${NEW_HEAD:0:7}; Build und Deploy laufen trotzdem."
else
  echo "Info: aktualisiert ${OLD_HEAD:0:7} -> ${NEW_HEAD:0:7}"
fi

# deploy-prod.sh erwartet installierte Abhängigkeiten. Nur bei fehlendem
# node_modules oder geänderten Dependency-Dateien neu installieren.
if [ ! -d node_modules ] || ! git diff --quiet "${OLD_HEAD}" "${NEW_HEAD}" -- package.json package-lock.json; then
  echo "Info: installiere Abhängigkeiten (npm ci)."
  npm ci --no-audit --no-fund
fi

echo "Info: Produktions-Build läuft einmal auf dem Host; Docker verpackt danach nur das validierte Standalone-Runtime-Artefakt."
./scripts/deploy-prod.sh
