import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import ClosingQuestion from "@/components/ClosingQuestion";
import { EMAIL } from "@/lib/content";

export const metadata = { title: "Profile — Dominik Heilig" };

/**
 * Profile — nach dem überarbeiteten Rahmen „Homepage / About" (35:1006).
 *
 * Drei große Überschriften, jede in einer der drei Türfarben: Profile in Gold
 * (What), Skills in Mint (Can), Approach in Violett (I). Dieselbe Zuordnung
 * wie im Hero, in den Listeneinträgen und in der Schlussfrage — die Seite
 * sagt damit dreimal dasselbe System, nur an anderer Stelle.
 */

const LEAD = [
  "I am a design-led Product Manager and agentic builder in Berlin, with 15+ years in tech.",
  "I own, design, prototype and build products end to end.",
  "SaaS, MarTech, marketplaces, logistics, lately construction and typography.",
];

const HOW_I_WORK = [
  "Breaking large projects into buildable steps has been part of my work since I started out storyboarding 3D animation.",
  "I prototype fast with agentic AI to learn, iterate and improve.",
  "Security and privacy go in from the start.",
  "I like a team around me. At Movinga, touching the booking flow meant touching every department in the company — that is the kind of problem I find interesting.",
];

const SKILLS_LINKS = [
  {
    h: "Product Management",
    b: [
      "Product strategy & vision, roadmapping, prioritisation, continuous discovery, backlog ownership, user stories & acceptance criteria, lifecycle management, A/B testing, product analytics, pricing & monetisation, stakeholder management, cross-functional leadership, go-to-market",
    ],
  },
  {
    h: "Build / AI",
    b: [
      "Rapid prototyping and shipping with agentic AI tooling; connecting APIs and normalising their formats",
      "(Claude Code, Figma, TypeScript, Next.js, Tailwind, Supabase, Vercel, WebGL, ...)",
    ],
  },
];

const SKILLS_RECHTS = [
  { h: "Design", b: ["Design systems, UI/UX, editorial, storyboarding"] },
  { h: "Methods", b: ["Agile, Scrum, Kanban, rapid prototyping, workshop design & facilitation, design sprints"] },
  { h: "Tools", b: ["Claude Code, Figma, Adobe Suite, Jira, Miro, Google Workspace"] },
  { h: "Languages", b: ["German (native)", "English (C1)"] },
];

/** Der große Block: Titelzeile und vier Sätze, die die These aufmachen. */
const APPROACH_GROSS = [
  "Prototype Thinking",
  "These days I build digital things faster than I could have planned them.",
  "Planning a digital product first used to be the recommended order. It was a lot cheaper than building.",
  "From waterfall to agile, we planned as granular as we could — or were allowed to. We often prototyped, but built last.",
  "AI changes that equation. A first working version is now often faster to build and share than to plan.",
];

/** Die Marke links neben dem kleineren Approach-Text — wie „How I work". */
const APPROACH_LABEL = "The outlook I see";

const APPROACH_KLEIN = [
  "Most likely Prototype Thinking is the new way of working. At least it is how I work now: start from a vision for context, strip it to the core, build a proof of concept, then an MVP. Test it, watch where it breaks, and turn what breaks into SKILL.md files and guardrails so it does not break twice. Because requirements don't go away.",
  "Design Thinking wanted us to understand before we build. We still need to. The understanding just arrives in increments. Design sprints were great for aggregating perspectives, but they tied up a lot of team capacity, and a measurable ROI stayed beyond the horizon.",
  "In AI-driven companies this is already becoming team practice: skills, plug-ins, harnesses and guardrails as shared assets, building blocks as a common library. Prototypes land inside the existing architecture instead of beside it, which can be tricky as LLM semantics are not deterministic, and results vary a lot across models and individuals.",
  "That also opens a window to blend disciplines, and to let more people take part. Prototype Thinking comes with new breaking points and pitfalls. How it evolves from here is the interesting part — happy to discuss.",
];

function SkillGruppe({ h, b }: { h: string; b: string[] }) {
  return (
    <div>
      <h3 className="t-h3">{h}</h3>
      {b.map((zeile, i) => (
        <p key={i} className="mt-15 t-p2" style={{ opacity: "var(--dh-soft-dim)" }}>{zeile}</p>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <div className="page page-sections grid12 min-h-dvh content-start">
        <h1 className="col-span-full t-h2 mt-100" style={{ color: "var(--dh-what)" }}>Profile</h1>

        {/* Drei Zeilen, wie im Figma-Rahmen — je eine Aussage. */}
        <div className="col-span-full mt-20 max-w-[817px] space-y-10">
          {LEAD.map((zeile, i) => <p key={i} className="t-h3">{zeile}</p>)}
        </div>

        {/* Beschrifteter Abschnitt — Marke links, Text im Textfeld */}
        <p className="section-label t-eyebrow col-label mt-100">How I work</p>
        <div className="col-body mt-100 space-y-10">
          {HOW_I_WORK.map((p, i) => <p key={i} className="t-body">{p}</p>)}
        </div>

        <h2 className="col-span-full t-h2 mt-100" style={{ color: "var(--dh-can)" }}>Skills</h2>

        {/* Raster links und rechts, beide oben bündig */}
        <div className="col-half-a mt-15 space-y-50">
          {SKILLS_LINKS.map((g) => <SkillGruppe key={g.h} {...g} />)}
        </div>
        <div className="col-half-b mt-15 space-y-50">
          {SKILLS_RECHTS.map((g) => <SkillGruppe key={g.h} {...g} />)}
        </div>

        <h2 className="col-span-full t-h2 mt-100" style={{ color: "var(--dh-i)" }}>Approach</h2>

        <div className="col-main mt-50 space-y-20">
          {APPROACH_GROSS.map((z, i) => <p key={i} className="t-h3">{z}</p>)}
        </div>

        {/* Der kleinere Text und die Schlussfrage stehen in derselben Rasterzeile.
            Die Marke sitzt zwei Rasterspalten links davon, wie bei „How I work". */}
        <p className="section-label t-eyebrow col-label mt-100">{APPROACH_LABEL}</p>
        <div className="col-body mt-100 max-w-[610px] space-y-20">
          {APPROACH_KLEIN.map((z, i) => (
            <p key={i} className="t-body" style={{ opacity: "var(--dh-soft-dim)" }}>{z}</p>
          ))}
        </div>
        {/* `justify-end` drückt den Block ans untere Ende der Rasterzeile, damit er
            mit dem Approach-Text abschließt statt oben neben ihm zu beginnen. */}
        <div className="col-rail mt-100 flex flex-col items-start justify-end">
          <ClosingQuestion />
          <a href={`mailto:${EMAIL}`} className="btn-outline mt-50 px-50 py-10 t-h3">Reach out</a>
        </div>

        <Footer />
      </div>
    </>
  );
}
