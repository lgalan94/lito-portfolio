
import React from 'react';
import { EXPERIENCE } from '../constants';
import Card from './ui/Card';

const Experience: React.FC = () => {
return (
<section id="experience" className="py-20 md:py-32">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Work Experience</h2>
    <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12"></div>
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 hidden md:block"></div>
      
      {EXPERIENCE.map((item, index) => (
        <div key={index} className="mb-8 flex justify-between items-center w-full md:even:flex-row-reverse">
          <div className="hidden md:block w-5/12"></div>
          {/* Timeline Dot */}
          <div className="z-10 absolute left-1/2 -ml-3 hidden md:block">
              <div className="bg-cyan-500 h-6 w-6 rounded-full"></div>
          </div>
          <div className="w-full md:w-5/12">
            <Card className="p-6">
              <p className="text-slate-400 text-sm mb-1">{item.period}</p>
              <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
              <p className="text-cyan-400 font-semibold mb-3">{item.company}</p>
              <ul className="list-disc list-inside text-slate-400 space-y-2">
                {item.description.map((desc, i) => <li key={i}>{desc}</li>)}
              </ul>
            </Card>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
);
};

export default Experience;
