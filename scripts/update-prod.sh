#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

git fetch --all --prune
git pull --ff-only
./scripts/deploy-prod.sh
