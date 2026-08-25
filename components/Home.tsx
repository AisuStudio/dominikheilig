import Hero from "./Hero";
import ProjectList from "./ProjectList";
import Footer from "./Footer";
import SiteHeader from "./SiteHeader";
import { BIO } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <div className="page grid12 content-start">
        {/* Hero */}
        <section className="col-span-full mt-[10vh]">
          <Hero />
        </section>

        {/* Bio */}
        <section className="col-span-full mt-50">
          <p className="t-h3 mx-auto max-w-[850px] text-center">{BIO}</p>
        </section>

        {/* Filterchips, Projektliste und der Knopf, der den Rest aufklappt */}
        <ProjectList limit={5} />

        <Footer />
      </div>
    </>
  );
}
