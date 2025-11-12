import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { getSkills, type SkillsResponse } from '../services/skillApi';
import type { Skill } from '../types';

const PREFERRED_ORDER = ['Frontend', 'Backend', 'Database', 'Tools', 'Other'];

const Skills: React.FC = () => {
  const [skillsData, setSkillsData] = useState<SkillsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        setSkillsData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load skills.');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 120, damping: 10 },
    },
  };

  if (loading) return <p className="text-center text-white">Loading skills...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!skillsData) return <p className="text-center text-red-500">No skills found.</p>;

  // Dynamically sort categories
  const dynamicCategoryOrder = [
    ...PREFERRED_ORDER.filter(cat => skillsData[cat] && skillsData[cat].length > 0),
    ...Object.keys(skillsData).filter(cat => !PREFERRED_ORDER.includes(cat) && skillsData[cat].length > 0),
  ];

  return (
    <section id="skills" className="py-20 md:py-32 bg-slate-950 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(34,211,238,0.08),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_60%,rgba(6,182,212,0.08),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto text-center px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          🧠 My Tech Stack
        </motion.h2>
        <div className="w-24 h-1 bg-cyan-500 mx-auto mb-12 rounded-full"></div>

        {/* Kanban-style Flex Layout (3 columns per row) */}
        <div className="flex flex-wrap justify-center gap-8">
          {dynamicCategoryOrder.map(category => {
            const skills = skillsData[category] || [];
            if (skills.length === 0) return null;

            return (
              <motion.div
                key={category}
                className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] bg-white/5 backdrop-blur-sm border border-slate-800 rounded-2xl flex flex-col overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-slate-800 bg-slate-900/40 text-left">
                  <h3 className="text-lg font-semibold text-cyan-400">{category}</h3>
                </div>

                {/* Skills inside each category */}
                <div className="flex flex-wrap justify-center gap-4 p-4">
                  {skills.map((skill: Skill) => (
                    <motion.div
                      key={skill.name}
                      className="bg-white/10 border border-slate-700 rounded-lg p-3 w-24 h-24 flex flex-col items-center justify-center text-center hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill.icon && (
                        <img
                          src={skill.icon as string}
                          alt={skill.name}
                          className="w-10 h-10 object-contain mb-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]"
                        />
                      )}
                      <span className="text-xs font-medium text-slate-200">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
``
