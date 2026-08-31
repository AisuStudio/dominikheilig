---
name: projekttext
description: Schreibt und überarbeitet die Projekteinträge von dominikheilig.com in lib/content.ts — lead, sections, steps, rail. Auslösen bei "Projekttext", "Eintrag überarbeiten", "neues Projekt auf die Seite", "kürzen", "Portfolio-Text", oder wenn an ALLE_PROJEKTE geschrieben wird. Nicht für Anschreiben oder CV.
---

# Projekttexte für dominikheilig.com

Regeln auf Deutsch, **Ergebnis auf Englisch** — die Seite ist englisch.

## Wer liest das

Recruiter und Hiring Manager, unter Zeitdruck, auf einem zweiten Bildschirm.
Sie lesen den Lead und **zwei** Abschnitte. Was in Abschnitt drei und vier steht,
ist Bonus. Sie suchen vier Dinge, in dieser Reihenfolge:

1. Was ist das Ding?
2. Was war meine Rolle darin?
3. Welche Entscheidung habe ich getroffen — und warum?
4. Was kam raus?

Alles, was keine dieser vier Fragen beantwortet, steht zur Disposition.

## Die eine Prüfung

> **Könnte dieser Satz — dieses Stichwort, dieser Abschnittsname — unverändert
> über einem fremden Projekt stehen? Dann raus.**

Sie schlägt fast jede Floskel. Beispiele, die sie kassiert hat:

- Prozess-Stichworte `Idea → Proof of concept → Test → Basic functionality → Design`
  (gilt für jedes Projekt der Welt) → ersetzt durch belegte Stationen:
  `Tracker in local storage → One tool per need → Supabase backend → PWA with badge → Sharing`
- „That was the trade." / „The reason was that …" — Meta-Brücken, die eine
  Entscheidung kommentieren statt sie zu besitzen → `I chose those limits.`
- „It's become a comprehensively sweet, easy and quite fast tool to use."
  (fontane, Result) — drei Adjektive, kein Sachverhalt.
- „I am looking forward to …" — Absichtserklärung, kein Ergebnis.

## Zwei Archetypen

Die Zuordnung steht im Eintrag selbst und ist nicht Ermessenssache:
**`directions` enthält `"building"` → Archetyp A, sonst B.** Das trennt die
17 Einträge ohne eine einzige Ausnahme — die vier ohne `building` (movinga,
compass-co, treatwell, head-sports) sind genau die Anstellungen.

**A — eigenes Projekt / Prototyp** (13 Einträge: cnsl, fontane, normann, waitingroom …)

    How it works  →  Process  →  Hardest call  →  [ein weiterer]

`Hardest call` ist die wertvollste Sektion der ganzen Seite: eine echte
Entscheidung mit Begründung und Preis. Sie gehört auf Platz 2 oder 3, nie ans Ende.
`Process` davor sorgt dafür, dass die Entscheidung als Konsequenz der Arbeitsweise
gelesen wird und nicht als Anekdote.

**B — Anstellung / Auftrag** (4 Einträge: movinga, compass-co, treatwell, head-sports)

Abschnitte sind die **Arbeitspakete**, gleichlautend mit `views[]`. Jedes folgt
demselben Dreischritt, in genau dieser Reihenfolge:

    Ausgangslage  →  was ich getan habe  →  Ergebnis, mit Zahl

Movinga macht das vor: *„The result was an increase of about 7% in conversion rate —
roughly €150k more turnover year on year."* Ein Arbeitspaket ohne Ergebniszeile ist
unfertig. **Ein gescheitertes Paket gehört dazu** (Movinga, Partner-Bonus): es ist
das glaubwürdigste, was auf so einer Seite stehen kann.

## Grundgerüst für Archetyp A

Alle 13 `building`-Einträge folgen demselben Bau. Projektspezifisch ist nur der
vierte Abschnitt.

    Lead, Absatz 1   Was ist es — und was habe ich als Nutzer davon?
    Lead, Absatz 2   Warum gibt es das? Kurz, persönlich, konkret.
    How it works     Die Werkzeuge und die Mechanik. Hier gehören Details hin.
    Process          Die Kette, von der Vision bis heute. Plus, was sie nicht sagt.
    Hardest call     Eine Entscheidung, ihre Begründung, ihr Preis.
    [projektspezifisch]  Publishing · Provenance gate · Why there is no login · …

### Lead, Absatz 1 — die Karte

    <Name> is a <Kategorie> for <für wen>. <Was der Nutzer davon hat.>

**Die Kategorie muss ein Wort sein, das der Leser schon kennt** — „productivity
app", „font editor", „rule set", „dashboard". Erst danach darf die Bauform kommen.

- ✗ „Seven tools over one shared set of projects." — *Welche* Werkzeuge?
  Bohrmaschinen? Der Satz beschreibt die Form und verschweigt die Sache.
- ✓ „CNSL is a DIY productivity app for one person or a small team. It runs in
  the browser, so the same seven tools and the same projects are on every device."

Der Nutzen steht in der Sprache des Nutzers, nicht in der des Erbauers: nicht
„runs as a PWA", sondern „on every device, without an install".

**Werkzeug- und Feature-Details gehören nicht in den Lead**, sondern in
„How it works". Der Lead beantwortet zwei Fragen und hört dann auf.

### Lead, Absatz 2 — der Funke

Ein bis zwei Sätze: warum es das überhaupt gibt. Persönlich, konkret, datiert wo
möglich — aber als Pointe, nicht als Anlauf:

> „The name and the idea are from 2006, when Windows Mobile on my HTC was too
> cumbersome to catch a thought. I built it twenty years later, after my
> time-tracking app shut down."

Zusammen **höchstens 60 Wörter**. Der Lead rendert in `t-h3` (32 px): jedes Wort
ist dort dreimal so teuer wie im Fließtext. Nicht wiederholen, was daneben schon
steht — `maturity`, `industry`, `timeSpent` und `tech` haben eigene Plätze.

### Process — die Kette (`steps`)

Feste Grammatik, für jedes Projekt gleich:

    <Vision / Anlass>  →  <erster greifbarer Stand>  →  <2–3 Nutzensprünge>  →  <wo es heute steht>

1. **Station 1 ist immer die Vision oder der Anlass**, Station 2 der erste
   greifbare Stand. Nicht das Wort „Vision" hinschreiben — die Sache benennen:
   `Pocket console idea`, nicht `Idea`.
2. **Jede weitere Station ist ein Nutzensprung, keine Technologie.** Die Technik
   steht rechts in „Built with" und hat auf der Kette nichts verloren.
   - ✗ `Supabase backend` · `PWA with badge` · `Event log, no state`
   - ✓ `Works on a second device` · `On the phone` · `Every change traceable`
3. **So untechnisch wie möglich.** Kein Wort, das ein Recruiter nachschlagen müsste.
4. Letzte Station = wo es heute steht. Der Pfeil dahinter bleibt offen; bei
   `maturity: "Delivered"` fällt er weg.
5. 5 bis 6 Stationen, **höchstens zwei Zeilen** — im Browser prüfen, nicht im Kopf.
6. Was die Kette sagt, sagt der Fließtext darunter **nicht noch einmal**. Er sagt,
   was die Kette nicht kann: warum die Reihenfolge so ist.

### „What's next" — die Statusleiste

Jeder `building`-Eintrag trägt eine `rail` mit `label: "What's next"`. Sie sagt,
**wo das Produkt heute steht** — bei dreizehn Nebenprojekten ist das die Frage,
die ein Recruiter still stellt: *bringt der Mensch etwas zu Ende?*

Sie steht als `rail`, **nie als eigener Abschnitt**. Die rechte Spalte liegt in
derselben Rasterzeile wie der Text daneben: solange sie kürzer ist als dieser,
kostet sie **null Höhe**. Ein fünfter Abschnitt kostet ~350 px, bevor er etwas sagt.
400 px breit, 18 px Mono, **~37 Zeichen pro Zeile** — Zeilenumbrüche selbst setzen.

Zeile 1 ist der Status. Er soll vergleichbar bleiben wie `maturity`, aber die
Sache schlagen — wo Doms eigene Formulierung genauer ist, gewinnt sie. Die Liste
ist gewachsen aus dem, was auf der Seite tatsächlich steht:

    laufend      Actively built · In daily use — saturated
                 In use across every project · Built behind the curtain
    wartend      Awaiting reviewer input · Awaiting stakeholder review
                 Final beta of <Version>
    beendet      Finished prototype · Finished and delivered · Delivered
    ruhend       Dormant · Dormant since <Mon YYYY> · Parked

„Saturated" ist der ehrlichste Zustand für ein Werkzeug, das seinen Zweck erfüllt:
gemessen am Bedarf des Nutzers, nicht an einer Spezifikation. Es sagt „fertig genug",
ohne „fertig" zu behaupten.

**„Next" und „Maybe" sind zwei verschiedene Dinge.** Eine Absicht steht als
`Next:`, eine Idee als `Maybe:`. Der Unterschied ist genau das, was ein Recruiter
an einem Portfolio mit dreizehn Nebenprojekten lesen will.

**Ein abgeschlossenes Projekt schließt die Kette.** `closed: true` am Eintrag
nimmt den Pfeil hinter der letzten Station weg — nicht nur bei `Delivered`, auch
bei einem Prototyp-Sprint, der sein Ziel erreicht hat und keine Roadmap trägt.

Dann eine Leerzeile, dann der nächste Schritt, konkret:

    In daily use — saturated

    Small fixes only, no roadmap.
    It grows when a need shows up.

**„Dormant since March 2026" ist keine Schwäche.** Ein ehrlich als ruhend
markiertes Projekt liest sich als Urteilsvermögen; dreizehn Projekte, die alle
„aktiv" behaupten, lesen sich als Selbstüberschätzung. Wo nichts folgt, steht
nichts — kein „more to come".

Belegpflicht wie überall: Status und nächster Schritt kommen von Dom, nicht aus
meiner Vermutung. Fehlt die Auskunft, steht `PLATZHALTER` und ein `// TODO Dom:`.

## Satzbau

- **Ziel: Ø unter 16 Wörter pro Satz.** Über 20 ist ein Befund, kein Stil.
- Höchstens zwei Glieder pro Satz. Semikolon-Ketten mit vier, fünf Gliedern
  auflösen — sie entstehen beim Aufzählen von Features.
- Aktiv, erste Person, wo eine Entscheidung fällt. „I chose", nicht „it was decided".
- Der Doppelpunkt trägt die Begründung, der Gedankenstrich den Zusatz. Beides
  höchstens einmal pro Absatz.

## Zahlen

- Wo belegte Zahlen existieren, gehören sie in die `rail` mit `label: "In numbers"`.
  Sie stehen rechts auf Höhe des Abschnitts und werden beim Überfliegen zuerst gesehen.
- Nur 3 von 17 Einträgen haben eine. Bei jedem Durchgang prüfen, ob es welche gibt.
- **Nichts erfinden.** Die Kopfregel von `content.ts` gilt: alles ist aus den Repos
  belegt. Fehlt Material, fragen — nicht schätzen, nicht runden, nicht „etwa".

## Zielkorridor

Aus der Seite gemessen, nicht geschätzt: eine Zeile sind ~30 px und ~8 Wörter, ein
Abschnitt kostet 100 px reine Luft, und ein Lead-Wort kostet **3,3×** so viel Platz
wie ein Fließtext-Wort (32 px gegen 20 px).

| | Ziel | Grund |
|---|---|---|
| Lead | **45–60 Wörter** | 60 Wörter sind bereits ein voller Bildschirm |
| Pro Abschnitt | **60–100 Wörter** | 100 W = 368 px = ein halber Bildschirm |
| Abschnitte | **3–4** | der fünfte kostet 350 px, bevor er etwas sagt |
| Gesamt | **250–320 Wörter** | Textblock bleibt unter zwei Bildschirmen |

Unter ~150 Wörtern wirkt ein Eintrag wie ein Stub. Über ~380 wird der letzte
Abschnitt praktisch nicht mehr erreicht.

**Die Deckelung pro Abschnitt ist wichtiger als die Gesamtzahl.** Ein Abschnitt mit
180 Wörtern wird übersprungen; zwei mit je 90 werden gelesen, bei gleicher Masse.
Und wichtiger als beides ist die Reihenfolge: ein Recruiter gibt der Seite 30 bis 60
Sekunden, ein vollständiges Lesen von 300 Wörtern dauert eher 90. Er liest nie alles
— entscheidend ist, dass das Beste in den ersten zwei Abschnitten steht.

Ein Eintrag darf länger sein, wenn die Substanz es trägt — aber dann bewusst und
mit Begründung, nicht aus Trägheit beim Kürzen.

## Vor dem Abschluss

```bash
python3 .claude/skills/projekttext/scripts/messen.py <slug>
```

Das Skript vergleicht den Arbeitsstand gegen `HEAD` und zeigt Wörter, Sätze und
Ø Satzlänge pro Abschnitt. Ohne Argument: die Tabelle über alle Einträge.

Dann:

1. `npx tsc --noEmit` — der Eintrag ist getippter Code, kein Text.
2. Seite auf Port 3100 ansehen (`preview_start`, Eintrag „dominikheilig").
3. `views[]` und `shots[]` gleich lang und in gleicher Reihenfolge.
4. Kette auf zwei Zeilen prüfen — im Browser, nicht im Kopf.
