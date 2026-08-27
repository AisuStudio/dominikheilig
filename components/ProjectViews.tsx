"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Die Ansichten eines Projekts — zwei Bedienungen aus einem Markup.
 *
 *   Desktop   ein Bild, rechts die Liste zum Umschalten
 *   Telefon   alle Bilder als Karussell zum Wischen, jede Karte beschriftet
 *
 * Alle Karten stehen immer im Markup. Auf dem Desktop liegen sie übereinander
 * und nur die gewählte ist sichtbar, auf dem Telefon nebeneinander in einer
 * schnappenden Rolle. Das Wischen braucht kein JavaScript: `scroll-snap-type`
 * macht es nativ, mit dem Schwung und dem Gummiband des Systems, und es
 * funktioniert auch, wenn das Skript nicht lädt.
 *
 * Der Umschalter rechts fällt auf dem Telefon weg — er wäre dieselbe Liste ein
 * zweites Mal. Der Verweis auf die Seite bleibt.
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

  return (
    <>
      <div className="views-strip col-main mt-50">
        {views.map((v, i) => {
          const bild = shots?.[i];
          return (
            <figure key={v} className="view-card" data-aktiv={i === aktiv}>
              <div className="view-frame">
                {bild ? (
                  <Image
                    src={bild}
                    alt={`${titel} — ${v}`}
                    fill
                    sizes="(max-width: 700px) 88vw, 66vw"
                    style={{ objectFit: "contain" }}
                    priority={i === 0}
                    /* Bewegte GIFs laufen am Bilddienst vorbei — sonst friert er sie auf ein Bild ein. */
                    unoptimized={bild.endsWith(".gif")}
                  />
                ) : (
                  <div className="grid h-full place-items-center">
                    <span className="t-eyebrow" style={{ opacity: "var(--dh-soft-dim)" }}>{v}</span>
                  </div>
                )}
              </div>
              <figcaption className="view-label t-h3">{v}</figcaption>
            </figure>
          );
        })}
      </div>

      <div className="col-rail mt-50">
        <div className="view-switch">
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
        </div>

        {visit ? (
          <a
            href={visit}
            target="_blank"
            rel="noreferrer"
            className="view-visit link-hover mt-50 inline-block t-p2"
            style={{ color: "var(--dh-link)" }}
          >
            Visit Website ↗
          </a>
        ) : null}
      </div>
    </>
  );
}
