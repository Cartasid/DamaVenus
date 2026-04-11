#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════
#  Dama Venus — Speicher-optimiertes Deploy-Script
#  Server: 10GB Disk (knapp → jedes MB zählt)
# ═══════════════════════════════════════════════════════

APP_DIR="/opt/dama-venus"
REPO="https://github.com/Cartasid/DamaVenus.git"
BRANCH="main"
SERVICE="dama-venus"
BACKUP_DIR="/root/dama-venus-backup-min"

echo "═══ Dama Venus Deploy ═══"
echo "Disk vor Deploy:"
df -h / | tail -1

# ─── 1. AUFRÄUMEN — Platz schaffen ───────────────────
echo ""
echo "→ Platz schaffen..."

# npm/apt caches löschen
rm -rf /root/.npm/_cacache 2>/dev/null || true
rm -rf /tmp/npm-* 2>/dev/null || true
apt-get clean 2>/dev/null || true

# Alte Logs rotieren/löschen
journalctl --vacuum-size=50M 2>/dev/null || true
find /var/log -name "*.gz" -delete 2>/dev/null || true
find /var/log -name "*.old" -delete 2>/dev/null || true
find /var/log -name "*.1" -delete 2>/dev/null || true

# Alte npm debug logs
find /root -name "npm-debug.log*" -delete 2>/dev/null || true
find /root/.npm/_logs -type f -mtime +1 -delete 2>/dev/null || true

echo "Disk nach Cleanup:"
df -h / | tail -1

# ─── 2. SERVICE STOPPEN ──────────────────────────────
echo ""
echo "→ Service stoppen..."
systemctl stop "$SERVICE" 2>/dev/null || true

# ─── 3. ALTES PROJEKT ENTFERNEN ─────────────────────
echo ""
echo "→ Altes Projekt entfernen..."
rm -rf "$APP_DIR"

echo "Disk nach Entfernung:"
df -h / | tail -1

# ─── 4. CLONE — OHNE pics/ ORDNER (spart ~125MB) ────
echo ""
echo "→ Repository klonen (ohne pics/)..."

# Shallow clone, dann pics/ nachträglich löschen (zuverlässiger als sparse-checkout)
git clone --depth 1 --single-branch --branch "$BRANCH" "$REPO" "$APP_DIR"
cd "$APP_DIR"

# pics/ brauchen wir nicht — Assets sind in public/assets/ committed
rm -rf pics/
# .git brauchen wir nach dem Clone auch nicht mehr
rm -rf .git

echo "Repo-Größe (ohne pics, ohne .git):"
du -sh "$APP_DIR" | tail -1

# ─── 5. ENV WIEDERHERSTELLEN ─────────────────────────
echo ""
echo "→ Konfiguration wiederherstellen..."
cp -a "$BACKUP_DIR/.env.production" "$APP_DIR/" 2>/dev/null || true

# ─── 6. NPM INSTALL — INKL. devDependencies ─────────
#     tailwindcss, postcss, autoprefixer, typescript sind devDeps,
#     werden aber für den Next.js Build gebraucht.
echo ""
echo "→ Abhängigkeiten installieren..."
export NEXT_TELEMETRY_DISABLED=1

# WICHTIG: NICHT NODE_ENV=production setzen vor npm ci,
# sonst werden devDependencies übersprungen und der Build schlägt fehl.
npm ci --no-audit --no-fund 2>&1 || {
    echo "⚠ npm ci fehlgeschlagen, npm cache löschen und retry..."
    rm -rf /root/.npm/_cacache 2>/dev/null || true
    npm ci --no-audit --no-fund 2>&1
}

# Cache SOFORT löschen nach Install
rm -rf /root/.npm/_cacache 2>/dev/null || true

echo "Disk nach npm install:"
df -h / | tail -1

# ─── 7. BUILD ────────────────────────────────────────
#     prepare:dama-venus-assets braucht sharp + pics/
#     Die Assets sind bereits in public/assets/ committed,
#     also überspringen wir das und rufen next build direkt auf.
echo ""
echo "→ Next.js Build (standalone)..."
export NODE_ENV=production
./node_modules/.bin/next build

echo "Disk nach Build:"
df -h / | tail -1

# ─── 8. STANDALONE VORBEREITEN ───────────────────────
echo ""
echo "→ Standalone Output vorbereiten..."

# Symlinks statt Kopien (spart ~200MB)
mkdir -p .next/standalone/.next
rm -rf .next/standalone/public .next/standalone/.next/static 2>/dev/null || true
ln -sf "$APP_DIR/public" .next/standalone/public
ln -sf "$APP_DIR/.next/static" .next/standalone/.next/static

# ─── 9. NODE_MODULES AUFRÄUMEN ──────────────────────
#     Standalone hat eigene node_modules, die großen brauchen wir nicht mehr
echo ""
echo "→ Build-Abhängigkeiten aufräumen..."

# Nur die standalone node_modules behalten, Rest löschen
# sharp wird vom standalone build mit eingebettet
rm -rf "$APP_DIR/node_modules"

# Quell-Dateien die nur für den Build gebraucht wurden
rm -rf "$APP_DIR/pics" 2>/dev/null || true
rm -rf "$APP_DIR/scripts" 2>/dev/null || true

echo "Disk nach Cleanup:"
df -h / | tail -1

# ─── 10. SERVICE STARTEN ────────────────────────────
echo ""
echo "→ Service starten..."
systemctl restart "$SERVICE"

# Kurz warten und Status prüfen
sleep 3
if systemctl is-active --quiet "$SERVICE"; then
    echo ""
    echo "✓ Deploy erfolgreich! Service läuft."
else
    echo ""
    echo "✗ Service startet nicht! Logs:"
    journalctl -u "$SERVICE" --no-pager -n 20
    exit 1
fi

echo ""
echo "═══ Finaler Disk-Status ═══"
df -h /
echo ""
du -sh "$APP_DIR" --exclude=.git 2>/dev/null || du -sh "$APP_DIR"
echo ""
echo "Fertig."
