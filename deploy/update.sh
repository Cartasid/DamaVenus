#!/usr/bin/env bash
set -euo pipefail

# ═══════════════════════════════════════════════════════
#  Dama Venus — Deploy-Script mit git pull Support
#  Server: 10GB Disk (knapp → jedes MB zählt)
#
#  Nutzung:  bash /root/update.sh
# ═══════════════════════════════════════════════════════

APP_DIR="/opt/dama-venus"
REPO="https://github.com/Cartasid/DamaVenus.git"
BRANCH="main"
SERVICE="dama-venus"
BACKUP_DIR="/root/dama-venus-backup-min"

cd /root

echo "═══ Dama Venus Deploy ═══"
echo "Disk vor Deploy:"
df -h / | tail -1

# ─── 1. AUFRÄUMEN ───────────────────────────────────
echo ""
echo "→ Platz schaffen..."
rm -rf /root/.npm/_cacache /tmp/npm-* 2>/dev/null || true
apt-get clean 2>/dev/null || true
journalctl --vacuum-size=50M 2>/dev/null || true
find /var/log \( -name "*.gz" -o -name "*.old" -o -name "*.1" \) -delete 2>/dev/null || true
find /root -name "npm-debug.log*" -delete 2>/dev/null || true

echo "Disk nach Cleanup:"
df -h / | tail -1

# ─── 2. SERVICE STOPPEN ─────────────────────────────
echo ""
echo "→ Service stoppen..."
systemctl stop "$SERVICE" 2>/dev/null || true

# ─── 3. CODE HOLEN — git pull oder fresh clone ──────
echo ""
if [ -d "$APP_DIR/.git" ]; then
  echo "→ Git pull (bestehendes Repo)..."
  cd "$APP_DIR"
  git fetch origin "$BRANCH" --depth 1
  git reset --hard "origin/$BRANCH"
  git clean -fd
else
  echo "→ Fresh clone..."
  rm -rf "$APP_DIR"
  git clone --depth 1 --single-branch --branch "$BRANCH" "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

# pics/ Quellbilder nicht gebraucht
rm -rf pics/

# Git-Pack komprimieren (spart ~200MB vs volles .git)
git gc --aggressive --prune=now 2>/dev/null || true

echo "Repo-Größe:"
du -sh "$APP_DIR"

# ─── 4. ENV WIEDERHERSTELLEN ────────────────────────
echo ""
echo "→ Konfiguration wiederherstellen..."
cp -a "$BACKUP_DIR/.env.production" "$APP_DIR/" 2>/dev/null || true

# ─── 5. NPM INSTALL ────────────────────────────────
echo ""
echo "→ Abhängigkeiten installieren..."
export NEXT_TELEMETRY_DISABLED=1

npm ci --no-audit --no-fund 2>&1 || {
    echo "⚠ npm ci fehlgeschlagen, retry..."
    rm -rf /root/.npm/_cacache 2>/dev/null || true
    npm ci --no-audit --no-fund 2>&1
}
rm -rf /root/.npm/_cacache 2>/dev/null || true

echo "Disk nach npm install:"
df -h / | tail -1

# ─── 6. BUILD ───────────────────────────────────────
echo ""
echo "→ Next.js Build (standalone)..."
NODE_ENV=production ./node_modules/.bin/next build

echo "Disk nach Build:"
df -h / | tail -1

# ─── 7. STANDALONE VORBEREITEN ──────────────────────
echo ""
echo "→ Standalone Output vorbereiten..."
mkdir -p .next/standalone/.next
rm -rf .next/standalone/public .next/standalone/.next/static 2>/dev/null || true
ln -sf "$APP_DIR/public" .next/standalone/public
ln -sf "$APP_DIR/.next/static" .next/standalone/.next/static

# ─── 8. AUFRÄUMEN ──────────────────────────────────
echo ""
echo "→ Build-Abhängigkeiten aufräumen..."
rm -rf "$APP_DIR/node_modules"
rm -rf "$APP_DIR/scripts" 2>/dev/null || true

echo "Disk nach Cleanup:"
df -h / | tail -1

# ─── 9. SERVICE STARTEN ────────────────────────────
echo ""
echo "→ Service starten..."
systemctl restart "$SERVICE"

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
du -sh "$APP_DIR"
echo "Fertig."
