import './App.css';
import Hero from './components/Hero';
import Header from './components/Header';

function App() {

  return (
    <div className="bg-slate-900 text-slate-300">
      <Header />
      <main className="container mx-auto px-4 md:px-8">
        <Hero />
      </main>
    </div>
  )
}

export default App
