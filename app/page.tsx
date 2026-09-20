import ScrollProgress from "@/components/ScrollProgress";
import Sidebar from "@/components/Sidebar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    // overflow-x-clip (not overflow-hidden): hidden would turn <main> into a
    // scroll container and break the sidebar's position: sticky.
    <main className="backdrop relative min-h-screen overflow-x-clip p-3 pt-20 sm:p-5 sm:pt-20 lg:p-8">
      <ScrollProgress />
      <div className="frame mx-auto max-w-[1360px] p-3 sm:p-4 lg:p-5">
        <div className="gap-5 lg:grid lg:grid-cols-[300px,minmax(0,1fr)]">
          <Sidebar />
          <div className="min-w-0 space-y-5">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Achievements />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
      <FloatingWhatsApp />
    </main>
  );
}
