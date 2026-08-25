"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Screenshot links, Umschalter rechts — nach Figma (Fallseite 53:187, Bauteil Group 8).
 *
 * Die Zeile trägt eine Linie darunter, die aktive steht auf voller Helligkeit, die
 * übrigen auf DH/Soft Dim, beim Berühren wird sie DH/LINK. `shots` läuft in derselben
 * Reihenfolge wie `views`; wo kein Bild liegt, zeigt die Fläche den Namen der Ansicht.
 */
export default function ProjectViews({
  views,
  shots,
  visit,
  titel,
}: {
  views: string[];
  shots?: string[];
  visit?: string;
  titel: string;
}) {
  const [aktiv, setAktiv] = useState(0);
  const bild = shots?.[aktiv];

  return (
    <>
      <div
        className="relative col-main mt-50 overflow-hidden rounded-[var(--dh-round-md)]"
        style={{ aspectRatio: "811 / 427", border: "var(--dh-thin) solid #2a2a2a" }}
      >
        {bild ? (
          <Image
            src={bild}
            alt={`${titel} — ${views[aktiv]}`}
            fill
            sizes="(max-width: 700px) 100vw, 66vw"
            style={{ objectFit: "contain" }}
            priority={aktiv === 0}
          />
        ) : (
          <div className="grid h-full place-items-center">
            <span className="t-eyebrow" style={{ opacity: "var(--dh-soft-dim)" }}>
              {views[aktiv]}
            </span>
          </div>
        )}
      </div>

      <div className="col-rail mt-50">
        {views.map((v, i) => (
          <button
            key={v}
            type="button"
            aria-pressed={i === aktiv}
            onClick={() => setAktiv(i)}
            className="rail-row t-h3"
            style={{ opacity: i === aktiv ? 1 : "var(--dh-soft-dim)" }}
          >
            {v}
          </button>
        ))}

        {visit ? (
          <a
            href={visit}
            target="_blank"
            rel="noreferrer"
            className="link-hover mt-50 inline-block t-p2"
            style={{ color: "var(--dh-link)" }}
          >
            Visit Website ↗
          </a>
        ) : null}
      </div>
    </>
  );
}
