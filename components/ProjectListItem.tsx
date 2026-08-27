import Link from "next/link";
import { DIRECTIONS, MATURITY_STUFEN, type Project } from "@/lib/content";

/**
 * Listeneintrag — Desktop nach `Component 9`, Telefon nach `Group 61`.
 *
 * Die drei Marken sind dieselben drei Achsen wie die Wörter im Hero, und die
 * Farbe trägt die Zuordnung: Gold für die Branche (What), Mint für die Rollen
 * (Can), Violett für den Reifegrad (I).
 *
 *   Desktop            Telefon
 *   ─────────────────  ──────────────
 *   Titel  Branche     Branche
 *          Rollen      Titel
 *          Reifegrad   Beschreibung
 *   Beschreibung       Reifegrad
 *
 * Auf dem Telefon fällt die Rollenzeile weg — drei Wörter, von denen meist
 * eins ausgegraut ist, sind auf 335 px zu viel Rauschen. Sie kommt auf der
 * Projektseite wieder. Die Umsortierung läuft über `display: contents` plus
 * `order`, damit im Markup eine Reihenfolge steht und nicht zwei.
 */
const ACHSEN = { what: "var(--dh-what)", can: "var(--dh-can)", i: "var(--dh-i)" } as const;

export default function ProjectListItem({ project }: { project: Project }) {
  const stufe = MATURITY_STUFEN[project.maturity];

  return (
    <Link href={`/work/${project.slug}`} className="project-item item-card outline-none">
      <h3 className="item-title t-listtitle whitespace-nowrap">{project.title}</h3>

      <div className="item-axes t-tag">
        <span className="axis-what" style={{ color: ACHSEN.what }}>{project.industry}</span>

        <span className="axis-can flex gap-20 whitespace-nowrap" style={{ color: ACHSEN.can }}>
          {DIRECTIONS.map((d) => (
            <span key={d.slug} style={{ opacity: project.directions.includes(d.slug) ? 1 : 0.5 }}>
              {d.short}
            </span>
          ))}
        </span>

        <span className="axis-i flex items-center gap-20 whitespace-nowrap" style={{ color: ACHSEN.i }}>
          {project.maturity}
          <span className="dots" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} data-an={i <= stufe} />
            ))}
          </span>
        </span>
      </div>

      <p className="item-mini t-p2">{project.mini}</p>
    </Link>
  );
}
