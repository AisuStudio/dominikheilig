"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { trackDuration, trackFilter, trackOutbound, trackPageview, type Flaeche } from "@/lib/analytics";

/**
 * Meldet Seitenaufrufe, sichtbare Zeit und Klicks nach draußen.
 *
 * Liegt einmal im Wurzel-Layout statt in jeder Seite: Next wechselt die
 * Fläche ohne Neuladen, ein Zähler pro Seite würde beim Wechsel gar nicht
 * erst neu laufen.
 *
 * Die Klicks nach draußen laufen über einen einzigen Zuhörer am Dokument,
 * nicht über Handler an jedem Link. Das hält Footer, Umschalterleiste und
 * „Reach out" serverseitig, statt sie nur fürs Zählen in Client-Bauteile zu
 * verwandeln — und es fängt jeden künftigen Link von selbst mit.
 */
function flaeche(pfad: string): { page: Flaeche; label?: string } {
  if (pfad === "/") return { page: "home" };
  if (pfad === "/profile") return { page: "about" };
  if (pfad === "/privacy") return { page: "privacy" };
  const treffer = /^\/work\/([a-z0-9][a-z0-9-]*)$/.exec(pfad);
  if (treffer) return { page: "project", label: treffer[1] };
  return { page: "home" };
}

function ziel(url: URL): string | null {
  if (url.protocol === "mailto:") return "mail";
  const host = url.hostname.replace(/^www\./, "");
  if (host.endsWith("github.com")) return "github";
  if (host.endsWith("linkedin.com")) return "linkedin";
  if (host === window.location.hostname) return null;
  return "visit";
}

export default function Analytics() {
  const pfad = usePathname();
  // Sichtbare Zeit, nicht verstrichene: ein Tab im Hintergrund zählt nicht mit.
  const seit = useRef<number>(0);
  const gesammelt = useRef<number>(0);

  useEffect(() => {
    const { page, label } = flaeche(pfad);
    trackPageview(page, label);

    seit.current = document.visibilityState === "visible" ? Date.now() : 0;
    gesammelt.current = 0;

    const anhalten = () => {
      if (seit.current) { gesammelt.current += (Date.now() - seit.current) / 1000; seit.current = 0; }
    };
    const weiter = () => { if (!seit.current) seit.current = Date.now(); };
    const sichtbarkeit = () => (document.visibilityState === "visible" ? weiter() : anhalten());
    // pagehide statt unload: unload verhindert den Zurück-Vorwärts-Speicher
    // des Browsers und feuert auf iOS ohnehin nicht zuverlässig.
    const verlassen = () => { anhalten(); trackDuration(page, gesammelt.current); gesammelt.current = 0; };

    document.addEventListener("visibilitychange", sichtbarkeit);
    window.addEventListener("pagehide", verlassen);
    return () => {
      document.removeEventListener("visibilitychange", sichtbarkeit);
      window.removeEventListener("pagehide", verlassen);
      verlassen();   // Flächenwechsel innerhalb der Seite zählt auch als Verlassen
    };
  }, [pfad]);

  useEffect(() => {
    const klick = (e: MouseEvent) => {
      const ziel0 = e.target as HTMLElement | null;

      // Branchenfilter: der Knopf trägt seine Beschriftung, mehr braucht es
      // nicht. Steht hier statt in ProjectList, damit die Liste nichts von der
      // Messung weiß und ohne sie ausgeliefert werden kann.
      const knopf = ziel0?.closest?.("[aria-pressed]") as HTMLElement | null;
      if (knopf && knopf.getAttribute("aria-pressed") === "false") {
        const wort = knopf.textContent?.trim();
        if (wort && wort !== "All") trackFilter(wort);
        return;
      }

      const a = ziel0?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      try {
        const wohin = ziel(new URL(a.href, window.location.href));
        if (wohin) trackOutbound(wohin);
      } catch {
        /* Eine Adresse, die sich nicht lesen lässt, ist kein Ereignis. */
      }
    };
    document.addEventListener("click", klick, { capture: true });
    return () => document.removeEventListener("click", klick, { capture: true });
  }, []);

  return null;
}
