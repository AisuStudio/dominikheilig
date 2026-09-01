#!/usr/bin/env python3
"""Vergleicht einen Figma-Abzug mit dem Code und zeigt, was sich geändert hat.

    python3 aus-figma.py abzug.json           was ist anders?
    python3 aus-figma.py abzug.json --apply   die Änderungen übernehmen

Der Abzug entsteht mit dem `use_figma`-Schnipsel aus SKILL.md („Rückweg"). Er
enthält je Rahmen die benannten Textknoten, also `lead.1`, `section.2.body.3`,
`section.2.steps.4`, `bio`, `about.lead` und so weiter.

Der Vergleich läuft über den Text, nicht über die Struktur: geänderte Absätze
werden ersetzt, neue und weggefallene gemeldet. Struktur ändert das Skript nie
von allein — dafür ist ein Mensch zuständig.
"""
import json
import re
import sys
from pathlib import Path

def _wurzel() -> Path:
    """Nach oben laufen, bis lib/content.ts auftaucht — wie in messen.py."""
    for eltern in Path(__file__).resolve().parents:
        if (eltern / "lib/content.ts").exists():
            return eltern
    sys.exit("lib/content.ts nicht gefunden — aus dem Projektordner aufrufen.")


WURZEL = _wurzel()
CONTENT = WURZEL / "lib/content.ts"
HOME = WURZEL / "components/Home.tsx"
PROFILE = WURZEL / "app/profile/page.tsx"


def lade(pfad: Path) -> str:
    return pfad.read_text(encoding="utf-8")


def ts_escape(s: str) -> str:
    return s.replace("\\", "\\\\").replace('"', '\\"').replace("\n", "\\n")


def felder_aus_abzug(abzug):
    """{slug: {feldname: text}} — der Slug kommt aus dem meta-Block."""
    raus = {}
    for rahmen in abzug["frames"]:
        f = rahmen.get("felder", {})
        meta = f.get("meta", "")
        m = re.search(r"slug\s+(\S+)", meta)
        schluessel = m.group(1) if m else rahmen["name"]
        raus[schluessel] = {"rahmen": rahmen["name"], **f}
    return raus


def vergleiche(quelle: str, alt: str, neu: str, wo: str, befunde: list):
    if alt is None or neu is None or alt.strip() == neu.strip():
        return quelle
    if alt not in quelle:
        befunde.append({"wo": wo, "status": "nicht gefunden", "alt": alt[:70]})
        return quelle
    befunde.append({"wo": wo, "status": "geändert", "alt": alt[:70], "neu": neu[:70]})
    return quelle.replace(alt, neu, 1)


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    abzug = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    anwenden = "--apply" in sys.argv
    daten = felder_aus_abzug(abzug)

    content = lade(CONTENT)
    home = lade(HOME)
    profile = lade(PROFILE)
    befunde = []

    # --- Projekteinträge ---
    for slug, f in daten.items():
        if slug in ("01 · Landing", "02 · About"):
            continue
        block = re.search(rf'slug: "{re.escape(slug)}".*?(?=\n  \{{\n    slug: "|\n\];)', content, re.S)
        if not block:
            befunde.append({"wo": slug, "status": "kein Eintrag im Code"})
            continue
        roh = block.group(0)
        neu_roh = roh
        # Vorspann, Abschnittsmarken, Absätze, Kettenstationen, Leisten
        for name, wert in sorted(f.items()):
            if name in ("rahmen", "meta"):
                continue
            m = re.match(r"(lead|section)\.(.+)", name)
            if not m:
                continue
            # den passenden String im Block finden: gleiche Position im gleichen Feld
            kandidaten = re.findall(r'"((?:[^"\\]|\\.)*)"', neu_roh)
            treffer = [k for k in kandidaten if k.replace('\\"', '"') == wert]
            if treffer:
                continue  # unverändert
            befunde.append({"wo": f"{slug} · {name}", "status": "abweichend", "neu": wert[:70]})

    # --- Landing ---
    if "01 · Landing" in daten:
        f = daten["01 · Landing"]
        for feld, muster in [("bio", r'export const BIO =\s*\n?\s*"((?:[^"\\]|\\.)*)"'),
                             ("bio.cta", r'export const BIO_CTA = "((?:[^"\\]|\\.)*)"')]:
            if feld not in f:
                continue
            m = re.search(muster, content)
            if m:
                content = vergleiche(content, m.group(1), ts_escape(f[feld]), "content.ts · " + feld, befunde)

    # --- About ---
    if "02 · About" in daten:
        f = daten["02 · About"]
        # Einzelne Marken: ein Figma-Knoten, eine Konstante im Code
        for figma_feld, konstante in [("about.label.approach", "APPROACH_LABEL")]:
            if figma_feld not in f:
                continue
            m = re.search(rf'const {konstante} = "((?:[^"\\]|\\.)*)"', profile)
            if m:
                profile = vergleiche(profile, m.group(1), ts_escape(f[figma_feld]),
                                     f"profile · {konstante}", befunde)

        for figma_feld, konstante in [("about.lead", "LEAD"),
                                      ("about.howiwork", "HOW_I_WORK"),
                                      ("about.approach.big", "APPROACH_GROSS"),
                                      ("about.approach.small", "APPROACH_KLEIN")]:
            if figma_feld not in f:
                continue
            absaetze = [a.strip() for a in re.split(r"\n\s*\n|\n(?=[A-Z])", f[figma_feld]) if a.strip()]
            m = re.search(rf"const {konstante} = \[(.*?)\n\];", profile, re.S)
            if not m:
                continue
            alt = [x for x in re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))]
            if [a.replace('\\"', '"') for a in alt] == absaetze:
                continue
            neu = "\n".join(f'  "{ts_escape(a)}",' for a in absaetze)
            profile = profile[:m.start(1)] + "\n" + neu + profile[m.end(1):]
            befunde.append({"wo": f"profile · {konstante}",
                            "status": f"{len(alt)} → {len(absaetze)} Absätze"})

        # Skills: die Bloecke stehen als { h: "...", b: [...] } in zwei Arrays
        for i in range(1, 9):
            marke, koerper = f.get(f"about.skills.{i}.label"), f.get(f"about.skills.{i}.body")
            if not marke or koerper is None:
                continue
            m = re.search(rf'\{{\s*h: "{re.escape(marke)}",\s*b: \[(.*?)\],?\s*\}}', profile, re.S)
            if not m:
                befunde.append({"wo": f"profile · Skills/{marke}", "status": "kein Block im Code"})
                continue
            alt = [x.replace('\\"', '"') for x in re.findall(r'"((?:[^"\\]|\\.)*)"', m.group(1))]
            absaetze = [a.strip() for a in koerper.split("\n") if a.strip()]
            if alt == absaetze:
                continue
            ersatz = "\n".join(f'      "{ts_escape(a)}",' for a in absaetze)
            profile = profile[:m.start(1)] + "\n" + ersatz + "\n    " + profile[m.end(1):]
            befunde.append({"wo": f"profile · Skills/{marke}", "status": "geändert",
                            "alt": " / ".join(alt)[:70], "neu": " / ".join(absaetze)[:70]})

    if not befunde:
        print("Keine Abweichung. Figma und Code sind deckungsgleich.")
        return
    print(f"{len(befunde)} Abweichungen:\n")
    for b in befunde:
        print(f"  {b['wo']:<44}{b['status']}")
        if b.get("alt"):
            print(f"      alt: {b['alt']}")
        if b.get("neu"):
            print(f"      neu: {b['neu']}")
    if anwenden:
        CONTENT.write_text(content, encoding="utf-8")
        HOME.write_text(home, encoding="utf-8")
        PROFILE.write_text(profile, encoding="utf-8")
        print("\nÜbernommen. `npx tsc --noEmit` und die Seite auf 3100 prüfen.")
    else:
        print("\nNichts geschrieben. Mit --apply übernehmen.")


if __name__ == "__main__":
    main()
