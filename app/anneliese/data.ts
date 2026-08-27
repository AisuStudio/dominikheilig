import { getSupabase } from "@/lib/supabase";

/**
 * Die Zahlen für /anneliese.
 *
 * Bewusst eine Abfrage und danach Rechnen in JavaScript, statt acht
 * Aggregat-Abfragen: bei den Mengen, um die es hier geht, ist der Unterschied
 * nicht messbar, und der Code sagt so direkt, wie jede Zahl entsteht. Die
 * Obergrenze ist eine Reißleine, keine Seitenblätterung — wenn sie greift,
 * steht das im Ergebnis, statt still falsche Zahlen zu zeigen.
 */
const OBERGRENZE = 20000;

export type Filter = { von: string; bis: string; geraet: string | null; tage: number };

export type Ereignis = {
  type: string;
  session_id: string | null;
  visitor_id: string | null;
  page: string | null;
  label: string | null;
  seconds: number | null;
  referrer: string | null;
  country: string | null;
  device: string | null;
  language: string | null;
  created_at: string;
};

export type Auswertung =
  | { ok: false; grund: "unkonfiguriert" | "fehler"; meldung?: string }
  | {
      ok: true;
      angeschnitten: boolean;
      besuche: number;
      menschen: number;
      sitzungen: number;
      medianBesuch: number | null;
      projektquote: number;
      proTag: { tag: string; anzahl: number }[];
      seiten: [string, number][];
      projekte: [string, number][];
      verweise: [string, number][];
      filter: [string, number][];
      hinaus: [string, number][];
      geraete: [string, number][];
      laender: [string, number][];
      sprachen: [string, number][];
    };

function zaehle(werte: (string | null)[]): [string, number][] {
  const karte = new Map<string, number>();
  for (const w of werte) if (w) karte.set(w, (karte.get(w) ?? 0) + 1);
  return [...karte.entries()].sort((a, b) => b[1] - a[1]);
}

function median(werte: number[]): number | null {
  if (!werte.length) return null;
  const s = [...werte].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m]! : Math.round((s[m - 1]! + s[m]!) / 2);
}

export async function holeZahlen(f: Filter): Promise<Auswertung> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, grund: "unkonfiguriert" };

  let abfrage = supabase
    .from("dh_events")
    .select("type,session_id,visitor_id,page,label,seconds,referrer,country,device,language,created_at")
    .gte("created_at", `${f.von}T00:00:00Z`)
    .lte("created_at", `${f.bis}T23:59:59Z`)
    .order("created_at", { ascending: true })
    .limit(OBERGRENZE);
  if (f.geraet) abfrage = abfrage.eq("device", f.geraet);

  const { data, error } = await abfrage;
  if (error) return { ok: false, grund: "fehler", meldung: error.message };

  const zeilen = (data ?? []) as Ereignis[];
  const aufrufe = zeilen.filter((z) => z.type === "pageview");
  const dauern = zeilen.filter((z) => z.type === "duration" && typeof z.seconds === "number");

  // „Besuch" ist ein Seitenaufruf, „Sitzung" ein Seitenaufruf-Bündel mit
  // derselben Kennung, „Mensch" ein Tagesfingerabdruck. Drei Zahlen, drei
  // Bedeutungen — sie absichtlich nebeneinander zu zeigen ist ehrlicher,
  // als eine davon „Besucher" zu nennen.
  const sitzungen = new Set(aufrufe.map((z) => z.session_id).filter(Boolean)).size;
  const menschen = new Set(aufrufe.map((z) => z.visitor_id).filter(Boolean)).size;

  const projektSitzungen = new Set(
    aufrufe.filter((z) => z.page === "project").map((z) => z.session_id).filter(Boolean)
  ).size;

  const proTagKarte = new Map<string, number>();
  for (const z of aufrufe) {
    const tag = z.created_at.slice(0, 10);
    proTagKarte.set(tag, (proTagKarte.get(tag) ?? 0) + 1);
  }
  const proTag = [...proTagKarte.entries()].sort().map(([tag, anzahl]) => ({ tag, anzahl }));

  return {
    ok: true,
    angeschnitten: zeilen.length >= OBERGRENZE,
    besuche: aufrufe.length,
    menschen,
    sitzungen,
    medianBesuch: median(dauern.map((z) => z.seconds!)),
    projektquote: sitzungen ? projektSitzungen / sitzungen : 0,
    proTag,
    seiten: zaehle(aufrufe.map((z) => z.page)),
    projekte: zaehle(aufrufe.filter((z) => z.page === "project").map((z) => z.label)),
    verweise: zaehle(aufrufe.map((z) => z.referrer)),
    filter: zaehle(zeilen.filter((z) => z.type === "filter").map((z) => z.label)),
    hinaus: zaehle(zeilen.filter((z) => z.type === "outbound").map((z) => z.label)),
    geraete: zaehle(aufrufe.map((z) => z.device)),
    laender: zaehle(aufrufe.map((z) => z.country)),
    sprachen: zaehle(aufrufe.map((z) => z.language)),
  };
}

/** Zeitraum aus der Adresse, mit 30 Tagen als Voreinstellung. */
export function leseFilter(p: { from?: string; to?: string; device?: string }, heute: Date): Filter {
  const tagText = (d: Date) => d.toISOString().slice(0, 10);
  const gueltig = (s?: string) => (s && /^\d{4}-\d{2}-\d{2}$/.test(s) ? s : null);
  const bis = gueltig(p.to) ?? tagText(heute);
  const vorgabe = new Date(heute);
  vorgabe.setUTCDate(vorgabe.getUTCDate() - 29);
  const von = gueltig(p.from) ?? tagText(vorgabe);
  const geraet = ["mobile", "tablet", "desktop"].includes(p.device ?? "") ? p.device! : null;
  const tage = Math.max(1, Math.round((Date.parse(bis) - Date.parse(von)) / 86400000) + 1);
  return { von, bis, geraet, tage };
}
