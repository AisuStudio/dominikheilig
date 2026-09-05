import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { EMAIL } from "@/lib/content";

export const metadata = { title: "Lebenslauf — Dominik Heilig" };

/**
 * Lebenslauf — deutschsprachig, aus den Bauteilen der übrigen Seiten.
 *
 * Aufbau wie „Profile": Marke links in Spalte 1–2, Inhalt rechts daneben. Jeder
 * Abschnitt ist ein eigenes <section> mit eigener Überschrift, damit sich später
 * ein Druck-Stylesheet daran entlanghängen lässt, ohne das Markup anzufassen.
 *
 * Die Seite ist öffentlich erreichbar. Telefonnummer und Anschrift stehen
 * deshalb bewusst nicht darauf — Kontakt läuft über E-Mail und LinkedIn.
 *
 * Ein Verweis in der Kopfzeile fehlt absichtlich; er wäre eine Zeile in
 * components/SiteHeader.tsx neben dem bestehenden „About".
 */

const PROFIL = [
  "Product Manager mit Design-, Strategie- und Marketing-Hintergrund, 15 Jahre in der Tech-Welt (SaaS, MarTech, Marktplätze, Logistik, zuletzt Bau und Immobilien). Ich verantworte Produkte end-to-end, entwerfe und prototype sie selbst.",
  "Was ich gut kann: entscheiden, was es wert ist, gebaut zu werden — und es zusammenhängend halten. Ich arbeite discovery- und hypothesengetrieben: Rapid Prototyping mit KI, Learnings direkt implementieren, Sicherheit und Datenschutz von Anfang an.",
  "In Teams arbeite ich über Disziplinen hinweg und moderiere die Runden, in denen Vision und Prioritäten entstehen. In eigenen Projekten arbeite ich eher vision- und ideengetrieben.",
  "Zunehmend heißt das Arbeit im öffentlichen Interesse: offene Datenquellen, Schnittstellen zwischen Systemen, die einander nicht kennen, und Datensparsamkeit als Architekturentscheidung statt als Datenschutzseite.",
  "Menschen auf ihrem Weg zu begleiten zieht sich durch meine Laufbahn: von Lehraufträgen (FH Schwäbisch Gmünd, TÜV Rheinland Akademie) über EdTech (Supercool School, San Francisco) bis zu Aisu Lab, einer Digital-Literacy-Plattform für Kinder. Die letzten Monate habe ich mich tief ins agentische Bauen mit KI eingearbeitet — und sehe darin konkrete Hebel für modernes Product-Management-Lernen.",
];

const KOMPETENZEN_LINKS = [
  {
    h: "Produktmanagement",
    b: [
      "Produktstrategie und Produktvision, kontinuierliche Discovery, Roadmapping, Priorisierung, Product Backlog und Backlog-Management, Anforderungsmanagement (User Stories und Akzeptanzkriterien), Lifecycle-Management, A/B-Testing, Datenanalyse, Stakeholder-Management, cross-funktionale Führung, Go-to-Market",
    ],
  },
  {
    h: "Methoden und Moderation",
    b: [
      "Workshop-Design und Moderation: Vision, Priorisierung, Stakeholder-Runden mit externen Partnern",
      "Hypothesenbasiertes Arbeiten mit ausgewiesenem Belegstatus — belegt, Hypothese oder keine Daten",
      "1:1-Coaching und Feedback zu Projektarbeit, zielgruppengerechtes Erklären und Präsentieren",
      "Agile, Scrum, Kanban, Rapid Prototyping, Design Sprints",
    ],
  },
  {
    h: "Schnittstellen und Daten",
    b: [
      "Als Produkt- und Architekturentscheidung: verstehen und entscheiden, wie Systeme, die einander nicht kennen, verlässlich Daten austauschen",
      "Öffentliche und fremde APIs anbinden (OAuth2); Endpunkte vom Fehlerfall her denken — fail-closed als Default, Mandantentrennung, Rechte auf Datenebene",
      "Offene Daten und Geodaten; MCP-Server als Maschinen-Schnittstelle",
    ],
  },
];

const KOMPETENZEN_RECHTS = [
  {
    h: "Build und KI",
    b: [
      "Rapid Prototyping und Ausliefern mit agentischem KI-Tooling (Claude Code, Figma MCP, TypeScript, Next.js, Tailwind, Supabase, Vercel, WebGL)",
      "Auslieferdisziplin mit Push-to-Deploy, CodeQL und automatisierten Abhängigkeits-Updates",
    ],
  },
  {
    h: "Design",
    b: [
      "UX/UI, Design-Systeme (eigenes System „waffle“), Informationsarchitektur, Customer Journey, Visual Identity, Desktop, Mobile und Apps",
    ],
  },
  {
    h: "Cross-Domain",
    b: [
      "Schnelle Einarbeitung in neue Themenfelder: Food, Beauty, Umzug und Logistik, Klima, Bau und öffentliches Bauwesen, Forstökologie und Geodaten, Kultur",
    ],
  },
  { h: "Tools", b: ["Figma, Adobe Suite, Jira, Miro, Google Workspace, LMS- und Cloud-Tools"] },
  { h: "Sprachen", b: ["Deutsch (Muttersprache)", "Englisch (C1)", "Russisch (B1)"] },
];

const LEHRE = [
  "Moscow Comic School — eigene Online-Schule, 2010 während der Arbeit bei Supercool School aufgebaut: rund 30 Teilnehmende, wöchentliche Kurse mit eigenem Material zu Storytelling, Paneling und Character Design. Betrieben, um die UX des eigenen Produkts von der Nutzerseite her zu verstehen.",
  "FH / Hochschule für Gestaltung Schwäbisch Gmünd — Lehrauftrag Digital Design (Sommersemester 2011/2012).",
  "TÜV Rheinland Akademie, Berlin — Dozent Storyboarding (auf Abruf, 2013).",
  "Digitale Leute School — Absolvent des Product-Management-Bootcamps (2025).",
  "Aisu Lab — Digital-Literacy-Plattform für Kinder ab 10, gemeinsam mit meinem Sohn gebaut (siehe Eigene Produkte).",
];

type Station = {
  rolle: string;
  firma: string;
  zeit: string;
  ort: string;
  link?: { text: string; href: string };
  hinweis?: string;
  punkte: string[];
};

const STATIONEN: Station[] = [
  {
    rolle: "Product Manager, Designer & Builder",
    firma: "CNSL, eigenes Produkt",
    zeit: "06.2026 – heute",
    ort: "Berlin",
    link: { text: "cnsl.aisu.studio", href: "https://cnsl.aisu.studio" },
    punkte: [
      "Datenschutzorientierter Arbeitsraum: Aufgaben in sechs Ansichten, Notizen, Kalender, Scheduler, Chat, Publisher mit öffentlicher Autorenseite. Vom Konzept zur ersten stabilen Fassung in drei Wochen, KI-nativ; mit regelmäßigen Iterationen und Anknüpfungen an andere Produkte.",
      "Architekturentscheidungen bis ins Datenmodell: Datensparsamkeit und Rechte auf Datenebene als Default. Ein Sicherheits-Audit fand einen Cross-Tenant-Zugriff, den ich geschlossen und in klare Mandantentrennung übersetzt habe.",
      "Event Sourcing für lückenlose Nachvollziehbarkeit — nichts wird überschrieben, jede Änderung ist ein Ereignis; DSGVO-Löschung und -Export als eigener Endpunkt.",
      "Noder als visueller Agenten-Flow mit bewusster Vertrauensgrenze: der Agent schlägt vor, ein Mensch bestätigt. Nutzermeldungen laufen in ein offenes, verfolgbares Projekt.",
    ],
  },
  {
    rolle: "Produkt- und Brand-Consultant",
    firma: "Meile & Stein, Bausteuerungsbüro",
    zeit: "seit 11.2025",
    ort: "Kundenprojekt",
    link: { text: "meilestn.de", href: "https://meilestn.de" },
    punkte: [
      "Mit dem Gründer aufgenommen, wie das Büro Lean-Einsparpotenziale auf Bauprojekten tatsächlich rechnet; auf ein kanonisches Modell verdichtet.",
      "Als einbettbares Web-Widget ausgeliefert — ohne Datenerhebung, mit Tests abgesichert.",
      "Einen Einheitenfehler im Modell des Kunden gefunden und korrigiert, das Korrektur-Log offengelegt: Problem, alter Stand, neuer Stand, Quelle.",
    ],
  },
  {
    rolle: "Product Manager, Senior Designer",
    firma: "Movinga / Shift, Umzugsplattform",
    zeit: "12.2020 – 04.2024",
    ort: "Berlin",
    hinweis: "Übernahme durch Shift 2023, Insolvenz 2024",
    punkte: [
      "Cross-funktionale Zusammenarbeit mit Engineering, Support und Vertrieb (DACH, SE, FR); Persona-Arbeit, Markenstrategie, Produktvision.",
      "Dynamic-Pricing-Konzept für Umzugsslots: datenbasierte Preis- und Auslastungssteuerung, +10 % Umsatz und +15 % Wochenend-Auslastung.",
      "Partner-Dashboard mit Lead-Verteilung nach Performance-Score, A/B-getestete Schwellen: rund 15 % weniger tägliche Issues.",
      "Mobile-first-Funnel: Analyse und UI/UX, −10 % Absprungrate. Neuer Beschwerde- und Claim-Flow von Interviews bis Prototyp: −90 % E-Mail-Aufkommen.",
    ],
  },
  {
    rolle: "Product Manager, Senior Designer",
    firma: "Compass / Sage, Shopify Marketing-Monitoring",
    zeit: "07.2017 – 12.2019",
    ort: "Berlin und San Francisco, remote über drei Zeitzonen",
    hinweis: "Übernahme durch Sage 2018",
    punkte: [
      "Planung und Moderation von Remote-Stakeholder-Workshops zu Feature-Priorisierung, Produktvision und Teambuilding.",
      "Landingpages konzipiert und A/B-getestet: Signup-Rate +5–10 %. Dropship-Kampagne mit PPC- und Landingpage-Optimierung: Conversion Rate von 2 % auf 5 %.",
      "Design-System aufgebaut: Reduktion der Design-Schulden, rund 50 % schnellere Releases.",
    ],
  },
  {
    rolle: "Senior Designer, Product Manager",
    firma: "Salonmeister, Beauty Booking",
    zeit: "05.2014 – 06.2017",
    ort: "Berlin, London, Amsterdam",
    punkte: [
      "Frühes Teammitglied (rund 20 Personen); Übernahme durch Wahanda nach etwa 1,5 Jahren.",
      "Vision-Workshops zwischen Geschäftsleitung, Vertrieb, Support und Entwicklung moderiert und konzipiert.",
      "Buchungsplattform gemeinsam mit CPO, Partner-Salons und Entwicklung von Berlin auf deutschlandweite Abdeckung skaliert.",
    ],
  },
];

const WEITERE = [
  "Design Manager — DaWanda (2011–2014, Berlin)",
  "Interim Design Consultant — Lieferheld (2010–2011, Berlin)",
  "Web & Brand Design — Supercool School (EdTech, San Francisco, 2009–2010)",
  "Art Director — Rosinter (2006–2010, Moskau, rund 350 Restaurants in der GUS)",
];

type Produkt = { name: string; href?: string; zeile: string; punkte: string[] };

const PRODUKTE: Produkt[] = [
  {
    name: "Fontane",
    href: "https://fontane.studio",
    zeile: "Vom Werkzeug zum Vertriebskanal in drei Wochen · seit 2026 · live · fontane.studio",
    punkte: [
      "Browserbasierte Schrifterstellung, geräte- und betriebssystemunabhängig, mit Marktplatz zum Veröffentlichen und Teilen.",
      "Selbstgebautes, DSGVO-konformes und cookiefreies Analytics-Modul, öffentlich einsehbar — das ich gegen sich selbst geprüft habe: fünf Messfehler gefunden und behoben, darunter ein Mittelwert über einen Heavy Tail, der aus 31 Sekunden Median 27 Minuten machte.",
    ],
  },
  {
    name: "Fire on the Land",
    href: "https://fireontheland.org",
    zeile: "Offene Daten lesbar machen · seit 2026 · Beta · fireontheland.org",
    punkte: [
      "Discovery: eine Waldbrandfläche in Brandenburg. Die Frage war nicht „welcher Baum“, sondern welche Wiederbewaldung auf dieser Fläche begründbar ist.",
      "Konzept: den etablierten Fachrahmen Resist–Accept–Direct (US National Park Service) übernommen, statt ein eigenes Modell zu erfinden. Der Belegstatus — belegt, Hypothese oder keine Daten — ist im Produkt sichtbar.",
      "Delivery: Sentinel-2-Aufnahmen aus dem EU-Programm Copernicus angebunden, Brandmaske abgeleitet und gegen den amtlichen 744-Hektar-Perimeter verifiziert. Kein Backend, keine Anbieterbindung im Betrieb.",
      "Feedback: gegen das Prüfraster einer Fachwissenschaftlerin geprüft — neun Korrekturen, darunter ein echter Auswertungsfehler. Eine eigene These wurde durch die Veröffentlichung der Landesforstbehörde widerlegt und im Produkt korrigiert.",
    ],
  },
  {
    name: "waffle",
    href: "https://waffle.aisu.studio",
    zeile: "Design-Token-System · Beta · waffle.aisu.studio",
    punkte: [
      "Eigenes „living“ Token-System und Komponentenbibliothek (Farbe, Abstände, Typografie, Dark Mode, WCAG-AA), auf dem alle Aisu.Studio-Projekte aufbauen; Tokens und Textstile laufen programmatisch nach Figma und zurück.",
    ],
  },
  {
    name: "Aisu Lab",
    href: "https://lab.aisu.studio",
    zeile: "Digital Literacy für Kinder · live seit 05.2026 · lab.aisu.studio",
    punkte: [
      "Digital-Literacy-Plattform für Kinder ab 10, gemeinsam mit meinem Sohn gebaut; datenschutzfreundlicher Open-Source-Stack.",
    ],
  },
  {
    name: "witty und FullerHome",
    href: "https://palette.aisu.studio",
    zeile: "Weitere · palette.aisu.studio",
    punkte: [
      "witty — Werkzeug für PM-Methodik (Beta). FullerHome — WebGL-Simulation robotischen Holzbaus für öffentliche Gebäudetypen.",
    ],
  },
];

const BERATUNG = [
  "VINCI Facilities Solutions — Strategische Kommunikationsberatung (2026): Marken- und Kommunikationskonzept für eine bundesweite Roadshow über mehr als 15 Öffentlich-Private-Partnerschafts-Bauprojekte.",
  "Fire on the Land (Graphic Novel) — Autor, Illustrator und Projektleitung einer dokumentarischen Graphic Novel mit Prof. Oliver Sonnentag (Université de Montréal), begleitet von Dieter Cazon (Liidlii Kue First Nation); cross-kulturelle Recherche und Vermittlung. Dasselbe Thema wie das Daten-Tool oben.",
  "Comic Invasion Berlin — Partnership und Project Manager (2022–2026): Partnerkonzept, Akquise, Kommunikation; Festivalfinanzierung trotz Kürzungen im Berliner Kulturhaushalt stabilisiert.",
];

const WEITERBILDUNG = [
  "Product-Management-Bootcamp — Digitale Leute School, 03.2025 – 05.2025, Vollzeit. Produktstrategie, Ideation und Roadmapping, User Interviews und Validierung, User Stories und Akzeptanzkriterien; Trainerinnen und Trainer unter anderem von Airbnb, HeyJobs, Porsche Digital, REWE Digital, Otto, Metro Digital und Xing.",
  "Finance for Product Leaders — Simonetta Batteiger (2026).",
  "Design Sprinter — AJ&Smart und Compass (2015).",
];

const REFERENZEN = [
  "Phillipp Rechberg — Caya und Salonmeister, CPO",
  "Oswaldo Acauan — Movinga, Head of Engineering",
  "Christoph Bresler — Digitale Leute School",
  "Weitere auf Anfrage.",
];

/** Marke links, Inhalt rechts — dasselbe Paar wie auf „Profile" und den Projektseiten. */
function Abschnitt({ marke, children }: { marke: string; children: React.ReactNode }) {
  return (
    <section className="contents">
      <h2 className="section-label t-eyebrow col-label mt-100">{marke}</h2>
      <div className="col-body mt-100">{children}</div>
    </section>
  );
}

function Gruppe({ h, b }: { h: string; b: string[] }) {
  return (
    <div>
      <h3 className="t-p2s">{h}</h3>
      <ul className="code-list mt-10 t-body">
        {b.map((z, i) => (
          <li key={i}><span>{z}</span></li>
        ))}
      </ul>
    </div>
  );
}

function Eintrag({ s }: { s: Station }) {
  return (
    <article>
      <h3 className="t-h3">{s.rolle}</h3>
      <p className="t-p2" style={{ color: "var(--dh-what)" }}>{s.firma}</p>
      <p className="mt-5 t-code" style={{ color: "var(--dh-can)" }}>
        {s.zeit} · {s.ort}
        {s.link ? (
          <>
            {" · "}
            <a href={s.link.href} target="_blank" rel="noreferrer" className="link-hover underline">
              {s.link.text}
            </a>
          </>
        ) : null}
        {s.hinweis ? ` · ${s.hinweis}` : null}
      </p>
      <ul className="code-list mt-15 t-body">
        {s.punkte.map((p, i) => (
          <li key={i}><span>{p}</span></li>
        ))}
      </ul>
    </article>
  );
}

export default function CvPage() {
  return (
    <>
      <SiteHeader />
      <div className="page page-sections min-h-dvh" lang="de">
        <div className="grid12 content-start">
          {/* Kopf */}
          <header className="col-main mt-100">
            <h1 className="t-h2">Dominik Heilig</h1>
            <p className="mt-15 t-h3" style={{ color: "var(--dh-what)" }}>
              Product Manager — produktgetrieben, hands-on, mit Design-Hintergrund
            </p>
            {/* Öffentlich erreichbare Seite: keine Telefonnummer, keine Anschrift. */}
            <p className="mt-20 flex flex-wrap gap-20 t-code">
              <a href={`mailto:${EMAIL}`} className="link-hover" style={{ color: "var(--dh-link)" }}>
                {EMAIL}
              </a>
              <a href="https://dominikheilig.com" className="link-hover" style={{ color: "var(--dh-link)" }}>
                dominikheilig.com
              </a>
              <a
                href="https://www.linkedin.com/in/dominik-heilig/"
                target="_blank"
                rel="noreferrer"
                className="link-hover"
                style={{ color: "var(--dh-link)" }}
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/AisuStudio"
                target="_blank"
                rel="noreferrer"
                className="link-hover"
                style={{ color: "var(--dh-link)" }}
              >
                GitHub ↗
              </a>
            </p>
          </header>

          <Abschnitt marke="Profil">
            <div className="space-y-20">
              {PROFIL.map((p, i) => <p key={i} className="t-body">{p}</p>)}
            </div>
          </Abschnitt>

          {/* Einspaltig wie alle anderen Abschnitte: die Halbspalten beginnen in
              Rasterspalte 1 und lägen damit unter der Marke statt daneben. */}
          <Abschnitt marke="Kernkompetenzen">
            <div className="space-y-50">
              {[...KOMPETENZEN_LINKS, ...KOMPETENZEN_RECHTS].map((g) => <Gruppe key={g.h} {...g} />)}
            </div>
          </Abschnitt>

          <Abschnitt marke="Lehre und Mentoring">
            <ul className="code-list t-body">
              {LEHRE.map((z, i) => <li key={i}><span>{z}</span></li>)}
            </ul>
          </Abschnitt>

          <Abschnitt marke="Berufserfahrung">
            <div className="space-y-50">
              {STATIONEN.map((s) => <Eintrag key={s.firma} s={s} />)}
            </div>
          </Abschnitt>

          <Abschnitt marke="Weitere Stationen">
            <ul className="code-list t-body">
              {WEITERE.map((z, i) => <li key={i}><span>{z}</span></li>)}
            </ul>
          </Abschnitt>

          <Abschnitt marke="Eigene Produkte">
            <p className="t-body">
              Produktentscheidung, Konzept, Umsetzung und Betrieb in einer Hand; gebaut auf meinem eigenen
              Design-System (waffle). Werkschau:{" "}
              <a
                href="https://palette.aisu.studio"
                target="_blank"
                rel="noreferrer"
                className="link-hover underline"
                style={{ color: "var(--dh-link)" }}
              >
                palette.aisu.studio
              </a>
            </p>
            <div className="mt-50 space-y-50">
              {PRODUKTE.map((p) => (
                <article key={p.name}>
                  <h3 className="t-h3">
                    {p.href ? (
                      <a href={p.href} target="_blank" rel="noreferrer" className="link-hover">
                        {p.name} ↗
                      </a>
                    ) : (
                      p.name
                    )}
                  </h3>
                  <p className="mt-5 t-code" style={{ color: "var(--dh-can)" }}>{p.zeile}</p>
                  <ul className="code-list mt-15 t-body">
                    {p.punkte.map((z, i) => <li key={i}><span>{z}</span></li>)}
                  </ul>
                </article>
              ))}
            </div>
          </Abschnitt>

          <Abschnitt marke="Beratung und Kultur">
            <ul className="code-list t-body">
              {BERATUNG.map((z, i) => <li key={i}><span>{z}</span></li>)}
            </ul>
          </Abschnitt>

          <Abschnitt marke="Weiterbildung">
            <ul className="code-list t-body">
              {WEITERBILDUNG.map((z, i) => <li key={i}><span>{z}</span></li>)}
            </ul>
          </Abschnitt>

          <Abschnitt marke="Referenzen">
            <ul className="code-list t-body">
              {REFERENZEN.map((z, i) => <li key={i}><span>{z}</span></li>)}
            </ul>
            <p className="mt-20 t-body">
              Kontakt über{" "}
              <a href={`mailto:${EMAIL}`} className="link-hover underline" style={{ color: "var(--dh-link)" }}>
                E-Mail
              </a>{" "}
              oder{" "}
              <a
                href="https://www.linkedin.com/in/dominik-heilig/"
                target="_blank"
                rel="noreferrer"
                className="link-hover underline"
                style={{ color: "var(--dh-link)" }}
              >
                LinkedIn ↗
              </a>
              .
            </p>
          </Abschnitt>

          <Footer />
        </div>
      </div>
    </>
  );
}
