# 02 Design System

## 1. Ziel des Design Systems
Dieses Dokument definiert verbindliche Systemregeln für Home und Unterseiten der Dama-Venus-Website. Fokus ist ein konsistentes, image-first Interface mit klarer Typo-Hierarchie, stabiler Layoutlogik und belastbaren Accessibility-Baselines.

---

## 2. Verbindliche Typo-Hierarchie

### 2.1 Rollen und Prioritäten
- **H1:** Seitenidentität (einmal pro Seite)
- **H2:** Hauptsektionen innerhalb einer Seite
- **H3:** Modul-/Komponentenüberschriften
- **H4:** Unterpunkte, Meta-Titel, kleine Strukturanker
- **Body:** Fließtext, Beschreibungen, längere Inhalte
- **Label:** kurze Kategorisierung, Overline, Bild-/Modulmarker
- **CTA:** primäre und sekundäre Handlungsaufforderungen

### 2.2 Verbindliche Größen (Desktop)
- **H1:** 56 px / 110% / 0 bis -0.01em / 500–600
- **H2:** 40 px / 115% / -0.005em / 500–600
- **H3:** 30 px / 120% / 0em / 500
- **H4:** 24 px / 125% / 0em / 500
- **Body L:** 20 px / 145% / 0em / 400
- **Body M (Standard):** 18 px / 150% / 0em / 400
- **Body S:** 16 px / 155% / 0em / 400
- **Label:** 12–14 px / 130% / +0.08em / 500 (uppercase oder small caps konsistent je Seite)
- **CTA:** 16 px / 120% / +0.02em / 500–600

### 2.3 Verbindliche Größen (Mobile)
- **H1:** 36 px / 115%
- **H2:** 30 px / 120%
- **H3:** 24 px / 125%
- **H4:** 20 px / 130%
- **Body L:** 18 px / 150%
- **Body M:** 16 px / 155%
- **Body S:** 15 px / 155%
- **Label:** 11–12 px / 130% / +0.08em
- **CTA:** 16 px / 120%

### 2.4 Einsatzregeln
- Pro View darf nur **eine H1** verwendet werden.
- Heading-Level dürfen nicht übersprungen werden (H2 → H4 ohne H3 ist unzulässig).
- Auf Bildflächen sind nur **Label, H1/H2 oder kurze Body-Cluster** erlaubt; lange Texte nie direkt auf unruhigen Motiven.
- CTA-Texte bleiben kurz, aktiv und konsistent (Verb + Ziel, z. B. „Zum Release“, „Kontakt anfragen“).

---

## 3. Raster- und Spacing-System (Desktop + Mobile)

### 3.1 Container und Grid
**Desktop (≥ 1200 px):**
- 12-Spalten-Grid
- Max-Content-Breite: 1440 px
- Seitliche Außenabstände: 64 px
- Gutter: 24 px

**Tablet (768–1199 px):**
- 8-Spalten-Grid
- Außenabstände: 40 px
- Gutter: 20 px

**Mobile (< 768 px):**
- 4-Spalten-Grid
- Außenabstände: 20 px
- Gutter: 16 px

### 3.2 Spacing-Skala (8-pt-Basis)
Verbindliche Abstände: **4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 120**.

Einsatz:
- In-Komponente (Text/Button/Badge): 8–24
- Zwischen Komponenten innerhalb einer Sektion: 24–48
- Zwischen Sektionen: 64–120 (Desktop), 48–80 (Mobile)

### 3.3 Weißraumlogik
- Weißraum ist ein aktives Gestaltungsmittel, keine Restfläche.
- Jede inhaltlich neue Aussage startet mit einem klaren vertikalen Rhythmuswechsel (mind. 64 px Desktop / 48 px Mobile).
- Bildlastige Blöcke benötigen an mindestens einer Seite „Atemraum“ (freie Fläche ohne Text/Icons).
- Bei hoher visueller Dichte wird Textmenge reduziert statt Abstände zu komprimieren.

---

## 4. Komponentenprinzipien für image-first Seiten

### 4.1 Grundprinzip
- Bild führt, Text rahmt.
- Jede image-first Komponente braucht eine klare **Lesefläche** (ruhige Zone) bereits im Asset oder via Overlay.
- Text darf Motivwirkung nicht zerstören (keine Textlegung auf Augen/Gesichter mit hoher Detaildichte).

### 4.2 Text auf Bild
- Maximal 1 Headline + 1 kurze Zusatzzeile + 1 CTA im direkten Bildoverlay.
- Längere Inhalte in nachgelagertes Textpanel auslagern.
- Mindestabstand von Text zum Komponentenrand: 24 px (Mobile), 40 px (Desktop).

### 4.3 Overlay-System
Erlaubte Overlays:
- **Gradient-Overlay** (linear/radial) zur Lesesicherung
- **Tint-Overlay** (dunkel oder markenakzentuiert, sparsam)
- **Scrim-Zone** hinter Text (subtil, nicht flächig dominant)

Nicht erlaubt:
- Harte opake Flächen, die das Bild als Hauptträger neutralisieren
- Dekorative Effekte ohne funktionale Lesbarkeitsrolle

### 4.4 Kontrastregeln auf Bild
- Text auf Bild erfüllt mindestens **WCAG AA** (4.5:1 bei normalem Text, 3:1 bei großer Schrift).
- Wenn Kontrast nicht stabil erreichbar ist: Motiv wechseln, Overlay verstärken oder Text aus dem Bild herauslösen.
- CTA auf Bild benötigt klar erkennbare Zustände (Default/Hover/Focus/Active) mit ausreichendem Kontrast.

---

## 5. Navigations- und Footer-Systemregeln (global)

### 5.1 Navigation (für Home und Unterseiten gleich)
- Primärnavigation ist überall konsistent benannt und angeordnet.
- Logo/Brand-Wordmark verlinkt immer auf Home.
- Aktive Seite ist eindeutig markiert (nicht nur über Farbe, zusätzlich Form/Weight/Indicator).
- Header-Höhe bleibt über Seiten hinweg stabil; kein sprunghafter Wechsel zwischen Templates.
- Mobile Navigation als klar strukturierter Overlay-/Drawer-Flow mit sichtbarer Schließen-Aktion und Fokusführung.

### 5.2 Verhalten
- Navigation bleibt erreichbar (sticky oder semisticky), ohne Content zu verdecken.
- Scroll- und Hover-Effekte sind zurückhaltend, funktional und konsistent.
- Keine Sonder-Navigation nur für einzelne Unterseiten, außer dokumentierte Ausnahmefälle.

### 5.3 Footer (für Home und Unterseiten gleich)
- Einheitliche Informationsarchitektur: Brand, Kernlinks, Kontakt/Impressum/Datenschutz, optional Social.
- Link-Reihenfolge und Benennung bleiben überall identisch.
- Footer ist visuell ruhiger als Hero-/Lead-Bereiche und bildet den verlässlichen Endpunkt.

---

## 6. Accessibility-Baselines (verbindlich)

### 6.1 Fokus und Tastatur
- Alle interaktiven Elemente sind per Tastatur erreichbar.
- Sichtbarer Fokus-Indikator mit ausreichendem Kontrast auf allen Hintergründen.
- Fokus-Reihenfolge folgt der visuellen/logischen Lesereihenfolge.
- Skip-Link zu Hauptinhalt ist vorzusehen.

### 6.2 Kontrast und Lesbarkeit
- Text/Interaktion erfüllt mindestens WCAG-AA-Kontrastanforderungen.
- Platzhaltertexte sind kontraststark genug und nicht als einziges Label verwendet.
- Kritische Informationen werden nie ausschließlich farblich vermittelt.

### 6.3 Formulare und Labels
- Jedes Eingabefeld hat ein programmatisch verknüpftes, sichtbares Label.
- Fehlerzustände enthalten Text + visuelle Markierung + ggf. ARIA-Hinweise.
- Pflichtfelder sind eindeutig markiert und vor Absenden nachvollziehbar.

### 6.4 Motion-Reduktion
- `prefers-reduced-motion` wird respektiert.
- Bei aktivierter Reduktion: keine parallaxenartigen Bewegungen, reduzierte Dauer/Amplitude, keine auto-play-lastigen Übergänge.
- Animationen dürfen Orientierung unterstützen, aber nie Bedienbarkeit blockieren.

---

## 7. Konsequenzen für 06_subpages.md
Die Ausarbeitung von `06_subpages.md` muss dieses Dokument direkt anwenden:

1. Jede Unterseite erhält eine klar ausgewiesene Typo-Map mit H1–H4, Body, Label und CTA gemäß Kapitel 2.
2. Jede Seitenstruktur wird auf Basis der Grid-/Spacing-Regeln aus Kapitel 3 spezifiziert (inkl. Desktop/Mobile).
3. Image-first Unterseiten müssen je Modul angeben, wo Text liegt, welches Overlay genutzt wird und wie Kontrast gesichert wird (Kapitel 4).
4. Navigation und Footer dürfen auf Unterseiten nicht als separates System gedacht werden, sondern sind als globale Konstante aus Kapitel 5 zu übernehmen.
5. Jede Unterseite enthält explizite Accessibility-Checks zu Fokus, Kontrast, Form-Labels und Motion-Reduktion gemäß Kapitel 6.
6. Falls eine Unterseite von diesen Regeln abweicht, muss die Abweichung als begründete Ausnahme dokumentiert und freigegeben werden.
