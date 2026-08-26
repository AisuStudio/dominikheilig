import Link from "next/link";
import CrumbMenu from "./CrumbMenu";

/**
 * Kopfzeile — 72 px hoch, wie Frame 19 in Figma. Auf allen Seiten sticky.
 *
 * Der dunkle Balken ist vorerst abgeschaltet. Zum Reaktivieren:
 *   className um `backdrop-blur-[2px]` ergänzen und
 *   style={{ background: "color-mix(in srgb, var(--dh-dark) 88%, transparent)" }} setzen.
 *
 * „About" folgt DH/Standart Text Button: Ruhe DH/Bright, Berührung DH/LINK.
 *
 * Mit `crumbSlug` wird der Projektname zur Klappe auf die übrigen Projekte.
 */
export default function SiteHeader({ crumb, crumbSlug }: { crumb?: string; crumbSlug?: string } = {}) {
  return (
    <header className="sticky top-0 z-30 h-[72px]">
      <div className="page flex h-full items-center justify-between">
        <span className="flex">
          <Link href="/" className="t-h3 link-hover" style={crumb ? { opacity: "var(--dh-soft-dim)" } : undefined}>
            Dominik Heilig
          </Link>
          {crumb && crumbSlug ? (
            <CrumbMenu titel={crumb} slug={crumbSlug} />
          ) : crumb ? (
            <span className="t-h3">&thinsp;/{crumb}</span>
          ) : null}
        </span>
        <Link
          href="/profile"
          className="t-h3 link-hover"
        >
          About
        </Link>
      </div>
    </header>
  );
}
