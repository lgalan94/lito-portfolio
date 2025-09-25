import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';

function App() {

  return (
    <div className="bg-slate-900 text-slate-300">
      <Header />
      <main className="container mx-auto px-4 md:px-8">
        <Hero />
        <About />
      </main>
    </div>
  )
}

export default App
