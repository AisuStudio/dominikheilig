"use client";

import { useState } from "react";
import { DOORS } from "@/lib/content";

/**
 * Der Satz ist die Navigation. Drei Wörter sind Türen.
 *
 * Verhalten aus Figma (Header/Hovered, 35:462):
 *  - berührtes Wort nimmt seine Farbe an, das Highlight dahinter die 20-Prozent-Fassung
 *    (Bauteil Group 5: Highlighter mit Knotendeckkraft 0,2, Radius DH/SM-Round)
 *  - in Ruhe ist das Wort unterstrichen (DH/Title Underlined), berührt nicht mehr
 *  - die Eyebrow läuft mit: in Ruhe DH/Bright, berührt in der Türfarbe
 *  - die Info Note sitzt mittig unter dem Wort, oben bündig an der Unterkante des Highlights
 * Alle Übergänge 0,3 s.
 *
 * Es sind <a>-Elemente: ohne JavaScript bleiben drei echte Links stehen.
 */
export default function Hero() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="relative select-none text-center">
      <h1 className="t-title">
        <span className="block">
          {DOORS.map((d, i) => {
            const active = open === d.id;
            return (
              <span
                key={d.id}
                className="relative inline-block"
                style={{ marginRight: i < DOORS.length - 1 ? "0.28em" : 0 }}
              >
                <span
                  className="pixel hero-eyebrow pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] uppercase tracking-widest transition-colors duration-300"
                  style={{ color: active ? d.color : "var(--dh-bright)" }}
                >
                  {d.label}
                </span>

                <a
                  href={d.href}
                  onMouseEnter={() => setOpen(d.id)}
                  onMouseLeave={() => setOpen(null)}
                  onFocus={() => setOpen(d.id)}
                  onBlur={() => setOpen(null)}
                  onTouchStart={(e) => {
                    if (!active) { e.preventDefault(); setOpen(d.id); }
                  }}
                  data-active={active}
                  className="hero-word inline-block rounded-[var(--dh-round-sm)] px-[0.1em] outline-none"
                  style={{
                    backgroundColor: active ? d.tint : "transparent",
                    color: active ? d.color : "inherit",
                  }}
                >
                  {d.word}
                </a>

                {/* Info Note — mittig unter dem Wort, oben an der Unterkante des Highlights */}
                <span
                  aria-hidden={!active}
                  data-open={active}
                  className="hero-note pointer-events-none absolute top-full left-1/2 z-20 w-[352px] rounded-[var(--dh-round-md)] p-20 t-p2 text-left whitespace-pre-line"
                  style={{ background: d.color, color: "var(--dh-dark)" }}
                >
                  {d.note}
                </span>
              </span>
            );
          })}
        </span>
        <span className="block">get out of </span>
        <span className="block">your way?</span>
      </h1>
    </div>
  );
}
