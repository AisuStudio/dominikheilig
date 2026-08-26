"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PROJECTS } from "@/lib/content";

/**
 * Der Projektname in der Kopfzeile ist eine Klappe — nach Frame 19,
 * Variante „Project" mit dem Winkel aus Variante3 (100:128) und der Zeile
 * „Component 6" (100:150).
 *
 * Sie listet die übrigen Projekte; das laufende steht ja schon in der Marke.
 * Der Winkel ist der exportierte Pfad aus Figma, nur die Füllung ist auf
 * currentColor gesetzt, damit er beim Berühren mitgeht.
 *
 * Bewusst keine ARIA-Menü-Rollen: das wären Pfeiltasten und Roving-Tabindex,
 * die es hier nicht gibt. Es ist eine aufklappbare Liste von Links — Tab
 * läuft hindurch, Escape schließt, ein Klick daneben auch.
 */
export default function CrumbMenu({ titel, slug }: { titel: string; slug: string }) {
  const [offen, setOffen] = useState(false);
  const huelle = useRef<HTMLSpanElement>(null);

  // Klick daneben und Escape schließen; beides nur solange offen.
  useEffect(() => {
    if (!offen) return;
    const daneben = (e: MouseEvent) => {
      if (!huelle.current?.contains(e.target as Node)) setOffen(false);
    };
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOffen(false);
    };
    document.addEventListener("pointerdown", daneben);
    document.addEventListener("keydown", taste);
    return () => {
      document.removeEventListener("pointerdown", daneben);
      document.removeEventListener("keydown", taste);
    };
  }, [offen]);

  const weitere = PROJECTS.filter((p) => p.slug !== slug);

  return (
    <span ref={huelle} className="relative inline-flex items-center">
      <button
        type="button"
        aria-expanded={offen}
        aria-controls="krume-klappe"
        onClick={() => setOffen((o) => !o)}
        className="link-hover inline-flex items-center gap-15 t-h3 outline-none"
      >
        <span>&thinsp;/{titel}</span>
        <svg
          className="crumb-chevron shrink-0"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M17.5759 6.87499L16.9129 7.5379L10.8839 13.5669C10.3957 14.0551 9.60426 14.0551 9.11611 13.5669L3.08707 7.5379L2.42416 6.87499L3.74999 5.54916L4.4129 6.21207L9.99999 11.7992L15.5871 6.21207L16.25 5.54916L17.5759 6.87499Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {offen ? (
        <nav id="krume-klappe" aria-label="Weitere Projekte" className="crumb-menu">
          {weitere.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              onClick={() => setOffen(false)}
              className="crumb-row t-h3"
            >
              {p.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </span>
  );
}
