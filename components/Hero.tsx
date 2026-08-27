import { DOORS } from "@/lib/content";

/**
 * Der Satz. Drei Wörter tragen die drei Farben und ihren Kasten.
 *
 * Bis 2026-08-27 waren es Türen: ein <a> je Wort, beim Berühren nahm es seine
 * Farbe an, der Kasten die 20-Prozent-Fassung, und eine Info Note klappte
 * darunter auf. Das ist raus — auf dem Telefon gibt es kein Berühren ohne
 * Klick, die Notiz war dort ein Kasten am unteren Rand, und die Eyebrows, die
 * sagten wohin ein Wort führt, sind im neuen Entwurf nicht mehr da. Ein
 * großes farbiges Wort, das ohne Beschriftung irgendwohin springt, ist
 * schlechter als eines, das nichts verspricht.
 *
 * Deshalb kein Zustand, kein Client-Bauteil, kein JavaScript: die Wörter
 * stehen da und sind die Farbschlüssel für die Rollen weiter unten.
 */
export default function Hero() {
  return (
    <div className="relative select-none text-center">
      <h1 className="t-title">
        <span className="block">
          {DOORS.map((d, i) => (
            <span
              key={d.id}
              className="hero-word inline-block"
              style={{
                color: d.color,
                backgroundColor: d.tint10,
                marginRight: i < DOORS.length - 1 ? "0.28em" : 0,
              }}
            >
              {d.word}
            </span>
          ))}
        </span>
        <span className="block">get out of </span>
        <span className="block">your way?</span>
      </h1>
    </div>
  );
}
