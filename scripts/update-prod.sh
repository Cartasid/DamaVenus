#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

git fetch --all --prune
git pull --ff-only
echo "Info: Produktions-Build läuft einmal auf dem Host; Docker verpackt danach nur das validierte Standalone-Runtime-Artefakt."
./scripts/deploy-prod.sh
