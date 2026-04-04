#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

git fetch --all --prune
git pull --ff-only
echo "Info: Asset-Preparation läuft im Docker-Build über 'npm run build'."
./scripts/deploy-prod.sh
