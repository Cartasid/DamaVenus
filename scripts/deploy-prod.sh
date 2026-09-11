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
COMPOSE_FILE="docker-compose.prod.yml"
LEGACY_SERVICE="dama-venus.service"
LEGACY_SERVICE_PRESENT=0
LEGACY_SERVICE_WAS_ACTIVE=0

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

restore_legacy_service() {
  if [ "${LEGACY_SERVICE_WAS_ACTIVE}" -eq 1 ]; then
    echo "Rollback: starte ${LEGACY_SERVICE} erneut."
    systemctl start "${LEGACY_SERVICE}" || true
  fi
}

# Older installations used a host systemd service on 127.0.0.1:3000. Running
# that service together with the Docker deployment causes the exact
# "address already in use" failure seen in production. Stop it only after the
# replacement image has been built, and restart it automatically if the Docker
# handover fails.
if command -v systemctl >/dev/null 2>&1 && systemctl cat "${LEGACY_SERVICE}" >/dev/null 2>&1; then
  LEGACY_SERVICE_PRESENT=1
  if systemctl is-active --quiet "${LEGACY_SERVICE}"; then
    LEGACY_SERVICE_WAS_ACTIVE=1
    echo "Migration: stoppe laufenden Legacy-Dienst ${LEGACY_SERVICE} vor Docker-Handover."
    systemctl stop "${LEGACY_SERVICE}"
  fi
fi

# A currently running dama-venus-app container is allowed to own port 3000;
# docker compose will replace it. Any other listener is unsafe to kill blindly,
# so abort with diagnostics instead of terminating an unrelated process.
if command -v ss >/dev/null 2>&1; then
  PORT_3000_LISTENER="$(ss -H -ltnp 'sport = :3000' 2>/dev/null || true)"
  if [ -n "${PORT_3000_LISTENER}" ]; then
    EXPECTED_CONTAINER="$(docker ps --filter 'name=dama-venus-app' --filter 'publish=3000' -q | head -n 1)"
    if [ -z "${EXPECTED_CONTAINER}" ]; then
      echo "ERROR: 127.0.0.1:3000 ist noch durch einen fremden Prozess belegt:"
      echo "${PORT_3000_LISTENER}"
      restore_legacy_service
      exit 1
    fi
    echo "Info: Port 3000 gehört dem bestehenden dama-venus-app Container und wird kontrolliert ersetzt."
  fi
fi

if ! docker compose -f "${COMPOSE_FILE}" up -d --remove-orphans --force-recreate; then
  echo "ERROR: Docker-Handover fehlgeschlagen."
  restore_legacy_service
  exit 1
fi

docker compose -f "${COMPOSE_FILE}" ps

node scripts/verify-prod-live.mjs

# Once Docker has passed the live verification, keep the obsolete host service
# disabled so it cannot reclaim port 3000 after a reboot.
if [ "${LEGACY_SERVICE_PRESENT}" -eq 1 ]; then
  systemctl disable "${LEGACY_SERVICE}" >/dev/null 2>&1 || true
fi

# Once the new container is healthy, remove the now-dangling previous image.
docker image prune -f >/dev/null || true

echo "Production deployment verified: ${DEPLOY_SHA}"
