import Link from "next/link";
import { DIRECTIONS, type Project } from "@/lib/content";

/**
 * Listeneintrag nach Figma (Component 1/dh/Project List Item, 48:1565, Stand 25.08.).
 *
 * Jahr rechtsbündig in 53 px, dann ein Raster aus zwei Spalten, das über beide Zeilen
 * fluchtet: links Titel und Reifegrad, rechts Mini-Beschreibung und Richtungsmarken.
 * Marken sind DH/Eyebrow — 12 px Medium, versal, 10 % gesperrt.
 *
 * Ruhezustand DH/Soft Dim, beim Berühren volle Helligkeit und die Richtungen nehmen
 * ihre Farbe an; der Reifegrad bleibt hell. Beides in `globals.css`.
 */
export default function ProjectListItem({ project }: { project: Project }) {
  const inner = (
    <div className="flex gap-15">
      <p className="t-eyebrow list-year shrink-0">{project.year}</p>

      <div className="item-grid min-w-0">
        <h3 className="t-listtitle whitespace-nowrap">{project.title}</h3>
        <p className="mini-desc t-p2 max-w-[245px]">{project.mini}</p>

        <p className="t-eyebrow">{project.maturity}</p>
        <div className="flex flex-wrap gap-20 t-eyebrow">
          {DIRECTIONS.filter((d) => project.directions.includes(d.slug)).map((d) => (
            <span key={d.slug} className={`tag tag-${d.slug}`}>{d.short}</span>
          ))}
        </div>
      </div>
    </div>
  );

  // Der Eintrag führt auf die Projektseite, nicht nach außen — der Link zum
  // Produkt selbst steht dort in der rechten Leiste.
  return (
    <Link href={`/work/${project.slug}`} className="project-item block outline-none">
      {inner}
    </Link>
  );
}
