import { DIRECTIONS, type Project } from "@/lib/content";

/**
 * Die drei Achsen eines Projekts, in der Farbe ihrer Zeile:
 *
 *   Branche                          Gold    → What: in welcher Welt
 *   Building · Management · Design   Mint    → Can:  womit
 *   Reifegrad + Punktreihe           Violett → I:    wie weit gebracht
 *
 * Der Reifegrad steht als Wort mit einer Punktreihe über fünf Stufen. Die
 * Punktzahl steht je Projekt in den Daten und wird nicht aus dem Wort
 * abgeleitet: zwei Projekte im selben Zustand können verschieden weit sein.
 *
 * Steht im Listeneintrag und auf der Projektseite. Die Rollen sind immer alle
 * drei da — die des Projekts hell, die übrigen auf halber Deckkraft: die Reihe
 * ist eine Skala, und eine Skala ohne ihre leeren Stufen sagt weniger.
 *
 * Größe und Sichtbarkeit steuert die aufrufende Seite über `className`, weil
 * beide Orte sich unterscheiden: die Liste zeigt 10 px SemiBold und lässt die
 * Rollen auf dem Telefon weg, die Projektseite zeigt 12 px Medium und behält
 * sie.
 */
const ACHSEN = { what: "var(--dh-what)", can: "var(--dh-can)", i: "var(--dh-i)" } as const;

export default function ProjectAxes({ project, className = "" }: { project: Project; className?: string }) {
  return (
    <div className={`item-axes ${className}`}>
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
            <span key={i} data-an={i <= project.points} />
          ))}
        </span>
        {/* Nur in der Liste: „Mature Prototype" allein lässt an Monate denken.
            Daneben „38 Days" ist das ganze Argument. Auf der Projektseite steht
            die Zeit schon rechts unter „Time spent" — dort blendet CSS sie aus. */}
        {project.timeSpent ? <span className="axis-time">{project.timeSpent}</span> : null}
      </span>
    </div>
  );
}
