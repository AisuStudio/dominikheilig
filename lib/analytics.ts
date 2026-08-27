/**
 * Messung ohne Einwilligung — und zwar zu Recht, nicht aus Bequemlichkeit.
 *
 * Auf dem Gerät des Besuchers wird nichts abgelegt und nichts gelesen: kein
 * Cookie, kein localStorage, keine Abfrage über eine Geräte-Schnittstelle.
 * Damit greift die Einwilligungspflicht aus ePrivacy Art. 5 (3) gar nicht
 * erst, weil sie am Speichern und Auslesen hängt, nicht am Zählen.
 *
 * „Wie viele Menschen" wird deshalb serverseitig genähert, aus einem täglich
 * rotierenden Hash von IP und User-Agent, der selbst nie gespeichert wird
 * (siehe app/api/track/route.ts). Wer an zwei Tagen kommt, zählt zweimal —
 * eine bewusst ungenaue Zahl im Tausch dafür, niemanden zu verfolgen.
 *
 * Jeder Versand ist ein sendBeacon ohne Rückkanal, jeder Fehler wird
 * geschluckt: die Messung darf niemals in die Seite hineinwerfen.
 */

// Ausdrückliches Nein: dominikheilig.com/?notrack — für diesen Seitenaufruf
// geht nichts raus. Ergänzt die IP-Liste in der Route (automatisch, aber an
// eine Adresse gebunden, die sich ändert); das hier wirkt von überall.
let abgemeldet = false;

// Die Modulvariable stirbt mit dem JS-Kontext, ein Neuladen würde die
// Abmeldung also verlieren. sessionStorage trägt sie durch den Tab.
//
// Es ist das Einzige, was diese Datei je auf ein Gerät schreibt, und die
// Richtung ist der Punkt: gespeichert wird die VERWEIGERUNG der Messung,
// nie eine Messung. Das ist der „unbedingt erforderlich"-Zweig von
// Art. 5 (3) — dieselbe Grundlage, auf der ein Ablehnungsvermerk steht.
// sessionStorage und nicht localStorage, weil eine Abmeldung, die den Tab
// überlebt, eine dauerhafte Kennung unter anderem Namen wäre.
const ABMELDE_SCHLUESSEL = "dh.notrack.v1";

function pruefeAbmeldung() {
  if (typeof window === "undefined") return;
  try {
    if (new URLSearchParams(window.location.search).has("notrack")) {
      abgemeldet = true;
      sessionStorage.setItem(ABMELDE_SCHLUESSEL, "1");
      return;
    }
    if (sessionStorage.getItem(ABMELDE_SCHLUESSEL) === "1") abgemeldet = true;
  } catch {
    /* Privater Modus kann sessionStorage sperren — dann gilt nur die URL. */
  }
}

let geprueft = false;

function sende(nutzlast: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (!geprueft) { pruefeAbmeldung(); geprueft = true; }
  if (abgemeldet) return;

  try {
    const koerper = JSON.stringify({ ...nutzlast, session: sitzung() });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/track", new Blob([koerper], { type: "application/json" }));
      return;
    }
    void fetch("/api/track", { method: "POST", body: koerper, keepalive: true,
      headers: { "content-type": "application/json" } }).catch(() => {});
  } catch {
    /* Messung darf nie werfen. */
  }
}

// Zufällige Kennung je Seitenaufruf, nur hier im Speicher. Sie verbindet die
// Ereignisse eines Besuchs und sonst nichts — zwei Tabs, zwei Tage oder zwei
// Besuche kann sie bauartbedingt nicht zusammenführen.
let sitzungsId: string | null = null;
function sitzung(): string {
  if (!sitzungsId) sitzungsId = Math.random().toString(36).slice(2) + Date.now().toString(36);
  return sitzungsId;
}

/** Verweisender Hostname, nie die volle Adresse; eigene Sprünge fallen weg. */
function verweis(): string | null {
  try {
    if (!document.referrer) return null;
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? null : host;
  } catch {
    return null;
  }
}

export type Flaeche = "home" | "about" | "project" | "privacy";

export function trackPageview(page: Flaeche, label?: string) {
  sende({ type: "pageview", page, label: label ?? null, referrer: verweis() });
}

/** Sichtbare Sekunden auf einer Fläche, beim Verlassen geschickt. */
export function trackDuration(page: Flaeche, seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 1) return;
  sende({ type: "duration", page, seconds: Math.round(seconds) });
}

/** Welche Richtung gefiltert wurde — building | management | design. */
export function trackFilter(richtung: string) {
  sende({ type: "filter", label: richtung });
}

/** Ein Klick nach draußen: visit | github | linkedin. */
export function trackOutbound(ziel: string) {
  sende({ type: "outbound", label: ziel });
}
