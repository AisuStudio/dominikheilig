import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProjectViews from "@/components/ProjectViews";
import { DIRECTIONS, EMAIL, PROJECTS } from "@/lib/content";

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
      <SiteHeader crumb={project.title} crumbSlug={project.slug} />
      <div className="page grid12 min-h-dvh content-start">
        <ProjectViews views={project.views} shots={project.shots} visit={project.visit} titel={project.title} />

        {/* Titel und Vorspann, „Built with" daneben */}
        <div className="col-main mt-100">
          <h1 className="t-h2">{project.title}</h1>
          <div className="meta-row mt-10 t-eyebrow">
            <span>{project.maturity}</span>
            {/* In der Reihenfolge von DIRECTIONS, damit die Farbfolge auf allen
                Seiten dieselbe ist — nicht in der Reihenfolge der Projektdaten. */}
            <ul>
              {DIRECTIONS.filter((d) => project.directions.includes(d.slug)).map((d) => (
                <li key={d.slug} style={{ color: d.color }}>{d.label}</li>
              ))}
            </ul>
          </div>
          <div className="mt-10 max-w-[817px] space-y-20">
            {project.lead.split("\n\n").map((absatz, i) => (
              <p key={i} className="t-h3">{absatz}</p>
            ))}
          </div>
        </div>
        <div className="col-rail mt-100">
          <h2 className="t-h3">Built with</h2>
          <ul className="code-list mt-15 t-code">
            {project.tech.split(" · ").map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {/* Beschriftete Abschnitte */}
        {project.sections.map((s, i) => (
          <Abschnitt key={s.label} {...s} visit={i === project.sections.length - 1 ? project.visit : undefined} />
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
  visit,
}: {
  label: string;
  body: string[];
  rail?: { label: string; lines: string[] };
  /** Nur am letzten Abschnitt: der Verweis auf die Seite noch einmal, unten. */
  visit?: string;
}) {
  return (
    <>
      <p className="section-label t-eyebrow col-label mt-100">{label}</p>
      <div className="col-body mt-100 space-y-10">
        {body.map((absatz, i) => (
          <p key={i} className="t-body">{mitVerweisen(absatz)}</p>
        ))}
        {visit ? (
          <a
            href={visit}
            target="_blank"
            rel="noreferrer"
            className="link-hover inline-block t-p2"
            style={{ color: "var(--dh-link)" }}
          >
            Visit Website ↗
          </a>
        ) : null}
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

/**
 * Absatztext darf einen Verweis tragen: [Beschriftung](Adresse).
 * Bewusst nur diese eine Auszeichnung — die Texte kommen aus Figma, und dort
 * hängt der Verweis am Wort. Alles andere bleibt Text.
 */
const VERWEIS = /\[([^\]]+)\]\(([^)]+)\)/g;

function mitVerweisen(text: string) {
  const teile: (string | React.ReactElement)[] = [];
  let zuletzt = 0;
  for (const treffer of text.matchAll(VERWEIS)) {
    const [ganz, beschriftung, adresse] = treffer;
    const start = treffer.index!;
    if (start > zuletzt) teile.push(text.slice(zuletzt, start));
    teile.push(
      <a key={start} href={adresse} target="_blank" rel="noreferrer" className="link-hover underline">
        {beschriftung}
      </a>,
    );
    zuletzt = start + ganz.length;
  }
  if (!teile.length) return text;
  if (zuletzt < text.length) teile.push(text.slice(zuletzt));
  return teile;
}
