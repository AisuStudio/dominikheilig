#!/usr/bin/env python3
"""Misst die Projekttexte in lib/content.ts.

    python3 messen.py            Tabelle über alle Einträge
    python3 messen.py <slug>     ein Eintrag, Abschnitt für Abschnitt, gegen HEAD

Gezählt wird, was der Leser sieht: `lead`, die `body`-Absätze und `steps`.
Nicht gezählt: tech, views, Bildpfade, rail — die haben eigene Plätze auf der Seite.
"""
import re
import subprocess
import sys
from pathlib import Path

DATEI = "lib/content.ts"


def wurzel() -> Path:
    p = Path(__file__).resolve()
    for eltern in p.parents:
        if (eltern / DATEI).exists():
            return eltern
    sys.exit(f"{DATEI} nicht gefunden — aus dem Projektordner aufrufen.")


def texte(block: str) -> str:
    """Alle Zeichenketten eines Blocks als ein Fließtext."""
    roh = re.findall(r'"((?:[^"\\]|\\.)*)"', block)
    return " ".join(roh).replace("\\n\\n", " ")


def zaehle(fliess: str, kette: str = "") -> tuple[int, int]:
    """Wörter über beides, Sätze nur über den Fließtext.

    `steps` sind Stichworte ohne Satzzeichen. Zählte man sie als Satz mit, würde
    die Kette mit dem ersten Satz darunter verschmelzen und einen Riesensatz melden.
    """
    woerter = [w for w in (fliess + " " + kette).split() if any(c.isalnum() for c in w)]
    saetze = [s for s in re.split(r"[.!?](?:\s|$)", fliess) if s.strip()]
    return len(woerter), max(1, len(saetze))


def bloecke(src: str) -> dict[str, str]:
    ab = src.index("const ALLE_PROJEKTE")
    teile = re.split(r'\n  \{\n(?=    slug: ")', src[ab:])[1:]
    return {re.search(r'slug: "([^"]+)"', t).group(1): t for t in teile}


def abschnitte(block: str) -> dict[str, tuple[str, str]]:
    """Lead und Abschnitte als (Fließtext, Kette), in Seitenreihenfolge."""
    out: dict[str, tuple[str, str]] = {}
    if "lead:" in block:
        out["Lead"] = (texte(block[block.index("lead:"): block.index("views:")]), "")
    if "sections:" not in block:
        return out
    sec = block[block.index("sections:"):]
    for m in re.finditer(r'label: "([^"]+)",\n(.*?)(?=\n      \},)', sec, re.S):
        label, rumpf = m.group(1), m.group(2)
        if "numbers" in label.lower():
            continue
        rumpf = re.sub(r"rail: \{.*", "", rumpf, flags=re.S)  # rail zählt nicht mit
        kette = re.search(r"steps: \[(.*?)\],", rumpf, re.S)
        if kette:
            rumpf = rumpf.replace(kette.group(0), "")
        out[label] = (texte(rumpf), texte(kette.group(1)) if kette else "")
    return out


def gesamt(teile: dict[str, tuple[str, str]]) -> tuple[int, int]:
    return zaehle(" ".join(f for f, _ in teile.values()),
                  " ".join(k for _, k in teile.values()))


def tabelle(src: str) -> None:
    """Eine Zeile je Eintrag, mit Diagnose statt bloßer Markierung.

    Zu kurz ist nicht dasselbe wie zu lang: ein kleines Projekt hat legitim
    weniger zu sagen. Gemeldet wird deshalb, *was* nicht stimmt.
    """
    print(f"{'slug':<17}{'Wörter':>7}{'Ø Satz':>8}{'Absch.':>8}  {'Befund':<26}Abschnitte")
    print("-" * 112)
    for slug, block in bloecke(src).items():
        teile = abschnitte(block)
        w, s = gesamt(teile)
        namen = [k for k in teile if k != "Lead"]
        befund = []
        if w > 320:
            befund.append(f"lang +{w - 320}")
        elif w < 150:
            befund.append(f"dünn {w}")
        if w / s > 16:
            befund.append(f"Satz {w / s:.1f}")
        if len(namen) > 4:
            befund.append(f"{len(namen)} Abschnitte")
        dick = [k for k in namen if zaehle(*teile[k])[0] > 100]
        if dick:
            befund.append(f"{len(dick)}× über 100 W")
        lead_w = zaehle(*teile["Lead"])[0] if "Lead" in teile else 0
        if lead_w > 60:
            befund.append(f"Lead {lead_w}")
        print(f"{slug:<17}{w:>7}{w / s:>8.1f}{len(namen):>8}  "
              f"{(' · '.join(befund) or 'ok')[:26]:<26}{' · '.join(namen)[:34]}")
    print("\nZiel: 250–320 Wörter (ab 150 tragfähig), Ø unter 16, 3–4 Abschnitte,")
    print("max. 100 Wörter je Abschnitt, Lead höchstens 60.")


def vergleich(src_neu: str, wurzel_pfad: Path, slug: str) -> None:
    alt_src = subprocess.run(
        ["git", "show", f"HEAD:{DATEI}"], capture_output=True, text=True, cwd=wurzel_pfad
    ).stdout
    b_neu = bloecke(src_neu)
    if slug not in b_neu:
        sys.exit(f"Kein Eintrag „{slug}“. Vorhanden: {', '.join(b_neu)}")
    alt = abschnitte(bloecke(alt_src).get(slug, ""))
    neu = abschnitte(b_neu[slug])

    print(f"{slug}\n")
    print(f"{'Abschnitt':<24}{'vorher':>8}{'nachher':>9}{'Diff':>8}")
    print("-" * 49)
    for name in dict.fromkeys([*alt, *neu]):
        va = zaehle(*alt[name])[0] if name in alt else 0
        vn = zaehle(*neu[name])[0] if name in neu else 0
        marke = "" if name in alt and name in neu else ("  (neu)" if name in neu else "  (weg)")
        print(f"{name[:23]:<24}{va or '—':>8}{vn or '—':>9}{vn - va:>+8}{marke}")

    wa, sa = gesamt(alt)
    wn, sn = gesamt(neu)
    print("-" * 49)
    print(f"{'GESAMT':<24}{wa:>8}{wn:>9}{wn - wa:>+8}"
          f"   ({(wn - wa) / wa * 100:+.1f} %)" if wa else "")
    print(f"{'Ø Wörter/Satz':<24}{wa / sa:>8.1f}{wn / sn:>9.1f}{wn / sn - wa / sa:>+8.1f}")


if __name__ == "__main__":
    w = wurzel()
    quelle = (w / DATEI).read_text(encoding="utf-8")
    if len(sys.argv) > 1:
        vergleich(quelle, w, sys.argv[1])
    else:
        tabelle(quelle)
