import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/content";

/**
 * Die Seite hatte bisher keine Sitemap. Für eine Portfolioseite, die gefunden
 * werden soll, ist das eine Lücke: Crawler finden nur, worauf jemand verlinkt.
 *
 * Für /facts ist sie die Voraussetzung dafür, den Fußzeilen-Link weglassen zu
 * können — die Seite muss maschinell auffindbar bleiben, ohne dass ein Mensch
 * sie im Menü sieht.
 */

const BASIS = "https://dominikheilig.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const stand = new Date();

  const seiten: MetadataRoute.Sitemap = [
    { url: BASIS, changeFrequency: "monthly", priority: 1 },
    { url: `${BASIS}/profile`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASIS}/cv`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASIS}/facts`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASIS}/privacy`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const projekte: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${BASIS}/work/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...seiten, ...projekte].map((e) => ({ ...e, lastModified: stand }));
}
