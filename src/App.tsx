import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
//import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from 'sonner';

function App() {

  return (
    <div className="bg-slate-900 text-slate-300">
      <Header />
      <main className="p-6 lg:p-0">
        <Hero />
        <About />
        <Skills />
        <Projects />
       {/*  <Experience /> */}
        <Contact />
        <Footer />
        <Toaster position="top-right" richColors />
      </main>
      
    </div>
  )
}

export default App
