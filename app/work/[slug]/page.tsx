import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProjectViews from "@/components/ProjectViews";
import { EMAIL, PROJECTS } from "@/lib/content";

/**
 * Projektseite nach Figma „Project Page / Case" (53:187).
 *
 * Oben Screenshot mit Umschalter rechts, darunter Titel und Vorspann mit „Built with"
 * daneben, dann die beschrifteten Abschnitte — Marke in Spalte 1–2, Text in 3–8, und
 * wo es Zahlen gibt, stehen sie rechts auf gleicher Höhe. Am Ende die Linie mit der
 * Frage und dem Knopf, wie auf der About-Seite.
 */

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return { title: p ? `${p.title} — Dominik Heilig` : "Dominik Heilig" };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader crumb={project.title} />
      <div className="page grid12 min-h-dvh content-start">
        <ProjectViews views={project.views} shots={project.shots} visit={project.visit} titel={project.title} />

        {/* Titel und Vorspann, „Built with" daneben */}
        <div className="col-main mt-100">
          <h1 className="t-h2">{project.title}</h1>
          <p className="mt-20 max-w-[817px] t-h3">{project.lead}</p>
        </div>
        <div className="col-rail mt-100">
          <h2 className="t-h3">Built with</h2>
          <p className="mt-15 t-code">{project.tech}</p>
        </div>

        {/* Beschriftete Abschnitte */}
        {project.sections.map((s) => (
          <Abschnitt key={s.label} {...s} />
        ))}

        {/* Schluss — Linie, Frage, Knopf */}
        <div className="col-body mt-100">
          <div className="rule" style={{ background: "#2a2a2a", opacity: 1 }} />
          <div className="mt-50 flex flex-wrap items-end gap-50">
            <p className="t-h2">
              <span className="block">What can I </span>
              <span className="block">get out of </span>
              <span className="block">your way?</span>
            </p>
            <a href={`mailto:${EMAIL}`} className="btn-outline px-50 py-15 t-p2">Reach out</a>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

function Abschnitt({
  label,
  body,
  rail,
}: {
  label: string;
  body: string[];
  rail?: { label: string; lines: string[] };
}) {
  return (
    <>
      <p className="section-label t-eyebrow col-label mt-100">{label}</p>
      <div className="col-body mt-100 space-y-10">
        {body.map((absatz, i) => (
          <p key={i} className="t-body">{absatz}</p>
        ))}
      </div>
      {rail ? (
        <div className="col-rail mt-100">
          <h2 className="t-h3">{rail.label}</h2>
          <p className="mt-15 t-code whitespace-pre-line">{rail.lines.join("\n")}</p>
        </div>
      ) : null}
    </>
  );
}
