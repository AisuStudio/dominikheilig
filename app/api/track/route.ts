import { createHash } from "crypto";
import { ipAddress, geolocation } from "@vercel/functions";
import { getSupabase } from "@/lib/supabase";
import { rateLimit, clientKey } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

const GRENZE = 60;
const FENSTER_MS = 60 * 1000;

type Koerper = { session?: string } & (
  | { type: "pageview"; page?: string; label?: string | null; referrer?: string | null }
  | { type: "duration"; page?: string; seconds: number }
  | { type: "filter"; label?: string }
  | { type: "outbound"; label?: string }
);

const FLAECHEN = new Set(["home", "about", "project", "privacy"]);
const RICHTUNGEN = new Set(["building", "management", "design"]);
const ZIELE = new Set(["visit", "github", "linkedin", "readmore", "mail"]);

/** Kürzel wie in den Projektdaten: Kleinbuchstaben, Ziffern, Bindestriche. */
function kuerzel(wert: unknown): string | null {
  if (typeof wert !== "string") return null;
  const s = wert.slice(0, 64);
  return /^[a-z0-9][a-z0-9-]*$/.test(s) ? s : null;
}
function ausMenge(wert: unknown, menge: Set<string>): string | null {
  return typeof wert === "string" && menge.has(wert) ? wert : null;
}

/** Grobe Geräteklasse aus dem User-Agent — die volle Zeichenkette bleibt hier. */
function geraet(ua: string): "mobile" | "tablet" | "desktop" {
  const u = ua.toLowerCase();
  if (/ipad/.test(u) || (/android/.test(u) && !/mobile/.test(u))) return "tablet";
  if (/mobi|iphone|android/.test(u)) return "mobile";
  return "desktop";
}

/**
 * Hauptsprache aus dem Accept-Language-Kopf, den der Browser ohnehin
 * mitschickt. Nur die zwei Buchstaben — die Gewichtungsreihenfolge des
 * vollen Kopfes ist ein Wiedererkennungsmerkmal, die zwei Buchstaben nicht.
 */
function sprache(kopf: string | null): string | null {
  const tag = kopf?.split(",")[0]?.trim().slice(0, 2).toLowerCase();
  return tag && /^[a-z]{2}$/.test(tag) ? tag : null;
}

/**
 * Global Privacy Control und das ältere Do Not Track. GPC ist ein
 * maschinenlesbarer Widerspruch nach Art. 21 (1) — auf einer Seite ohne
 * Konto und ohne Einstellungsfläche ist das Beachten im Code die einzige
 * Möglichkeit, dieses Recht überhaupt wirksam werden zu lassen. Beide kommen
 * als Kopfzeile an; nichts wird dafür vom Gerät abgefragt.
 */
function widersprochen(request: Request): boolean {
  return request.headers.get("sec-gpc") === "1" || request.headers.get("dnt") === "1";
}

/** Eigene Adressen aus ANALYTICS_EXCLUDED_IPS — nur im Speicher verglichen. */
const AUSGESCHLOSSEN = new Set(
  (process.env.ANALYTICS_EXCLUDED_IPS ?? "").split(",").map((s) => s.trim()).filter(Boolean)
);

/**
 * Tagesgleicher, nicht umkehrbarer Fingerabdruck aus IP und User-Agent — nur
 * für die Näherung „wie viele Menschen". Er rotiert um Mitternacht UTC, weil
 * das Datum in den Hash eingeht: dieselbe Person an zwei Tagen gilt absichtlich
 * als zwei. Die rohe IP wird für genau diese eine Rechnung gelesen.
 */
function fingerabdruck(ip: string, ua: string): string {
  const heute = new Date().toISOString().slice(0, 10);
  const salz = process.env.ANALYTICS_SALT ?? "dh-analytics";
  return createHash("sha256").update(`${salz}:${heute}:${ip}:${ua}`).digest("hex");
}

/**
 * Nur die echte Produktionsauslieferung schreibt. `next dev` und
 * Vorschau-Auslieferungen fallen hier durch — die IP-Liste unten fängt nur,
 * was für eine bestimmte Adresse gilt, dieser Riegel hängt an der Auslieferung
 * selbst und lässt sich über keinen Netzweg umgehen.
 */
const IST_PRODUKTION = process.env.VERCEL_ENV === "production";

export async function POST(request: Request) {
  // Offen, ohne Anmeldung, und schreibt eine Zeile je Aufruf — der eine
  // Endpunkt, an dem ein gelangweiltes Skript direkt zu Zeilen und Kosten
  // wird. 204 statt 429: das hier ist Telemetrie ohne Rückkanal, ein
  // verworfenes Ereignis ist das richtige Ergebnis.
  if (!rateLimit(`track:${clientKey(request)}`, GRENZE, FENSTER_MS)) {
    return new Response(null, { status: 204 });
  }
  if (!IST_PRODUKTION) return new Response(null, { status: 204 });

  // Vor allem anderen geprüft — ein Widerspruch, der erst nach dem Schreiben
  // wirkt, ist keiner.
  if (widersprochen(request)) return new Response(null, { status: 204 });

  let koerper: Koerper;
  try {
    koerper = await request.json();
  } catch {
    return new Response(null, { status: 204 });
  }

  const ip = ipAddress(request) ?? "unbekannt";
  if (AUSGESCHLOSSEN.has(ip)) return new Response(null, { status: 204 });

  const supabase = getSupabase();
  if (!supabase) return new Response(null, { status: 204 });

  const sitzung = typeof koerper.session === "string" ? koerper.session.slice(0, 64) : null;
  const ua = request.headers.get("user-agent") ?? "unbekannt";

  // Jeder Zweig baut eine Zeile, statt selbst zu schreiben: so gibt es genau
  // ein Insert, dessen Ergebnis geprüft wird. supabase-js wirft bei einem
  // abgelehnten Insert NICHT, es löst mit { error } auf — bei mehreren
  // Inserts und einem leeren catch verschwindet ein Constraint-Fehler
  // spurlos, und man merkt es erst, wenn im Dashboard „keine" steht.
  let zeile: Record<string, unknown> | null = null;

  if (koerper.type === "pageview") {
    zeile = {
      type: "pageview",
      session_id: sitzung,
      visitor_id: fingerabdruck(ip, ua),
      page: ausMenge(koerper.page, FLAECHEN),
      label: kuerzel(koerper.label),
      referrer: typeof koerper.referrer === "string" ? koerper.referrer.slice(0, 100) : null,
      country: geolocation(request).country ?? null,
      device: geraet(ua),
      language: sprache(request.headers.get("accept-language")),
    };
  } else if (koerper.type === "duration" && Number.isFinite(koerper.seconds)) {
    zeile = {
      type: "duration",
      session_id: sitzung,
      page: ausMenge(koerper.page, FLAECHEN),
      seconds: Math.max(0, Math.min(3600, Math.round(koerper.seconds))),
    };
  } else if (koerper.type === "filter") {
    const richtung = ausMenge(koerper.label, RICHTUNGEN);
    if (richtung) zeile = { type: "filter", session_id: sitzung, label: richtung };
  } else if (koerper.type === "outbound") {
    const ziel = ausMenge(koerper.label, ZIELE);
    if (ziel) zeile = { type: "outbound", session_id: sitzung, label: ziel };
  }

  if (!zeile) return new Response(null, { status: 204 });

  const { error } = await supabase.from("dh_events").insert(zeile);
  if (error) console.error("track:", error.message);
  return new Response(null, { status: 204 });
}
