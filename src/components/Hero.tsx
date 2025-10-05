
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center text-center">
      <div className="space-y-6">
        <img 
          src="./Profile.png" 
          alt="Lito Galan Jr"
          className="w-72 h-72 rounded-full mx-auto border-4 border-slate-700 shadow-xl"
        />
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
          Lito Galan Jr
        </h1>
        <p className="text-xl md:text-2xl font-medium text-cyan-400">
          Full-Stack Web Developer
        </p>
        <p className="max-w-2xl mx-auto text-slate-400">
          I build beautiful, responsive, and highly performant web applications with a passion for clean code and user-centric design.
        </p>
        <div className="flex justify-center space-x-4">
          {SOCIAL_LINKS.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-cyan-400 transition-transform duration-300 hover:scale-110"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
        <div className="pt-4">
          <a href="#projects" className="bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105">
            View My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;