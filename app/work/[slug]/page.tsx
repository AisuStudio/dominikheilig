import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ProjectViews from "@/components/ProjectViews";
import ClosingQuestion from "@/components/ClosingQuestion";
import ProjectAxes from "@/components/ProjectAxes";
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
      <SiteHeader crumb={project.title} crumbSlug={project.slug} />
      <div className="page page-sections min-h-dvh">
        {/* Eigener Rasterkasten, damit der Bildteil auf dem Telefon kleben kann:
            als Rasterzelle wäre sein Behälter nur eine Zeile hoch und `sticky`
            hätte keinen Weg. Die Spalten stimmen, weil beide Kästen dasselbe
            12er-Raster über dieselbe Breite legen. */}
        <div className="project-top grid12">
          <ProjectViews views={project.views} shots={project.shots} visit={project.visit} extraLink={project.extraLink} titel={project.title} />
        </div>

        <div className="grid12 content-start">
        {/* Titel und Vorspann, „Built with" daneben */}
        <div className="col-main mt-50">
          <h1 className="t-h2">{project.title}</h1>
          <ProjectAxes project={project} className="axes-page mt-20 t-eyebrow" />
          <div className="mt-20 max-w-[817px] space-y-20">
            {project.lead.split("\n\n").map((absatz, i) => (
              <p key={i} className="t-h3">{absatz}</p>
            ))}
          </div>
        </div>
        <div className="col-rail mt-50">
          <h2 className="t-h3">Built with</h2>
          <ul className="code-list mt-15 t-code" style={{ color: "var(--dh-can)" }}>
            {project.tech.split(" · ").map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {/* Beschriftete Abschnitte */}
        {project.sections.map((s, i) => (
          <Abschnitt
            key={s.label}
            {...s}
            geschlossen={project.closed ?? project.maturity === "Delivered"}
            visit={i === project.sections.length - 1 ? project.visit : undefined}
            extraLink={i === project.sections.length - 1 ? project.extraLink : undefined}
          />
        ))}

        {/* Schluss — Linie, Frage, Knopf */}
        <div className="col-body mt-50">
          <div className="rule" style={{ background: "#2a2a2a", opacity: 1 }} />
          <div className="mt-50 flex flex-wrap items-end gap-50">
            <ClosingQuestion />
            <a href={`mailto:${EMAIL}`} className="btn-outline px-50 py-15 t-p2">Reach out</a>
          </div>
        </div>

          <Footer />
        </div>
      </div>
    </>
  );
}

/** Die Leiste trägt die Farbe ihrer Art: Zahlen violett, Ausblick gold.
    Unbekannte Überschriften bleiben absichtlich hell — dann fällt auf, dass
    hier eine neue Art dazugekommen ist. */
function leistenTon(label: string) {
  if (label === "In numbers") return "rail-zahlen";
  if (label === "What's next") return "rail-status";
  return "";
}

function Abschnitt({
  label,
  steps,
  body,
  rail,
  geschlossen,
  visit,
  extraLink,
}: {
  label: string;
  steps?: string[];
  body: string[];
  rail?: { label: string; lines: string[] };
  /** Abgeschlossenes Projekt: hinter der letzten Station steht kein Pfeil mehr. */
  geschlossen?: boolean;
  /** Nur am letzten Abschnitt: der Verweis auf die Seite noch einmal, unten. */
  visit?: string;
  /** Steht daneben, nicht darunter. */
  extraLink?: { label: string; href: string };
}) {
  return (
    <>
      <p className="section-label t-eyebrow col-label mt-50">{label}</p>
      <div className="col-body mt-50 space-y-10">
        {steps ? (
          <ol className={`step-chain t-code${geschlossen ? " step-chain-zu" : ""}`}>
            {steps.map((schritt) => (
              <li key={schritt}>{schritt}</li>
            ))}
          </ol>
        ) : null}
        {body.map((absatz, i) => (
          <p key={i} className="t-body">{mitVerweisen(absatz)}</p>
        ))}
        {visit || extraLink ? (
          <div className="flex flex-wrap gap-20">
            {visit ? (
              <a
                href={visit}
                target="_blank"
                rel="noreferrer"
                className="link-hover t-p2"
                style={{ color: "var(--dh-link)" }}
              >
                Visit Website ↗
              </a>
            ) : null}
            {extraLink ? (
              <a href={extraLink.href} className="link-hover t-p2" style={{ color: "var(--dh-link)" }}>
                {extraLink.label}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
      {rail ? (
        <div className="col-rail mt-50">
          <h2 className="t-h3">{rail.label}</h2>
          <p className={`mt-15 t-code whitespace-pre-line ${leistenTon(rail.label)}`}>
            {rail.lines.join("\n")}
          </p>
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
