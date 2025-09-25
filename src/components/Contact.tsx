
import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
        <p className="text-lg text-slate-400 mb-8">
          I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind or just want to connect!
        </p>
        <a href="mailto:alex.doe@example.com" className="inline-block bg-cyan-500 text-white font-bold py-3 px-8 rounded-full hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105 mb-8">
          Say Hello
        </a>
        <div className="flex justify-center space-x-6">
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
      </div>
    </section>
  );
};

export default Contact;
