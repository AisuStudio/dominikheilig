// Inhalte. Alles hier ist aus den jeweiligen Repos belegt (README, package.json,
// Konzeptdokumente) — nichts erfunden. Wo mir Material fehlt, steht PLATZHALTER.

export type Direction = "building" | "management" | "design";

/** Feste Liste wie in palette — kein Freitext, damit die Zeile vergleichbar bleibt. */
export type Maturity =
  | "Exploration"
  | "Early Stage"
  | "Ongoing"
  | "Mature Prototype"
  | "Delivered";

/** Die drei Richtungen. Farben wie im Hero: What → Gold, Can → Mint, I → Violett. */
export const DIRECTIONS: { slug: Direction; label: string; short: string; color: string; tint: string }[] = [
  { slug: "building",   label: "Building",   short: "Building",   color: "var(--dh-what)", tint: "var(--dh-what-20)" },
  { slug: "management", label: "Management", short: "Management", color: "var(--dh-can)",  tint: "var(--dh-can-20)" },
  { slug: "design",     label: "Design",     short: "Design",     color: "var(--dh-i)",    tint: "var(--dh-i-20)" },
];

/** Ein beschrifteter Abschnitt der Projektseite; `rail` steht rechts auf gleicher Höhe. */
export type Section = {
  label: string;
  /** Ablauf in Stichworten, vor dem Fließtext. Die Pfeile setzt die Darstellung,
      auch hinter dem letzten Schritt: die Kette ist offen, das Projekt läuft
      weiter. Bei einem abgeschlossenen Projekt gehört der letzte Pfeil weg. */
  steps?: string[];
  body: string[];
  rail?: { label: string; lines: string[] };
};

export type Project = {
  slug: string;
  title: string;
  year: string;          // TODO Dom: Jahreszahlen prüfen, alles auf 2026 gesetzt
  mini: string;          // zwei Zeilen neben dem Titel, ca. 44 Zeichen
  maturity: Maturity;
  /** In welcher Welt das Projekt spielt — die What-Achse. Steht als Marke im
      Listeneintrag und speist die Filterknöpfe der Startseite. */
  industry?: string;
  /** Wie viele der fünf Punkte gefüllt sind. Steht je Projekt und wird NICHT
      aus `maturity` abgeleitet: zwei Projekte im selben Zustand können
      verschieden weit sein. */
  points: number;
  /** Was das Projekt gekostet hat — „Full Time Employment", „2 Days" … Steht
      auf der Projektseite unter „Built with". Darf fehlen. */
  timeSpent?: string;
  directions: Direction[];
  lead: string;          // Vorspann der Projektseite
  views: string[];       // Umschalter über dem Screenshot
  shots?: string[];      // Bilder in derselben Reihenfolge wie `views`
  tech: string;          // „Built with"
  sections: Section[];
  visit?: string;
  /** Schließt die Prozesskette — hinter der letzten Station steht kein Pfeil.
      Ohne Angabe schließt sie bei `maturity: "Delivered"`. Hier zu setzen, wenn
      ein Projekt abgeschlossen ist, ohne ausgeliefert worden zu sein: ein
      Prototyp-Sprint, der sein Ziel erreicht hat und keine Roadmap trägt. */
  closed?: boolean;
  readMore?: string;
  /** Zurückgestellt: taucht weder in der Liste noch als Seite auf. Der Eintrag
      bleibt erhalten, damit er ohne Neuschreiben wieder sichtbar werden kann. */
  hidden?: boolean;
};

const ALLE_PROJEKTE: Project[] = [
  {
    slug: "fontane",
    title: "Fontane.Studio",
    year: "2026",
    mini: "Handwriting font editor, free to use",
    maturity: "Mature Prototype",
    points: 3,
    industry: "Type design",
    timeSpent: "38 Days",
        directions: ["building", "management", "design"],
    lead:
      "Fontane.Studio is a free handwriting font editor in the browser. Draw your glyphs and it builds a real OTF file — no account, no install, and the project file moves between a tablet and a PC.\n\n" +
      "I have run comic-font workshops since 2024 with the type designer Sylvain Mazas. The tool we used only runs on macOS, so iPad and Windows users were left out.",
    views: ["Grid", "Typer", "Writer", "Marketplace", "Font specimen", "Analytics"],
    shots: [
      "/work/fontane/grid.jpg",
      "/work/fontane/typer.jpg",
      "/work/fontane/writer.jpg",
      "/work/fontane/marketplace.jpg",
      "/work/fontane/specimen.jpg",
      "/work/fontane/analytics.jpg",
    ],
    tech: "opentype.js · perfect-freehand · Supabase · UFO & JSON export · spoken usability review transcribed with Vibe (open source)",
    sections: [
      {
        label: "How it works",
        body: [
          "Draw glyphs, ligatures and contextual alternates by hand; the editor builds an OpenType file from the strokes themselves.",
          "Its own project file, a .fff, carries the work between devices, so a drawing started on a tablet can be finished on a PC. An open marketplace publishes finished fonts, and the site runs on cookie-free analytics of its own.",
        ],
      },
      {
        label: "Process",
        steps: [
          "Workshops, no iPads",
          "Rough editor",
          "OTF export",
          "Rebuilt from scratch",
          "Marketplace",
        ],
        body: [
          "A rough first prototype out of a comprehensive vision, then testing, feedback and iteration.",
          "After a deep review the editor was rebuilt from scratch. The first version made drawing feel like fighting the tool, and no amount of patching was going to fix that.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Final beta of 2.0",
            "",
            "Next: UX and workflow fixes,",
            "then traffic for real feedback",
          ],
        },
      },
      {
        label: "Hardest call",
        body: [
          "Anyone could have uploaded a licensed typeface like Helvetica and published it as free. An account would not have stopped that: being signed in says nothing about where a font came from.",
          "So the gate is built on server-stamped drawing events instead. To publish, the strokes have to have been drawn in Fontane and the server has to have seen them happen. That keeps other people’s typefaces out.",
          "More about the security process [here ↗](https://cnsl.aisu.studio/note/dominik-heilig/documentation/security-and-privacy-check).",
        ],
      },
      {
        label: "Result",
        body: [
          "Users report bugs and suggest improvements through the app. The last round of feedback changed the editor more than any plan of mine did.",
        ],
        rail: {
          label: "In numbers",
          lines: ["565 visits", "280 sessions", "14 drew", "8 exported a font", "1 published", "", "25 s median visit", "52 s to first stroke"],
        },
      },
    ],
    visit: "https://fontane.studio",
    readMore: "https://github.com/AisuStudio/fontane",
  },

  {
    slug: "cnsl",
    title: "CNSL",
    year: "2026",
    mini: "Seven tools over one set of projects",
    maturity: "Mature Prototype",
    points: 3,
    industry: "Productivity",
    timeSpent: "34 Days",
    directions: ["building", "management", "design"],
    lead:
      "CNSL is a DIY productivity app for one person or a small team. It runs in the browser, so the same seven tools and the same projects are on every device.\n\n" +
      "The name and the idea are from 2006, when Windows Mobile on my HTC was too cumbersome to catch a thought. I built it twenty years later, after my time-tracking app shut down.",
    views: [
      "Tracker",
      "Note Pad",
      "Calendar",
      "Noder",
      "Scheduler",
      "Chat",
      "Blurp Logger",
      "Published note",
    ],
    shots: [
      "/work/cnsl/demo-tracker.jpg",
      "/work/cnsl/demo-notepad.jpg",
      "/work/cnsl/demo-calendar.jpg",
      "/work/cnsl/demo-noder.jpg",
      "/work/cnsl/demo-scheduler.jpg",
      "/work/cnsl/demo-chat.jpg",
      "/work/cnsl/demo-blurp.jpg",
      "/work/cnsl/note.jpg",
    ],
    tech: "Next.js · Supabase · Prisma · TipTap · dnd-kit · fractional-indexing · Web Push · HeroTour",
    sections: [
      {
        label: "How it works",
        body: [
          "The tracker holds the tasks and runs a timer on one or many of them — one click, on the task itself. While it runs, the PWA on my phone carries a badge, which is what I kept forgetting in Toggl.",
          "The calendar puts tasks on dates. The scheduler turns a repeated sequence into timed steps. The noder chains tasks through an LLM. The note pad became my micro publisher, and the chat works inside projects.",
          "A note can be given its own public URL. A project can be shared with editor, viewer or contributor roles, or opened for submissions from people without an account.",
        ],
      },
      {
        label: "Process",
        steps: [
          "Pocket console idea",
          "Browser prototype",
          "One tool per need",
          "On every device",
          "Shared",
        ],
        body: [
          "I am the user, every day. The sequence above is the order in which I ran into each need — not a plan drawn up in advance.",
          "The board seeds itself from CNSL’s own roadmap on first load. The app tracks its own development, so every missing feature is visible while you use it.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "The first version kept everything in the browser. Tasks lived in local storage — no server, no account. That ruled out sharing and a second device.",
          "I chose those limits. The shape of the product changed every week. With nothing in a database there was nothing to migrate when a view changed; with no data on a server there was nothing that could leak. The backend came once the shape had settled.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "In daily use — saturated",
            "",
            "Small fixes only, no roadmap.",
            "It grows when a need shows up.",
          ],
        },
      },
    ],
    visit: "https://cnsl.aisu.studio",
  },

  {
    slug: "solarkreis",
    title: "SolarKreis",
    year: "2026",
    mini: "Read-only monitoring with a safe write path",
    maturity: "Early Stage",
    points: 2,
    industry: "Energy",
    timeSpent: "2 Days",
    directions: ["building", "management", "design"],
    lead:
      "SolarKreis is a monitoring dashboard for a solar park: three fields, seven inverters, one control centre. The plant is simulated. The weather, the power price and the fire detections are real, and the interface marks which is which at every point.\n\n" +
      "It carries one pattern end to end: give a read-only monitoring prototype a safe write path. Built in two days, alone.",
    views: [
      "System map",
      "Field map",
      "Control room",
      "Guard and tenancy",
      "Event log",
      "Data sources",
      "Documentation",
    ],
    shots: [
      "/work/solarkreis/intro.jpg",
      "/work/solarkreis/map.jpg",
      "/work/solarkreis/control.jpg",
      "/work/solarkreis/guard.jpg",
      "/work/solarkreis/log.jpg",
      "/work/solarkreis/sources.jpg",
      "/work/solarkreis/docs.jpg",
    ],
    tech: "Next.js · React 19 · TypeScript · Event sourcing · Open-Meteo · aWATTar · NASA FIRMS · waffle tokens · Claude Code",
    sections: [
      {
        label: "How it works",
        body: [
          "Three real feeds come in: irradiation and temperature from Open-Meteo, the day-ahead spot price from aWATTar, active fire detections from NASA FIRMS.",
          "The power is computed rather than faked — solar geometry, clear-sky attenuation, a temperature loss above 25 °C. A hot day in July yields less than a cool day in May under the same sun.",
          "The seven inverters speak three vendor formats. They are unified at ingest, not in the display: everything behind that point only knows kW and °C.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "3 fields · 7 inverters",
            "3 vendor formats",
            "38.88 MW grid limit",
            "39.8 MW at solstice",
            "20 MWh storage",
            "",
            "48 checks against the live instance",
            "2 days from empty folder",
          ],
        },
      },
      {
        label: "Process",
        steps: [
          "Wireframes first",
          "Read-only view",
          "Real feeds",
          "One data model",
          "Guarded writes",
        ],
        body: [
          "Wireframes and a token page in Figma came before the code: nine type sizes, 1,287 fills and lines bound to variables. Contrast was measured per pair, not assumed.",
          "A separate document lists the decisions I made without a wireframe, written so they can be argued with instead of defended.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Finished prototype",
          ],
        },
      },
      {
        label: "Hardest call",
        body: [
          "Every command passes one guard, and the guard is fail-closed: anything other than authorised falls to the safe state. It checks in the order the reasons weigh — tenancy, plant state, data freshness, then a second hand for critical actions. The first hit decides, so the refusal names the actual reason.",
          "Rejected commands are appended to the log exactly like executed ones. A guard whose refusals disappear cannot be audited.",
          "State is a fold over that log. A setpoint is not a field you set, it is the result of every command ever executed.",
        ],
      },
      {
        label: "What I did not build",
        body: [
          "Three features were cut, each with the measurement that killed it. The glare alarm was computed in full first — the reflection vector over a whole year at five-minute resolution. It came back with zero glare windows: the motorway there runs at 51°, and the panel normals miss the glare lobes.",
          "The model stays in the repo as the evidence for the refusal.",
        ],
      },
    ],
    closed: true,
    visit: "https://solarkreis.vercel.app",
    readMore: "https://github.com/AisuStudio/solarkreis",
  },
  {
    slug: "movinga",
    title: "Movinga",
    year: "2023",
    mini: "Booking flow, claims and the partner app",
    maturity: "Delivered",
    points: 5,
    timeSpent: "Full Time Employment",
    industry: "Moving & logistics",
    directions: ["management", "design"],
    lead:
      "Movinga was a house-move booking platform operating in Germany, France, Sweden, Austria and Switzerland. An average move cost around €1,100.\n\n" +
      "Four pieces of work over the same product, from the booking flow to the brand.",
    views: ["Booking flow", "Claim process", "Partner app", "Rebrand concept"],
    shots: [
      "/work/movinga/01.jpg",
      "/work/movinga/02.jpg",
      "/work/movinga/03.jpg",
      "/work/movinga/rebrand.gif",
    ],
    tech: "User journey maps · funnel and lead journey analysis · flowcharts, wireframes, prototypes · Adobe XD, Figma, GA",
    sections: [
      {
        label: "Booking flow",
        body: [
          "A significant part of the leads came through the website, and more and more of them arrived on a phone. Region, seasonality, sales agent and customer liquidity all played into the flow, so touching it crossed every department in the company.",
          "A user journey map, a funnel analysis and a lead journey analysis built the shared picture first. The measures that followed were unglamorous: more and larger call buttons, consultation offered at every touchpoint, simpler screens.",
          "The result was an increase of about 7% in conversion rate — roughly €150k more turnover year on year.",
        ],
      },
      {
        label: "Claim process",
        body: [
          "The technical goal was one number: reduce email traffic between the customer, Movinga and the insurer.",
          "Research with the claim managers of three markets and the head of engineering. Then flowcharts, Figma wireframes and prototypes, built with the claims department and the insurer.",
          "That cut the emails down to 10%, and on top of that the claim managers felt a huge relief in their workload.",
        ],
      },
      {
        label: "Partner app",
        body: [
          "A collection of smaller optimisations, including one that failed. Partner bonuses were welcomed in every conversation, then scrapped after six months: the bonus rarely reached the drivers it was meant to reach.",
          "Fixing the mobile app had a significant impact on daily hiccups. Removing sticky components gave drivers easier access to the full logistics information.",
        ],
      },
      {
        label: "Rebrand concept",
        body: [
          "When I started at Movinga, we moved as a family and I booked their service. Movinga helps people arrive in a new chapter of their life — that understanding stayed with me.",
          "It became the foundation of Movinga’s rebranding concept.",
        ],
      },
    ],
  },

  {
    slug: "fire-on-the-land",
    title: "Fire on the Land",
    year: "2026",
    mini: "Project site: graphic novel, font and a burn-recovery tool",
    maturity: "Early Stage",
    points: 2,
    industry: "Climate & forestry",
    timeSpent: "8 Days",
        directions: ["building", "management", "design"],
    lead:
      "Fire on the Land is the project site for a scientific graphic novel about Scotty Creek Research Station in Canada’s Northwest Territories. It is the country’s first Indigenous-led research station, burnt down in a wildfire in late 2022.\n\n" +
      "Three things live here: the novel, a hand-drawn font carrying the Dene letters of the Dehcho region, and a speculative tool for reading burnt forest.",
    views: ["Graphic Novel", "AS Dehcho", "Adoption Scenarios"],
    shots: ["/work/fire-on-the-land/01.jpg", "/work/fire-on-the-land/02.jpg", "/work/fire-on-the-land/03.jpg"],
    tech: "Static HTML, CSS and JavaScript, no build step · Sentinel-2 L2A via the Copernicus Data Space · History API routing",
    sections: [
      {
        label: "Three areas",
        body: [
          "The graphic novel holds character studies, script and storyboards.",
          "AS Dehcho is a hand-drawn handwriting font, still in progress, made for this project. It carries the Dene letters and diacritics of the Dehcho region (ą́ ę́ ł ʔ ǫ́ ų́) and the speech-bubble lettering in one family.",
          "Adoption Scenarios is the tool, speculative for now. It reads post-fire forests by function rather than by origin: which reforestation trajectory is climate-adapted, economically viable and carbon-effective at the same time.",
        ],
      },
      {
        label: "The data is real",
        body: [
          "Normalized Burn Ratio tiles from Sentinel-2 L2A, pulled through the Copernicus Data Space process API for 2020, 2022 and 2024. They are laid onto red, green and blue: grey means unchanged, colour means greening at a different time.",
          "The anchor site is Jüterbog in Brandenburg, an 800-hectare burn scar from 2019. The carbon side connects through the GHG Protocol land sector guidance.",
        ],
      },
      {
        label: "Process",
        steps: [
          "Story first",
          "Bilingual site",
          "Real burn data",
          "Own Dene font",
          "Tool, speculative",
        ],
        body: [
          "Bilingual from the start, German and English switchable at runtime: one address, both languages in the markup rather than two page trees.",
          "Static HTML, CSS and JavaScript with no build step. Routing runs on the History API with real paths.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Actively built",
            "",
            "Next: AmeriFlux conference,",
            "blog entries from the exhibition,",
            "adoption scenarios reviewed",
          ],
        },
      },
      {
        label: "Hardest call",
        body: [
          "Assess, don’t decide. The tool makes trajectories comparable and trackable; it does not recommend one.",
          "That is a smaller product than a recommendation engine, and the right one. Nobody hands a forest decision to a website, but they will use one to argue with.",
        ],
      },
    ],
    visit: "https://fireontheland.org",
  },

  {
    slug: "lean-calculator",
    title: "Lean Calculator",
    year: "2026",
    mini: "Lean savings on a construction budget",
    maturity: "Delivered",
    points: 5,
    industry: "Construction",
    timeSpent: "2 Days",
        directions: ["building", "management", "design"],
    lead:
      "The Lean Calculator is a widget for the construction consultancy Meile + Stein. It shows a client what lean methods could save on their building project — a budget in, two gauges out.\n\n" +
      "It embeds into their site with one script tag and a custom element, and makes no network call at all.",
    views: ["Simple mode", "Pro mode", "Method & sources"],
    shots: ["/work/lean-calculator/01.jpg", "/work/lean-calculator/02.jpg", "/work/lean-calculator/03.jpg"],
    tech: "Custom element, no runtime dependencies · fully client-side, no network call, no tracking · CSS custom properties for theming",
    sections: [
      {
        label: "How it works",
        body: [
          "Simple mode: a construction budget and one slider produce two gauges — schedule reliability and an indicative saving range.",
          "Pro mode: lean measures per contract type, answered yes, partly or no. Broken down by dimension, with implementation costs and a net range.",
        ],
      },
      {
        label: "Process",
        steps: [
          "Client’s Excel model",
          "Ranges, not figures",
          "Two modes",
          "One script tag",
        ],
        body: [
          "The model came from an Excel prototype the client had already made. Every deviation from that original is written down in a correction log, so they can see what changed and why.",
          "The model has unit tests that run without a build step.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Finished and delivered",
            "",
            "Further iterations likely",
          ],
        },
      },
      {
        label: "Hardest call",
        body: [
          "Show ranges, not exact figures. False precision would have been easier to build and impossible to defend: a number to two decimal places invites a discussion the model cannot survive.",
          "The panel that explains the method and its sources sits inside the widget, not in a footnote.",
        ],
      },
    ],
    visit: "https://meilestn.de/1003-2/",
  },

  {
    slug: "normann",
    title: "NORMANN",
    year: "2026",
    mini: "Public award procedure, documented as you go",
    maturity: "Exploration",
    points: 1,
    industry: "Construction",
    timeSpent: "3 Days",
    directions: ["building", "management", "design"],
    lead:
      "NORMANN is a reference work for German public procurement below the EU thresholds, written for the planning offices of Berlin and Brandenburg. It names the procedure a contract value permits, with the provision and its date, while you type.\n\n" +
      "It comes out of an exchange with the consultancy Meile + Stein running since 2025. Research in progress, not an official service and not legal advice.",
    views: ["Start", "Vergabeplan", "Lose", "Rückmeldung", "Protokoll", "Vermerk"],
    shots: [
      "/work/normann/start.jpg",
      "/work/normann/plan.jpg",
      "/work/normann/lose.jpg",
      "/work/normann/rueckmeldung.jpg",
      "/work/normann/protokoll.jpg",
      "/work/normann/vermerk.jpg",
    ],
    tech: "Static HTML, CSS and JavaScript, no build step · no dependencies, nothing stored or transmitted · self-hosted Urbanist (OFL) · event log as JSON Lines, state is always a projection · 43 rule tests in Node",
    sections: [
      {
        label: "The finding",
        body: [
          "Three sources, three different dates: federal, state, municipal. A contracting authority has to read all three to know which procedure a contract value permits. It then has to justify that choice in a file note, which by experience gets written too late.",
          "Those are not two problems. Choosing the procedure and documenting it are the same act, split into two work steps.",
        ],
      },
      {
        label: "How it works",
        steps: [
          "Three dates, one answer",
          "35 rule books",
          "Every rule sourced",
          "Print to file",
        ],
        body: [
          "The framework — who is contracting, what kind of building, whether funding is involved — is entered once per project, not once per award. Each amount is then read against the rule base while it is being typed.",
          "Split a contract into lots and the limiting provision appears at that moment, as a citation rather than a block. What the split buys is nameable: 1,180,000 € divided into 767,000 and 413,000 additionally permits a freihändige Vergabe. The special rule for social infrastructure does not.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "Never say “you may”. The tool reproduces the rule with its source; it does not apply it to the case or recommend one of two permitted routes. That is the line to legal services, and the reason the thing can exist at all.",
          "The line got sharper when the primary user turned out to be the planning office, not the awarding authority. The office prepares; it does not decide. So the tool cannot tell it what is allowed — only what the provision says.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "35 rule books read",
            "4 sources verified",
            "2 marked unverified",
            "43 rule tests",
            "",
            "2,490 lines",
            "0 dependencies",
            "rule base 2025-06-19",
          ],
        },
      },
      {
        label: "Why there is no login",
        body: [
          "No account, no storage, no transmission, no installation. Those are the four properties that trigger an IT approval inside a public authority. Without them it is not an application but a reference work, and nobody has to ask permission to use one.",
          "That argument costs something: a plan with forty awards over several months cannot live in a browser tab. The answer is a file that belongs to the office — one line per event, readable without the tool.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Awaiting reviewer input",
            "",
            "Next: the reviewers' notes,",
            "then the next iteration",
          ],
        },
      },
    ],
    readMore: "https://github.com/AisuStudio/Normann",
  },
  {
    slug: "fullerhome",
    title: "FullerHome",
    year: "2026",
    mini: "Animated and calculated construction simulation",
    maturity: "Mature Prototype",
    points: 3,
    industry: "Construction",
    timeSpent: "5 Days",
        directions: ["building", "management", "design"],
    lead:
      "FullerHome is a browser simulation of a robot building a self-supporting timber plate shell on site. Raw plates arrive, are milled on the spot and assembled one by one — the construction site becomes the factory.\n\n" +
      "Built with the consultancy Meile + Stein, whose public-procurement ladder runs inside it.",
    views: ["Vehicle Shelter", "Tourism Office", "Library", "Robot & stations", "Procurement"],
    shots: ["/work/fullerhome/01.jpg", "/work/fullerhome/02.jpg", "/work/fullerhome/03.jpg", "/work/fullerhome/04.jpg", "/work/fullerhome/05.jpg"],
    tech: "Next.js (static export) · three.js · React Three Fiber · Zustand",
    sections: [
      {
        label: "How it works",
        body: [
          "Pick a public typology and a budget. The budget scales both the size of the building and the quality of the build — plate resolution, glazing share, shell and fit-out spec.",
          "The geometry is deterministic: a Goldberg plate layout, the dual of a subdivided icosahedron. The same configuration always produces the same building, with its bill of materials, cost and time estimate.",
        ],
      },
      {
        label: "Process",
        steps: [
          "Plate shell idea",
          "Fixed geometry",
          "Robot that drives",
          "Checks outside",
          "Award bands",
        ],
        body: [
          "A plate is only placed if it touches the foundation or a neighbour that is already built. No floating parts.",
          "Three checking scripts run outside the app: shell and sequencing invariants, plate reachability from the robot stations, and the procurement thresholds for both federal states.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Dormant",
            "",
            "Maybe: a tiny-house simulation",
          ],
        },
      },
      {
        label: "Hardest call",
        body: [
          "The robot cannot reach a whole shell from one spot. It is modelled on the ETH Zurich In-situ Fabricator at realistic scale, about 3.5 metres of arm reach.",
          "So it drives. A set-cover planner picks work stations, and a depot with an on-site mill sits in the middle. Accepting the reach limit is what turned a rendering into a construction sequence.",
        ],
      },
      {
        label: "Procurement",
        body: [
          "A rule engine maps the configured budget onto the German public-procurement award bands at the 2026 thresholds, from direct award up to the EU-wide procedure. The Berlin and Brandenburg obligations are included.",
          "It renders as a clickable ladder, so a change in budget shows immediately which procedure the project falls into.",
        ],
      },
    ],
    visit: "https://aisustudio.github.io/FullerHome/",
  },

  {
    slug: "compass-co",
    title: "Compass.co",
    year: "2020",
    mini: "Marketing analytics for Shopify shops",
    maturity: "Delivered",
    points: 5,
    timeSpent: "Full Time Employment",
    industry: "E-commerce / SaaS",
    directions: ["management", "design"],
    lead:
      "Compass.co was a marketing analytics app for the Shopify ecosystem, acquired by Sage in 2017 and closed in 2020. Mostly remote: headquarters in San Francisco, the team across three time zones — England, Germany, Hong Kong, Pakistan and Australia.",
    views: ["Dashboards", "Design system", "Insights Report", "Mobile sign-up", "Marketing"],
    shots: ["/work/compass-co/01.jpg", "/work/compass-co/02.jpg", "/work/compass-co/03.jpg", "/work/compass-co/04.jpg", "/work/compass-co/05.jpg"],
    tech: "Sketch (Bohemian Coding) · Unbounce · Storybook",
    sections: [
      {
        label: "Responsibilities",
        body: [
          "Improving the UI and UX of the dashboards. Cleaning the existing design up into a design system, and building new dashboards from management requirements.",
          "Alongside that the marketing side: implementing the redesign, building landing pages, and creating, testing and improving ad-banner concepts.",
        ],
      },
      {
        label: "Insights Report",
        body: [
          "A report that gave shop owners ideas for improving their shop, based on peer statistics. A comparison against similar shops, rather than an instruction.",
        ],
      },
      {
        label: "Mobile sign-up",
        body: [
          "Analytics showed a large drop in conversion at the data-connection step of the mobile sign-up. Users had to connect their shop before they could see anything at all.",
        ],
      },
    ],
  },

  {
    slug: "aisulab",
    title: "AisuLab",
    year: "2026",
    mini: "IT-Literacy exercises for kids",
    maturity: "Ongoing",
    points: 3,
    industry: "Education",
    timeSpent: "11 Days",
    directions: ["building", "management", "design"],
    lead:
      "AisuLab is a set of IT-literacy exercises for kids: programming, reading data and thinking about privacy — starting from the game they already play.\n\n" +
      "Built together with my son, who is also the first tester.",
    views: ["Exercises", "Toolbox", "Media"],
    shots: ["/work/aisulab/01.jpg", "/work/aisulab/02.jpg", "/work/aisulab/03.jpg"],
    tech: "Astro · self-hosted fonts, no Google Fonts · no JavaScript framework, CSS-only mobile navigation",
    sections: [
      {
        label: "How it works",
        body: [
          "Exercises run in two tracks, coder and hacker. Each carries its difficulty, minimum age, duration and the tools it needs.",
          "The early ones read the Brawl Stars API with Python: fetch the JSON, loop over it, find the brawler with the most trophies. Later ones turn to data traces: what an app knows about you, written into a file you can open and read yourself.",
          "A toolbox lists twelve tools, each with its level, platforms, price and a note on when it is worth reaching for.",
        ],
      },
      {
        label: "Process",
        steps: ["His own game", "Read the API", "Two tracks", "Data and privacy", "Twelve tools"],
        body: [
          "The mobile navigation is a checkbox and a label in CSS rather than a script, so it works with JavaScript switched off.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Built behind the curtain",
            "",
            "Next: a Minecraft mod with every",
            "exercise in one game — after GTA 6",
          ],
        },
      },
      {
        label: "Hardest call",
        body: [
          "A site that teaches data traces should not leave any. So: no external JavaScript framework, and no fonts loaded from someone else's server.",
        ],
      },
    ],
  },

  {
    slug: "waitingroom",
    title: "waitingroom",
    year: "2026",
    mini: "Complex component behaviour handover concept",
    maturity: "Exploration",
    points: 1,
    industry: "Design systems",
    timeSpent: "1 Day",
        directions: ["building", "management", "design"],
    lead:
      "waitingroom is a holding room for behaviour rules — the step between a specification and a built component.\n\n" +
      "It fills the gap between Figma and implementation, where the behaviour of a component is decided and currently written down nowhere.",
    views: ["Component", "Rules", "Code", "Workflow"],
    shots: ["/work/waitingroom/01.jpg", "/work/waitingroom/02.jpg", "/work/waitingroom/03.jpg", "/work/waitingroom/04.jpg"],
    tech: "Static HTML, CSS and JavaScript, no build step",
    sections: [
      {
        label: "What it is for",
        body: [
          "A component library gives you a radio group and a select. A colour system tells you what they look like. Neither tells you when to use which.",
          "That from five options on, a radio group becomes a select. That a person's surname is never truncated. That a single option is not a choice at all. Those decisions are project-specific and usually made silently — in a Figma file, in an implementation, in a chat message.",
        ],
        rail: {
          label: "What's next",
          lines: ["Awaiting stakeholder review"],
        },
      },
      {
        label: "How it works",
        body: [
          "A rule becomes executable: a prototype that actually applies it, with a control panel to drive it past its own thresholds.",
          "And readable: stated, justified, with its edge cases — and with what it does not answer.",
        ],
      },
      {
        label: "What it is not",
        body: [
          "It is not production code. Nothing here is meant to be shipped or held to production standards; if it looks like a delivery, that is a bug in the presentation.",
          "It is not a component library either. Four of the eight steps in the workflow are marked as the team's own. The point is to slot into their process, not to replace it.",
        ],
      },
    ],
  },

  {
    slug: "witty",
    title: "witty",
    year: "2026",
    mini: "My product management flow dashboard",
    maturity: "Early Stage",
    points: 1,
    industry: "Consulting",
    timeSpent: "7 Days",
        directions: ["building", "management", "design"],
    lead:
      "witty is a product-management awareness tool. It walks a team through fourteen steps from spark to snapshot, and audits in hindsight which methods they already practice — and what those methods are called.\n\n" +
      "Named after Wittgenstein: the limits of my language mean the limits of my world. You can only build in the directions you have language for.",
    views: ["Audit", "Mirror", "Business Model Canvas", "Glossary"],
    shots: ["/work/witty/01.jpg", "/work/witty/02.jpg", "/work/witty/03.jpg", "/work/witty/04.jpg"],
    tech: "Static HTML, CSS and JavaScript, no build step · Markdown as the source of truth",
    sections: [
      {
        label: "How it works",
        body: [
          "The methodological source of truth is a markdown document. Fourteen steps, each with its guiding question, method, output format and done criterion, plus an experiment layer for validation.",
          "The audit prompt is a translation of that schema. When the schema changes, the prompt follows — the document leads, not the tool.",
        ],
      },
      {
        label: "Process",
        steps: ["Schema in markdown", "Prompt follows it", "Hindsight audit", "Bilingual from day one"],
        body: [
          "Naming a method you already use is what makes it repeatable. That is the whole bet of the hindsight audit.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Actively built",
            "",
            "Next: restructure and declutter",
            "the interface and the workflow",
          ],
        },
      },
      {
        label: "Principles",
        body: [
          "Plain language first, the textbook term as a learning anchor. Methods are options, never obligations.",
        ],
      },
    ],
    visit: "https://witty.aisu.studio",
  },

  {
    slug: "treatwell",
    hidden: true,
    title: "Treatwell",
    year: "2018",
    mini: "Experience flow of a beauty booking partner and customer",
    maturity: "Delivered",
    points: 5,
    timeSpent: "Full Time Employment",
    industry: "Beauty marketplace",
    directions: ["management", "design"],
    lead:
      "After Treatwell's redesign I started an experience board, to map the touchpoints of both sides: the clients and the salon owners.",
    views: ["Experience board"],
    shots: ["/work/treatwell/01.jpg"],
    tech: "Experience board · touchpoint mapping",
    sections: [
      {
        label: "Why",
        body: [
          "The redesign answered how the product looked. The board answered where it actually meets people. It had to hold two journeys at once: a marketplace has two sides that never see each other.",
          "It kicked off a set of new measures.",
        ],
      },
    ],
  },

  {
    slug: "head-sports",
    title: "HEAD Sports",
    year: "2017",
    mini: "Experience flow of a family's ski trip",
    maturity: "Delivered",
    points: 5,
    timeSpent: "2 Days",
    industry: "Sporting goods",
    directions: ["management", "design"],
    lead:
      "An illustrated experience board for HEAD Sports, internally “Alpine Experience”. It follows a typical family from Cologne on a ski trip to the Alps, as completely as possible.",
    views: ["Booking inspiration", "Equipment", "Arrival", "Stay", "Departure"],
    shots: ["/work/head-sports/01.jpg", "/work/head-sports/02.jpg", "/work/head-sports/03.jpg", "/work/head-sports/04.jpg", "/work/head-sports/05.jpg"],
    tech: "Ink and watercolour · 29 scenes",
    sections: [
      {
        label: "The span",
        body: [
          "Booking inspiration, choice of equipment, arrival, stay, departure — twenty-nine scenes end to end.",
          "Drawn as one continuous flow, it puts the manufacturer's product in a single segment of a much longer journey. Everything around that segment decides how the segment goes.",
        ],
      },
      {
        label: "Why it is drawn, not diagrammed",
        body: [
          "Every station is a watercolour scene with people in it. The family planning at a table in Cologne, the cathedral spires behind them; the arrival at the valley station between snow and a red railcar.",
          "A diagram gives you the order of the steps. These give you what a step feels like — which is the part a piece of equipment has to fit into.",
        ],
      },
    ],
  },

  {
    slug: "spirit-sprint",
    hidden: true,
    title: "Spirit Sprint",
    year: "2026",
    mini: "A workshop deck turned into a web flow",
    industry: "Consulting",
    maturity: "Exploration",
    points: 1,
    timeSpent: "4 Days",
        directions: ["building", "management", "design"],
    lead:
      "A strategic ideation workshop framework — Soul, Skills, Strategy, Spirit — turned from a facilitator deck into a self-service flow a team can run without anyone in the room to moderate it.",
    views: ["Overview", "Positioning", "Values Board", "Business Model Canvas"],
    shots: ["/work/spirit-sprint/01.jpg", "/work/spirit-sprint/02.jpg", "/work/spirit-sprint/03.jpg", "/work/spirit-sprint/04.jpg"],
    tech: "Static HTML, CSS and JavaScript · Supabase · design tokens shared with the other Aisu.Studio builds",
    sections: [
      {
        label: "Why",
        body: [
          "The framework already worked as a facilitator deck. What it could not do was run without the facilitator.",
          "The concept document starts with a weakness analysis of that original deck, then specifies the flow that fixes it — the analysis is the design brief.",
        ],
      },
      {
        label: "How it works",
        body: [
          "A clickable prototype runs straight in the browser without a build step, so the flow can be walked through before anything is implemented.",
        ],
      },
    ],
  },

  {
    slug: "waffle",
    title: "waffle",
    year: "2026",
    mini: "My living design system most builds start from",
    maturity: "Ongoing",
    points: 3,
    industry: "Design systems",
    timeSpent: "8 Days",
        directions: ["building", "management", "design"],
    lead:
      "waffle is the shared design system behind every Aisu.Studio project: colour including dark mode, spacing, radius, shadow, motion and self-hosted fonts.\n\n" +
      "It is the base every new build starts from.",
    views: ["Tokens", "Components", "Patterns", "Type roles"],
    shots: ["/work/waffle/01.jpg", "/work/waffle/02.jpg", "/work/waffle/03.jpg", "/work/waffle/04.jpg"],
    tech: "CSS custom properties · no framework · self-hosted fonts (Public Sans, iA Writer Mono, Stoke)",
    sections: [
      {
        label: "How it works",
        body: [
          "New projects link the token and component sheets directly. Existing projects carry their own copies of the same palette. They get refactored one at a time, whenever there is a reason to touch them anyway.",
          "A live reference page renders every token and every component class, one example each, with an export button.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "In use across every project",
            "",
            "Next: a clean-up, and one library",
            "across web and Figma",
          ],
        },
      },
      {
        label: "Three colour tiers",
        body: [
          "Primary carries brand and interaction, secondary carries surfaces. The third tier is functional: five flavours across five levels of intensity.",
          "Flavours encode meaning in content — sequential scales, heatmaps, priority coding, categorical series. One level read across flavours gives a categorical series; one flavour read from one to five gives a sequential scale. A flavour is never used to style a button or a border.",
        ],
      },
      {
        label: "Provenance",
        body: [
          "The component sheet was distilled from a quarry of real pages, not designed in the abstract. The quarry is kept in the repo — not for reuse, but so every class can be traced back to the page it was earned on.",
        ],
      },
    ],
    visit: "https://github.com/AisuStudio/waffle",
  },

  {
    slug: "aaly",
    title: "AALY",
    year: "2026",
    mini: "Artist Alley platform for a comic festival",
    maturity: "Early Stage",
    // TODO Dom: points, timeSpent und die Position in der Liste prüfen.
    points: 2,
    industry: "Arts & Culture",
    directions: ["building", "management", "design"],
    lead:
      "AALY is a festival platform for artist alleys: the exhibitor side of a comic convention, from application to a profile in the alley. The prototype runs the whole logged-in flow for Comic Invasion Berlin 2027.\n\n" +
      "I work at that festival as a seasonal partnership manager, which is where the exhibitor path comes from.",
    views: [
      "Space landing",
      "Artist Alley",
      "Events",
      "Event detail",
      "Artist portfolio",
      "Registration",
      "Chat",
      "Design system",
    ],
    tech: "Pure HTML and CSS · no framework, no build step, no npm · KERN UX v2.6.4 · Public Sans · Lucide icons · one shared stylesheet of ~700 lines · GitHub Pages",
    sections: [
      {
        label: "How it works",
        body: [
          "Eight screens, all linked and clickable. The space landing carries the membership status, the alley has search and a genre filter, the programme takes bookmarks. A five-step wizard handles the application, and an artist portfolio holds gallery, bio and events.",
          "There is no backend. The prototype exists to put the complete product experience in front of stakeholders and test users before anything is implemented.",
        ],
      },
      {
        label: "Process",
        steps: [
          "Festival desk",
          "KERN as the base",
          "Own tokens",
          "Eight screens",
          "Clickable",
        ],
        body: [
          "Mobile-first: below 700 px the navigation becomes a horizontal scroll and the grids collapse to one column.",
          "The design-system page is linked from the header of every screen, so the tokens are never a separate document.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Prototype v0.1, no backend",
            "",
            "Next: a table plan for the alley",
            "and an editable artist profile",
          ],
        },
      },
      {
        label: "Hardest call",
        body: [
          "The base is KERN UX, the open-source design system of the German public sector. A comic festival is not an authority — starting from scratch would have been the obvious move.",
          "But KERN carries accessibility and form patterns a festival would otherwise have to invent. The festival look sits on top as a token layer: CIB yellow, the mascot, the editorial hero. A theme over KERN, not a fork of it.",
        ],
      },
    ],
    visit: "https://aisustudio.github.io/aaly/",
  },

  {
    slug: "chillbert",
    title: "chillbert",
    year: "2026",
    mini: "RGB to XYZ, a tangible color space",
    industry: "Art & Technology",
    maturity: "Exploration",
    points: 1,
    timeSpent: "1 Day",
        directions: ["building", "management"],
    lead:
      "chillbert turns a file into a colour space you can rotate. Drop in a picture and its colours take their places, so the cube becomes the image's gamut. Type text instead, and every byte gets a place.\n\n" +
      "Either way it comes out as a WebGL point cloud, with the reading path lit between the points.",
    views: ["Semantic text", "Pure entropy", "Character mapping", "Encrypted vault"],
    shots: ["/work/chillbert/01.jpg", "/work/chillbert/02.jpg", "/work/chillbert/03.jpg", "/work/chillbert/04.jpg"],
    tech: "three.js · WebGL · placement blended in the vertex shader",
    sections: [
      {
        label: "The problem",
        body: [
          "A point has one location, but a byte carries two facts: what it is, and where it stands. Only one of them can have the location — the other has to go to colour or size.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Dormant",
            "",
            "Until an opportunity or another",
            "experiment comes along",
          ],
        },
      },
      {
        label: "How it works",
        body: [
          "So both placements are computed and a slider blends between them. At one end every byte value has a fixed home. Each “A” collapses onto the same star, and point size shows how common it is. At the other, byte number i sits on cell i of a three-dimensional Hilbert curve. That preserves locality: neighbours in the text stay neighbours in space.",
          "Both assign exactly one location per byte, so the two arrays are index-aligned and blending between them is meaningful. It happens in the vertex shader, so dragging the slider costs nothing per frame.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "The palette is gone. There used to be a choice — an ice gradient, the true values, an entropy ramp.",
          "Decoration on top of data is how the values got hidden in the first place, so the choice was removed. Every point is now drawn in its own value, and the data is what is left.",
        ],
      },
    ],
    visit: "https://chillbert.vercel.app",
  },

];

/** Was die Seite zeigt. Zurückgestellte Projekte fallen hier heraus — damit
    verschwinden sie zugleich aus der Liste, der Klappe und den gebauten Seiten. */
export const PROJECTS: Project[] = ALLE_PROJEKTE.filter((p) => !p.hidden);

// Die drei Türen im Hero.
/**
 * Die drei Wörter des Hero-Satzes. Seit dem Umbau am 2026-08-27 sind es keine
 * Türen mehr — `href`, `label` und `note` sind mit der Berührung weggefallen.
 * Geblieben ist die Zuordnung Wort → Farbe, und die trägt jetzt die ganze
 * Seite: dieselben drei Farben stehen an den Rollen der Listeneinträge und in
 * der Schlussfrage.
 */
export const DOORS = [
  { id: "work",   word: "What", color: "var(--dh-what)", tint10: "var(--dh-what-10)" },
  { id: "skills", word: "can",  color: "var(--dh-can)",  tint10: "var(--dh-can-10)" },
  { id: "about",  word: "I",    color: "var(--dh-i)",    tint10: "var(--dh-i-10)" },
] as const;

/**
 * Fünf Stufen für die Punktreihe im Listeneintrag. Die fünf Werte, die
 * tatsächlich vorkommen, liegen eins zu eins auf den fünf Punkten;
 * „Beta" teilt sich die vierte Stufe mit dem reifen Prototypen, weil es
 * bisher kein Projekt gibt, das den Unterschied ausspielen müsste.
 */

/** Die Branchen in der Reihenfolge, in der sie in der Liste zuerst auftauchen. */
export const INDUSTRIES: string[] = [
  ...new Set(PROJECTS.map((p) => p.industry).filter((i): i is string => Boolean(i))),
];

export const EMAIL = "hi@dominikheilig.com";

export const BIO =
  "Dominik is a design-led Product Manager and agentic builder with 15+ years in tech, based in Berlin. Reach out for freelance work, permanent roles and collaborations.";
