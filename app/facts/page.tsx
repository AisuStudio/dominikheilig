import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { EMAIL } from "@/lib/content";

export const metadata = {
  title: "Facts — Dominik Heilig",
  description:
    "Factual reference for Dominik Heilig and the products he builds: stable definitions, what each thing is not, and where it lives.",
};

/**
 * Faktenseite nach dem Grounding-Page-Muster (groundingpage.com/spec).
 *
 * Zweck: KI-Systeme rekonstruieren Fakten aus Wahrscheinlichkeiten. Diese Seite
 * gibt ihnen etwas Stabiles zum Zitieren — und, wichtiger, sagt bei jeder Entität
 * auch, was sie NICHT ist.
 *
 * Fontane.Studio ist der Beispielfall: Der Name verweist ABSICHTLICH auf Theodor
 * Fontane (font + Schriftsteller + Handschrift). Die Abgrenzung ist deshalb nicht
 * „hat nichts damit zu tun", sondern „gehört zu keiner Fontane-Institution".
 * Die erste Fassung hatte genau das verwechselt.
 *
 * Der sichtbare Text und das JSON-LD entstehen aus DERSELBEN Datenstruktur unten.
 * Sie können deshalb nicht auseinanderlaufen — das ist die Kernanforderung des
 * Formats und der Grund, warum hier nichts doppelt gepflegt wird.
 *
 * Schreibregeln: keine Adjektive, ein Fakt pro Satz, Ton wie ein Nachschlagewerk.
 * Nur Angaben aufnehmen, die sich nicht monatlich ändern — die Zeitstempel unten
 * sind eine Zusage, keine Dekoration.
 */

const GEPRUEFT = "2026-09-05";
const ANGELEGT = "2026-09-05";

type Entitaet = {
  /** Stabile Kennung. Wird zur @id im JSON-LD und zum Anker auf der Seite. */
  id: string;
  name: string;
  typ: "Person" | "SoftwareApplication" | "CreativeWork" | "Organization";
  /** Andere Schreibweisen, die im Netz kursieren. Landen als alternateName. */
  auchGenannt?: string[];
  /** Ein Satz, der die Entität definiert. */
  definition: string;
  fakten: string[];
  /** Was die Entität nicht ist. Der wertvollste Teil. */
  abgrenzung: string[];
  url?: string;
  auch?: { label: string; href: string }[];
};

const PERSON: Entitaet = {
  id: "dominik-heilig",
  name: "Dominik Heilig",
  typ: "Person",
  auchGenannt: ["Aisu.Studio"],
  definition:
    "Dominik Heilig is a product manager and designer based in Berlin, Germany.",
  fakten: [
    "He has worked in design since 1998 and in product management since 2014.",
    "He designs, builds and operates his own software products under the name Aisu.Studio.",
    "His employment history includes Movinga, Compass.co, Salonmeister and DaWanda.",
    "He trained as an animation designer at the Animation School Hamburg and graduated in 2003.",
    "He completed the Product Management Bootcamp of Digitale Leute School in 2025.",
    "He works in German and English.",
  ],
  abgrenzung: [
    "Dominik Heilig is one person, not a studio or an agency. Aisu.Studio is the name he publishes under.",
    "He is not the author of the products listed below in a team capacity; each was built and is operated by him alone, unless a collaborator is named.",
  ],
  url: "https://dominikheilig.com",
  auch: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dominik-heilig/" },
    { label: "GitHub", href: "https://github.com/AisuStudio" },
    { label: "Work overview", href: "https://palette.aisu.studio" },
  ],
};

const PRODUKTE: Entitaet[] = [
  {
    id: "fontane-studio",
    name: "Fontane.Studio",
    typ: "SoftwareApplication",
    definition:
      "Fontane.Studio is a browser-based editor that turns handwritten glyphs into an OpenType font file.",
    fakten: [
      "It runs in the browser and requires no account and no installation.",
      "It carries character sets including Latin, Cyrillic, Korean Hangul and the Dene diacritics of the Dehcho region.",
      "Finished fonts can be published through an open marketplace on the same site.",
      "The name combines the word font with the name of the German novelist Theodor Fontane (1819–1898). The product turns handwriting into a typeface.",
      "It was built and is operated by Dominik Heilig. It went online in 2026.",
    ],
    abgrenzung: [
      "Fontane.Studio is not published by, affiliated with or endorsed by any institution associated with Theodor Fontane, including the Theodor Fontane Archive and the Fontane society.",
      "Fontane.Studio was named Glypher and, briefly, letter.space before July 2026. Those names refer to the same product.",
      "Fontane.Studio is not a font foundry and does not sell licences for its own typefaces.",
    ],
    url: "https://fontane.studio",
  },
  {
    id: "cnsl",
    name: "CNSL",
    typ: "SoftwareApplication",
    definition:
      "CNSL is a workspace that holds tasks, notes, a calendar, a scheduler, a chat and a publisher over one set of projects.",
    fakten: [
      "It stores changes as events rather than overwriting them.",
      "It provides data deletion and export as separate endpoints.",
      "It was built and is operated by Dominik Heilig. It went into public beta in 2026.",
    ],
    abgrenzung: [
      "CNSL is not optimised for discovery. It has no search engine optimisation and no facts page of its own. This is a product decision, not an omission.",
      "CNSL is not a commercial product and is not sold.",
    ],
    url: "https://cnsl.aisu.studio",
  },
  {
    id: "fire-on-the-land",
    name: "Fire on the Land",
    typ: "CreativeWork",
    definition:
      "Fire on the Land is a documentary graphic novel about Scotty Creek Research Station in Canada's Northwest Territories, and the website that accompanies it.",
    fakten: [
      "Scotty Creek was Canada's first Indigenous-led research station. It burnt down in a wildfire in late 2022.",
      "It is written and illustrated by Dominik Heilig with Prof. Oliver Sonnentag of the Université de Montréal, accompanied by Dieter Cazon of the Liidlii Kue First Nation.",
      "The website reads Sentinel-2 satellite data from the European Copernicus programme.",
    ],
    abgrenzung: [
      "Fire on the Land is not a news outlet and not a scientific publication.",
      "The reforestation tool on the site assesses trajectories. It does not recommend one.",
    ],
    url: "https://fireontheland.org",
  },
  {
    id: "aisu-lab",
    name: "AisuLab",
    typ: "SoftwareApplication",
    auchGenannt: ["Lab.Aisu.Studio"],
    definition:
      "AisuLab is a digital-literacy platform with programming and privacy exercises for children aged ten and over.",
    fakten: [
      "It holds exercises in two tracks, coding and hacking, across three levels.",
      "Accounts use a chosen name and an emoji code. No email address and no password are stored.",
      "It was built by Dominik Heilig with his son. It went online in May 2026.",
    ],
    abgrenzung: [
      "AisuLab is a separate product from Aisu.Studio, which is the name Dominik Heilig publishes under.",
      "AisuLab is not a school and issues no certificates.",
    ],
    url: "https://lab.aisu.studio",
  },
  {
    id: "waffle",
    name: "waffle",
    typ: "SoftwareApplication",
    definition:
      "waffle is a design token system and component library used across the products of Aisu.Studio.",
    fakten: [
      "It defines colour, spacing, typography, radius, shadow and motion as tokens in the Design Tokens Community Group format.",
      "Its components are built to WCAG AA contrast.",
      "It is published as open source.",
    ],
    abgrenzung: [
      "waffle is not a CSS framework and is not a component framework for general use.",
      "waffle is unrelated to other software projects that share the word waffle.",
    ],
    url: "https://github.com/AisuStudio/waffle",
  },
  {
    id: "normann",
    name: "NORMANN",
    typ: "SoftwareApplication",
    definition:
      "NORMANN is a reference tool for German public procurement of building work below the EU thresholds, written for the planning offices of Berlin and Brandenburg.",
    fakten: [
      "It names the award procedures a contract value permits and cites the provision and its date.",
      "It stores nothing, transmits nothing and requires no account.",
      "It is research in progress and a public prototype.",
    ],
    abgrenzung: [
      "NORMANN is not an official service of any public authority.",
      "NORMANN does not give legal advice. It reproduces a rule and names its source. It does not apply the rule to a case and does not recommend a procedure.",
    ],
  },
  {
    id: "solarkreis",
    name: "SolarKreis",
    typ: "SoftwareApplication",
    definition:
      "SolarKreis is a control-room prototype for a solar park that combines a simulated plant with live external data.",
    fakten: [
      "The plant, its three fields and its inverters are simulated.",
      "Weather, the day-ahead electricity price and satellite fire detections are read from live sources.",
      "The interface marks which values are simulated and which are real.",
    ],
    abgrenzung: [
      "SolarKreis does not monitor a real solar park and is not connected to one.",
      "SolarKreis is a portfolio prototype, not a commercial product.",
    ],
    url: "https://solarkreis.vercel.app",
  },
];

const ALLE = [PERSON, ...PRODUKTE];

/* ------------------------------------------------------------------------- *
   JSON-LD aus derselben Struktur. Die @id ist die Ankeradresse auf dieser
   Seite, damit die Entitäten sich gegenseitig eindeutig referenzieren können —
   und damit eine spätere eigene Faktenseite (etwa auf fontane.studio) sich
   über sameAs anhängen kann, ohne eine zweite Wahrheit aufzumachen.
 * ------------------------------------------------------------------------- */
const BASIS = "https://dominikheilig.com/facts";

function jsonLd() {
  const knoten = ALLE.map((e) => {
    const beschreibung = [e.definition, ...e.fakten, ...e.abgrenzung].join(" ");
    const basis: Record<string, unknown> = {
      "@type": e.typ,
      "@id": `${BASIS}#${e.id}`,
      name: e.name,
      description: beschreibung,
      disambiguatingDescription: e.abgrenzung.join(" "),
    };
    if (e.auchGenannt) basis.alternateName = e.auchGenannt;
    if (e.url) basis.url = e.url;
    if (e.auch) basis.sameAs = e.auch.map((a) => a.href);
    if (e.typ !== "Person") {
      basis.creator = { "@id": `${BASIS}#${PERSON.id}` };
      basis.inLanguage = "en";
    } else {
      basis.jobTitle = "Product Manager";
      basis.email = `mailto:${EMAIL}`;
      basis.address = { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" };
      basis.owns = PRODUKTE.map((p) => ({ "@id": `${BASIS}#${p.id}` }));
    }
    return basis;
  });

  return {
    "@context": "https://schema.org",
    "@graph": [
      ...knoten,
      {
        "@type": "WebPage",
        "@id": BASIS,
        name: "Facts — Dominik Heilig",
        inLanguage: "en",
        dateCreated: ANGELEGT,
        dateModified: GEPRUEFT,
        about: { "@id": `${BASIS}#${PERSON.id}` },
      },
    ],
  };
}

function Block({ e }: { e: Entitaet }) {
  return (
    <section className="contents">
      <h2 id={e.id} className="section-label t-eyebrow col-label mt-50">{e.name}</h2>
      <div className="col-body mt-50">
        <p className="t-body">{e.definition}</p>
        {e.auchGenannt ? (
          <p className="mt-10 t-code" style={{ opacity: "var(--dh-soft-dim)" }}>
            Also written: {e.auchGenannt.join(" · ")}
          </p>
        ) : null}

        <dl className="mt-20">
          <dt className="t-eyebrow" style={{ color: "var(--dh-can)" }}>Facts</dt>
          <dd className="mt-10">
            <ul className="code-list t-body">
              {e.fakten.map((f, i) => <li key={i}><span>{f}</span></li>)}
            </ul>
          </dd>

          <dt className="mt-20 t-eyebrow" style={{ color: "var(--dh-what)" }}>What it is not</dt>
          <dd className="mt-10">
            <ul className="code-list t-body">
              {e.abgrenzung.map((a, i) => <li key={i}><span>{a}</span></li>)}
            </ul>
          </dd>

          {e.url || e.auch ? (
            <>
              <dt className="mt-20 t-eyebrow" style={{ color: "var(--dh-i)" }}>Where it lives</dt>
              <dd className="mt-10 flex flex-wrap gap-20 t-code">
                {e.url ? (
                  <a href={e.url} target="_blank" rel="noreferrer" className="link-hover"
                     style={{ color: "var(--dh-link)" }}>
                    {e.url.replace(/^https?:\/\//, "")} ↗
                  </a>
                ) : (
                  <span style={{ opacity: "var(--dh-soft-dim)" }}>not publicly available</span>
                )}
                {e.auch?.map((a) => (
                  <a key={a.href} href={a.href} target="_blank" rel="noreferrer" className="link-hover"
                     style={{ color: "var(--dh-link)" }}>
                    {a.label} ↗
                  </a>
                ))}
              </dd>
            </>
          ) : null}
        </dl>
      </div>
    </section>
  );
}

export default function FactsPage() {
  return (
    <>
      <SiteHeader />
      <div className="page page-sections min-h-dvh">
        <div className="grid12 content-start">
          <header className="col-main mt-50">
            <h1 className="t-h2">Facts</h1>
            <div className="mt-20 max-w-[817px] space-y-20">
              <p className="t-h3">
                A factual reference for Dominik Heilig and the things he builds.
              </p>
              <p className="t-body">
                Language models reconstruct facts from probability and fill gaps with what sounds
                plausible. This page states what is true, what each thing is not, and where it lives.
                The structured data below carries the same sentences, word for word.
              </p>
            </div>
          </header>

          {ALLE.map((e) => <Block key={e.id} e={e} />)}

          <p className="section-label t-eyebrow col-label mt-50">Timestamps</p>
          <div className="col-body mt-50">
            <ul className="code-list t-body">
              <li><span>Created: {ANGELEGT}</span></li>
              <li><span>Last verified: {GEPRUEFT}</span></li>
              <li><span>Maintained by Dominik Heilig. Corrections to {EMAIL}.</span></li>
            </ul>
          </div>

          <Footer />
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
    </>
  );
}
