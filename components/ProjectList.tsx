"use client";

import { useState } from "react";
import { DIRECTIONS, PROJECTS, type Direction } from "@/lib/content";
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
  const [active, setActive] = useState<Direction | null>(null);
  const [expanded, setExpanded] = useState(false);

  const filtered = active ? PROJECTS.filter((p) => p.directions.includes(active)) : PROJECTS;
  const shown = expanded ? filtered : filtered.slice(0, limit);
  const rest = filtered.length - limit;

  return (
    <>
      <div className="col-span-full mt-100 flex flex-wrap justify-center gap-20 sm:gap-50">
        {DIRECTIONS.map((d) => {
          const on = active === d.slug;
          return (
            <button
              key={d.slug}
              type="button"
              aria-pressed={on}
              onClick={() => { setActive(on ? null : d.slug); setExpanded(false); }}
              className="cursor-pointer rounded-[100px] px-20 py-10 t-p2 whitespace-nowrap transition-colors duration-300"
              style={{
                background: on ? d.tint : "var(--dh-bright-20)",
                color: on ? d.color : "var(--dh-bright)",
              }}
            >
              {d.label}
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
            className="btn-outline cursor-pointer px-50 py-15 t-p2"
          >
            {expanded ? "Show Less" : `Show All ${filtered.length} Projects`}
          </button>
        </div>
      )}
    </>
  );
}
