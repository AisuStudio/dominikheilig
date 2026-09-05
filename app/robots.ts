import type { MetadataRoute } from "next";

/**
 * Ausdrücklich alles offen, inklusive der KI-Crawler: Diese Seite will
 * gefunden und zitiert werden, /facts existiert genau dafür.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://dominikheilig.com/sitemap.xml",
    host: "https://dominikheilig.com",
  };
}
