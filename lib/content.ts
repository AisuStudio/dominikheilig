// Inhalte. Alles hier ist aus den jeweiligen Repos belegt (README, package.json,
// Konzeptdokumente) — nichts erfunden. Wo mir Material fehlt, steht PLATZHALTER.

export type Direction = "building" | "management" | "design";

/** Feste Liste wie in palette — kein Freitext, damit die Zeile vergleichbar bleibt. */
export type Maturity =
  | "Mature Prototype"
  | "Beta"
  | "Working Prototype"
  | "Delivered"
  | "Early Stage"
  | "Experiment";

/** Die drei Richtungen. Farben wie im Hero: What → Gold, Can → Mint, I → Violett. */
export const DIRECTIONS: { slug: Direction; label: string; short: string; color: string; tint: string }[] = [
  { slug: "building",   label: "Building",   short: "Building",   color: "var(--dh-what)", tint: "var(--dh-what-20)" },
  { slug: "management", label: "Management", short: "Management", color: "var(--dh-can)",  tint: "var(--dh-can-20)" },
  { slug: "design",     label: "Design",     short: "Design",     color: "var(--dh-i)",    tint: "var(--dh-i-20)" },
];

/** Ein beschrifteter Abschnitt der Projektseite; `rail` steht rechts auf gleicher Höhe. */
export type Section = {
  label: string;
  body: string[];
  rail?: { label: string; lines: string[] };
};

export type Project = {
  slug: string;
  title: string;
  year: string;          // TODO Dom: Jahreszahlen prüfen, alles auf 2026 gesetzt
  mini: string;          // zwei Zeilen neben dem Titel, ca. 44 Zeichen
  maturity: Maturity;
  directions: Direction[];
  lead: string;          // Vorspann der Projektseite
  views: string[];       // Umschalter über dem Screenshot
  shots?: string[];      // Bilder in derselben Reihenfolge wie `views`
  tech: string;          // „Built with"
  sections: Section[];
  visit?: string;
  readMore?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "fontane",
    title: "Fontane.Studio",
    year: "2026",
    mini: "Handwriting font editor, free to use",
    maturity: "Mature Prototype",
    directions: ["building", "design"],
    lead:
      "A browser-based handwriting font editor with a marketplace attached. You draw the glyphs, it builds a real font file — OTF, UFO, variable — and publishes it without anyone having to make an account. Landing page, app and its own cookie-free analytics.",
    views: ["Glyph Box Editor", "Grid View", "Writer", "Marketplace", "Analytics"],
    tech: "opentype.js · perfect-freehand · Supabase · UFO export + Glyphs plugin · own variable-font build",
    sections: [
      {
        label: "Hardest call",
        body: [
          "Guard the marketplace with a publish gate built on server-stamped drawing events instead of accounts. Making hobbyists sign up would have cost more than the abuse it prevents.",
          "The gate can be fooled by someone patient enough. That was the trade: a barrier that stops casual reuse and lets every honest user through, against one that stops everyone equally.",
        ],
      },
      {
        label: "Process",
        body: [
          "Prototype first, measure second. The editor was rebuilt from scratch once, after the first version made drawing feel like fighting the tool.",
          "The variable-font build and the Hangul composition — 24 drawn jamo into 11,172 syllables — were spikes on branches, kept only once they proved out.",
        ],
      },
      {
        label: "Result",
        body: [
          "366 page views, 134 sessions. Nine people drew something, six exported a font.",
          "Small numbers — and they carried the only decision that mattered. People were leaving before they drew: median visit 25 seconds, median time to first stroke 44 seconds. The problem was the first minute, not the font engine.",
          "The numbers were wrong before they were right. Several panels were confidently wrong, and one whole event type had been going to the database and bouncing off a constraint for two weeks.",
        ],
        rail: {
          label: "In numbers",
          lines: ["366 page views", "134 sessions", "9 drew", "6 exported a font", "", "25 s median visit", "44 s to first stroke"],
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
    mini: "One set of tasks, six views on it",
    maturity: "Mature Prototype",
    directions: ["building", "management"],
    lead:
      "Short for console — like a gaming console, a small tool that does a lot. A self-hostable task tracker that gives you several views over one set of tasks, with fast inline editing, a one-click time tracker and a capture-first log for thoughts and reminders.",
    views: ["Today", "Backlog", "Board", "Project", "Log", "Archive"],
    tech: "Next.js · Supabase · Prisma · TipTap · dnd-kit · fractional-indexing · Web Push",
    sections: [
      {
        label: "How it works",
        body: [
          "One task list, six ways to look at it. Today filters to what is due, Backlog holds what is unscheduled, Board is a kanban, Project groups by project, Log is a capture-first stream for notes and reminders, Archive keeps what is done.",
          "A task is edited where it stands — there is no detail dialog to open. The time tracker is one click on the task itself.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "Ship the first phase entirely in the browser. Everything lives in local storage, nothing leaves the device, and there is no account.",
          "That cost sharing and a second device. It bought a product that could be reshaped weekly with nothing to migrate and nothing to breach while the model was still moving. The backend follows once the model stops moving.",
        ],
      },
      {
        label: "Process",
        body: [
          "The board seeds itself from CNSL's own roadmap on first load. The app tracks its own development, which means every missing feature is visible in the tool while you use it.",
          "The public demo lets visitors add and edit tasks in their own browser but not delete — the roadmap is seeded from code, so it stays intact.",
        ],
      },
    ],
    visit: "https://cnsl.aisu.studio",
  },

  {
    slug: "movinga",
    title: "Movinga",
    year: "2023",
    mini: "Booking flow, claims and the partner app",
    maturity: "Delivered",
    directions: ["management", "design"],
    lead:
      "Movinga was a house-move booking platform operating in five markets — Germany, France, Sweden, Austria and Switzerland — where a regular move cost around €1,100. Four pieces of work over the same product, from the booking flow to the brand.",
    views: ["Booking flow", "Claim process", "Partner app", "Rebrand concept"],
    shots: ["/work/movinga/01.jpg", "/work/movinga/02.jpg", "/work/movinga/03.jpg", "/work/movinga/04.jpg"],
    tech: "User journey maps · funnel and lead journey analysis · flowcharts, wireframes, prototypes",
    sections: [
      {
        label: "Booking flow",
        body: [
          "A solid part of the leads came through the website, and more and more of them arrived on a phone. Region, seasonality, sales agent and customer liquidity all played into the flow, so touching it crossed every department in the company.",
          "A user journey map, a funnel analysis and a lead journey analysis built the shared picture first. The measures that followed were unglamorous — more and larger call buttons, consultation offered at every touchpoint, simpler screens. About €150k more turnover year on year.",
        ],
      },
      {
        label: "Claim process",
        body: [
          "The technical goal was one number: fewer emails between the customer, Movinga and the insurer. Research with the claim managers of three markets and the head of engineering, then flowcharts, paper wireframes and prototypes built with the claims department.",
          "The process was cleaned and automated as far as it could be, so customer-side mistakes and insurer-side delays both dropped — and the different insurance requirements per market still fit inside one process.",
        ],
      },
      {
        label: "Partner app",
        body: [
          "A collection of smaller optimisations, including one that failed. Partner bonuses were welcomed in every conversation and scrapped after six months: the bonus rarely reached the drivers it was meant to reach.",
          "The one that worked was smaller. Small removal companies book jobs from their phones during rides, and a fixed header blocked scrolling — they could not read the offers at all. Rearranging the information made immediate bookings possible.",
        ],
      },
      {
        label: "Rebrand concept",
        body: [
          "Movinga assisted people in changing their life significantly. That was in front of everyone and hardly used, while business as usual dominated the day.",
          "Looking at the traditions of the trade instead of current trends kept the emotion in. Few and simple elements let non-designers work with the brand confidently — flexibility rather than breaking points.",
        ],
      },
    ],
  },

  {
    slug: "fire-on-the-land",
    title: "Fire on the Land",
    year: "2026",
    mini: "Project site: comic, font and a burn-recovery tool",
    maturity: "Delivered",
    directions: ["building", "design"],
    lead:
      "The site for a graphic novel about rebuilding a research tower at Scotty Creek — Canada's first Indigenous-led research station, burnt down in 2022 — and for the research tool that grew out of it.",
    views: ["Graphic Novel", "AS Dehcho", "Adoption Scenarios"],
    tech: "Static HTML, CSS and JavaScript, no build step · Sentinel-2 L2A via the Copernicus Data Space · History API routing",
    sections: [
      {
        label: "Three areas",
        body: [
          "The graphic novel holds character studies, script and storyboards. AS Dehcho is a hand-drawn display font made for this project: it carries the Dene orthography of the Dehcho region (ą́ ę́ ł ʔ ǫ́ ų́) and the speech-bubble lettering in one family.",
          "Adoption Scenarios is the tool. It reads post-fire forests by function rather than by origin: which reforestation trajectory is climate-adapted, economically viable and carbon-effective at the same time — and how do you make that trackable.",
        ],
      },
      {
        label: "The data is real",
        body: [
          "Normalized Burn Ratio tiles from Sentinel-2 L2A, pulled through the Copernicus Data Space process API for 2020, 2022 and 2024 and laid onto red, green and blue. Grey means unchanged, colour means greening at a different time.",
          "The anchor site is Jüterbog in Brandenburg, an 800-hectare burn scar from 2019. The carbon side connects through the GHG Protocol land sector guidance.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "Assess, don't decide. The tool makes trajectories comparable and trackable; it does not recommend one.",
          "That is a smaller product than a recommendation engine, and the right one — nobody hands a forest decision to a website, but they will use one to argue with.",
        ],
      },
      {
        label: "Process",
        body: [
          "Bilingual from the start, German and English switchable at runtime: one address, both languages in the markup rather than two page trees.",
          "Static HTML, CSS and JavaScript with no build step. Routing runs on the History API with real paths, and the satellite fetch is a script that leaves its credentials in an untracked file.",
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
    directions: ["building", "design"],
    lead:
      "A widget for the consultancy Meile + Stein that makes the lean saving potential of a construction project visible. It embeds into their site with one script tag and a custom element.",
    views: ["Simple mode", "Pro mode", "Method & sources"],
    tech: "Custom element, no runtime dependencies · fully client-side, no network call, no tracking · CSS custom properties for theming",
    sections: [
      {
        label: "How it works",
        body: [
          "Simple mode: a construction budget and one slider produce two gauges — schedule reliability and an indicative saving range.",
          "Pro mode: lean measures per contract type answered yes, partly or no, broken down by dimension, with implementation costs and a net range.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "Show ranges, not exact figures. False precision would have been easier to build and impossible to defend — a number to two decimal places invites a discussion the model cannot survive.",
          "The panel that explains the method and its sources sits inside the widget, not in a footnote.",
        ],
      },
      {
        label: "Process",
        body: [
          "The model came from an Excel prototype. Every deviation from that original is written down in a correction log, so the client can see what changed and why.",
          "The model has unit tests that run without a build step, and the widget makes no network call at all.",
        ],
      },
    ],
    visit: "https://meilestn.de/1003-2/",
  },

  {
    slug: "fullerhome",
    title: "FullerHome",
    year: "2026",
    mini: "A robot builds a timber shell on site",
    maturity: "Early Stage",
    directions: ["building", "design"],
    lead:
      "A browser simulation of a robot building a self-supporting timber plate shell directly on site. Instead of factory prefabrication, raw plates are delivered, milled on the spot and assembled plate by plate: the construction site becomes the factory.",
    views: ["Vehicle Shelter", "Tourism Office", "Library", "Robot & stations", "Procurement"],
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
        label: "Hardest call",
        body: [
          "The robot cannot reach a whole shell from one spot. It is modelled on the ETH Zurich In-situ Fabricator at realistic scale, about 3.5 metres of arm reach.",
          "So it drives. A set-cover planner picks work stations, and a depot with an on-site mill sits in the middle. Accepting the reach limit is what turned a rendering into a construction sequence.",
        ],
      },
      {
        label: "What keeps it honest",
        body: [
          "A plate is only placed if it touches the foundation or a neighbour that is already built. No floating parts.",
          "Three checking scripts run outside the app: shell and sequencing invariants, every plate reachable from at least one robot station, and the procurement thresholds for both federal states.",
        ],
      },
      {
        label: "Procurement",
        body: [
          "Built with Meile + Stein: a rule engine maps the configured budget onto the German public-procurement award bands — direct award up to the EU-wide procedure, at the 2026 thresholds — including the Berlin and Brandenburg obligations.",
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
    directions: ["management", "design"],
    lead:
      "Compass.co was a marketing analytics app for Shopify, acquired by Sage in 2017 and closed in 2020. A mostly remote company headquartered in San Francisco, with the team spread across England, Germany, Hong Kong, Pakistan and Australia.",
    views: ["Dashboards", "Design system", "Insights Report", "Mobile sign-up", "Marketing"],
    shots: ["/work/compass-co/01.jpg", "/work/compass-co/02.jpg", "/work/compass-co/03.jpg", "/work/compass-co/04.jpg", "/work/compass-co/05.jpg"],
    tech: "Sketch · Unbounce",
    sections: [
      {
        label: "Responsibilities",
        body: [
          "Improving the UI and UX of the dashboards, cleaning the existing design up into a design system, and building new dashboards from management requirements.",
          "Alongside that the marketing side: implementing the redesign, building landing pages, and creating, testing and improving ad-banner concepts.",
        ],
      },
      {
        label: "Insights Report",
        body: [
          "A report that gave shop owners ideas for improving their shop, based on peer statistics — comparison against similar shops rather than instruction.",
        ],
      },
      {
        label: "Mobile sign-up",
        body: [
          "Analytics showed a large drop in conversion at the data-connection step during mobile sign-up: users were forced to connect their shop before they could see anything at all.",
        ],
      },
    ],
  },

  {
    slug: "waitingroom",
    title: "waitingroom",
    year: "2026",
    mini: "Where component behaviour is written down",
    maturity: "Working Prototype",
    directions: ["design", "building"],
    lead:
      "A holding room for behaviour rules — the step between a specification and a built component. It fills the gap between Figma and implementation, where the behaviour of a component is decided and currently written down nowhere.",
    views: ["Rules", "Prototype", "Control panel", "Workflow"],
    tech: "Static HTML, CSS and JavaScript, no build step",
    sections: [
      {
        label: "What it is for",
        body: [
          "A component library gives you a radio group and a select. A colour system tells you what they look like. Neither tells you when to use which.",
          "That from five options on, a radio group becomes a select. That a person's surname is never truncated. That a single option is not a choice at all. Those decisions are project-specific and usually made silently — in a Figma file, in an implementation, in a chat message.",
        ],
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
          "It is not a component library either. Four of the eight steps in the workflow are marked as the team's own — the point is to slot into their process, not to replace it.",
        ],
      },
    ],
  },

  {
    slug: "witty",
    title: "witty",
    year: "2026",
    mini: "Names the PM methods you already practice",
    maturity: "Working Prototype",
    directions: ["management"],
    lead:
      "A product-management awareness tool: a fixed base of fourteen steps from spark to snapshot, LLM facilitation, and a hindsight audit that shows which methods you already practice — and what they are called.",
    views: ["Mirror", "Audit", "Business Model Canvas", "Mini P&L", "Roadmap"],
    tech: "Static HTML, CSS and JavaScript, no build step · Markdown as the source of truth",
    sections: [
      {
        label: "Where the name comes from",
        body: [
          "After Wittgenstein: the limits of my language mean the limits of my world.",
          "You can only build in the directions you have language for. Naming a method you already use is what makes it repeatable.",
        ],
      },
      {
        label: "How it works",
        body: [
          "The methodological source of truth is a markdown document: fourteen steps, each with its guiding question, method, output format and done criterion, plus an experiment layer for validation.",
          "The audit prompt is a translation of that schema. When the schema changes, the prompt follows — the document leads, not the tool.",
        ],
      },
      {
        label: "Principles",
        body: [
          "Plain language first, the textbook term as a learning anchor. Methods are options, never obligations.",
          "Markdown stays the source of truth, and everything is bilingual from day one.",
        ],
      },
    ],
    visit: "https://witty.aisu.studio",
  },

  {
    slug: "treatwell",
    title: "Treatwell",
    year: "2018",
    mini: "An experience board for both sides",
    maturity: "Delivered",
    directions: ["management", "design"],
    lead:
      "After Treatwell's redesign I started an experience board to understand the potential touchpoints of the clients as well as the salon owners.",
    views: ["Experience board"],
    shots: ["/work/treatwell/01.jpg"],
    tech: "Experience board · touchpoint mapping",
    sections: [
      {
        label: "Why",
        body: [
          "The redesign answered how the product looked. The board answered where it actually meets people — and it had to hold two journeys at once, because a marketplace has two sides that never see each other.",
          "It kicked off a set of new measures.",
        ],
      },
    ],
  },

  {
    slug: "head-sports",
    title: "HEAD Sports",
    year: "2017",
    mini: "One family's ski trip, mapped end to end",
    maturity: "Delivered",
    directions: ["management", "design"],
    lead:
      "An illustrated experience board for HEAD Sports — internally „Alpine Experience“: the most complete possible flow of a typical family from Cologne going on a ski trip to the Alps.",
    views: ["Booking inspiration", "Equipment", "Arrival", "Stay", "Departure"],
    shots: ["/work/head-sports/01.jpg", "/work/head-sports/02.jpg", "/work/head-sports/03.jpg", "/work/head-sports/04.jpg", "/work/head-sports/05.jpg"],
    tech: "Ink and watercolour · 29 scenes",
    sections: [
      {
        label: "The span",
        body: [
          "Booking inspiration, choice of equipment, arrival, stay, departure — twenty-nine scenes end to end.",
          "Drawn as one continuous flow, it puts the manufacturer's product in a single segment of a much longer journey, with everything around that segment deciding how the segment goes.",
        ],
      },
      {
        label: "Why it is drawn, not diagrammed",
        body: [
          "Every station is a watercolour scene with people in it: the family planning at a table in Cologne with the cathedral spires behind them, the arrival at the valley station between snow and a red railcar.",
          "A diagram gives you the order of the steps. These give you what a step feels like — which is the part a piece of equipment has to fit into.",
        ],
      },
    ],
  },

  {
    slug: "spirit-sprint",
    title: "Spirit Sprint",
    year: "2026",
    mini: "A workshop deck turned into a web flow",
    maturity: "Early Stage",
    directions: ["management"],
    lead:
      "A strategic ideation workshop framework — Soul, Skills, Strategy, Spirit — turned from a facilitator deck into a self-service flow a team can run without anyone in the room to moderate it.",
    views: ["Soul", "Skills", "Strategy", "Spirit"],
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
    mini: "The design tokens every build starts from",
    maturity: "Delivered",
    directions: ["design"],
    lead:
      "The shared design tokens for Aisu.Studio projects — colour including dark mode, spacing, radius, shadow, motion and self-hosted fonts. The base every new build starts from.",
    views: ["Tokens", "Components", "Patterns", "Fonts"],
    tech: "CSS custom properties · no framework · self-hosted fonts (Public Sans, iA Writer Mono, Stoke)",
    sections: [
      {
        label: "How it works",
        body: [
          "New projects link the token and component sheets directly. Existing projects carry their own copies of the same palette and get refactored one at a time, whenever there is a reason to touch them anyway.",
          "A live reference page renders every token and every component class, one example each, with an export button.",
        ],
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
    slug: "chillbert",
    title: "chillbert",
    year: "2026",
    mini: "Image or text as a point cloud in a cube",
    maturity: "Experiment",
    directions: ["building"],
    lead:
      "One-dimensional data in a three-dimensional cube. Drop in a picture and its colours take their places, so the cube becomes the image's gamut. Type text instead and every byte gets a place. Either way it comes out as a WebGL point cloud with the reading path lit between the points.",
    views: ["Character mode", "Hilbert mode", "RGB cube", "Blend"],
    tech: "three.js · WebGL · placement blended in the vertex shader",
    sections: [
      {
        label: "The problem",
        body: [
          "A point has one location, but a byte carries two facts: what it is, and where it stands. Only one of them can have the location — the other has to go to colour or size.",
        ],
      },
      {
        label: "How it works",
        body: [
          "So both placements are computed and a slider blends between them. At one end every byte value has a fixed home, so each “A” collapses onto the same star and point size shows how common it is. At the other, byte number i sits on cell i of a three-dimensional Hilbert curve, which preserves locality: neighbours in the text stay neighbours in space.",
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

  {
    slug: "aisulab",
    title: "AisuLab",
    year: "2026",
    mini: "Coding exercises for a ten-year-old",
    maturity: "Early Stage",
    directions: ["building", "design"],
    lead:
      "Exercises that teach a ten-year-old to program, read data and think about privacy — starting from the game he already plays. Built together with my son, who is also the first tester.",
    views: ["Exercises", "Puzzles", "Toolbox"],
    tech: "Astro · self-hosted fonts, no Google Fonts · no JavaScript framework, CSS-only mobile navigation",
    sections: [
      {
        label: "How it is built up",
        body: [
          "Exercises run in two tracks, coder and hacker, and each carries its difficulty, minimum age, duration and the tools it needs. The early ones read the Brawl Stars API with Python: fetch the JSON, loop over it, find the brawler with the most trophies.",
          "Later ones turn to data traces and security literacy — what an app knows about you, written into a file you can open and read yourself.",
        ],
      },
      {
        label: "The toolbox",
        body: [
          "Twelve tools, each with its level, platforms, price and a short note on when it is worth reaching for.",
        ],
      },
      {
        label: "Decisions",
        body: [
          "No external JavaScript framework and no fonts loaded from someone else's server. The mobile navigation is a checkbox and a label in CSS rather than a script, so it works with JavaScript switched off.",
        ],
      },
    ],
  },
];

// Die drei Türen im Hero.
export const DOORS = [
  { id: "work",   word: "What", label: "Work",   color: "var(--dh-what)", tint: "var(--dh-what-20)", href: "#work",
    note: "PLATZHALTER Work — hier steht später, was für eine Art Arbeit das ist." },
  { id: "skills", word: "can",  label: "Skills", color: "var(--dh-can)",  tint: "var(--dh-can-20)",  href: "#skills",
    note: "PLATZHALTER Skills — hier stehen später die Methoden." },
  { id: "about",  word: "I",    label: "About",  color: "var(--dh-i)",    tint: "var(--dh-i-20)",    href: "/profile",
    note: "PLATZHALTER About — hier steht später der Verweis aufs Profil." },
] as const;

export const EMAIL = "hi@dominikheilig.com";

export const BIO =
  "Dominik is a design led Product Manager and agentic builder with 15+ years in tech, based in Berlin. He is currently available for freelance and permanent.";
