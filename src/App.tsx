import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
// import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import Sidebar from "./components/Sidebar";

function App() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  const handleNavLinkClick = (id: string) => {
    setActiveSection(id);
  };

  return (
    <div className="bg-slate-900 text-slate-300">
      {/* ✅ Pass both props */}
      <Sidebar activeSection={activeSection} onNavLinkClick={handleNavLinkClick} />

      <main className="p-6 lg:p-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* <Experience /> */}
        <Contact />
        <Footer />
        <Toaster position="top-right" richColors />
      </main>
    </div>
  );
}

export default App;
