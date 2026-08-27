import Link from "next/link";
import CrumbMenu from "./CrumbMenu";

/**
 * Kopfzeile — 72 px hoch, auf allen Seiten klebend.
 *
 * Zwei Fassungen, nach `DH/Mob/Header Nav` (199:1224):
 *
 *   Desktop   Dominik Heilig /Fontane.Studio ⌄            About
 *   Telefon   ‹ /Fontane.Studio ⌄                         About
 *
 * Auf dem Telefon tritt ein Zurück-Winkel an die Stelle des Namens. Vorher
 * standen Name, Projektname, Klappenwinkel und „About" nebeneinander in 22 px
 * — das passte bei 375 px nicht in eine Zeile, der Name brach um und „About"
 * klebte am Winkel. Der Name ist die längste und entbehrlichste Angabe dort,
 * und der Winkel führt auf dieselbe Adresse, die er hatte.
 *
 * Die Klappe auf die übrigen Projekte bleibt auf beiden Größen; auf dem
 * Telefon öffnet sie als Fläche über die volle Breite (siehe `.crumb-menu`).
 */
export default function SiteHeader({ crumb, crumbSlug }: { crumb?: string; crumbSlug?: string } = {}) {
  return (
    <header className={`site-header sticky top-0 z-30 h-[72px]${crumb ? " has-crumb" : ""}`}>
      <div className="page flex h-full items-center justify-between">
        <span className="flex items-center">
          {crumb ? (
            <Link href="/" className="header-back link-hover" aria-label="Zurück zur Übersicht">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.125 17.5759L12.462 16.9129L6.43301 10.8839C5.94486 10.3958 5.94486 9.60429 6.43301 9.11614L12.462 3.08711L13.125 2.42419L14.4508 3.75002L13.7878 4.41293L8.20077 10L13.7878 15.5872L14.4508 16.25L13.125 17.5759Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          ) : null}

          <Link
            href="/"
            className="header-name t-h3 link-hover"
            style={crumb ? { opacity: "var(--dh-soft-dim)" } : undefined}
          >
            Dominik Heilig
          </Link>

          {crumb && crumbSlug ? (
            <CrumbMenu titel={crumb} slug={crumbSlug} />
          ) : crumb ? (
            <span className="t-h3">&thinsp;/{crumb}</span>
          ) : null}
        </span>

        <Link href="/profile" className="t-h3 link-hover">
          About
        </Link>
      </div>
    </header>
  );
}
