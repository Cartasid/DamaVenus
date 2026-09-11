#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env.production ]; then
  echo "ERROR: .env.production fehlt. Bitte aus .env.production.example erstellen."
  exit 1
fi

DEPLOY_SHA="$(git rev-parse --short HEAD)"
echo "Deploy: ${DEPLOY_SHA}"
echo "Info: Asset-Preparation läuft im Docker-Build über 'npm run build'."

docker compose -f docker-compose.prod.yml build --pull
docker compose -f docker-compose.prod.yml up -d --remove-orphans
docker compose -f docker-compose.prod.yml ps

node scripts/verify-prod-live.mjs

echo "Production deployment verified: ${DEPLOY_SHA}"
