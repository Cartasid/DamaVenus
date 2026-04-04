# 03 Asset Strategy

## 1. Ziel dieses Dokuments
Dieses Dokument legt die belastbare Asset-Strategie für die Dama-Venus-Website fest, basierend auf dem bereits beschlossenen image-first, editorial-cineastischen Markenrahmen (`00_project_brief.md`, `01_creative_direction.md`).

Ziel ist, die spätere Homepage- und Seitenkomposition nicht generisch, sondern asset-getrieben zu planen: kuratiert, dramaturgisch, performancefähig und direkt umsetzbar.

---

## 2. Überblick über den vorhandenen Asset-Bestand

### 2.1 Ergebnis der Repo-Sichtung (Stand: 2026-04-03)
Im Verzeichnis `/pics` liegen aktuell **35 Bildassets** vor (keine Videoassets). Verfügbare Dateitypen:
- `.jpg`: 17
- `.jpeg`: 11
- `.png`: 2
- `.webp`: 3
- `.heic`: 2

### 2.2 Relevanzbewertung
- **Relevante Assets vorhanden:** ja (erstes Rohinventar in `/pics`)
- **Grobe Motivgruppen im Bestand:** Cinderela-Serie (12), IMG_-Kameraexporte (7), UUID-/Device-Exports (10), plus einzelne Spezialassets (Tamiris, Spotify Canvas, AI-Generated, WebP-Exports)
- **Strukturzustand:** Assets sind vorhanden, aber noch nicht kuratiert und noch nicht in die Zielstruktur nach Kapitel 8 überführt

### 2.3 Konsequenz
Eine finale visuelle Kuratierung einzelner Lead-/Secondary-Assets ist weiterhin offen; der nächste Schritt ist die strukturierte Bewertung des vorhandenen Rohbestands aus `/pics` nach den Kriterien aus Kapitel 3.
Technische Auffälligkeiten im Inventar: HEIC-Dateien (2) mit potenziellen Kompatibilitätsrisiken, stark heterogene Dateigrößen (u. a. sehr kleine WebP-Exports), inkonsistente Naming-Patterns (UUID, Kamera-Defaults, gemischte Groß-/Kleinschreibung bei Extensions).

---

## 3. Kuratorische Auswahlkriterien
Sobald reale Assets eingebracht sind, erfolgt die Auswahl strikt nach diesen Kriterien (Priorität absteigend):

1. **Markenfit (Pflichtkriterium):** cinematic, feminine, dark, elegant, artsy, modern, mystisch, high-end, editorial.
2. **Bilddramaturgie:** trägt das Motiv Spannung, Tiefe, Inszenierung und eine klare visuelle Haltung?
3. **Kompositionsstärke:** klare Hauptform, belastbare Linienführung, definierbarer Fokuspunkt, negativer Raum für Overlay-Texte.
4. **Lichtqualität:** gezielt gesetztes Licht (nicht flach), kontrollierte Highlights/Shadows, cineastische Kontrastführung.
5. **Farbwirkung:** tragfähige Farbstimmung für dunkle Bühne; Hauttöne/Highlights dürfen nicht „kippen“.
6. **Crop-Potenzial:** funktioniert das Motiv in mindestens zwei Formaten (z. B. 16:9 + 4:5) ohne Qualitäts- oder Bedeutungsverlust?
7. **Technische Qualität:** ausreichende Auflösung, Schärfe auf Fokusbereich, keine Artefaktprobleme.
8. **Eigenständigkeit:** vermeidet generische „Portfolio“-Ästhetik, stützt Wiedererkennbarkeit von Dama Venus.

Ausschlusskriterien:
- beliebige Stock-Anmutung
- übermäßige Retusche-Artefakte
- fehlender Fokuspunkt
- instabile Bildaussage bei mobilem Crop

---

## 4. Bewertete Hauptassets
Auf Basis des aktuellen Rohinventars sind noch keine finalen Lead-Assets festgelegt; die konkrete Dateiauswahl folgt nach Kuratierung gemäß Kapitel 3.

**Verbindliche Entscheidungsregel für die nächste Asset-Runde:**
- Aus dem ersten realen Asset-Pool werden **3–6 Lead-Assets** definiert, die die Website visuell tragen.
- Zusätzlich werden **6–12 Secondary-Assets** für unterstützende Tiles, Galerie und Seitenhintergründe ausgewählt.
- Alle übrigen Assets werden als Reserve oder „nicht einsetzen“ klassifiziert.

**Bewertungsoutput pro Asset (Pflichtschema):**
- Pfad/Dateiname
- Asset-Typ
- Motiv
- Visuelle Stärke
- Technische Qualität
- Seiten-/Modulzuordnung
- SW/Farbe-Eignung
- Full-Bleed-Eignung
- Crop-Empfehlung
- Risiken

---

## 5. Rollenverteilung pro Seite / Modul
Diese Rollenlogik gilt verbindlich für die spätere Zuordnung realer Assets:

### Startseite
- **Lead Tile / Hero-Ersatz (1 Asset):** stärkstes Signature-Motiv, hohe emotionale Öffnung, belastbar in 16:9 + 4:5.
- **Primäre große Tiles (2 Assets):** visuelle Hauptträger der Dramaturgie (Kontrast in Pose/Licht/Farbe).
- **Sekundäre Tiles (2–3 Assets):** Rhythmus, Kontext, Detailverdichtung.

### Portfolio / Visuals
- **Galerie-Cluster:** Serienlogik statt zufälliger Reihenfolge (Mood-Arc: dunkel → Akzentfarbe → ruhig).
- **Full-Bleed-Frames:** nur für Assets mit stabiler Komposition bei breitem Beschnitt.

### Music / Release
- **Cover-nahe Motive:** klarer Bezug zu Release-Identität (Artwork- oder Kampagnennähe).
- **Kompakte Promo-Stills:** für Karten-/Listenmodule.

### About
- **Portrait-Priorität:** ruhige, starke Portraits mit Blickführung, geeignet für Textnähe.

### Press / EPK
- **Technisch saubere Masterbilder:** druck-/publikationsfähig, neutralere Crops zusätzlich zur künstlerischen Variante.

### Contact
- **Akzentbild statt Informationsbild:** reduzierte, stimmungsstarke Visuals mit guter Lesefläche für CTA.

---

## 6. Crop- und Formatstrategie

### 6.1 Kernformate
- **Landscape 16:9** (Hero-Ersatz, breite Module)
- **Portrait 4:5** (editoriale Hauptkacheln, mobile Stabilität)
- **Square 1:1** (Grid-Rhythmus, Teaser, Social-Nähe)
- **Tall 3:4 oder 2:3** (starke vertikale Portraitwirkung)

### 6.2 Fokus- und Safe-Area-Regeln
- Fokuspunkt je Asset verbindlich definieren (Gesicht/Auge/Geste/Objektzentrum).
- Mindestens 10–15% Safe-Area für mögliche Text-Overlays.
- Keine wichtigen Bildelemente am Randbereich, der auf Mobile typischerweise abgeschnitten wird.

### 6.3 Viewport-Logik
- **Desktop:** dramaturgische Breite, mehr Full-Bleed möglich.
- **Tablet:** Mischlogik, bevorzugt 4:5/3:4 für Stabilität.
- **Mobile:** priorisiert Portrait/Tall; Landscape nur, wenn Fokus zentral und robust bleibt.

### 6.4 Overlay-Tauglichkeit
- Nur Assets mit ruhigen Flächen für Headlines/CTAs nutzen.
- Bei unruhigen Motiven: Text in separaten Blöcken, nicht direkt auf Bild.

---

## 7. Schwarzweiß-/Farbe-Logik
Die in der Creative Direction festgelegte SW→Farbe-Dramaturgie bleibt verbindlich und wird so operationalisiert:

1. **Primär monochrom** für Einstieg, Übergänge, ruhige Sequenzen.
2. **Bewusste Farb-Highlights** nur bei narrativen Peak-Momenten (Lead Tile, zentrale Portfolio-Spots, Release-relevante Bereiche).
3. **Dual-Layer nur bei geeigneten Assets:** starke Tonwerttrennung, stabile Haut-/Detailzeichnung, kein „matschiger“ Mittenton.
4. **Nicht filtern, wenn Bild bricht:** Motive mit farbbasierter Kernwirkung (z. B. Lichtstimmung) bleiben primär in Farbe.

Entscheidungsregel pro Asset:
- Kategorie A: SW-first + Farbreveal geeignet
- Kategorie B: Farbe-first (nur dezente SW-Variation)
- Kategorie C: keine Filterumwandlung (Originallook beibehalten)

---

## 8. Datei- und Ordnerstrategie

### 8.1 Zielstruktur
Empfohlene Medienstruktur (Web-Pfade):

- `public/assets/dama-venus/{bereich}/{motiv}/...` — **verbindliche Pipeline-Struktur** mit stabilen Dateinamen auf Basis `slug + variant + vNN`
- Pro Input werden zuerst normierte Master-Derivate erzeugt (`master-jpeg`, `master-webp`), danach Variantenderivate (`hero`, `portrait`, `square`, `landscape`, `tall`)
- Metadaten werden aus real erzeugten Derivaten geschrieben (`asset-map.json`/`asset-map.ts`: Breite, Höhe, Format, Byte-Größe)

Pfadkonventionen für Prioritized-Asset-Paare:
- `finalPath`: öffentlicher Frontend-Delivery-Pfad, **muss** mit `/assets/dama-venus/` beginnen.
- `sourcePath`: reiner Pipeline-Inputpfad aus **nicht-public** Quellen, erlaubt sind nur `pics/` oder `assets-src/dama-venus/` (nie `public/`).

### 8.2 Naming-Konvention
Format:
`dv_[seite/modul]_[motiv]_[variante]_[ratio]_[version].[ext]`

Beispiele:
- `dv_home_lead_portraitA_color_4x5_v01.webp`
- `dv_visuals_series02_frame03_bw_16x9_v01.webp`
- `dv_press_portrait_main_color_3x4_v01.jpg`

Regeln:
- keine Kamera-/Export-Defaultnamen im Web-Ordner
- semantisch lesbar
- ratio und Variante immer im Namen
- versioniert statt überschrieben

### 8.3 Export-/Optimierungsstrategie (Vorbereitung)
Priorität:
1. Lead-Assets (höchste Qualität, mehrere Crops)
2. Homepage-Haupttiles
3. About/Press-Schlüsselbilder
4. Secondary/Galerie

Richtwerte:
- Desktop-Large: ca. 2400px lange Kante
- Standard-Web: 1600–2000px lange Kante
- Mobile-Varianten: 900–1200px lange Kante
- Press/EPK-Master: hochauflösend separat vorhalten

Hinweis: finale Größen werden nach realen Asset-Dimensionen und Layoutentscheidung in `04_homepage_concept.md` präzisiert.

---

## 9. Alt-Text- und Inhaltsrolle

### 9.1 Rollentypen
- **Dekorativ:** reine Stimmungsbilder ohne Informationsgewinn → leeres Alt-Attribut in der Umsetzung.
- **Inhaltlich relevant:** Portraits/Release-bezogene Motive mit Orientierungsfunktion → präziser Alt-Text.

### 9.2 Alt-Text-Leitlinien
- beschreibend, knapp, ohne Keyword-Stuffing
- Fokus auf unterscheidenden Inhalt (Person, Pose, Szene, Handlung, Kontext)
- keine redundante Wiederholung der umgebenden Headline

### 9.3 Erwartete Priorisierung
- About/Press/Music: meist inhaltlich relevant
- große atmosphärische Backdrops/Section-Breaks: eher dekorativ

---

## 10. Konsequenzen für Homepage und spätere Umsetzung
Aus dem aktuellen Stand ergeben sich folgende klare Vorgaben:

1. Die Homepage sollte mit **5 Kernkacheln** starten (1 Lead + 2 primär + 2 sekundär), weil das genug dramaturgische Tiefe bietet, ohne visuelle Überladung.
2. Ein **asymmetrisches Raster** mit Portrait-Priorität ist voraussichtlich passender als ein starres gleichförmiges Grid.
3. **Selektive Full-Bleed-Elemente** sind sinnvoll, aber nur mit robusten Kompositionen.
4. Die Dramaturgie bleibt: **ruhiger SW-Einstieg → gezielte Farböffnung → kontrolliertes Ausklingen**.
5. Die finale Homepage-Konzeption (`04_homepage_concept.md`) muss auf den nach Kuratierung bestätigten 3–6 Lead-Assets aus dem vorhandenen `/pics`-Bestand aufbauen, nicht auf Platzhalterannahmen.

---

## 11. Offene Lücken / Empfehlungen
Aktueller Schwerpunkt: **Kuratierung und technische Normalisierung des bereits ingestierten Asset-Bestands**.

### Kritische Lücken
- noch keine final kuratierten Lead-/Secondary-Assets für Homepage
- Press-/EPK-Eignung der vorhandenen Dateien noch nicht validiert
- Querformat- und Full-Bleed-Tauglichkeit noch nicht assetweise geprüft
- HEIC-Dateien noch nicht in web-/pipeline-sichere Zielformate überführt
- Naming/Ordnung noch nicht auf die Zielstruktur aus Kapitel 8 normalisiert

### Technischer Grenzfall: HEIC in der Preparation-Pipeline (verbindlich)
- Das Preparation-Script versucht HEIC-Dateien zuerst über `sharp` zu verarbeiten.
- Falls `sharp` für HEIC lokal nicht greift, wird der dokumentierte Fallback-Pfad genutzt (`magick`, `convert`, `heif-convert`, `sips`); wenn auch dieser nicht verfügbar ist, gilt verbindlich: **markierter Skip** (`status: skipped-heic`) und **nicht-blockierender Exitcode**.
- Die Nicht-Blockierung gilt ausschließlich für den klar markierten Fall „HEIC-Skip wegen fehlendem Tooling“; alle anderen Verarbeitungsfehler bleiben build-blockierend.
- Der Metadaten-Report enthält dafür einen eigenen Abschnitt `heicStatus` (Support-Status, gewähltes Tool, Fallback-Nutzung, Skip-Zähler, TODO-Liste).

### Konkrete Empfehlungen für Nachlieferung
1. Mindestens 20–40 Realassets in einem ersten Pool bereitstellen (Portraits, Editorial-Stills, Wide Frames, Detailshots).
2. Davon gezielt:
   - 6–10 starke Portrait-Assets (4:5/3:4 tauglich)
   - 4–8 Wide Assets (16:9 robust)
   - 4–6 Detail-/Mood-Shots für Übergänge
   - 4–6 technisch saubere Press-Bilder
3. Nach Upload direkt eine detaillierte Inventur (`03_asset_inventory.md`) erstellen und 3–6 Lead-Assets finalisieren.
