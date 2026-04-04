# 99 Status

## Aktueller Stand (Datenlage, Stand: 2026-04-04)
- Die Seitendaten für `home`, `music`, `visuals`, `about` und `press` sind auf eine konsistente CTA-Strategie ausgerichtet (interne Route vs. externe Ziele; kein primärer `mailto`-Flow mehr in den Kern-CTAs).
- Der primäre Kontaktpfad ist route-basiert über `/contact` modelliert; direkte E-Mail-Adressen bleiben als sekundäre Alternativpfade im Kontaktbereich erhalten.
- Home-Module referenzieren Assets ausschließlich über `assetId`; direkte Pfadfelder in Seitendaten wurden entfernt.
- CTA-Typisierung und Validierung sind verschärft: Zieltypen (`internal`/`external`/`mailto`) und zentrale Validierungsfunktionen sind im Typmodell hinterlegt und werden in den relevanten Datendateien ausgeführt.
- Veraltete Kompatibilitäts-Exporte wurden nur dort entfernt, wo keine aktiven Konsumenten bestehen.

## Verbindlich für den aktuellen Betrieb
- Primäre Kontaktaufforderungen zeigen auf `/contact` (Form-Flow).
- `mailto:` wird nicht als primärer CTA in Home/About/Press/Music/Visuals verwendet.
- Asset-Verknüpfungen in Seitendaten erfolgen über `asset.id` in Kombination mit `assetMap`.
- CTA-Ziele werden zur Laufzeit gegen erlaubte Zielmuster validiert.

## Noch offen (nicht Teil dieses Schritts)
- Finale redaktionelle Inhalte (z. B. verifizierte externe Plattform-URLs, finale Press-Downloads/Quotes) bleiben weiterhin ein separater Content-Finalisierungsschritt.
- Letzter visueller/Performance-Polish der Seiten bleibt separat.
