import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
// Archived 2026-06-22 per client (Alex-Deene) — "Creative Portfolio" paused until her
// image overviews are ready. Component + galleryData kept intact; re-enable the import
// and the <Gallery /> line below to restore. No rework needed.
// import Gallery from "@/components/Gallery";
// Removed 2026-06-22 per client — "Trusted By" logo marquee (placeholder logos).
// Re-enable the import and the <ClientLogos /> line below to restore.
// import ClientLogos from "@/components/ClientLogos";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <About />
      <Services />
      {/* <Gallery />  — archived 2026-06-22 (see import note above) */}
      <Contact />
      {/* <ClientLogos />  — removed 2026-06-22 (see import note above) */}
      <Footer />
    </main>
  );
};

export default Index;
