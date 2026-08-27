import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { EMAIL } from "@/lib/content";

export const metadata = {
  title: "Imprint & Privacy — Dominik Heilig",
  description: "Who runs this site, what it measures, what it does not, and why there is no cookie banner.",
};

/**
 * Impressum und Datenschutz auf einer Seite, wie in Fontanes /legal — die
 * Anschrift ist von dort wörtlich übernommen. Aufbau wie die Projektseiten:
 * Marke links, Text im Textfeld — dieselben Klassen, damit sie nicht wie ein
 * Fremdkörper wirkt.
 *
 * Jeder Satz hier beschreibt, was der Code tatsächlich tut. Wenn sich
 * lib/analytics.ts oder app/api/track/route.ts ändern, ändert sich diese
 * Seite mit — sonst ist sie eine Behauptung, keine Auskunft.
 */

const ANSCHRIFT = ["Aisu.Studio", "Dominik Heilig", "c/o Working", "Manteuffelstraße 58", "10999 Berlin"];

const ABSCHNITTE: { label: string; body: string[] }[] = [
  {
    label: "The short version",
    body: [
      "No cookies. No accounts. No advertising. No third-party trackers, no analytics service, no embedded fonts or scripts loaded from anyone else.",
      "The site counts how often its pages are opened, and that count is stored in a database I run myself. Nothing is written to your device and nothing is read from it, which is why you are not being asked to agree to anything.",
    ],
  },
  {
    label: "What is measured",
    body: [
      "Which page was opened, and for a project page which project it was. How long a page stayed visible, in whole seconds. Which of the three filters on the home page was used. Whether a link leaving this site was followed, and to which of a handful of known destinations.",
      "Each of those carries: the referring hostname (“google.com”, never the full address you came from), a two-letter country code, a two-letter language code, and one of three device classes — mobile, tablet or desktop.",
    ],
  },
  {
    label: "What is not measured",
    body: [
      "Your IP address is never stored. It is read once, on the server, to compute a one-way hash together with your browser’s user-agent string and the current date, and is then discarded. That hash is the only thing that approximates “how many people”, it cannot be turned back into an address, and it changes at midnight UTC — so the same person on two days is deliberately counted as two.",
      "The user-agent string itself is not stored either, only the device class derived from it. No mouse movements, no scroll depth, no clicks inside the page, no form input — there are no forms. Nothing about you is combined with anything from anywhere else.",
    ],
  },
  {
    label: "Why there is no cookie banner",
    body: [
      "The consent requirement in § 25 TDDDG, which implements Article 5(3) of the ePrivacy Directive, attaches to storing information on your device or reading information already stored there. This site does neither, so the requirement does not arise.",
      "The one exception runs the other way: if you opt out (below), that refusal is kept in your browser’s session storage for the rest of the tab. It stores the refusal to be counted, never a measurement — the “strictly necessary” limb of the same provision.",
      "The counting itself rests on legitimate interest, Article 6(1)(f) GDPR: knowing whether anyone reads this, without learning anything about who does.",
    ],
  },
  {
    label: "How to stop it",
    body: [
      "If your browser sends Global Privacy Control or Do Not Track, the server drops the request before anything is derived or written. Both are settings in your browser and need nothing from this site.",
      "You can also add ?notrack to any address here — dominikheilig.com/?notrack — and nothing is sent for the rest of that tab.",
    ],
  },
  {
    label: "Who else sees it",
    body: [
      "The site is hosted by Vercel Inc., which necessarily processes the requests it serves. The events are stored with Supabase, in an EU region. Both act as processors under a data processing agreement; nobody else receives anything.",
      "Rows are deleted after 400 days.",
    ],
  },
  {
    label: "Your rights and who to ask",
    body: [
      "You have the rights to information, correction, erasure, restriction, portability and objection under Articles 15 to 21 GDPR, and the right to complain to a supervisory authority.",
      "In practice there is very little to exercise them against: with no identifier that survives a day, an event cannot be traced back to you, and I could not find your rows even if you asked. If you want to object in advance, the two ways above do it. For anything else, write to me.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader crumb="Imprint &amp; Privacy" />
      <div className="page page-sections grid12 min-h-dvh content-start">
        <h1 className="col-span-full t-h2 mt-100">Imprint &amp; Privacy</h1>
        <p className="col-span-full mt-20 max-w-[817px] t-h3">
          Who runs this site, what it measures, what it does not, and why there is no cookie banner.
        </p>

        {/* Die ladungsfähige Anschrift nach § 5 DDG — wörtlich wie in Fontanes
            /legal, damit beide Seiten dieselbe Angabe machen. */}
        <p className="section-label t-eyebrow col-label mt-100">Imprint</p>
        <div className="col-body mt-100">
          <p className="t-body">
            {ANSCHRIFT.map((z) => (
              <span key={z} className="block">{z}</span>
            ))}
          </p>
          <p className="mt-10 t-body">
            <a href={`mailto:${EMAIL}`} className="link-hover underline">{EMAIL}</a>
          </p>
        </div>

        {ABSCHNITTE.map((a) => (
          <Abschnitt key={a.label} {...a} />
        ))}

        <div className="col-body mt-100">
          <p className="t-body" style={{ opacity: "var(--dh-soft-dim)" }}>
            Last updated 27 August 2026.
          </p>
        </div>

        <Footer />
      </div>
    </>
  );
}

function Abschnitt({ label, body }: { label: string; body: string[] }) {
  return (
    <>
      <p className="section-label t-eyebrow col-label mt-100">{label}</p>
      <div className="col-body mt-100 space-y-10">
        {body.map((absatz, i) => (
          <p key={i} className="t-body">{absatz}</p>
        ))}
      </div>
    </>
  );
}
