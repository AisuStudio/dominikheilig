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
  /** Zweiter Verweis neben „Visit Website" — führt an eine Adresse statt an eine Seite.
      Steht oben bei den Ansichten und unten am letzten Abschnitt, beide Male daneben. */
  extraLink?: { label: string; href: string };
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
      "Fontane.Studio is a free handwriting font editor in the browser. Draw your glyphs and it builds a real usable font file. No account, no install. Project files move between devices by hand — from a tablet to a PC, say." +
      "\n\n" +
      "I have organised comic-font workshops since 2024 with the type designer and illustrator Sylvain Mazas, Glyphs.app and Moleskine. The tool we used only runs on macOS, so iPad and Windows users were left out.",
    views: ["Grid", "Typer", "Writer", "Marketplace", "Font specimen", "Analytics"],
    shots: [
      "/work/fontane/grid.jpg",
      "/work/fontane/typer.jpg",
      "/work/fontane/writer.jpg",
      "/work/fontane/marketplace.jpg",
      "/work/fontane/specimen.jpg",
      "/work/fontane/analytics.jpg",
    ],
    tech: "opentype.js · perfect-freehand · Supabase · Figma · UFO & JSON export",
    sections: [
      {
        label: "How it works",
        body: [
          "Draw glyphs, ligatures and contextual alternates by hand; the editor builds an OpenType file from the strokes themselves.",
          "Its own project file, a .fff, carries the work between devices, so a drawing started on a tablet can be finished on a PC. An open marketplace publishes finished fonts, and the site runs on cookie-free analytics of its own.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "565 visits",
            "280 sessions",
            "14 drew",
            "8 exported a font",
            "1 published",
            "",
            "25 s median visit",
            "52 s to first stroke",
            "",
            "38 days of work",
          ],
        },
      },
      {
        label: "Process",
        steps: [
          "Workshops + Pain",
          "Idea",
          "Rough Proof of Concept",
          "Test & iterate",
          "First feedback",
          "Refactor",
        ],
        body: [
          "A rough first prototype out of a comprehensive vision based on the workshop pains, then testing, feedback and iteration.",
          "After a deep review the editor was rebuilt from scratch. The first version made drawing feel like fighting the tool, and no amount of patching was going to fix that.",
        ],
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
          "Adoption is picking up, and people spend more time on the app rather than just looking. The goal is to have the workflows and UX smooth until mid autumn ’26.",
          "So far users report bugs and suggest improvements through the app. The last round of feedback had a very positive impact on the editor and triggered the landing page.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Final beta of 2.0",
            "",
            "Next:",
            "UX and workflow fixes",
            "Traffic for real feedback",
            "Moleskine Smart-Writing bridge",
          ],
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
      "CNSL is a free DIY productivity app for individuals or small teams. It runs in the browser, so the same seven tools and the same projects are on every device." +
      "\n\n" +
      "The name and the idea are from 2006, when Windows Mobile on my HTC was too cumbersome to catch a thought. I built it twenty years later, after my go-to time-tracking app shut down.",
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
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "34 Days",
            "10+ Running projects",
          ],
        },
      },
      {
        label: "Process",
        steps: [
          "Organisational pain",
          "Big Vision into Claude",
          "MVP",
          "On every device",
          "Add tools",
          "dog-fooding",
        ],
        body: [
          "Dogfooding became the main driver for development. The more the app was capable of, the more I used it for my own planning. Opportunities and breaking points became apparent fast. With agentic building they were relatively easy to build or fix.",
          "Later the board seeded itself from CNSL’s own roadmap on first load. The app tracks its own development, so every missing feature is visible while you use it.",
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
    extraLink: {
      label: "Request Beta Code \u2197",
      href: "mailto:hi@dominikheilig.com?subject=CNSL%20beta%20code",
    },
  },

  {
    slug: "solarkreis",
    title: "SolarKreis",
    year: "2026",
    mini: "A solar park you can watch and operate — invented plant, real data",
    maturity: "Early Stage",
    points: 2,
    industry: "Energy",
    timeSpent: "24 hours",
    directions: ["building", "management", "design"],
    lead:
      "SolarKreis watches a solar park: external data, three fields, one control centre. The park is invented. The weather, the electricity price and the fire warnings are real." +
      "\n\n" +
      "A job ad set it off: someone who takes a prototype all the way into production alone — real controls, one shared data model across different manufacturers’ systems, routines that run by themselves. That is what this is, built from nothing in 24 hours. Call it a prototype sprint.",
    views: ["System map", "Field map", "Guard and tenancy", "Event log", "Data sources", "Documentation"],
    shots: [
      "/work/solarkreis/intro.jpg",
      "/work/solarkreis/map.jpg",
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
          "Three kinds of live data come in from outside: sun and temperature, the hourly electricity price, and fire warnings from a NASA satellite.",
          "The output is calculated, not invented — where the sun stands, how clear the sky is, and how hot the panels get. Above 25 °C they lose efficiency, so a hot day in July yields less than a cool day in May with the same sunshine.",
          "The equipment in the fields comes from three manufacturers, and each one reports in its own format. They are translated once, at the door. Everything behind it only knows kilowatts and degrees.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "3 fields with 7 inverters",
            "3 vendor formats",
            "3 external data sources",
            "",
            "38.88 MW grid limit",
            "39.8 MW at solstice",
            "20 MWh storage",
            "",
            "48 checks against the live instance",
            "24 hours from scratch",
          ],
        },
      },
      {
        label: "Process",
        steps: [
          "Ideate & scope",
          "Wireframes & Design",
          "Local tests & iteration",
          "Connect data",
          "Production",
        ],
        body: [
          "The screens were drawn in Figma before a line of code: by hand where a decision had to be made, with agents where every colour and line had to be tied to a single source. Nine text sizes, one place to change any of them. Contrast was measured, not eyeballed.",
          "A separate document lists the decisions I made without a wireframe, written so someone can argue with them instead of me defending them.",
          "The fire feed arrived sideways. I had been researching wildfires for a graphic novel about the boreal forest, so the NASA data was already on my desk when the question came up.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "The hardest part was not the code. It was deciding what to simulate at all — a wind park, a solar park, or the flux towers from Scotty Creek. The subject was interchangeable; the pattern was the point.",
          "Solar won because I kept driving past it. Along the A9 there are modules over farmland, grazing animals underneath, using the shade as much as the sun. Then the harder half started: where to stop. What came of that is the section below.",
          "The 20 MWh of storage came from a trade article about rust batteries — iron-air cells that charge by reversing rust.",
        ],
      },
      {
        label: "What I did not build",
        body: [
          "Three features were cut, each with the measurement that killed it.",
          "— The glare alarm. I computed the reflection for a whole year in five-minute steps, and it came back with zero moments of glare: the motorway there runs at 51°, and the panels reflect past it. The calculation stays in the repo as the reason for the cut.",
          "— A traffic feed. Free and easy to read, but nothing in the plant would act on it.",
          "— A multi-day storage fallback. It would need a load model the system does not have.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Finished prototype",
          ],
        },
      },
    ],
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
    industry: "Logistics",
    directions: ["management", "design"],
    lead:
      "Movinga was a house-move booking platform operating in Germany, France, Sweden, Austria and Switzerland. An average move cost around €1,100." +
      "\n\n" +
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
        steps: [
          "Leads on the phone",
          "Journey maps in GA",
          "Unglamorous fixes",
          "+7% conversion",
        ],
        body: [
          "A significant part of the leads came through the website, and more and more of them arrived on a phone. Region, seasonality, sales agent and customer liquidity all played into the flow, so touching it crossed every department in the company.",
          "A user journey map, a funnel analysis and a lead journey analysis built the shared picture first and became a visual and living tool across the team. The measures that followed were unglamorous: more and larger call buttons, consultation offered at every touchpoint, simpler screens.",
          "The result was an increase of about 7% in conversion rate — roughly €150k more turnover year on year.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2023",
            "Full Time Employment",
          ],
        },
      },
      {
        label: "Claim process",
        steps: [
          "Emails as the target",
          "Three markets researched",
          "Flowcharts & prototypes",
          "Down to 10%",
        ],
        body: [
          "The technical goal was one number: reduce email traffic between the customer, Movinga and the insurer.",
          "Research with the claim managers of three markets and the head of engineering. Then flowcharts, Figma wireframes and prototypes, built with the claims department and the insurer.",
          "That cut the emails down to 10%, and on top of that the claim managers felt a huge relief in their workload.",
        ],
      },
      {
        label: "Partner app",
        steps: [
          "Driver feedback",
          "Bonus tried",
          "Bonus scrapped",
          "Sticky components removed",
        ],
        body: [
          "A collection of smaller optimisations, including one that failed. Partner bonuses were welcomed in every conversation, then scrapped after six months: the bonus rarely reached the drivers it was meant to reach.",
          "Fixing the mobile app had a significant impact on daily hiccups. Removing sticky components gave drivers easier access to the full logistics information.",
        ],
      },
      {
        label: "Rebrand concept",
        steps: [
          "Booked the service myself",
          "Experiencing a new chapter",
          "Rebrand foundation",
          "Asynchronous Design Sprint",
          "Concept",
        ],
        body: [
          "When I started at Movinga, we moved as a family and I booked their service. Movinga helps people arrive in a new chapter of their life — that understanding stayed with me.",
          "It became the foundation of Movinga’s rebranding concept.",
        ],
      },
    ],
  },

  {
    slug: "shift",
    title: "Shift",
    year: "2023",
    mini: "Driver app for a UK logistics marketplace",
    maturity: "Delivered",
    // TODO Dom: points und timeSpent prüfen — dieselbe Anstellung wie Movinga?
    points: 5,
    timeSpent: "Full Time Employment",
    industry: "Logistics",
    directions: ["management", "design"],
    lead:
      "Shift.online is a UK marketplace for two-person and last-mile delivery. Its Driver.App runs on Android and iOS, built in Flutter and maintained by the engineering team alone, without design." +
      "\n\n" +
      "Shift had acquired Movinga, which is how I came to it — two driver apps side by side, our PWA and this one.",
    views: ["Driver.App", "Schedule", "Job offer", "Swipe modal", "Date picker", "In Figma"],
    shots: [
      "/work/shift/app.png",
      "/work/shift/schedule.jpg",
      "/work/shift/job.jpg",
      "/work/shift/swipe.jpg",
      "/work/shift/datepicker.jpg",
      "/work/shift/figma.png",
    ],
    tech: "Flutter (Android and iOS) · Figma · driver feedback · component library",
    sections: [
      {
        label: "The situation",
        steps: [
          "Driver feedback",
          "To the Flutter team",
          "Contrast and legibility",
          "Screens rebuilt",
        ],
        body: [
          "An app that ships continuously without design consultation works for a while, and then it does not. I aggregated the feedback the drivers were already giving and took it to the Flutter team.",
          "What came back was not a redesign brief. It was contrast, grey tones, legibility and patterns you could tell apart — the things that decide whether a phone is readable in a van.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2023",
            "Full Time Employment",
          ],
        },
      },
      {
        label: "What changed",
        body: [
          "Fewer containers. The pick-up amber and drop-off blue hold across every screen instead of appearing per component. Modals moved onto an overlay in the brand colour, and the type got bolder.",
          "The small things surface the same way. A date picker was showing “outubro de 2023” in an English app, and the swipe prompt said “desitnation”. Nobody files a ticket for that; a driver just squints and carries on.",
        ],
      },
      {
        label: "Result",
        body: [
          "The drivers noticed, because looking at the phone is most of the job. The engineering team could build cleaner screens in less time, and the component library got tidied on the way.",
          "“Sometimes it’s a bunch of small changes that make the work for us and the users easier.” — Felipe, Flutter engineer",
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
      "Fire on the Land is the project site for a scientific graphic novel about Scotty Creek Research Station in Canada’s Northwest Territories. It is the country’s first Indigenous-led research station. It burnt down in a wildfire in late 2022." +
      "\n\n" +
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
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "8 Days",
          ],
        },
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
      },
      {
        label: "Hardest call",
        body: [
          "Assess, don’t decide. The tool makes trajectories comparable and trackable; it does not recommend one.",
          "That is a smaller product than a recommendation engine, and the right one. Nobody hands a forest decision to a website, but they will use one to argue with.",
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
      "The Lean Calculator is a widget for the construction consultancy Meile + Stein. It shows a client what lean methods could save on their building project.\nBudget in, two gauges out." +
      "\n\n" +
      "It embeds into their site with one script tag and a custom element, without any network calls.",
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
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "2 Days",
          ],
        },
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
          "Whenever the calculator changes, it recomputes a set of known examples and compares them with the client's own figures. If one number is off, it says so (unit tests).",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "Show ranges, not exact figures. False precision would have been easier to build and impossible to defend: a number to two decimal places invites a discussion the model cannot survive.",
          "The panel that explains the method and its sources sits inside the widget, not in a footnote.",
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
      "NORMANN is an interactive reference book for the people who plan public building work in Berlin and Brandenburg. Type in what a job will cost and it tells you which way you are allowed to award it, quoting the rule and its date as you type." +
      "\n\n" +
      "It grew out of exchanges with the consultancy Meile + Stein running since 2025. Research in progress and a public prototype — not an official service, and not legal advice.",
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
          "Awarding public building work runs on email and fax ping-pong. Questions go back and forth between authorities and planning offices. Months of a project go into waiting rather than deciding, and both sides pay for that time. NORMANN takes one piece out of the loop: the question that gets asked most often, answered while you type.",
          "The limits sit in three rule books, federal, state and municipal. Each with its own date. Someone has to read all three to know whether a job can be awarded quietly or has to go out to tender.",
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
            "",
            "3 days of work",
          ],
        },
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
          "A large job can be split into smaller contracts, which opens up simpler procedures and routes the whole job would not allow. At the end you print a PDF: the amounts, the route, and the rules behind them — the written justification the office has to file anyway.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "NORMANN tells you which procedures the law allows for an amount, and quotes the paragraph it comes from. In Germany, telling you which one to choose would be legal advice, and only licensed lawyers may give it. So the tool stops one step short of where it would be most useful, on purpose. That limit is the reason it can exist at all.",
        ],
      },
      {
        label: "Why there is no login",
        body: [
          "NORMANN is meant to be an open, transparent companion. No account, nothing stored, nothing sent anywhere, nothing to install. Those four keep it from counting as another piece of software that needs approval.",
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
      "FullerHome is an animated 3D browser simulation of a robot building a self-supporting timber plate shell on site. Raw plates arrive, are milled on the spot and assembled by a robot." +
      "\n\n" +
      "Exploration with the consultancy Meile + Stein, whose public-procurement ladder runs inside it.",
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
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "5 Days",
          ],
        },
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
      },
      {
        label: "Hardest call",
        body: [
          "The robot cannot reach a whole shell from one spot. It is modelled on the ETH Zurich In-situ Fabricator at realistic scale, about 3.5 metres of arm reach.",
          "So it drives. A set-cover planner picks work stations, and a depot with an on-site mill sits in the middle. Accepting the reach limit is what turned a rendering into a construction sequence.",
          "For the sake of complexity we also dropped more realistic physics and collision models.",
        ],
      },
      {
        label: "Procurement",
        body: [
          "A rule engine maps the configured budget onto the German public-procurement award bands at the 2026 thresholds, from direct award up to the EU-wide procedure. The Berlin and Brandenburg obligations are included.",
          "It renders as a clickable ladder, so a change in budget shows immediately which procedure the project falls into.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Dormant",
            "",
            "Maybe: an additional tiny-house simulation",
          ],
        },
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
        steps: [
          "Dashboards",
          "Into a design system",
          "Peer-based insights",
          "Mobile sign-up measured",
        ],
        body: [
          "Improving the UI and UX of the dashboards. Cleaning the existing design up into a design system, and building new dashboards from management requirements.",
          "Alongside that the marketing side: implementing the redesign, building landing pages, and creating, testing and improving ad-banner concepts.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2020",
            "Full Time Employment",
          ],
        },
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
      "AisuLab is a set of IT-literacy exercises for kids: programming, reading data and thinking about privacy — starting from the game they already play." +
      "\n\n" +
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
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "11 Days",
          ],
        },
      },
      {
        label: "Process",
        steps: [
          "His own game",
          "Read the API",
          "Two tracks",
          "Data and privacy",
          "Twelve tools",
        ],
        body: [
          "The mobile navigation is a checkbox and a label in CSS rather than a script, so it works with JavaScript switched off.",
        ],
      },
      {
        label: "Hardest call",
        body: [
          "A site that teaches data traces should not leave any. So: no external JavaScript framework, and no fonts loaded from someone else's server.",
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
      "waitingroom is a prototype that fills the gap between Figma and implementation, where the behaviour of a component is decided and currently written down nowhere." +
      "\n\n" +
      "A room for behaviour rules and independent design iteration. The step between a specification and a built component, a waiting room.",
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
          label: "In numbers",
          lines: [
            "2026",
            "1 Day",
          ],
        },
      },
      {
        label: "How it works",
        steps: [
          "Gap after the spec",
          "One rule, executable",
          "Control panel",
          "Stated and justified",
        ],
        body: [
          "A rule becomes executable: a prototype that actually applies it, with a control panel to drive it past its own thresholds.",
          "And readable: stated, justified, with its edge cases — and with what it does not answer.",
        ],
      },
      {
        label: "What it is not",
        body: [
          "It is not production code! Nothing here is meant to be shipped or held to production standards; if it looks like a delivery, that is a bug in the presentation.",
          "It is not a component library either. Four of the eight steps in the workflow are marked as the team's own. The point is to slot into their process, not to replace it.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Awaiting stakeholder review",
          ],
        },
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
      "witty started as my own product-management awareness companion. It walks me through fourteen steps from spark to snapshot, and audits in hindsight which methods are already practised." +
      "\n\n" +
      "It’s named after Wittgenstein: the limits of my language mean the limits of my world. You can only build in the directions you have language for.",
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
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "7 Days",
          ],
        },
      },
      {
        label: "Process",
        steps: [
          "Schema in markdown",
          "Prompt follows it",
          "Hindsight audit",
          "Bilingual from day one",
        ],
        body: [
          "Naming a method you already use is what makes it repeatable. That is the whole bet of the hindsight audit.",
        ],
      },
      {
        label: "Principles",
        body: [
          "Plain language first, the textbook term as a learning anchor. Methods are options, never obligations.",
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
        steps: [
          "After the redesign",
          "Two journeys at once",
          "Touchpoints mapped",
          "New measures",
        ],
        body: [
          "The redesign answered how the product looked. The board answered where it actually meets people. It had to hold two journeys at once: a marketplace has two sides that never see each other.",
          "It kicked off a set of new measures.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2018",
            "Full Time Employment",
          ],
        },
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
        steps: [
          "A family from Cologne",
          "29 scenes",
          "Watercolour, not diagram",
          "One flow",
        ],
        body: [
          "Booking inspiration, choice of equipment, arrival, stay, departure — twenty-nine scenes end to end.",
          "Drawn as one continuous flow, it puts the manufacturer's product in a single segment of a much longer journey. Everything around that segment decides how the segment goes.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2017",
            "2 Days",
          ],
        },
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
      "waffle is my shared design system behind most of my agentic projects: colour including dark mode, spacing, radius, shadow, motion and self-hosted fonts." +
      "\n\n" +
      "It is the default base every new build starts from.",
    views: ["Tokens", "Components", "Patterns", "Type roles"],
    shots: ["/work/waffle/01.jpg", "/work/waffle/02.jpg", "/work/waffle/03.jpg", "/work/waffle/04.jpg"],
    tech: "CSS custom properties · no framework · self-hosted fonts (Public Sans, iA Writer Mono, Stoke)",
    sections: [
      {
        label: "How it works",
        steps: [
          "Quarry of real pages",
          "Tokens",
          "Component classes",
          "Live reference page",
        ],
        body: [
          "New projects link the token and component sheets directly. Existing projects carry their own copies of the same palette. They get refactored one at a time, whenever there is a reason to touch them anyway.",
          "A live reference page renders every token and every component class, one example each, with an export button.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "8 Days",
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
        rail: {
          label: "What's next",
          lines: [
            "In use across most projects",
            "",
            "Next: a clean-up, and one library",
            "across web and Figma",
          ],
        },
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
      "AALY is a quick prototype for a festival platform — a digital artist alley, community and information hub for exhibitors and visitors alike.\nThe prototype runs the whole logged-in flow for Comic Invasion Berlin 2027." +
      "\n\n" +
      "I have been on the festival team since 2012, and I was curious what an independent platform of its own could do for it.",
    views: [
      "Space landing",
      "Artist Alley",
      "Events",
      "Event detail",
      "Artist portfolio",
      "Application",
      "Chat",
      "Design system",
    ],
    shots: [
      "/work/aaly/landing.jpg",
      "/work/aaly/alley.jpg",
      "/work/aaly/events.jpg",
      "/work/aaly/event.jpg",
      "/work/aaly/portfolio.jpg",
      "/work/aaly/application.jpg",
      "/work/aaly/chat.jpg",
      "/work/aaly/design-system.jpg",
    ],
    tech: "Pure HTML and CSS · no framework, no build step, no npm · KERN UX v2.6.4 · Public Sans · Lucide icons · one shared stylesheet of ~700 lines · GitHub Pages",
    sections: [
      {
        label: "How it works",
        body: [
          "Eight screens, all linked and clickable. The alley is organised around the table. Your own stand, your neighbours on tables 5 to 9 — and a search that takes a table number as readily as a name.",
          "A three-step application — personal data, portfolio, what you want to exhibit — ends in a summary and a reference number. The programme takes bookmarks, and an artist page holds gallery, bio and events.",
          "There is no backend. The prototype exists to put the whole product experience in front of stakeholders and test users before anything is implemented.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2026",
          ],
        },
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
      },
      {
        label: "Hardest call",
        body: [
          "The base is KERN UX, the open-source design system of the German public sector. A comic festival is not an authority — starting from scratch would have been the obvious move.",
          "But KERN carries accessibility and form patterns a festival would otherwise have to invent. The festival look sits on top as a token layer: CIB yellow, the mascot, the editorial hero. A theme over KERN, not a fork of it.",
        ],
        rail: {
          label: "What's next",
          lines: [
            "Prototype v0.1, no backend",
            "",
            "Next: a table plan for the alley",
            "and an editable artist profile",
            "",
            "Further development depends on funding approval",
          ],
        },
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
      "chillbert turns an image file into a tangible colour space. Drop in a picture and RGB turns to XYZ. The cube becomes the image's gamut.\nTry it with animated GIFs!" +
      "\n\n" +
      "It comes out as a WebGL point cloud, with the reading path lit between the points.",
    views: ["Semantic text", "Pure entropy", "Character mapping", "Encrypted vault"],
    shots: ["/work/chillbert/01.jpg", "/work/chillbert/02.jpg", "/work/chillbert/03.jpg", "/work/chillbert/04.jpg"],
    tech: "three.js · WebGL · placement blended in the vertex shader",
    sections: [
      {
        label: "How it works",
        steps: [
          "RGB as coordinates",
          "Two placements",
          "Slider in the shader",
          "One day",
        ],
        body: [
          "Every colour is already three numbers — red, green, blue. Read them as X, Y and Z, and every pixel becomes a point in a cube. Drop in a picture and its colours take their places: the cube fills where the image lives and stays empty where it does not. That shape is its gamut.",
          "Text works the same way, one point per byte. A slider blends between two placements — every byte value on a fixed home, or byte number i on cell i of a three-dimensional Hilbert curve, which keeps neighbours in the text as neighbours in space. The blend happens in the vertex shader, so dragging costs nothing per frame.",
        ],
        rail: {
          label: "In numbers",
          lines: [
            "2026",
            "1 Day",
          ],
        },
      },
      {
        label: "Coolest feature",
        body: [
          "Throw in an animated GIF and every frame gets its own cloud. Played back, the points wobble, shiver and wander through the cube — a palette in motion.",
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
  "Dominik is a design-led Product Manager and agentic builder in Berlin, with 15+ years in tech.";

/** Getrennt vom Satz darüber: eine Aussage und eine Aufforderung im selben
    Atemzug lassen beide untergehen. */
export const BIO_CTA = "Open to freelance work, permanent roles and collaborations.";

