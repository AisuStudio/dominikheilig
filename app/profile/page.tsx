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
  { h: "Languages", b: ["German (native)", "English (C1)"] },
];

const SKILLS_RECHTS = [
  {
    h: "Build / AI",
    b: ["Rapid prototyping and shipping with agentic AI tooling (Claude Code, TypeScript, Next.js, Tailwind, Supabase, Vercel, WebGL)"],
  },
  { h: "Design", b: ["Agile, Scrum, Kanban, rapid prototyping, workshop design & facilitation, design sprints"] },
  { h: "Tools", b: ["Claude Code, Figma, Adobe Suite, Jira, Miro, Google Workspace"] },
];

/** Der große Block: Titelzeile und vier Sätze, die die These aufmachen. */
const APPROACH_GROSS = [
  "Prototype Thinking",
  "These days I build digital things incredibly faster and more versatile than I could have planned.",
  "Planning a digital product was the recommended order than just building it. It was a lot cheaper.",
  "From waterfall to agile, we planned as granular as we could (or were allowed to), often prototyped, but built last.",
  "AI is evolving that equation: a first working version is now often faster to build and share than to plan.",
];

const APPROACH_KLEIN = [
  "Most likely Prototype Thinking is the way of working. At least it's how I work now: start from a (comprehensive) vision, build a proof of concept, an MVP, use it, watch where it breaks.",
  "Requirements don't go away — knowing what I want is still half the craft — but they change shape: from documents written up front to skills and guardrails written along the way. Design Thinking wanted us to understand before we build; we still do — the understanding just arrives in increments, one working version at a time.",
  "Apparently in AI-driven companies this is already becoming team practice: skills, plug-ins and guardrails as shared assets, building blocks as a common library, prototypes landing inside existing architecture instead of beside it. This also opens up the window to blend disciplines and enable participation in the process.",
  "It comes with new breaking points and pitfalls, but I guess this is the new way.",
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

        <p className="col-span-full mt-20 max-w-[817px] t-h3">{LEAD}</p>

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

        {/* Der kleinere Text und die Schlussfrage stehen in derselben Rasterzeile */}
        <div className="col-main mt-100 max-w-[610px] space-y-20">
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
