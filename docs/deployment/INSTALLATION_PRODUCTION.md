# Dama-Venus Produktion auf Ubuntu 24.04 LTS

> **Launch-Hinweis:** Aktuell not launch-ready, solange `/privacy` und `/imprint` nur Placeholder-Inhalte enthalten.

Diese Anleitung setzt die Website reproduzierbar mit **Docker (App)** + **Nginx (Host Reverse Proxy)** + **Let's Encrypt (Certbot)** auf.

## 1) Annahmen / Zielwerte

- Server OS: Ubuntu 24.04 LTS
- Domain: `example.com` (optional zusätzlich `www.example.com`)
- Linux-User: `deploy`
- Projektpfad: `/opt/dama-venus`
- App-Port (intern): `3000` (nur lokal gebunden auf `127.0.0.1`)
- Nginx-Site-Datei: `/etc/nginx/sites-available/dama-venus.conf`
- Zertifikatspfad: `/etc/letsencrypt/live/example.com/`

> Ersetze alle Beispielwerte (`example.com`, User, Pfade) konsequent.

---

## 2) DNS vorbereiten

Beim DNS-Provider setzen:

- `A` Record: `example.com` -> `SERVER_IPV4`
- Optional: `A` Record: `www.example.com` -> `SERVER_IPV4`

Prüfen (lokal oder auf dem Server):

```bash
dig +short example.com
dig +short www.example.com
```

---

## 3) Server-Login

```bash
ssh deploy@SERVER_IPV4
```

---

## 4) System aktualisieren

```bash
sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y
```

---

## 5) Benötigte Pakete installieren

```bash
sudo apt install -y ca-certificates curl git gnupg lsb-release nginx certbot python3-certbot-nginx ufw
```

Docker Engine + Compose Plugin installieren:

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl enable --now docker
```

Optional: Docker ohne `sudo` für aktuellen User:

```bash
sudo usermod -aG docker "$USER"
newgrp docker
```

---

## 6) Firewall konfigurieren

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable
sudo ufw status verbose
```

---

## 7) Repository klonen

```bash
sudo mkdir -p /opt/dama-venus
sudo chown -R "$USER":"$USER" /opt/dama-venus
git clone <REPO_URL> /opt/dama-venus
cd /opt/dama-venus
```

---

## 8) Produktions-ENV erstellen (inkl. Contact-Provider)

```bash
cp .env.production.example .env.production
nano .env.production
```

Mindestens setzen:

- `NODE_ENV=production`
- `PORT=3000`
- `NEXT_PUBLIC_SITE_URL=https://example.com`
- `CONTACT_PROVIDER` (`noop`, `webhook` oder `resend`)

URL-Resolution-Regel:
- Primär wird `NEXT_PUBLIC_SITE_URL` verwendet.
- Ist `NEXT_PUBLIC_SITE_URL` leer oder ungültig, fällt die App auf `https://damavenus.com` zurück.
- Diese aufgelöste URL wird für Metadaten, `robots.txt` (`host`, `sitemap`) und `sitemap.xml` genutzt.

Provider-spezifisch ergänzen:

- Für `CONTACT_PROVIDER=webhook`:
  - `CONTACT_WEBHOOK_URL`
  - Optional `CONTACT_API_KEY`
  - Optional `CONTACT_TO_EMAIL`
- Für `CONTACT_PROVIDER=resend`:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`

---

## 9) Asset-Preparation (bei neuen Bildern aus `pics/`)

Die Asset-Pipeline ist ein separater Schritt und **nicht** Teil von `./scripts/deploy-prod.sh` oder des Docker-Builds.
Die Pipeline verwendet `sharp` als primäre Engine für Bildverarbeitung (Konvertierung/Optimierung und Derivate).

Kein separater Host-Node-Schritt erforderlich: neue/angepasste Bildquellen aus `pics/` werden beim Deploy über `./scripts/deploy-prod.sh` verarbeitet.

HEIC-Hinweis:
- Wenn `sharp` ein HEIC direkt lesen kann, reicht `sharp` allein.
- Nur wenn `sharp` für eine HEIC-Datei fehlschlägt, greift das Script auf externe Fallback-Tools zurück (`magick`, `convert`, `heif-convert`, `sips`).
- Ist kein Fallback-Tool verfügbar, werden diese HEIC-Dateien non-blocking übersprungen und im Mapping-Status ausgewiesen.

---

## 10) App bauen und starten (Docker)

```bash
cd /opt/dama-venus
./scripts/deploy-prod.sh
```

Status prüfen:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs --tail=100 app
```

---

## 11) Nginx-Konfiguration aktivieren (Initial ohne TLS)

Datei ins System übernehmen:

```bash
sudo cp /opt/dama-venus/deploy/nginx/dama-venus.conf /etc/nginx/sites-available/dama-venus.conf
```

Domain in der Datei ersetzen (diese Datei ist bewusst nur HTTP für den ersten Certbot-Lauf):

```bash
sudo nano /etc/nginx/sites-available/dama-venus.conf
```

Symlink setzen und Standard deaktivieren:

```bash
sudo ln -sf /etc/nginx/sites-available/dama-venus.conf /etc/nginx/sites-enabled/dama-venus.conf
sudo rm -f /etc/nginx/sites-enabled/default
```

Syntax testen und Nginx laden:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx
```

---

## 12) SSL-Zertifikat anfordern (Let's Encrypt)

Certbot ergänzt automatisch TLS-Serverblöcke und Redirect-Regeln in der aktiven Nginx-Site:

```bash
sudo certbot --nginx -d example.com -d www.example.com --redirect -m admin@example.com --agree-tos --no-eff-email
```

Danach Konfiguration prüfen und Nginx neu laden:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

Automatische Erneuerung prüfen:

```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

---

## 13) HTTPS und Redirect prüfen

```bash
curl -I http://example.com
curl -I https://example.com
curl -I https://www.example.com
```

Erwartung:
- HTTP liefert `301`/`308` auf HTTPS
- HTTPS liefert `200` (oder app-spezifischen Erfolgsstatus)

---

## 14) Update-/Redeploy-Prozess

```bash
cd /opt/dama-venus
./scripts/update-prod.sh
```

Falls nur neu bauen/neu starten nötig:

```bash
cd /opt/dama-venus
./scripts/deploy-prod.sh
```

---

## 15) Betrieb: Logs, Restart, Status

Container-Logs live:

```bash
cd /opt/dama-venus
./scripts/logs-prod.sh
```

Container neu starten:

```bash
cd /opt/dama-venus
docker compose -f docker-compose.prod.yml restart app
```

Nginx neu laden/neustarten:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl restart nginx
```

Systemdienste prüfen:

```bash
sudo systemctl status nginx
sudo systemctl status docker
```

---

## 16) Troubleshooting (konkret)

Port-Bindings prüfen:

```bash
sudo ss -tulpn | grep -E ':80|:443|:3000'
```

Nginx Fehlerlog:

```bash
sudo tail -n 200 /var/log/nginx/error.log
sudo tail -n 200 /var/log/nginx/access.log
```

Container-Status/Healthcheck:

```bash
docker inspect --format='{{json .State.Health}}' dama-venus-app
```

Compose neu erstellen (hart):

```bash
cd /opt/dama-venus
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

Let's Encrypt Diagnose:

```bash
sudo certbot certificates
sudo journalctl -u certbot.timer --no-pager -n 100
```
