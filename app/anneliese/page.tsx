import { holeZahlen, leseFilter, type Auswertung } from "./data";

export const dynamic = "force-dynamic";
// Steht in keiner Navigation und in keiner Sitemap, und bewusst auch nicht in
// robots.txt: ein Disallow wäre ein Wegweiser. Erreichbar nur über die Adresse.
export const metadata = { robots: { index: false, follow: false } };

/**
 * /anneliese — die Zahlen dieser Seite, nach dem Vorbild von Fontanes
 * /anneliese, aber auf die vier Fragen zugeschnitten, die eine Portfolioseite
 * überhaupt beantworten kann: kommt jemand, woher, liest er ein Projekt, und
 * geht er danach irgendwohin.
 *
 * Drei Zahlen stehen nebeneinander, wo andere Werkzeuge eine zeigen würden:
 * Aufrufe, Sitzungen und Menschen. Sie sind verschieden, und „Besucher" wäre
 * für jede einzelne davon gelogen.
 */
export default async function AnneliesePage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; device?: string }>;
}) {
  const filter = leseFilter(await searchParams, new Date());
  const zahlen = await holeZahlen(filter);
  const gelesen = new Date().toISOString().slice(0, 16).replace("T", " ");

  return (
    <div className="page grid12 min-h-dvh content-start pb-100">
      <header className="col-span-full mt-50 flex flex-wrap items-baseline justify-between gap-20">
        <h1 className="t-h2">anneliese</h1>
        <p className="t-code" style={{ opacity: "var(--dh-soft-dim)" }}>
          {filter.von} – {filter.bis} · {filter.tage} Tage
          {filter.geraet ? ` · ${filter.geraet}` : ""} · gelesen {gelesen} UTC
        </p>
      </header>

      <form className="col-span-full mt-50 flex flex-wrap items-end gap-20 t-code">
        <Feld name="from" label="von" wert={filter.von} />
        <Feld name="to" label="bis" wert={filter.bis} />
        <label className="flex flex-col gap-5">
          <span style={{ opacity: "var(--dh-soft-dim)" }}>Gerät</span>
          <select name="device" defaultValue={filter.geraet ?? ""} className="bg-transparent px-10 py-5 t-code"
            style={{ border: "1px solid #2a2a2a", color: "var(--dh-bright)" }}>
            <option value="">alle</option>
            <option value="desktop">desktop</option>
            <option value="mobile">mobile</option>
            <option value="tablet">tablet</option>
          </select>
        </label>
        <button type="submit" className="btn-outline cursor-pointer px-20 py-10 t-code">zeigen</button>
        <a href="/anneliese" className="link-hover t-code" style={{ opacity: "var(--dh-soft-dim)" }}>zurücksetzen</a>
      </form>

      {!zahlen.ok ? (
        <p className="col-span-full mt-100 t-body">
          {zahlen.grund === "unkonfiguriert"
            ? "Keine Datenbank hinterlegt — SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY fehlen. Bis dahin wird auch nichts gemessen."
            : `Die Abfrage ist fehlgeschlagen: ${zahlen.meldung}`}
        </p>
      ) : (
        <Inhalt zahlen={zahlen} />
      )}
    </div>
  );
}

function Feld({ name, label, wert }: { name: string; label: string; wert: string }) {
  return (
    <label className="flex flex-col gap-5">
      <span style={{ opacity: "var(--dh-soft-dim)" }}>{label}</span>
      <input type="date" name={name} defaultValue={wert} className="bg-transparent px-10 py-5 t-code"
        style={{ border: "1px solid #2a2a2a", color: "var(--dh-bright)" }} />
    </label>
  );
}

function Inhalt({ zahlen }: { zahlen: Extract<Auswertung, { ok: true }> }) {
  const z = zahlen;
  return (
    <>
      {z.angeschnitten && (
        <p className="col-span-full mt-50 t-code" style={{ color: "var(--dh-what)" }}>
          Obergrenze erreicht — es gibt mehr Zeilen als abgefragt. Zeitraum verkleinern.
        </p>
      )}

      <div className="col-span-full mt-100 grid gap-50 sm:grid-cols-2 lg:grid-cols-4">
        <Kachel zahl={z.besuche} was="Aufrufe" hinweis="einzelne Seitenaufrufe" />
        <Kachel zahl={z.sitzungen} was="Sitzungen" hinweis="ein Besuch, bis der Tab neu lädt" />
        <Kachel zahl={z.menschen} was="Menschen" hinweis="Tagesfingerabdruck, an zwei Tagen zweimal" />
        <Kachel
          zahl={z.medianBesuch === null ? "—" : `${z.medianBesuch} s`}
          was="Median Verweildauer"
          hinweis="sichtbare Zeit je Fläche"
        />
      </div>

      <div className="col-span-full mt-100">
        <Balken titel="Aufrufe je Tag" werte={z.proTag.map((t) => [t.tag, t.anzahl] as [string, number])} />
      </div>

      <div className="col-span-full mt-100 grid gap-100 lg:grid-cols-2">
        <Liste titel="Welche Flächen" werte={z.seiten} leer="noch keine" />
        <Liste titel="Welche Projekte" werte={z.projekte} leer="noch keins geöffnet" />
        <Liste titel="Woher" werte={z.verweise} leer="alles direkt" fuss="direkte Aufrufe stehen hier nicht — sie haben keinen Verweis" />
        <Liste titel="Weiter nach draußen" werte={z.hinaus} leer="noch niemand" />
        <Liste titel="Welcher Filter" werte={z.filter} leer="niemand hat gefiltert" />
        <Liste titel="Geräte" werte={z.geraete} leer="—" />
        <Liste titel="Länder" werte={z.laender} leer="—" />
        <Liste titel="Sprachen" werte={z.sprachen} leer="—" />
      </div>

      <p className="col-span-full mt-100 t-code" style={{ opacity: "var(--dh-soft-dim)" }}>
        {Math.round(z.projektquote * 100)} % der Sitzungen haben ein Projekt geöffnet.
      </p>
    </>
  );
}

function Kachel({ zahl, was, hinweis }: { zahl: number | string; was: string; hinweis: string }) {
  return (
    <div>
      <p className="t-h2">{zahl}</p>
      <p className="mt-10 t-eyebrow">{was}</p>
      <p className="mt-5 t-code" style={{ opacity: "var(--dh-soft-dim)" }}>{hinweis}</p>
    </div>
  );
}

function Liste({ titel, werte, leer, fuss }: { titel: string; werte: [string, number][]; leer: string; fuss?: string }) {
  const groesste = werte[0]?.[1] ?? 1;
  return (
    <section>
      <h2 className="t-h3">{titel}</h2>
      {werte.length === 0 ? (
        <p className="mt-15 t-code" style={{ opacity: "var(--dh-soft-dim)" }}>{leer}</p>
      ) : (
        <ul className="mt-15">
          {werte.slice(0, 12).map(([name, anzahl]) => (
            <li key={name} className="mt-5">
              <span className="flex items-baseline justify-between gap-20 t-code">
                <span>{name}</span>
                <span>{anzahl}</span>
              </span>
              {/* Der Balken misst gegen den größten Wert der Liste, nicht gegen
                  die Summe — bei drei Zeilen sagt der Anteil an der Summe nichts. */}
              <span className="mt-5 block h-[3px]" style={{ width: `${(anzahl / groesste) * 100}%`, background: "var(--dh-bright)", opacity: 0.35 }} />
            </li>
          ))}
        </ul>
      )}
      {fuss && <p className="mt-15 t-code" style={{ opacity: "var(--dh-soft-dim)" }}>{fuss}</p>}
    </section>
  );
}

function Balken({ titel, werte }: { titel: string; werte: [string, number][] }) {
  const groesste = Math.max(1, ...werte.map(([, n]) => n));
  return (
    <section>
      <h2 className="t-h3">{titel}</h2>
      {werte.length === 0 ? (
        <p className="mt-15 t-code" style={{ opacity: "var(--dh-soft-dim)" }}>noch nichts</p>
      ) : (
        <div className="mt-15 flex items-end gap-5" style={{ height: 120 }}>
          {werte.map(([tag, anzahl]) => (
            <span key={tag} title={`${tag}: ${anzahl}`} className="flex-1"
              style={{ height: `${(anzahl / groesste) * 100}%`, minHeight: 2, background: "var(--dh-bright)", opacity: 0.5 }} />
          ))}
        </div>
      )}
    </section>
  );
}
