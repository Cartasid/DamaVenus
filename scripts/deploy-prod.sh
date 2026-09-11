#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env.production ]; then
  echo "ERROR: .env.production fehlt. Bitte aus .env.production.example erstellen."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "ERROR: node_modules fehlt. Einmal 'npm ci' ausführen und Deploy erneut starten."
  exit 1
fi

DEPLOY_SHA="$(git rev-parse --short HEAD)"
echo "Deploy: ${DEPLOY_SHA}"
echo "Info: Build + Asset-Preparation laufen einmal auf dem Host; Docker verpackt nur das validierte Standalone-Runtime-Artefakt."

# Build and validate exactly once on the host. This avoids regenerating the
# large image derivative workspace inside BuildKit, which exhausted the small
# production filesystem even though the host build itself completed normally.
npm run check
npm run build:check

if [ ! -f .next/standalone/server.js ]; then
  echo "ERROR: .next/standalone/server.js fehlt nach erfolgreichem Build."
  exit 1
fi

# Reclaim only unused/dangling Docker data before creating the new runtime
# image. Images used by the currently running production container are kept.
docker builder prune -f >/dev/null || true
docker image prune -f >/dev/null || true

# The Docker build context contains only the already-built standalone runtime;
# no source images, HEIC conversion, npm install or Next.js compilation occurs
# inside Docker anymore.
docker build \
  --pull \
  --file Dockerfile \
  --tag dama-venus-app:local \
  .next/standalone

docker compose -f docker-compose.prod.yml up -d --remove-orphans --force-recreate
docker compose -f docker-compose.prod.yml ps

node scripts/verify-prod-live.mjs

# Once the new container is healthy, remove the now-dangling previous image.
docker image prune -f >/dev/null || true

echo "Production deployment verified: ${DEPLOY_SHA}"
