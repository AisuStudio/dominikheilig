import Hero from "./Hero";
import ProjectList from "./ProjectList";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { BIO, BIO_CTA, BUILD_STATS } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <div className="page grid12 content-start">
        {/* Hero */}
        <section className="col-span-full mt-[10vh]">
          <Hero />
        </section>

        {/* Bio — Aussage, dann die Zahlen, dann die Aufforderung. Getrennt,
            weil ein Absatz mit fünf Aussagen keine davon landen lässt. */}
        <section className="col-span-full mt-50">
          <p className="t-h3 mx-auto max-w-[850px] text-center">{BIO}</p>
          <p className="mx-auto mt-30 max-w-[850px] text-center t-code" style={{ opacity: "var(--dh-soft-dim)" }}>
            {BUILD_STATS.projekte} projects built end to end · {BUILD_STATS.tage} days of work ·
            {" "}median {BUILD_STATS.median} days from empty folder to running
          </p>
          <p className="mx-auto mt-30 max-w-[850px] text-center t-p2" style={{ opacity: "var(--dh-soft-dim)" }}>
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
