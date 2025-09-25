
import React from 'react';
import { SKILLS } from '../constants';
import Card from './ui/Card';

const Skills: React.FC = () => {
return (
  <section id="skills" className="py-20 md:py-32">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Skills</h2>
      <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12"></div>
      <div className="space-y-12">
        {Object.entries(SKILLS).map(([category, skills]) => (
          <div key={category}>
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">{category}</h3>
            <div className="flex flex-wrap justify-center gap-6">
              {skills.map(skill => (
                <Card key={skill.name} className="p-4 w-32 h-32 flex flex-col items-center justify-center text-center space-y-2">
                  {skill.icon}
                  <span className="font-medium text-slate-300">{skill.name}</span>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
};

export default Skills;
