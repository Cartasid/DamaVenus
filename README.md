# DamaVenus

## Asset-Preparation (Dama Venus)

`scripts/prepare-dama-venus-assets.mjs` verarbeitet Assets aus `pics/` deterministisch mit `sharp` und erzeugt:

- normierte Master-Derivate (`master-jpeg`, `master-webp`)
- Varianten (`hero`, `portrait`, `square`, `landscape`, `tall`) mit echten Resize-Operationen und konfigurierten Qualitätswerten
- eine strukturierte Ausgabe unter `public/assets/dama-venus/{bereich}/{motiv}/...`
- Metadaten in `public/assets/dama-venus/asset-map.json` und `asset-map.ts` mit realen Derivatdaten (Breite, Höhe, Format, Byte-Größe)

HEIC wird primär über `sharp` verarbeitet; falls lokal nicht unterstützt, bleibt der dokumentierte Fallback aktiv (`status: skipped-heic` oder Konvertierung via `magick`/`convert`/`heif-convert`/`sips`).
