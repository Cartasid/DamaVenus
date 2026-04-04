# DamaVenus

## Development

```bash
npm install
npm run dev
```

## Production (Ubuntu 24.04 + Docker + Nginx + Let's Encrypt)

Die vollständige Schritt-für-Schritt-Installationsanleitung inkl. DNS, Firewall, SSL, Nginx, Deploy, Updates und Troubleshooting liegt hier:

- [`docs/deployment/INSTALLATION_PRODUCTION.md`](docs/deployment/INSTALLATION_PRODUCTION.md)

Schnellstart im Repo (nach Server-Basis-Setup):

```bash
cp .env.production.example .env.production
./scripts/deploy-prod.sh
```
