#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env.production ]; then
  echo "ERROR: .env.production fehlt. Bitte aus .env.production.example erstellen."
  exit 1
fi

docker compose -f docker-compose.prod.yml build --pull
docker compose -f docker-compose.prod.yml up -d --remove-orphans
docker compose -f docker-compose.prod.yml ps
