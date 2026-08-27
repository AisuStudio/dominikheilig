import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ClosingQuestion from "@/components/ClosingQuestion";
import { EMAIL } from "@/lib/content";

export const metadata = { title: "About — Dominik Heilig" };

/**
 * About nach Figma „About / Case-consistent" (74:103).
 *
 * Zwei Rhythmen mit Absicht: oben ein beschrifteter Abschnitt — Marke in Spalte 1–2,
 * Text in 3–8 — wie auf der Fallseite. Unten öffnet sich die Seite wieder in das
 * zweispaltige Raster, daneben in Spalte 9–12 der Schluss, unten bündig mit dem Raster.
 */

const LEAD =
  "Design-led product manager. I own products end-to-end and design and prototype them myself, with 15 years in tech across product, design and brand (SaaS, MarTech, marketplaces, logistics, lately construction and real estate).";

const HOW_I_WORK = [
  "What I'm good at is deciding what's worth building and making it coherent. Breaking whole ideas into small, buildable steps has been my craft since I started out storyboarding 3D animation, and it's still the core of how I work.",
  "I prototype quickly with agentic AI to learn fast, then act on what I learn, with security and privacy in from the start.",
];

const SKILLS_LINKS = [
  {
    h: "Product Management",
    b: [
      "product strategy & vision, roadmapping, prioritization, continuous discovery, backlog ownership,",
      "user stories & acceptance criteria, lifecycle management, A/B testing, data analysis (Google Analytics), stakeholder",
      "management, cross-functional leadership, go-to-market",
    ],
  },
  { h: "Languages", b: ["German (native)", "English (C1)", "Russian (B1)"] },
];

const SKILLS_RECHTS = [
  {
    h: "Build / AI",
    b: ["rapid prototyping and shipping with agentic AI tooling (Claude Code, TypeScript, Next.js, Tailwind, Supabase, Vercel, WebGL)"],
  },
  { h: "Design", b: ["Agile, Scrum, Kanban, rapid prototyping, workshop design & facilitation, design sprints"] },
  { h: "Tools", b: ["Figma, Adobe Suite, Jira, Miro, Google Workspace"] },
];

function SkillGruppe({ h, b }: { h: string; b: string[] }) {
  return (
    <div>
      <h3 className="t-h3">{h}</h3>
      {b.map((zeile, i) => (
        <p key={i} className={`t-p2 ${i === 0 ? "mt-15" : "mt-15"}`}>{zeile}</p>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <div className="page grid12 min-h-dvh content-start">
        <h1 className="col-span-full t-h2 mt-100">About</h1>

        <p className="col-span-full mt-20 max-w-[817px] t-h3">{LEAD}</p>

        {/* Beschrifteter Abschnitt — Marke links, Text im Textfeld */}
        <p className="section-label t-eyebrow col-label mt-100">How I work</p>
        <div className="col-body mt-100 space-y-10">
          {HOW_I_WORK.map((p, i) => <p key={i} className="t-body">{p}</p>)}
        </div>

        <h2 className="col-span-full t-h2 mt-100">Skills</h2>

        {/* Raster links, Schluss rechts — gleiche Rasterzeile, deshalb unten bündig */}
        <div className="col-half-a mt-15 space-y-50">
          {SKILLS_LINKS.map((g) => <SkillGruppe key={g.h} {...g} />)}
        </div>
        <div className="col-half-b mt-15 space-y-50">
          {SKILLS_RECHTS.map((g) => <SkillGruppe key={g.h} {...g} />)}
        </div>
        <div className="col-rail mt-15 flex flex-col items-start justify-end">
          <ClosingQuestion />
          <a href={`mailto:${EMAIL}`} className="btn-outline mt-50 px-50 py-15 t-p2">Reach out</a>
        </div>

        <Footer />
      </div>
    </>
  );
}
