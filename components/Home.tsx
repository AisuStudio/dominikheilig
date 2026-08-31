import Hero from "./Hero";
import ProjectList from "./ProjectList";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { BIO, BIO_CTA } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <div className="page grid12 content-start">
        {/* Hero */}
        <section className="col-span-full mt-[10vh]">
          <Hero />
        </section>

        {/* Bio — Aussage, dann die Aufforderung. Getrennt, weil ein Absatz mit
            fünf Aussagen keine davon landen lässt. Die Zahlenreihe stand hier
            einmal (Commit cb6751f) und ist wieder raus: zwölf Projekte in 120
            Tagen liest sich als Angeberei, solange nichts Großes dahintersteht. */}
        <section className="col-span-full mt-50">
          <p className="t-h3 mx-auto max-w-[850px] text-center">{BIO}</p>
          <p className="mx-auto mt-50 max-w-[850px] text-center t-p2" style={{ opacity: "var(--dh-soft-dim)" }}>
            {BIO_CTA}
          </p>
        </section>

        {/* Filterchips, Projektliste und der Knopf, der den Rest aufklappt */}
        <ProjectList limit={5} />

        <Footer />
      </div>
    </>
  );
}
