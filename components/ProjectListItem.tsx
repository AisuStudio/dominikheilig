import Link from "next/link";
import ProjectAxes from "./ProjectAxes";
import { type Project } from "@/lib/content";

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
export default function ProjectListItem({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className="project-item item-card outline-none">
      <h3 className="item-title t-listtitle whitespace-nowrap">{project.title}</h3>

      <ProjectAxes project={project} className="axes-list t-tag" />

      <p className="item-mini t-p2">{project.mini}</p>
    </Link>
  );
}
