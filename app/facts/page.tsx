import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { EMAIL } from "@/lib/content";
import { ALLE, ANGELEGT, BASIS, GEPRUEFT, PERSON, PRODUKTE, type Entitaet } from "@/lib/facts";

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
 * Der sichtbare Text und das JSON-LD entstehen aus DERSELBEN Datenstruktur,
 * lib/facts.ts — genau wie /llms.txt. Sie können deshalb nicht auseinanderlaufen;
 * das ist die Kernanforderung des Formats. Die Schreibregeln stehen dort.
 */

/* ------------------------------------------------------------------------- *
   JSON-LD aus derselben Struktur. Die @id ist die Ankeradresse auf dieser
   Seite, damit die Entitäten sich gegenseitig eindeutig referenzieren können —
   und damit eine spätere eigene Faktenseite (etwa auf fontane.studio) sich
   über sameAs anhängen kann, ohne eine zweite Wahrheit aufzumachen.
 * ------------------------------------------------------------------------- */

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
