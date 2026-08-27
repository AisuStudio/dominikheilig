"use client";

import { useState } from "react";
import { INDUSTRIES, PROJECTS } from "@/lib/content";
import ProjectListItem from "./ProjectListItem";

/**
 * Chips + Liste. Die Chips sind Filter: einer aktiv, nochmal drücken hebt auf.
 * Zustände aus Figma (DH/Chip What|Can|i) — ausgewählt trägt der Chip die
 * 20-Prozent-Fassung seiner Richtungsfarbe als Fläche und die volle als Schrift.
 *
 * Es gibt keine eigene Work-Seite: `limit` zeigt erst einen Ausschnitt, der Knopf
 * klappt den Rest an Ort und Stelle auf. So bleibt die Startseite ruhig, auch wenn
 * später mehr Projekte dazukommen.
 */
export default function ProjectList({ limit = 5 }: { limit?: number }) {
  const [active, setActive] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = active ? PROJECTS.filter((p) => p.industry === active) : PROJECTS;
  const shown = expanded ? filtered : filtered.slice(0, limit);
  const rest = filtered.length - limit;

  return (
    <>
      {/* Gefiltert wird nach Branche. Die Knöpfe tragen Gold, weil die Branche im
          Eintrag die „What"-Achse ist — dieselbe Farbe, dieselbe Bedeutung.
          „All" ist die ausgeschaltete Auswahl und steht deshalb vorn. */}
      <div className="chips col-span-full mt-100 flex flex-wrap justify-center gap-10">
        {[null, ...INDUSTRIES].map((branche) => {
          return (
            <button
              key={branche ?? "alle"}
              type="button"
              aria-pressed={active === branche}
              onClick={() => { setActive(branche); setExpanded(false); }}
              className="chip t-tag"
            >
              {branche ?? "All"}
            </button>
          );
        })}
      </div>

      <div id="work" className="col-span-full mt-50 flex flex-col gap-50">
        {shown.map((p) => <ProjectListItem key={p.slug} project={p} />)}
        {shown.length === 0 && (
          <p className="t-p2" style={{ opacity: "var(--dh-soft-dim)" }}>
            Noch nichts unter dieser Richtung.
          </p>
        )}
      </div>

      {rest > 0 && (
        <div className="col-span-full mt-100 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="btn-outline cursor-pointer px-50 py-10 t-h3"
          >
            {expanded ? "Show Less" : `Show All ${filtered.length} Projects`}
          </button>
        </div>
      )}
    </>
  );
}
