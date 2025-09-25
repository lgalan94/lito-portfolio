
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-8"></div>
        <p className="text-lg text-slate-400 leading-relaxed">
          Hello! I'm Lito, a dedicated frontend engineer with over 5 years of experience creating dynamic and intuitive web experiences. My expertise lies in the React ecosystem, TypeScript, and modern styling solutions like Tailwind CSS. I thrive on solving complex problems and turning ideas into polished, high-quality products. I'm a firm believer in lifelong learning and am always exploring new technologies to push the boundaries of what's possible on the web.
        </p>
      </div>
    </section>
  );
};

export default About;