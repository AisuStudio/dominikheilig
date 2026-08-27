import Link from "next/link";

/**
 * Footer nach Figma (Group 9 / 36:1089): 1240 × 53,46 px — als Mindesthöhe, nicht
 * als feste: auf dem Telefon bricht die Zeile um und lief sonst aus dem Kasten.
 * Linie oben über die volle Inhaltsbreite, Text DH/P2 in DH/Bright —
 * bewusst ohne abgesenkte Deckkraft, so steht es im Entwurf.
 */
export default function Footer() {
  return (
    <footer
      className="col-span-full mt-100 mb-50 min-h-[53.46px]">
      <div className="rule" style={{ opacity: 1, background: "#2a2a2a" }} />
      <div className="flex flex-wrap items-start justify-between gap-15 pt-15 t-p2">
        <span>dominikheilig.com ©2026</span>
        <span className="flex flex-wrap gap-20">
          <Link href="/privacy" className="link-hover">
            Privacy
          </Link>
          <a href="https://www.linkedin.com/in/dominik-heilig/" target="_blank" rel="noreferrer" className="link-hover">
            LinkedIn ↗
          </a>
          <a href="https://github.com/AisuStudio" target="_blank" rel="noreferrer" className="link-hover">
            GitHub ↗
          </a>
        </span>
      </div>
    </footer>
  );
}
