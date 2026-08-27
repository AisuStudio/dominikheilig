/**
 * Kleines Zeitfenster-Limit für den einen Endpunkt, den jeder ohne Anmeldung
 * aufrufen kann.
 *
 * Bewusst im Arbeitsspeicher. Vercel hält mehrere Instanzen, jede mit ihrer
 * eigenen Karte, und eine untätige wird abgeräumt — die tatsächliche Grenze
 * ist also eher `Grenze × Instanzen`, und eine verteilte Flut läuft hindurch.
 * Was es abfängt, ist der gewöhnliche Fall: ein Skript, eine Adresse, das auf
 * einen offenen Endpunkt eindrischt. Das ist der Unterschied zwischen einer
 * überraschenden Supabase-Rechnung und einem Achselzucken.
 */
type Fenster = { anzahl: number; endetUm: number };

const fenster = new Map<string, Fenster>();
const MAX_SCHLUESSEL = 10_000;

function kehren(jetzt: number) {
  for (const [k, f] of fenster) if (f.endetUm <= jetzt) fenster.delete(k);
}

export function rateLimit(schluessel: string, grenze: number, fensterMs: number): boolean {
  const jetzt = Date.now();
  const da = fenster.get(schluessel);

  if (!da || da.endetUm <= jetzt) {
    if (fenster.size >= MAX_SCHLUESSEL) kehren(jetzt);
    fenster.set(schluessel, { anzahl: 1, endetUm: jetzt + fensterMs });
    return true;
  }
  if (da.anzahl >= grenze) return false;
  da.anzahl += 1;
  return true;
}

/**
 * Nur zum Zählen. Nie, um zu entscheiden, WER jemand ist: der Kopf ist vom
 * Aufrufer gesetzt und trivial zu fälschen. Wer fälscht, kostet sich selbst
 * seinen Eimer — für eine Bremsschwelle ist das in Ordnung.
 */
export function clientKey(request: Request): string {
  const weiter = request.headers.get("x-forwarded-for");
  if (weiter) return weiter.split(",")[0]!.trim();
  return request.headers.get("x-real-ip")?.trim() || "unbekannt";
}
